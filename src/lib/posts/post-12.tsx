import React from 'react';
import { BlogPost } from '../blog-types';

export const post12: BlogPost = {
  id: 12,
  title: "Beat the Bots: How to Find the Right ATS Keywords for Your Resume",
  excerpt: "Read a job posting for relevant skills and describe the experience you genuinely have, without copying or repeating keywords.",
  category: "ATS Tips",
  categoryColor: "bg-emerald-100 text-emerald-700",
  readTime: "7 min read",
  date: "Jul 2, 2026",
  slug: "beat-the-bots-ats-keywords",
  author: "Jerry",
  metaTitle: "How to Find ATS Keywords for Your Resume | CV Maker",
  metaDescription: "Learn how to identify relevant terms in a job description and use them honestly in your resume, with examples and a file check.",
  bannerImage: "/images/blog/ats-keywords-editorial.webp",
  bannerAlt: "Matching job requirements highlighted beside a resume",
  relatedSlugs: ["ats-friendly-resume-2026", "resume-action-verbs"],
  faqs: [
    {
      question: "How do I know what keywords the ATS is looking for?",
      answer: "The best place to find ATS keywords is the job description itself. Look for recurring hard skills, specific software names, and key responsibilities mentioned in the 'Requirements' section."
    },
    {
      question: "Should I just paste the whole job description in white text?",
      answer: "No. Hidden text is misleading and does not help a recruiter understand your experience. Use visible, relevant examples you can explain."
    }
  ],
  fullContent: (
    <>
      <p>
        Imagine spending hours writing the perfect resume, only to have it rejected by a computer algorithm before a human ever sets eyes on it. Application systems vary. Focus on a readable document and an accurate match to the job requirements.
      </p>
      <p>
        Employers may use applicant tracking systems to organize applications and search for qualifications. Their processes differ, so no word list can guarantee a result. Use the posting to identify the qualifications you actually have and describe them clearly.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Step 1: Decode the Job Description</h2>
      <p>
        The job description tells you what the employer is asking for. Read through it and highlight two kinds of relevant terms:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li><strong>Hard Skills:</strong> Tools, software, methodologies, and specific knowledge (e.g., Python, Agile Management, SEO, Salesforce).</li>
        <li><strong>Soft Skills:</strong> Behavioral traits necessary for the job (e.g., Cross-functional leadership, Public speaking, Conflict resolution).</li>
      </ul>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Step 2: Use Exact Phrasing</h2>
      <p>
        An ATS is a piece of software, not a human. While modern AI-based ATS systems are getting smarter, older systems might not recognize synonyms.
      </p>
      <p>
        Keep your real job title. If you used Photoshop, name Photoshop; do not claim the entire Adobe suite unless you used it. You can use the employer&apos;s term for a skill when it accurately describes your experience.
      </p>

      <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-xl my-8">
        <h3 className="font-bold text-slate-900 text-lg mb-2">The "Context" Rule</h3>
        <p className="text-slate-700 m-0">
          Don't just create a massive list of keywords at the bottom of your resume. Instead, weave them naturally into your bullet points to show <strong>how</strong> you used those skills to achieve results.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Step 3: Check Your Frequency</h2>
      <p>
        There is no reliable keyword frequency that works across employers. Mention a relevant skill where it belongs, then show a concrete example in your experience. Remove repetition that makes the document harder to read.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Conclusion</h2>
      <p>
        Your goal is a clear, accurate application. Match your real experience to the role, follow the employer&apos;s file instructions, and review any fields filled from your upload. No resume layout or keyword list guarantees an interview.
      </p>
    </>
  )
};
