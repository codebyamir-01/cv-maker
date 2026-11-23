import Link from "next/link";
import type { BlogPost } from "../blog-types";

export const post25: BlogPost = {
  id: 25,
  title: "Executive Resume: Scope, Decisions, and Verified Results",
  excerpt: "Present leadership scope and business results without unsupported revenue claims or vague executive buzzwords.",
  category: "Resume Advice",
  categoryColor: "bg-purple-100 text-purple-700",
  readTime: "6 min read",
  date: "Oct 17, 2026",
  slug: "executive-resume-guide-2026-c-suite-examples",
  author: "Smart Resume Maker Editorial Team",
  metaTitle: "Executive Resume Guide: Leadership Scope and Results",
  metaDescription: "Write an executive resume with clear leadership scope, strategic decisions, and results you can substantiate, plus a review checklist.",
  bannerImage: "/images/blog/executive-resume-editorial.webp",
  bannerAlt: "Executive reviewing leadership experience in a boardroom",
  relatedSlugs: ["how-to-write-professional-summary", "resume-action-verbs", "one-page-vs-two-page-resume"],
  faqs: [
    { question: "How long should an executive resume be?", answer: "Use enough space to show relevant leadership work without repeating it. Two pages may be reasonable when the evidence is substantial; clarity matters more than a fixed rule." },
    { question: "Must every executive bullet contain a percentage?", answer: "No. Use a metric when you know its source and your contribution. A decision, scope of responsibility, or delivered change can also be valuable." },
  ],
  fullContent: <>
    <p className="lead">An executive resume should explain the scope of your responsibility, the choices you made, and the results you can defend. Broad claims such as &ldquo;visionary transformation leader&rdquo; use space without giving a reader evidence. Select a small number of relevant examples and make your role clear.</p>

    <h2>Define leadership scope</h2>
    <p>State the organization or function you led, the size of a team or budget only if appropriate and verifiable, and the decision authority you held. Distinguish between a company-wide initiative you owned and one you contributed to. A reader should be able to understand whether you set strategy, managed delivery, or advised the decision-makers.</p>

    <h2>Choose decisions that match the role</h2>
    <p>For a chief operating role, process redesign and cross-functional delivery may be relevant. For a finance leader, capital allocation or reporting controls may matter more. Read the posting and prioritize examples accordingly. Our <Link href="/blog/how-to-tailor-resume-to-job-description-2026">tailoring guide</Link> offers an evidence table for this choice.</p>

    <h2>Write results with attribution</h2>
    <p>An illustrative bullet is: &ldquo;Led a quarterly planning process across operations and finance, creating a shared forecast used by department heads.&rdquo; If you add a cost or revenue figure, state the timeframe and ensure you can explain the baseline and your contribution. Do not claim a whole-company result as your own if it came from many teams or market changes.</p>

    <h2>Trim repetition rather than shrinking text</h2>
    <p>Senior careers can contain many roles. Give recent, relevant work the most detail and summarize older positions where necessary for chronology. A second page can be useful if it contains substantial evidence; it should not contain a long list of older duties. See our <Link href="/blog/one-page-vs-two-page-resume">page-length guide</Link> for a practical check.</p>

    <h2>Protect confidential details</h2>
    <p>Some results and client names cannot be shared. You can still describe the type of decision, scale in a permitted range, and the deliverable without disclosing protected information. Check every external link and ask whether a public case study is authorized. Export the resume in the employer&apos;s accepted format and review the final file; the <Link href="/builder">builder</Link> provides a text-based PDF option.</p>
  </>,
};
