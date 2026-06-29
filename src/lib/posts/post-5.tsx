import React from 'react';
import { BlogPost } from '../blog-types';

export const post5: BlogPost = {
  id: 5,
  title: "The Best Resume Format for Software Engineers in 2026",
  excerpt: "Tech resumes follow different rules. Learn how to structure your software engineering resume to highlight your stack, projects, and impact.",
  category: "Tech Careers",
  categoryColor: "bg-cyan-100 text-cyan-700",
  readTime: "7 min read",
  date: "May 28, 2026",
  slug: "best-resume-format-software-engineers",
  author: "Jerry",
  metaTitle: "Best Resume Format for Software Engineers in 2026 | CV Maker",
  metaDescription: "Learn the exact resume format tech recruiters look for. Discover how to list your tech stack, GitHub projects, and engineering impact effectively.",
  bannerImage: "/images/blog/blog_software_engineer.png",
  bannerAlt: "Laptop screen with code merging into a professional resume",
  relatedSlugs: ["ats-friendly-resume-2026", "how-to-list-skills-on-resume"],
  faqs: [
    {
      question: "Should software engineers put skills at the top?",
      answer: "Yes. Tech recruiters look for specific languages and frameworks first. A dedicated 'Technical Skills' section near the top is highly recommended."
    },
    {
      question: "Should I link my GitHub on my resume?",
      answer: "Absolutely. Include clickable links to your GitHub profile and deployed live projects right in your contact header."
    }
  ],
  fullContent: (
    <>
      <p className="lead">
        If you're applying for a software engineering role, standard resume advice doesn't always apply. Tech recruiters and engineering managers scan resumes differently. They are looking for specific technical stacks, problem-solving abilities, and quantifiable impact.
      </p>

      <h2>The Ideal Structure for a Tech Resume</h2>
      <p>
        To make it easy for engineering managers to read your resume, stick to this specific order:
      </p>
      <ol>
        <li><strong>Header:</strong> Name, Contact, GitHub Link, Portfolio Link, LinkedIn.</li>
        <li><strong>Technical Skills:</strong> Languages, Frameworks, Tools.</li>
        <li><strong>Work Experience:</strong> Your professional roles.</li>
        <li><strong>Projects:</strong> Personal or open-source projects (crucial for juniors).</li>
        <li><strong>Education:</strong> Keep it brief.</li>
      </ol>

      <h2>1. The Technical Skills Section</h2>
      <p>
        Don't bury your skills in your job descriptions. Create a dedicated section at the very top of your resume, right under your header or summary. Group your skills logically.
      </p>
      <ul>
        <li><strong>Languages:</strong> JavaScript, TypeScript, Python, Go.</li>
        <li><strong>Frontend:</strong> React, Next.js, Tailwind CSS.</li>
        <li><strong>Backend & Databases:</strong> Node.js, PostgreSQL, Redis, MongoDB.</li>
        <li><strong>DevOps & Tools:</strong> Git, Docker, AWS, CI/CD.</li>
      </ul>
      <p>
        <em>Pro Tip:</em> Only list technologies you are comfortable answering interview questions about. If you did one tutorial on Rust three years ago, leave it off.
      </p>

      <h2>2. Focus on Impact, Not Just Tech</h2>
      <p>
        A common mistake engineers make is just listing the technologies they used: "Built an API using Node.js and Express." That tells the recruiter what you did, but not why it mattered.
      </p>
      <p>You need to show impact. Use this format: <strong>Accomplished [X] as measured by [Y], by doing [Z].</strong></p>
      <p>
        <em>Example:</em> "Reduced API response time by 40% (Impact) by migrating legacy REST endpoints to GraphQL and implementing Redis caching (Tech)."
      </p>

      <h2>3. The Projects Section is Your Secret Weapon</h2>
      <p>
        If you are a junior developer, your projects section is more important than your work experience. Don't just list "To-Do App." Detail the architecture.
      </p>
      <ul>
        <li>Include a clickable link to the live demo and the GitHub repo.</li>
        <li>Explain the problem the project solves.</li>
        <li>List the stack used to build it.</li>
      </ul>

      <h2>Conclusion</h2>
      <p>
        A great software engineering resume is highly scannable, technically accurate, and focused on business impact. Keep the design clean, ensure your GitHub links work, and focus heavily on the results of your code.
      </p>
    </>
  )
};
