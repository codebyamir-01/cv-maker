import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Ga4Tracker } from "@/components/analytics/Ga4Tracker";
import Script from "next/script";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Free Resume Builder & CV Maker Online | Smart Resume Maker",
  description: "Create a professional resume online with customizable templates, writing help, and PDF download. Build and edit your resume for free.",
  metadataBase: new URL("https://www.smartresumemaker.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="font-sans h-full antialiased overflow-x-hidden"
    >
      <head>
        {/* Google AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5652941069170288"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />

        {/* JSON-LD: WebApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Smart Resume Maker",
              "url": "https://www.smartresumemaker.com",
              "description": "Free online resume builder and CV maker. Start building without an account, then sign in to download a watermark-free PDF.",
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

        {/* Website identity; blog search is not exposed as a URL endpoint. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Smart Resume Maker",
              "url": "https://www.smartresumemaker.com"
            })
          }}
        />

      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden">
        <Providers>{children}</Providers>
        <SpeedInsights />
        <Analytics />
        <Ga4Tracker />
        <CookieBanner />
      </body>
    </html>
  );
}
