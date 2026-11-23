import Link from "next/link";
import type { BlogPost } from "../blog-types";

export const post8: BlogPost = {
  id: 8,
  title: "How to Explain an Employment Gap on Your Resume",
  excerpt: "Keep dates accurate, decide when a brief career-break entry helps, and protect personal details you do not want to share.",
  category: "Career Tips",
  categoryColor: "bg-rose-100 text-rose-700",
  readTime: "5 min read",
  date: "May 10, 2026",
  slug: "how-to-explain-employment-gaps",
  author: "Jerry",
  metaTitle: "How to Explain an Employment Gap on a Resume",
  metaDescription: "Use accurate dates and a brief career-break entry when helpful, without disclosing private health or family information.",
  bannerImage: "/images/blog/employment-gaps-editorial.webp",
  bannerAlt: "Job seeker reviewing a career timeline with a gap",
  relatedSlugs: ["employment-gap-resume", "cover-letter-vs-resume", "how-to-put-freelance-contract-work-on-resume"],
  faqs: [
    { question: "Should I change dates to hide a gap?", answer: "No. Keep the timeline truthful. An application may request exact months even if your resume uses years for a concise layout." },
    { question: "Do I have to explain a health or family break?", answer: "You can keep personal details private. A short career-break entry or a brief interview answer may be enough if you choose to explain the timeline." },
  ],
  fullContent: <>
    <p className="lead">A break in paid work can have many reasons. A resume should give an accurate timeline and focus on the work you can do now. You do not need to disclose private medical or family details to write a truthful document.</p>

    <h2>Keep the dates accurate</h2>
    <p>Use one consistent date format across roles. If an application later asks for month and year, provide the accurate dates. Do not extend a job to cover a break. A resume may use years for readability, but that does not change the underlying work history.</p>

    <h2>Decide whether a career-break entry helps</h2>
    <p>A short gap often needs no separate entry. For a longer break, a line such as &ldquo;Career break, 2024–2025: family caregiving&rdquo; can explain the timeline if you want to share that much. You can simply write &ldquo;Career break&rdquo; without additional personal detail. Avoid turning a private situation into a long story on the resume.</p>

    <h2>Include genuine work completed during the break</h2>
    <p>Freelance projects, volunteering, coursework, or a personal project may be relevant. Label each accurately and describe what you did. Do not turn occasional freelance assignments into continuous full-time employment. Our <Link href="/blog/how-to-put-freelance-contract-work-on-resume">freelance work guide</Link> shows how to group projects clearly.</p>

    <h2>Prepare a short interview answer</h2>
    <p>You may be asked about the interval. A concise answer can acknowledge the break and move to your readiness for the role: &ldquo;I took time away from paid work for family reasons. I&apos;m now available for full-time work and have kept up my spreadsheet skills through a recent project.&rdquo; Adapt the wording to your real situation and share only what you are comfortable sharing.</p>

    <h2>Bring the reader back to your fit</h2>
    <p>Put your strongest relevant experience near the top, check dates and links, and follow the application&apos;s format instructions. Our <Link href="/blog/employment-gap-resume">longer employment-gap guide</Link> covers several scenarios. You can reorganize sections in our <Link href="/builder">resume builder</Link> and check the final export before applying.</p>
  </>,
};
