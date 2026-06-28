import { ResumeData } from "@/store/useResumeStore";

interface Props {
  resumeData: ResumeData;
  accentColor?: string;
}

export default function GraduateStarter({ resumeData, accentColor = "#10b981" }: Props) {
  const { personalInfo, experience, summary, education, skills, optionalSections } = resumeData;

  const sectionHeaderStyle = {
    fontSize: "15px",
    fontWeight: "bold" as const,
    textTransform: "uppercase" as const,
    color: "#111827",
    borderBottom: `2px solid ${accentColor}`,
    marginBottom: "16px",
    paddingBottom: "4px",
    letterSpacing: "0.5px",
    display: "inline-block",
  };

  return (
    <div
      className="bg-white font-sans text-left"
      style={{
        width: "816px",
        minHeight: "1056px",
        padding: "48px 56px",
        boxSizing: "border-box",
        color: "#374151",
      }}
    >
      {/* Split Header */}
      <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
        <div className="w-[60%]">
          <h1 className="font-bold uppercase mb-1" style={{ fontSize: "32px", color: accentColor, lineHeight: "1.1" }}>
            {personalInfo.fullName || "YOUR FULL NAME"}
          </h1>
          {personalInfo.jobTitle && (
            <p className="text-[16px] font-medium text-gray-700 tracking-wide">
              {personalInfo.jobTitle}
            </p>
          )}
        </div>
        
        <div className="w-[35%] bg-gray-50 p-4 rounded-lg border border-gray-100 text-[11px] leading-relaxed flex flex-col gap-1">
          {personalInfo.email && <div className="flex items-center gap-2"><span className="font-bold w-12 text-gray-400">EMAIL</span> <span>{personalInfo.email}</span></div>}
          {personalInfo.phone && <div className="flex items-center gap-2"><span className="font-bold w-12 text-gray-400">PHONE</span> <span>{personalInfo.phone}</span></div>}
          {personalInfo.location && <div className="flex items-center gap-2"><span className="font-bold w-12 text-gray-400">LOC</span> <span>{personalInfo.location}</span></div>}
          {personalInfo.linkedIn && <div className="flex items-center gap-2"><span className="font-bold w-12 text-gray-400">LINKEDIN</span> <a href={personalInfo.linkedIn} className="underline">{personalInfo.linkedIn.replace(/^https?:\/\//, '')}</a></div>}
          {personalInfo.portfolio && <div className="flex items-center gap-2"><span className="font-bold w-12 text-gray-400">WEB</span> <a href={personalInfo.portfolio} className="underline">{personalInfo.portfolio.replace(/^https?:\/\//, '')}</a></div>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-8">
          <h2 style={sectionHeaderStyle}>Professional Summary</h2>
          <p className="text-[13px] leading-relaxed text-gray-700">{summary}</p>
        </div>
      )}

      {/* Grid Layout for the rest */}
      <div className="flex gap-10">
        
        {/* Left Column - Main Content */}
        <div className="w-[65%]">
          
          {/* Education (Placed high for graduates) */}
          {education.length > 0 && (
            <div className="mb-8">
              <div className="w-full border-b-2 border-gray-100 mb-4">
                <h2 style={sectionHeaderStyle}>Education</h2>
              </div>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="relative pl-4 border-l-[3px]" style={{ borderColor: accentColor }}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-[14px] text-gray-900">{edu.degree}</h3>
                      <span className="text-[12px] font-semibold text-gray-500">
                        {edu.startYear} - {edu.endYear}
                      </span>
                    </div>
                    <div className="text-[13px] font-medium text-gray-700 mb-1">{edu.institution}</div>
                    <div className="flex justify-between items-center text-[11px] text-gray-500">
                      <span>{edu.location}</span>
                      {edu.grade && <span className="font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">GPA: {edu.grade}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-8">
              <div className="w-full border-b-2 border-gray-100 mb-4">
                <h2 style={sectionHeaderStyle}>Experience</h2>
              </div>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-[14px] text-gray-900">{exp.jobTitle}</h3>
                      <span className="text-[12px] font-semibold text-gray-500">
                        {exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline mb-2">
                      <p className="text-[13px] font-medium text-gray-700">{exp.company}</p>
                      <span className="text-[11px] text-gray-500">{exp.location}</span>
                    </div>
                    {exp.description && (
                      <p className="text-[12px] leading-relaxed whitespace-pre-wrap text-gray-600 pl-4" style={{ listStyleType: "circle", display: "list-item" }}>
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects (Crucial for graduates) */}
          {optionalSections?.projects && optionalSections.projects.length > 0 && (
            <div className="mb-8">
              <div className="w-full border-b-2 border-gray-100 mb-4">
                <h2 style={sectionHeaderStyle}>Key Projects</h2>
              </div>
              <div className="space-y-5">
                {optionalSections.projects.map((proj) => (
                  <div key={proj.id} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-[13px] text-gray-900">{proj.name}</h3>
                      {proj.link && <a href={proj.link} className="text-[11px] text-blue-600 underline font-medium">View Project</a>}
                    </div>
                    {proj.techStack && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {proj.techStack.split(',').map((tech, i) => (
                          <span key={i} className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-600 uppercase tracking-wide">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                    {proj.description && (
                      <p className="text-[12px] leading-relaxed whitespace-pre-wrap text-gray-600">
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
              <div className="w-full border-b-2 border-gray-100 mb-4">
                <h2 style={sectionHeaderStyle}>Volunteer & Leadership</h2>
              </div>
              <div className="space-y-4">
                {optionalSections.volunteer.map((vol) => (
                  <div key={vol.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-[13px] text-gray-900">{vol.role}</h3>
                      <span className="text-[11px] text-gray-500">{vol.startDate} – {vol.endDate}</span>
                    </div>
                    <p className="text-[12px] font-medium text-gray-700">{vol.organization}</p>
                    {vol.description && <p className="text-[12px] leading-relaxed whitespace-pre-wrap text-gray-600 mt-1">{vol.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column - Secondary Info */}
        <div className="w-[35%]">
          
          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-8">
              <div className="w-full border-b-2 border-gray-100 mb-4">
                <h2 style={sectionHeaderStyle}>Skills</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <span key={i} className="text-[12px] font-medium text-white px-3 py-1.5 rounded-full shadow-sm w-full text-center" style={{ backgroundColor: accentColor }}>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {optionalSections?.certifications && optionalSections.certifications.length > 0 && (
            <div className="mb-8">
              <div className="w-full border-b-2 border-gray-100 mb-4">
                <h2 style={sectionHeaderStyle}>Certifications</h2>
              </div>
              <div className="space-y-3">
                {optionalSections.certifications.map((cert) => (
                  <div key={cert.id}>
                    <h3 className="font-bold text-[12px] text-gray-900 leading-tight">{cert.name}</h3>
                    <p className="text-[11px] text-gray-600 mt-0.5">{cert.issuer}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{cert.issueDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {optionalSections?.languages && optionalSections.languages.length > 0 && (
            <div className="mb-8">
              <div className="w-full border-b-2 border-gray-100 mb-4">
                <h2 style={sectionHeaderStyle}>Languages</h2>
              </div>
              <div className="space-y-2">
                {optionalSections.languages.map((l, i) => (
                  <div key={i} className="text-[12px] bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 flex justify-between">
                    <strong className="text-gray-800">{l.name}</strong> 
                    {l.proficiency && <span className="text-gray-500 text-[11px]">{l.proficiency}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Awards */}
          {optionalSections?.awards && optionalSections.awards.length > 0 && (
            <div className="mb-8">
              <div className="w-full border-b-2 border-gray-100 mb-4">
                <h2 style={sectionHeaderStyle}>Awards</h2>
              </div>
              <div className="space-y-4">
                {optionalSections.awards.map((award) => (
                  <div key={award.id}>
                    <h3 className="font-bold text-[12px] text-gray-900 leading-tight">{award.title}</h3>
                    <p className="text-[11px] text-gray-600 mt-1">{award.organization}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{award.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Publications */}
          {optionalSections?.publications && optionalSections.publications.length > 0 && (
            <div className="mb-8">
              <div className="w-full border-b-2 border-gray-100 mb-4">
                <h2 style={sectionHeaderStyle}>Publications</h2>
              </div>
              <div className="space-y-4">
                {optionalSections.publications.map((pub) => (
                  <div key={pub.id}>
                    <h3 className="font-bold text-[12px] text-gray-900 leading-tight">{pub.title}</h3>
                    <p className="text-[11px] text-gray-600 mt-1">By: {pub.publisher}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{pub.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
