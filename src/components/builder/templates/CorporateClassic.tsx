import { ResumeData } from "@/store/useResumeStore";

interface Props {
  resumeData: ResumeData;
  accentColor?: string;
}

export default function CorporateClassic({ resumeData, accentColor = "#111827" }: Props) {
  const { personalInfo, experience, summary } = resumeData;

  const sectionHeaderStyle = {
    fontSize: "14px",
    fontWeight: "bold" as const,
    textTransform: "uppercase" as const,
    borderBottom: `3px double ${accentColor}`,
    marginBottom: "12px",
    paddingBottom: "4px",
    color: accentColor,
    letterSpacing: "1px",
    textAlign: "center" as const,
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
      <div className="text-center mb-8 border-b-2 pb-6" style={{ borderColor: accentColor }}>
        <h1 className="font-bold uppercase tracking-widest mb-2" style={{ fontSize: "28px", color: accentColor }}>
          {personalInfo.fullName || "YOUR FULL NAME"}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-[15px] italic mb-3 font-semibold" style={{ color: accentColor }}>
            {personalInfo.jobTitle}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-x-4 text-[12px]">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <><span className="text-gray-400">♦</span><span>{personalInfo.phone}</span></>}
          {personalInfo.email && <><span className="text-gray-400">♦</span><span>{personalInfo.email}</span></>}
        </div>
        {(personalInfo.linkedIn || personalInfo.portfolio) && (
          <div className="flex flex-wrap justify-center gap-x-4 mt-2 text-[12px]">
            {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="underline">{personalInfo.linkedIn.replace(/^https?:\/\//, '')}</a>}
            {personalInfo.portfolio && <><span className="text-gray-400">♦</span><a href={personalInfo.portfolio} className="underline">{personalInfo.portfolio.replace(/^https?:\/\//, '')}</a></>}
          </div>
        )}
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h2 style={sectionHeaderStyle}>Executive Summary</h2>
          <p className="text-[12px] leading-relaxed text-justify">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 style={sectionHeaderStyle}>Professional Experience</h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[14px]" style={{ color: accentColor }}>{exp.company}</h3>
                  <span className="text-[12px] font-bold">
                    {exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <p className="text-[13px] italic font-semibold">{exp.jobTitle}</p>
                  <span className="text-[12px] italic">{exp.location}</span>
                </div>
                {exp.description && (
                  <p className="text-[12px] leading-relaxed whitespace-pre-wrap pl-3 border-l-[1.5px]" style={{ borderColor: accentColor }}>
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
        <div className="mb-6">
          <h2 style={sectionHeaderStyle}>Education</h2>
          <div className="space-y-4">
            {resumeData.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[14px]" style={{ color: accentColor }}>{edu.institution}</h3>
                  <span className="text-[12px] font-bold">
                    {edu.startYear} {edu.startYear && edu.endYear ? "–" : ""} {edu.endYear}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <p className="text-[13px] italic">{edu.degree}</p>
                  <span className="text-[12px] italic">{edu.location}</span>
                </div>
                {edu.grade && <p className="text-[12px] mt-1 font-semibold">Grade/GPA: {edu.grade}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <div className="mb-6">
          <h2 style={sectionHeaderStyle}>Core Competencies</h2>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[12px] leading-relaxed">
            {resumeData.skills.map((s, i) => (
              <span key={i} className="font-semibold px-2 border-b" style={{ borderColor: accentColor }}>
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resumeData.optionalSections?.projects && resumeData.optionalSections.projects.length > 0 && (
        <div className="mb-6">
          <h2 style={sectionHeaderStyle}>Key Projects</h2>
          <div className="space-y-4">
            {resumeData.optionalSections.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[13px] uppercase" style={{ color: accentColor }}>{proj.name}</h3>
                  {proj.link && <a href={proj.link} className="text-[11px] underline">{proj.link.replace(/^https?:\/\//, '')}</a>}
                </div>
                {proj.techStack && <p className="text-[12px] italic mb-1.5 font-semibold">Technologies: {proj.techStack}</p>}
                {proj.description && <p className="text-[12px] leading-relaxed whitespace-pre-wrap">{proj.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {resumeData.optionalSections?.certifications && resumeData.optionalSections.certifications.length > 0 && (
        <div className="mb-6">
          <h2 style={sectionHeaderStyle}>Licenses & Certifications</h2>
          <div className="space-y-2">
            {resumeData.optionalSections.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-[12px]">{cert.name}</span>
                  <span className="text-[12px] italic ml-2 border-l border-gray-400 pl-2">{cert.issuer}</span>
                </div>
                <span className="text-[12px] font-semibold">{cert.issueDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {resumeData.optionalSections?.languages && resumeData.optionalSections.languages.length > 0 && (
        <div className="mb-6">
          <h2 style={sectionHeaderStyle}>Languages</h2>
          <div className="flex flex-wrap justify-center gap-x-6 text-[12px]">
            {resumeData.optionalSections.languages.map((l, i) => (
              <span key={i}>
                <strong className="uppercase">{l.name}</strong> {l.proficiency ? `- ${l.proficiency}` : ''}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Awards */}
      {resumeData.optionalSections?.awards && resumeData.optionalSections.awards.length > 0 && (
        <div className="mb-6">
          <h2 style={sectionHeaderStyle}>Awards & Honors</h2>
          <div className="space-y-3">
            {resumeData.optionalSections.awards.map((award) => (
              <div key={award.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[13px]">{award.title}</h3>
                  <span className="text-[12px] font-semibold">{award.date}</span>
                </div>
                <p className="text-[12px] italic">{award.organization}</p>
                {award.description && <p className="text-[12px] mt-1 whitespace-pre-wrap leading-relaxed">{award.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Volunteer */}
      {resumeData.optionalSections?.volunteer && resumeData.optionalSections.volunteer.length > 0 && (
        <div className="mb-6">
          <h2 style={sectionHeaderStyle}>Volunteer Experience</h2>
          <div className="space-y-4">
            {resumeData.optionalSections.volunteer.map((vol) => (
              <div key={vol.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[13px]" style={{ color: accentColor }}>{vol.organization}</h3>
                  <span className="text-[12px] font-bold">{vol.startDate} – {vol.endDate}</span>
                </div>
                <p className="text-[12px] italic font-semibold mb-1">{vol.role}</p>
                {vol.description && <p className="text-[12px] leading-relaxed whitespace-pre-wrap">{vol.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Publications */}
      {resumeData.optionalSections?.publications && resumeData.optionalSections.publications.length > 0 && (
        <div className="mb-6">
          <h2 style={sectionHeaderStyle}>Publications</h2>
          <div className="space-y-3">
            {resumeData.optionalSections.publications.map((pub) => (
              <div key={pub.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[13px]">{pub.title}</h3>
                  <span className="text-[12px] font-bold">{pub.date}</span>
                </div>
                <p className="text-[12px] italic">Published by: {pub.publisher}</p>
                {pub.description && <p className="text-[12px] mt-1 leading-relaxed whitespace-pre-wrap">{pub.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
