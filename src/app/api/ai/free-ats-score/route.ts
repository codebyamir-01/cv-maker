import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3; // 3 per minute

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

    const { resumeText, jobDescription } = await req.json();

    if (!jobDescription || jobDescription.trim() === "") {
      return NextResponse.json(
        { error: "Job description is required." },
        { status: 400 }
      );
    }

    if (!resumeText || resumeText.trim() === "") {
      return NextResponse.json(
        { error: "Resume text is required." },
        { status: 400 }
      );
    }

    // Limit input length to prevent token abuse
    const jdString = jobDescription.substring(0, 5000); 
    const resumeString = resumeText.substring(0, 8000);

    const systemPrompt = `You are an expert ATS (Applicant Tracking System) algorithm and senior technical recruiter. 
Your task is to analyze the provided candidate resume text against the provided Job Description.
Evaluate how well the resume matches the job requirements.

You MUST return ONLY a valid JSON object with the following exact structure:
{
  "score": number, // An integer from 0 to 100 representing the match percentage
  "missingKeywords": string[], // An array of 3 to 7 critical keywords or hard skills found in the Job Description but completely missing from the resume
  "suggestions": string[] // An array of 3 actionable, specific sentences on how the user can improve their resume for this specific job
}

Do not include markdown formatting like \`\`\`json. Return pure JSON.`;

    const userPrompt = `
Job Description:
${jdString}

Candidate Resume Text:
${resumeString}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: systemPrompt + "\n\n" + userPrompt }] }
      ],
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "{}";
    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
      result = JSON.parse(cleaned);
    }

    // Validate structure
    if (typeof result.score !== 'number' || !Array.isArray(result.missingKeywords) || !Array.isArray(result.suggestions)) {
        throw new Error("Invalid response structure from AI");
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Free ATS Score API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze resume against job description." },
      { status: 500 }
    );
  }
}
