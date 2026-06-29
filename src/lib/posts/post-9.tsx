import React from 'react';
import { BlogPost } from '../blog-types';

export const post9: BlogPost = {
  id: 9,
  title: "LinkedIn Profile vs. Resume: Key Differences",
  excerpt: "Your LinkedIn profile shouldn't just be a digital copy of your resume. Discover how to optimize both to attract recruiters.",
  category: "Job Search",
  categoryColor: "bg-indigo-100 text-indigo-700",
  readTime: "5 min read",
  date: "May 02, 2026",
  slug: "linkedin-profile-vs-resume",
  author: "Jerry",
  metaTitle: "LinkedIn Profile vs. Resume: What is the Difference? | CV Maker",
  metaDescription: "Understand the key differences between your LinkedIn profile and your resume. Learn how to optimize both platforms to maximize your job search success.",
  bannerImage: "/images/blog/blog_linkedin_profile.png",
  bannerAlt: "Web browser with a LinkedIn profile connecting to a paper resume",
  relatedSlugs: ["how-to-write-professional-summary", "resume-action-verbs"],
  faqs: [
    {
      question: "Should my resume exactly match my LinkedIn?",
      answer: "The dates, titles, and companies must match to pass background checks, but the bullet points should differ. LinkedIn should be a broad overview of your career, while a resume should be highly tailored to the specific job you are applying for."
    },
    {
      question: "Can I use first-person ('I') on LinkedIn?",
      answer: "Yes! While you should never use 'I' or 'me' on a formal resume, LinkedIn is a social network. Using first-person in your LinkedIn 'About' section makes you seem more approachable and human."
    }
  ],
  fullContent: (
    <>
      <p className="lead">
        A common mistake job seekers make is treating their LinkedIn profile as a simple copy-and-paste of their resume. While the two should complement each other, they serve entirely different purposes in the hiring pipeline. 
      </p>

      <h2>The Resume: Targeted and Concise</h2>
      <p>
        Your resume is an outbound marketing tool. You send it to a specific company for a specific role. Because it is highly targeted, you should tailor the skills and bullet points to match the exact keywords in the job description.
      </p>
      <ul>
        <li><strong>Length:</strong> Strictly 1 or 2 pages.</li>
        <li><strong>Tone:</strong> Formal, third-person implied (no "I" or "my").</li>
        <li><strong>Content:</strong> Excludes irrelevant past jobs to save space.</li>
      </ul>

      <h2>The LinkedIn Profile: Broad and Discoverable</h2>
      <p>
        Your LinkedIn profile is an inbound marketing tool. It sits there 24/7 waiting for recruiters to search for you. Because you don't know exactly what a visiting recruiter is looking for, it needs to be broader.
      </p>
      <ul>
        <li><strong>Length:</strong> Infinite. You can list every project, certification, and volunteer role you've ever had.</li>
        <li><strong>Tone:</strong> Conversational and professional. First-person ("I am a developer who loves...") is highly encouraged in the About section.</li>
        <li><strong>Content:</strong> Includes multimedia (links to portfolios, videos, articles), endorsements, and recommendations.</li>
      </ul>

      <h2>How to Optimize Both</h2>
      
      <h3>1. The Headline vs. The Resume Title</h3>
      <p>
        On your resume, your title should usually match the job you are applying for (e.g., "Senior Financial Analyst"). On LinkedIn, you should use the 220-character headline to cast a wider net: <em>"Senior Financial Analyst | Corporate Forecasting | Helping SaaS startups scale revenue."</em>
      </p>

      <h3>2. The 'About' Section</h3>
      <p>
        Your resume's Professional Summary is 3-4 sentences of hard-hitting facts. Your LinkedIn About section can be a compelling 3-paragraph story about why you entered your industry, what you are passionate about, and what you do outside of work.
      </p>

      <h3>3. Keyword Density</h3>
      <p>
        Recruiters use LinkedIn Recruiter (a premium search tool) to find candidates by searching for specific skills. The more you mention a core skill (like "Python" or "B2B Sales") across your LinkedIn Experience sections, the higher you rank in their search results.
      </p>

      <h2>Conclusion</h2>
      <p>
        Think of your LinkedIn profile as your master career record and your resume as a highly curated highlight reel. Ensure your job titles and dates match across both to maintain trust, but use the unique features of each platform to their full potential.
      </p>
    </>
  )
};
