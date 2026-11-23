// One-time registry of individually reviewed article artwork.
import fs from "node:fs/promises";
import path from "node:path";
import ts from "typescript";
import sharp from "sharp";

const covers = {
  1: ["ats-friendly-resume-editorial.webp", "Resume beside a laptop showing a document scan"],
  2: ["action-verbs-editorial.webp", "Editor improving resume bullets with a red pencil"],
  3: ["one-vs-two-pages-editorial.webp", "One-page resume compared with a two-page resume"],
  4: ["professional-summary-editorial.webp", "Job seeker drafting a highlighted resume summary"],
  5: ["software-engineer-format-editorial.webp", "Software developer workspace with code and a resume"],
  6: ["resume-skills-editorial.webp", "Skills cards being organized around a resume"],
  7: ["cover-letter-vs-resume-editorial.webp", "Cover letter in an envelope beside a structured resume"],
  8: ["employment-gaps-editorial.webp", "Job seeker reviewing a career timeline with a gap"],
  9: ["linkedin-vs-resume-editorial.webp", "Online professional profile compared with a printed resume"],
  10: ["fresh-graduate-resume-editorial.webp", "Recent graduate preparing a first resume from projects"],
  11: ["smart-resume-builder-editorial.webp", "Resume builder interface with an editable form and preview"],
  12: ["ats-keywords-editorial.webp", "Matching job requirements highlighted beside a resume"],
  13: ["ai-resume-writing-editorial.webp", "Writer reviewing AI suggestions while editing a resume"],
  14: ["no-work-experience-editorial.webp", "First-time applicant organizing projects and volunteer work"],
  15: ["summary-vs-objective-editorial.webp", "Illustrated comparison of a resume summary and objective"],
  16: ["employment-gap-return-editorial.webp", "Person documenting training during an employment gap"],
  17: ["cover-letter-writing-editorial.webp", "Writer drafting a cover letter beside a job posting"],
  18: ["resume-formats-editorial.webp", "Illustrated chronological, functional, and hybrid resume layouts"],
  19: ["product-manager-editorial.webp", "Product manager reviewing a roadmap and resume"],
  20: ["prompt-engineer-editorial.webp", "Prompt engineer testing AI workflows beside a resume"],
  21: ["remote-work-editorial.webp", "Remote professional on a team call with global project notes"],
  22: ["cybersecurity-editorial.webp", "Cybersecurity analyst reviewing security work and resume"],
  23: ["career-change-editorial.webp", "Illustration of a career changer crossing into a new role"],
  24: ["tailor-resume-gouache.webp", "Illustration of a resume tailored to a job posting like a garment"],
  25: ["executive-resume-editorial.webp", "Executive reviewing leadership experience in a boardroom"],
  26: ["workday-application-editorial.webp", "Generic online application fields aligned with a resume"],
  27: ["ai-resume-screening-editorial.webp", "Recruiter reviewing a resume and project portfolio"],
  28: ["resume-length-editorial.webp", "Career adviser trimming an overly long resume draft"],
  29: ["ai-skills-examples-editorial.webp", "Professional using an AI assistant in everyday work"],
  30: ["ats-score-checklist-editorial.webp", "Illustrated resume evaluation checklist without a score"],
  32: ["greenhouse-application-editorial.webp", "Applicant reviewing autofilled fields after a resume upload"],
  34: ["recruiter-resume-length-editorial.webp", "Recruiter comparing one-page and two-page resumes"],
  36: ["pages-needed-editorial.webp", "Illustration of a candidate editing a stack of resume pages"],
  37: ["data-science-portfolio-editorial.webp", "Data scientist assembling a project portfolio and resume"],
  39: ["two-column-reading-order-editorial.webp", "Illustration of two-column resume reading order"],
  40: ["data-science-projects-editorial.webp", "Data science team planning a project for a resume"],
  41: ["ai-skills-any-job-editorial.webp", "Customer support professional applying AI skills at work"],
  43: ["freelance-contract-editorial.webp", "Freelancer organizing client projects for a resume"],
  44: ["data-analyst-editorial.webp", "Data analyst comparing project charts with resume notes"],
  45: ["ai-screening-evidence-editorial.webp", "Illustration of a recruiter valuing project evidence over buzzwords"],
};

const root = process.cwd();
const registry = await fs.readFile(path.join(root, "src/lib/blog-data.tsx"), "utf8");
const ids = [...registry.matchAll(/^\s+post(\d+),\s*$/gm)].map(match => Number(match[1]));
if (ids.length !== 42 || Object.keys(covers).length !== 40) throw new Error("Published posts changed; review cover mapping before running.");
for (const id of ids) {
  if (id === 42 || id === 46) continue;
  const [filename, alt] = covers[id] ?? [];
  if (!filename || !alt) throw new Error(`Missing artwork for post-${id}`);
  const imagePath = path.join(root, "public/images/blog", filename);
  const metadata = await sharp(imagePath).metadata();
  if (metadata.width !== 1200 || metadata.height !== 630) throw new Error(`Unexpected image size: ${filename}`);
  const file = path.join(root, `src/lib/posts/post-${id}.tsx`);
  let source = await fs.readFile(file, "utf8");
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const fields = new Map();
  function visit(node) {
    if (ts.isPropertyAssignment(node) && ts.isIdentifier(node.name)) fields.set(node.name.text, node.initializer);
    ts.forEachChild(node, visit);
  }
  visit(ast);
  const changes = [["bannerImage", `/images/blog/${filename}`], ["bannerAlt", alt]].map(([key, value]) => {
    const node = fields.get(key);
    if (!node) throw new Error(`Missing ${key} in post-${id}`);
    return { start: node.getStart(ast), end: node.getEnd(), text: JSON.stringify(value) };
  }).sort((a, b) => b.start - a.start);
  for (const change of changes) source = source.slice(0, change.start) + change.text + source.slice(change.end);
  await fs.writeFile(file, source);
  console.log(`post-${id}: ${filename}`);
}
