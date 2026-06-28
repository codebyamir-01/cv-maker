import { ResumeData } from "@/store/useResumeStore";

interface Props {
  resumeData: ResumeData;
  accentColor?: string;
}

export default function SimpleBw({ resumeData }: Props) {
  const { personalInfo, experience, summary, education, skills, optionalSections } = resumeData;

  const sectionHeaderStyle = {
    fontSize: "14px",
    fontWeight: "800",
    textTransform: "uppercase" as const,
    borderBottom: "2px solid #000",
    color: "#000",
    paddingBottom: "4px",
    marginBottom: "12px",
    marginTop: "20px",
    letterSpacing: "1px"
  };

  return (
    <div
      className="bg-white text-left font-sans"
      style={{
        width: "816px",
        minHeight: "1056px",
        padding: "64px 56px",
        boxSizing: "border-box",
        color: "#111",
      }}
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-black uppercase tracking-tighter mb-1" style={{ fontSize: "36px" }}>
          {personalInfo.fullName || "YOUR FULL NAME"}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-[16px] font-bold uppercase tracking-widest text-slate-500 mb-3">
            {personalInfo.jobTitle}
          </p>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] font-medium text-slate-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="underline">{personalInfo.linkedIn.replace(/^https?:\/\//, '')}</a>}
          {personalInfo.portfolio && <a href={personalInfo.portfolio} className="underline">{personalInfo.portfolio.replace(/^https?:\/\//, '')}</a>}
        </div>
      </div>

      <div className="grid grid-cols-[1fr_200px] gap-12">
        {/* Main Content */}
        <div>
          {summary && (
            <div>
              <h2 style={sectionHeaderStyle}>Summary</h2>
              <p className="text-[12px] leading-relaxed text-slate-800 font-medium">{summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div>
              <h2 style={sectionHeaderStyle}>Experience</h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <h3 className="font-bold text-[14px]">{exp.jobTitle}</h3>
                    <div className="text-[12px] font-bold text-slate-500 mb-2">
                      {exp.company} // {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                    </div>
                    {exp.description && (
                      <p className="text-[12px] leading-relaxed text-slate-700 whitespace-pre-wrap">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {optionalSections?.projects && optionalSections.projects.length > 0 && (
            <div>
              <h2 style={sectionHeaderStyle}>Projects</h2>
              <div className="space-y-5">
                {optionalSections.projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex items-baseline gap-2 mb-1">
                      <h3 className="font-bold text-[13px]">{proj.name}</h3>
                      {proj.link && <a href={proj.link} className="text-[11px] underline text-slate-500">Link</a>}
                    </div>
                    {proj.description && <p className="text-[12px] leading-relaxed text-slate-700 whitespace-pre-wrap">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          {education.length > 0 && (
            <div>
              <h2 style={sectionHeaderStyle}>Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-[13px] leading-tight mb-1">{edu.degree}</h3>
                    <p className="text-[11px] font-bold text-slate-500 mb-0.5">{edu.institution}</p>
                    <p className="text-[11px] text-slate-400">{edu.startYear} - {edu.endYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <h2 style={sectionHeaderStyle}>Skills</h2>
              <div className="flex flex-col gap-1">
                {skills.map((skill) => (
                  <span key={skill.id} className="text-[12px] font-medium text-slate-800">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {optionalSections?.languages && optionalSections.languages.length > 0 && (
            <div>
              <h2 style={sectionHeaderStyle}>Languages</h2>
              <ul className="space-y-1">
                {optionalSections.languages.map(lang => (
                  <li key={lang.id} className="text-[12px]">
                    <span className="font-bold">{lang.name}</span>
                    <span className="text-slate-500 ml-1">({lang.proficiency})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {optionalSections?.certifications && optionalSections.certifications.length > 0 && (
            <div>
              <h2 style={sectionHeaderStyle}>Certifications</h2>
              <ul className="space-y-3">
                {optionalSections.certifications.map(cert => (
                  <li key={cert.id} className="text-[12px]">
                    <div className="font-bold">{cert.name}</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">{cert.issuer}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
