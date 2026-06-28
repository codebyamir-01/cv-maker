import { ResumeData } from "@/store/useResumeStore";

interface Props {
  resumeData: ResumeData;
  accentColor?: string;
}

export default function AtsMinimal({ resumeData, accentColor = "#000000" }: Props) {
  const { personalInfo, experience, summary } = resumeData;

  const sectionHeaderStyle = {
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "uppercase" as const,
    borderBottom: "1px solid #000",
    marginBottom: "8px",
    paddingBottom: "2px",
    color: "#000",
    letterSpacing: "1px"
  };

  return (
    <div
      className="bg-white font-sans text-black text-left"
      style={{
        width: "816px",
        minHeight: "1056px",
        padding: "48px",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="font-bold uppercase tracking-wider mb-1" style={{ fontSize: "24px" }}>
          {personalInfo.fullName || "YOUR NAME"}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-[13px] font-medium mb-2">{personalInfo.jobTitle}</p>
        )}
        <div className="flex flex-wrap justify-center gap-x-2 text-[11px]">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <><span className="text-slate-400">•</span><span>{personalInfo.phone}</span></>}
          {personalInfo.location && <><span className="text-slate-400">•</span><span>{personalInfo.location}</span></>}
        </div>
        {(personalInfo.linkedIn || personalInfo.github || personalInfo.portfolio) && (
          <div className="flex flex-wrap justify-center gap-x-2 mt-1 text-[11px]">
            {personalInfo.linkedIn && <a href={personalInfo.linkedIn}>{personalInfo.linkedIn.replace(/^https?:\/\//, '')}</a>}
            {personalInfo.github && <><span className="text-slate-400">•</span><a href={personalInfo.github}>{personalInfo.github.replace(/^https?:\/\//, '')}</a></>}
            {personalInfo.portfolio && <><span className="text-slate-400">•</span><a href={personalInfo.portfolio}>{personalInfo.portfolio.replace(/^https?:\/\//, '')}</a></>}
          </div>
        )}
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-5">
          <h2 style={sectionHeaderStyle}>Summary</h2>
          <p className="text-[11px] leading-relaxed text-black">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-5">
          <h2 style={sectionHeaderStyle}>Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[12px]">{exp.jobTitle}</h3>
                  <span className="text-[11px] font-medium">
                    {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-1">
                  <p className="text-[11px] italic">{exp.company}</p>
                  <span className="text-[11px]">{exp.location}</span>
                </div>
                {exp.description && (
                  <p className="text-[11px] leading-relaxed whitespace-pre-wrap">{exp.description}</p>
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
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[12px]">{edu.degree}</h3>
                  <span className="text-[11px] font-medium">
                    {edu.startYear} {edu.startYear && edu.endYear ? "-" : ""} {edu.endYear}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mt-0.5">
                  <p className="text-[11px] italic">{edu.institution}</p>
                  <span className="text-[11px]">{edu.location}</span>
                </div>
                {edu.grade && <p className="text-[11px] mt-0.5">Grade: {edu.grade}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <div className="mb-5">
          <h2 style={sectionHeaderStyle}>Skills</h2>
          <p className="text-[11px] leading-relaxed">
            {resumeData.skills.map((s) => s.name).join(", ")}
          </p>
        </div>
      )}

      {/* Projects */}
      {resumeData.optionalSections?.projects && resumeData.optionalSections.projects.length > 0 && (
        <div className="mb-5">
          <h2 style={sectionHeaderStyle}>Projects</h2>
          <div className="space-y-3">
            {resumeData.optionalSections.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline">
                  <div className="flex gap-2 items-baseline">
                    <h3 className="font-bold text-[12px]">{proj.name}</h3>
                    {proj.link && <a href={proj.link} className="text-[10px] underline">{proj.link.replace(/^https?:\/\//, '')}</a>}
                  </div>
                </div>
                {proj.techStack && <p className="text-[11px] italic mb-1">{proj.techStack}</p>}
                {proj.description && <p className="text-[11px] leading-relaxed whitespace-pre-wrap">{proj.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {resumeData.optionalSections?.certifications && resumeData.optionalSections.certifications.length > 0 && (
        <div className="mb-5">
          <h2 style={sectionHeaderStyle}>Certifications</h2>
          <div className="space-y-2">
            {resumeData.optionalSections.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-[11px]">{cert.name}</span>
                  <span className="text-[11px] italic ml-1">({cert.issuer})</span>
                </div>
                <span className="text-[11px]">{cert.issueDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {resumeData.optionalSections?.languages && resumeData.optionalSections.languages.length > 0 && (
        <div className="mb-5">
          <h2 style={sectionHeaderStyle}>Languages</h2>
          <p className="text-[11px]">
            {resumeData.optionalSections.languages.map((l) => `${l.name} ${l.proficiency ? `(${l.proficiency})` : ''}`).join(", ")}
          </p>
        </div>
      )}

      {/* Awards */}
      {resumeData.optionalSections?.awards && resumeData.optionalSections.awards.length > 0 && (
        <div className="mb-5">
          <h2 style={sectionHeaderStyle}>Awards</h2>
          <div className="space-y-2">
            {resumeData.optionalSections.awards.map((award) => (
              <div key={award.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[11px]">{award.title}</h3>
                  <span className="text-[11px]">{award.date}</span>
                </div>
                <p className="text-[11px] italic">{award.organization}</p>
                {award.description && <p className="text-[11px] mt-0.5 whitespace-pre-wrap">{award.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Volunteer */}
      {resumeData.optionalSections?.volunteer && resumeData.optionalSections.volunteer.length > 0 && (
        <div className="mb-5">
          <h2 style={sectionHeaderStyle}>Volunteer</h2>
          <div className="space-y-3">
            {resumeData.optionalSections.volunteer.map((vol) => (
              <div key={vol.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[11px]">{vol.role}</h3>
                  <span className="text-[11px]">{vol.startDate} - {vol.endDate}</span>
                </div>
                <p className="text-[11px] italic">{vol.organization}</p>
                {vol.description && <p className="text-[11px] mt-0.5 whitespace-pre-wrap">{vol.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Publications */}
      {resumeData.optionalSections?.publications && resumeData.optionalSections.publications.length > 0 && (
        <div className="mb-5">
          <h2 style={sectionHeaderStyle}>Publications</h2>
          <div className="space-y-3">
            {resumeData.optionalSections.publications.map((pub) => (
              <div key={pub.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[11px]">{pub.title}</h3>
                  <span className="text-[11px]">{pub.date}</span>
                </div>
                <p className="text-[11px] italic">{pub.publisher}</p>
                {pub.description && <p className="text-[11px] mt-0.5 whitespace-pre-wrap">{pub.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
