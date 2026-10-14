import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['172.19.86.124'],

  // Optimize images for mobile — serve AVIF/WebP automatically
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Enable compression for better TTFB on mobile
  compress: true,

  // Reduce page header sizes
  poweredByHeader: false,

  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts'],
  },

  // HTTP headers for caching static assets
  async headers() {
    return [
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // 301 Permanent Redirects for legacy URLs reported by Google Search Console
  async redirects() {
    return [
      {
        source: "/blog/software-engineer-resume-format",
        destination: "/blog/best-resume-format-software-engineers",
        permanent: true,
      },
      {
        source: "/blog/professional-summary-guide",
        destination: "/blog/how-to-write-professional-summary",
        permanent: true,
      },
      {
        source: "/blog/linkedin-vs-resume",
        destination: "/blog/linkedin-profile-vs-resume",
        permanent: true,
      },
      {
        source: "/blog/explain-employment-gaps",
        destination: "/blog/how-to-explain-employment-gaps",
        permanent: true,
      },
      {
        source: "/blog/how-to-list-skills-resume",
        destination: "/blog/how-to-list-skills-on-resume",
        permanent: true,
      },
      {
        source: "/blog/one-vs-two-page-resume",
        destination: "/blog/one-page-vs-two-page-resume",
        permanent: true,
      },
      {
        source: "/blog/fresh-graduate-resume-tips",
        destination: "/blog/resume-tips-for-fresh-graduates",
        permanent: true,
      },
    ];
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(nextConfig);
