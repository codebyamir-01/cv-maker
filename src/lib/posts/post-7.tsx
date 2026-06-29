import React from 'react';
import { BlogPost } from '../blog-types';

export const post7: BlogPost = {
  id: 7,
  title: "Cover Letter vs. Resume: What's the Difference?",
  excerpt: "Should you still send a cover letter? We break down the exact difference between a resume and a cover letter, and when you actually need one.",
  category: "Job Search",
  categoryColor: "bg-indigo-100 text-indigo-700",
  readTime: "4 min read",
  date: "May 15, 2026",
  slug: "cover-letter-vs-resume",
  author: "Jerry",
  metaTitle: "Cover Letter vs. Resume: What is the Difference? | CV Maker",
  metaDescription: "Understand the key differences between a cover letter and a resume, when you should send both, and how to write a cover letter that recruiters actually read.",
  bannerImage: "/images/blog/blog_cover_letter.png",
  bannerAlt: "Comparison between a cover letter and a resume document",
  relatedSlugs: ["one-page-vs-two-page-resume", "how-to-write-professional-summary"],
  faqs: [
    {
      question: "Do I still need a cover letter in 2026?",
      answer: "While less mandatory than in the past, a cover letter is still highly recommended if you are changing careers, have an employment gap, or are applying to a smaller company where culture fit is heavily weighted."
    },
    {
      question: "Should my cover letter repeat my resume?",
      answer: "No. Your resume tells them what you did. Your cover letter should tell them why you want to do it for them, and how your unique background solves their specific problems."
    }
  ],
  fullContent: (
    <>
      <p className="lead">
        If you're applying for jobs, you've likely stared at the "Cover Letter (Optional)" upload button and wondered if it's worth the effort. To answer that, you need to understand the fundamental difference between these two documents.
      </p>

      <h2>The Resume: The "What"</h2>
      <p>
        Your resume is a factual, historical document. It outlines exactly what you have done, where you did it, and when. It is highly structured, meant to be skimmed in seconds, and relies heavily on bullet points and keywords.
      </p>
      <p>
        Think of your resume as the spec sheet for a product. It proves you meet the technical requirements of the job.
      </p>

      <h2>The Cover Letter: The "Why"</h2>
      <p>
        Your cover letter is a narrative document. It connects the dots between your historical facts (the resume) and the future needs of the employer. It answers the question: "Why do you want to work here, and why are you the best fit for this specific team?"
      </p>
      <p>
        Unlike a resume, a cover letter uses full paragraphs. It is your chance to show personality, enthusiasm, and cultural alignment.
      </p>

      <h2>When Must You Send a Cover Letter?</h2>
      <p>
        While some tech companies and large corporations no longer read cover letters, there are several situations where they are absolutely essential:
      </p>
      <ul>
        <li><strong>Career Changers:</strong> If your resume doesn't perfectly align with the job because you're switching industries, the cover letter is where you explain your transferable skills.</li>
        <li><strong>Employment Gaps:</strong> If you took time off for travel, health, or family, the cover letter provides a space to explain the gap gracefully.</li>
        <li><strong>Small Businesses & Startups:</strong> Smaller teams care deeply about culture fit and passion. A strong cover letter can easily put you ahead of a candidate with a slightly better resume.</li>
      </ul>

      <h2>Conclusion</h2>
      <p>
        Never use your cover letter to just repeat your resume in paragraph form. Use it to tell a story about why you are passionate about the company's mission and how you can solve their current problems. When in doubt, if there is an option to upload one, do it. It shows extra effort.
      </p>
    </>
  )
};
