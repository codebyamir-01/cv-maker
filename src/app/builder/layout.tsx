import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Resume Builder — Create Your Resume Online | Smart Resume Maker",
  description: "Build your professional resume online for free. ATS-friendly templates, AI suggestions, instant PDF download. No watermarks, no sign-up required.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.smartresumemaker.com/builder",
  },
};

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
