import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3; // 3 per minute for heavy AI generation

export async function POST(req: Request) {
  try {
    const identifier = req.headers.get("x-forwarded-for") || "anonymous";

    // Rate Limiting Logic
    const now = Date.now();
    const rateData = rateLimitMap.get(identifier);

    if (rateData) {
      if (now - rateData.timestamp < RATE_LIMIT_WINDOW) {
        if (rateData.count >= MAX_REQUESTS) {
          return NextResponse.json(
            { error: "Too many requests. Please try again in a minute." },
            { status: 429 }
          );
        }
        rateLimitMap.set(identifier, { count: rateData.count + 1, timestamp: rateData.timestamp });
      } else {
        rateLimitMap.set(identifier, { count: 1, timestamp: now });
      }
    } else {
      rateLimitMap.set(identifier, { count: 1, timestamp: now });
    }

    const { resumeData, jobDescription, tone = "Professional" } = await req.json();

    if (!jobDescription || jobDescription.trim() === "") {
      return NextResponse.json(
        { error: "Job description is required." },
        { status: 400 }
      );
    }

    if (!resumeData) {
      return NextResponse.json(
        { error: "Resume data is required." },
        { status: 400 }
      );
    }

    // Limit input length
    const jdString = jobDescription.substring(0, 5000);
    // Convert resume to a condensed string to save tokens
    const condensedResume = {
      basics: resumeData.basics,
      experience: resumeData.experience?.map((e: any) => ({
        company: e.company,
        position: e.position,
        highlights: e.highlights
      })),
      education: resumeData.education,
      skills: resumeData.skills?.map((s: any) => s.name).join(", ")
    };
    const resumeString = JSON.stringify(condensedResume).substring(0, 8000);

    const systemPrompt = `You are an expert executive resume writer and career coach.
Your task is to write a highly compelling, custom Cover Letter for the user.
You will be provided with their Resume Data (JSON) and the Target Job Description.

Guidelines:
1. Tone: ${tone}.
2. Structure: 
   - A strong opening hook.
   - 1-2 body paragraphs connecting their specific resume achievements to the job requirements.
   - A confident closing call to action.
3. DO NOT include placeholder addresses like "[Company Address]". Just start with "Dear Hiring Manager," or similar.
4. Keep it concise (under 350 words). Recruiters skim.
5. Emphasize metrics and hard skills from the resume that match the job description.
6. Return the cover letter as formatted Markdown (using paragraphs). Do NOT return a JSON object. Return purely the markdown text of the letter.`;

    const userPrompt = `
Target Job Description:
${jdString}

User's Resume Data:
${resumeString}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: systemPrompt + "\n\n" + userPrompt }] }
      ],
      config: {
        responseMimeType: "text/plain" // We want markdown text
      }
    });

    const text = response.text || "";

    if (!text.trim()) {
      throw new Error("AI returned empty response");
    }

    return NextResponse.json({ coverLetter: text });
  } catch (error: any) {
    console.error("Cover Letter Generation Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate cover letter." },
      { status: 500 }
    );
  }
}
