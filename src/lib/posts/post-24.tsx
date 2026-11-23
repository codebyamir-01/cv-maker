import Link from "next/link";
import type { BlogPost } from "../blog-types";

export const post24: BlogPost = {
  id: 24,
  title: "How to Tailor Your Resume to a Job Description",
  excerpt: "Use the job posting to choose relevant examples, adjust your summary, and check that every claim remains true.",
  category: "ATS Tips",
  categoryColor: "bg-emerald-100 text-emerald-700",
  readTime: "6 min read",
  date: "Oct 16, 2026",
  slug: "how-to-tailor-resume-to-job-description-2026",
  author: "Smart Resume Maker Editorial Team",
  metaTitle: "How to Tailor a Resume to a Job Description",
  metaDescription: "A practical method for matching your real experience to a job posting: identify requirements, choose evidence, revise bullets, and check the final file.",
  bannerImage: "/images/blog/tailor-resume-gouache.webp",
  bannerAlt: "Illustration of a resume tailored to a job posting like a garment",
  relatedSlugs: ["ats-friendly-resume-2026", "resume-action-verbs", "how-to-list-skills-on-resume"],
  faqs: [
    { question: "Should I copy words from a job description?", answer: "Use a term from the posting when it accurately describes a skill or responsibility you have. Explain how you used it instead of pasting a list of phrases." },
    { question: "Do I need a different resume for every job?", answer: "A strong base resume is useful. For each relevant application, adjust the summary, ordering, and examples that matter most to that role; keep your history and dates accurate." },
    { question: "How many keywords should a resume contain?", answer: "There is no universal number. Focus on genuine qualifications and readable examples, not a keyword frequency target." },
  ],
  fullContent: <>
    <p className="lead">Tailoring a resume means selecting the parts of your real experience that best answer a particular job posting. It does not mean changing job titles, inventing results, or copying the advertisement into your document. A useful tailored resume lets a reader quickly connect a requirement with evidence you can explain.</p>

    <h2>Step 1: Separate requirements from preferences</h2>
    <p>Read the posting once for the overall role, then again for specific requirements. Mark the required tools, responsibilities, credentials, and working context. Keep preferred qualifications in a second group. Some employers use different language for similar work, so interpret the underlying task rather than hunting for a magic set of words.</p>
    <p>For example, if a posting asks for &ldquo;customer onboarding&rdquo; and you trained new customers after signup, that may be relevant evidence. If you only handled ongoing support, describe that honestly rather than claiming you owned onboarding.</p>

    <h2>Step 2: Make an evidence table</h2>
    <p>For each important requirement you meet, write down a role or project where you used it and the action you took. This draft table is for your own use. It helps you notice gaps without padding the resume.</p>
    <ul>
      <li><strong>Requirement:</strong> SQL reporting. <strong>Evidence:</strong> Built a weekly query for support-ticket trends.</li>
      <li><strong>Requirement:</strong> Stakeholder communication. <strong>Evidence:</strong> Presented findings to the operations team and documented next steps.</li>
      <li><strong>Requirement you do not meet:</strong> A specific certification. Do not list it as earned; decide whether the role still makes sense to apply for.</li>
    </ul>

    <h2>Step 3: Put the strongest match near the top</h2>
    <p>Revise the opening summary and the first few experience bullets so they show your most relevant work. Keep employer names and dates unchanged. If the job requires a tool you used, name it in a skills section and show its use in an experience or project bullet. Our <Link href="/blog/how-to-list-skills-on-resume">skills guide</Link> explains how to connect a skill to evidence.</p>
    <p>An illustrative weak bullet is &ldquo;Responsible for reports.&rdquo; A clearer version is &ldquo;Built a weekly SQL report showing open support requests by issue type for the operations team.&rdquo; Add a time saving or accuracy figure only if you measured it. Use the <Link href="/blog/resume-action-verbs">action verb examples</Link> to choose a verb that accurately reflects your role.</p>

    <h2>Step 4: Remove material that distracts</h2>
    <p>Older or unrelated details can make your strongest match harder to find. Keep a brief record of past roles where needed for chronology, but shorten repeated duties that do not help this application. Do not remove important dates or credentials to create a misleading impression.</p>

    <h2>Step 5: Review the exported file and application</h2>
    <p>Proofread names, dates, and links. Download the final file and inspect it at normal zoom. If you send a PDF, copy its text to check reading order. After upload, correct any form fields filled incorrectly. See our <Link href="/blog/ats-friendly-resume-2026">ATS file-check guide</Link> for the details. You can reorder sections and export a text-based PDF from our <Link href="/builder">resume builder</Link>.</p>
    <p>Tailoring improves clarity and relevance; it does not guarantee an interview. The test is whether each highlighted requirement maps to a genuine example that a hiring manager could ask you about.</p>
  </>,
};
