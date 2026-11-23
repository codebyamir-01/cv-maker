import Link from "next/link";
import type { BlogPost } from "../blog-types";

export const post22: BlogPost = {
  id: 22,
  title: "Cybersecurity Resume: Skills, Projects, and Credentials",
  excerpt: "Show security tasks you performed, tools you used, and certifications you actually hold, with context for each example.",
  category: "Tech Careers",
  categoryColor: "bg-cyan-100 text-cyan-700",
  readTime: "6 min read",
  date: "Oct 14, 2026",
  slug: "cybersecurity-resume-guide-2026",
  author: "Smart Resume Maker Editorial Team",
  metaTitle: "Cybersecurity Resume: Skills and Project Examples",
  metaDescription: "Write a cybersecurity resume using accurate incident, monitoring, governance, or lab examples and clearly named credentials.",
  bannerImage: "/images/blog/cybersecurity-editorial.webp",
  bannerAlt: "Cybersecurity analyst reviewing security work and resume",
  relatedSlugs: ["best-resume-format-software-engineers", "how-to-list-skills-on-resume", "ats-friendly-resume-2026"],
  faqs: [
    { question: "Should I list a certification I am studying for?", answer: "Do not present it as earned. You may list relevant training or a scheduled exam accurately if it helps the application." },
    { question: "Can a home lab count as experience?", answer: "A lab can demonstrate a skill. Label it as a personal project, describe what you configured or tested, and keep it separate from paid employment." },
  ],
  fullContent: <>
    <p className="lead">Cybersecurity covers many kinds of work: monitoring, incident response, identity and access, governance, application security, and more. A useful resume matches the target role and shows tasks you actually performed. The <a href="https://csrc.nist.gov/pubs/sp/800/181/r1/final" target="_blank" rel="noopener noreferrer">NIST NICE framework</a> can help you find accurate language for tasks and skills without claiming every listed competency.</p>

    <h2>Identify the work role first</h2>
    <p>A security operations role may ask for alert triage and incident documentation; a governance role may emphasize policy and risk assessment. Read the posting and select relevant work. Avoid a single generic skills list that tries to cover every security specialty. Our <Link href="/blog/how-to-tailor-resume-to-job-description-2026">tailoring guide</Link> helps map requirements to evidence.</p>

    <h2>Write a task-based bullet</h2>
    <p>Name the environment, your action, and a result or deliverable. An illustrative example is: &ldquo;Reviewed endpoint alerts in the ticket queue, escalated confirmed cases using the runbook, and documented recurring false positives for the team.&rdquo; Replace the tools, scope, and responsibilities with your own. If you report reduced response time, describe the measurement period and what else may have affected it.</p>

    <h2>Separate professional work from labs</h2>
    <p>A home lab is useful when you can show what you set up, tested, and learned. Label it &ldquo;Projects&rdquo; or &ldquo;Lab Work&rdquo; rather than employment. A short project description might state the system, the detection rule or configuration you tried, and the limitation you found. Do not publish sensitive logs, credentials, or material from an employer environment.</p>

    <h2>List credentials precisely</h2>
    <p>Include the full certification name, issuing organization, and date if relevant. If a credential has expired, do not imply it is current. If you are still studying, say &ldquo;Coursework in progress&rdquo; or include a scheduled exam only when it is real. This lets a reader distinguish demonstrated knowledge from a credential you have earned.</p>

    <h2>Check the export</h2>
    <p>Keep contact details, section headings, tools, and certification names as readable text. Test the final PDF by copying its text into a plain-text editor. Follow the employer&apos;s accepted format and check fields filled after upload. The <Link href="/blog/ats-friendly-resume-2026">file-check guide</Link> covers this process, and our <Link href="/builder">builder</Link> can help structure the sections.</p>
  </>,
};
