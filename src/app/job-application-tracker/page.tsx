import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JobApplicationTracker } from "@/components/tools/JobApplicationTracker";

export const metadata: Metadata = {
  title: "Free Job Application Tracker | Smart Resume Maker",
  description: "Track job applications, interviews and follow-up dates in your browser. Export your job search as a CSV spreadsheet. No account needed.",
  alternates: { canonical: "https://www.smartresumemaker.com/job-application-tracker" },
};

export default function JobApplicationTrackerPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-32 sm:px-6">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">Free job search tool</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Job Application Tracker</h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">Keep every application, interview and follow-up in one place. Add an opportunity below, update its status as you hear back, and export your list whenever you need a spreadsheet.</p>
        </div>
        <JobApplicationTracker />
        <section className="mt-16 grid gap-6 md:grid-cols-3" aria-label="How to track job applications">
          <div className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="font-bold text-slate-900">Record the essentials</h2><p className="mt-2 text-sm leading-6 text-slate-600">Save the company, role, job posting link and date you applied. Use the notes field for recruiter names or next steps.</p></div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="font-bold text-slate-900">Plan your follow-up</h2><p className="mt-2 text-sm leading-6 text-slate-600">Set a follow-up date and update the status after an interview or response. There are no automatic emails or reminders.</p></div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="font-bold text-slate-900">Prepare the next application</h2><p className="mt-2 text-sm leading-6 text-slate-600">Use our <Link className="font-medium text-blue-700 underline" href="/resume-examples">resume examples</Link> and <Link className="font-medium text-blue-700 underline" href="/builder">resume builder</Link> to tailor a new application.</p></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
