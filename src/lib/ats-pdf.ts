import type { ResumeData } from "@/store/useResumeStore";

/** Export a simple, selectable-text resume for applications that parse PDF text. */
export async function saveTextResumePdf(data: ResumeData, filename: string) {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ unit: "mm", format: "a4" });
  const left = 19;
  const width = pdf.internal.pageSize.getWidth() - 38;
  const bottom = pdf.internal.pageSize.getHeight() - 18;
  let y = 19;

  const addText = (value: string | undefined, size = 10, bold = false, gap = 1.5) => {
    const clean = (value || "").replace(/\s+/g, " ").trim();
    if (!clean) return;
    pdf.setFont("helvetica", bold ? "bold" : "normal");
    pdf.setFontSize(size);
    const lines = pdf.splitTextToSize(clean, width) as string[];
    const lineHeight = size * 0.42;
    for (const line of lines) {
      if (y + lineHeight > bottom) { pdf.addPage(); y = 19; }
      pdf.text(line, left, y);
      y += lineHeight;
    }
    y += gap;
  };
  const section = (heading: string) => {
    if (y + 15 > bottom) { pdf.addPage(); y = 19; }
    y += 3;
    addText(heading.toUpperCase(), 11, true, 1);
    pdf.setDrawColor(180, 190, 200);
    pdf.line(left, y, left + width, y);
    y += 3;
  };

  const person = data.personalInfo;
  addText(person.fullName || [person.firstName, person.lastName].filter(Boolean).join(" "), 18, true, 1);
  addText(person.jobTitle, 11, false, 1);
  addText([person.email, person.phone, [person.city, person.country].filter(Boolean).join(", ") || person.location].filter(Boolean).join(" | "), 9, false, 1);
  addText([person.linkedIn, person.github, person.portfolio].filter(Boolean).join(" | "), 9, false, 2);

  if (data.summary?.trim()) { section("Professional Summary"); addText(data.summary); }
  if (data.experience.length) {
    section("Work Experience");
    for (const job of data.experience) {
      addText([job.jobTitle, job.company].filter(Boolean).join(" | "), 10, true, 0.5);
      addText([job.location, [job.startDate, job.currentlyWorking ? "Present" : job.endDate].filter(Boolean).join(" - ")].filter(Boolean).join(" | "), 9, false, 0.5);
      addText(job.description, 10, false, 2);
    }
  }
  if (data.education.length) {
    section("Education");
    for (const item of data.education) {
      addText([item.degree, item.institution].filter(Boolean).join(" | "), 10, true, 0.5);
      addText([item.location, [item.startYear, item.currentlyStudying ? "Present" : item.endYear].filter(Boolean).join(" - ")].filter(Boolean).join(" | "), 9, false, 1.5);
    }
  }
  if (data.skills.length) { section("Skills"); addText(data.skills.map(skill => skill.name).filter(Boolean).join(" | ")); }
  const optional = data.optionalSections;
  const projects = optional?.projects?.length ? optional.projects : data.projects || [];
  if (projects.length) {
    section("Projects");
    for (const project of projects) {
      addText(project.name, 10, true, 0.5);
      addText([project.description, project.techStack, project.link].filter(Boolean).join(" | "), 10, false, 1.5);
    }
  }
  if (optional?.certifications?.length) { section("Certifications"); for (const item of optional.certifications) addText([item.name, item.issuer, item.issueDate].filter(Boolean).join(" | ")); }
  if (optional?.languages?.length) { section("Languages"); addText(optional.languages.map(item => [item.name, item.proficiency].filter(Boolean).join(" - ")).join(" | ")); }
  if (optional?.awards?.length) { section("Awards"); for (const item of optional.awards) addText([item.title, item.organization, item.date, item.description].filter(Boolean).join(" | ")); }
  if (optional?.volunteer?.length) { section("Volunteer Experience"); for (const item of optional.volunteer) addText([item.role, item.organization, item.description].filter(Boolean).join(" | ")); }
  if (optional?.publications?.length) { section("Publications"); for (const item of optional.publications) addText([item.title, item.publisher, item.date, item.link].filter(Boolean).join(" | ")); }
  pdf.save(filename);
}
