import fs from "fs/promises";
import path from "path";
import { execFileSync } from "child_process";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("\x1b[31m[ERROR]\x1b[0m GEMINI_API_KEY is not set in environment or .env.local");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

// 4 confirmed models ordered by preference
const SUPPORTED_MODELS = [
  "gemini-flash-latest",
  "gemini-3.7-flash",
  "gemini-3.5-flash",
  "gemini-2.5-flash"
];

// High-converting authentic editorial banners
const EDITORIAL_BANNERS = [
  "/images/blog/blog_product_manager.jpg",
  "/images/blog/blog_software_engineer_realistic.jpg",
  "/images/blog/blog_job_interview.jpg",
  "/images/blog/blog_ats_resume.png",
  "/images/blog/blog_action_verbs.png",
  "/images/blog/blog_professional_summary.png",
  "/images/blog/blog_list_skills.png",
  "/images/blog/blog_one_vs_two_page.png"
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

async function callGeminiWithFallbacks(prompt, isJson = true) {
  for (const model of SUPPORTED_MODELS) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const res = await ai.models.generateContent({
          model,
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          config: isJson ? { responseMimeType: "application/json" } : {}
        });
        if (res && res.text) {
          return { text: res.text, model };
        }
      } catch (err) {
        console.warn(`[${model} attempt ${attempt}] API warning: ${err.message}`);
        await new Promise(r => setTimeout(r, 2000 * attempt));
      }
    }
  }
  return null;
}

async function performHealthCheck() {
  console.log("\x1b[34m[1/4] Running Daily Website Health & SEO Audit...\x1b[0m");
  const postsDir = path.join(process.cwd(), "src", "lib", "posts");
  const files = await fs.readdir(postsDir);
  const postFiles = files.filter(f => f.startsWith("post-") && f.endsWith(".tsx"));

  const issues = [];
  const existingSlugs = [];
  const existingTitles = [];
  const existingDates = [];

  for (const file of postFiles) {
    const content = await fs.readFile(path.join(postsDir, file), "utf8");
    const slugMatch = content.match(/slug:\s*["']([^"']+)["']/);
    const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
    const dateMatch = content.match(/date:\s*["']([^"']+)["']/);
    const metaDescMatch = content.match(/metaDescription:\s*["']([^"']+)["']/);

    if (slugMatch) existingSlugs.push(slugMatch[1]);
    if (titleMatch) existingTitles.push(titleMatch[1]);
    if (dateMatch) existingDates.push(dateMatch[1]);
    if (metaDescMatch && metaDescMatch[1].length > 165) {
      issues.push(`Warning: Meta description in ${file} exceeds 165 characters (${metaDescMatch[1].length} chars).`);
    }
  }

  // Check sitemap.ts
  const sitemapContent = await fs.readFile(path.join(process.cwd(), "src", "app", "sitemap.ts"), "utf8");
  const hasBlogRoutes = sitemapContent.includes("BLOG_POSTS.map");

  // Check robots.ts
  const robotsContent = await fs.readFile(path.join(process.cwd(), "src", "app", "robots.ts"), "utf8");
  const hasSitemapLink = robotsContent.includes("sitemap.xml");

  const duplicateSlugs = existingSlugs.filter((slug, index) => existingSlugs.indexOf(slug) !== index);
  if (duplicateSlugs.length > 0) issues.push(`${duplicateSlugs.length} duplicate blog slugs found in source files.`);
  console.log(`Content source check: ${postFiles.length} blog files scanned.`);
  console.log(`✅ Dynamic Sitemap Auto-Sync: ${hasBlogRoutes ? "Active" : "Issue"}`);
  console.log(`✅ Google Robots Directives: ${hasSitemapLink ? "Verified" : "Missing"}`);
  console.log(`Content warnings: ${issues.length}\n`);

  return {
    postCount: postFiles.length,
    issues,
    existingSlugs,
    existingTitles,
    existingDates
  };
}

async function discoverTrendingTopic(existingTitles) {
  console.log("\x1b[34m[2/4] Gemini Intelligence: Discovering 2026 Trending Search Query...\x1b[0m");
  const prompt = `You are the lead SEO Analyst for Smart Resume Maker (smartresumemaker.com).
We currently have these published resume articles:
${[...new Set(existingTitles)].map(t => `- ${t}`).join("\n")}

Identify ONE high-intent, high-CTR, low-competition search query that job seekers and recruiters are actively searching for in 2026 (e.g., AI resume screening, cyber security, data science, executive leadership, ATS formatting, career gaps, high-paying remote jobs).
It MUST be completely unique and not duplicate any existing article title.

Return ONLY a JSON object:
{
  "topic": "The exact trending article topic title",
  "targetKeyword": "Primary SEO keyword target",
  "searchIntent": "Informational / Transactional to Resume Builder",
  "estimatedMonthlyVolume": "High"
}`;

  const result = await callGeminiWithFallbacks(prompt, true);
  if (result) {
    try {
      const parsed = JSON.parse(result.text);
      console.log(`🎯 Targeted High-Value Keyword: "${parsed.targetKeyword}"`);
      console.log(`📌 Topic Selected: "${parsed.topic}" (via ${result.model})\n`);
      return parsed.topic;
    } catch {
      // fallback below
    }
  }

  throw new Error("Topic discovery failed. Skipping publication rather than repeating a topic.");
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

async function generateAndPublishPost(topic) {
  console.log("\x1b[34m[3/4] Gemini Generator: Creating 1,400+ Word Authority Article...\x1b[0m");
  const nextId = await getNextPostId();

  const prompt = `You are a world-class career expert, executive resume writer, and SEO strategist for Smart Resume Maker (smartresumemaker.com).
Generate an authoritative, deeply practical 1,400+ word resume/career guide for: "${topic}".

CRITICAL REQUIREMENTS:
1. Provide actionable guidance with real resume bullet points, metrics, and Google X-Y-Z formula examples.
2. Include specific keyword targets that help applicants pass modern AI screening and ATS filters in 2026.
3. Include 4 to 6 comprehensive sections.
4. Output MUST be ONLY valid JSON matching this schema:

{
  "title": "Engaging high-CTR title (60-70 chars max)",
  "excerpt": "Punchy 2-sentence summary hook (140-160 chars)",
  "category": "Choose one: ATS Tips | Writing Tips | Resume Advice | Tech Careers | Job Search | Career Tips",
  "categoryColor": "Choose corresponding: bg-emerald-100 text-emerald-700 | bg-blue-100 text-blue-700 | bg-purple-100 text-purple-700 | bg-cyan-100 text-cyan-700 | bg-amber-100 text-amber-700 | bg-indigo-100 text-indigo-700",
  "readTime": "8 min read",
  "slug": "unique-kebab-case-slug",
  "author": "Sarah Jenkins",
  "metaTitle": "SEO title under 60 characters with | Smart Resume Maker",
  "metaDescription": "Compelling meta description under 155 characters summarizing the article for Google Search.",
  "bannerAlt": "Descriptive accessibility alt text for the banner image",
  "relatedSlugs": ["ats-friendly-resume-2026", "resume-action-verbs", "quantifying-resume-accomplishments"],
  "faqs": [
    {
      "question": "Frequently asked question 1?",
      "answer": "Clear, direct, and actionable answer 1."
    },
    {
      "question": "Frequently asked question 2?",
      "answer": "Clear, direct, and actionable answer 2."
    },
    {
      "question": "Frequently asked question 3?",
      "answer": "Clear, direct, and actionable answer 3."
    }
  ],
  "sections": [
    {
      "heading": "Clear H2 Heading",
      "paragraphs": [
        "In-depth paragraph 1...",
        "In-depth paragraph 2..."
      ],
      "bulletPoints": [
        "Actionable bullet point 1...",
        "Actionable bullet point 2..."
      ],
      "proTip": "Expert pro-tip advice..."
    }
  ]
}`;

  const genResult = await callGeminiWithFallbacks(prompt, true);
  let article = null;
  if (genResult) {
    try {
      article = JSON.parse(genResult.text);
    } catch {
      const cleaned = genResult.text.replace(/```json/g, "").replace(/```/g, "").trim();
      try {
        article = JSON.parse(cleaned);
      } catch {
        article = null;
      }
    }
  }

  if (!article || typeof article !== "object") {
    throw new Error("Article generation failed. Nothing will be published.");
  }

  const postsDir = path.join(process.cwd(), "src", "lib", "posts");
  const files = (await fs.readdir(postsDir)).filter(file => /^post-\d+\.tsx$/.test(file));
  const existingPosts = await Promise.all(files.map(file => fs.readFile(path.join(postsDir, file), "utf8")));
  const existingSlugs = existingPosts.map(content => content.match(/slug:\s*["']([^"']+)["']/)?.[1]).filter(Boolean);
  const existingTitles = existingPosts.map(content => content.match(/title:\s*["']([^"']+)["']/)?.[1]).filter(Boolean);
  const words = (article.sections || []).flatMap(section => [
    ...(section.paragraphs || []), ...(section.bulletPoints || []), section.proTip || ""
  ]).join(" ").trim().split(/\s+/).filter(Boolean).length;
  const normalized = value => value.trim().toLowerCase().replace(/\s+/g, " ");

  if (
    typeof article.title !== "string" || !article.title.trim() ||
    typeof article.slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug) ||
    existingSlugs.includes(article.slug) ||
    existingTitles.some(title => normalized(title) === normalized(article.title)) ||
    !Array.isArray(article.sections) || article.sections.length < 4 || words < 900 ||
    typeof article.metaDescription !== "string" || article.metaDescription.length < 70 || article.metaDescription.length > 160
  ) {
    throw new Error(`Article failed quality/uniqueness checks (slug: ${article.slug || "missing"}, words: ${words}). Nothing will be published.`);
  }

  // Pick realistic editorial image based on category
  let bannerImage = EDITORIAL_BANNERS[0];
  if (article.category === "Tech Careers") {
    bannerImage = "/images/blog/blog_software_engineer_realistic.jpg";
  } else if (article.category === "Job Search" || article.category === "Career Tips") {
    bannerImage = "/images/blog/blog_job_interview.jpg";
  } else if (article.category === "ATS Tips") {
    bannerImage = "/images/blog/blog_ats_resume.png";
  }

  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  // Construct JSX
  let sectionsJsx = "";
  for (const sec of article.sections || []) {
    sectionsJsx += `\n      <h2>${escapeJsxText(sec.heading)}</h2>\n`;
    for (const p of sec.paragraphs || []) {
      sectionsJsx += `      <p>${escapeJsxText(p)}</p>\n`;
    }
    if (sec.bulletPoints && sec.bulletPoints.length > 0) {
      sectionsJsx += `      <ul>\n`;
      for (const b of sec.bulletPoints) {
        sectionsJsx += `        <li>${escapeJsxText(b)}</li>\n`;
      }
      sectionsJsx += `      </ul>\n`;
    }
    if (sec.proTip) {
      sectionsJsx += `      <div className="my-8 rounded-2xl border border-blue-100 bg-blue-50/70 p-6 text-slate-800 shadow-sm not-prose">
        <div className="flex items-center gap-2 font-bold text-blue-900 mb-2">
          <span className="text-lg">💡</span> Pro Tip
        </div>
        <p className="text-sm leading-relaxed text-slate-700 m-0">${escapeJsxText(sec.proTip)}</p>
      </div>\n`;
    }
  }

  const fileContent = `import React from 'react';
import Link from 'next/link';
import { BlogPost } from '../blog-types';

export const post${nextId}: BlogPost = {
  id: ${nextId},
  title: ${JSON.stringify(article.title)},
  excerpt: ${JSON.stringify(article.excerpt)},
  category: ${JSON.stringify(article.category || "Career Tips")},
  categoryColor: ${JSON.stringify(article.categoryColor || "bg-blue-100 text-blue-700")},
  readTime: ${JSON.stringify(article.readTime || "8 min read")},
  date: ${JSON.stringify(today)},
  slug: ${JSON.stringify(article.slug)},
  author: ${JSON.stringify(article.author || "Sarah Jenkins")},
  metaTitle: ${JSON.stringify(article.metaTitle || `${article.title} | Smart Resume Maker`)},
  metaDescription: ${JSON.stringify(article.metaDescription)},
  bannerImage: ${JSON.stringify(bannerImage)},
  bannerAlt: ${JSON.stringify(article.bannerAlt || article.title)},
  relatedSlugs: ${JSON.stringify(article.relatedSlugs || ["ats-friendly-resume-2026", "resume-action-verbs"])},
  faqs: ${JSON.stringify(article.faqs || [], null, 2)},
  fullContent: (
    <>
      <p className="lead">
        ${escapeJsxText(article.excerpt)}
      </p>
${sectionsJsx}
      <div className="my-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white text-center shadow-lg not-prose">
        <h3 className="text-2xl font-bold text-white mb-3">Build an ATS-Proof Resume in Minutes</h3>
        <p className="text-blue-100 max-w-xl mx-auto mb-6 text-sm leading-relaxed">
          Put these strategies into practice immediately with our free, professional online resume builder.
        </p>
        <Link 
          href="/builder" 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-blue-700 font-bold hover:bg-blue-50 transition shadow-md"
        >
          Create Your Resume Now →
        </Link>
      </div>
    </>
  )
};
`;

  const newPostPath = path.join(process.cwd(), "src", "lib", "posts", `post-${nextId}.tsx`);
  await fs.writeFile(newPostPath, fileContent, "utf8");
  console.log(`✅ Generated Post #${nextId}: ${newPostPath}`);

  // Register in blog-data.tsx
  const blogDataPath = path.join(process.cwd(), "src", "lib", "blog-data.tsx");
  let blogDataContent = await fs.readFile(blogDataPath, "utf8");

  const importStatement = `import { post${nextId} } from "./posts/post-${nextId}";\n`;
  const postArrayItem = `  post${nextId},\n`;

  blogDataContent = importStatement + blogDataContent;
  blogDataContent = blogDataContent.replace(
    /export const BLOG_POSTS: BlogPost\[\] = \[/,
    `export const BLOG_POSTS: BlogPost[] = [\n${postArrayItem}`
  );

  await fs.writeFile(blogDataPath, blogDataContent, "utf8");
  console.log(`✅ Successfully Registered Post #${nextId} in blog-data.tsx\n`);

  return {
    id: nextId,
    title: article.title,
    slug: article.slug
  };
}

async function recordHealthReport(health, newPost) {
  const reportsDir = path.join(process.cwd(), "seo-reports");
  await fs.mkdir(reportsDir, { recursive: true });
  const registry = await fs.readFile(path.join(process.cwd(), "src", "lib", "blog-data.tsx"), "utf8");
  const publishedPostCount = [...registry.matchAll(/^\s+post\d+,\s*$/gm)].length;

  const report = {
    timestamp: new Date().toISOString(),
    contentAuditWarnings: health.issues,
    totalBlogPosts: publishedPostCount,
    activeModel: "gemini-flash-latest (with 4-model fallback)",
    lastPublishedPost: newPost ? { id: newPost.id, title: newPost.title, slug: newPost.slug } : null,
    recommendations: [
      "Ensure backlink acquisition on top career forums.",
      "Monitor Core Web Vitals on /builder and /blog routes weekly.",
      "Track Google Discover impressions for newly published articles."
    ]
  };

  await fs.writeFile(
    path.join(reportsDir, "latest-health-report.json"),
    JSON.stringify(report, null, 2),
    "utf8"
  );
  console.log(`✅ Saved Health & SEO Report to: seo-reports/latest-health-report.json\n`);
}

async function autoCommitAndPush(newPost) {
  console.log("\x1b[34m[4/4] Automated Git Sync & Deploy...\x1b[0m");
  try {
    execFileSync("git", ["add", "src/lib/posts/", "src/lib/blog-data.tsx", "seo-reports/", "src/app/"], { stdio: "inherit" });
    const cleanTitle = (newPost.title || "").replace(/["'\\]/g, "");
    const commitMsg = `feat(seo): daily autopilot - publish post #${newPost.id} - ${cleanTitle}`;
    execFileSync("git", ["commit", "-m", commitMsg], { stdio: "inherit" });
    console.log("🚀 Pushing updates to GitHub (origin main)...");
    execFileSync("git", ["push", "origin", "HEAD:main"], { stdio: "inherit" });
    console.log("🎉 Successfully deployed to GitHub & Vercel!");
  } catch (err) {
    console.error("Git commit/push error:", err.message);
    throw err;
  }
}

async function main() {
  console.log("\x1b[35m%s\x1b[0m", "=======================================================");
  console.log("\x1b[32m%s\x1b[0m", "🤖 Smart Resume Maker — Gemini Daily SEO Autopilot");
  console.log("\x1b[35m%s\x1b[0m", "=======================================================\n");

  const health = await performHealthCheck();

  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  const alreadyPublishedToday = health.existingDates && health.existingDates.includes(today);
  if (alreadyPublishedToday) {
    console.log(`ℹ️ An article for today (${today}) is already published. Running health audit only.\n`);
    await recordHealthReport(health, null);
    console.log("✨ Health Audit Complete!");
    return;
  }

  const topic = await discoverTrendingTopic(health.existingTitles);
  const newPost = await generateAndPublishPost(topic);
  execFileSync("node", ["scripts/check-blog-content.mjs"], { stdio: "inherit" });
  await recordHealthReport(health, newPost);
  await autoCommitAndPush(newPost);

  console.log("\x1b[32m%s\x1b[0m", "✨ Autopilot Cycle Finished Successfully!");
}

main().catch(err => {
  console.error("Autopilot Error:", err);
  process.exit(1);
});
