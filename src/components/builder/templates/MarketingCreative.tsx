import { ResumeData } from "@/store/useResumeStore";

interface Props {
  resumeData: ResumeData;
  accentColor?: string;
}

export default function MarketingCreative({ resumeData, accentColor = "#e11d48" }: Props) {
  const { personalInfo, experience, summary, education, skills, optionalSections } = resumeData;

  const sectionHeaderStyle = {
    fontSize: "16px",
    fontWeight: "bold" as const,
    textTransform: "uppercase" as const,
    color: accentColor,
    borderBottom: `2px solid ${accentColor}40`, // 25% opacity border
    marginBottom: "16px",
    paddingBottom: "4px",
    letterSpacing: "1px"
  };

  return (
    <div
      className="bg-white font-sans text-left"
      style={{
        width: "816px",
        minHeight: "1056px",
        boxSizing: "border-box",
        color: "#1f2937",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Header Block */}
      <div 
        className="w-full text-center flex flex-col justify-center items-center text-white" 
        style={{ 
          backgroundColor: accentColor, 
          padding: "40px 60px",
          minHeight: "180px"
        }}
      >
        <h1 className="font-bold uppercase tracking-widest mb-1" style={{ fontSize: "32px", letterSpacing: "3px" }}>
          {personalInfo.fullName || "YOUR FULL NAME"}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-[16px] font-medium tracking-wide mb-4 opacity-90">
            {personalInfo.jobTitle}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-4 text-[12px] opacity-80">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        {(personalInfo.linkedIn || personalInfo.portfolio) && (
          <div className="flex flex-wrap justify-center gap-4 mt-2 text-[12px] opacity-80">
            {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="hover:underline">{personalInfo.linkedIn.replace(/^https?:\/\//, '')}</a>}
            {personalInfo.portfolio && <a href={personalInfo.portfolio} className="hover:underline">{personalInfo.portfolio.replace(/^https?:\/\//, '')}</a>}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="p-12 flex-grow">
        
        {/* Summary */}
        {summary && (
          <div className="mb-8">
            <h2 style={sectionHeaderStyle}>About Me</h2>
            <p className="text-[13px] leading-relaxed text-gray-700 whitespace-pre-wrap">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-8">
            <h2 style={sectionHeaderStyle}>Experience</h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2" style={{ borderColor: accentColor }}>
                  <div className="absolute w-2 h-2 rounded-full -left-[5px] top-1.5" style={{ backgroundColor: accentColor }}></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-[15px] text-gray-900">{exp.jobTitle}</h3>
                    <span className="text-[12px] font-bold" style={{ color: accentColor }}>
                      {exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="text-[13px] font-medium text-gray-700">{exp.company}</p>
                    <span className="text-[11px] text-gray-500">{exp.location}</span>
                  </div>
                  {exp.description && (
                    <p className="text-[12px] leading-relaxed whitespace-pre-wrap text-gray-600 mt-2">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Two Column Split for Bottom Section */}
        <div className="flex gap-10 mt-8">
          {/* Left Column in Bottom Grid */}
          <div className="w-1/2">
            {/* Education */}
            {education.length > 0 && (
              <div className="mb-8">
                <h2 style={sectionHeaderStyle}>Education</h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-[14px] text-gray-900">{edu.degree}</h3>
                      <p className="text-[12px] text-gray-700 font-medium">{edu.institution}</p>
                      <div className="flex justify-between items-center text-[11px] text-gray-500 mt-1">
                        <span>{edu.startYear} - {edu.endYear}</span>
                        <span>{edu.location}</span>
                      </div>
                      {edu.grade && <p className="text-[11px] text-gray-600 mt-1 font-semibold">GPA: {edu.grade}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {optionalSections?.certifications && optionalSections.certifications.length > 0 && (
              <div className="mb-8">
                <h2 style={sectionHeaderStyle}>Certifications</h2>
                <div className="space-y-3">
                  {optionalSections.certifications.map((cert) => (
                    <div key={cert.id} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <h3 className="font-bold text-[12px] text-gray-900">{cert.name}</h3>
                      <p className="text-[11px] text-gray-600">{cert.issuer}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{cert.issueDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {optionalSections?.languages && optionalSections.languages.length > 0 && (
              <div className="mb-8">
                <h2 style={sectionHeaderStyle}>Languages</h2>
                <div className="flex flex-wrap gap-2">
                  {optionalSections.languages.map((l, i) => (
                    <span key={i} className="text-[11px] bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full font-medium">
                      {l.name} {l.proficiency && <span className="opacity-70">({l.proficiency})</span>}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column in Bottom Grid */}
          <div className="w-1/2">
            {/* Skills */}
            {skills.length > 0 && (
              <div className="mb-8">
                <h2 style={sectionHeaderStyle}>Core Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s, i) => (
                    <span key={i} className="text-[12px] font-medium text-white px-3 py-1.5 rounded-full shadow-sm" style={{ backgroundColor: accentColor }}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {optionalSections?.projects && optionalSections.projects.length > 0 && (
              <div className="mb-8">
                <h2 style={sectionHeaderStyle}>Projects</h2>
                <div className="space-y-5">
                  {optionalSections.projects.map((proj) => (
                    <div key={proj.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-[14px] text-gray-900">{proj.name}</h3>
                        {proj.link && <a href={proj.link} className="text-[10px] text-blue-600 underline">Link</a>}
                      </div>
                      {proj.techStack && <p className="text-[11px] font-semibold text-gray-500 mb-2 uppercase">{proj.techStack}</p>}
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

            {/* Awards */}
            {optionalSections?.awards && optionalSections.awards.length > 0 && (
              <div className="mb-8">
                <h2 style={sectionHeaderStyle}>Awards</h2>
                <div className="space-y-4">
                  {optionalSections.awards.map((award) => (
                    <div key={award.id}>
                      <h3 className="font-bold text-[13px] text-gray-900">{award.title}</h3>
                      <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                        <span>{award.organization}</span>
                        <span>{award.date}</span>
                      </div>
                      {award.description && <p className="text-[11px] leading-relaxed whitespace-pre-wrap text-gray-600 mt-1">{award.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Publications */}
            {optionalSections?.publications && optionalSections.publications.length > 0 && (
              <div className="mb-8">
                <h2 style={sectionHeaderStyle}>Publications</h2>
                <div className="space-y-4">
                  {optionalSections.publications.map((pub) => (
                    <div key={pub.id}>
                      <h3 className="font-bold text-[13px] text-gray-900">{pub.title}</h3>
                      <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                        <span>{pub.publisher}</span>
                        <span>{pub.date}</span>
                      </div>
                      {pub.description && <p className="text-[11px] leading-relaxed whitespace-pre-wrap text-gray-600 mt-1">{pub.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Volunteer */}
            {optionalSections?.volunteer && optionalSections.volunteer.length > 0 && (
              <div className="mb-8">
                <h2 style={sectionHeaderStyle}>Volunteer</h2>
                <div className="space-y-4">
                  {optionalSections.volunteer.map((vol) => (
                    <div key={vol.id}>
                      <h3 className="font-bold text-[13px] text-gray-900">{vol.role}</h3>
                      <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                        <span>{vol.organization}</span>
                        <span>{vol.startDate} - {vol.endDate}</span>
                      </div>
                      {vol.description && <p className="text-[11px] leading-relaxed whitespace-pre-wrap text-gray-600 mt-1">{vol.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
