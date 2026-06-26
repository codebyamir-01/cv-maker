import { ResumeData } from "@/store/useResumeStore";

interface Props {
  resumeData: ResumeData;
  accentColor?: string;
}

export default function Executive({ resumeData, accentColor = "#1e293b" }: Props) {
  const { personalInfo, experience, education, skills, summary } = resumeData;

  return (
    <div className="bg-white font-sans text-slate-900 text-left" style={{ width: "816px", minHeight: "1056px", padding: "48px", boxSizing: "border-box" }}>
      {/* Header */}
      <div className="border-b-4 pb-6 mb-6 flex flex-col items-center" style={{ borderColor: accentColor }}>
        <h1 className="text-4xl font-black uppercase tracking-widest text-slate-900">{personalInfo.fullName || "YOUR NAME"}</h1>
        <p className="text-lg uppercase tracking-wider mt-2 font-semibold" style={{ color: accentColor }}>{personalInfo.jobTitle}</p>
        <div className="flex gap-4 mt-4 text-xs font-medium text-slate-600 uppercase tracking-wide">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>
      
      <div className="flex gap-8">
        <div className="w-1/3 space-y-6">
          {/* Skills */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b" style={{ borderColor: accentColor, color: accentColor }}>Core Competencies</h2>
            <div className="flex flex-col gap-2 text-xs">
              {skills.map(s => <span key={s.id} className="font-semibold">{s.name}</span>)}
            </div>
          </div>
          {/* Education */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b" style={{ borderColor: accentColor, color: accentColor }}>Education</h2>
            {education.map(ed => (
              <div key={ed.id} className="mb-3 text-xs">
                <p className="font-bold">{ed.degree}</p>
                <p className="text-slate-600">{ed.institution}</p>
                <p className="text-slate-500 italic mt-0.5">{ed.startYear} - {ed.endYear}</p>
              </div>
            ))}
          </div>
          {/* Languages */}
          {resumeData.optionalSections?.languages && resumeData.optionalSections.languages.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b" style={{ borderColor: accentColor, color: accentColor }}>Languages</h2>
              <div className="flex flex-col gap-2 text-xs">
                {resumeData.optionalSections.languages.map(lang => (
                  <div key={lang.id}>
                    <span className="font-bold">{lang.name}</span>
                    {lang.proficiency && <span className="text-slate-600 block">{lang.proficiency}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Certifications */}
          {resumeData.optionalSections?.certifications && resumeData.optionalSections.certifications.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b" style={{ borderColor: accentColor, color: accentColor }}>Certifications</h2>
              {resumeData.optionalSections.certifications.map(cert => (
                <div key={cert.id} className="mb-3 text-xs">
                  <p className="font-bold">{cert.name}</p>
                  <p className="text-slate-600">{cert.issuer}</p>
                  <p className="text-slate-500 italic mt-0.5">{cert.issueDate} {cert.expiryDate ? `- ${cert.expiryDate}` : ''}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="w-2/3 space-y-6">
          {/* Summary */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b" style={{ borderColor: accentColor, color: accentColor }}>Executive Summary</h2>
            <p className="text-xs leading-relaxed text-slate-700">{summary}</p>
          </div>
          {/* Experience */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b" style={{ borderColor: accentColor, color: accentColor }}>Professional Experience</h2>
            {experience.map(exp => (
              <div key={exp.id} className="mb-5">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-sm text-slate-900">{exp.jobTitle}</h3>
                  <span className="text-xs font-bold text-slate-500">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-xs font-semibold text-slate-700 italic mb-2">{exp.company}</div>
                <p className="text-xs leading-relaxed text-slate-700 whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </div>
          {/* Projects */}
          {resumeData.optionalSections?.projects && resumeData.optionalSections.projects.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b" style={{ borderColor: accentColor, color: accentColor }}>Key Projects</h2>
              {resumeData.optionalSections.projects.map(proj => (
                <div key={proj.id} className="mb-5">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-sm text-slate-900">{proj.name}</h3>
                    {proj.link && <span className="text-xs text-slate-600 underline">{proj.link.replace(/^https?:\/\//, '')}</span>}
                  </div>
                  {proj.techStack && <div className="text-[11px] font-semibold text-slate-600 mb-2">{proj.techStack}</div>}
                  <p className="text-xs leading-relaxed text-slate-700 whitespace-pre-wrap">{proj.description}</p>
                </div>
              ))}
            </div>
          )}
          {/* Awards */}
          {resumeData.optionalSections?.awards && resumeData.optionalSections.awards.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b" style={{ borderColor: accentColor, color: accentColor }}>Awards</h2>
              {resumeData.optionalSections.awards.map(award => (
                <div key={award.id} className="mb-5">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-sm text-slate-900">{award.title}</h3>
                    <span className="text-xs font-bold text-slate-500">{award.date}</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-700 italic mb-2">{award.organization}</div>
                  <p className="text-xs leading-relaxed text-slate-700 whitespace-pre-wrap">{award.description}</p>
                </div>
              ))}
            </div>
          )}
          {/* Volunteer */}
          {resumeData.optionalSections?.volunteer && resumeData.optionalSections.volunteer.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b" style={{ borderColor: accentColor, color: accentColor }}>Volunteer Experience</h2>
              {resumeData.optionalSections.volunteer.map(vol => (
                <div key={vol.id} className="mb-5">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-sm text-slate-900">{vol.role}</h3>
                    <span className="text-xs font-bold text-slate-500">{vol.startDate} - {vol.endDate}</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-700 italic mb-2">{vol.organization} {vol.location && `| ${vol.location}`}</div>
                  <p className="text-xs leading-relaxed text-slate-700 whitespace-pre-wrap">{vol.description}</p>
                </div>
              ))}
            </div>
          )}
          {/* Publications */}
          {resumeData.optionalSections?.publications && resumeData.optionalSections.publications.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b" style={{ borderColor: accentColor, color: accentColor }}>Publications</h2>
              {resumeData.optionalSections.publications.map(pub => (
                <div key={pub.id} className="mb-5">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-sm text-slate-900">{pub.title}</h3>
                    <span className="text-xs font-bold text-slate-500">{pub.date}</span>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <div className="text-xs font-semibold text-slate-700 italic">{pub.publisher}</div>
                    {pub.link && <span className="text-xs text-slate-600 underline">View Publication</span>}
                  </div>
                  <p className="text-xs leading-relaxed text-slate-700 whitespace-pre-wrap">{pub.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
