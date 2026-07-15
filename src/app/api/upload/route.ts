import { NextRequest, NextResponse } from "next/server";
import PDFParser from "pdf2json";
import { GoogleGenAI } from "@google/genai";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// In-memory rate limiting — 5 requests per minute per user/IP
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 5;

// File constraints
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_MIME_TYPES = ["application/pdf"];
const ALLOWED_EXTENSIONS = [".pdf"];

export async function POST(req: NextRequest) {
  try {
    // Identify caller (guests allowed — upload page is public)
    const session = await getServerSession(authOptions);
    const identifier =
      session?.user?.email ||
      req.headers.get("x-forwarded-for") ||
      "anonymous";

    // Rate limit check
    const now = Date.now();
    const rateData = rateLimitMap.get(identifier);
    if (rateData) {
      if (now - rateData.timestamp < RATE_LIMIT_WINDOW) {
        if (rateData.count >= MAX_REQUESTS) {
          return NextResponse.json(
            { error: "Too many uploads. Please try again in a minute." },
            { status: 429 }
          );
        }
        rateLimitMap.set(identifier, {
          count: rateData.count + 1,
          timestamp: rateData.timestamp,
        });
      } else {
        rateLimitMap.set(identifier, { count: 1, timestamp: now });
      }
    } else {
      rateLimitMap.set(identifier, { count: 1, timestamp: now });
    }

    const formData = await req.formData();
    const file = formData.get("resume") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // File size check — reject before reading buffer
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "File too large. Maximum allowed size is 10 MB." },
        { status: 400 }
      );
    }

    // File type check — MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Only PDF files are accepted." },
        { status: 400 }
      );
    }

    // File extension check — second layer of defence
    const fileName = file.name.toLowerCase();
    const hasValidExtension = ALLOWED_EXTENSIONS.some((ext) =>
      fileName.endsWith(ext)
    );
    if (!hasValidExtension) {
      return NextResponse.json(
        { error: "Only PDF files are accepted." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Parse PDF text using pdf2json
    const text = await new Promise<string>((resolve, reject) => {
      const pdfParser = new PDFParser(null, true);

      pdfParser.on("pdfParser_dataError", (errData: any) =>
        reject(errData.parserError)
      );
      pdfParser.on("pdfParser_dataReady", () => {
        resolve(pdfParser.getRawTextContent());
      });

      pdfParser.parseBuffer(buffer);
    });

    if (!process.env.GEMINI_API_KEY) {
      console.error("Missing GEMINI_API_KEY");
      return NextResponse.json(
        { error: "Server configuration error: Missing AI Key" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `
      You are an expert resume parser. Extract the information from the following resume text and format it EXACTLY as a JSON object matching this structure. Do not return markdown, only the raw JSON.
      Generate random string IDs (like "exp-1", "edu-1", "skill-1", etc.) for arrays.

      Structure:
      {
        "personalInfo": {
          "fullName": "",
          "jobTitle": "",
          "email": "",
          "phone": "",
          "location": "",
          "github": "",
          "portfolio": ""
        },
        "summary": "Professional summary paragraph here",
        "experience": [
          {
            "id": "exp-1",
            "jobTitle": "",
            "company": "",
            "startDate": "",
            "endDate": "",
            "description": "Write a cohesive paragraph or bullet points"
          }
        ],
        "education": [
          {
            "id": "edu-1",
            "school": "",
            "degree": "",
            "startDate": "",
            "endDate": "",
            "grade": ""
          }
        ],
        "skills": [
          {
            "id": "skill-1",
            "name": ""
          }
        ],
        "projects": [
          {
            "id": "proj-1",
            "name": "",
            "description": "",
            "link": ""
          }
        ],
        "certifications": [
          {
            "id": "cert-1",
            "name": "",
            "issuer": "",
            "date": "",
            "link": ""
          }
        ]
      }

      Resume Text:
      ${text}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let jsonString = response.text || "{}";

    // Clean up potential markdown code block formatting
    jsonString = jsonString
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsedData = JSON.parse(jsonString);

    return NextResponse.json({
      success: true,
      message: "Resume parsed successfully by AI",
      data: parsedData,
    });
  } catch (error) {
    console.error("Error parsing resume:", error);
    return NextResponse.json(
      { error: "Failed to parse resume" },
      { status: 500 }
    );
  }
}
