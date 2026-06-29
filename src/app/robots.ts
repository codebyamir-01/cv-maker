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
          "/resume-examples",
          "/resume-examples/",
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
          "/upload",
        ],
      },
    ],
    sitemap: "https://www.smartresumemaker.com/sitemap.xml",
  };
}
