import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload Your Resume | Smart Resume Maker",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://www.smartresumemaker.com/upload",
  },
};

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
