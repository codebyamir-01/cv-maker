import { ResumeData } from "@/store/useResumeStore";

interface Props {
  resumeData: ResumeData;
  accentColor?: string;
}

export default function TwoColumnModern({ resumeData, accentColor = "#2563eb" }: Props) {
  const { personalInfo, experience, summary, education, skills, optionalSections } = resumeData;

  const leftHeaderStyle = {
    fontSize: "14px",
    fontWeight: "bold" as const,
    textTransform: "uppercase" as const,
    borderBottom: `2px solid ${accentColor}`,
    marginBottom: "12px",
    paddingBottom: "4px",
    color: "#1f2937",
    letterSpacing: "0.5px"
  };

  const rightHeaderStyle = {
    fontSize: "16px",
    fontWeight: "bold" as const,
    textTransform: "uppercase" as const,
    color: accentColor,
    borderBottom: "2px solid #e5e7eb",
    marginBottom: "12px",
    paddingBottom: "4px",
    letterSpacing: "0.5px"
  };

  return (
    <div
      className="bg-white flex text-left font-sans"
      style={{
        width: "816px",
        minHeight: "1056px",
        boxSizing: "border-box",
        color: "#374151",
      }}
    >
      {/* Left Column (30%) */}
      <div className="w-[30%] p-8" style={{ backgroundColor: "#f3f4f6" }}>
        {/* Name & Title */}
        <div className="mb-8">
          <h1 className="font-bold uppercase tracking-tight mb-1" style={{ fontSize: "24px", color: accentColor, lineHeight: "1.1" }}>
            {personalInfo.fullName || "YOUR NAME"}
          </h1>
          {personalInfo.jobTitle && (
            <p className="text-[14px] font-medium text-gray-600 mt-2">{personalInfo.jobTitle}</p>
          )}
        </div>

        {/* Contact Info */}
        <div className="mb-8">
          <h2 style={leftHeaderStyle}>Contact</h2>
          <div className="flex flex-col gap-2 text-[11px] break-all">
            {personalInfo.email && <div><strong>Email:</strong><br />{personalInfo.email}</div>}
            {personalInfo.phone && <div><strong>Phone:</strong><br />{personalInfo.phone}</div>}
            {personalInfo.location && <div><strong>Location:</strong><br />{personalInfo.location}</div>}
            {personalInfo.linkedIn && <div><strong>LinkedIn:</strong><br /><a href={personalInfo.linkedIn} className="underline">{personalInfo.linkedIn.replace(/^https?:\/\//, '')}</a></div>}
            {personalInfo.portfolio && <div><strong>Portfolio:</strong><br /><a href={personalInfo.portfolio} className="underline">{personalInfo.portfolio.replace(/^https?:\/\//, '')}</a></div>}
            {personalInfo.github && <div><strong>GitHub:</strong><br /><a href={personalInfo.github} className="underline">{personalInfo.github.replace(/^https?:\/\//, '')}</a></div>}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-8">
            <h2 style={leftHeaderStyle}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span key={i} className="text-[11px] bg-white px-2 py-1 rounded-sm border border-gray-200 shadow-sm text-gray-700">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-8">
            <h2 style={leftHeaderStyle}>Education</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-[12px] text-gray-800">{edu.degree}</h3>
                  <p className="text-[11px] text-gray-600 italic">{edu.institution}</p>
                  <p className="text-[10px] text-gray-500">{edu.startYear} - {edu.endYear}</p>
                  {edu.grade && <p className="text-[10px] text-gray-500 mt-0.5">Grade: {edu.grade}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {optionalSections?.languages && optionalSections.languages.length > 0 && (
          <div className="mb-8">
            <h2 style={leftHeaderStyle}>Languages</h2>
            <div className="space-y-1">
              {optionalSections.languages.map((l, i) => (
                <div key={i} className="text-[11px]">
                  <strong>{l.name}</strong> {l.proficiency && <span className="text-gray-500">- {l.proficiency}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {optionalSections?.certifications && optionalSections.certifications.length > 0 && (
          <div className="mb-8">
            <h2 style={leftHeaderStyle}>Certifications</h2>
            <div className="space-y-3">
              {optionalSections.certifications.map((cert) => (
                <div key={cert.id}>
                  <h3 className="font-bold text-[11px] text-gray-800 leading-tight">{cert.name}</h3>
                  <p className="text-[10px] text-gray-600">{cert.issuer}</p>
                  <p className="text-[10px] text-gray-500">{cert.issueDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column (70%) */}
      <div className="w-[70%] p-8 bg-white">
        
        {/* Summary */}
        {summary && (
          <div className="mb-8">
            <h2 style={rightHeaderStyle}>Profile</h2>
            <p className="text-[12px] leading-relaxed text-gray-700 whitespace-pre-wrap">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-8">
            <h2 style={rightHeaderStyle}>Experience</h2>
            <div className="space-y-5">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-[14px] text-gray-900">{exp.jobTitle}</h3>
                    <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="text-[13px] font-medium text-gray-700" style={{ color: accentColor }}>{exp.company}</p>
                    <span className="text-[11px] text-gray-500 italic">{exp.location}</span>
                  </div>
                  {exp.description && (
                    <p className="text-[12px] leading-relaxed whitespace-pre-wrap text-gray-700 pl-4" style={{ listStyleType: "circle", display: "list-item" }}>
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {optionalSections?.projects && optionalSections.projects.length > 0 && (
          <div className="mb-8">
            <h2 style={rightHeaderStyle}>Projects</h2>
            <div className="space-y-5">
              {optionalSections.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-[14px] text-gray-900">{proj.name}</h3>
                    {proj.link && <a href={proj.link} className="text-[11px] text-blue-600 underline">{proj.link.replace(/^https?:\/\//, '')}</a>}
                  </div>
                  {proj.techStack && <p className="text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">{proj.techStack}</p>}
                  {proj.description && (
                    <p className="text-[12px] leading-relaxed whitespace-pre-wrap text-gray-700 pl-4" style={{ listStyleType: "circle", display: "list-item" }}>
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Volunteer */}
        {optionalSections?.volunteer && optionalSections.volunteer.length > 0 && (
          <div className="mb-8">
            <h2 style={rightHeaderStyle}>Volunteer Experience</h2>
            <div className="space-y-4">
              {optionalSections.volunteer.map((vol) => (
                <div key={vol.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-[13px] text-gray-900">{vol.role}</h3>
                    <span className="text-[11px] text-gray-500">{vol.startDate} – {vol.endDate}</span>
                  </div>
                  <p className="text-[12px] font-medium" style={{ color: accentColor }}>{vol.organization}</p>
                  {vol.description && <p className="text-[12px] leading-relaxed whitespace-pre-wrap text-gray-700 mt-1">{vol.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Awards */}
        {optionalSections?.awards && optionalSections.awards.length > 0 && (
          <div className="mb-8">
            <h2 style={rightHeaderStyle}>Awards & Honors</h2>
            <div className="space-y-4">
              {optionalSections.awards.map((award) => (
                <div key={award.id}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-bold text-[13px] text-gray-900">{award.title}</h3>
                    <span className="text-[11px] text-gray-500">{award.date}</span>
                  </div>
                  <p className="text-[12px]" style={{ color: accentColor }}>{award.organization}</p>
                  {award.description && <p className="text-[12px] leading-relaxed whitespace-pre-wrap text-gray-700 mt-1">{award.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Publications */}
        {optionalSections?.publications && optionalSections.publications.length > 0 && (
          <div className="mb-8">
            <h2 style={rightHeaderStyle}>Publications</h2>
            <div className="space-y-4">
              {optionalSections.publications.map((pub) => (
                <div key={pub.id}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-bold text-[13px] text-gray-900">{pub.title}</h3>
                    <span className="text-[11px] text-gray-500">{pub.date}</span>
                  </div>
                  <p className="text-[12px] italic text-gray-600">Published by: <span style={{ color: accentColor }}>{pub.publisher}</span></p>
                  {pub.description && <p className="text-[12px] leading-relaxed whitespace-pre-wrap text-gray-700 mt-1">{pub.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
