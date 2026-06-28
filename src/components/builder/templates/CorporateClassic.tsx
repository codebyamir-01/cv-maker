import { ResumeData } from "@/store/useResumeStore";

interface Props {
  resumeData: ResumeData;
  accentColor?: string;
}

export default function CorporateClassic({ resumeData, accentColor = "#1e293b" }: Props) {
  const { personalInfo, experience, summary } = resumeData;

  const sectionHeaderStyle = {
    fontSize: "13px",
    fontWeight: "bold",
    textTransform: "uppercase" as const,
    borderBottom: `1px solid ${accentColor}`,
    color: accentColor,
    paddingBottom: "3px",
    marginBottom: "8px",
    letterSpacing: "0.5px"
  };

  return (
    <div
      className="bg-white text-left"
      style={{
        width: "816px",
        minHeight: "1056px",
        padding: "54px",
        boxSizing: "border-box",
        fontFamily: "'Times New Roman', Times, serif",
        color: "#111",
      }}
    >
      {/* Header */}
      <div className="text-center mb-6 border-b-[3px] double pb-4" style={{ borderColor: accentColor }}>
        <h1 className="font-bold uppercase tracking-widest mb-1" style={{ fontSize: "26px", color: accentColor }}>
          {personalInfo.fullName || "YOUR FULL NAME"}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-[14px] italic mb-2" style={{ color: accentColor }}>
            {personalInfo.jobTitle}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-x-3 text-[12px]">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <><span className="text-slate-400">|</span><span>{personalInfo.phone}</span></>}
          {personalInfo.email && <><span className="text-slate-400">|</span><span>{personalInfo.email}</span></>}
        </div>
        {(personalInfo.linkedIn || personalInfo.portfolio) && (
          <div className="flex flex-wrap justify-center gap-x-3 mt-1 text-[12px]">
            {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="underline">{personalInfo.linkedIn.replace(/^https?:\/\//, '')}</a>}
            {personalInfo.portfolio && <><span className="text-slate-400">|</span><a href={personalInfo.portfolio} className="underline">{personalInfo.portfolio.replace(/^https?:\/\//, '')}</a></>}
          </div>
        )}
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-5">
          <h2 style={sectionHeaderStyle}>Professional Profile</h2>
          <p className="text-[12px] leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-5">
          <h2 style={sectionHeaderStyle}>Professional Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-[13px]">{exp.jobTitle}</h3>
                  <span className="text-[12px] font-bold">
                    {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-1.5">
                  <p className="text-[12px] italic font-semibold">{exp.company}</p>
                  <span className="text-[12px] italic">{exp.location}</span>
                </div>
                {exp.description && (
                  <p className="text-[12px] leading-relaxed whitespace-pre-wrap pl-2 border-l-2 border-slate-100">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <div className="mb-5">
          <h2 style={sectionHeaderStyle}>Education</h2>
          <div className="space-y-3">
            {resumeData.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-[13px]">{edu.degree}</h3>
                  <span className="text-[12px] font-bold">
                    {edu.startYear} {edu.startYear && edu.endYear ? "-" : ""} {edu.endYear}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mt-0.5">
                  <p className="text-[12px] italic font-semibold">{edu.institution}</p>
                  <span className="text-[12px] italic">{edu.location}</span>
                </div>
                {edu.grade && <p className="text-[12px] mt-0.5">Grade: {edu.grade}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <div className="mb-5">
          <h2 style={sectionHeaderStyle}>Core Competencies</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {resumeData.skills.map((skill) => (
              <span key={skill.id} className="text-[12px] font-medium">
                • {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resumeData.optionalSections?.projects && resumeData.optionalSections.projects.length > 0 && (
        <div className="mb-5">
          <h2 style={sectionHeaderStyle}>Selected Projects</h2>
          <div className="space-y-4">
            {resumeData.optionalSections.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[13px]">{proj.name}</h3>
                </div>
                {proj.description && <p className="text-[12px] leading-relaxed whitespace-pre-wrap mt-1">{proj.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Awards & Certifications */}
      {((resumeData.optionalSections?.certifications?.length || 0) > 0 || (resumeData.optionalSections?.awards?.length || 0) > 0) && (
        <div className="mb-5">
          <h2 style={sectionHeaderStyle}>Honors & Certifications</h2>
          <ul className="list-disc list-outside ml-4 space-y-1">
            {resumeData.optionalSections?.certifications?.map(c => (
              <li key={c.id} className="text-[12px] pl-1">
                <strong>{c.name}</strong>, {c.issuer} ({c.issueDate})
              </li>
            ))}
            {resumeData.optionalSections?.awards?.map(a => (
              <li key={a.id} className="text-[12px] pl-1">
                <strong>{a.title}</strong>, {a.organization} ({a.date})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
