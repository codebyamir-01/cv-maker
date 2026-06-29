import React from 'react';
import { BlogPost } from '../blog-types';

export const post3: BlogPost = {
  id: 3,
  title: "One Page vs. Two Page Resume: What Recruiters Actually Want",
  excerpt: "The old rule was 'never exceed one page.' But is that still true today? Find out when you should use a one-page vs a two-page resume.",
  category: "Resume Advice",
  categoryColor: "bg-purple-100 text-purple-700",
  readTime: "6 min read",
  date: "Jun 10, 2026",
  slug: "one-page-vs-two-page-resume",
  author: "Jerry",
  metaTitle: "One Page vs. Two Page Resume: Which is Better? | CV Maker",
  metaDescription: "Wondering if your resume should be one or two pages? Discover the modern rules of resume length and what recruiters actually prefer based on your experience.",
  bannerImage: "/images/blog/blog_one_vs_two_page.png",
  bannerAlt: "One page versus two page resume comparison scale",
  relatedSlugs: ["resume-tips-for-fresh-graduates", "how-to-write-professional-summary"],
  faqs: [
    {
      question: "Is a two-page resume acceptable?",
      answer: "Yes, a two-page resume is perfectly acceptable and often preferred for professionals with more than 7-10 years of relevant experience."
    },
    {
      question: "Can a fresh graduate have a two-page resume?",
      answer: "Generally, no. Fresh graduates and entry-level candidates should keep their resume strictly to one page to maintain conciseness."
    }
  ],
  fullContent: (
    <>
      <p className="lead">
        For decades, the golden rule of resume writing was strict: keep it to one page, no matter what. But as the job market evolved, so did recruitment standards. Today, forcing 15 years of rich experience onto a single page can actually hurt your chances.
      </p>

      <h2>When to Use a One-Page Resume</h2>
      <p>
        A one-page resume is the standard for a reason. It forces you to be concise, highlighting only your most impressive and relevant achievements.
      </p>
      <ul>
        <li><strong>Fresh Graduates & Students:</strong> If you are entering the workforce, you simply don't have enough relevant professional experience to justify a second page.</li>
        <li><strong>Entry-Level Professionals:</strong> If you have less than 5 to 7 years of experience, stick to one page.</li>
        <li><strong>Career Changers:</strong> If you are completely changing industries, your past experience might not be highly relevant. Keep it to one page focusing on transferable skills.</li>
      </ul>

      <h2>When to Use a Two-Page Resume</h2>
      <p>
        Recruiters actually prefer two-page resumes for senior candidates because it provides a complete picture of their career trajectory and accomplishments.
      </p>
      <ul>
        <li><strong>Senior & Mid-Level Professionals:</strong> If you have 10+ years of experience and a track record of promotions and measurable achievements, use two pages.</li>
        <li><strong>Tech & Engineering Roles:</strong> Software engineers and IT professionals often need extra space to list numerous technical skills, certifications, and complex project details.</li>
        <li><strong>Academics & Researchers (CV):</strong> In academia, medicine, and research, it's normal to have a multi-page Curriculum Vitae (CV) listing all publications and grants.</li>
      </ul>

      <h2>The Rules of a Two-Page Resume</h2>
      <p>
        If you decide to spill over onto a second page, make sure you do it right:
      </p>
      <ul>
        <li><strong>Fill the Page:</strong> Don't have a two-page resume where the second page only has two lines on it. Either condense it to one page or expand on your achievements to fill at least half of the second page.</li>
        <li><strong>Put the Best Stuff First:</strong> Assume the recruiter might not read the second page. Your most recent job, core skills, and professional summary must be on page one.</li>
        <li><strong>Include Your Name on Page Two:</strong> If the resume is printed, pages can get separated. Make sure your name and contact info are briefly at the top of the second page.</li>
      </ul>

      <h2>Conclusion</h2>
      <p>
        Don't obsess over the length; obsess over the content. If a piece of information doesn't prove you're the best candidate for the job, cut it out. Whether it's one page or two, relevance is the ultimate key to getting hired.
      </p>
    </>
  )
};
