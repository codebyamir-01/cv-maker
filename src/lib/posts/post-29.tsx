import Link from "next/link";
import type { BlogPost } from "../blog-types";

export const post29: BlogPost = {
  id: 29,
  title: "How to List AI Tools and Workflows on a Technical Resume",
  excerpt: "Describe a technical AI project with the workflow, your implementation, testing, and results you can verify.",
  category: "Tech Careers",
  categoryColor: "bg-cyan-100 text-cyan-700",
  readTime: "5 min read",
  date: "Oct 21, 2026",
  slug: "how-to-list-ai-skills-on-resume-2026",
  author: "Smart Resume Maker Editorial Team",
  metaTitle: "List AI Skills on a Technical Resume With Evidence",
  metaDescription: "Show AI tools and workflows on a technical resume through a real project, your contribution, evaluation method, and limitations.",
  bannerImage: "/images/blog/ai-skills-examples-editorial.webp",
  bannerAlt: "Professional using an AI assistant in everyday work",
  relatedSlugs: ["ai-prompt-engineer-llm-specialist-resume-guide", "how-to-put-ai-skills-on-resume-2026", "best-resume-format-software-engineers"],
  faqs: [
    { question: "Should I list every AI model I tried?", answer: "List tools you used in meaningful work. Explain the task, your role, and the quality checks rather than filling the skills section with product names." },
    { question: "Can I include a personal AI project?", answer: "Yes. Label it as a project, show what you built and tested, and distinguish it from paid professional work." },
  ],
  fullContent: <>
    <p className="lead">A technical resume can show AI work without claiming expertise in every model or framework. The clearest evidence is a project that names the task, your implementation, the way you checked output, and the limits you found. Use tool names only where they help explain that work.</p>

    <h2>Separate tools from capabilities</h2>
    <p>A skills section may name an API, language, vector store, evaluation library, or deployment tool you used. The experience section should show what you did with it. For example, &ldquo;used Python&rdquo; is a tool claim; &ldquo;built a script that compared generated answers with a set of reference responses&rdquo; describes a capability. Both should be true.</p>

    <h2>Write a project bullet with context</h2>
    <p>An illustrative bullet is: &ldquo;Built an internal document-answering prototype and reviewed its responses against a small set of known questions before a team demo.&rdquo; If you can share the evaluation method, add how many examples were reviewed and which errors you found. Do not call the prototype production software unless it was deployed and used that way.</p>

    <h2>Explain testing and safeguards</h2>
    <p>Technical readers may want to know how you handled incorrect answers, private data, costs, or latency. Name checks you personally implemented, such as a human review step, a test set, or input validation. Avoid claims that a workflow &ldquo;eliminated hallucinations&rdquo; or &ldquo;guaranteed accuracy.&rdquo; Explain observed results with a baseline if you have one.</p>

    <h2>Choose placement by relevance</h2>
    <p>If AI work is central to the target job, put the strongest project near the top. If it is a supporting skill, a short example may be enough. Keep your formal job title unchanged; a project heading can name the AI work. Our <Link href="/blog/ai-prompt-engineer-llm-specialist-resume-guide">prompt engineering resume guide</Link> offers a more detailed workflow example.</p>

    <h2>Check privacy and export</h2>
    <p>Do not publish private prompts, customer data, or internal documents in a linked repository. If a public demo is permitted, test its link. Export your resume in the employer&apos;s accepted format and check that the tools and project description remain readable text. For a nontechnical role, see our <Link href="/blog/how-to-put-ai-skills-on-resume-2026">AI skills examples for everyday work</Link>.</p>
  </>,
};
