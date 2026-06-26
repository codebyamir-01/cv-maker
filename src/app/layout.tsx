import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

import { CookieBanner } from "@/components/layout/CookieBanner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700", "800"],
});

import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "ATS-Friendly Resume & CV Maker - Land Your Dream Job",
  description: "Create professional, modern, and ATS-friendly resumes. Get step-by-step guidance, resume scoring, mistake detection, and job-description matching.",
  keywords: "resume builder, cv maker, ats friendly resume, resume templates, job match, career",
  metadataBase: new URL("https://cvmaker.vercel.app"),
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
      className={`${inter.variable} font-sans h-full antialiased overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden">
        <Providers>{children}</Providers>
        <SpeedInsights />
        <Analytics />
        <CookieBanner />
      </body>
    </html>
  );
}
