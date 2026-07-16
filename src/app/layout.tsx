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
  title: "Free Resume Builder & CV Maker 2026 — No Watermarks | Smart Resume Maker",
  description: "#1 free resume builder online. Create an ATS-friendly resume in 5 minutes. Expert templates, AI writing help, instant PDF — no watermarks, no hidden fees. Trusted by 10,000+ job seekers.",
  keywords: "free resume builder, cv maker online, resume maker, ats friendly resume, online resume builder, create resume online, resume templates, professional cv maker, free cv maker, build resume online, resume builder 2026, free cv builder no watermark, ats resume builder free",
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
        {/* JSON-LD: WebApplication */}
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

        {/* JSON-LD: Organization — enables Google Knowledge Panel */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Smart Resume Maker",
              "url": "https://www.smartresumemaker.com",
              "logo": "https://www.smartresumemaker.com/icon.svg",
              "sameAs": [],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer support",
                "url": "https://www.smartresumemaker.com/contact"
              }
            })
          }}
        />

        {/* JSON-LD: SiteLinksSearchBox — enables Google search box in SERPs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Smart Resume Maker",
              "url": "https://www.smartresumemaker.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://www.smartresumemaker.com/blog?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* JSON-LD: FAQPage — global FAQ rich results for homepage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Is Smart Resume Maker really free?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Smart Resume Maker is 100% free. You can build, edit, and download your resume as a PDF with no watermarks, no hidden fees, and no credit card required."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are the resume templates ATS-friendly?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. All templates are specifically designed to pass Applicant Tracking Systems (ATS). They use clean single-column layouts, standard fonts, and proper heading structure so your resume gets read by both software and humans."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I download my resume as a PDF for free?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. Click the download button at any time to instantly export a clean, professional PDF. No paywall, no watermark — ever."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How long does it take to build a resume?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most users create a complete, job-ready resume in under 10 minutes using our AI suggestions and pre-filled templates."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Does Smart Resume Maker use AI?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Our built-in AI suggests professional bullet points, summaries, and skills based on your job title — saving you hours of writing time."
                  }
                }
              ]
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
