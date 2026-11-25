import type { Metadata } from "next";
import Link from "next/link";
import { JobsLanding } from "@/components/jobs/JobsLanding";
import { getJobs } from "@/lib/job-feeds";

export const revalidate = 0;
export const metadata: Metadata = {
  title: "Jobs in Pakistan: Current Vacancies and CV Help | Smart Resume Maker",
  description: "Browse current jobs in Pakistan, compare cities and application deadlines, and prepare a CV for the role you choose.",
  alternates: { canonical: "https://www.smartresumemaker.com/jobs/pakistan" },
};

export default async function PakistanJobsPage() {
  const collection = await getJobs({ pakistan: true, remote: false });
  return <JobsLanding section="pakistan" eyebrow="Local job search" title="Jobs in Pakistan" intro="Explore recent Pakistan vacancies from an attributed third-party feed. Listings may include government and private roles; read the original advertisement to confirm requirements and where to apply." listHeading="Recent Pakistan vacancies" collection={collection}>
    <div className="grid gap-6 md:grid-cols-3">
      <div><h2 className="text-lg font-bold text-slate-900">Filter by location</h2><p className="mt-2 text-sm leading-6">The cards show cities supplied by the source. A missing city is marked clearly. Check whether a post accepts applicants from your city before preparing documents or traveling.</p></div>
      <div><h2 className="text-lg font-bold text-slate-900">Compare requirements</h2><p className="mt-2 text-sm leading-6">Open the source listing and read the education, experience, and age requirements. Do not infer eligibility from a title or a city alone, especially for public-sector vacancies.</p></div>
      <div><h2 className="text-lg font-bold text-slate-900">Make a relevant CV</h2><p className="mt-2 text-sm leading-6">Describe real work and qualifications that match the notice. Our <Link href="/builder" className="font-semibold text-blue-700 underline">CV builder</Link> can organize the result; the <Link href="/job-application-tracker" className="font-semibold text-blue-700 underline">tracker</Link> can hold your deadline and follow-up notes.</p></div>
    </div>
    <p className="text-sm leading-6">Want only public-sector openings? Use the <Link href="/jobs/pakistan/government" className="font-semibold text-blue-700 underline">Pakistan government jobs page</Link>. For jobs open to applicants in other countries, check each <Link href="/jobs/remote" className="font-semibold text-blue-700 underline">remote listing&apos;s location restriction</Link>.</p>
  </JobsLanding>;
}
