import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 per minute

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

    const { jobTitle, experience } = await req.json();

    if (!jobTitle || jobTitle.trim() === "") {
      return NextResponse.json(
        { error: "Job title is required." },
        { status: 400 }
      );
    }

    if (jobTitle.length > 100 || (experience && experience.length > 1000)) {
      return NextResponse.json(
        { error: "Input too long." },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an expert resume writer. Generate exactly 3 distinct, professional resume summaries for a candidate. 
The summaries should be optimized for ATS systems and highlight impact.
Return ONLY a valid JSON array of strings, like this: ["Summary 1", "Summary 2", "Summary 3"]. Do not use markdown blocks.`;

    const userPrompt = `
Job Title: ${jobTitle}
Experience/Skills/Keywords to include: ${experience || "Not provided, please generate industry-standard general summaries for this role."}
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

    const text = response.text || "[]";
    let summaries = [];
    try {
      summaries = JSON.parse(text);
    } catch (e) {
      const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
      summaries = JSON.parse(cleaned);
    }

    return NextResponse.json({ summaries });
  } catch (error: any) {
    console.error("AI Summary Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate summaries." },
      { status: 500 }
    );
  }
}
