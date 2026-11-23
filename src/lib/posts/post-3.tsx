import React from 'react';
import Link from 'next/link';
import { BlogPost } from '../blog-types';

export const post3: BlogPost = {
  id: 3,
  title: "Can a Resume Be Two Pages? One vs. Two Page Guide",
  excerpt: "Yes, a resume can be two pages when relevant experience needs the space. Use this guide to decide what belongs on each page.",
  category: "Resume Advice",
  categoryColor: "bg-purple-100 text-purple-700",
  readTime: "6 min read",
  date: "Jun 10, 2026",
  slug: "one-page-vs-two-page-resume",
  author: "Jerry",
  metaTitle: "Can a Resume Be Two Pages? One vs. Two Page Guide",
  metaDescription: "Can a resume be two pages? Compare one-page and two-page resumes by experience level, learn what to keep on page one, and see when to cut content.",
  bannerImage: "/images/blog/post-3-one-page-vs-two-page-resume.jpg",
  bannerAlt: "Illustrated cover for Can a Resume Be Two Pages? One vs. Two Page Guide",
  relatedSlugs: ["resume-tips-for-fresh-graduates", "how-to-write-professional-summary"],
  faqs: [
    {
      question: "Is a two-page resume acceptable?",
      answer: "Yes. Use a second page when it adds relevant experience, projects, or credentials that help the employer assess your fit. Follow any length limit in the job posting."
    },
    {
      question: "Can a fresh graduate have a two-page resume?",
      answer: "Often one page is enough for a new graduate, but a second page can be useful when substantial projects, research, or relevant work truly need the space. Edit repeated or unrelated material first."
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
        <li><strong>Fresh Graduates & Students:</strong> Start with one page when education, projects, and relevant work fit comfortably.</li>
        <li><strong>Entry-Level Professionals:</strong> Keep the most relevant achievements and remove repeated duties before adding space.</li>
        <li><strong>Career Changers:</strong> If you are completely changing industries, your past experience might not be highly relevant. Keep it to one page focusing on transferable skills.</li>
      </ul>
      <p>
        If you are still studying, see our <Link href="/resume-examples/student-resume">student resume example</Link> for a focused education and projects layout.
      </p>

      <h2>When to Use a Two-Page Resume</h2>
      <p>
        A second page can make sense when it gives a reader useful evidence that would otherwise be cut. Length alone does not improve a resume; relevance does.
      </p>
      <ul>
        <li><strong>Experienced Professionals:</strong> Consider two pages when recent roles, promotions, and outcomes need the space.</li>
        <li><strong>Tech & Engineering Roles:</strong> Software engineers and IT professionals often need extra space to list numerous technical skills, certifications, and complex project details.</li>
        <li><strong>Academics & Researchers (CV):</strong> In academia, medicine, and research, it's normal to have a multi-page Curriculum Vitae (CV) listing all publications and grants.</li>
      </ul>
      <h2>A quick decision checklist</h2>
      <ul>
        <li><strong>Choose one page</strong> when your most relevant education, projects, and experience fit without shrinking the font or margins.</li>
        <li><strong>Choose two pages</strong> when a second page adds relevant achievements, roles, or credentials that help a reader assess your fit.</li>
        <li><strong>Edit first</strong> if page two contains only a few lines. Remove outdated duties and repeated skills before changing the layout.</li>
      </ul>
      <h2>What belongs on page two?</h2>
      <p>
        Keep your strongest match for the role on page one. Page two can hold earlier relevant roles, selected projects, certifications, publications, or technical details that help explain your fit. For example, a software engineer might put recent production work on page one and a short selection of older projects on page two. A graduate might include substantial research or internships, but should avoid padding the page with unrelated coursework.
      </p>
      <p>
        Compare every second-page item with the job description. If it does not support a required skill, useful experience, or a clear career story, shorten or remove it. A second page should add evidence, not duplicate your summary or skills list.
      </p>
      <p>
        Need a concise opening? Draft one with the <Link href="/resume-summary-generator">resume summary generator</Link>, then revise it to reflect your actual experience.
      </p>

      <h2>The Rules of a Two-Page Resume</h2>
      <p>
        If you decide to spill over onto a second page, make sure you do it right:
      </p>
      <ul>
        <li><strong>Avoid a nearly empty page:</strong> If page two has only a few lines, edit the layout and wording before deciding whether it is needed.</li>
        <li><strong>Put the Best Stuff First:</strong> Assume the recruiter might not read the second page. Your most recent job, core skills, and professional summary must be on page one.</li>
        <li><strong>Include Your Name on Page Two:</strong> If the resume is printed, pages can get separated. Make sure your name and contact info are briefly at the top of the second page.</li>
      </ul>

      <h2>Can a resume be two pages for an online application?</h2>
      <p>
        Yes, unless the employer asks for a shorter document. Export a text-based PDF or DOCX in the requested format. Review the application form after upload: check your name, employer, title, and dates in the autofilled fields. If the form misreads the file, correct those fields and consider a simpler layout. Our <Link href="/blog/are-two-column-resumes-ats-friendly-2026">layout check</Link> explains a quick way to inspect text order.
      </p>

      <h2>Conclusion</h2>
      <p>
        Don't obsess over the length; obsess over the content. If a piece of information doesn't prove you're the best candidate for the job, cut it out. Whether it's one page or two, relevance is the ultimate key to getting hired.
      </p>
    </>
  )
};
