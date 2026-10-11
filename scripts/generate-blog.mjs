import fs from "fs/promises";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("\x1b[31m[ERROR]\x1b[0m GEMINI_API_KEY is not set in .env.local or .env");
  console.error("Please add: GEMINI_API_KEY=your_api_key to your .env.local file.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

// Curated high-CTR fallback topics when none is passed via CLI
const DEFAULT_TOPICS = [
  "How to Include AI Skills on Your Resume in 2026",
  "Top 10 Resume Mistakes Hiring Managers Hate in 2026",
  "Cybersecurity Resume Guide with Real ATS Examples",
  "How to Explain a Career Change on Your Resume",
  "Product Manager Resume Guide for High-Growth Tech",
  "How to Write an Executive Summary That Gets Read",
  "The Perfect DevOps & Cloud Engineer Resume Template"
];

// Available blog banner images in /public/images/blog
const AVAILABLE_IMAGES = [
  "/images/blog/blog_product_manager.jpg",
  "/images/blog/blog_software_engineer_realistic.jpg",
  "/images/blog/blog_job_interview.jpg",
  "/images/blog/blog_ats_resume.png",
  "/images/blog/blog_action_verbs.png",
  "/images/blog/blog_professional_summary.png",
  "/images/blog/blog_list_skills.png",
  "/images/blog/blog_cover_letter.png",
  "/images/blog/blog_one_vs_two_page.png",
  "/images/blog/blog_employment_gaps.png",
  "/images/blog/blog_linkedin_profile.png",
];

function escapeJsxText(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/'/g, "&apos;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function getNextPostId() {
  const postsDir = path.join(process.cwd(), "src", "lib", "posts");
  const files = await fs.readdir(postsDir);
  let maxId = 0;
  for (const file of files) {
    const match = file.match(/^post-(\d+)\.tsx$/);
    if (match) {
      const id = parseInt(match[1], 10);
      if (id > maxId) maxId = id;
    }
  }
  return maxId + 1;
}

async function main() {
  const customTopic = process.argv.slice(2).join(" ").trim();
  const selectedTopic = customTopic || DEFAULT_TOPICS[Math.floor(Math.random() * DEFAULT_TOPICS.length)];

  console.log("\x1b[36m%s\x1b[0m", "=================================================");
  console.log("\x1b[32m%s\x1b[0m", "🚀 Smart Resume Maker — AI Blog Generator");
  console.log("\x1b[36m%s\x1b[0m", "=================================================");
  console.log(`Target Topic: "${selectedTopic}"\n`);

  const nextId = await getNextPostId();
  console.log(`Allocating Post ID: #${nextId}...`);

  const prompt = `You are a world-class career expert, executive resume writer, and SEO strategist for Smart Resume Maker (smartresumemaker.com).
Generate an authoritative, deeply practical 1,200+ word resume/career guide for the topic: "${selectedTopic}".

CRITICAL INSTRUCTIONS:
1. Provide actionable advice with real resume bullet points, metrics, and step-by-step guidance.
2. Tone: Professional, encouraging, modern (set in 2026).
3. Include specific keyword targets that help job applicants pass modern AI and ATS filters.
4. Output MUST be ONLY valid JSON matching this schema:

{
  "title": "Engaging, high-CTR article title (60-70 chars max)",
  "excerpt": "Punchy 2-sentence summary hook (140-160 chars)",
  "category": "Choose one: ATS Tips | Writing Tips | Resume Advice | Tech Careers | Job Search | Career Tips",
  "categoryColor": "Choose corresponding: bg-emerald-100 text-emerald-700 (ATS Tips) | bg-blue-100 text-blue-700 (Writing Tips) | bg-purple-100 text-purple-700 (Resume Advice) | bg-cyan-100 text-cyan-700 (Tech Careers) | bg-amber-100 text-amber-700 (Job Search) | bg-indigo-100 text-indigo-700 (Career Tips)",
  "readTime": "8 min read",
  "slug": "url-friendly-slug-without-symbols",
  "author": "Sarah Jenkins",
  "metaTitle": "SEO title under 60 characters with | Smart Resume Maker",
  "metaDescription": "Compelling meta description under 155 characters summarizing the article for Google Search.",
  "bannerAlt": "Descriptive accessibility alt text for the banner image",
  "relatedSlugs": ["ats-friendly-resume-2026", "resume-action-verbs"],
  "faqs": [
    {
      "question": "Clear FAQ question 1?",
      "answer": "Clear, practical answer 1."
    },
    {
      "question": "Clear FAQ question 2?",
      "answer": "Clear, practical answer 2."
    },
    {
      "question": "Clear FAQ question 3?",
      "answer": "Clear, practical answer 3."
    }
  ],
  "sections": [
    {
      "heading": "Section Heading 1",
      "paragraphs": [
        "Paragraph 1 text...",
        "Paragraph 2 text..."
      ],
      "bulletPoints": [
        "Actionable bullet point 1...",
        "Actionable bullet point 2..."
      ],
      "proTip": "Expert pro-tip advice..."
    }
  ]
}

Ensure you provide 4 to 6 comprehensive sections with rich paragraphs and concrete resume examples.`;

  console.log("Generating SEO content via Gemini API (gemini-flash-latest)...");
  let response;
  try {
    response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: { responseMimeType: "application/json" }
    });
  } catch (err) {
    console.warn("Retrying with gemini-3.5-flash fallback...", err.message);
    response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: { responseMimeType: "application/json" }
    });
  }

  const rawText = response.text || "{}";
  let article;
  try {
    article = JSON.parse(rawText);
  } catch (err) {
    const cleaned = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
    article = JSON.parse(cleaned);
  }

  // Pick suitable banner image from available assets
  const randomImage = AVAILABLE_IMAGES[Math.floor(Math.random() * AVAILABLE_IMAGES.length)];
  const bannerImage = randomImage;

  // Format today's date in "MMM DD, YYYY" format
  const dateStr = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  console.log(`Title: "${article.title}"`);
  console.log(`Slug: /blog/${article.slug}`);

  // Generate JSX body
  const sectionsJsx = article.sections.map((section) => {
    const heading = section.heading ? `      <h2>${escapeJsxText(section.heading)}</h2>\n` : "";
    const paras = (section.paragraphs || [])
      .map(p => `      <p>${escapeJsxText(p)}</p>`)
      .join("\n");
    
    const bullets = (section.bulletPoints && section.bulletPoints.length > 0)
      ? `\n      <ul>\n${section.bulletPoints.map(b => `        <li>${escapeJsxText(b)}</li>`).join("\n")}\n      </ul>`
      : "";

    const callout = section.proTip
      ? `\n      <div className="my-8 rounded-2xl border border-blue-100 bg-blue-50/70 p-6 text-slate-800 shadow-sm not-prose">\n        <div className="flex items-center gap-2 font-bold text-blue-900 mb-2">\n          <span className="text-lg">💡</span> Pro Tip\n        </div>\n        <p className="text-sm leading-relaxed text-slate-700 m-0">${escapeJsxText(section.proTip)}</p>\n      </div>`
      : "";

    return `${heading}${paras}${bullets}${callout}`;
  }).join("\n\n");

  // Construct post file content
  const postFileContent = `import React from 'react';
import Link from 'next/link';
import { BlogPost } from '../blog-types';

export const post${nextId}: BlogPost = {
  id: ${nextId},
  title: "${escapeJsxText(article.title)}",
  excerpt: "${escapeJsxText(article.excerpt)}",
  category: "${escapeJsxText(article.category || "Career Tips")}",
  categoryColor: "${article.categoryColor || "bg-blue-100 text-blue-700"}",
  readTime: "${escapeJsxText(article.readTime || "7 min read")}",
  date: "${dateStr}",
  slug: "${article.slug}",
  author: "${escapeJsxText(article.author || "Smart Resume Team")}",
  metaTitle: "${escapeJsxText(article.metaTitle || article.title)}",
  metaDescription: "${escapeJsxText(article.metaDescription || article.excerpt)}",
  bannerImage: "${bannerImage}",
  bannerAlt: "${escapeJsxText(article.bannerAlt || article.title)}",
  relatedSlugs: ${JSON.stringify(article.relatedSlugs || ["ats-friendly-resume-2026", "resume-action-verbs"])},
  faqs: ${JSON.stringify(article.faqs || [], null, 2)},
  fullContent: (
    <>
      <p className="lead">
        ${escapeJsxText(article.excerpt)}
      </p>

${sectionsJsx}

      <div className="my-10 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white not-prose shadow-lg text-center">
        <h3 className="text-2xl font-extrabold mb-2 text-white">Ready to Put This Into Practice?</h3>
        <p className="text-blue-100 text-sm max-w-xl mx-auto mb-6">
          Create an ATS-compliant resume in less than 5 minutes with our free AI builder. Instant PDF download — no watermarks.
        </p>
        <Link
          href="/builder"
          className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50 transition-colors shadow-md"
        >
          Build Your Free Resume Now →
        </Link>
      </div>
    </>
  )
};
`;

  // 1. Write the new post file
  const postFilePath = path.join(process.cwd(), "src", "lib", "posts", `post-${nextId}.tsx`);
  await fs.writeFile(postFilePath, postFileContent, "utf-8");
  console.log(`\x1b[32m✔ Created\x1b[0m ${postFilePath}`);

  // 2. Update src/lib/blog-data.tsx
  const blogDataPath = path.join(process.cwd(), "src", "lib", "blog-data.tsx");
  let blogDataContent = await fs.readFile(blogDataPath, "utf-8");

  // Add import right before export const BLOG_POSTS
  const importStatement = `import { post${nextId} } from "./posts/post-${nextId}";\n`;
  blogDataContent = blogDataContent.replace(
    /export const BLOG_POSTS: BlogPost\[\] = \[/,
    `${importStatement}export const BLOG_POSTS: BlogPost[] = [\n  post${nextId},`
  );

  await fs.writeFile(blogDataPath, blogDataContent, "utf-8");
  console.log(`\x1b[32m✔ Updated\x1b[0m ${blogDataPath}`);

  console.log("\n\x1b[32m%s\x1b[0m", `🎉 Successfully generated & published: "${article.title}"!`);
  console.log(`URL: http://localhost:3000/blog/${article.slug}`);
  console.log("Sitemap and blog index have been automatically registered.");
}

main().catch((err) => {
  console.error("\x1b[31m[ERROR]\x1b[0m Failed to generate blog post:", err);
  process.exit(1);
});
