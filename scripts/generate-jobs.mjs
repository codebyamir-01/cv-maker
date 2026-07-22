import fs from "fs/promises";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const jobsToGenerate = [
  "Data Scientist", "Product Manager", "UX Designer", "Financial Analyst",
  "Operations Manager", "Business Analyst", "Social Media Manager",
  "Web Developer", "Civil Engineer", "Mechanical Engineer",
  "Executive Assistant", "Pharmacist", "Medical Assistant",
  "Physical Therapist", "Occupational Therapist", "Dentist",
  "Dental Hygienist", "Veterinarian", "Real Estate Agent",
  "Construction Manager", "Architect", "Interior Designer",
  "Chef", "Event Planner", "Public Relations Specialist",
  "Copywriter", "Technical Writer", "Journalist", "Editor",
  "Photographer", "Videographer", "Police Officer", "Firefighter",
  "Paramedic", "Electrician", "Plumber", "Carpenter",
  "Welder", "Mechanic", "Truck Driver", "Logistics Coordinator",
  "Supply Chain Manager", "Retail Manager", "Store Manager",
  "Barista", "Bartender", "Waiter", "Cashier", "Customer Success Manager",
  "Account Executive"
];

const outputFile = path.join(process.cwd(), "src", "lib", "generated-seo-jobs.json");

async function generateJobData(jobTitle) {
  const prompt = `You are an expert career counselor and resume writer. 
Generate a comprehensive, ATS-optimized resume guide for a "${jobTitle}".
Return ONLY a valid JSON object matching this exact interface:

{
  "slug": "kebab-case-job-title",
  "role": "The Job Title",
  "title": "${jobTitle} Resume Example & Writing Guide",
  "description": "A 2-sentence meta description about learning how to write a ${jobTitle} resume.",
  "recommendedTemplate": "choose one: developer, graduate, ats-minimal, academic, corporate, marketing, executive, ats-classic, two-column, creative-clean, simple-bw, modern",
  "recommendedTemplateName": "A nice display name for the template",
  "skills": ["Array", "of", "8", "hard", "skills"],
  "actionVerbs": ["Array", "of", "8", "strong", "action", "verbs"],
  "sampleStructure": {
    "summary": "A 3-sentence professional summary for this role.",
    "experience": ["Bullet 1 with metrics", "Bullet 2 with metrics", "Bullet 3 with metrics"]
  },
  "formattingTips": ["Tip 1", "Tip 2", "Tip 3"],
  "commonMistakes": ["Mistake 1", "Mistake 2", "Mistake 3"],
  "faqs": [
    { "question": "Relevant FAQ 1?", "answer": "Answer 1" },
    { "question": "Relevant FAQ 2?", "answer": "Answer 2" }
  ]
}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: { responseMimeType: "application/json" }
  });

  const text = response.text || "{}";
  const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
  return JSON.parse(cleaned);
}

async function main() {
  console.log(`Starting generation for ${jobsToGenerate.length} jobs...`);
  const results = [];

  for (let i = 0; i < jobsToGenerate.length; i++) {
    const job = jobsToGenerate[i];
    console.log(`[${i + 1}/${jobsToGenerate.length}] Generating ${job}...`);
    try {
      const data = await generateJobData(job);
      results.push(data);
      // Wait 3 seconds to avoid rate limits
      await new Promise(r => setTimeout(r, 3000));
    } catch (e) {
      console.error(`Failed to generate ${job}:`, e.message);
    }
  }

  await fs.writeFile(outputFile, JSON.stringify(results, null, 2));
  console.log(`Successfully generated ${results.length} jobs. Saved to ${outputFile}`);
}

main().catch(console.error);
