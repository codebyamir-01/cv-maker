import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ATS-Friendly Resume & CV Maker - Land Your Dream Job",
  description: "Create professional, modern, and ATS-friendly resumes. Get step-by-step guidance, resume scoring, mistake detection, and job-description matching.",
  keywords: "resume builder, cv maker, ats friendly resume, resume templates, job match, career",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cvmaker.vercel.app",
    title: "ATS-Friendly Resume & CV Maker - Land Your Dream Job",
    description: "Create professional, modern, and ATS-friendly resumes in minutes.",
    siteName: "CV Maker",
  },
  twitter: {
    card: "summary_large_image",
    title: "CV Maker - Land Your Dream Job",
    description: "Create professional, modern, and ATS-friendly resumes in minutes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
