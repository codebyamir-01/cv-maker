import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RemoteJobsExplorer } from "@/components/jobs/RemoteJobsExplorer";
import { getRemoteJobs } from "@/lib/remote-jobs";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Remote Jobs and CV Builder | Smart Resume Maker",
  description: "Browse remote job openings with clear location requirements, prepare a tailored CV, and continue to the original application listing.",
  alternates: { canonical: "https://www.smartresumemaker.com/jobs" },
};

export default async function JobsPage() {
  const feed = await getRemoteJobs();

  return <div className="min-h-screen bg-slate-50">
    <Navbar />
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-32 sm:px-6">
      <div className="max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">Find a role, then prepare your application</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Remote jobs and CV tools</h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-600">Explore remote openings, check where applicants can work from, and build a CV that explains your relevant experience. Viewing jobs is free and does not require an account.</p>
      </div>

      {feed ? <RemoteJobsExplorer jobs={feed.jobs} fetchedAt={feed.fetchedAt} /> : <section className="mt-12 rounded-2xl border border-amber-200 bg-amber-50 p-6" aria-labelledby="jobs-unavailable">
        <h2 id="jobs-unavailable" className="text-xl font-bold text-slate-900">Job listings are temporarily unavailable</h2>
        <p className="mt-2 text-sm leading-6 text-slate-700">The external feed could not be refreshed. Please check again later. You can still <Link href="/builder" className="font-semibold text-blue-700 underline">build your CV</Link> or <Link href="/job-application-tracker" className="font-semibold text-blue-700 underline">track applications</Link>.</p>
      </section>}

      <section className="mt-16 grid gap-6 md:grid-cols-3" aria-label="Prepare a job application">
        <div className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-lg font-bold text-slate-900">Check location eligibility</h2><p className="mt-3 text-sm leading-6 text-slate-600">A remote job may be restricted to a country or region. Read the full listing on Remotive before applying, including time zone and work authorization requirements.</p></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-lg font-bold text-slate-900">Tailor your CV honestly</h2><p className="mt-3 text-sm leading-6 text-slate-600">Compare the employer&apos;s requirements with your real experience. Use our <Link href="/builder" className="font-semibold text-blue-700 underline">CV builder</Link> to put relevant evidence first; use the <Link href="/ats-resume-checker" className="font-semibold text-blue-700 underline">readability checker</Link> to review your PDF.</p></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-lg font-bold text-slate-900">Keep applications organized</h2><p className="mt-3 text-sm leading-6 text-slate-600">Open the original listing to apply. Save the company, link, and follow-up date in the <Link href="/job-application-tracker" className="font-semibold text-blue-700 underline">job application tracker</Link>. Its entries stay in your browser.</p></div>
      </section>
      <p className="mt-10 text-sm leading-6 text-slate-600">Listings are provided by <a href="https://remotive.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 underline">Remotive</a>, whose public feed delays postings by 24 hours. Smart Resume Maker does not employ applicants or process job applications.</p>
    </main>
    <Footer />
  </div>;
}
