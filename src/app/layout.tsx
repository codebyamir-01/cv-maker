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
});

import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "ATS-Friendly Resume & CV Maker - Land Your Dream Job",
  description: "Create professional, modern, and ATS-friendly resumes. Get step-by-step guidance, resume scoring, mistake detection, and job-description matching.",
  keywords: "resume builder, cv maker, ats friendly resume, resume templates, job match, career",
  metadataBase: new URL("https://www.smartresumemaker.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.smartresumemaker.com",
    title: "ATS-Friendly Resume & CV Maker - Land Your Dream Job",
    description: "Create professional, modern, and ATS-friendly resumes in minutes.",
    siteName: "Smart Resume Maker",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Smart Resume Maker - Build ATS-Friendly Resumes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Resume Maker - Land Your Dream Job",
    description: "Create professional, modern, and ATS-friendly resumes in minutes.",
    images: ["/opengraph-image.png"],
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
