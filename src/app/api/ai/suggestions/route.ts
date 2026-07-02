import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { title, type } = await req.json();

    if (!title) {
      return NextResponse.json(
        { error: "Job title is required." },
        { status: 400 }
      );
    }

    const systemPrompt = type === "summary"
      ? `You are an expert resume writer. The user provided their job title (which may contain typos, like "devek" instead of "developer"). 
         Your task is to generate exactly 3 professional resume summary templates for this profession. 
         Return ONLY a valid JSON array of 3 strings. Do not include markdown code blocks, backticks, or any other text.`
      : `You are an expert resume writer. The user provided their job title (which may contain typos). 
         Your task is to generate exactly 4 professional resume experience bullet points for this profession.
         Start each bullet point with a bullet symbol "• ".
         Return ONLY a valid JSON array of 4 strings. Do not include markdown code blocks, backticks, or any other text.`;

    const prompt = `Job Title provided by user: "${title}". Generate the ${type === "summary" ? "summaries" : "bullet points"}.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: systemPrompt + "\n\n" + prompt }] }
      ],
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "[]";
    let suggestions = [];
    try {
      suggestions = JSON.parse(text);
    } catch (e) {
      // fallback parsing if the model wrapped it in markdown
      const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
      suggestions = JSON.parse(cleaned);
    }

    return NextResponse.json({ suggestions });
  } catch (error: any) {
    console.error("AI API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate suggestions." },
      { status: 500 }
    );
  }
}
