import { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/blog-data';

// All resume example slugs
const EXAMPLE_SLUGS = [
  'software-engineer',
  'student-resume',
  'fresh-graduate',
  'teacher',
  'sales-representative',
  'marketing-specialist',
  'project-manager',
  'customer-support',
  'data-analyst',
  'graphic-designer',
  'accountant',
  'nurse-healthcare',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.smartresumemaker.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/builder`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/templates`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/free-resume-builder`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ats-resume-builder`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resume-examples`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const exampleRoutes: MetadataRoute.Sitemap = EXAMPLE_SLUGS.map((slug) => ({
    url: `${baseUrl}/resume-examples/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // NOTE: Excluded from sitemap (noindex pages):
  // /dashboard, /dashboard/*, /login, /signup, /forgot-password, /api/*, /admin, /upload
  return [...staticRoutes, ...blogRoutes, ...exampleRoutes];
}
