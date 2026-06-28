import { ResumeData } from "@/store/useResumeStore";

interface Props {
  resumeData: ResumeData;
  accentColor?: string;
}

export default function AtsMinimal({ resumeData, accentColor = "#000000" }: Props) {
  const { personalInfo, experience, summary } = resumeData;

  const sectionHeaderStyle = {
    fontSize: "13px",
    fontWeight: "bold" as const,
    textTransform: "uppercase" as const,
    borderBottom: "1px solid #000000",
    marginBottom: "10px",
    paddingBottom: "2px",
    color: "#000000",
  };

  const Sep = () => <span className="mx-2 text-black">|</span>;

  return (
    <div
      className="bg-white text-black text-left"
      style={{
        width: "816px",
        minHeight: "1056px",
        padding: "48px 64px", // Wider margins for minimal look
        boxSizing: "border-box",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="font-bold uppercase tracking-wide mb-1" style={{ fontSize: "28px", color: "#000000" }}>
          {personalInfo.fullName || "YOUR FULL NAME"}
        </h1>
        <div className="flex flex-wrap justify-center items-center text-[12px] font-normal text-black mt-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <><Sep /><span>{personalInfo.phone}</span></>}
          {personalInfo.location && <><Sep /><span>{personalInfo.location}</span></>}
        </div>
        {(personalInfo.linkedIn || personalInfo.github || personalInfo.portfolio) && (
          <div className="flex flex-wrap justify-center items-center mt-1 text-[12px] text-black">
            {personalInfo.linkedIn && <a href={personalInfo.linkedIn}>{personalInfo.linkedIn.replace(/^https?:\/\//, '')}</a>}
            {personalInfo.github && <><Sep /><a href={personalInfo.github}>{personalInfo.github.replace(/^https?:\/\//, '')}</a></>}
            {personalInfo.portfolio && <><Sep /><a href={personalInfo.portfolio}>{personalInfo.portfolio.replace(/^https?:\/\//, '')}</a></>}
          </div>
        )}
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-5">
          <h2 style={sectionHeaderStyle}>Professional Summary</h2>
          <p className="text-[12px] leading-snug text-black">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-5">
          <h2 style={sectionHeaderStyle}>Professional Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <span className="font-bold text-[13px]">{exp.company}</span>
                    <span className="mx-2 text-black">—</span>
                    <span className="italic text-[12px]">{exp.jobTitle}</span>
                  </div>
                  <span className="text-[12px] whitespace-nowrap">
                    {exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}
                  </span>
                </div>
                {exp.location && (
                  <div className="text-[11px] text-black mb-1">{exp.location}</div>
                )}
                {exp.description && (
                  <p className="text-[12px] leading-snug whitespace-pre-wrap pl-4" style={{ listStyleType: "disc", display: "list-item" }}>
                    {exp.description}
                  </p>
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
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <span className="font-bold text-[13px]">{edu.institution}</span>
                  </div>
                  <span className="text-[12px] whitespace-nowrap">
                    {edu.startYear} {edu.startYear && edu.endYear ? "–" : ""} {edu.endYear}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="italic text-[12px]">{edu.degree}</span>
                  <span className="text-[12px]">{edu.location}</span>
                </div>
                {edu.grade && <p className="text-[12px] mt-0.5">GPA: {edu.grade}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resumeData.optionalSections?.projects && resumeData.optionalSections.projects.length > 0 && (
        <div className="mb-5">
          <h2 style={sectionHeaderStyle}>Projects</h2>
          <div className="space-y-3">
            {resumeData.optionalSections.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <span className="font-bold text-[13px]">{proj.name}</span>
                    {proj.techStack && <span className="italic text-[12px] ml-2">| {proj.techStack}</span>}
                  </div>
                  {proj.link && <a href={proj.link} className="text-[11px] underline">{proj.link.replace(/^https?:\/\//, '')}</a>}
                </div>
                {proj.description && (
                  <p className="text-[12px] leading-snug whitespace-pre-wrap pl-4" style={{ listStyleType: "disc", display: "list-item" }}>
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <div className="mb-5">
          <h2 style={sectionHeaderStyle}>Skills & Expertise</h2>
          <p className="text-[12px] leading-snug">
            {resumeData.skills.map((s) => s.name).join("  |  ")}
          </p>
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
                  <span className="font-bold text-[12px]">{cert.name}</span>
                  <span className="italic text-[12px] ml-2">{cert.issuer}</span>
                </div>
                <span className="text-[12px]">{cert.issueDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {resumeData.optionalSections?.languages && resumeData.optionalSections.languages.length > 0 && (
        <div className="mb-5">
          <h2 style={sectionHeaderStyle}>Languages</h2>
          <p className="text-[12px] leading-snug">
            {resumeData.optionalSections.languages.map((l) => `${l.name} ${l.proficiency ? `(${l.proficiency})` : ''}`).join("  |  ")}
          </p>
        </div>
      )}

      {/* Awards */}
      {resumeData.optionalSections?.awards && resumeData.optionalSections.awards.length > 0 && (
        <div className="mb-5">
          <h2 style={sectionHeaderStyle}>Awards & Honors</h2>
          <div className="space-y-2">
            {resumeData.optionalSections.awards.map((award) => (
              <div key={award.id}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[12px]">{award.title}</span>
                  <span className="text-[12px]">{award.date}</span>
                </div>
                <div className="text-[12px] italic">{award.organization}</div>
                {award.description && <p className="text-[12px] mt-0.5 whitespace-pre-wrap">{award.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Volunteer */}
      {resumeData.optionalSections?.volunteer && resumeData.optionalSections.volunteer.length > 0 && (
        <div className="mb-5">
          <h2 style={sectionHeaderStyle}>Volunteer Experience</h2>
          <div className="space-y-3">
            {resumeData.optionalSections.volunteer.map((vol) => (
              <div key={vol.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-[12px]">{vol.organization}</span>
                    <span className="mx-2">—</span>
                    <span className="italic text-[12px]">{vol.role}</span>
                  </div>
                  <span className="text-[12px] whitespace-nowrap">{vol.startDate} – {vol.endDate}</span>
                </div>
                {vol.description && (
                  <p className="text-[12px] leading-snug whitespace-pre-wrap pl-4 mt-1" style={{ listStyleType: "disc", display: "list-item" }}>
                    {vol.description}
                  </p>
                )}
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
                  <span className="font-bold text-[12px]">{pub.title}</span>
                  <span className="text-[12px]">{pub.date}</span>
                </div>
                <div className="text-[12px] italic">{pub.publisher}</div>
                {pub.description && <p className="text-[12px] mt-0.5 whitespace-pre-wrap">{pub.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
