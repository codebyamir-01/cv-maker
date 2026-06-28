import { ResumeData } from "@/store/useResumeStore";
import { Phone, Mail, MapPin, Globe, Calendar, Link2 } from "lucide-react";

interface Props {
  resumeData: ResumeData;
  accentColor?: string;
}

export default function StartupLeader({ resumeData, accentColor = "#111827" }: Props) {
  const { personalInfo, experience, summary, education, skills, optionalSections } = resumeData;

  const sectionHeaderStyle = {
    fontSize: "15px",
    fontWeight: "bold" as const,
    textTransform: "uppercase" as const,
    borderBottom: "2px solid #111827",
    marginBottom: "12px",
    paddingBottom: "4px",
    color: "#111827",
    letterSpacing: "1px",
    marginTop: "20px"
  };

  const IconWrapper = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center justify-center mr-1.5 opacity-70">
      {children}
    </span>
  );

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
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-extrabold uppercase mb-1 leading-none tracking-tight" style={{ fontSize: "32px", color: "#111827" }}>
          {personalInfo.fullName || "YOUR FULL NAME"}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-[15px] font-bold text-gray-600 mb-3">
            {personalInfo.jobTitle}
          </p>
        )}
        <div className="grid grid-cols-3 gap-y-2 text-[11px] font-medium text-gray-800">
          {personalInfo.phone && (
            <div className="flex items-center">
              <IconWrapper><Phone size={12} /></IconWrapper> {personalInfo.phone}
            </div>
          )}
          {personalInfo.email && (
            <div className="flex items-center">
              <IconWrapper><Mail size={12} /></IconWrapper> {personalInfo.email}
            </div>
          )}
          {personalInfo.linkedIn && (
            <div className="flex items-center">
              <IconWrapper><Link2 size={12} /></IconWrapper> {personalInfo.linkedIn.replace(/^https?:\/\//, '')}
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center">
              <IconWrapper><MapPin size={12} /></IconWrapper> {personalInfo.location}
            </div>
          )}
          {personalInfo.portfolio && (
            <div className="flex items-center">
              <IconWrapper><Globe size={12} /></IconWrapper> {personalInfo.portfolio.replace(/^https?:\/\//, '')}
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center">
              <IconWrapper><Link2 size={12} /></IconWrapper> {personalInfo.github.replace(/^https?:\/\//, '')}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div>
          <h2 style={sectionHeaderStyle}>Summary of Qualifications</h2>
          <p className="text-[12px] leading-relaxed text-gray-700 font-medium">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Experience</h2>
          <div className="space-y-0">
            {experience.map((exp, index) => (
              <div key={exp.id}>
                {index > 0 && <div className="w-full border-t border-dotted border-gray-300 my-4"></div>}
                <div className="mb-1">
                  <h3 className="text-[16px] font-normal text-gray-800 tracking-wide mb-1">{exp.jobTitle}</h3>
                  <div className="font-bold text-[13px] text-gray-900 mb-1">{exp.company}</div>
                  <div className="flex items-center gap-4 text-[11px] text-gray-500 font-semibold mb-2">
                    <div className="flex items-center">
                      <IconWrapper><Calendar size={11} /></IconWrapper>
                      {exp.startDate} - {exp.currentlyWorking ? "Ongoing" : exp.endDate}
                    </div>
                    {exp.location && (
                      <div className="flex items-center">
                        <IconWrapper><MapPin size={11} /></IconWrapper>
                        {exp.location}
                      </div>
                    )}
                  </div>
                </div>
                {exp.description && (
                  <div className="text-[12px] leading-relaxed whitespace-pre-wrap text-gray-700 pl-4" style={{ listStyleType: "disc", display: "list-item" }}>
                    {exp.description}
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
            {education.map((edu, index) => (
              <div key={edu.id}>
                {index > 0 && <div className="w-full border-t border-dotted border-gray-300 my-3"></div>}
                <h3 className="text-[15px] font-normal text-gray-800 tracking-wide mb-1">{edu.degree}</h3>
                <div className="font-bold text-[13px] text-gray-900 mb-1">{edu.institution}</div>
                <div className="flex items-center gap-4 text-[11px] text-gray-500 font-semibold mb-1">
                  <div className="flex items-center">
                    <IconWrapper><Calendar size={11} /></IconWrapper>
                    {edu.startYear} - {edu.endYear}
                  </div>
                  {edu.location && (
                    <div className="flex items-center">
                      <IconWrapper><MapPin size={11} /></IconWrapper>
                      {edu.location}
                    </div>
                  )}
                </div>
                {edu.grade && <div className="text-[11px] text-gray-700 font-medium mt-1">Grade: {edu.grade}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications (Two Column) */}
      {optionalSections?.certifications && optionalSections.certifications.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Certification</h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {optionalSections.certifications.map((cert) => (
              <div key={cert.id}>
                <div className="font-bold text-[12px] text-gray-800 mb-0.5">{cert.name}</div>
                <div className="text-[11px] text-gray-500 font-medium flex justify-between">
                  <span>{cert.issuer}</span>
                  <span>{cert.issueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technical Skills */}
      {skills.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Technical Skills</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-3">
            {skills.map((s, i) => (
              <div key={i} className="text-[12px] font-bold text-gray-800 border-b-[2px] border-gray-300 pb-0.5">
                {s.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other Optional Sections */}
      {/* Projects */}
      {optionalSections?.projects && optionalSections.projects.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Projects</h2>
          <div className="space-y-4">
            {optionalSections.projects.map((proj, index) => (
              <div key={proj.id}>
                {index > 0 && <div className="w-full border-t border-dotted border-gray-300 my-3"></div>}
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-[15px] font-normal text-gray-800 tracking-wide">{proj.name}</h3>
                  {proj.link && <a href={proj.link} className="text-[11px] underline text-gray-500">View Project</a>}
                </div>
                {proj.techStack && <div className="font-bold text-[11px] text-gray-900 mb-2 uppercase">{proj.techStack}</div>}
                {proj.description && (
                  <div className="text-[12px] leading-relaxed whitespace-pre-wrap text-gray-700 pl-4" style={{ listStyleType: "disc", display: "list-item" }}>
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
          <div className="space-y-4">
            {optionalSections.publications.map((pub, index) => (
              <div key={pub.id}>
                {index > 0 && <div className="w-full border-t border-dotted border-gray-300 my-3"></div>}
                <h3 className="text-[14px] font-normal text-gray-800 tracking-wide mb-0.5">{pub.title}</h3>
                <div className="flex justify-between text-[11px] text-gray-500 font-semibold mb-1">
                  <span>{pub.publisher}</span>
                  <span>{pub.date}</span>
                </div>
                {pub.description && <div className="text-[12px] text-gray-700">{pub.description}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Volunteer */}
      {optionalSections?.volunteer && optionalSections.volunteer.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Volunteer Experience</h2>
          <div className="space-y-4">
            {optionalSections.volunteer.map((vol, index) => (
              <div key={vol.id}>
                {index > 0 && <div className="w-full border-t border-dotted border-gray-300 my-3"></div>}
                <h3 className="text-[14px] font-normal text-gray-800 tracking-wide mb-0.5">{vol.role}</h3>
                <div className="flex justify-between text-[11px] text-gray-500 font-semibold mb-1">
                  <span className="font-bold text-gray-900">{vol.organization}</span>
                  <span>{vol.startDate} - {vol.endDate}</span>
                </div>
                {vol.description && <div className="text-[12px] text-gray-700">{vol.description}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Awards */}
      {optionalSections?.awards && optionalSections.awards.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Awards</h2>
          <div className="space-y-4">
            {optionalSections.awards.map((award, index) => (
              <div key={award.id}>
                {index > 0 && <div className="w-full border-t border-dotted border-gray-300 my-3"></div>}
                <h3 className="text-[14px] font-bold text-gray-800 mb-0.5">{award.title}</h3>
                <div className="flex justify-between text-[11px] text-gray-500 font-semibold mb-1">
                  <span>{award.organization}</span>
                  <span>{award.date}</span>
                </div>
                {award.description && <div className="text-[12px] text-gray-700">{award.description}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {optionalSections?.languages && optionalSections.languages.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Languages</h2>
          <div className="grid grid-cols-2 gap-y-2">
            {optionalSections.languages.map((l, i) => (
              <div key={i} className="text-[12px] font-bold text-gray-800">
                {l.name} {l.proficiency && <span className="text-gray-500 font-medium ml-1">({l.proficiency})</span>}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
