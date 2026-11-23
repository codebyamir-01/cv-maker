import React from 'react';
import { BlogPost } from '../blog-types';

export const post6: BlogPost = {
  id: 6,
  title: "How to List Skills on a Resume (With Examples)",
  excerpt: "Choose role-relevant skills, group them clearly, and support important claims with examples from your work or projects.",
  category: "Resume Advice",
  categoryColor: "bg-purple-100 text-purple-700",
  readTime: "5 min read",
  date: "May 20, 2026",
  slug: "how-to-list-skills-on-resume",
  author: "Jerry",
  metaTitle: "How to List Skills on a Resume | CV Maker",
  metaDescription: "Learn the most effective ways to list skills on your resume. Discover the difference between hard and soft skills and how to prove them to employers.",
  bannerImage: "/images/blog/resume-skills-editorial.webp",
  bannerAlt: "Skills cards being organized around a resume",
  relatedSlugs: ["ats-friendly-resume-2026", "resume-tips-for-fresh-graduates"],
  faqs: [
    {
      question: "Should I include a separate skills section?",
      answer: "A concise skills section can help a reader find relevant tools. It does not verify proficiency on its own; show important skills in your work or projects."
    },
    {
      question: "Should I use progress bars for my skills?",
      answer: "Plain text is easier to copy and interpret. A percentage bar can be subjective and may not extract well from a file."
    }
  ],
  fullContent: (
    <>
      <p className="lead">
        The skills section of your resume is often the most misunderstood part of the document. Many job seekers treat it like a keyword dumping ground, adding everything from "Microsoft Word" to "Breathing." Here's how to actually use the skills section to get hired.
      </p>

      <h2>Hard Skills vs. Soft Skills</h2>
      <p>
        Before writing your list, you need to understand the difference between hard and soft skills, and how recruiters view them.
      </p>
      <ul>
        <li><strong>Hard Skills:</strong> These are teachable, measurable abilities. Examples include Python programming, SEO analysis, bilingual fluency, or using Salesforce.</li>
        <li><strong>Soft Skills:</strong> These are interpersonal attributes. Examples include leadership, communication, empathy, and time management.</li>
      </ul>

      <h2>The Golden Rule: Show, Don't Tell Soft Skills</h2>
      <p>
        Here is a harsh truth: putting "Excellent Communicator" in your skills list means absolutely nothing. Anyone can type that. Soft skills should rarely be listed in a bulleted skills section. Instead, they must be <strong>proven</strong> in your work experience bullet points.
      </p>
      <p>
        <em>Illustrative example:</em> "Coordinated a design and engineering handoff for a product launch." Add team size and timing only if you can verify them.
      </p>

      <h2>How to Format the Skills Section</h2>
      <p>
        Your skills section should focus heavily on hard, technical, and role-specific skills. If you have many, categorize them so they are easy to read.
      </p>
      <p className="p-4 bg-slate-50 border border-slate-200 rounded-lg font-mono text-sm">
        <strong>Languages:</strong> JavaScript, Python, SQL<br/>
        <strong>Tools:</strong> Figma, Adobe Creative Cloud, Jira<br/>
        <strong>Methodologies:</strong> Agile, Scrum, A/B Testing
      </p>

      <h2>Remove Outdated Skills</h2>
      <p>
        In 2026, you do not need to list "Microsoft Word" or "Email" as a skill unless you are applying for a very specific administrative role where typing speed is tested. Basic computer literacy is assumed for modern corporate jobs. Listing it takes up valuable space that could be used for higher-value skills.
      </p>

      <h2>Conclusion</h2>
      <p>
        Keep your skills section clean, categorized, and focused on hard skills. Let your work experience prove your soft skills, and you will present a much stronger, more credible application.
      </p>
    </>
  )
};
