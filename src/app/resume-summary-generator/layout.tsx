import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Resume Summary Generator 2026 | Smart Resume Maker",
  description: "Generate powerful, ATS-tailored professional resume summaries in seconds with AI. Pick from experienced, career changer, or fresh graduate styles.",
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
