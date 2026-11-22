import "server-only";
import { createSign } from "node:crypto";

type Report<T> =
  | { status: "setup_required" }
  | { status: "error"; message: string }
  | { status: "live"; fetchedAt: string; startDate: string; endDate: string; data: T };

type Credentials = { client_email: string; private_key: string };
const tokenCache = new Map<string, { value: string; expiresAt: number }>();

function credentials(): Credentials | null {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  const parsed: unknown = JSON.parse(raw);
  if (!parsed || typeof parsed !== "object") throw new Error("Invalid service account configuration");
  const account = parsed as Partial<Credentials>;
  if (!account.client_email || !account.private_key) throw new Error("Invalid service account configuration");
  return { client_email: account.client_email, private_key: account.private_key };
}

async function accessToken(account: Credentials, scope: string): Promise<string> {
  const cached = tokenCache.get(scope);
  if (cached && cached.expiresAt > Date.now()) return cached.value;
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const claims = Buffer.from(JSON.stringify({
    iss: account.client_email, scope, aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600,
  })).toString("base64url");
  const unsigned = `${header}.${claims}`;
  const signature = createSign("RSA-SHA256").update(unsigned).sign(account.private_key, "base64url");
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${signature}` }),
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`Google authentication failed (${response.status})`);
  const result = await response.json() as { access_token?: string };
  if (!result.access_token) throw new Error("Google authentication returned no token");
  tokenCache.set(scope, { value: result.access_token, expiresAt: Date.now() + 50 * 60 * 1000 });
  return result.access_token;
}

async function googlePost<T>(url: string, scope: string, body: object, account: Credentials): Promise<T> {
  const token = await accessToken(account, scope);
  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`Google reporting request failed (${response.status})`);
  return response.json() as Promise<T>;
}

function dateRange() {
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 3); // Avoid Google's recent-data processing delay.
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 27);
  return { startDate: start.toISOString().slice(0, 10), endDate: end.toISOString().slice(0, 10) };
}

type SeoData = { clicks: number; impressions: number; ctr: number; position: number; pages: { url: string; clicks: number; impressions: number; ctr: number; position: number }[] };
type SearchRow = { keys?: string[]; clicks?: number; impressions?: number; ctr?: number; position?: number };

export async function getSearchConsoleReport(): Promise<Report<SeoData>> {
  if (!process.env.GSC_SITE_URL || !process.env.GOOGLE_SERVICE_ACCOUNT_JSON) return { status: "setup_required" };
  try {
    const account = credentials()!;
    const range = dateRange();
    const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(process.env.GSC_SITE_URL!)}/searchAnalytics/query`;
    const scope = "https://www.googleapis.com/auth/webmasters.readonly";
    const [totals, pages] = await Promise.all([
      googlePost<{ rows?: SearchRow[] }>(endpoint, scope, { ...range, type: "web" }, account),
      googlePost<{ rows?: SearchRow[] }>(endpoint, scope, { ...range, type: "web", dimensions: ["page"], rowLimit: 10 }, account),
    ]);
    const total = totals.rows?.[0];
    return {
      status: "live", fetchedAt: new Date().toISOString(), ...range,
      data: {
        clicks: total?.clicks ?? 0, impressions: total?.impressions ?? 0,
        ctr: total?.ctr ?? 0, position: total?.position ?? 0,
        pages: (pages.rows ?? []).map(row => ({ url: row.keys?.[0] ?? "", clicks: row.clicks ?? 0, impressions: row.impressions ?? 0, ctr: row.ctr ?? 0, position: row.position ?? 0 })),
      },
    };
  } catch (error) {
    console.error("Search Console reporting failed:", error);
    return { status: "error", message: "Search Console is unavailable. Check API access and the site property." };
  }
}

type FunnelData = { builderOpened: number; resumeDownloaded: number };
type GaRow = { dimensionValues?: { value: string }[]; metricValues?: { value: string }[] };

export async function getGa4FunnelReport(): Promise<Report<FunnelData>> {
  const property = process.env.GA4_PROPERTY_ID;
  if (!property || !process.env.GOOGLE_SERVICE_ACCOUNT_JSON || !process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID) return { status: "setup_required" };
  if (!/^\d+$/.test(property)) return { status: "error", message: "GA4 property ID must be numeric." };
  try {
    const account = credentials()!;
    const range = dateRange();
    const report = await googlePost<{ rows?: GaRow[] }>(
      `https://analyticsdata.googleapis.com/v1beta/properties/${property}:runReport`,
      "https://www.googleapis.com/auth/analytics.readonly",
      { dateRanges: [{ startDate: range.startDate, endDate: range.endDate }], dimensions: [{ name: "eventName" }], metrics: [{ name: "eventCount" }], dimensionFilter: { filter: { fieldName: "eventName", inListFilter: { values: ["builder_opened", "resume_downloaded"] } } } },
      account,
    );
    const counts = new Map((report.rows ?? []).map(row => [row.dimensionValues?.[0]?.value, Number(row.metricValues?.[0]?.value ?? 0)]));
    return { status: "live", fetchedAt: new Date().toISOString(), ...range, data: { builderOpened: counts.get("builder_opened") ?? 0, resumeDownloaded: counts.get("resume_downloaded") ?? 0 } };
  } catch (error) {
    console.error("GA4 reporting failed:", error);
    return { status: "error", message: "GA4 reporting is unavailable. Check Data API access and the property ID." };
  }
}
