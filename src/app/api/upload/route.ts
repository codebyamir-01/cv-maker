import { NextRequest, NextResponse } from "next/server";
import PDFParser from "pdf2json";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Parse PDF text using pdf2json
    const text = await new Promise<string>((resolve, reject) => {
      const pdfParser = new PDFParser(null, true);
      
      pdfParser.on("pdfParser_dataError", (errData: any) => reject(errData.parserError));
      pdfParser.on("pdfParser_dataReady", () => {
        resolve(pdfParser.getRawTextContent());
      });
      
      pdfParser.parseBuffer(buffer);
    });

    // Regex extraction
    const emailMatch = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
    const phoneMatch = text.match(/(\+?\d{1,2}[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/);
    
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 2);
    const nameMatch = lines.length > 0 ? lines[0].replace(/[^a-zA-Z\s]/g, '') : "Unknown";

    return NextResponse.json({
      success: true,
      message: "Resume parsed successfully",
      data: {
        personalInfo: {
          fullName: nameMatch,
          jobTitle: "",
          email: emailMatch ? emailMatch[0] : "",
          phone: phoneMatch ? phoneMatch[0] : "",
        },
        summary: "We extracted your contact details from the PDF. Our AI parsing for full structure is coming soon in the next update!",
        experience: [],
        education: [],
        skills: [],
      }
    });

  } catch (error) {
    console.error("Error parsing resume:", error);
    return NextResponse.json({ error: "Failed to parse resume" }, { status: 500 });
  }
}
