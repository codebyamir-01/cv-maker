import type { Metadata } from "next";
import Link from "next/link";
import { JobsLanding } from "@/components/jobs/JobsLanding";
import { getJobs } from "@/lib/job-feeds";

export const revalidate = 0;
export const metadata: Metadata = {
  title: "Engineering Jobs in Pakistan and Remote | Smart Resume Maker",
  description: "Find engineering vacancies in Pakistan and remote roles, compare eligibility and deadlines, then build a focused engineering CV.",
  alternates: { canonical: "https://www.smartresumemaker.com/jobs/engineering" },
};

export default async function EngineeringJobsPage() {
  const collection = await getJobs({ pakistan: true, remote: true, query: "engineer", engineeringOnly: true });
  return <JobsLanding section="engineering" eyebrow="Engineering careers" title="Engineering jobs in Pakistan and remote" intro="Browse current listings whose titles mention engineering. The available roles can include software, civil, electrical, and other engineering fields. Check the original description for discipline, qualifications, registration, and location eligibility." listHeading="Engineering roles from available sources" collection={collection}>
    <div className="grid gap-6 md:grid-cols-3">
      <div><h2 className="text-lg font-bold text-slate-900">Check your discipline</h2><p className="mt-2 text-sm leading-6">A search for engineer can surface very different work. Open the listing to check whether it needs software skills, site experience, a particular degree, or professional registration.</p></div>
      <div><h2 className="text-lg font-bold text-slate-900">Show evidence on your CV</h2><p className="mt-2 text-sm leading-6">Use the <Link href="/builder" className="font-semibold text-blue-700 underline">CV builder</Link> to describe projects, tools, and measurable results you can substantiate. Match the vacancy&apos;s actual requirements without adding skills you have not used.</p></div>
      <div><h2 className="text-lg font-bold text-slate-900">Respect eligibility</h2><p className="mt-2 text-sm leading-6">Pakistan public-sector positions may specify age, domicile, pay grade, and a closing date. Remote roles may restrict countries. Verify these details on the original page before applying.</p></div>
    </div>
    <p className="text-sm leading-6">Looking for another title, such as technician or architect? Use the <Link href="/jobs" className="font-semibold text-blue-700 underline">full jobs search</Link>; this page intentionally includes only titles that mention engineering.</p>
  </JobsLanding>;
}
