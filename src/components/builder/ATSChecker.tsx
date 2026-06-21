import { useState, useEffect } from "react";
import { CheckCircle2, AlertTriangle, XCircle, Search } from "lucide-react";
import { useResumeStore } from "@/store/useResumeStore";
import { calculateATSScore, calculateJobMatch } from "@/lib/atsScoring";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ATSChecker() {
  const { resumeData } = useResumeStore();
  const [atsResult, setAtsResult] = useState({ score: 0, suggestions: [] as string[] });
  
  const [jobDesc, setJobDesc] = useState("");
  const [matchResult, setMatchResult] = useState<{score: number, missingKeywords: string[]} | null>(null);

  useEffect(() => {
    const result = calculateATSScore(resumeData);
    setAtsResult(result);
  }, [resumeData]);

  const handleMatchJob = () => {
    const expText = resumeData.experience.map(e => e.description).join(" ");
    const result = calculateJobMatch(resumeData.summary, expText, jobDesc);
    setMatchResult(result);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center justify-between">
            ATS Score 
            <span className={`px-4 py-1 rounded-full text-lg font-bold ${getScoreColor(atsResult.score)}`}>
              {atsResult.score}%
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {atsResult.score >= 90 && (
              <li className="flex items-start gap-2 text-green-700">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Your resume is highly optimized for Applicant Tracking Systems!</span>
              </li>
            )}
            {atsResult.suggestions.map((suggestion, idx) => (
              <li key={idx} className="flex items-start gap-2 text-yellow-700">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Job Description Matcher</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-600">
            Paste a job description below to see how well your resume matches the required keywords.
          </p>
          <Textarea 
            placeholder="Paste job description here..." 
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            className="min-h-[150px]"
          />
          <Button onClick={handleMatchJob} className="w-full bg-indigo-600 hover:bg-indigo-700">
            <Search className="w-4 h-4 mr-2" /> Analyze Match
          </Button>

          {matchResult && (
            <div className="pt-4 border-t mt-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-slate-900">Match Score</h4>
                <span className={`px-3 py-1 rounded-full font-bold ${getScoreColor(matchResult.score)}`}>
                  {matchResult.score}%
                </span>
              </div>
              
              {matchResult.missingKeywords.length > 0 ? (
                <div>
                  <h4 className="font-bold text-sm text-slate-700 mb-2">Missing Keywords to Consider Adding:</h4>
                  <div className="flex flex-wrap gap-2">
                    {matchResult.missingKeywords.map(kw => (
                      <span key={kw} className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs border border-red-100">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-green-600 text-sm font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Great job! You hit most of the key terms.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
