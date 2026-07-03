import { ResumeData } from "@/store/useResumeStore";

export interface ATSFeedback {
  score: number;
  missingFields: string[];
  completionIssues: string[];
  formattingTips: string[];
  sectionQuality: string[];
}

export function calculateATSScore(data: ResumeData): ATSFeedback {
  let score = 100;
  const missingFields: string[] = [];
  const completionIssues: string[] = [];
  const formattingTips: string[] = [];
  const sectionQuality: string[] = [];

  // 1. Check Contact Info
  if (!data.personalInfo.email) {
    score -= 5;
    missingFields.push("Email address");
  }
  if (!data.personalInfo.phone) {
    score -= 5;
    missingFields.push("Phone number");
  }
  if (!data.personalInfo.linkedIn) {
    score -= 5;
    missingFields.push("LinkedIn profile URL");
  }

  // 2. Check Summary
  if (!data.summary) {
    score -= 10;
    missingFields.push("Professional Summary");
  } else if (data.summary.length < 100) {
    score -= 5;
    completionIssues.push("Summary is too short. Aim for at least 2-3 sentences.");
  } else {
    sectionQuality.push("Summary is well-written and of good length.");
  }

  // 3. Check Experience
  if (!data.experience || data.experience.length === 0) {
    score -= 25;
    missingFields.push("Work Experience");
  } else {
    let hasMetrics = false;
    let allDescriptionsAdequate = true;
    
    data.experience.forEach((exp) => {
      if (!exp.description || exp.description.length < 50) {
        allDescriptionsAdequate = false;
      }
      if (exp.description && /\d/.test(exp.description)) {
        hasMetrics = true;
      }
    });

    if (!allDescriptionsAdequate) {
      score -= 10;
      completionIssues.push("Some experience descriptions are too brief. Add more bullet points.");
    }
    if (!hasMetrics) {
      score -= 5;
      sectionQuality.push("Include quantifiable metrics (numbers, %, $) in your experience to stand out.");
    } else {
      sectionQuality.push("Great use of quantifiable metrics in your work experience.");
    }
  }

  // 4. Check Education
  if (!data.education || data.education.length === 0) {
    score -= 10;
    missingFields.push("Education");
  }

  // 5. Check Skills
  if (!data.skills || data.skills.length === 0) {
    score -= 15;
    missingFields.push("Skills section");
  } else if (data.skills.length < 5) {
    score -= 5;
    completionIssues.push("List at least 5-10 key skills relevant to your target role.");
  } else {
    sectionQuality.push(`Listed ${data.skills.length} skills. Excellent for keyword matching.`);
  }

  // General formatting tips
  formattingTips.push("Ensure your resume uses standard section headings (e.g., 'Work Experience', 'Education').");
  formattingTips.push("Avoid complex tables, columns, or graphics if applying through standard ATS portals.");

  // Clamp score
  score = Math.max(0, Math.min(100, score));

  return { score, missingFields, completionIssues, formattingTips, sectionQuality };
}

// @ts-ignore
import keywordExtractor from "keyword-extractor";

// Advanced Job Matcher algorithm using NLP keyword extraction
export function calculateJobMatch(resumeSummary: string, resumeExperience: string, jobDescription: string) {
  if (!jobDescription) return { score: 0, missingKeywords: [], matchedKeywords: [] };

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
  const matchedKeywords: string[] = [];

  jdWords.forEach(word => {
    // Only count if it's a standalone word (boundary match)
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    if (regex.test(resumeText)) {
      matched++;
      matchedKeywords.push(word as string);
    } else {
      missingKeywords.push(word as string);
    }
  });

  const score = jdWords.size > 0 ? Math.round((matched / jdWords.size) * 100) : 0;
  
  // Sort missing keywords by length (longer words are usually more specific skills/tech)
  const topMissing = missingKeywords.sort((a, b) => b.length - a.length).slice(0, 10);
  const topMatched = matchedKeywords.sort((a, b) => b.length - a.length).slice(0, 10);

  return { score: Math.min(100, score), missingKeywords: topMissing, matchedKeywords: topMatched };
}
