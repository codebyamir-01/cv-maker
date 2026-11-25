import "server-only";
import { unstable_cache } from "next/cache";

export type RemoteJob = {
  id: number;
  title: string;
  company: string;
  category: string;
  location: string;
  type: string;
  salary: string;
  postedAt: string;
  url: string;
};

export type RemoteJobsFeed = { jobs: RemoteJob[]; fetchedAt: string };

function text(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function parseJob(value: unknown): RemoteJob | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  const title = text(row.title, 180);
  const company = text(row.company_name, 140);
  const location = text(row.candidate_required_location, 160);
  if (!Number.isSafeInteger(row.id) || !title || !company || !location) return null;

  let url: URL;
  try {
    url = new URL(String(row.url));
  } catch {
    return null;
  }
  if (url.protocol !== "https:" || !["remotive.com", "www.remotive.com"].includes(url.hostname)) return null;

  const postedAt = text(row.publication_date, 40);
  if (!postedAt || Number.isNaN(Date.parse(postedAt))) return null;

  return {
    id: row.id as number,
    title,
    company,
    category: text(row.category, 100),
    location,
    type: text(row.job_type, 60),
    salary: text(row.salary, 100),
    postedAt,
    url: url.toString(),
  };
}

const getCachedJobs = unstable_cache(async (query: string): Promise<RemoteJobsFeed> => {
  const url = new URL("https://remotive.com/api/remote-jobs");
  url.searchParams.set("limit", "100");
  if (query) url.searchParams.set("search", query);
  const response = await fetch(url, {
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`Remotive returned ${response.status}`);
  const body: unknown = await response.json();
  if (!body || typeof body !== "object" || !Array.isArray((body as { jobs?: unknown }).jobs)) {
    throw new Error("Remotive returned an unexpected response");
  }
  const jobs = ((body as { jobs: unknown[] }).jobs).map(parseJob).filter((job): job is RemoteJob => job !== null);
  return { jobs, fetchedAt: new Date().toISOString() };
}, ["remotive-remote-jobs-v1"], { revalidate: 21600 });

export async function getRemoteJobs(query = ""): Promise<RemoteJobsFeed | null> {
  try {
    const feed = await getCachedJobs(query.trim().slice(0, 80));
    // A cache can survive a failed revalidation. Never display indefinitely old vacancies.
    if (Date.now() - Date.parse(feed.fetchedAt) > 7 * 60 * 60 * 1000) return null;
    return feed;
  } catch (error) {
    console.error("Remote jobs feed unavailable:", error);
    return null;
  }
}
