import { useState, useEffect } from "react";
import { CheckCircle2, AlertTriangle, Search, FileX, Info, Sparkles, Copy, ChevronDown, ChevronUp } from "lucide-react";
import { useResumeStore } from "@/store/useResumeStore";
import { calculateATSScore, calculateJobMatch, ATSFeedback } from "@/lib/atsScoring";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import AiOptimizeModal from "@/components/builder/AiOptimizeModal";

export default function ATSChecker() {
  const { resumeData } = useResumeStore();
  
  const [atsResult, setAtsResult] = useState<ATSFeedback>({ 
    score: 0, 
    missingFields: [], 
    completionIssues: [], 
    formattingTips: [], 
    sectionQuality: [] 
  });
  
  const [jobDesc, setJobDesc] = useState("");
  const [matchResult, setMatchResult] = useState<{score: number, missingKeywords: string[], matchedKeywords: string[]} | null>(null);
  
  const [showDetails, setShowDetails] = useState(false);
  const [isOptimizeModalOpen, setIsOptimizeModalOpen] = useState(false);

  useEffect(() => {
    const result = calculateATSScore(resumeData);
    setAtsResult(result);
  }, [resumeData]);

  const handleMatchJob = () => {
    if (!jobDesc.trim()) return;
    const expText = resumeData.experience.map(e => e.description).join(" ");
    const result = calculateJobMatch(resumeData.summary, expText, jobDesc);
    setMatchResult(result as any);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 bg-emerald-100";
    if (score >= 60) return "text-amber-600 bg-amber-100";
    return "text-rose-600 bg-rose-100";
  };

  return (
    <div className="space-y-6">
      {/* ATS Score Overview */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50 border-b border-slate-100 rounded-t-xl pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" /> ATS Compatibility Score
              </CardTitle>
              <CardDescription className="mt-1">Real-time analysis of your resume</CardDescription>
            </div>
            <div className={`px-4 py-2 rounded-xl text-2xl font-black ${getScoreColor(atsResult.score)} shadow-sm`}>
              {atsResult.score}%
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="space-y-6">
            {atsResult.score >= 90 && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-emerald-800 text-sm font-medium">Excellent! Your resume is highly optimized for Applicant Tracking Systems.</p>
              </div>
            )}
            
            {atsResult.missingFields.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <FileX className="w-4 h-4 text-rose-500" /> Missing Critical Fields
                </h4>
                <ul className="space-y-2">
                  {atsResult.missingFields.map((field, idx) => (
                    <li key={idx} className="text-rose-700 text-sm flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                      Missing {field}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {atsResult.completionIssues.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> Needs Improvement
                </h4>
                <ul className="space-y-2">
                  {atsResult.completionIssues.map((issue, idx) => (
                    <li key={idx} className="text-amber-700 text-sm flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button 
              variant="ghost" 
              className="w-full text-slate-500 hover:text-slate-700"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? <ChevronUp className="w-4 h-4 mr-2" /> : <ChevronDown className="w-4 h-4 mr-2" />}
              {showDetails ? "Hide Details" : "View Formatting & Quality Tips"}
            </Button>

            {showDetails && (
              <div className="space-y-6 pt-4 border-t border-slate-100 animate-fade-in-up">
                {atsResult.sectionQuality.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> What You Did Well
                    </h4>
                    <ul className="space-y-2">
                      {atsResult.sectionQuality.map((tip, idx) => (
                        <li key={idx} className="text-emerald-700 text-sm flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {atsResult.formattingTips.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <Info className="w-4 h-4 text-blue-500" /> Formatting Tips
                    </h4>
                    <ul className="space-y-2">
                      {atsResult.formattingTips.map((tip, idx) => (
                        <li key={idx} className="text-blue-700 text-sm flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Job Description Matcher */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50 border-b border-slate-100 rounded-t-xl">
          <CardTitle className="text-lg">Job Description Matcher</CardTitle>
          <CardDescription>Paste a job posting to see how well you match its keywords.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <Textarea 
            placeholder="Paste the full job description here..." 
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            className="min-h-[160px] resize-y rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
          />
          <Button 
            onClick={handleMatchJob} 
            disabled={!jobDesc.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11"
          >
            <Search className="w-4 h-4 mr-2" /> Analyze Job Match
          </Button>

          {matchResult && (
            <div className="pt-6 mt-2 border-t border-slate-100 animate-fade-in-up">
              <div className="flex justify-between items-center mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <h4 className="font-bold text-slate-900">Keyword Match Score</h4>
                  <p className="text-xs text-slate-500 mt-1">Based on core skills & requirements</p>
                </div>
                <span className={`px-4 py-2 rounded-xl font-bold text-xl shadow-sm ${getScoreColor(matchResult.score)}`}>
                  {matchResult.score}%
                </span>
              </div>
              
              <div className="space-y-6">
                {matchResult.missingKeywords?.length > 0 ? (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-rose-500" /> Missing Keywords
                      </h4>
                      <Button variant="ghost" size="sm" className="h-8 text-xs text-slate-500" onClick={() => navigator.clipboard.writeText(matchResult.missingKeywords.join(", "))}>
                        <Copy className="w-3 h-3 mr-1.5" /> Copy All
                      </Button>
                    </div>
                    <p className="text-xs text-slate-500 mb-3">Consider naturally adding these to your experience or skills section.</p>
                    <div className="flex flex-wrap gap-2">
                      {matchResult.missingKeywords.map(kw => (
                        <span key={kw} className="px-2.5 py-1 bg-rose-50 text-rose-700 rounded-lg text-[13px] border border-rose-100/50 font-medium">
                          {kw}
                        </span>
                      ))}
                    </div>
                    
                    {/* Future placeholder for AI Optimization */}
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <Button 
                        onClick={() => setIsOptimizeModalOpen(true)}
                        className="w-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 h-11 rounded-xl shadow-sm"
                      >
                        <Sparkles className="w-4 h-4 mr-2" /> Auto-Optimize with AI
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                    <p className="text-emerald-800 font-medium text-sm">Great job! You've hit all the extracted key terms from this description.</p>
                  </div>
                )}

                {matchResult.matchedKeywords?.length > 0 && (
                  <div>
                    <h4 className="font-bold text-sm text-slate-800 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Matched Keywords
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {matchResult.matchedKeywords.map(kw => (
                        <span key={kw} className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[13px] border border-emerald-100/50 font-medium">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {matchResult && (
        <AiOptimizeModal 
          isOpen={isOptimizeModalOpen} 
          onClose={() => setIsOptimizeModalOpen(false)} 
          missingKeywords={matchResult.missingKeywords} 
          jobDescription={jobDesc} 
        />
      )}
    </div>
  );
}
