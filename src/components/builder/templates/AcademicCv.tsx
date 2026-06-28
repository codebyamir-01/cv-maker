import { ResumeData } from "@/store/useResumeStore";

interface Props {
  resumeData: ResumeData;
  accentColor?: string;
}

export default function AcademicCv({ resumeData, accentColor = "#000000" }: Props) {
  const { personalInfo, experience, summary, education, skills, optionalSections } = resumeData;

  const sectionHeaderStyle = {
    fontSize: "14px",
    fontWeight: "bold" as const,
    textTransform: "uppercase" as const,
    borderBottom: "1px solid #d1d5db",
    marginBottom: "12px",
    paddingBottom: "4px",
    marginTop: "24px",
    color: accentColor,
    letterSpacing: "1px"
  };

  return (
    <div
      className="bg-white text-left"
      style={{
        width: "816px",
        minHeight: "1056px",
        padding: "56px 64px",
        boxSizing: "border-box",
        fontFamily: "'Georgia', serif",
        color: "#111827",
      }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="font-bold uppercase tracking-widest mb-2" style={{ fontSize: "22px", color: accentColor }}>
          {personalInfo.fullName || "YOUR FULL NAME"}
        </h1>
        <div className="flex flex-col gap-1 text-[12px] text-gray-700 items-center">
          {personalInfo.jobTitle && <p className="italic mb-1">{personalInfo.jobTitle}</p>}
          <div className="flex gap-2">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <><span>|</span><span>{personalInfo.phone}</span></>}
          </div>
          <div className="flex gap-2 mt-1">
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.linkedIn && <><span>|</span><a href={personalInfo.linkedIn} className="underline">{personalInfo.linkedIn.replace(/^https?:\/\//, '')}</a></>}
            {personalInfo.portfolio && <><span>|</span><a href={personalInfo.portfolio} className="underline">{personalInfo.portfolio.replace(/^https?:\/\//, '')}</a></>}
          </div>
        </div>
      </div>

      {/* Summary / Objective */}
      {summary && (
        <div>
          <h2 style={sectionHeaderStyle}>Research Interests / Summary</h2>
          <p className="text-[12px] leading-relaxed text-justify pl-4">{summary}</p>
        </div>
      )}

      {/* Education - Academic CVs typically put Education first */}
      {education.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Education</h2>
          <div className="space-y-4 pl-4">
            {education.map((edu) => (
              <div key={edu.id} className="relative">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[13px]">{edu.degree}</h3>
                  <span className="text-[12px] font-semibold">
                    {edu.startYear} {edu.startYear && edu.endYear ? "–" : ""} {edu.endYear}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-1">
                  <p className="text-[12px]">{edu.institution}</p>
                  <span className="text-[11px] italic">{edu.location}</span>
                </div>
                {edu.grade && <p className="text-[12px] italic">Grade/GPA: {edu.grade}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Publications */}
      {optionalSections?.publications && optionalSections.publications.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Publications</h2>
          <div className="space-y-3 pl-4">
            {optionalSections.publications.map((pub) => (
              <div key={pub.id} className="text-[12px] leading-relaxed">
                <span className="font-bold">{pub.title}</span>. 
                <span className="italic ml-1">{pub.publisher}</span>, {pub.date}.
                {pub.description && <div className="mt-1 pl-4 text-[11px] text-gray-700">{pub.description}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Academic/Professional Experience */}
      {experience.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Academic & Professional Experience</h2>
          <div className="space-y-5 pl-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[13px]">{exp.jobTitle}</h3>
                  <span className="text-[12px] font-semibold">
                    {exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <p className="text-[12px] italic">{exp.company}</p>
                  <span className="text-[11px]">{exp.location}</span>
                </div>
                {exp.description && (
                  <div className="text-[12px] leading-relaxed whitespace-pre-wrap pl-6 mt-1" style={{ display: "list-item", listStyleType: "circle" }}>
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Awards & Honors */}
      {optionalSections?.awards && optionalSections.awards.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Awards & Honors</h2>
          <div className="space-y-3 pl-4">
            {optionalSections.awards.map((award) => (
              <div key={award.id} className="text-[12px]">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold">{award.title}</span>
                  <span className="italic">{award.date}</span>
                </div>
                <div>{award.organization}</div>
                {award.description && <div className="mt-1 text-gray-700">{award.description}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills / Methodologies */}
      {skills.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Methodologies & Skills</h2>
          <p className="text-[12px] leading-relaxed pl-4">
            {skills.map((s) => s.name).join(" • ")}
          </p>
        </div>
      )}

      {/* Grants / Certifications */}
      {optionalSections?.certifications && optionalSections.certifications.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Certifications & Grants</h2>
          <div className="space-y-2 pl-4">
            {optionalSections.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline text-[12px]">
                <div>
                  <span className="font-bold">{cert.name}</span>, <span className="italic">{cert.issuer}</span>
                </div>
                <span>{cert.issueDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {optionalSections?.languages && optionalSections.languages.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Languages</h2>
          <div className="pl-4 text-[12px] space-y-1">
            {optionalSections.languages.map((l, i) => (
              <div key={i}>
                <span className="font-bold">{l.name}</span> {l.proficiency ? `— ${l.proficiency}` : ''}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects / Presentations */}
      {optionalSections?.projects && optionalSections.projects.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Research Projects & Presentations</h2>
          <div className="space-y-4 pl-4">
            {optionalSections.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-bold text-[13px]">{proj.name}</span>
                  {proj.link && <a href={proj.link} className="text-[11px] underline">Link</a>}
                </div>
                {proj.techStack && <div className="text-[11px] italic mb-1">{proj.techStack}</div>}
                {proj.description && <div className="text-[12px] leading-relaxed pl-4" style={{ display: "list-item", listStyleType: "circle" }}>{proj.description}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Volunteer / Service */}
      {optionalSections?.volunteer && optionalSections.volunteer.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Academic Service & Volunteer</h2>
          <div className="space-y-3 pl-4">
            {optionalSections.volunteer.map((vol) => (
              <div key={vol.id} className="text-[12px]">
                <div className="flex justify-between items-baseline font-bold">
                  <span>{vol.role}, {vol.organization}</span>
                  <span className="font-normal italic">{vol.startDate} – {vol.endDate}</span>
                </div>
                {vol.description && <div className="mt-1">{vol.description}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
