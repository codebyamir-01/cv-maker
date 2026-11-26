"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Briefcase, CheckCircle2, Loader2, MapPin, Search } from "lucide-react";
import { CURRENCIES, WORK_MODES, type Currency, type WorkMode } from "@/lib/job-preferences";
import type { JobListing, JobsCollection } from "@/lib/job-feeds";

type Match = JobListing & { workMode: WorkMode };
type SearchResults = Omit<JobsCollection, "jobs"> & { jobs: Match[] };
type SavedPreferences = {
  jobTitles: string[];
  location: string | null;
  remoteOnly: boolean;
  minSalary: number | null;
  currency?: string;
  workModes?: string[];
};

const modeLabels: Record<WorkMode, string> = { remote: "Remote", hybrid: "Hybrid", onsite: "On-site", unspecified: "Not stated by source" };

export default function JobPreferencesPage() {
  const [titles, setTitles] = useState("");
  const [location, setLocation] = useState("");
  const [modes, setModes] = useState<WorkMode[]>([...WORK_MODES]);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [minSalary, setMinSalary] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const searchJobs = useCallback(async (term: string) => {
    setSearching(true);
    try {
      const response = await fetch(`/api/autopilot/jobs?q=${encodeURIComponent(term.trim())}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Job search is unavailable. Please try again.");
      setResults(await response.json() as SearchResults);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Job search is unavailable.");
      setResults(null);
    } finally {
      setSearching(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const response = await fetch("/api/autopilot", { cache: "no-store" });
        if (!response.ok) throw new Error("Could not load your job preferences.");
        const data = await response.json() as { preferences: SavedPreferences | null; suggestedCurrency: Currency };
        if (!active) return;
        const saved = data.preferences;
        setTitles(saved?.jobTitles?.join(", ") || "");
        setLocation(saved?.remoteOnly && saved.location?.toLowerCase() === "remote" ? "" : saved?.location || "");
        setModes(saved?.workModes?.length ? saved.workModes.filter((mode): mode is WorkMode => WORK_MODES.includes(mode as WorkMode)) : saved?.remoteOnly ? ["remote"] : [...WORK_MODES]);
        setCurrency(CURRENCIES.includes(saved?.currency as Currency) ? saved!.currency as Currency : data.suggestedCurrency);
        setMinSalary(saved?.minSalary?.toString() || "");
        const savedSearch = saved?.jobTitles?.join(", ") || "";
        setQuery(savedSearch);
        void searchJobs(savedSearch);
      } catch (error) {
        if (active) setMessage(error instanceof Error ? error.message : "Could not load preferences.");
      } finally {
        if (active) setLoading(false);
      }
    }
    void load();
    return () => { active = false; };
  }, [searchJobs]);

  const visible = useMemo(() => {
    if (!results) return [];
    const place = location.trim().toLowerCase();
    return results.jobs.filter((job) => {
      if (!modes.includes(job.workMode)) return false;
      if (!place) return true;
      if (job.workMode === "remote" && /worldwide|anywhere|global/i.test(job.location)) return true;
      return job.location.toLowerCase().includes(place);
    });
  }, [results, location, modes]);

  async function save() {
    setMessage("");
    setSaving(true);
    try {
      const response = await fetch("/api/autopilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitles: titles.split(",").map((title) => title.trim()).filter(Boolean),
          location: location.trim(), workModes: modes, currency, minSalary,
        }),
      });
      const data = await response.json() as { error?: string };
      if (!response.ok) throw new Error(data.error || "Could not save preferences.");
      setMessage("Preferences saved to your account.");
      const savedSearch = titles.trim();
      setQuery(savedSearch);
      void searchJobs(savedSearch);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save preferences.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div role="status" className="mx-auto max-w-5xl p-8 text-slate-600"><Loader2 className="mr-2 inline h-4 w-4 animate-spin" />Loading job preferences…</div>;

  return <div className="mx-auto max-w-5xl space-y-8 pb-12">
    <header className="rounded-3xl bg-slate-900 p-8 text-white">
      <span className="text-xs font-bold uppercase tracking-wider text-blue-300">Job search</span>
      <h1 className="mt-2 text-3xl font-extrabold">Job Preferences</h1>
      <p className="mt-2 max-w-2xl text-slate-300">Save what you want, search current listings, and prepare a CV for a role. Applications open on the original job site.</p>
    </header>

    <div className="grid gap-8 lg:grid-cols-3">
      <section className="space-y-5 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm lg:col-span-2" aria-label="Job preferences">
        <h2 className="text-xl font-bold">Your search preferences</h2>
        <label className="block text-sm font-semibold"><Briefcase className="mr-2 inline h-4 w-4 text-blue-600" />Job titles
          <input value={titles} onChange={(event) => setTitles(event.target.value)} placeholder="Software Engineer, Frontend Developer" maxLength={400} className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal" />
          <span className="mt-1 block text-xs font-normal text-slate-500">Separate up to five roles with commas.</span>
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-semibold"><MapPin className="mr-2 inline h-4 w-4 text-blue-600" />Preferred location
            <input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="e.g. Pakistan, London" maxLength={100} className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal" />
          </label>
          <label className="block text-sm font-semibold">Salary currency
            <select value={currency} onChange={(event) => setCurrency(event.target.value as Currency)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 font-normal">
              {CURRENCIES.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
        </div>
        <fieldset><legend className="text-sm font-semibold">Work arrangement</legend>
          <div className="mt-2 flex flex-wrap gap-4">{WORK_MODES.map((mode) => <label key={mode} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={modes.includes(mode)} onChange={(event) => setModes(event.target.checked ? [...modes, mode] : modes.filter((item) => item !== mode))} />{modeLabels[mode]}</label>)}</div>
          <p className="mt-2 text-xs text-slate-500">Some Pakistan listings do not state an arrangement. Include or exclude them explicitly.</p>
        </fieldset>
        <label className="block text-sm font-semibold">Minimum desired annual salary ({currency})
          <input type="number" min="0" max="1000000000" value={minSalary} onChange={(event) => setMinSalary(event.target.value)} placeholder="Optional" className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal" />
        </label>
        <p className="text-xs leading-5 text-slate-500">Salary is saved as your preference. Sources often omit pay or its currency, so it cannot safely filter all listings or be converted to another currency.</p>
        <button type="button" disabled={saving || modes.length === 0} onClick={() => void save()} className="w-full rounded-xl bg-blue-600 p-3 font-semibold text-white disabled:opacity-50">{saving ? "Saving…" : "Save preferences"}</button>
        {message && <p role="status" className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle2 className="h-4 w-4" />{message}</p>}
      </section>

      <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-lg font-bold">Search current jobs</h2>
        <p className="mt-2 text-sm text-slate-600">Search Pakistan vacancies and global remote listings by role or keyword.</p>
        <form className="mt-5 space-y-3" onSubmit={(event) => { event.preventDefault(); void searchJobs(query); }}>
          <label className="block text-sm font-semibold">Role or keyword
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} maxLength={80} placeholder="e.g. civil engineer" className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal" />
          </label>
          <button type="submit" disabled={searching} className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-600 p-3 font-semibold text-blue-700 disabled:opacity-50"><Search className="h-4 w-4" />{searching ? "Searching…" : "Find jobs"}</button>
        </form>
        <p className="mt-5 text-xs leading-5 text-slate-500">Listings are fetched from SkillzDunya and Remotive. On-site and hybrid jobs outside Pakistan are not yet covered by these sources. No applications are sent automatically.</p>
      </aside>
    </div>

    <section aria-labelledby="matches-heading">
      <div className="flex flex-wrap items-end justify-between gap-3"><div><h2 id="matches-heading" className="text-2xl font-bold">Matching listings</h2><p className="mt-1 text-sm text-slate-600">{searching ? "Checking current sources…" : `${visible.length} shown from ${results?.jobs.length ?? 0} fetched listings`}</p></div><Link href="/jobs" className="text-sm font-semibold text-blue-700 underline">Browse all jobs</Link></div>
      {results && (!results.pakistanAvailable || !results.remoteAvailable) && <p role="status" className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">One or more job sources are temporarily unavailable. Results may be incomplete.</p>}
      {!searching && visible.length === 0 && <p className="mt-5 rounded-2xl border bg-white p-6 text-sm text-slate-600">No listings match this search and the selected location or work arrangements. Try another title, clear the location, or select more arrangements.</p>}
      <div className="mt-5 grid gap-4 md:grid-cols-2">{visible.map((job) => <article key={job.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase text-blue-700">{job.sourceName} · {modeLabels[job.workMode]}</p>
        <h3 className="mt-2 text-lg font-bold">{job.title}</h3><p className="text-sm text-slate-700">{job.company} · {job.location}</p>
        <p className="mt-3 text-xs text-slate-600">Posted {new Date(job.postedAt).toLocaleDateString()} · Deadline {job.deadline ? new Date(job.deadline).toLocaleDateString() : "not supplied"}</p>
        {job.salary && <p className="mt-2 text-sm text-slate-700">Source salary: {job.salary}</p>}
        <div className="mt-5 flex flex-wrap gap-3"><a href={job.applyUrl || job.sourceUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">View and apply ↗</a><Link href={`/builder?jobRole=${encodeURIComponent(job.title)}`} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold">Build a CV</Link><Link href="/job-application-tracker" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold">Track application</Link></div>
      </article>)}</div>
    </section>
  </div>;
}
