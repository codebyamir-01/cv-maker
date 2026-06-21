import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { ResumeData } from "@/store/useResumeStore";

export async function exportToDocx(resumeData: ResumeData) {
  const { personalInfo, experience, summary } = resumeData;

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: personalInfo.fullName || "Your Name",
            heading: HeadingLevel.HEADING_1,
            alignment: "center",
          }),
          new Paragraph({
            alignment: "center",
            children: [
              new TextRun({ text: personalInfo.email ? `${personalInfo.email} | ` : "" }),
              new TextRun({ text: personalInfo.phone ? `${personalInfo.phone} | ` : "" }),
              new TextRun({ text: personalInfo.location || "" }),
            ],
          }),
          new Paragraph({
            alignment: "center",
            children: [
              new TextRun({ text: personalInfo.linkedIn ? `LinkedIn: ${personalInfo.linkedIn} | ` : "", color: "0000FF" }),
              new TextRun({ text: personalInfo.github ? `GitHub: ${personalInfo.github}` : "", color: "0000FF" }),
            ],
          }),
          new Paragraph({ text: "" }), // Spacing

          // Summary
          ...(summary
            ? [
                new Paragraph({
                  text: "Professional Summary",
                  heading: HeadingLevel.HEADING_2,
                }),
                new Paragraph({
                  text: summary,
                }),
                new Paragraph({ text: "" }), // Spacing
              ]
            : []),

          // Experience
          new Paragraph({
            text: "Work Experience",
            heading: HeadingLevel.HEADING_2,
          }),
          ...experience.flatMap((exp) => [
            new Paragraph({
              children: [
                new TextRun({ text: exp.jobTitle, bold: true }),
                new TextRun({ text: ` — ${exp.company}` }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({ text: `${exp.startDate} - ${exp.endDate}`, italics: true }),
                new TextRun({ text: ` | ${exp.location}`, italics: true }),
              ],
            }),
            new Paragraph({
              text: exp.description || "",
            }),
            new Paragraph({ text: "" }), // Spacing
          ]),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${personalInfo.fullName.replace(/\s+/g, "_") || "Resume"}.docx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
