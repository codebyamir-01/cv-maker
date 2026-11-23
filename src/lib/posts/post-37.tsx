import Link from "next/link";
import type { BlogPost } from "../blog-types";

export const post37: BlogPost = {
  id: 37,
  title: "Data Science Resume Portfolio: Projects, Links, and Proof",
  excerpt: "Choose portfolio projects that show your contribution, document the results, and link them clearly from your data science resume.",
  category: "Tech Careers",
  categoryColor: "bg-cyan-100 text-cyan-700",
  readTime: "6 min read",
  date: "Oct 29, 2026",
  slug: "data-science-resume-guide-2026",
  author: "Smart Resume Maker Editorial Team",
  metaTitle: "Data Science Resume Portfolio: Project Proof and Links",
  metaDescription: "Show data science projects clearly with repository links, methods, your contribution, and results you can explain.",
  bannerImage: "/images/blog/data-science-portfolio-editorial.webp",
  bannerAlt: "Data scientist assembling a project portfolio and resume",
  relatedSlugs: ["data-scientist-resume-guide-2026", "data-science-resume-guide-2026-skills-portfolio-ats-keywords", "data-analyst-resume-guide-2026"],
  faqs: [
    { question: "How many projects should I link?", answer: "Choose a small number of relevant projects you can explain. A clear project with working files is usually more useful than many incomplete links." },
    { question: "Can I share a company model?", answer: "Only if your employer permits it. Use public or anonymized data for a portfolio and never expose confidential code or customer information." },
  ],
  fullContent: <>
    <p className="lead">A data science portfolio supports your resume when it helps a reader inspect your method, contribution, and limitations. It does not need to contain every notebook you have made. Select a few projects that fit the target role and make each one easy to understand without a private briefing.</p>

    <h2>Choose projects for the job</h2>
    <p>A product analytics role may benefit from an experiment or funnel analysis; an applied modeling role may need a model evaluation and deployment discussion. Read the posting and choose projects that show related work. The <Link href="/blog/data-scientist-resume-guide-2026">general data scientist resume guide</Link> covers how those projects fit into the full document.</p>

    <h2>Write a useful project summary</h2>
    <p>State the question, data source, cleaning or preparation, method, evaluation, and your own contribution. An illustrative entry is: &ldquo;Analyzed a public transit dataset to compare delay patterns by route and time of day; documented missing-data handling and presented the results in a short dashboard.&rdquo; Replace the domain and methods with your actual work.</p>

    <h2>Show limitations, not only results</h2>
    <p>If you trained a model, explain the baseline, validation approach, and where it may fail. A high accuracy number without a test set or comparison tells a reader little. If a project was a tutorial, say what you added beyond the tutorial. If it was a team project, distinguish your work from your teammates&apos; contributions.</p>

    <h2>Make links usable</h2>
    <p>A public repository should have a short README with the goal, setup steps, data permissions, main findings, and how to reproduce the result. Remove broken links and secrets. If you cannot share code, a permitted case study can describe your decisions without exposing private material. Test each link in a signed-out browser before including it.</p>

    <h2>Connect the portfolio to the resume</h2>
    <p>Give each selected project one or two concise bullets and a direct link. Keep tools in context rather than creating a long stack list. Our <Link href="/blog/data-science-resume-guide-2026-skills-portfolio-ats-keywords">data science skills guide</Link> helps organize those tools. Export the final resume and check that project URLs and text remain readable. You can draft the project section in our <Link href="/builder">resume builder</Link>.</p>
  </>,
};
