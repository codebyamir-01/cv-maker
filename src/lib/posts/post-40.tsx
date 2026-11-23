import Link from "next/link";
import type { BlogPost } from "../blog-types";

export const post40: BlogPost = {
  id: 40,
  title: "Data Science Resume Skills: Organize Your Technical Stack",
  excerpt: "Group data science tools by what you have actually done, then connect important skills to projects and work examples.",
  category: "Tech Careers",
  categoryColor: "bg-cyan-100 text-cyan-700",
  readTime: "5 min read",
  date: "Nov 1, 2026",
  slug: "data-science-resume-guide-2026-skills-portfolio-ats-keywords",
  author: "Smart Resume Maker Editorial Team",
  metaTitle: "Data Science Resume Skills: Tools and Work Examples",
  metaDescription: "Organize Python, SQL, modeling, and deployment skills on a data science resume, with practical ways to show evidence in projects.",
  bannerImage: "/images/blog/data-science-projects-editorial.webp",
  bannerAlt: "Data science team planning a project for a resume",
  relatedSlugs: ["data-science-resume-guide-2026", "data-scientist-resume-guide-2026", "data-analyst-resume-guide-2026"],
  faqs: [
    { question: "Should I list every library I have tried?", answer: "No. Prioritize tools you can discuss and that matter to the target role. Show important tools inside relevant project or work examples." },
    { question: "Are keywords enough for a data science resume?", answer: "No. Tool names help identify your experience, but readers also need to know what problem you solved, how you evaluated the work, and your contribution." },
  ],
  fullContent: <>
    <p className="lead">A data science skills section should be a map of tools you actually use, not a catalogue of every framework you have heard of. Group related skills and connect the most important ones to a project or job bullet. That gives both technical and nontechnical readers a way to understand your experience.</p>

    <h2>Group by function</h2>
    <p>Useful groups may include querying and data preparation, analysis and visualization, modeling and evaluation, and deployment or monitoring. Use categories only when they match the target role. A short example might read: &ldquo;Data: SQL, Python/pandas; Analysis: experiment design, Tableau; Modeling: scikit-learn, cross-validation.&rdquo; Replace every item with a skill you can explain.</p>

    <h2>Show evidence beside the list</h2>
    <p>If SQL is a requirement, a work bullet could explain a query you wrote and why: &ldquo;Joined support and billing tables to identify recurring invoice questions for a weekly operations report.&rdquo; That illustrative example is more useful than listing SQL three times. If you claim model evaluation, describe the baseline, dataset split, and failure cases.</p>

    <h2>Avoid misleading proficiency claims</h2>
    <p>A class project can establish familiarity, but it is different from operating a production system. State the project context. If you used a tutorial, identify what you changed or analyzed independently. Do not list a cloud platform as a strong skill because you opened an account once.</p>

    <h2>Tailor to the specialization</h2>
    <p>An analytics role may prioritize SQL, communication, and experimental reasoning. A machine learning role may ask about model evaluation, feature work, and deployment. Pick the most relevant groups rather than forcing every tool onto one page. Our <Link href="/blog/data-science-resume-guide-2026">portfolio guide</Link> explains how to support the skills with a few inspectable projects.</p>

    <h2>Check readability after export</h2>
    <p>Keep the skills section plain text rather than graphical progress bars. Copy the final PDF text and confirm that each category and tool appears in order. Link to public work only if it contains no private information. For a complete document structure, see our <Link href="/blog/data-scientist-resume-guide-2026">data scientist resume guide</Link> or draft sections in the <Link href="/builder">builder</Link>.</p>
  </>,
};
