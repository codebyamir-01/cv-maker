import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/builder",
          "/templates",
          "/blog",
          "/blog/",
          "/contact",
          "/about",
          "/free-resume-builder",
          "/ats-resume-builder",
          "/ats-resume-checker",
          "/cover-letter",
          "/resume-summary-generator",
          "/resume-examples",
          "/resume-examples/",
          "/upload",
          "/privacy",
          "/terms",
          "/cookies",
        ],
        disallow: [
          "/dashboard",
          "/dashboard/",
          "/login",
          "/signup",
          "/forgot-password",
          "/api/",
          "/admin",
          "/r/",
        ],
      },
    ],
    sitemap: "https://www.smartresumemaker.com/sitemap.xml",
  };
}
