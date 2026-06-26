import { ResumeData } from "@/store/useResumeStore";

interface Props {
  resumeData: ResumeData;
  accentColor?: string;
}

export default function Monochrome({ resumeData, accentColor = "#000000" }: Props) {
  const { personalInfo, experience, education, skills, summary } = resumeData;

  return (
    <div
      className="bg-white font-serif text-slate-900 text-left"
      style={{
        width: "816px",
        minHeight: "1056px",
        padding: "60px",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="font-bold text-3xl mb-1" style={{ color: accentColor }}>
          {personalInfo.fullName || "Jessie Smith"}
        </h1>
        {personalInfo.jobTitle && (
          <p className="font-bold text-sm text-slate-800 mb-2">
            {personalInfo.jobTitle}
          </p>
        )}
        <div className="flex flex-wrap justify-between text-xs text-slate-600 mt-2 px-2">
          <div className="flex gap-2">
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
          </div>
          <div>
            {personalInfo.email && <span>{personalInfo.email}</span>}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-5">
        <h2 className="font-bold text-sm mb-2 pb-1" style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}>
          Summary
        </h2>
        <p className="text-xs leading-relaxed text-slate-800">
          {summary || "Experienced professional with a proven track record..."}
        </p>
      </div>

      {/* Experience */}
      <div className="mb-5">
        <h2 className="font-bold text-sm mb-3 pb-1" style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}>
          Experience
        </h2>
        <div className="space-y-4">
          {experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-xs text-slate-900">{exp.jobTitle}</h3>
                <span className="text-xs italic text-slate-700">
                  {exp.startDate} — {exp.currentlyWorking ? "Present" : exp.endDate}
                </span>
              </div>
              <div className="mb-1.5">
                <p className="text-xs italic text-slate-800">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
              </div>
              {exp.description && (
                <ul className="list-disc pl-5 text-xs text-slate-800 space-y-1">
                  {exp.description.split('\n').filter(Boolean).map((line, i) => (
                    <li key={i}>{line.replace(/^[-•]\s*/, '')}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-5">
        <h2 className="font-bold text-sm mb-3 pb-1" style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}>
          Education
        </h2>
        <div className="space-y-3">
          {education.map((ed) => (
            <div key={ed.id}>
              <div className="flex justify-between text-xs">
                <span className="text-slate-900">{ed.degree}, {ed.institution}{ed.location ? `, ${ed.location}` : ''}</span>
                <span className="italic text-slate-700">{ed.startYear} — {ed.endYear}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-5">
        <h2 className="font-bold text-sm mb-3 pb-1" style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}>
          Skills
        </h2>
        <ul className="list-disc pl-5 text-xs text-slate-800 space-y-1 font-bold flex flex-wrap gap-x-6">
          {skills.map((skill) => (
            <li key={skill.id} className="w-1/3">{skill.name}</li>
          ))}
        </ul>
      </div>

      {/* Projects */}
      {resumeData.optionalSections?.projects && resumeData.optionalSections.projects.length > 0 && (
        <div className="mb-5">
          <h2 className="font-bold text-sm mb-3 pb-1" style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}>
            Projects
          </h2>
          <div className="space-y-4">
            {resumeData.optionalSections.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-xs text-slate-900">{proj.name}</h3>
                  {proj.link && (
                    <span className="text-xs italic text-slate-700 underline">
                      {proj.link.replace(/^https?:\/\//, '')}
                    </span>
                  )}
                </div>
                {proj.techStack && (
                  <p className="text-xs italic text-slate-800 mb-1">{proj.techStack}</p>
                )}
                {proj.description && (
                  <ul className="list-disc pl-5 text-xs text-slate-800 space-y-1 mt-1">
                    {proj.description.split('\n').filter(Boolean).map((line, i) => (
                      <li key={i}>{line.replace(/^[-•]\s*/, '')}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {resumeData.optionalSections?.certifications && resumeData.optionalSections.certifications.length > 0 && (
        <div className="mb-5">
          <h2 className="font-bold text-sm mb-3 pb-1" style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}>
            Certifications
          </h2>
          <div className="space-y-3">
            {resumeData.optionalSections.certifications.map((cert) => (
              <div key={cert.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-xs text-slate-900">{cert.name}</h3>
                  <span className="text-xs italic text-slate-700">
                    {cert.issueDate} {cert.expiryDate ? `— ${cert.expiryDate}` : ''}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mt-1">
                  <p className="text-xs italic text-slate-800">{cert.issuer}</p>
                  {cert.link && (
                    <span className="text-xs italic text-slate-700 underline">
                      Credential
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {resumeData.optionalSections?.languages && resumeData.optionalSections.languages.length > 0 && (
        <div className="mb-5">
          <h2 className="font-bold text-sm mb-3 pb-1" style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}>
            Languages
          </h2>
          <ul className="list-disc pl-5 text-xs text-slate-800 space-y-1 font-bold flex flex-wrap gap-x-6">
            {resumeData.optionalSections.languages.map((lang) => (
              <li key={lang.id} className="w-1/3">
                {lang.name} {lang.proficiency && <span className="font-normal italic text-slate-600">({lang.proficiency})</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Awards */}
      {resumeData.optionalSections?.awards && resumeData.optionalSections.awards.length > 0 && (
        <div className="mb-5">
          <h2 className="font-bold text-sm mb-3 pb-1" style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}>
            Awards
          </h2>
          <div className="space-y-4">
            {resumeData.optionalSections.awards.map((award) => (
              <div key={award.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-xs text-slate-900">{award.title}</h3>
                  <span className="text-xs italic text-slate-700">{award.date}</span>
                </div>
                <p className="text-xs italic text-slate-800 mb-1">{award.organization}</p>
                {award.description && (
                  <p className="text-xs text-slate-800 leading-relaxed mt-1">
                    {award.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Volunteer */}
      {resumeData.optionalSections?.volunteer && resumeData.optionalSections.volunteer.length > 0 && (
        <div className="mb-5">
          <h2 className="font-bold text-sm mb-3 pb-1" style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}>
            Volunteer Experience
          </h2>
          <div className="space-y-4">
            {resumeData.optionalSections.volunteer.map((vol) => (
              <div key={vol.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-xs text-slate-900">{vol.role}</h3>
                  <span className="text-xs italic text-slate-700">
                    {vol.startDate} — {vol.endDate}
                  </span>
                </div>
                <div className="mb-1.5">
                  <p className="text-xs italic text-slate-800">{vol.organization}{vol.location ? `, ${vol.location}` : ''}</p>
                </div>
                {vol.description && (
                  <ul className="list-disc pl-5 text-xs text-slate-800 space-y-1">
                    {vol.description.split('\n').filter(Boolean).map((line, i) => (
                      <li key={i}>{line.replace(/^[-•]\s*/, '')}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Publications */}
      {resumeData.optionalSections?.publications && resumeData.optionalSections.publications.length > 0 && (
        <div className="mb-5">
          <h2 className="font-bold text-sm mb-3 pb-1" style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}>
            Publications
          </h2>
          <div className="space-y-4">
            {resumeData.optionalSections.publications.map((pub) => (
              <div key={pub.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-xs text-slate-900">{pub.title}</h3>
                  <span className="text-xs italic text-slate-700">{pub.date}</span>
                </div>
                <div className="flex justify-between items-baseline mt-1">
                  <p className="text-xs italic text-slate-800">{pub.publisher}</p>
                  {pub.link && (
                    <span className="text-xs italic text-slate-700 underline">View</span>
                  )}
                </div>
                {pub.description && (
                  <p className="text-xs text-slate-800 leading-relaxed mt-1">
                    {pub.description}
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
