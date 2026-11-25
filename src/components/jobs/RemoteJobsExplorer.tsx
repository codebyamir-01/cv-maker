"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { RemoteJob } from "@/lib/remote-jobs";
import { trackGa4Event } from "@/components/analytics/Ga4Tracker";

type Props = { jobs: RemoteJob[]; fetchedAt: string };

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(value));
}

function trackJobClick(recentClicks: Map<string, number>, kind: "jobs_builder_clicked" | "jobs_apply_clicked", id: number) {
  const key = `${kind}:${id}`;
  const now = Date.now();
  if (now - (recentClicks.get(key) ?? 0) < 1200) return;
  recentClicks.set(key, now);
  trackGa4Event(kind);
}

export function RemoteJobsExplorer({ jobs, fetchedAt }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const recentClicks = useRef(new Map<string, number>());

  const categories = useMemo(() => ["All categories", ...new Set(jobs.map((job) => job.category).filter(Boolean))].sort((a, b) => a === "All categories" ? -1 : b === "All categories" ? 1 : a.localeCompare(b)), [jobs]);
  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return jobs.filter((job) =>
      (category === "All categories" || job.category === category) &&
      (!term || `${job.title} ${job.company} ${job.location}`.toLocaleLowerCase().includes(term))
    );
  }, [jobs, query, category]);

  return (
    <section aria-labelledby="open-roles" className="mt-12">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="open-roles" className="text-2xl font-bold text-slate-900">Browse remote openings</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Showing the latest {jobs.length} Remotive listings. The source delays jobs by 24 hours and may change or remove them. Check eligibility and availability before applying.</p>
        </div>
        <p className="text-xs text-slate-500">Feed fetched {formatDate(fetchedAt)} · Refreshed about every 6 hours</p>
      </div>

      <div className="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2">
        <label className="text-sm font-semibold text-slate-700">Search title, company, or location
          <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="e.g. designer, marketing, worldwide" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
        </label>
        <label className="text-sm font-semibold text-slate-700">Category
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
      </div>

      <p className="mt-5 text-sm text-slate-500" aria-live="polite">{filtered.length} {filtered.length === 1 ? "opening" : "openings"} shown</p>
      {filtered.length === 0 ? <p className="mt-4 rounded-2xl border border-slate-200 bg-white p-8 text-slate-600">No jobs match these filters. Try another title or category.</p> :
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {filtered.map((job) => <article key={job.id} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">{job.category || "Remote role"}</p>
            <h3 className="mt-2 text-xl font-bold text-slate-900">{job.title}</h3>
            <p className="mt-1 font-medium text-slate-700">{job.company}</p>
            <dl className="mt-5 grid gap-3 text-sm text-slate-600">
              <div><dt className="font-semibold text-slate-800">Applicants must be based in</dt><dd>{job.location}</dd></div>
              <div><dt className="font-semibold text-slate-800">Posted on source</dt><dd>{formatDate(job.postedAt)}</dd></div>
              {job.type && <div><dt className="font-semibold text-slate-800">Job type</dt><dd>{job.type.replaceAll("_", " ")}</dd></div>}
              {job.salary && <div><dt className="font-semibold text-slate-800">Salary listed</dt><dd>{job.salary}</dd></div>}
            </dl>
            <div className="mt-auto flex flex-wrap gap-3 pt-6">
              <a href={job.url} target="_blank" rel="noopener noreferrer" onClick={() => trackJobClick(recentClicks.current, "jobs_apply_clicked", job.id)} className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">View job on Remotive ↗</a>
              <Link href={`/builder?jobRole=${encodeURIComponent(job.title)}`} onClick={() => trackJobClick(recentClicks.current, "jobs_builder_clicked", job.id)} className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50">Build a CV for this role</Link>
            </div>
            <p className="mt-4 text-xs text-slate-500">Source: <a href="https://remotive.com" target="_blank" rel="noopener noreferrer" className="underline">Remotive</a>. Application is completed on the source or employer site.</p>
          </article>)}
        </div>}
    </section>
  );
}
