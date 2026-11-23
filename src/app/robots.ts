import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/api/", "/admin", "/r/"],
    },
    sitemap: "https://www.smartresumemaker.com/sitemap.xml",
  };
}
