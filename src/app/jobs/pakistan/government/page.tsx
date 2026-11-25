import type { Metadata } from "next";
import Link from "next/link";
import { JobsLanding } from "@/components/jobs/JobsLanding";
import { getJobs } from "@/lib/job-feeds";

export const revalidate = 0;
export const metadata: Metadata = {
  title: "Pakistan Government Jobs with Deadlines | Smart Resume Maker",
  description: "Browse Pakistan government vacancies with listed deadlines, verify the original advertisement, and prepare your CV before applying.",
  alternates: { canonical: "https://www.smartresumemaker.com/jobs/pakistan/government" },
};

export default async function GovernmentJobsPage() {
  const collection = await getJobs({ pakistan: true, remote: false, governmentOnly: true });
  return <JobsLanding section="government" eyebrow="Pakistan public-sector vacancies" title="Pakistan government jobs" intro="These third-party listings are marked as government roles by their provider and have a future application deadline. Verify each position, eligibility rule, and application route in the hiring organization&apos;s official advertisement." listHeading="Government vacancies with listed closing dates" collection={collection}>
    <div className="grid gap-6 md:grid-cols-3">
      <div><h2 className="text-lg font-bold text-slate-900">Verify the notice</h2><p className="mt-2 text-sm leading-6">Open the source listing, then follow its official advertisement or department link. Confirm the position, BPS or pay scale, location, and number of posts. A third-party summary can omit important conditions.</p></div>
      <div><h2 className="text-lg font-bold text-slate-900">Check the closing date</h2><p className="mt-2 text-sm leading-6">Dates on this page come from the provider. Look for the time zone and submission cut-off on the official notice. Vacancies with missing or past deadlines are excluded from this page.</p></div>
      <div><h2 className="text-lg font-bold text-slate-900">Prepare before applying</h2><p className="mt-2 text-sm leading-6">Gather the documents requested by the department. Use the <Link href="/builder" className="font-semibold text-blue-700 underline">CV builder</Link> if a CV is required, and record the closing date in the <Link href="/job-application-tracker" className="font-semibold text-blue-700 underline">application tracker</Link>.</p></div>
    </div>
    <p className="text-sm leading-6">You can also check the Government of Pakistan&apos;s <a href="https://www.njp.gov.pk/index.php/jobs" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 underline">National Jobs Portal</a> directly. We are an independent CV website and are not affiliated with that portal or any hiring department.</p>
  </JobsLanding>;
}
