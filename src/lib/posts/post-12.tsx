import React from 'react';
import { BlogPost } from '../blog-types';

export const post12: BlogPost = {
  id: 12,
  title: "Beat the Bots: How to Find the Right ATS Keywords for Your Resume",
  excerpt: "Don't let your resume get thrown out by a robot. Learn the exact process for reverse-engineering job descriptions to find the exact ATS keywords recruiters are looking for.",
  category: "ATS Tips",
  categoryColor: "bg-emerald-100 text-emerald-700",
  readTime: "7 min read",
  date: "Jul 2, 2026",
  slug: "beat-the-bots-ats-keywords",
  author: "Jerry",
  metaTitle: "How to Find ATS Keywords for Your Resume | CV Maker",
  metaDescription: "Learn how to read a job description and extract the exact Applicant Tracking System (ATS) keywords you need to include in your resume to get an interview.",
  bannerImage: "/images/blog/blog_action_verbs.png", // reusing a relevant image
  bannerAlt: "Magnifying glass over a job description highlighting keywords",
  relatedSlugs: ["ats-friendly-resume-2026", "resume-action-verbs"],
  faqs: [
    {
      question: "How do I know what keywords the ATS is looking for?",
      answer: "The best place to find ATS keywords is the job description itself. Look for recurring hard skills, specific software names, and key responsibilities mentioned in the 'Requirements' section."
    },
    {
      question: "Should I just paste the whole job description in white text?",
      answer: "No! This is known as 'keyword stuffing' or 'white founting'. Modern ATS software easily detects this trick, and human recruiters will immediately throw out your resume when they see it."
    }
  ],
  fullContent: (
    <>
      <p>
        Imagine spending hours writing the perfect resume, only to have it rejected by a computer algorithm before a human ever sets eyes on it. Unfortunately, in 2026, this is the reality for nearly 75% of job applicants.
      </p>
      <p>
        Companies use Applicant Tracking Systems (ATS) to scan and filter thousands of resumes. These systems are programmed to look for specific <strong>keywords</strong>. If your resume does not contain them, you are automatically sorted into the "no" pile. Here is exactly how to beat the bots and find the right keywords.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Step 1: Decode the Job Description</h2>
      <p>
        The job description is essentially a cheat sheet provided by the employer. It tells you exactly what the ATS has been programmed to look for. Read through the posting and highlight two types of keywords:
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
        If the job description asks for a <em>"Customer Service Representative"</em>, do not write <em>"Client Success Specialist"</em> on your resume. If they ask for <em>"Adobe Creative Suite"</em>, do not just list <em>"Photoshop"</em>. Use the exact phrasing provided in the job description to ensure maximum match rate.
      </p>

      <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-xl my-8">
        <h3 className="font-bold text-slate-900 text-lg mb-2">The "Context" Rule</h3>
        <p className="text-slate-700 m-0">
          Don't just create a massive list of keywords at the bottom of your resume. Instead, weave them naturally into your bullet points to show <strong>how</strong> you used those skills to achieve results.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Step 3: Check Your Frequency</h2>
      <p>
        Mentioning a core keyword once might not be enough. If the job description mentions "Project Management" five times, it is clearly a priority. Try to mention your most important keywords 2 to 3 times across different sections (e.g., once in your Professional Summary, and twice in your Experience bullet points).
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Conclusion</h2>
      <p>
        Beating the ATS isn't about tricking the system; it's about speaking the system's language. By reverse-engineering the job description and using a smart, ATS-optimized layout, you can guarantee your resume makes it into the hands of a real human being.
      </p>
    </>
  )
};
