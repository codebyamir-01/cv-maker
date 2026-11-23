import Link from "next/link";
import type { BlogPost } from "../blog-types";

export const post20: BlogPost = {
  id: 20,
  title: "Prompt Engineer Resume: Show Testing and Workflow Design",
  excerpt: "Describe the AI workflow you built, how you checked its output, and the limits of your own contribution.",
  category: "Tech Careers",
  categoryColor: "bg-cyan-100 text-cyan-700",
  readTime: "6 min read",
  date: "Oct 11, 2026",
  slug: "ai-prompt-engineer-llm-specialist-resume-guide",
  author: "Smart Resume Maker Editorial Team",
  metaTitle: "Prompt Engineer Resume: Projects and Evaluation",
  metaDescription: "Show prompt engineering work through a real use case, test method, output review, and your role in the implementation.",
  bannerImage: "/images/blog/prompt-engineer-editorial.webp",
  bannerAlt: "Prompt engineer testing AI workflows beside a resume",
  relatedSlugs: ["how-to-list-ai-skills-on-resume-2026", "how-to-use-ai-resume-builder", "best-resume-format-software-engineers"],
  faqs: [
    { question: "Is listing prompt engineering enough?", answer: "A label alone says little. Explain the workflow, the problem it addressed, how you tested outputs, and what you personally built." },
    { question: "Should I claim lower hallucination rates?", answer: "Only if you measured them with a defined test set and can explain the comparison. Otherwise describe the checks you implemented without an invented percentage." },
  ],
  fullContent: <>
    <p className="lead">A prompt engineering resume is strongest when it describes a real workflow and the way you evaluated it. Listing model names or saying you &ldquo;wrote prompts&rdquo; does not explain the problem, the users, or the quality checks. Employers may use different titles for this work, so keep your formal title accurate and make the project itself clear.</p>

    <h2>Describe the use case</h2>
    <p>State what the system helped people do: draft support replies, categorize requests, retrieve internal documentation, or summarize a report. Identify the input, intended output, and who reviewed the result. Do not share private customer text or proprietary prompts without permission.</p>

    <h2>Explain your contribution</h2>
    <p>Did you design instructions, build a retrieval step, create evaluation examples, test model responses, or integrate an API? Separate your work from what another engineer or analyst built. An illustrative bullet is: &ldquo;Created a set of anonymized support examples and reviewed generated drafts against a checklist for accuracy and tone.&rdquo; Adapt only the parts you actually did.</p>

    <h2>Show how you checked quality</h2>
    <p>Useful evidence includes the number and type of test cases, a rubric you used, failure categories you found, and how you changed the workflow. If you report an improvement, explain the baseline and measurement. A vague claim that you &ldquo;eliminated hallucinations&rdquo; is not credible; describe the specific errors you reduced or the human review you added.</p>

    <h2>List tools in context</h2>
    <p>Name the models, SDKs, evaluation tools, databases, or languages you genuinely used. A skills section helps a reader find them, but a project bullet should explain why they were chosen. If a posting asks for an unfamiliar framework, do not add it to the resume just to match a phrase. See our <Link href="/blog/how-to-list-ai-skills-on-resume-2026">AI skills guide</Link> for honest wording.</p>

    <h2>Check the final application</h2>
    <p>Open public repositories only if they reveal no confidential data. Link to a project README that states the task, method, example output, and limitations. Export your resume as an accepted file type and review its text. Our <Link href="/blog/ats-friendly-resume-2026">file-check guide</Link> covers that step, and the <Link href="/builder">builder</Link> can help organize your projects.</p>
  </>,
};
