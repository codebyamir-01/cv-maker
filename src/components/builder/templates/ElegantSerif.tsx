import { ResumeData } from "@/store/useResumeStore";

interface Props {
  resumeData: ResumeData;
  accentColor?: string;
}

export default function ElegantSerif({ resumeData, accentColor = "#000000" }: Props) {
  const { personalInfo, experience, summary, education, skills, optionalSections } = resumeData;

  const sectionHeaderStyle = {
    fontSize: "14px",
    fontWeight: "bold" as const,
    textTransform: "uppercase" as const,
    borderBottom: "1.5px solid #000",
    marginBottom: "12px",
    paddingBottom: "4px",
    color: "#000",
    letterSpacing: "1px",
    marginTop: "20px"
  };

  return (
    <div
      className="bg-white text-left"
      style={{
        width: "816px",
        minHeight: "1056px",
        padding: "48px 56px",
        boxSizing: "border-box",
        fontFamily: 'Georgia, "Times New Roman", Times, serif',
        color: "#000",
      }}
    >
      {/* Header */}
      <div className="mb-4 pb-4 border-b-[1.5px] border-black">
        <h1 className="font-bold mb-1" style={{ fontSize: "32px", color: "#000", letterSpacing: "0.5px" }}>
          {personalInfo.fullName || "YOUR NAME"}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-[15px] font-bold text-black mb-3">
            {personalInfo.jobTitle}
          </p>
        )}
        <div className="flex justify-between text-[11px] font-medium leading-relaxed">
          <div className="flex flex-col">
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
          </div>
          <div className="flex flex-col text-right">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.portfolio && <span>{personalInfo.portfolio.replace(/^https?:\/\//, '')}</span>}
            {personalInfo.linkedIn && <span>{personalInfo.linkedIn.replace(/^https?:\/\//, '')}</span>}
            {personalInfo.github && <span>{personalInfo.github.replace(/^https?:\/\//, '')}</span>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div>
          <h2 style={sectionHeaderStyle}>Summary</h2>
          <p className="text-[11.5px] leading-relaxed text-justify">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="text-[13px] font-bold">{exp.jobTitle}</h3>
                  <span className="text-[11px] font-medium">
                    {exp.startDate} – {exp.currentlyWorking ? "Current" : exp.endDate}
                  </span>
                </div>
                <div className="italic text-[12px] mb-1.5">{exp.company}</div>
                {exp.description && (
                  <div className="text-[11.5px] leading-relaxed whitespace-pre-wrap pl-6 mb-1" style={{ listStyleType: "disc", display: "list-item" }}>
                    {exp.description}
                  </div>
                )}
                {/* Optional bottom note if location/tech exists (mimicking the bottom note in the image) */}
                {exp.location && (
                  <div className="text-[11px] mt-1 text-gray-800">
                    Location: {exp.location}
                  </div>
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
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="text-[13px] font-bold">
                    {edu.degree}{edu.degree && edu.startYear ? ", " : ""}{edu.startYear} {edu.startYear && edu.endYear ? "–" : ""} {edu.endYear}
                  </h3>
                </div>
                <div className="italic text-[12px] mb-0.5">
                  {edu.institution}{edu.location ? `, ${edu.location}` : ""}
                </div>
                {edu.grade && <div className="text-[11px]">GPA: {edu.grade}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills (Bullet separated style) */}
      {skills.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Skills</h2>
          <div className="text-[11.5px] leading-loose">
            {skills.map((s, i) => (
              <span key={i}>
                {s.name}
                {i < skills.length - 1 && <span className="mx-2 font-bold text-gray-500">•</span>}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Awards */}
      {optionalSections?.awards && optionalSections.awards.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Awards</h2>
          <div className="space-y-3">
            {optionalSections.awards.map((award) => (
              <div key={award.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="text-[13px] font-bold">{award.title} {award.organization ? `- ${award.organization}` : ""}</h3>
                  <span className="text-[11px]">{award.date}</span>
                </div>
                {award.description && <div className="text-[11.5px]">{award.description}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {optionalSections?.projects && optionalSections.projects.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Projects</h2>
          <div className="space-y-3">
            {optionalSections.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="text-[13px] font-bold">{proj.name}</h3>
                  {proj.link && <a href={proj.link} className="text-[11px] underline">Link</a>}
                </div>
                {proj.techStack && <div className="italic text-[11px] mb-1">{proj.techStack}</div>}
                {proj.description && (
                  <div className="text-[11.5px] leading-relaxed whitespace-pre-wrap pl-6" style={{ listStyleType: "disc", display: "list-item" }}>
                    {proj.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Publications */}
      {optionalSections?.publications && optionalSections.publications.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Publications</h2>
          <div className="space-y-3">
            {optionalSections.publications.map((pub) => (
              <div key={pub.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="text-[13px] font-bold">{pub.title}</h3>
                  <span className="text-[11px]">{pub.date}</span>
                </div>
                <div className="italic text-[12px] mb-0.5">{pub.publisher}</div>
                {pub.description && <div className="text-[11.5px]">{pub.description}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Volunteer */}
      {optionalSections?.volunteer && optionalSections.volunteer.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Volunteer</h2>
          <div className="space-y-3">
            {optionalSections.volunteer.map((vol) => (
              <div key={vol.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="text-[13px] font-bold">{vol.role}</h3>
                  <span className="text-[11px]">{vol.startDate} - {vol.endDate}</span>
                </div>
                <div className="italic text-[12px] mb-0.5">{vol.organization}</div>
                {vol.description && <div className="text-[11.5px]">{vol.description}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {optionalSections?.certifications && optionalSections.certifications.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Certifications</h2>
          <div className="space-y-3">
            {optionalSections.certifications.map((cert) => (
              <div key={cert.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="text-[13px] font-bold">{cert.name}</h3>
                  <span className="text-[11px]">{cert.issueDate}</span>
                </div>
                <div className="italic text-[12px] mb-0.5">{cert.issuer}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {optionalSections?.languages && optionalSections.languages.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Languages</h2>
          <div className="text-[11.5px] leading-loose">
            {optionalSections.languages.map((l, i) => (
              <span key={i}>
                {l.name} {l.proficiency && `(${l.proficiency})`}
                {i < optionalSections.languages.length - 1 && <span className="mx-2 font-bold text-gray-500">•</span>}
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
