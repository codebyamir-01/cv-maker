import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RESUME_EXAMPLES } from "@/lib/resume-examples-data";
import { ResumeSkillsFinder } from "@/components/tools/ResumeSkillsFinder";

export const metadata: Metadata = {
  title: "Resume Skills Finder by Job Title | Smart Resume Maker",
  description: "Browse practical resume skill examples by job title. Select skills you genuinely have, copy your list, and explore a matching resume example.",
  alternates: { canonical: "https://www.smartresumemaker.com/resume-skills-finder" },
};

export default function ResumeSkillsFinderPage() {
  return <div className="min-h-screen bg-slate-50"><Navbar /><main className="mx-auto max-w-6xl px-4 pb-20 pt-32 sm:px-6"><div className="max-w-3xl"><p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">Free resume writing tool</p><h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Resume Skills Finder</h1><p className="mt-5 text-lg leading-relaxed text-slate-600">Find skills relevant to your target role, choose the ones you can demonstrate, and copy a short list for your resume. These examples are prompts, not a claim about your experience.</p></div><ResumeSkillsFinder examples={RESUME_EXAMPLES.map(({ slug, role, skills }) => ({ slug, role, skills }))} /><section className="mt-14 max-w-3xl rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-xl font-bold text-slate-900">How to choose resume skills</h2><p className="mt-3 leading-7 text-slate-600">Read the job posting, then choose skills you have used in work, study, volunteering or projects. Put the most relevant skills first. Support important skills with a specific example in your experience section. Do not add a skill solely because it appears in a posting.</p><p className="mt-4 text-sm text-slate-600">Need a complete structure? Browse <Link href="/resume-examples" className="font-semibold text-blue-700 underline">role-specific resume examples</Link> or open the <Link href="/builder" className="font-semibold text-blue-700 underline">resume builder</Link>.</p></section></main><Footer /></div>;
}
