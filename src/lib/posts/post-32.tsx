import Link from "next/link";
import type { BlogPost } from "../blog-types";

export const post32: BlogPost = {
  id: 32,
  title: "Greenhouse Resume Parsing: What Applicants Can Check",
  excerpt: "Use Greenhouse's own parsing guidance to prepare a readable file and inspect the application after uploading it.",
  category: "ATS Tips",
  categoryColor: "bg-emerald-100 text-emerald-700",
  readTime: "6 min read",
  date: "Oct 24, 2026",
  slug: "how-to-beat-greenhouse-ats-2026",
  author: "Smart Resume Maker Editorial Team",
  metaTitle: "Greenhouse Resume Parsing: Applicant File Checklist",
  metaDescription: "Learn which resume layouts can cause Greenhouse parsing trouble and how to check your file and autofilled application fields.",
  bannerImage: "/images/blog/greenhouse-application-editorial.webp",
  bannerAlt: "Applicant reviewing autofilled fields after a resume upload",
  relatedSlugs: ["ats-friendly-resume-2026", "are-two-column-resumes-ats-friendly-2026", "pdf-vs-word-ats-resume-format-2026"],
  faqs: [
    { question: "Does Greenhouse always reject a resume it cannot parse?", answer: "A parse problem does not prove an automatic rejection. It can leave fields incomplete or incorrect. Check the application and correct anything you can before submitting." },
    { question: "Does Greenhouse accept PDF resumes?", answer: "Greenhouse documents support for resume uploads, but the accepted format can depend on the employer's application. Follow that form's instructions and use a text-based document where possible." },
    { question: "Do I need a keyword density target?", answer: "No published universal target applies to every Greenhouse employer. Use the posting to describe skills you genuinely have, in context." },
  ],
  fullContent: <>
    <p className="lead">Greenhouse is recruiting software used by employers. It has published <a href="https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse" target="_blank" rel="noopener noreferrer">its own guidance on unsuccessful resume parsing</a>. That guidance names document design problems; it does not promise a keyword score or a way to guarantee an interview.</p>

    <h2>What Greenhouse says can disrupt parsing</h2>
    <p>Its support article mentions image-based documents, graphics, complex tables, headers and footers, columns, and contact information inside text boxes as potential causes of incomplete or incorrect extraction. It also notes that separate letters spaced apart can prevent a parser from recognizing a word. These are specific examples of why a visually polished file deserves a text check.</p>

    <h2>Check your export before upload</h2>
    <p>Open the final file and look at it at normal zoom. If it is a PDF, select the text and paste it into a plain-text editor. Confirm your name, contact information, employers, job titles, dates, and section headings appear in the intended order. A screenshot saved as PDF may have no selectable text. Our <Link href="/blog/are-two-column-resumes-ats-friendly-2026">two-column guide</Link> explains how to test one common layout risk.</p>

    <h2>Check the application after upload</h2>
    <p>When an application form fills details from your resume, read every field. Correct a missing company, split job title, wrong date, or truncated education entry. The uploaded document and the structured fields may not match automatically. If the form allows another upload and many fields are wrong, a simpler export may help; otherwise enter the corrections manually.</p>

    <h2>Use relevant wording without gaming the system</h2>
    <p>Look for qualifications in the job posting that match your own work. Name a tool when you used it and explain what you did with it. For instance, &ldquo;Built a weekly SQL query for billing exceptions&rdquo; is more useful than a repeated list of software names. Do not change titles, invent certifications, or hide keywords to chase a score. Our <Link href="/blog/how-to-tailor-resume-to-job-description-2026">tailoring guide</Link> shows how to select honest examples.</p>

    <h2>Before submitting</h2>
    <ul>
      <li>Use a file type the specific employer accepts.</li>
      <li>Confirm the document contains readable text and clear headings.</li>
      <li>Review all fields filled from the upload.</li>
      <li>Proofread the complete application, including manually entered answers.</li>
    </ul>
    <p>Greenhouse configurations and employer decisions vary. A clean export and careful application review reduce avoidable errors; they do not establish how an employer will rank or decide on a candidate. You can draft a text-based PDF in our <Link href="/builder">resume builder</Link> and check it before applying.</p>
  </>,
};
