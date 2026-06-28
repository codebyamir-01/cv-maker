import { ResumeData } from "@/store/useResumeStore";

interface Props {
  resumeData: ResumeData;
  accentColor?: string;
}

export default function FinanceProfessional({ resumeData, accentColor = "#1e3a8a" }: Props) {
  const { personalInfo, experience, summary, education, skills, optionalSections } = resumeData;

  const sectionHeaderStyle = {
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "uppercase" as const,
    borderBottom: "1px solid #000",
    color: "#000",
    paddingBottom: "2px",
    marginBottom: "6px",
    marginTop: "16px"
  };

  return (
    <div
      className="bg-white text-left font-serif"
      style={{
        width: "816px",
        minHeight: "1056px",
        padding: "48px 48px",
        boxSizing: "border-box",
        color: "#000",
      }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="font-bold uppercase tracking-wider mb-1" style={{ fontSize: "20px" }}>
          {personalInfo.fullName || "YOUR FULL NAME"}
        </h1>
        <div className="text-[11px] mb-1">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span className="mx-2">|</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.email && <span className="mx-2">|</span>}
          {personalInfo.email && <span>{personalInfo.email}</span>}
        </div>
        {(personalInfo.linkedIn || personalInfo.portfolio) && (
          <div className="text-[11px]">
            {personalInfo.linkedIn && <a href={personalInfo.linkedIn}>{personalInfo.linkedIn.replace(/^https?:\/\//, '')}</a>}
            {personalInfo.portfolio && <span className="mx-2">|</span>}
            {personalInfo.portfolio && <a href={personalInfo.portfolio}>{personalInfo.portfolio.replace(/^https?:\/\//, '')}</a>}
          </div>
        )}
      </div>

      {/* Experience (Usually first in Finance) */}
      {experience.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[12px] uppercase">{exp.company}</h3>
                  <span className="text-[11px] font-bold">
                    {exp.location}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-1">
                  <p className="text-[11px] italic">{exp.jobTitle}</p>
                  <span className="text-[11px] italic">
                    {exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <ul className="text-[11px] leading-relaxed list-disc list-outside ml-4 whitespace-pre-wrap">
                    {exp.description.split('\n').map((line, i) => {
                      const cleanLine = line.replace(/^- /, '').trim();
                      return cleanLine ? <li key={i} className="mb-0.5">{cleanLine}</li> : null;
                    })}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Education</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[12px] uppercase">{edu.institution}</h3>
                  <span className="text-[11px] font-bold">{edu.location}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <p className="text-[11px] italic">{edu.degree}</p>
                  <span className="text-[11px] italic">
                    {edu.startYear} – {edu.endYear}
                  </span>
                </div>
                {edu.grade && <p className="text-[11px] mt-0.5">GPA: {edu.grade}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Information / Skills */}
      <div className="mt-[16px]">
        <h2 style={sectionHeaderStyle}>Additional Information</h2>
        <div className="text-[11px] leading-relaxed space-y-1">
          {skills.length > 0 && (
            <div className="flex">
              <span className="font-bold w-24 shrink-0">Skills:</span>
              <span>{skills.map(s => s.name).join(', ')}</span>
            </div>
          )}
          {optionalSections?.certifications && optionalSections.certifications.length > 0 && (
            <div className="flex">
              <span className="font-bold w-24 shrink-0">Certifications:</span>
              <span>{optionalSections.certifications.map(c => c.name).join(', ')}</span>
            </div>
          )}
          {optionalSections?.languages && optionalSections.languages.length > 0 && (
            <div className="flex">
              <span className="font-bold w-24 shrink-0">Languages:</span>
              <span>{optionalSections.languages.map(l => l.name).join(', ')}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
