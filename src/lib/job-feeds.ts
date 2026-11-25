import "server-only";
import { unstable_cache } from "next/cache";
import { getRemoteJobs } from "@/lib/remote-jobs";

export type JobListing = {
  id: string;
  source: "pakistan" | "remote";
  sourceName: "SkillzDunya" | "Remotive";
  title: string;
  company: string;
  location: string;
  category: string;
  type: string;
  salary: string;
  postedAt: string;
  deadline: string | null;
  government: boolean;
  isNew?: boolean;
  sourceUrl: string;
  applyUrl: string | null;
};

export type JobsCollection = {
  jobs: JobListing[];
  pakistanAvailable: boolean;
  remoteAvailable: boolean;
  pakistanFetchedAt: string | null;
  remoteFetchedAt: string | null;
};

type PakistanFeed = { jobs: JobListing[]; fetchedAt: string };
type FeedOptions = { pakistan: boolean; remote: boolean; governmentOnly?: boolean; query?: string; engineeringOnly?: boolean };

function cleanText(value: unknown, max = 180) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function httpsUrl(value: unknown, hosts?: string[]) {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || (hosts && !hosts.includes(url.hostname))) return null;
    if (!hosts && ["bit.ly", "bitly.cx", "tinyurl.com", "cutt.ly", "t.co", "ow.ly", "shorturl.at"].includes(url.hostname)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function validDate(value: unknown) {
  const date = cleanText(value, 30);
  return /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(date)) ? date : null;
}

function parsePakistanJob(value: unknown): JobListing | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  const sourceUrl = httpsUrl(row.url, ["skillzdunya.com", "www.skillzdunya.com"]);
  const title = cleanText(row.title);
  const organization = row.organization && typeof row.organization === "object" ? row.organization as Record<string, unknown> : null;
  const company = cleanText(organization?.title, 140);
  const postedAt = validDate(row.published_at);
  const deadline = validDate(row.deadline);
  const government = row.is_government === true;
  if (!Number.isSafeInteger(row.id) || !sourceUrl || !title || !company || !postedAt || row.is_expired === true || row.is_international === true) return null;
  if (government && !deadline) return null;
  if (deadline && deadline < new Date().toISOString().slice(0, 10)) return null;

  const cities = Array.isArray(row.cities) ? row.cities.map((city: unknown) => city && typeof city === "object" ? cleanText((city as Record<string, unknown>).title, 80) : "").filter(Boolean) : [];
  const categories = Array.isArray(row.categories) ? row.categories.map((category: unknown) => category && typeof category === "object" ? cleanText((category as Record<string, unknown>).title, 80) : "").filter(Boolean) : [];

  return {
    id: `pk-${row.id}`,
    source: "pakistan",
    sourceName: "SkillzDunya",
    title,
    company,
    location: cities.length ? cities.join(", ").slice(0, 180) + ", Pakistan" : "Pakistan (city not specified)",
    category: categories[0] || (government ? "Government" : "Private sector"),
    type: government ? "Government" : "Private sector",
    salary: cleanText(row.salary_range, 110),
    postedAt,
    deadline,
    government,
    sourceUrl,
    applyUrl: httpsUrl(row.apply_url),
  };
}

const getCachedPakistanJobs = unstable_cache(async (query: string, governmentOnly: boolean): Promise<PakistanFeed> => {
  const url = new URL("https://skillzdunya.com/api/v1/jobs");
  url.searchParams.set("status", "open");
  url.searchParams.set("sort", "newest");
  url.searchParams.set("per_page", "50");
  if (query) url.searchParams.set("q", query);
  if (governmentOnly) url.searchParams.set("government", "1");
  const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error(`SkillzDunya returned ${response.status}`);
  const body: unknown = await response.json();
  if (!body || typeof body !== "object" || !Array.isArray((body as { data?: unknown }).data)) throw new Error("SkillzDunya returned an unexpected response");
  const jobs = (body as { data: unknown[] }).data.map(parsePakistanJob).filter((job): job is JobListing => job !== null);
  return { jobs, fetchedAt: new Date().toISOString() };
}, ["pakistan-jobs-v1"], { revalidate: 21600 });

async function getPakistanJobs(query: string, governmentOnly: boolean): Promise<PakistanFeed | null> {
  try {
    const feed = await getCachedPakistanJobs(query, governmentOnly);
    if (Date.now() - Date.parse(feed.fetchedAt) > 7 * 60 * 60 * 1000) return null;
    // A cached job may pass its deadline before the next refresh.
    return { ...feed, jobs: feed.jobs.filter((job) => !job.deadline || job.deadline >= new Date().toISOString().slice(0, 10)) };
  } catch (error) {
    console.error("Pakistan jobs feed unavailable:", error);
    return null;
  }
}

export async function getJobs(options: FeedOptions): Promise<JobsCollection> {
  const query = (options.query || "").trim().slice(0, 80);
  const [pakistan, remote] = await Promise.all([
    options.pakistan ? getPakistanJobs(query, !!options.governmentOnly) : Promise.resolve(null),
    options.remote ? getRemoteJobs(query) : Promise.resolve(null),
  ]);
  const remoteJobs: JobListing[] = (remote?.jobs ?? []).map((job) => ({
    id: `remote-${job.id}`, source: "remote", sourceName: "Remotive", title: job.title,
    company: job.company, location: job.location, category: job.category,
    type: job.type, salary: job.salary, postedAt: job.postedAt, deadline: null,
    government: false, sourceUrl: job.url, applyUrl: null,
  }));
  let jobs = [...(pakistan?.jobs ?? []), ...remoteJobs];
  if (options.engineeringOnly) jobs = jobs.filter((job) => /\bengineer(?:ing|s)?\b/i.test(job.title));
  jobs.sort((a, b) => Date.parse(b.postedAt) - Date.parse(a.postedAt));
  const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;
  jobs = jobs.map((job) => ({ ...job, isNew: Date.parse(job.postedAt) >= threeDaysAgo && Date.parse(job.postedAt) <= Date.now() }));
  return {
    jobs,
    pakistanAvailable: !!pakistan,
    remoteAvailable: !!remote,
    pakistanFetchedAt: pakistan?.fetchedAt ?? null,
    remoteFetchedAt: remote?.fetchedAt ?? null,
  };
}
