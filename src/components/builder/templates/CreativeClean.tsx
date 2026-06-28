import { ResumeData } from "@/store/useResumeStore";

interface Props {
  resumeData: ResumeData;
  accentColor?: string;
}

export default function CreativeClean({ resumeData, accentColor = "#8b5cf6" }: Props) {
  const { personalInfo, experience, summary, education, skills, optionalSections } = resumeData;

  const sectionHeaderStyle = {
    fontSize: "18px",
    fontWeight: "bold" as const,
    color: "#111827",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  };

  const SectionTitle = ({ title }: { title: string }) => (
    <h2 style={sectionHeaderStyle}>
      <span className="w-8 h-1 rounded-full" style={{ backgroundColor: accentColor }}></span>
      {title}
    </h2>
  );

  return (
    <div
      className="bg-white font-sans text-left"
      style={{
        width: "816px",
        minHeight: "1056px",
        padding: "56px 64px",
        boxSizing: "border-box",
        color: "#4b5563",
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-end mb-10 pb-6" style={{ borderBottom: `2px dashed ${accentColor}40` }}>
        <div className="w-[60%]">
          <h1 className="font-extrabold tracking-tight mb-1 leading-none" style={{ fontSize: "36px", color: "#111827" }}>
            {personalInfo.fullName || "YOUR NAME"}
          </h1>
          {personalInfo.jobTitle && (
            <p className="text-[18px] font-medium" style={{ color: accentColor }}>
              {personalInfo.jobTitle}
            </p>
          )}
        </div>
        <div className="w-[40%] text-[11px] flex flex-col items-end gap-1 font-medium">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          <div className="flex gap-3 mt-1">
            {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="underline text-gray-400 hover:text-black">LinkedIn</a>}
            {personalInfo.portfolio && <a href={personalInfo.portfolio} className="underline text-gray-400 hover:text-black">Portfolio</a>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-10">
          <SectionTitle title="Profile" />
          <p className="text-[13px] leading-relaxed text-gray-700">{summary}</p>
        </div>
      )}

      {/* Experience - Timeline Layout */}
      {experience.length > 0 && (
        <div className="mb-10">
          <SectionTitle title="Experience" />
          <div className="relative pl-4 border-l-2 ml-4" style={{ borderColor: `${accentColor}30` }}>
            {experience.map((exp, index) => (
              <div key={exp.id} className={`${index !== experience.length - 1 ? 'mb-8' : ''} relative`}>
                <div 
                  className="absolute w-3 h-3 rounded-full border-2 border-white -left-[23px] top-1 shadow-sm" 
                  style={{ backgroundColor: accentColor }}
                ></div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[15px] text-gray-900">{exp.jobTitle}</h3>
                  <span className="text-[12px] font-semibold text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                    {exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2 text-[13px]">
                  <span className="font-medium text-gray-800">{exp.company}</span>
                  {exp.location && <><span className="text-gray-300">•</span><span className="italic text-gray-500">{exp.location}</span></>}
                </div>
                {exp.description && (
                  <p className="text-[12px] leading-relaxed whitespace-pre-wrap text-gray-600">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education - Timeline Layout */}
      {education.length > 0 && (
        <div className="mb-10">
          <SectionTitle title="Education" />
          <div className="relative pl-4 border-l-2 ml-4" style={{ borderColor: `${accentColor}30` }}>
            {education.map((edu, index) => (
              <div key={edu.id} className={`${index !== education.length - 1 ? 'mb-6' : ''} relative`}>
                <div 
                  className="absolute w-3 h-3 rounded-full border-2 border-white -left-[23px] top-1 shadow-sm" 
                  style={{ backgroundColor: accentColor }}
                ></div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[14px] text-gray-900">{edu.degree}</h3>
                  <span className="text-[11px] font-semibold text-gray-500">
                    {edu.startYear} - {edu.endYear}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="font-medium text-gray-700">{edu.institution}</span>
                  {edu.location && <><span className="text-gray-300">•</span><span className="italic text-gray-500">{edu.location}</span></>}
                </div>
                {edu.grade && <p className="text-[11px] text-gray-500 mt-1 font-semibold">Grade: {edu.grade}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-10">
          <SectionTitle title="Expertise" />
          <div className="flex flex-wrap gap-3">
            {skills.map((s, i) => (
              <span key={i} className="text-[12px] font-medium text-gray-700 border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm">
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {optionalSections?.projects && optionalSections.projects.length > 0 && (
        <div className="mb-10">
          <SectionTitle title="Projects" />
          <div className="grid grid-cols-2 gap-6">
            {optionalSections.projects.map((proj) => (
              <div key={proj.id} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[13px] text-gray-900">{proj.name}</h3>
                  {proj.link && <a href={proj.link} className="text-[11px] underline" style={{ color: accentColor }}>View</a>}
                </div>
                {proj.techStack && <p className="text-[11px] font-semibold text-gray-500 mb-2 uppercase tracking-wide">{proj.techStack}</p>}
                {proj.description && (
                  <p className="text-[11px] leading-relaxed whitespace-pre-wrap text-gray-600">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications & Languages grid */}
      <div className="grid grid-cols-2 gap-10 mb-10">
        {optionalSections?.certifications && optionalSections.certifications.length > 0 && (
          <div>
            <SectionTitle title="Certifications" />
            <div className="space-y-4">
              {optionalSections.certifications.map((cert) => (
                <div key={cert.id}>
                  <h3 className="font-bold text-[12px] text-gray-900">{cert.name}</h3>
                  <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                    <span>{cert.issuer}</span>
                    <span>{cert.issueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {optionalSections?.languages && optionalSections.languages.length > 0 && (
          <div>
            <SectionTitle title="Languages" />
            <div className="space-y-2">
              {optionalSections.languages.map((l, i) => (
                <div key={i} className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <strong className="text-[12px] text-gray-800">{l.name}</strong> 
                  {l.proficiency && <span className="text-[11px] font-medium" style={{ color: accentColor }}>{l.proficiency}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Awards */}
      {optionalSections?.awards && optionalSections.awards.length > 0 && (
        <div className="mb-10">
          <SectionTitle title="Awards" />
          <div className="space-y-4">
            {optionalSections.awards.map((award) => (
              <div key={award.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-[13px] text-gray-900">{award.title}</h3>
                  <span className="text-[11px] text-gray-500">{award.date}</span>
                </div>
                <p className="text-[12px] font-medium text-gray-700">{award.organization}</p>
                {award.description && <p className="text-[12px] leading-relaxed whitespace-pre-wrap text-gray-600 mt-1">{award.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Publications */}
      {optionalSections?.publications && optionalSections.publications.length > 0 && (
        <div className="mb-10">
          <SectionTitle title="Publications" />
          <div className="space-y-4">
            {optionalSections.publications.map((pub) => (
              <div key={pub.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-[13px] text-gray-900">{pub.title}</h3>
                  <span className="text-[11px] text-gray-500">{pub.date}</span>
                </div>
                <p className="text-[12px] italic text-gray-700">{pub.publisher}</p>
                {pub.description && <p className="text-[12px] leading-relaxed whitespace-pre-wrap text-gray-600 mt-1">{pub.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Volunteer - Timeline Layout */}
      {optionalSections?.volunteer && optionalSections.volunteer.length > 0 && (
        <div className="mb-10">
          <SectionTitle title="Volunteer" />
          <div className="relative pl-4 border-l-2 ml-4" style={{ borderColor: `${accentColor}30` }}>
            {optionalSections.volunteer.map((vol, index) => (
              <div key={vol.id} className={`${index !== optionalSections.volunteer.length - 1 ? 'mb-6' : ''} relative`}>
                <div 
                  className="absolute w-3 h-3 rounded-full border-2 border-white -left-[23px] top-1 shadow-sm" 
                  style={{ backgroundColor: accentColor }}
                ></div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[14px] text-gray-900">{vol.role}</h3>
                  <span className="text-[11px] font-semibold text-gray-500">
                    {vol.startDate} - {vol.endDate}
                  </span>
                </div>
                <p className="text-[12px] font-medium text-gray-700 mb-1">{vol.organization}</p>
                {vol.description && (
                  <p className="text-[12px] leading-relaxed whitespace-pre-wrap text-gray-600">
                    {vol.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
