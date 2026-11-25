"use client";

import { useEffect, useState } from "react";

type Status = "Saved" | "Applied" | "Interview" | "Offer" | "Rejected";
type Application = { id: string; company: string; role: string; url: string; appliedAt: string; followUpAt: string; status: Status; notes: string };
const key = "smart-resume-maker-job-applications-v1";
const statuses: Status[] = ["Saved", "Applied", "Interview", "Offer", "Rejected"];
const emptyForm = { company: "", role: "", url: "", appliedAt: "", followUpAt: "", status: "Saved" as Status, notes: "" };

function validUrl(value: string) {
  if (!value) return true;
  try { return ["https:", "http:"].includes(new URL(value).protocol); } catch { return false; }
}

function csvCell(value: string) {
  // Keep imported values as text when a spreadsheet opens the CSV.
  const safe = /^[\s]*[=+@\-\t\r]/.test(value) ? `'${value}` : value;
  return `"${safe.replaceAll('"', '""')}"`;
}

export function JobApplicationTracker() {
  const [items, setItems] = useState<Application[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<Status | "All">("All");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = JSON.parse(localStorage.getItem(key) || "[]");
        if (Array.isArray(stored)) setItems(stored.filter((item) => item && typeof item.id === "string" && typeof item.company === "string" && typeof item.role === "string" && statuses.includes(item.status)).slice(0, 200));
      } catch { setError("Saved entries could not be read in this browser."); }
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function save(next: Application[]) {
    try {
      localStorage.setItem(key, JSON.stringify(next));
      setItems(next);
      setError("");
      return true;
    } catch {
      setError("This browser could not save your entries. Check available storage or privacy settings, then try again.");
      return false;
    }
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.company.trim() || !form.role.trim()) return setError("Company and job title are required.");
    if (!validUrl(form.url.trim())) return setError("Use a full http or https URL for the job posting.");
    if (!editingId && items.length >= 200) return setError("The 200-entry browser limit is reached. Export your CSV before removing older entries.");
    const entry: Application = { ...form, company: form.company.trim(), role: form.role.trim(), url: form.url.trim(), notes: form.notes.trim(), id: editingId || crypto.randomUUID() };
    const next = editingId ? items.map((item) => item.id === editingId ? entry : item) : [entry, ...items];
    if (save(next)) { setEditingId(null); setForm(emptyForm); }
  }

  function edit(item: Application) {
    setEditingId(item.id);
    setForm({ company: item.company, role: item.role, url: item.url || "", appliedAt: item.appliedAt || "", followUpAt: item.followUpAt || "", status: item.status, notes: item.notes || "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function remove(item: Application) {
    if (window.confirm(`Delete ${item.role} at ${item.company}?`)) save(items.filter((entry) => entry.id !== item.id));
  }

  function exportCsv() {
    const rows = [["Company", "Job title", "Status", "Applied date", "Follow-up date", "Job posting URL", "Notes"], ...items.map((item) => [item.company, item.role, item.status, item.appliedAt, item.followUpAt, item.url, item.notes])];
    const csv = "\uFEFF" + rows.map((row) => row.map((value) => csvCell(value || "")).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "job-applications.csv";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const visible = items.filter((item) => filter === "All" || item.status === filter);
  const field = "mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100";

  return (
    <div className="mt-10 space-y-8">
      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-900">Entries are saved only in this browser on this device. They are not synced to your account. Export a CSV backup before clearing browser data or switching devices.</div>
      <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <h2 className="text-xl font-bold text-slate-900">{editingId ? "Edit application" : "Add an application"}</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">Company *<input className={field} required maxLength={120} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></label>
          <label className="text-sm font-medium text-slate-700">Job title *<input className={field} required maxLength={120} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} /></label>
          <label className="text-sm font-medium text-slate-700">Status<select className={field} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Status })}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label>
          <label className="text-sm font-medium text-slate-700">Job posting URL<input className={field} type="url" maxLength={1000} placeholder="https://company.com/careers/..." value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} /></label>
          <label className="text-sm font-medium text-slate-700">Date applied<input className={field} type="date" value={form.appliedAt} onChange={(e) => setForm({ ...form, appliedAt: e.target.value })} /></label>
          <label className="text-sm font-medium text-slate-700">Follow-up date<input className={field} type="date" value={form.followUpAt} onChange={(e) => setForm({ ...form, followUpAt: e.target.value })} /></label>
          <label className="text-sm font-medium text-slate-700 sm:col-span-2">Notes<textarea className={field} rows={3} maxLength={1000} placeholder="Interview time, recruiter, or next step" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></label>
        </div>
        {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
        <div className="mt-6 flex flex-wrap gap-3"><button disabled={!ready} className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50" type="submit">{editingId ? "Save changes" : "Save application"}</button>{editingId && <button type="button" className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700" onClick={() => { setEditingId(null); setForm(emptyForm); }}>Cancel</button>}</div>
      </form>
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-xl font-bold text-slate-900">Your applications</h2><p className="mt-1 text-sm text-slate-500">{ready ? `${items.length} saved on this device` : "Loading saved entries..."}</p></div><button type="button" onClick={exportCsv} disabled={!ready || items.length === 0} className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50">Export CSV</button></div>
        <label className="mt-6 block max-w-xs text-sm font-medium text-slate-700">Filter by status<select className={field} value={filter} onChange={(e) => setFilter(e.target.value as Status | "All")}><option>All</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label>
        {ready && visible.length === 0 ? <p className="mt-8 rounded-xl bg-slate-50 p-6 text-sm text-slate-600">{items.length ? "No applications match this status." : "No applications yet. Add your first opportunity above."}</p> : <div className="mt-6 grid gap-4">{visible.map((item) => <article key={item.id} className="rounded-2xl border border-slate-200 p-5"><div className="flex flex-wrap justify-between gap-3"><div><h3 className="font-bold text-slate-900">{item.role}</h3><p className="text-sm text-slate-600">{item.company}</p></div><span className="h-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{item.status}</span></div><div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-600">{item.appliedAt && <span>Applied: {item.appliedAt}</span>}{item.followUpAt && <span>Follow up: {item.followUpAt}</span>}{item.url && validUrl(item.url) && <a href={item.url} target="_blank" rel="noopener noreferrer nofollow" className="break-all text-blue-700 underline">Job posting</a>}</div>{item.notes && <p className="mt-3 whitespace-pre-wrap text-sm text-slate-600">{item.notes}</p>}<div className="mt-4 flex gap-4 border-t border-slate-100 pt-4 text-sm font-semibold"><button type="button" className="text-blue-700 hover:underline" onClick={() => edit(item)}>Edit</button><button type="button" className="text-red-700 hover:underline" onClick={() => remove(item)}>Delete</button></div></article>)}</div>}
      </section>
    </div>
  );
}
