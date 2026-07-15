import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Free Resume Builder & CV Maker Online | Smart Resume Maker",
  description: "Build a free, professional, ATS-friendly resume online in minutes. Smart Resume Maker offers expert templates, AI suggestions, and instant PDF download — no watermarks, no hidden fees.",
  keywords: "free resume builder, cv maker online, resume maker, ats friendly resume, online resume builder, create resume online, resume templates, professional cv maker, free cv maker, build resume online",
  metadataBase: new URL("https://www.smartresumemaker.com"),
  alternates: {
    canonical: "https://www.smartresumemaker.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.smartresumemaker.com",
    title: "Free Resume Builder & CV Maker Online | Smart Resume Maker",
    description: "Build a free, professional, ATS-friendly resume online in minutes. Expert templates, AI suggestions, and instant PDF download.",
    siteName: "Smart Resume Maker",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Smart Resume Maker - Free Online Resume Builder & CV Maker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Resume Builder & CV Maker Online | Smart Resume Maker",
    description: "Build a free, professional, ATS-friendly resume online in minutes. No watermarks, no hidden fees.",
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
      <head>
        {/* JSON-LD Structured Data — Tells Google this is a Free Web Application */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Smart Resume Maker",
              "url": "https://www.smartresumemaker.com",
              "description": "Free online resume builder and CV maker. Create ATS-friendly resumes with professional templates, AI suggestions, and instant PDF download.",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Free PDF Download",
                "ATS-Friendly Templates",
                "AI Resume Suggestions",
                "No Watermarks",
                "Auto-Save",
                "Multiple Resume Templates"
              ],
              "publisher": {
                "@type": "Organization",
                "name": "Smart Resume Maker",
                "url": "https://www.smartresumemaker.com"
              }
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden">
        <Providers>{children}</Providers>
        <SpeedInsights />
        <Analytics />
        <CookieBanner />
      </body>
    </html>
  );
}
