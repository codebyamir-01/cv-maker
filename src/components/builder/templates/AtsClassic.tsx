import { ResumeData } from "@/store/useResumeStore";

interface Props {
  resumeData: ResumeData;
  accentColor?: string;
}

export default function AtsClassic({ resumeData, accentColor = "#0d9488" }: Props) {
  const { personalInfo, experience, summary } = resumeData;

  return (
    <div
      className="bg-white font-sans text-slate-900"
      style={{
        width: "816px",        // 8.5 inches at 96dpi
        minHeight: "1056px",   // 11 inches at 96dpi
        padding: "52px 52px",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div className="text-center mb-5 pb-4" style={{ borderBottom: `2px solid ${accentColor}` }}>
        <h1 className="font-bold uppercase tracking-[4px] mb-1" style={{ fontSize: "22px", color: accentColor }}>
          {personalInfo.fullName || "YOUR FULL NAME"}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-[12px] uppercase tracking-widest font-semibold text-slate-600 mb-2">
            {personalInfo.jobTitle}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-x-2 text-[11px] text-slate-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <><span className="text-slate-300">|</span><span>{personalInfo.phone}</span></>}
          {personalInfo.location && <><span className="text-slate-300">|</span><span>{personalInfo.location}</span></>}
        </div>
        {(personalInfo.linkedIn || personalInfo.github || personalInfo.portfolio) && (
          <div className="flex flex-wrap justify-center gap-x-2 mt-1 text-[11px]">
            {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="underline" style={{ color: accentColor }}>LinkedIn</a>}
            {personalInfo.github && <a href={personalInfo.github} className="underline" style={{ color: accentColor }}>GitHub</a>}
            {personalInfo.portfolio && <a href={personalInfo.portfolio} className="underline" style={{ color: accentColor }}>Portfolio</a>}
          </div>
        )}
      </div>

      {/* Professional Summary */}
      <div className="mb-5">
        <h2 className="font-bold uppercase tracking-[2px] mb-2 pb-[2px]" style={{ fontSize: "11px", color: accentColor, borderBottom: `1.5px solid ${accentColor}` }}>
          Professional Summary
        </h2>
        <p className="text-[11px] leading-relaxed text-slate-700">
          {summary || "add summary"}
        </p>
      </div>

      {/* Professional Experience */}
      <div className="mb-5">
        <h2 className="font-bold uppercase tracking-[2px] mb-3 pb-[2px]" style={{ fontSize: "11px", color: accentColor, borderBottom: `1.5px solid ${accentColor}` }}>
          Professional Experience
        </h2>
        {experience.length === 0 ? (
          <p className="text-[11px] text-slate-400 italic">Experience will appear here...</p>
        ) : (
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[12px] text-slate-900">{exp.jobTitle}</h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-1.5">
                  <p className="text-[11px] italic text-slate-600">{exp.company}</p>
                  <span className="text-[11px] text-slate-500">{exp.location}</span>
                </div>
                {exp.description && (
                  <p className="text-[11px] leading-relaxed text-slate-700 whitespace-pre-wrap">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Education */}
      <div className="mb-5">
        <h2 className="font-bold uppercase tracking-[2px] mb-3 pb-[2px]" style={{ fontSize: "11px", color: accentColor, borderBottom: `1.5px solid ${accentColor}` }}>
          Education
        </h2>
        {resumeData.education.length === 0 ? (
          <p className="text-[11px] text-slate-400 italic">Education will appear here...</p>
        ) : (
          <div className="space-y-4">
            {resumeData.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[12px] text-slate-900">{edu.degree}</h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {edu.startYear} {edu.startYear && edu.endYear ? "-" : ""} {edu.endYear}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mt-0.5">
                  <p className="text-[11px] italic text-slate-600">{edu.institution}</p>
                  <span className="text-[11px] text-slate-500">{edu.location}</span>
                </div>
                {edu.grade && <p className="text-[11px] text-slate-500 mt-0.5">Grade: {edu.grade}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Skills */}
      <div className="mb-5">
        <h2 className="font-bold uppercase tracking-[2px] mb-3 pb-[2px]" style={{ fontSize: "11px", color: accentColor, borderBottom: `1.5px solid ${accentColor}` }}>
          Skills
        </h2>
        {resumeData.skills.length === 0 ? (
          <p className="text-[11px] text-slate-400 italic">Skills will appear here...</p>
        ) : (
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {resumeData.skills.map((skill) => (
              <span key={skill.id} className="text-[11px] text-slate-700">
                • {skill.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Optional Sections */}
      {resumeData.optionalSections?.projects && resumeData.optionalSections.projects.length > 0 && (
        <div className="mb-5">
          <h2 className="font-bold uppercase tracking-[2px] mb-3 pb-[2px]" style={{ fontSize: "11px", color: accentColor, borderBottom: `1.5px solid ${accentColor}` }}>
            Projects
          </h2>
          <div className="space-y-4">
            {resumeData.optionalSections.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[12px] text-slate-900">{proj.name}</h3>
                  {proj.link && (
                    <a href={proj.link} className="text-[11px] text-blue-600 underline">
                      {proj.link.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                </div>
                {proj.techStack && (
                  <p className="text-[11px] text-slate-600 font-medium mb-1">{proj.techStack}</p>
                )}
                {proj.description && (
                  <p className="text-[11px] leading-relaxed text-slate-700 whitespace-pre-wrap">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {resumeData.optionalSections?.certifications && resumeData.optionalSections.certifications.length > 0 && (
        <div className="mb-5">
          <h2 className="font-bold uppercase tracking-[2px] mb-3 pb-[2px]" style={{ fontSize: "11px", color: accentColor, borderBottom: `1.5px solid ${accentColor}` }}>
            Certifications
          </h2>
          <div className="space-y-4">
            {resumeData.optionalSections.certifications.map((cert) => (
              <div key={cert.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[12px] text-slate-900">{cert.name}</h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {cert.issueDate} {cert.expiryDate ? `- ${cert.expiryDate}` : ''}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <p className="text-[11px] italic text-slate-600">{cert.issuer}</p>
                  {cert.link && (
                    <a href={cert.link} className="text-[11px] text-blue-600 underline">View Credential</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {resumeData.optionalSections?.languages && resumeData.optionalSections.languages.length > 0 && (
        <div className="mb-5">
          <h2 className="font-bold uppercase tracking-[2px] mb-3 pb-[2px]" style={{ fontSize: "11px", color: accentColor, borderBottom: `1.5px solid ${accentColor}` }}>
            Languages
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {resumeData.optionalSections.languages.map((lang) => (
              <span key={lang.id} className="text-[11px] text-slate-700">
                <span className="font-bold">{lang.name}</span>
                {lang.proficiency && <span className="text-slate-500 ml-1">({lang.proficiency})</span>}
              </span>
            ))}
          </div>
        </div>
      )}

      {resumeData.optionalSections?.awards && resumeData.optionalSections.awards.length > 0 && (
        <div className="mb-5">
          <h2 className="font-bold uppercase tracking-[2px] mb-3 pb-[2px]" style={{ fontSize: "11px", color: accentColor, borderBottom: `1.5px solid ${accentColor}` }}>
            Awards
          </h2>
          <div className="space-y-4">
            {resumeData.optionalSections.awards.map((award) => (
              <div key={award.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[12px] text-slate-900">{award.title}</h3>
                  <span className="text-[11px] text-slate-500 font-medium">{award.date}</span>
                </div>
                <p className="text-[11px] italic text-slate-600 mb-1">{award.organization}</p>
                {award.description && (
                  <p className="text-[11px] leading-relaxed text-slate-700 whitespace-pre-wrap">{award.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {resumeData.optionalSections?.volunteer && resumeData.optionalSections.volunteer.length > 0 && (
        <div className="mb-5">
          <h2 className="font-bold uppercase tracking-[2px] mb-3 pb-[2px]" style={{ fontSize: "11px", color: accentColor, borderBottom: `1.5px solid ${accentColor}` }}>
            Volunteer Experience
          </h2>
          <div className="space-y-4">
            {resumeData.optionalSections.volunteer.map((vol) => (
              <div key={vol.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[12px] text-slate-900">{vol.role}</h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {vol.startDate} - {vol.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-1.5">
                  <p className="text-[11px] italic text-slate-600">{vol.organization}</p>
                  <span className="text-[11px] text-slate-500">{vol.location}</span>
                </div>
                {vol.description && (
                  <p className="text-[11px] leading-relaxed text-slate-700 whitespace-pre-wrap">{vol.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {resumeData.optionalSections?.publications && resumeData.optionalSections.publications.length > 0 && (
        <div className="mb-5">
          <h2 className="font-bold uppercase tracking-[2px] mb-3 pb-[2px]" style={{ fontSize: "11px", color: accentColor, borderBottom: `1.5px solid ${accentColor}` }}>
            Publications
          </h2>
          <div className="space-y-4">
            {resumeData.optionalSections.publications.map((pub) => (
              <div key={pub.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[12px] text-slate-900">{pub.title}</h3>
                  <span className="text-[11px] text-slate-500 font-medium">{pub.date}</span>
                </div>
                <div className="flex justify-between items-baseline mb-1">
                  <p className="text-[11px] italic text-slate-600">{pub.publisher}</p>
                  {pub.link && (
                    <a href={pub.link} className="text-[11px] text-blue-600 underline">View Publication</a>
                  )}
                </div>
                {pub.description && (
                  <p className="text-[11px] leading-relaxed text-slate-700 whitespace-pre-wrap">{pub.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
