import React from 'react';
import Link from 'next/link';
import { BlogPost } from '../blog-types';

export const post39: BlogPost = {
  id: 39,
  title: "Are Two-Column Resumes ATS-Friendly? A Practical Check",
  excerpt: "Two-column layouts can look polished, but exported text may read out of order. Learn how to check your own file before applying.",
  category: "ATS Tips",
  categoryColor: "bg-emerald-100 text-emerald-700",
  readTime: "6 min read",
  date: "Oct 31, 2026",
  slug: "are-two-column-resumes-ats-friendly-2026",
  author: "Smart Resume Maker Editorial Team",
  metaTitle: "Are Two-Column Resumes ATS-Friendly? | Smart Resume Maker",
  metaDescription: "Learn when a two-column resume may cause reading-order problems, how to inspect a PDF or Word export, and what to do if an application form misreads it.",
  bannerImage: "/images/blog/blog_one_vs_two_page.png",
  bannerAlt: "One-page and two-page resume layouts shown side by side",
  relatedSlugs: ["ats-friendly-resume-2026", "one-page-vs-two-page-resume", "best-resume-format-software-engineers"],
  faqs: [
    {
      question: "Will every ATS reject a two-column resume?",
      answer: "No. Different application systems and resume parsers handle layouts differently. Check the exported text and review any fields the application form fills automatically."
    },
    {
      question: "How can I inspect the reading order of my PDF?",
      answer: "Copy all text from the exported PDF into a plain-text editor. Look for mixed columns, missing dates, and contact details in the wrong place. This is a useful check, but it cannot reproduce every employer's parser."
    }
  ],
  fullContent: (
    <>
      <p className="lead">A two-column resume can be easy for a person to scan. The practical question is whether your exported file preserves a sensible reading order when a hiring system extracts its text. There is no universal pass or fail rule: employers use different application systems, configurations, and review processes.</p>

      <h2>What can go wrong with two columns?</h2>
      <p>Resume software often extracts text from a PDF or Word file to fill fields such as job title, employer, dates, education, and skills. If the file stores a narrow skills sidebar beside your work history, extracted text can mix the two streams. A reader might see an unrelated skill in the middle of a job description or a date attached to the wrong role.</p>
      <p>That risk depends on the document and the parser. A simple layout exported from a text editor may behave differently from a design exported as a flattened image. Avoid assuming that an attractive preview guarantees readable text.</p>

      <h2>Check the file you plan to upload</h2>
      <ol>
        <li><strong>Export the final document.</strong> Test the same PDF or DOCX file you will submit, rather than a draft in the editor.</li>
        <li><strong>Inspect text extraction.</strong> Open the PDF, select all text, and paste it into a plain-text editor. Read from top to bottom. Confirm that your name, contact details, job titles, employers, dates, and bullets appear in a sensible order.</li>
        <li><strong>Check selectable text.</strong> If you cannot select the words, the file may be image-only. Export a text-based PDF or use a DOCX file when the employer accepts it.</li>
        <li><strong>Review the application form.</strong> After uploading, inspect every autofilled field. Correct missing or misplaced information before submitting.</li>
      </ol>
      <p>This copy-and-paste check is a useful warning sign, not a certification. It does not reproduce a specific employer&apos;s screening software.</p>

      <h2>When should you choose a single column?</h2>
      <p>Use a single-column layout when you need the simplest reading order, when the application form has already misread your document, or when you cannot check the system before submitting. Put your name and contact information first, followed by a short summary if useful, then experience, education, and relevant skills. Use familiar section headings and keep dates beside the roles they describe.</p>
      <p>For a software engineering role, show tools in the context of work instead of relying on a long sidebar. For example: <em>Built a TypeScript dashboard for support staff and reduced manual ticket triage by 3 hours per week.</em> Replace those details with results you can verify from your own work.</p>

      <h2>When can two columns still be useful?</h2>
      <p>A two-column design can work for a portfolio, a resume shared directly with a person, or a document whose text extraction and application fields you have checked. Keep essential job history in a clear sequence, and avoid putting dates or employer names in a disconnected sidebar. If a job posting specifies a file format or template, follow those instructions first.</p>
      <p>It can help to maintain two exports: a simpler application version and a more visual version for direct sharing. Keep the underlying achievements the same so neither version overstates your experience.</p>

      <h2>Before you apply</h2>
      <p>Choose the layout that makes your relevant experience easiest to read. Check the exact file, compare it with the job posting, and correct any autofilled fields. Our <Link href="/ats-resume-builder">ATS resume builder guide</Link> explains the basic structure, and the <Link href="/resume-examples">resume examples</Link> offer starting points you can adapt.</p>
    </>
  )
};
