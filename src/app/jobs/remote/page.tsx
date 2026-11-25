import type { Metadata } from "next";
import Link from "next/link";
import { JobsLanding } from "@/components/jobs/JobsLanding";
import { getJobs } from "@/lib/job-feeds";

export const revalidate = 0;
export const metadata: Metadata = {
  title: "Remote Jobs: Location Rules and CV Tips | Smart Resume Maker",
  description: "Browse remote vacancies, check which countries may apply, and prepare a focused CV before following the original listing.",
  alternates: { canonical: "https://www.smartresumemaker.com/jobs/remote" },
};

export default async function RemoteJobsPage() {
  const collection = await getJobs({ pakistan: false, remote: true });
  return <JobsLanding section="remote" eyebrow="Work from an eligible location" title="Remote jobs" intro="Browse remote roles from Remotive's public feed. A remote label does not mean every country is eligible: read each listing's applicant location, time zone, and work-authorization requirements before applying." listHeading="Current remote listings" collection={collection}>
    <div className="grid gap-6 md:grid-cols-3">
      <div><h2 className="text-lg font-bold text-slate-900">Check the applicant region</h2><p className="mt-2 text-sm leading-6">Some jobs accept candidates worldwide; others specify a country or region. If you live in Pakistan, a US-only remote role may still be unavailable to you.</p></div>
      <div><h2 className="text-lg font-bold text-slate-900">Read the original listing</h2><p className="mt-2 text-sm leading-6">The public feed is delayed by about 24 hours. Confirm that the role is still open and check any schedule, salary currency, and employment type on Remotive before applying.</p></div>
      <div><h2 className="text-lg font-bold text-slate-900">Show remote experience</h2><p className="mt-2 text-sm leading-6">On your <Link href="/builder" className="font-semibold text-blue-700 underline">CV</Link>, explain real collaboration across locations, written communication, and results when relevant. There is no special keyword that guarantees a remote job.</p></div>
    </div>
  </JobsLanding>;
}
