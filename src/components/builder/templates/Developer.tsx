import { ResumeData } from "@/store/useResumeStore";
import { Terminal } from "lucide-react";

interface Props {
  resumeData: ResumeData;
}

export default function Developer({ resumeData }: Props) {
  const { personalInfo, experience, summary } = resumeData;

  return (
    <div className="w-full h-full font-mono text-slate-900 bg-white p-2">
      <div className="border-4 border-slate-900 h-full p-6">
        
        {/* Header */}
        <div className="border-b-4 border-slate-900 pb-6 mb-6 flex justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Terminal className="w-8 h-8" />
              <h1 className="text-4xl font-black uppercase tracking-tight">
                {personalInfo.fullName || "YOUR_NAME"}
              </h1>
            </div>
            {personalInfo.jobTitle && (
              <p className="text-xl font-bold text-blue-700 mb-4">
                &gt; {personalInfo.jobTitle}
              </p>
            )}
            
            <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
              {personalInfo.email && <div>Email: {personalInfo.email}</div>}
              {personalInfo.phone && <div>Phone: {personalInfo.phone}</div>}
              {personalInfo.github && <div>GitHub: <a href={personalInfo.github} className="text-blue-700 underline">Link</a></div>}
              {personalInfo.portfolio && <div>Portfolio: <a href={personalInfo.portfolio} className="text-blue-700 underline">Link</a></div>}
            </div>
          </div>
          
          {personalInfo.photo && (
            <div className="w-28 h-28 border-4 border-slate-900 flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover filter grayscale" />
            </div>
          )}
        </div>

        {/* Summary */}
        {(summary || personalInfo.fullName) && (
          <div className="mb-8">
            <h2 className="text-xl font-black uppercase mb-2 bg-slate-900 text-white inline-block px-2 py-1">
              # SUMMARY
            </h2>
            <p className="text-sm leading-relaxed border-l-2 border-slate-900 pl-4 py-1">
              {summary || "Software engineer with a passion for building scalable and maintainable applications."}
            </p>
          </div>
        )}

        {/* Experience */}
        <div className="mb-8">
          <h2 className="text-xl font-black uppercase mb-4 bg-slate-900 text-white inline-block px-2 py-1">
            # EXPERIENCE
          </h2>
          {experience.length === 0 ? (
            <div className="text-sm italic pl-4 border-l-2 border-slate-900">No experience blocks added yet...</div>
          ) : (
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="pl-4 border-l-2 border-slate-900">
                  <div className="flex flex-wrap items-center justify-between mb-1">
                    <h3 className="font-bold text-lg text-blue-800">
                      &lt;{exp.jobTitle} /&gt;
                    </h3>
                    <span className="text-xs font-bold bg-slate-200 px-2 py-1 rounded">
                      {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="font-semibold text-sm mb-2">
                    @ {exp.company} <span className="font-normal text-slate-500">({exp.location})</span>
                  </div>
                  <div className="text-sm whitespace-pre-wrap">
                    {exp.description || "/* Add your responsibilities here */"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
