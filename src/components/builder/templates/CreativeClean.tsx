import { ResumeData } from "@/store/useResumeStore";

interface Props {
  resumeData: ResumeData;
  accentColor?: string;
}

export default function CreativeClean({ resumeData, accentColor = "#ec4899" }: Props) {
  const { personalInfo, experience, summary, education, skills, optionalSections } = resumeData;

  const SectionHeading = ({ children }: { children: React.ReactNode }) => (
    <h2 
      className="text-[14px] font-extrabold uppercase tracking-widest mb-4 pl-3"
      style={{ borderLeft: `4px solid ${accentColor}`, color: "#1f2937" }}
    >
      {children}
    </h2>
  );

  return (
    <div
      className="bg-white text-left font-sans"
      style={{
        width: "816px",
        minHeight: "1056px",
        padding: "48px 56px",
        boxSizing: "border-box",
        color: "#374151"
      }}
    >
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="font-black uppercase tracking-tight mb-2" style={{ fontSize: "36px", color: accentColor, lineHeight: 1 }}>
          {personalInfo.fullName || "YOUR FULL NAME"}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-[16px] font-bold tracking-widest uppercase text-slate-500 mb-4">
            {personalInfo.jobTitle}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[12px] font-medium text-slate-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        {(personalInfo.linkedIn || personalInfo.portfolio) && (
          <div className="flex flex-wrap justify-center gap-x-4 mt-2 text-[12px] font-medium">
            {personalInfo.linkedIn && <a href={personalInfo.linkedIn} style={{ color: accentColor }}>{personalInfo.linkedIn.replace(/^https?:\/\//, '')}</a>}
            {personalInfo.portfolio && <a href={personalInfo.portfolio} style={{ color: accentColor }}>{personalInfo.portfolio.replace(/^https?:\/\//, '')}</a>}
          </div>
        )}
      </div>

      <div className="grid grid-cols-[1fr_250px] gap-10">
        
        {/* Left Column - Main Content */}
        <div>
          {summary && (
            <div className="mb-8">
              <SectionHeading>Profile</SectionHeading>
              <p className="text-[12px] leading-relaxed text-slate-600">{summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div className="mb-8">
              <SectionHeading>Experience</SectionHeading>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <h3 className="font-bold text-[14px] text-slate-900">{exp.jobTitle}</h3>
                    <div className="text-[12px] font-semibold mb-2" style={{ color: accentColor }}>
                      {exp.company} | {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                    </div>
                    {exp.description && (
                      <p className="text-[12px] leading-relaxed text-slate-600 whitespace-pre-wrap">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {optionalSections?.projects && optionalSections.projects.length > 0 && (
            <div className="mb-8">
              <SectionHeading>Projects</SectionHeading>
              <div className="space-y-5">
                {optionalSections.projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="font-bold text-[14px] text-slate-900">{proj.name}</h3>
                    {proj.description && <p className="text-[12px] leading-relaxed text-slate-600 whitespace-pre-wrap mt-1">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-8">
          {education.length > 0 && (
            <div>
              <SectionHeading>Education</SectionHeading>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-[13px] text-slate-900 leading-tight mb-1">{edu.degree}</h3>
                    <p className="text-[11px] text-slate-500 mb-1">{edu.institution}</p>
                    <p className="text-[11px] font-medium" style={{ color: accentColor }}>{edu.startYear} - {edu.endYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <SectionHeading>Expertise</SectionHeading>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-1 rounded-md font-medium">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {optionalSections?.languages && optionalSections.languages.length > 0 && (
            <div>
              <SectionHeading>Languages</SectionHeading>
              <ul className="space-y-1">
                {optionalSections.languages.map(lang => (
                  <li key={lang.id} className="text-[12px] flex justify-between">
                    <span className="font-semibold text-slate-700">{lang.name}</span>
                    <span className="text-slate-400">{lang.proficiency}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {optionalSections?.certifications && optionalSections.certifications.length > 0 && (
            <div>
              <SectionHeading>Certificates</SectionHeading>
              <ul className="space-y-3">
                {optionalSections.certifications.map(cert => (
                  <li key={cert.id} className="text-[12px]">
                    <div className="font-bold text-slate-900">{cert.name}</div>
                    <div className="text-slate-500 text-[11px]">{cert.issuer}</div>
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
