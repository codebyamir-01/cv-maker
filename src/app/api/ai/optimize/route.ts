import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Simple in-memory rate limiting (Note: In a serverless environment like Vercel, this resets per cold start and per lambda instance, but it's a basic safeguard)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3; // 3 optimizations per minute

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const identifier = session?.user?.email || req.headers.get("x-forwarded-for") || "anonymous";

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

    const { summary, experience, missingKeywords, jobDescription } = await req.json();

    if (!summary && (!experience || experience.length === 0)) {
      return NextResponse.json(
        { error: "Summary or experience required to optimize." },
        { status: 400 }
      );
    }

    // Input length guards — prevent oversized Gemini prompts
    if (summary && summary.length > 5000) {
      return NextResponse.json(
        { error: "Summary is too long. Please shorten it before optimizing." },
        { status: 400 }
      );
    }
    if (jobDescription && jobDescription.length > 10000) {
      return NextResponse.json(
        { error: "Job description is too long. Please trim it to 10,000 characters or fewer." },
        { status: 400 }
      );
    }
    if (Array.isArray(experience)) {
      for (const exp of experience) {
        if (exp.description && exp.description.length > 2000) {
          return NextResponse.json(
            { error: "One or more experience descriptions are too long. Please shorten them before optimizing." },
            { status: 400 }
          );
        }
      }
    }

    const systemPrompt = `You are an expert resume writer and ATS optimization assistant.
Your task is to rewrite the provided resume summary and experience descriptions to naturally incorporate the missing keywords from the job description.
CRITICAL RULES:
1. DO NOT invent new experiences, jobs, or skills that the user did not have. Only weave the missing keywords into existing contexts if they make sense.
2. Keep the professional tone intact.
3. Return ONLY a valid JSON object matching this TypeScript interface exactly:
{
  "summary": string, // optimized summary
  "experience": [ // optimized experiences array
    { "id": string, "description": string }
  ]
}
Do not wrap the JSON in markdown blocks or add any conversational text.`;

    const userPrompt = `
Missing Keywords to Incorporate: ${missingKeywords.join(", ")}
Job Description Context: ${jobDescription}

Current Resume Summary:
${summary || "N/A"}

Current Resume Experience:
${JSON.stringify(experience, null, 2) || "N/A"}
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
    let optimized = {};
    try {
      optimized = JSON.parse(text);
    } catch (e) {
      const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
      optimized = JSON.parse(cleaned);
    }

    return NextResponse.json({ optimized });
  } catch (error: any) {
    console.error("AI Optimize Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate optimized content." },
      { status: 500 }
    );
  }
}
