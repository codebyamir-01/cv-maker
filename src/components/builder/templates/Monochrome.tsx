import { ResumeData } from "@/store/useResumeStore";

interface Props {
  resumeData: ResumeData;
  accentColor?: string;
}

export default function Monochrome({ resumeData, accentColor = "#000000" }: Props) {
  const { personalInfo, experience, education, skills, summary } = resumeData;

  return (
    <div
      className="bg-white font-serif text-slate-900"
      style={{
        width: "816px",
        minHeight: "1056px",
        padding: "60px",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="font-bold text-3xl mb-1" style={{ color: accentColor }}>
          {personalInfo.fullName || "Jessie Smith"}
        </h1>
        {personalInfo.jobTitle && (
          <p className="font-bold text-sm text-slate-800 mb-2">
            {personalInfo.jobTitle}
          </p>
        )}
        <div className="flex flex-wrap justify-between text-xs text-slate-600 mt-2 px-2">
          <div className="flex gap-2">
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
          </div>
          <div>
            {personalInfo.email && <span>{personalInfo.email}</span>}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-5">
        <h2 className="font-bold text-sm mb-2 pb-1" style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}>
          Summary
        </h2>
        <p className="text-xs leading-relaxed text-slate-800">
          {summary || "Experienced professional with a proven track record..."}
        </p>
      </div>

      {/* Experience */}
      <div className="mb-5">
        <h2 className="font-bold text-sm mb-3 pb-1" style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}>
          Experience
        </h2>
        <div className="space-y-4">
          {experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-xs text-slate-900">{exp.jobTitle}</h3>
                <span className="text-xs italic text-slate-700">
                  {exp.startDate} — {exp.currentlyWorking ? "Present" : exp.endDate}
                </span>
              </div>
              <div className="mb-1.5">
                <p className="text-xs italic text-slate-800">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
              </div>
              {exp.description && (
                <ul className="list-disc pl-5 text-xs text-slate-800 space-y-1">
                  {exp.description.split('\n').filter(Boolean).map((line, i) => (
                    <li key={i}>{line.replace(/^[-•]\s*/, '')}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-5">
        <h2 className="font-bold text-sm mb-3 pb-1" style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}>
          Education
        </h2>
        <div className="space-y-3">
          {education.map((ed) => (
            <div key={ed.id}>
              <div className="flex justify-between text-xs">
                <span className="text-slate-900">{ed.degree}, {ed.institution}{ed.location ? `, ${ed.location}` : ''}</span>
                <span className="italic text-slate-700">{ed.startYear} — {ed.endYear}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-5">
        <h2 className="font-bold text-sm mb-3 pb-1" style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}>
          Skills
        </h2>
        <ul className="list-disc pl-5 text-xs text-slate-800 space-y-1 font-bold">
          {skills.map((skill) => (
            <li key={skill.id}>{skill.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
