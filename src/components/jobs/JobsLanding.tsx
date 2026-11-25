import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JobsExplorer } from "@/components/jobs/JobsExplorer";
import type { JobsCollection } from "@/lib/job-feeds";

const sections = [
  { href: "/jobs", label: "All jobs", key: "all" },
  { href: "/jobs/pakistan", label: "Pakistan", key: "pakistan" },
  { href: "/jobs/pakistan/government", label: "Government", key: "government" },
  { href: "/jobs/remote", label: "Global remote", key: "remote" },
  { href: "/jobs/engineering", label: "Engineering", key: "engineering" },
];

type Props = {
  section: string;
  eyebrow: string;
  title: string;
  intro: string;
  listHeading: string;
  collection: JobsCollection;
  initialQuery?: string;
  children: React.ReactNode;
};

export function JobsLanding({ section, eyebrow, title, intro, listHeading, collection, initialQuery, children }: Props) {
  return <div className="min-h-screen bg-slate-50">
    <Navbar />
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-32 sm:px-6">
      <div className="max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">{eyebrow}</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">{title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-600">{intro}</p>
      </div>
      <nav aria-label="Job categories" className="mt-8 flex flex-wrap gap-2">
        {sections.map((item) => <Link key={item.href} href={item.href} aria-current={section === item.key ? "page" : undefined} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700">{item.label}</Link>)}
      </nav>
      <JobsExplorer collection={collection} heading={listHeading} section={section} initialQuery={initialQuery} />
      <section className="mt-16 space-y-7 border-t border-slate-200 pt-10 text-slate-700" aria-label="Job search guidance">{children}</section>
      <p className="mt-10 text-sm leading-6 text-slate-600">Pakistan listings come from <a href="https://skillzdunya.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 underline">SkillzDunya</a>; remote listings come from <a href="https://remotive.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 underline">Remotive</a>. We do not employ applicants or process applications. Confirm opening status, eligibility, and deadlines on the hiring organization&apos;s site.</p>
    </main>
    <Footer />
  </div>;
}
