"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { JobListing, JobsCollection } from "@/lib/job-feeds";
import { trackGa4Event } from "@/components/analytics/Ga4Tracker";

type Props = { collection: JobsCollection; heading: string; section: string; initialQuery?: string };

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(value));
}

function trackClick(recent: Map<string, number>, kind: "jobs_builder_clicked" | "jobs_apply_clicked", job: JobListing, section: string) {
  const key = `${kind}:${job.id}`;
  const now = Date.now();
  if (now - (recent.get(key) ?? 0) < 1200) return;
  recent.set(key, now);
  trackGa4Event(kind, { jobs_source: job.source, jobs_section: section });
}

export function JobsExplorer({ collection, heading, section, initialQuery = "" }: Props) {
  const [source, setSource] = useState("all");
  const [filter, setFilter] = useState("");
  const recent = useRef(new Map<string, number>());
  const visible = useMemo(() => {
    const term = filter.trim().toLocaleLowerCase();
    return collection.jobs.filter((job) =>
      (source === "all" || job.source === source) &&
      (!term || `${job.title} ${job.company} ${job.location}`.toLocaleLowerCase().includes(term))
    );
  }, [collection.jobs, source, filter]);

  return <section aria-labelledby="jobs-list" className="mt-12">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 id="jobs-list" className="text-2xl font-bold text-slate-900">{heading}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Listings update from their sources about every six hours. Always check the original posting before applying.</p>
      </div>
      <div className="text-xs text-slate-500">
        {collection.pakistanFetchedAt && <p>Pakistan feed fetched {formatDate(collection.pakistanFetchedAt)}</p>}
        {collection.remoteFetchedAt && <p>Remote feed fetched {formatDate(collection.remoteFetchedAt)}</p>}
      </div>
    </div>

    <form action="/jobs" method="get" className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-end">
      <label htmlFor={`jobs-search-${section}`} className="flex-1 text-sm font-semibold text-slate-700">Search all jobs by title or keyword
        <input id={`jobs-search-${section}`} name="q" type="search" minLength={2} maxLength={80} defaultValue={initialQuery} placeholder="e.g. civil engineer, teacher, designer" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
      </label>
      <button type="submit" className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700">Find jobs</button>
    </form>

    {(collection.pakistanAvailable || collection.remoteAvailable) && <div className="mt-4 flex flex-wrap gap-4">
      {collection.pakistanAvailable && collection.remoteAvailable && <label className="text-sm font-medium text-slate-700">Source
        <select value={source} onChange={(event) => setSource(event.target.value)} className="ml-2 rounded-lg border border-slate-300 bg-white px-3 py-2"><option value="all">Both sources</option><option value="pakistan">Pakistan</option><option value="remote">Global remote</option></select>
      </label>}
      <label className="text-sm font-medium text-slate-700">Narrow shown listings
        <input value={filter} onChange={(event) => setFilter(event.target.value)} type="search" placeholder="Title, company, location" className="ml-2 rounded-lg border border-slate-300 bg-white px-3 py-2" />
      </label>
    </div>}

    {!collection.pakistanAvailable && section !== "remote" && <p role="status" className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">Pakistan listings are temporarily unavailable. Other sources may still appear below.</p>}
    {!collection.remoteAvailable && section !== "pakistan" && section !== "government" && <p role="status" className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">Remote listings are temporarily unavailable. Other sources may still appear below.</p>}

    <p className="mt-5 text-sm text-slate-500" aria-live="polite">{visible.length} {visible.length === 1 ? "listing" : "listings"} shown</p>
    {visible.length === 0 ? <p className="mt-4 rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-600">No current listings match these criteria. Try another search or check again after the next feed update.</p> :
      <div className="mt-4 grid gap-5 md:grid-cols-2">
        {visible.map((job) => <article key={job.id} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-2"><p className="text-xs font-semibold uppercase tracking-wide text-blue-700">{job.government ? "Pakistan government" : job.source === "pakistan" ? "Pakistan job" : "Global remote"}</p>{job.isNew && <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">New in the last 3 days</span>}</div>
          <h3 className="mt-2 text-xl font-bold text-slate-900">{job.title}</h3>
          <p className="mt-1 font-medium text-slate-700">{job.company}</p>
          <dl className="mt-5 grid gap-3 text-sm text-slate-600">
            <div><dt className="font-semibold text-slate-800">Location / eligibility</dt><dd>{job.location}</dd></div>
            <div><dt className="font-semibold text-slate-800">Posted on source</dt><dd>{formatDate(job.postedAt)}</dd></div>
            <div><dt className="font-semibold text-slate-800">Application deadline</dt><dd>{job.deadline ? formatDate(job.deadline) : "Not provided by source"}</dd></div>
            {job.salary && <div><dt className="font-semibold text-slate-800">Salary or pay scale listed</dt><dd>{job.salary}</dd></div>}
          </dl>
          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            <a href={job.applyUrl || job.sourceUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackClick(recent.current, "jobs_apply_clicked", job, section)} className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">{job.applyUrl ? "Open provided application ↗" : "View original listing ↗"}</a>
            <Link href={`/builder?jobRole=${encodeURIComponent(job.title)}`} onClick={() => trackClick(recent.current, "jobs_builder_clicked", job, section)} className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50">Build a CV for this role</Link>
          </div>
          {job.applyUrl && <><p className="mt-3 text-xs text-slate-600">Application link supplied by {job.sourceName}: {new URL(job.applyUrl).hostname}</p><a href={job.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 text-sm text-blue-700 underline">Read the source listing and eligibility details</a></>}
          <p className="mt-4 text-xs text-slate-500">Source: {job.sourceName}. {job.source === "pakistan" ? "Third-party listing; confirm details with the hiring organization." : "Remote postings may restrict applicant countries; the feed is delayed by 24 hours."}</p>
        </article>)}
      </div>}
  </section>;
}
