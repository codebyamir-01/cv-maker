import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Resume Summary Generator | 3 Editable Drafts",
  description: "Enter a job title and your real skills to get three resume summary drafts. Copy a draft, check every claim, and tailor it to the job before using it.",
  alternates: {
    canonical: "https://www.smartresumemaker.com/resume-summary-generator",
  },
};

export default function ResumeSummaryGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
