import type { Metadata } from "next";
import Link from "next/link";
import { JobsLanding } from "@/components/jobs/JobsLanding";
import { getJobs } from "@/lib/job-feeds";

export const revalidate = 0;
type Props = { searchParams: Promise<{ q?: string | string[] }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const q = (await searchParams).q;
  return {
    title: "Find Jobs in Pakistan and Remote Jobs | Smart Resume Maker",
    description: "Search current Pakistan and remote vacancies, check location and deadline details, then prepare a CV for the role.",
    alternates: { canonical: "https://www.smartresumemaker.com/jobs" },
    ...(q ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function JobsPage({ searchParams }: Props) {
  const raw = (await searchParams).q;
  const query = typeof raw === "string" ? raw.trim().slice(0, 80) : "";
  const collection = await getJobs({ pakistan: true, remote: true, query });
  return <JobsLanding section="all" eyebrow="Find a role, then prepare your application" title={query ? `Jobs matching “${query}”` : "Jobs in Pakistan and worldwide remote roles"} intro="Browse current vacancies from two attributed sources. Check where you can work, review any application deadline, and use the CV builder to prepare for a role. Viewing listings does not require an account." listHeading={query ? "Search results from available sources" : "Latest jobs from available sources"} initialQuery={query} collection={collection}>
    <div className="grid gap-6 md:grid-cols-3">
      <div><h2 className="text-lg font-bold text-slate-900">Explore by job type</h2><p className="mt-2 text-sm leading-6">See <Link href="/jobs/pakistan" className="font-semibold text-blue-700 underline">Pakistan jobs</Link> for local roles, <Link href="/jobs/pakistan/government" className="font-semibold text-blue-700 underline">government vacancies</Link> with listed closing dates, and <Link href="/jobs/remote" className="font-semibold text-blue-700 underline">remote jobs</Link> with applicant location rules.</p></div>
      <div><h2 className="text-lg font-bold text-slate-900">Check the original notice</h2><p className="mt-2 text-sm leading-6">A third-party listing may change after we fetch it. Review the hiring organization&apos;s requirements, application method, and deadline before sharing your information.</p></div>
      <div><h2 className="text-lg font-bold text-slate-900">Prepare and track</h2><p className="mt-2 text-sm leading-6">Use the <Link href="/builder" className="font-semibold text-blue-700 underline">CV builder</Link> to show relevant work you have done. Keep your applications and follow-up dates in the <Link href="/job-application-tracker" className="font-semibold text-blue-700 underline">job tracker</Link>.</p></div>
    </div>
  </JobsLanding>;
}
