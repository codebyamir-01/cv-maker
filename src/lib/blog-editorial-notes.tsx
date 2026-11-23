import Link from "next/link";
import type { ReactNode } from "react";

// Specific follow-up guidance for the short early articles. Kept separate so
// the original article text and its editorial additions remain easy to review.
export const BLOG_EDITORIAL_NOTES: Record<string, ReactNode> = {
  "ats-friendly-resume-2026": <>
    <h2>Test the file you will actually submit</h2>
    <p>Download the final resume, select all its text, and paste it into a plain-text editor. Check that your name, contact details, employer names, dates, and skills appear in a sensible order. Then upload the file to the application form and correct any fields the employer&apos;s system fills incorrectly. Our builder offers a <Link href="/builder">selectable-text PDF option</Link> for this check; an attractive design alone does not establish that a file can be parsed.</p>
    <p>If the posting asks for DOCX, send DOCX. If it accepts PDF, a text-based PDF is a reasonable option. The employer&apos;s instructions take priority over general format advice. See our <Link href="/blog/pdf-vs-word-ats-resume-format-2026">PDF versus Word guide</Link> for the tradeoffs.</p>
  </>,
  "resume-action-verbs": <>
    <h2>Turn a duty into an evidence-based bullet</h2>
    <p>Start with an action you performed, name the object of that action, and describe the result you can verify. For example, &ldquo;Updated the support knowledge base to answer recurring billing questions&rdquo; is clearer than &ldquo;Responsible for support.&rdquo; Add a number only when you have a record to support it.</p>
    <p>Use a verb that matches your actual responsibility. &ldquo;Led&rdquo; implies ownership; &ldquo;contributed&rdquo; is more accurate if you worked as part of a team. After drafting, compare the bullet with the job posting and remove details that do not help explain your fit. You can revise the result in our <Link href="/builder">resume builder</Link>.</p>
  </>,
  "one-page-vs-two-page-resume": <>
    <h2>A practical page-two test</h2>
    <p>Place your strongest recent work, contact information, and role-relevant skills on page one. If page two contains only an old role or a few stray lines, shorten repeated duties before shrinking the font. If it contains substantial, relevant projects or leadership evidence, two pages can be easier to read than one crowded page.</p>
    <p>Export the final document and check both pages at normal zoom and on a phone. Make sure no job heading is stranded at the bottom of a page. Our <Link href="/blog/are-two-column-resumes-ats-friendly-2026">layout and reading-order check</Link> covers another format choice that affects exported files.</p>
  </>,
  "how-to-write-professional-summary": <>
    <h2>Write from facts you can defend</h2>
    <p>Before drafting, list your actual role, two relevant skills, and one accomplishment. A useful summary for a customer support applicant might read: &ldquo;Customer support specialist experienced in email and chat queues, help-center updates, and escalation handoffs. Improved support articles based on recurring customer questions.&rdquo; It works without an invented percentage or an inflated title.</p>
    <p>If you are entering a new field, name transferable work and a relevant project instead of claiming years in the new role. Compare the opening with the rest of your resume: every claim should have supporting evidence below it. See our <Link href="/blog/resume-summary-vs-objective">summary versus objective guide</Link> and try the <Link href="/builder">builder</Link> to revise it.</p>
  </>,
  "best-resume-format-software-engineers": <>
    <h2>Show the engineering decision, not only the stack</h2>
    <p>A skills list helps a reader find your tools, but your experience should explain what you built. A concise project bullet can identify the problem, your contribution, and the outcome: &ldquo;Added pagination to a customer search endpoint and documented the new response shape for the frontend team.&rdquo; Include performance figures only if you measured them.</p>
    <p>For each project, link to a working repository or demo if public access is appropriate. If the code is private, explain the architecture and your role without sharing confidential details. When exporting from the <Link href="/builder">builder</Link>, check that GitHub links and technical terms remain selectable text.</p>
  </>,
  "how-to-list-skills-on-resume": <>
    <h2>Match skills to evidence</h2>
    <p>Make two lists from the posting: required tools you have used and responsibilities you have performed. Put the most relevant genuine skills in a short skills section, then show at least the important ones in a project or work bullet. For example, a claim of SQL is stronger beside a line describing a query or report you built.</p>
    <p>Do not copy every phrase from an advertisement. If you have only studied a tool, say so through a course or project rather than presenting professional proficiency. The <Link href="/ats-resume-checker">resume checker</Link> can suggest wording to review, but its score is an estimate and should not replace your own evidence check.</p>
  </>,
  "cover-letter-vs-resume": <>
    <h2>What should differ between the two documents?</h2>
    <p>Your resume gives a scannable record of roles, projects, and skills. A cover letter explains why two or three of those details matter for this specific vacancy. Repeating the same bullet points in paragraph form wastes the space; choose one relevant example and explain the context, action, and result.</p>
    <p>When a posting says a letter is optional, use one if you can add specific information, such as a career transition or a clear reason for the role. If it says not to include one, follow that instruction. Start with the <Link href="/blog/how-to-write-cover-letter">cover-letter structure guide</Link> and keep your <Link href="/builder">resume</Link> consistent with it.</p>
  </>,
  "how-to-explain-employment-gaps": <>
    <h2>Give a clear, truthful timeline</h2>
    <p>Use accurate dates in the format requested by the application. For a substantial break, a short entry such as &ldquo;Career break, 2024–2025: family caregiving; completed bookkeeping coursework&rdquo; may help explain the timeline if both details are true. You do not need to disclose private medical or family information.</p>
    <p>Practice a brief interview answer that addresses the break and turns to your current readiness. Our <Link href="/blog/employment-gap-resume">detailed gap examples</Link> show several contexts; the <Link href="/builder">builder</Link> lets you place an entry where it fits your history.</p>
  </>,
  "linkedin-profile-vs-resume": <>
    <h2>Keep dates and claims consistent</h2>
    <p>Your public profile can describe a wider range of work, while a resume should emphasize what fits the vacancy. Both should agree on employer names, role dates, and qualifications. If you use a different job title for clarity, keep the formal title visible somewhere so a reader understands the relationship.</p>
    <p>Use a descriptive public profile URL in your contact section if you want recruiters to visit it. Test the link in the exported PDF and check what a signed-out visitor can see. Our <Link href="/blog/how-to-write-professional-summary">summary guide</Link> can help turn a broad profile into a focused resume opening.</p>
  </>,
  "resume-tips-for-fresh-graduates": <>
    <h2>Describe a course project as real work</h2>
    <p>Give the project a name, timeframe, tools, and your contribution. &ldquo;Built a three-page survey report using spreadsheet formulas and presented the findings to a four-person seminar group&rdquo; tells a reader more than &ldquo;Good at Excel.&rdquo; If you worked in a group, distinguish what you personally did.</p>
    <p>Part-time work can show customer service, scheduling, or cash handling even when the target role is different. Place your most relevant evidence first and remove school details that no longer help. Compare this with our <Link href="/blog/resume-no-work-experience">no-experience resume guide</Link>, then draft it in the <Link href="/builder">builder</Link>.</p>
  </>,
  "what-is-a-smart-resume-builder": <>
    <h2>Check the output before trusting the tool</h2>
    <p>A builder can reduce formatting work, but it cannot verify your employment history or guarantee an interview. Review AI-assisted sentences for invented numbers, exaggerated responsibility, and irrelevant phrases. Save a copy of the final file, open it on another device, and confirm that links and text survive export.</p>
    <p>Our <Link href="/builder">resume builder</Link> includes both a designed PDF and a selectable-text PDF option. Choose based on the application instructions and check the actual exported file. The <Link href="/blog/ats-friendly-resume-2026">file-check guide</Link> explains how to inspect reading order.</p>
  </>,
  "beat-the-bots-ats-keywords": <>
    <h2>Use the employer&apos;s language accurately</h2>
    <p>Read the job description for named tools, certifications, and responsibilities. If you genuinely used a listed tool, show it where you used it: &ldquo;Created weekly Power BI dashboards for the operations team.&rdquo; A disconnected list of repeated terms is less useful than an example a hiring manager can verify.</p>
    <p>Different employers configure their hiring systems differently, so no keyword frequency guarantees a pass. Proofread for synonyms a reader will understand and follow the requested file format. Try our <Link href="/ats-resume-checker">relevance checker</Link> as a prompt for review, then make the final decision yourself.</p>
  </>,
  "how-to-use-ai-resume-builder": <>
    <h2>A safer prompt and review workflow</h2>
    <p>Give the AI only facts you are comfortable sharing: role, responsibilities, tools, and a result you can substantiate. Ask it to rewrite a bullet for clarity without adding achievements or metrics. Compare its output word by word with your original facts, then read it aloud. If it sounds vague or inflated, rewrite it yourself.</p>
    <p>A practical prompt is: &ldquo;Rewrite this resume bullet in plain language. Keep all facts and numbers unchanged. Do not add tools, outcomes, or seniority.&rdquo; Avoid pasting confidential employer or customer data into a service without permission. See our <Link href="/blog/can-ats-detect-ai-resumes-2026">AI screening guide</Link> for the limits of detection claims.</p>
  </>,
  "resume-no-work-experience": <>
    <h2>Choose evidence for your target role</h2>
    <p>For a data role, a small spreadsheet or coding project with a clear question and result is useful. For a customer-facing role, describe a volunteer shift, event, or part-time job where you handled requests. Include a project link only if it works publicly and you have permission to share it.</p>
    <p>Check each bullet against the vacancy: does it demonstrate a requested skill, responsibility, or outcome? Keep the wording honest about what was coursework and what was paid work. The <Link href="/blog/resume-tips-for-fresh-graduates">graduate guide</Link> has another example; the <Link href="/builder">builder</Link> lets you reorder sections.</p>
  </>,
  "resume-summary-vs-objective": <>
    <h2>Pick the opening that explains your fit</h2>
    <p>If your recent work matches the target role, summarize that experience and one specific strength. If you are entering the field, a short objective can name the role and the evidence you bring, such as training or a project. Neither label is mandatory: a strong first paragraph matters more than whether you call it a summary or objective.</p>
    <p>Write the rest of the resume first, then select only claims supported by its bullets. Compare two versions with our <Link href="/blog/how-to-write-professional-summary">summary examples</Link> and remove unverified metrics from either version.</p>
  </>,
  "employment-gap-resume": <>
    <h2>When an application asks for exact dates</h2>
    <p>Enter the dates accurately. A resume may use years for brevity, but an application form or background check can ask for months. Be prepared to clarify differences without changing the underlying timeline. A short career-break entry can explain a long interval while keeping personal details private.</p>
    <p>If you completed a course, volunteered, or freelanced during the break, include it only if it is true and relevant. The <Link href="/blog/how-to-explain-employment-gaps">short gap guide</Link> offers a compact version of this advice.</p>
  </>,
  "how-to-write-cover-letter": <>
    <h2>Check the letter against the posting</h2>
    <p>After drafting, highlight every claim about the employer and verify it on the employer&apos;s own site or the job advertisement. Replace generic praise with a reason tied to the work. Keep the examples consistent with your <Link href="/builder">resume</Link>, and do not invent a result simply to sound impressive.</p>
    <p>If you cannot explain why a sentence belongs in this application, cut it. Send the file type requested by the employer and preview the final attachment before submitting. Our <Link href="/blog/cover-letter-vs-resume">comparison guide</Link> explains which details belong in each document.</p>
  </>,
  "best-resume-format-2026": <>
    <h2>Check each format as a reader would</h2>
    <p>For most applicants with relevant work history, a reverse-chronological format makes dates and progression easy to follow. A skills-first format can help explain a transition, but it should still show employers and dates clearly. Pick the layout that makes your actual evidence quickest to understand.</p>
    <p>Export a sample and copy its text into a plain-text editor to test reading order. A <Link href="/blog/are-two-column-resumes-ats-friendly-2026">two-column layout</Link> needs that check especially. The <Link href="/builder">builder</Link> offers a selectable-text PDF for applications that accept PDF files.</p>
  </>,
};

type Source = { label: string; url: string; context: string };
const parsing: Source = {
  label: "Greenhouse: Unsuccessful resume parse",
  url: "https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse",
  context: "Greenhouse documents file and layout problems that can interrupt its own resume parser. Other employers may use different software.",
};
const workday: Source = {
  label: "Workday: Candidate Profile help",
  url: "https://community-content.workday.com/en-us/public/products/talent-management/talent-acquisition/workday-candidate-profile.html",
  context: "Workday explains when its application asks for a resume upload and how saved profile information can fill application fields.",
};
const writing: Source = {
  label: "Penn Career Services: Effective resumes and cover letters",
  url: "https://careerservices.upenn.edu/what-makes-an-effective-resume-cover-letter/",
  context: "Penn Career Services explains how to select relevant experience and describe it with specific evidence.",
};
const formatting: Source = {
  label: "Berkeley Career Engagement: Resumes",
  url: "https://www.career.berkeley.edu/prepare-for-success/resumes/",
  context: "Berkeley's career guide covers readable resume structure and common formatting problems.",
};
const letters: Source = {
  label: "Penn Career Services: Cover-letter writing guide",
  url: "https://careerservices.upenn.edu/cover-letter-writing-guide/",
  context: "Penn's guide offers a second perspective on what to include in a cover letter.",
};
const cybersecurity: Source = {
  label: "NIST: NICE Workforce Framework for Cybersecurity",
  url: "https://csrc.nist.gov/pubs/sp/800/181/r1/final",
  context: "NIST's NICE framework offers a common vocabulary for cybersecurity tasks, knowledge, and skills. Use only the work that matches your experience.",
};
const linkedin: Source = {
  label: "LinkedIn Help: Control your public profile",
  url: "https://www.linkedin.com/help/linkedin/answer/a528138/control-your-public-linkedin-profile",
  context: "LinkedIn explains which profile sections may be visible outside the service and how to change those settings.",
};
const dataProjects: Source = {
  label: "Google Career Certificates: Data analytics case study",
  url: "https://www.grow.google/certificates/data-analytics/",
  context: "Google's data analytics curriculum includes a case study; it is one example of how a project can demonstrate a method and result.",
};

export function sourceForBlogPost(slug: string): Source {
  if (/cover-letter/.test(slug)) return letters;
  if (/workday/.test(slug)) return workday;
  if (/cybersecurity/.test(slug)) return cybersecurity;
  if (/linkedin/.test(slug)) return linkedin;
  if (/data-science|data-scientist|data-analyst/.test(slug)) return dataProjects;
  if (/ats|workday|greenhouse|screening|pdf-vs-word|keywords|two-column/.test(slug)) return parsing;
  if (/format|page|length|column/.test(slug)) return formatting;
  return writing;
}
