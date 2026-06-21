import { ResumeData } from "@/store/useResumeStore";

interface Props {
  resumeData: ResumeData;
  accentColor?: string;
}

export default function AtsClassic({ resumeData, accentColor = "#0d9488" }: Props) {
  const { personalInfo, experience, summary } = resumeData;

  return (
    <div
      className="bg-white font-sans text-slate-900"
      style={{
        width: "816px",        // 8.5 inches at 96dpi
        minHeight: "1056px",   // 11 inches at 96dpi
        padding: "52px 52px",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div className="text-center mb-5 pb-4" style={{ borderBottom: `2px solid ${accentColor}` }}>
        <h1 className="font-bold uppercase tracking-[4px] mb-1" style={{ fontSize: "22px", color: accentColor }}>
          {personalInfo.fullName || "YOUR FULL NAME"}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-[12px] uppercase tracking-widest font-semibold text-slate-600 mb-2">
            {personalInfo.jobTitle}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-x-2 text-[11px] text-slate-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <><span className="text-slate-300">|</span><span>{personalInfo.phone}</span></>}
          {personalInfo.location && <><span className="text-slate-300">|</span><span>{personalInfo.location}</span></>}
        </div>
        {(personalInfo.linkedIn || personalInfo.github || personalInfo.portfolio) && (
          <div className="flex flex-wrap justify-center gap-x-2 mt-1 text-[11px]">
            {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="underline" style={{ color: accentColor }}>LinkedIn</a>}
            {personalInfo.github && <a href={personalInfo.github} className="underline" style={{ color: accentColor }}>GitHub</a>}
            {personalInfo.portfolio && <a href={personalInfo.portfolio} className="underline" style={{ color: accentColor }}>Portfolio</a>}
          </div>
        )}
      </div>

      {/* Professional Summary */}
      <div className="mb-5">
        <h2 className="font-bold uppercase tracking-[2px] mb-2 pb-[2px]" style={{ fontSize: "11px", color: accentColor, borderBottom: `1.5px solid ${accentColor}` }}>
          Professional Summary
        </h2>
        <p className="text-[11px] leading-relaxed text-slate-700">
          {summary || "add summary"}
        </p>
      </div>

      {/* Professional Experience */}
      <div className="mb-5">
        <h2 className="font-bold uppercase tracking-[2px] mb-3 pb-[2px]" style={{ fontSize: "11px", color: accentColor, borderBottom: `1.5px solid ${accentColor}` }}>
          Professional Experience
        </h2>
        {experience.length === 0 ? (
          <p className="text-[11px] text-slate-400 italic">Experience will appear here...</p>
        ) : (
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[12px] text-slate-900">{exp.jobTitle}</h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-1.5">
                  <p className="text-[11px] italic text-slate-600">{exp.company}</p>
                  <span className="text-[11px] text-slate-500">{exp.location}</span>
                </div>
                {exp.description && (
                  <p className="text-[11px] leading-relaxed text-slate-700 whitespace-pre-wrap">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Education */}
      <div className="mb-5">
        <h2 className="font-bold uppercase tracking-[2px] mb-3 pb-[2px]" style={{ fontSize: "11px", color: accentColor, borderBottom: `1.5px solid ${accentColor}` }}>
          Education
        </h2>
        <p className="text-[11px] text-slate-400 italic">Education section coming soon...</p>
      </div>

      {/* Skills */}
      <div className="mb-5">
        <h2 className="font-bold uppercase tracking-[2px] mb-3 pb-[2px]" style={{ fontSize: "11px", color: accentColor, borderBottom: `1.5px solid ${accentColor}` }}>
          Skills
        </h2>
        <p className="text-[11px] text-slate-400 italic">Skills will appear here...</p>
      </div>
    </div>
  );
}
