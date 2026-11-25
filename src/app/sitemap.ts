import { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/blog-data';
import { RESUME_EXAMPLES } from '@/lib/resume-examples-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.smartresumemaker.com';
  // Every published guide received a visible editorial update on this date.
  const editorialRefresh = new Date('2026-11-23T00:00:00.000Z');

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/builder`,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/templates`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/free-resume-builder`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ats-resume-builder`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ats-resume-checker`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cover-letter`,
      changeFrequency: 'monthly',
      priority: 0.88,
    },
    {
      url: `${baseUrl}/resume-summary-generator`,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/resume-examples`,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/tools`,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/resume-skills-finder`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/job-application-tracker`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jobs`,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    { url: `${baseUrl}/jobs/pakistan`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/jobs/pakistan/government`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/jobs/remote`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/jobs/engineering`, changeFrequency: 'daily', priority: 0.8 },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(Math.max(new Date(post.date).getTime(), editorialRefresh.getTime())),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const exampleRoutes: MetadataRoute.Sitemap = RESUME_EXAMPLES.map((example) => ({
    url: `${baseUrl}/resume-examples/${example.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // NOTE: Excluded from sitemap (noindex pages):
  // /dashboard, /dashboard/*, /login, /signup, /forgot-password, /api/*, /admin, /r/*
  return [...staticRoutes, ...blogRoutes, ...exampleRoutes];
}
