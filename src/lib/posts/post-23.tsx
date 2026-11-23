import Link from "next/link";
import type { BlogPost } from "../blog-types";

export const post23: BlogPost = {
  id: 23,
  title: "Career Change Resume: Show Transferable Work With Evidence",
  excerpt: "Make a career transition clear by connecting past responsibilities, new training, and projects to the target role.",
  category: "Career Tips",
  categoryColor: "bg-indigo-100 text-indigo-700",
  readTime: "6 min read",
  date: "Oct 15, 2026",
  slug: "how-to-write-a-career-change-resume-2026",
  author: "Smart Resume Maker Editorial Team",
  metaTitle: "Career Change Resume: Transferable Skills and Examples",
  metaDescription: "Explain a career transition with relevant past work, new training, and projects while keeping your job history and dates clear.",
  bannerImage: "/images/blog/career-change-editorial.webp",
  bannerAlt: "Illustration of a career changer crossing into a new role",
  relatedSlugs: ["resume-summary-vs-objective", "how-to-tailor-resume-to-job-description-2026", "resume-no-work-experience"],
  faqs: [
    { question: "Should I hide my previous career?", answer: "No. Keep your actual work history and dates. Select past examples that show skills relevant to the new role and explain new training or projects separately." },
    { question: "Is a skills-first resume required?", answer: "No. A clear chronological or hybrid layout can work. Keep employers and dates easy to find whichever structure you choose." },
  ],
  fullContent: <>
    <p className="lead">A career change resume has to answer two reader questions: why this new role, and what evidence suggests you can do it? You do not need to invent a new professional identity. Show the transferable parts of your past work, plus any training or projects that bridge the gap.</p>

    <h2>Choose the target before changing the document</h2>
    <p>Read a few postings for the same type of role and identify the recurring responsibilities. Pick requirements you genuinely meet through work, study, volunteering, or projects. Keep a base resume with your full history, then bring the best matching examples forward for each application. See our <Link href="/blog/how-to-tailor-resume-to-job-description-2026">tailoring method</Link>.</p>

    <h2>Translate a past responsibility</h2>
    <p>Describe the task in terms a new employer can understand without changing the facts. For instance, a retail supervisor moving toward operations might explain scheduling, stock reports, or process documentation. An illustrative bullet is: &ldquo;Prepared weekly stock summaries and flagged recurring gaps for the store manager.&rdquo; Add a measurable outcome only if it is recorded and attributable.</p>

    <h2>Show the bridge</h2>
    <p>Relevant coursework, a small project, or volunteer work can demonstrate a new skill. Label it accurately. A personal dashboard is a project, not a year of professional analytics experience. Explain the question, method, output, and what you learned. If you include a public portfolio link, test it and remove private data.</p>

    <h2>Write an honest opening</h2>
    <p>A short objective or profile may be useful when the new direction is not obvious from your job titles. For example: &ldquo;Retail team lead transitioning into operations coordination, with experience in schedules, stock reporting, and staff handoffs.&rdquo; The opening should point to details present in the rest of the resume. Our <Link href="/blog/resume-summary-vs-objective">summary versus objective guide</Link> explains the choice.</p>

    <h2>Keep the timeline readable</h2>
    <p>Retain accurate employers, roles, and dates. Shorten unrelated older duties rather than obscuring the timeline. Use standard headings and inspect the file after export, especially if you use a hybrid layout. The <Link href="/blog/ats-friendly-resume-2026">file-check guide</Link> covers reading order; the <Link href="/builder">builder</Link> lets you reorder sections and review the final PDF.</p>
  </>,
};
