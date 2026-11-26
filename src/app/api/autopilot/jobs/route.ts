import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getJobs } from "@/lib/job-feeds";
import { jobWorkMode } from "@/lib/job-preferences";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(request.url);
  const terms = (url.searchParams.get("q") || "").slice(0, 420).split(",").map((value) => value.trim().slice(0, 80)).filter(Boolean).slice(0, 5);
  const collections = await Promise.all((terms.length ? terms : [""]).map((query) => getJobs({ pakistan: true, remote: true, query })));
  const jobs = [...new Map(collections.flatMap((collection) => collection.jobs).map((job) => [job.id, job])).values()]
    .sort((a, b) => Date.parse(b.postedAt) - Date.parse(a.postedAt));
  return NextResponse.json({
    jobs: jobs.map((job) => ({ ...job, workMode: jobWorkMode(job) })),
    pakistanAvailable: collections.every((collection) => collection.pakistanAvailable),
    remoteAvailable: collections.every((collection) => collection.remoteAvailable),
    pakistanFetchedAt: collections.find((collection) => collection.pakistanFetchedAt)?.pakistanFetchedAt || null,
    remoteFetchedAt: collections.find((collection) => collection.remoteFetchedAt)?.remoteFetchedAt || null,
  }, { headers: { "Cache-Control": "private, no-store" } });
}
