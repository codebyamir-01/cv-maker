import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Free Resume and Job Search Tools | Smart Resume Maker",
  description: "Use free tools to build a resume, check PDF readability, find relevant skills, write a cover letter and track job applications.",
  alternates: { canonical: "https://www.smartresumemaker.com/tools" },
};

const tools = [
  { title: "Resume builder", description: "Create and download a resume with editable templates.", href: "/builder" },
  { title: "ATS resume checker and PDF text check", description: "Read PDF text locally, then compare your resume with a job description.", href: "/ats-resume-checker" },
  { title: "Resume skills finder", description: "Explore skills by role and copy only the ones you can demonstrate.", href: "/resume-skills-finder" },
  { title: "Job application tracker", description: "Record applications, interviews and follow-ups in your browser.", href: "/job-application-tracker" },
  { title: "Remote jobs", description: "Browse remote openings, check applicant locations and prepare a CV for a role.", href: "/jobs" },
  { title: "Resume summary generator", description: "Draft a summary based on your own experience.", href: "/resume-summary-generator" },
  { title: "Cover letter builder", description: "Prepare a cover letter for a specific application.", href: "/cover-letter" },
];

export default function ToolsPage() {
  return <div className="min-h-screen bg-slate-50"><Navbar /><main className="mx-auto max-w-6xl px-4 pb-20 pt-32 sm:px-6"><div className="max-w-3xl"><p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">Plan your next application</p><h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Free resume and job search tools</h1><p className="mt-5 text-lg leading-relaxed text-slate-600">Choose the task you need help with now. From a first resume to tracking interviews, each tool has a clear purpose.</p></div><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{tools.map((tool) => <Link key={tool.href} href={tool.href} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md"><h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-700">{tool.title}</h2><p className="mt-3 text-sm leading-6 text-slate-600">{tool.description}</p><span className="mt-5 inline-block text-sm font-semibold text-blue-700">Open tool →</span></Link>)}</div><p className="mt-12 text-sm text-slate-600">Looking for a complete example? See <Link href="/resume-examples" className="font-semibold text-blue-700 underline">resume examples by role</Link>.</p></main><Footer /></div>;
}
