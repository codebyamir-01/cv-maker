import { ResumeData } from "@/store/useResumeStore";

interface Props {
  resumeData: ResumeData;
  accentColor?: string;
}

export default function FinanceProfessional({ resumeData, accentColor = "#1e3a8a" }: Props) {
  const { personalInfo, experience, summary, education, skills, optionalSections } = resumeData;

  const sectionHeaderStyle = {
    fontSize: "13px",
    fontWeight: "bold" as const,
    textTransform: "uppercase" as const,
    borderTop: `1.5px solid ${accentColor}`,
    borderBottom: `1.5px solid ${accentColor}`,
    padding: "3px 0",
    marginBottom: "8px",
    marginTop: "16px",
    color: accentColor,
    letterSpacing: "0.5px"
  };

  return (
    <div
      className="bg-white text-left"
      style={{
        width: "816px",
        minHeight: "1056px",
        padding: "40px 48px",
        boxSizing: "border-box",
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#000",
      }}
    >
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="font-bold uppercase tracking-wide mb-1" style={{ fontSize: "28px" }}>
          {personalInfo.fullName || "YOUR FULL NAME"}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-2 text-[11px] font-medium">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <><span>|</span><span>{personalInfo.phone}</span></>}
          {personalInfo.email && <><span>|</span><span>{personalInfo.email}</span></>}
          {personalInfo.linkedIn && <><span>|</span><a href={personalInfo.linkedIn}>{personalInfo.linkedIn.replace(/^https?:\/\//, '')}</a></>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div>
          <h2 style={sectionHeaderStyle}>Summary</h2>
          <p className="text-[11px] leading-snug text-justify">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Professional Experience</h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                {/* Table-like header for experience */}
                <div className="flex justify-between items-end mb-0.5">
                  <div>
                    <span className="font-bold text-[12px]">{exp.company}</span>
                    <span className="text-[12px]"> {exp.location ? `— ${exp.location}` : ""}</span>
                  </div>
                  <span className="text-[11px] font-bold">
                    {exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}
                  </span>
                </div>
                <div className="italic text-[11px] mb-1 font-semibold">{exp.jobTitle}</div>
                {exp.description && (
                  <p className="text-[11px] leading-snug whitespace-pre-wrap pl-4" style={{ display: "list-item", listStyleType: "disc" }}>
                    {exp.description}
                  </p>
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
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-end mb-0.5">
                  <div>
                    <span className="font-bold text-[12px]">{edu.institution}</span>
                    <span className="text-[12px]"> {edu.location ? `— ${edu.location}` : ""}</span>
                  </div>
                  <span className="text-[11px] font-bold">
                    {edu.startYear} {edu.startYear && edu.endYear ? "–" : ""} {edu.endYear}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="italic text-[11px] font-semibold">{edu.degree}</span>
                  {edu.grade && <span className="text-[11px]">GPA: {edu.grade}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {optionalSections?.projects && optionalSections.projects.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Transaction / Project Experience</h2>
          <div className="space-y-3">
            {optionalSections.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-bold text-[12px]">{proj.name}</span>
                  {proj.link && <a href={proj.link} className="text-[10px] underline">Link</a>}
                </div>
                {proj.description && (
                  <p className="text-[11px] leading-snug whitespace-pre-wrap pl-4" style={{ display: "list-item", listStyleType: "disc" }}>
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills & Additional Info */}
      {(skills.length > 0 || (optionalSections?.certifications && optionalSections.certifications.length > 0) || (optionalSections?.languages && optionalSections.languages.length > 0)) && (
        <div>
          <h2 style={sectionHeaderStyle}>Skills, Certifications & Additional Information</h2>
          <div className="text-[11px] leading-snug space-y-1">
            {skills.length > 0 && (
              <div>
                <span className="font-bold">Technical Skills: </span>
                {skills.map(s => s.name).join(", ")}
              </div>
            )}
            {optionalSections?.certifications && optionalSections.certifications.length > 0 && (
              <div>
                <span className="font-bold">Certifications: </span>
                {optionalSections.certifications.map(c => `${c.name} (${c.issueDate})`).join(", ")}
              </div>
            )}
            {optionalSections?.languages && optionalSections.languages.length > 0 && (
              <div>
                <span className="font-bold">Languages: </span>
                {optionalSections.languages.map(l => `${l.name}${l.proficiency ? ` (${l.proficiency})` : ''}`).join(", ")}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Awards & Volunteer combined if exist */}
      {((optionalSections?.awards && optionalSections.awards.length > 0) || (optionalSections?.volunteer && optionalSections.volunteer.length > 0)) && (
        <div>
          <h2 style={sectionHeaderStyle}>Awards & Leadership</h2>
          <div className="space-y-2">
            {optionalSections?.awards?.map((award) => (
              <div key={award.id}>
                <div className="flex justify-between items-end mb-0.5">
                  <div>
                    <span className="font-bold text-[12px]">{award.title}</span>
                    <span className="italic text-[11px]"> — {award.organization}</span>
                  </div>
                  <span className="text-[11px] font-bold">{award.date}</span>
                </div>
                {award.description && <div className="text-[11px] leading-snug">{award.description}</div>}
              </div>
            ))}
            {optionalSections?.volunteer?.map((vol) => (
              <div key={vol.id}>
                <div className="flex justify-between items-end mb-0.5">
                  <div>
                    <span className="font-bold text-[12px]">{vol.role}</span>
                    <span className="italic text-[11px]"> — {vol.organization}</span>
                  </div>
                  <span className="text-[11px] font-bold">{vol.startDate} – {vol.endDate}</span>
                </div>
                {vol.description && <div className="text-[11px] leading-snug">{vol.description}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Publications */}
      {optionalSections?.publications && optionalSections.publications.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Publications</h2>
          <div className="space-y-2">
            {optionalSections.publications.map((pub) => (
              <div key={pub.id}>
                <div className="flex justify-between items-end mb-0.5">
                  <div>
                    <span className="font-bold text-[12px]">{pub.title}</span>
                    <span className="italic text-[11px]"> — {pub.publisher}</span>
                  </div>
                  <span className="text-[11px] font-bold">{pub.date}</span>
                </div>
                {pub.description && <div className="text-[11px] leading-snug">{pub.description}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
