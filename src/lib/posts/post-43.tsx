import Link from "next/link";
import type { BlogPost } from "../blog-types";

export const post43: BlogPost = {
  id: 43,
  title: "How to List Freelance and Contract Work on a Resume",
  excerpt: "Group contract projects clearly, show the client work you can discuss, and keep dates and employment type accurate.",
  category: "Resume Advice",
  categoryColor: "bg-purple-100 text-purple-700",
  readTime: "5 min read",
  date: "Nov 4, 2026",
  slug: "how-to-put-freelance-contract-work-on-resume",
  author: "Smart Resume Maker Editorial Team",
  metaTitle: "Freelance and Contract Work on a Resume: Examples",
  metaDescription: "Learn when to group freelance projects, how to show contract dates and client work, and how to protect confidential information.",
  bannerImage: "/images/blog/freelance-contract-editorial.webp",
  bannerAlt: "Freelancer organizing client projects for a resume",
  relatedSlugs: ["how-to-explain-employment-gaps", "how-to-tailor-resume-to-job-description-2026", "resume-action-verbs"],
  faqs: [
    { question: "Can I group several freelance clients under one entry?", answer: "Yes, when you genuinely operated as a freelancer over that period. Keep the dates accurate and choose representative projects that you can discuss." },
    { question: "Should I name every client?", answer: "Only when the relationship is public or you have permission. You can describe the industry and task without revealing confidential details." },
  ],
  fullContent: <>
    <p className="lead">Freelance and contract work is work. Present it in a way that helps a reader understand your responsibility and timeline. You can group related projects under a freelance entry or list a substantial contract separately. The choice depends on how much detail the target role needs, not on a hidden rule about &ldquo;job hopping.&rdquo;</p>

    <h2>Choose a clear structure</h2>
    <p>If you ran an independent practice, a heading such as &ldquo;Freelance Designer, 2023–2025&rdquo; can group several clients. If you worked on a six-month contract through an agency, you may list the role, client if permitted, agency, and dates. Keep the nature of the work clear and use the same date format as your other roles.</p>

    <h2>Select projects that fit the vacancy</h2>
    <p>Do not list every small gig. Choose a few examples that show relevant skills, the deliverable, and your role. An illustrative bullet is: &ldquo;Built a booking page for a small service business and documented the handoff for the owner.&rdquo; Add a measured result only if you have a record and permission to share it. See our <Link href="/blog/how-to-tailor-resume-to-job-description-2026">tailoring guide</Link> for choosing examples.</p>

    <h2>Protect client information</h2>
    <p>A public portfolio item should respect your agreement with the client. If you cannot name the organization or show the work, describe the sector, problem, and deliverable at a level you are allowed to discuss. Remove credentials, customer data, private analytics, and unpublished strategy from screenshots and repositories.</p>

    <h2>Explain overlap and gaps honestly</h2>
    <p>Freelance work may overlap with a salaried job or a career break. Show dates accurately. You do not need to hide freelance work to make a timeline look simpler, but do not represent a handful of short assignments as continuous full-time employment. Our <Link href="/blog/how-to-explain-employment-gaps">employment gap guide</Link> has examples for a truthful timeline.</p>

    <h2>Check the final file</h2>
    <p>Make sure each client or project can be distinguished after export, especially if you use columns or text boxes. Test portfolio links and follow the employer&apos;s requested file format. You can group projects in our <Link href="/builder">resume builder</Link> and download a selectable-text PDF for a reading-order check.</p>
  </>,
};
