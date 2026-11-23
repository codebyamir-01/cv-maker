import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import PDFParser from "pdf2json";
import { saveTextResumePdf } from "../src/lib/ats-pdf.ts";

const filename = `resume-text-check-${process.pid}.pdf`;
const fixture = {
  personalInfo: { fullName: "Taylor Example", jobTitle: "Data Analyst", email: "taylor@example.com", phone: "555-0101", city: "Austin", country: "USA", linkedIn: "", github: "", portfolio: "" },
  summary: "Analyzed support requests to identify recurring issues.",
  experience: [{ jobTitle: "Analyst", company: "Example Co", location: "Austin", startDate: "Jan 2024", endDate: "Present", currentlyWorking: true, description: "Created weekly SQL reports for the support team." }],
  education: [{ degree: "BS Statistics", institution: "Example University", location: "Austin", startYear: "2019", endYear: "2023" }],
  skills: [{ name: "SQL", category: "Technical" }],
  optionalSections: { projects: [], certifications: [], languages: [], awards: [], volunteer: [], publications: [] },
};

try {
  await saveTextResumePdf(fixture, filename);
  const parser = new PDFParser(null, true);
  const parsed = new Promise((resolve, reject) => {
    parser.once("pdfParser_dataReady", resolve);
    parser.once("pdfParser_dataError", reject);
  });
  await parser.loadPDF(path.resolve(filename), 0);
  await parsed;
  const extracted = parser.getRawTextContent();
  for (const expected of ["Taylor Example", "Data Analyst", "Example Co", "SQL reports", "BS Statistics"]) {
    assert.ok(extracted.includes(expected), `PDF text missing: ${expected}`);
  }
  console.log("Selectable-text PDF export contains the sample name, role, work, and education.");
} finally {
  await fs.rm(filename, { force: true });
}
