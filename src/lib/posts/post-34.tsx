import Link from "next/link";
import type { BlogPost } from "../blog-types";

export const post34: BlogPost = {
  id: 34,
  title: "One-Page vs. Two-Page Resume: A Reader-First Decision",
  excerpt: "Compare one- and two-page resumes through the reader's eyes. Keep enough relevant evidence without overcrowding the first page.",
  category: "Resume Advice",
  categoryColor: "bg-purple-100 text-purple-700",
  readTime: "5 min read",
  date: "Oct 26, 2026",
  slug: "one-page-vs-two-page-resume-2026",
  author: "Smart Resume Maker Editorial Team",
  metaTitle: "One-Page vs. Two-Page Resume: Choose for Clarity",
  metaDescription: "Compare one- and two-page resumes by relevance and readability. Learn what to keep, what to trim, and how to review the final file.",
  bannerImage: "/images/blog/recruiter-resume-length-editorial.webp",
  bannerAlt: "Recruiter comparing one-page and two-page resumes",
  relatedSlugs: ["one-page-vs-two-page-resume", "resume-length-one-page-vs-two-page-2026", "resume-action-verbs"],
  faqs: [
    { question: "Do recruiters always prefer one-page resumes?", answer: "No universal preference applies to every role and reader. Make your strongest relevant evidence easy to find and use a second page if it adds real value." },
    { question: "Should I shrink the font to fit one page?", answer: "Keep the text readable. First cut repetition, irrelevant details, and long introductions before changing font size." },
  ],
  fullContent: <>
    <p className="lead">Imagine a reader opening your resume to answer one question: can this person do the work described in the posting? Page count matters only insofar as it helps or hinders that answer. A one-page document can be focused; a two-page document can be easier to read when the experience is substantial.</p>

    <h2>What the first page must do</h2>
    <p>Put your name, contact details, target-relevant summary if useful, and strongest recent experience where a reader can find them immediately. The first page should not be filled with a long objective or a broad list of soft skills while the strongest project sits on page two. Use headings that explain the content without decorative labels.</p>

    <h2>When one page helps</h2>
    <p>If your relevant education, projects, and jobs fit comfortably, one page reduces navigation. It can work well when early roles or a narrow set of projects answer the posting. Do not treat the page limit as a challenge to include every school activity. For a stage-by-stage decision, see our <Link href="/blog/resume-length-one-page-vs-two-page-2026">career-stage guide</Link>.</p>

    <h2>When page two earns its place</h2>
    <p>A second page is justified by relevant work that would be lost or made illegible on one page. It might contain additional leadership, technical projects, or recent roles with distinct outcomes. Do not start a page solely for a short skills list or a few old duties. If the second page is thin, consider combining or shortening material instead.</p>

    <h2>Try the reader test</h2>
    <p>Give the finished resume to someone who knows the target job description. Ask them to point to three pieces of evidence for the role in under a minute. If they cannot find the strongest example, move it up or rewrite the heading. This is a practical clarity test, not a claim about how a particular ATS ranks pages.</p>

    <h2>Export and inspect</h2>
    <p>Check page breaks, font size, links, and copied text in the final file. Follow any explicit page or file limit in the application. The <Link href="/blog/ats-friendly-resume-2026">file-check guide</Link> explains how to inspect a PDF, and our <Link href="/builder">builder</Link> offers a selectable-text export. Choose the version that tells your story with the least friction for its reader.</p>
  </>,
};
