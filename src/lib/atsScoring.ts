import { ResumeData } from "@/store/useResumeStore";

export interface ATSFeedback {
  score: number;
  suggestions: string[];
}

export function calculateATSScore(data: ResumeData): ATSFeedback {
  let score = 100;
  const suggestions: string[] = [];

  // 1. Check Contact Info
  if (!data.personalInfo.email || !data.personalInfo.phone) {
    score -= 10;
    suggestions.push("Add a professional email and phone number.");
  }
  
  if (!data.personalInfo.linkedIn) {
    score -= 5;
    suggestions.push("Including a LinkedIn profile increases your chances of being noticed by recruiters.");
  }

  // 2. Check Summary
  if (!data.summary || data.summary.length < 50) {
    score -= 15;
    suggestions.push("Your professional summary is missing or too short. Aim for 3-4 impactful sentences.");
  }

  // 3. Check Experience
  if (data.experience.length === 0) {
    score -= 30;
    suggestions.push("You must include at least one work experience or internship.");
  } else {
    data.experience.forEach((exp) => {
      if (!exp.description || exp.description.length < 50) {
        score -= 5;
        if (!suggestions.includes("Add more detailed bullet points to your work experience.")) {
          suggestions.push("Add more detailed bullet points to your work experience.");
        }
      }
      
      // Check for quantifiable metrics (numbers, %, $)
      if (exp.description && !/\d/.test(exp.description)) {
        score -= 5;
        if (!suggestions.includes("Add quantifiable metrics (numbers, percentages, dollars) to your experience bullets.")) {
          suggestions.push("Add quantifiable metrics (numbers, percentages, dollars) to your experience bullets.");
        }
      }
    });
  }

  // 4. Check Education
  // In our simplified version, education array might not be implemented fully yet, but we check if it exists
  if (!data.education || data.education.length === 0) {
    score -= 10;
    suggestions.push("Include your educational background.");
  }

  // 5. Check Skills
  if (!data.skills || data.skills.length < 5) {
    score -= 10;
    suggestions.push("List at least 5 key skills relevant to your target role.");
  }

  // Clamp score
  score = Math.max(0, Math.min(100, score));

  return { score, suggestions };
}

// @ts-ignore
import keywordExtractor from "keyword-extractor";

// Advanced Job Matcher algorithm using NLP keyword extraction
export function calculateJobMatch(resumeSummary: string, resumeExperience: string, jobDescription: string) {
  if (!jobDescription) return { score: 0, missingKeywords: [] };

  // Extract important keywords from Job Description (ignoring stop words)
  const extractedKeywords = keywordExtractor.extract(jobDescription, {
    language: "english",
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: true
  });
  
  const jdWords = new Set(extractedKeywords);
  const resumeText = (resumeSummary + " " + resumeExperience).toLowerCase();
  
  let matched = 0;
  const missingKeywords: string[] = [];

  jdWords.forEach(word => {
    // Only count if it's a standalone word (boundary match)
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    if (regex.test(resumeText)) {
      matched++;
    } else {
      missingKeywords.push(word as string);
    }
  });

  const score = jdWords.size > 0 ? Math.round((matched / jdWords.size) * 100) : 0;
  
  // Sort missing keywords by length (longer words are usually more specific skills/tech)
  const topMissing = missingKeywords.sort((a, b) => b.length - a.length).slice(0, 10);

  return { score: Math.min(100, score), missingKeywords: topMissing };
}
