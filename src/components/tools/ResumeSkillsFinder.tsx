"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type RoleSkills = { slug: string; role: string; skills: string[] };

export function ResumeSkillsFinder({ examples }: { examples: RoleSkills[] }) {
  const [query, setQuery] = useState("");
  const [roleSlug, setRoleSlug] = useState(examples[0]?.slug || "");
  const [selected, setSelected] = useState<string[]>([]);
  const [copyMessage, setCopyMessage] = useState("");
  const matches = useMemo(() => examples.filter((example) => example.role.toLowerCase().includes(query.trim().toLowerCase())), [examples, query]);
  const role = examples.find((example) => example.slug === roleSlug) || examples[0];

  function choose(slug: string) { setRoleSlug(slug); setSelected([]); setCopyMessage(""); }
  function toggle(skill: string) { setSelected((current) => current.includes(skill) ? current.filter((item) => item !== skill) : [...current, skill]); setCopyMessage(""); }
  async function copy() {
    if (!selected.length) return;
    try { await navigator.clipboard.writeText(selected.join(", ")); setCopyMessage("Skills copied. Review them before adding them to your resume."); }
    catch { setCopyMessage("Copy was blocked by your browser. Select the text below to copy it manually."); }
  }

  return <div className="mt-10 grid gap-6 lg:grid-cols-[320px_1fr]"><section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="text-lg font-bold text-slate-900">Choose a role</h2><label className="mt-4 block text-sm font-medium text-slate-700">Search job titles<input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. nurse, engineer, student" className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:border-blue-500 focus:outline-none" /></label><div className="mt-5 max-h-[460px] space-y-1 overflow-y-auto" aria-label="Available roles">{matches.length ? matches.map((example) => <button type="button" key={example.slug} onClick={() => choose(example.slug)} aria-pressed={role?.slug === example.slug} className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold ${role?.slug === example.slug ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-100"}`}>{example.role}</button>) : <p className="p-3 text-sm text-slate-500">No matching role yet. Try a broader job title.</p>}</div></section><section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">{role && <><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm font-medium text-blue-600">Example skills for</p><h2 className="mt-1 text-2xl font-bold text-slate-900">{role.role}</h2></div><Link href={`/resume-examples/${role.slug}`} className="text-sm font-semibold text-blue-700 underline">View full resume example</Link></div><p className="mt-4 text-sm leading-6 text-slate-600">Select only skills you truly have. For each one, be ready to explain where and how you used it.</p><div className="mt-6 flex flex-wrap gap-3">{role.skills.map((skill) => <button type="button" key={skill} onClick={() => toggle(skill)} aria-pressed={selected.includes(skill)} className={`rounded-full border px-4 py-2 text-sm font-medium transition ${selected.includes(skill) ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white text-slate-700 hover:border-blue-400"}`}>{selected.includes(skill) ? "✓ " : "+ "}{skill}</button>)}</div><div className="mt-8 rounded-2xl bg-slate-50 p-5"><h3 className="font-semibold text-slate-900">Your selected skills ({selected.length})</h3><p className="mt-2 min-h-6 break-words text-sm text-slate-600">{selected.length ? selected.join(", ") : "Select skills above to create a list."}</p><div className="mt-4 flex flex-wrap gap-3"><button type="button" disabled={!selected.length} onClick={copy} className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50">Copy skills</button><Link href="/builder" className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700">Open resume builder</Link></div><p role="status" className="mt-3 text-sm text-slate-600">{copyMessage}</p></div></>}</section></div>;
}
