import { ResumeData } from "@/store/useResumeStore";
import { Terminal } from "lucide-react";

interface Props {
  resumeData: ResumeData;
}

export default function Developer({ resumeData }: Props) {
  const { personalInfo, experience, summary } = resumeData;

  return (
    <div className="w-full h-full font-mono text-slate-900 bg-white p-2">
      <div className="border-4 border-slate-900 h-full p-6">
        
        {/* Header */}
        <div className="border-b-4 border-slate-900 pb-6 mb-6 flex justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Terminal className="w-8 h-8" />
              <h1 className="text-4xl font-black uppercase tracking-tight">
                {personalInfo.fullName || "YOUR_NAME"}
              </h1>
            </div>
            {personalInfo.jobTitle && (
              <p className="text-xl font-bold text-slate-700 mb-4">
                &gt; {personalInfo.jobTitle}
              </p>
            )}
            
            <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
              {personalInfo.email && <div>Email: {personalInfo.email}</div>}
              {personalInfo.phone && <div>Phone: {personalInfo.phone}</div>}
              {personalInfo.github && <div>GitHub: <a href={personalInfo.github} className="text-slate-700 underline">Link</a></div>}
              {personalInfo.portfolio && <div>Portfolio: <a href={personalInfo.portfolio} className="text-slate-700 underline">Link</a></div>}
            </div>
          </div>
          
          {personalInfo.photo && personalInfo.showPhoto !== false && (
            <div className="w-28 h-28 border-4 border-slate-900 flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover filter grayscale" />
            </div>
          )}
        </div>

        {/* Summary */}
        {(summary || personalInfo.fullName) && (
          <div className="mb-8">
            <h2 className="text-xl font-black uppercase mb-2 bg-slate-900 text-white inline-block px-2 py-1">
              # SUMMARY
            </h2>
            <p className="text-sm leading-relaxed border-l-2 border-slate-900 pl-4 py-1">
              {summary || "Software engineer with a passion for building scalable and maintainable applications."}
            </p>
          </div>
        )}

        {/* Experience */}
        <div className="mb-8">
          <h2 className="text-xl font-black uppercase mb-4 bg-slate-900 text-white inline-block px-2 py-1">
            # EXPERIENCE
          </h2>
          {experience.length === 0 ? (
            <div className="text-sm italic pl-4 border-l-2 border-slate-900">No experience blocks added yet...</div>
          ) : (
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="pl-4 border-l-2 border-slate-900">
                  <div className="flex flex-wrap items-center justify-between mb-1">
                    <h3 className="font-bold text-lg text-slate-800">
                      &lt;{exp.jobTitle} /&gt;
                    </h3>
                    <span className="text-xs font-bold bg-slate-200 px-2 py-1 rounded">
                      {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="font-semibold text-sm mb-2">
                    @ {exp.company} <span className="font-normal text-slate-500">({exp.location})</span>
                  </div>
                  <div className="text-sm whitespace-pre-wrap">
                    {exp.description || "/* Add your responsibilities here */"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Education */}
        <div className="mb-8">
          <h2 className="text-xl font-black uppercase mb-4 bg-slate-900 text-white inline-block px-2 py-1">
            # EDUCATION
          </h2>
          {resumeData.education.length === 0 ? (
            <div className="text-sm italic pl-4 border-l-2 border-slate-900">Education will appear here...</div>
          ) : (
            <div className="space-y-4">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="pl-4 border-l-2 border-slate-900">
                  <div className="flex flex-wrap items-center justify-between">
                    <h3 className="font-bold text-lg text-slate-900">{edu.degree}</h3>
                    <span className="text-xs font-bold bg-slate-200 px-2 py-1 rounded">
                      {edu.startYear} - {edu.endYear}
                    </span>
                  </div>
                  <div className="font-semibold text-sm">{edu.institution} <span className="font-normal text-slate-500">({edu.location})</span></div>
                  {edu.grade && <div className="text-sm mt-1">Grade: {edu.grade}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h2 className="text-xl font-black uppercase mb-4 bg-slate-900 text-white inline-block px-2 py-1">
            # SKILLS
          </h2>
          {resumeData.skills.length === 0 ? (
            <div className="text-sm italic pl-4 border-l-2 border-slate-900">Skills will appear here...</div>
          ) : (
            <div className="flex flex-wrap gap-2 pl-4 border-l-2 border-slate-900">
              {resumeData.skills.map((skill) => (
                <span key={skill.id} className="text-sm font-bold bg-slate-100 text-slate-800 border border-slate-300 px-2 py-1 rounded">
                  {skill.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Projects */}
        {resumeData.optionalSections?.projects && resumeData.optionalSections.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-black uppercase mb-4 bg-slate-900 text-white inline-block px-2 py-1">
              # PROJECTS
            </h2>
            <div className="space-y-6">
              {resumeData.optionalSections.projects.map((proj) => (
                <div key={proj.id} className="pl-4 border-l-2 border-slate-900">
                  <div className="flex flex-wrap items-center justify-between mb-1">
                    <h3 className="font-bold text-lg text-slate-900">{proj.name}</h3>
                    {proj.link && (
                      <a href={proj.link} className="text-xs font-bold text-slate-700 underline">
                        [Link]
                      </a>
                    )}
                  </div>
                  {proj.techStack && <div className="font-mono text-xs text-slate-500 mb-2">[{proj.techStack}]</div>}
                  <div className="text-sm whitespace-pre-wrap">{proj.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resumeData.optionalSections?.certifications && resumeData.optionalSections.certifications.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-black uppercase mb-4 bg-slate-900 text-white inline-block px-2 py-1">
              # CERTIFICATIONS
            </h2>
            <div className="space-y-6">
              {resumeData.optionalSections.certifications.map((cert) => (
                <div key={cert.id} className="pl-4 border-l-2 border-slate-900">
                  <div className="flex flex-wrap items-center justify-between mb-1">
                    <h3 className="font-bold text-lg text-slate-900">{cert.name}</h3>
                    <span className="text-xs font-bold bg-slate-200 px-2 py-1 rounded">
                      {cert.issueDate} {cert.expiryDate ? `- ${cert.expiryDate}` : ''}
                    </span>
                  </div>
                  <div className="font-semibold text-sm mb-1">{cert.issuer}</div>
                  {cert.link && (
                    <a href={cert.link} className="text-xs font-bold text-slate-700 underline">
                      [View Credential]
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {resumeData.optionalSections?.languages && resumeData.optionalSections.languages.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-black uppercase mb-4 bg-slate-900 text-white inline-block px-2 py-1">
              # LANGUAGES
            </h2>
            <div className="flex flex-wrap gap-4 pl-4 border-l-2 border-slate-900">
              {resumeData.optionalSections.languages.map((lang) => (
                <div key={lang.id} className="text-sm">
                  <span className="font-bold text-slate-900">{lang.name}</span>
                  {lang.proficiency && <span className="text-slate-600 ml-2">[{lang.proficiency}]</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Awards */}
        {resumeData.optionalSections?.awards && resumeData.optionalSections.awards.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-black uppercase mb-4 bg-slate-900 text-white inline-block px-2 py-1">
              # AWARDS
            </h2>
            <div className="space-y-6">
              {resumeData.optionalSections.awards.map((award) => (
                <div key={award.id} className="pl-4 border-l-2 border-slate-900">
                  <div className="flex flex-wrap items-center justify-between mb-1">
                    <h3 className="font-bold text-lg text-slate-900">{award.title}</h3>
                    <span className="text-xs font-bold bg-slate-200 px-2 py-1 rounded">{award.date}</span>
                  </div>
                  <div className="font-semibold text-sm mb-2">{award.organization}</div>
                  <div className="text-sm whitespace-pre-wrap">{award.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Volunteer */}
        {resumeData.optionalSections?.volunteer && resumeData.optionalSections.volunteer.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-black uppercase mb-4 bg-slate-900 text-white inline-block px-2 py-1">
              # VOLUNTEER
            </h2>
            <div className="space-y-6">
              {resumeData.optionalSections.volunteer.map((vol) => (
                <div key={vol.id} className="pl-4 border-l-2 border-slate-900">
                  <div className="flex flex-wrap items-center justify-between mb-1">
                    <h3 className="font-bold text-lg text-slate-900">{vol.role}</h3>
                    <span className="text-xs font-bold bg-slate-200 px-2 py-1 rounded">
                      {vol.startDate} - {vol.endDate}
                    </span>
                  </div>
                  <div className="font-semibold text-sm mb-2">
                    @ {vol.organization} <span className="font-normal text-slate-500">({vol.location})</span>
                  </div>
                  <div className="text-sm whitespace-pre-wrap">{vol.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Publications */}
        {resumeData.optionalSections?.publications && resumeData.optionalSections.publications.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-black uppercase mb-4 bg-slate-900 text-white inline-block px-2 py-1">
              # PUBLICATIONS
            </h2>
            <div className="space-y-6">
              {resumeData.optionalSections.publications.map((pub) => (
                <div key={pub.id} className="pl-4 border-l-2 border-slate-900">
                  <div className="flex flex-wrap items-center justify-between mb-1">
                    <h3 className="font-bold text-lg text-slate-900">{pub.title}</h3>
                    <span className="text-xs font-bold bg-slate-200 px-2 py-1 rounded">{pub.date}</span>
                  </div>
                  <div className="font-semibold text-sm mb-1">{pub.publisher}</div>
                  {pub.link && (
                    <div className="mb-2">
                      <a href={pub.link} className="text-xs font-bold text-blue-700 underline">
                        [Link]
                      </a>
                    </div>
                  )}
                  <div className="text-sm whitespace-pre-wrap">{pub.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
