import { ResumeData } from "@/store/useResumeStore";

interface Props {
  resumeData: ResumeData;
  accentColor?: string;
}

export default function Aether({ resumeData, accentColor = "#0f172a" }: Props) {
  const { personalInfo, experience, education, skills, summary } = resumeData;

  return (
    <div className="bg-white font-sans text-slate-800 flex overflow-hidden" style={{ width: "816px", minHeight: "1056px", boxSizing: "border-box" }}>
      {/* Left Sidebar */}
      <div className="w-[35%] p-8 flex flex-col gap-8" style={{ backgroundColor: accentColor, color: "white" }}>
        <div className="text-center mt-4">
          {personalInfo.photo && personalInfo.showPhoto !== false && (
            <img src={personalInfo.photo} className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white/20 mb-4" alt="Profile" />
          )}
          <h1 className="text-2xl font-bold tracking-tight leading-tight">{personalInfo.fullName || "YOUR NAME"}</h1>
          <p className="text-sm font-medium mt-2 opacity-80">{personalInfo.jobTitle}</p>
        </div>
        
        <div className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-3 border-b border-white/20 pb-2">Contact</h2>
          <div className="text-xs space-y-3 opacity-90">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-3 border-b border-white/20 pb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map(s => (
              <span key={s.id} className="text-xs bg-white/10 px-2.5 py-1.5 rounded">{s.name}</span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Right Content */}
      <div className="w-[65%] p-10 bg-[#fdfdfd]">
        <div className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: accentColor }}>Profile</h2>
          <p className="text-xs leading-relaxed text-slate-600">{summary}</p>
        </div>

        <div className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: accentColor }}>Experience</h2>
          <div className="space-y-6">
            {experience.map(exp => (
              <div key={exp.id} className="relative pl-5 border-l-2" style={{ borderColor: accentColor + '40' }}>
                <div className="absolute w-2.5 h-2.5 rounded-full -left-[6px] top-1" style={{ backgroundColor: accentColor }} />
                <h3 className="font-bold text-sm text-slate-900">{exp.jobTitle}</h3>
                <div className="text-xs font-semibold text-slate-500 mb-2">{exp.company} | {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</div>
                <p className="text-xs leading-relaxed text-slate-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: accentColor }}>Education</h2>
          <div className="space-y-5">
            {education.map(ed => (
              <div key={ed.id}>
                <h3 className="font-bold text-sm text-slate-900">{ed.degree}</h3>
                <div className="text-xs font-medium text-slate-500">{ed.institution} | {ed.startYear} - {ed.endYear}</div>
              </div>
            ))}
          </div>
        </div>

        {resumeData.projects && resumeData.projects.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: accentColor }}>Projects</h2>
            <div className="space-y-6">
              {resumeData.projects.map(proj => (
                <div key={proj.id} className="relative pl-5 border-l-2" style={{ borderColor: accentColor + '40' }}>
                  <div className="absolute w-2.5 h-2.5 rounded-full -left-[6px] top-1" style={{ backgroundColor: accentColor }} />
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-sm text-slate-900">{proj.name}</h3>
                    {proj.link && <span className="text-xs text-blue-600 underline">{proj.link.replace(/^https?:\/\//, '')}</span>}
                  </div>
                  {proj.techStack && <div className="text-[11px] font-semibold text-slate-500 mb-2">{proj.techStack}</div>}
                  <p className="text-xs leading-relaxed text-slate-600 whitespace-pre-wrap">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
