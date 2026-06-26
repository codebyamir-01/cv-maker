import { ResumeData } from "@/store/useResumeStore";

interface Props {
  resumeData: ResumeData;
}

export default function ModernProfessional({ resumeData }: Props) {
  const { personalInfo, experience, summary } = resumeData;

  return (
    <div className="w-full h-full font-sans text-slate-800 bg-white flex flex-col">
      {/* Header with Background */}
      <div className="bg-slate-800 text-white p-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          {personalInfo.fullName || "YOUR FULL NAME"}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-xl text-blue-300 font-medium tracking-wide">
            {personalInfo.jobTitle}
          </p>
        )}
      </div>

      <div className="flex flex-1">
        {/* Left Sidebar (Contact & Skills) */}
        <div className="w-1/3 bg-slate-50 p-6 border-r border-slate-200">
          
          {personalInfo.photo && personalInfo.showPhoto !== false && (
            <div className="mb-8 flex justify-center mt-[-4rem]">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-3 border-b border-slate-300 pb-1">
              Contact
            </h2>
            <div className="space-y-2 text-sm text-slate-700">
              {personalInfo.email && <p>{personalInfo.email}</p>}
              {personalInfo.phone && <p>{personalInfo.phone}</p>}
              {personalInfo.location && <p>{personalInfo.location}</p>}
              {personalInfo.linkedIn && <p className="truncate"><a href={personalInfo.linkedIn}>LinkedIn</a></p>}
              {personalInfo.github && <p className="truncate"><a href={personalInfo.github}>GitHub</a></p>}
              {personalInfo.portfolio && <p className="truncate"><a href={personalInfo.portfolio}>Portfolio</a></p>}
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-3 border-b border-slate-300 pb-1">
              Skills
            </h2>
            {resumeData.skills.length === 0 ? (
              <p className="text-sm italic text-slate-500">Skills will appear here...</p>
            ) : (
              <div className="flex flex-wrap gap-2 text-sm text-slate-700">
                {resumeData.skills.map((skill) => (
                  <span key={skill.id} className="bg-slate-200 px-2 py-1 rounded">
                    {skill.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Languages */}
          {resumeData.optionalSections?.languages && resumeData.optionalSections.languages.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-3 border-b border-slate-300 pb-1">
                Languages
              </h2>
              <div className="space-y-2 text-sm text-slate-700">
                {resumeData.optionalSections.languages.map((lang) => (
                  <div key={lang.id} className="flex flex-col">
                    <span className="font-bold">{lang.name}</span>
                    {lang.proficiency && <span className="text-slate-500">{lang.proficiency}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {resumeData.optionalSections?.certifications && resumeData.optionalSections.certifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-3 border-b border-slate-300 pb-1">
                Certifications
              </h2>
              <div className="space-y-3 text-sm text-slate-700">
                {resumeData.optionalSections.certifications.map((cert) => (
                  <div key={cert.id} className="flex flex-col">
                    <span className="font-bold">{cert.name}</span>
                    <span>{cert.issuer}</span>
                    {(cert.issueDate || cert.expiryDate) && (
                      <span className="text-slate-500 italic text-xs mt-0.5">
                        {cert.issueDate} {cert.expiryDate ? `- ${cert.expiryDate}` : ''}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Main Content */}
        <div className="w-2/3 p-8">
          {/* Summary */}
          {(summary || personalInfo.fullName) && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-800 pb-1 mb-3 uppercase tracking-wider">
                Profile
              </h2>
              <p className="text-sm leading-relaxed text-slate-700">
                {summary || "Dynamic professional looking to leverage extensive background in delivering quality results. Proven ability to innovate and collaborate in team environments."}
              </p>
            </div>
          )}

          {/* Experience */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-800 pb-1 mb-4 uppercase tracking-wider">
              Experience
            </h2>
            {experience.length === 0 ? (
              <div className="text-sm text-slate-500 italic">Experience will appear here...</div>
            ) : (
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <h3 className="font-bold text-lg text-slate-900">{exp.jobTitle}</h3>
                    <div className="flex justify-between items-center mb-2 text-sm text-slate-600 font-medium">
                      <span>{exp.company} {exp.location && `| ${exp.location}`}</span>
                      <span>{exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}</span>
                    </div>
                    <div className="text-sm leading-relaxed whitespace-pre-wrap text-slate-700">
                      {exp.description || "• Responsibilities and achievements..."}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Education */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-800 pb-1 mb-4 uppercase tracking-wider">
              Education
            </h2>
            {resumeData.education.length === 0 ? (
              <div className="text-sm text-slate-500 italic">Education will appear here...</div>
            ) : (
              <div className="space-y-4">
                {resumeData.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                    <div className="flex justify-between items-center text-sm text-slate-600 font-medium">
                      <span>{edu.institution} {edu.location && `| ${edu.location}`}</span>
                      <span>{edu.startYear} - {edu.endYear}</span>
                    </div>
                    {edu.grade && <div className="text-sm text-slate-700 mt-1">Grade: {edu.grade}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Projects */}
          {resumeData.optionalSections?.projects && resumeData.optionalSections.projects.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-800 pb-1 mb-4 uppercase tracking-wider">
                Projects
              </h2>
              <div className="space-y-6">
                {resumeData.optionalSections.projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-lg text-slate-900">{proj.name}</h3>
                      {proj.link && (
                        <a href={proj.link} className="text-sm text-blue-600 underline">
                          {proj.link.replace(/^https?:\/\//, '')}
                        </a>
                      )}
                    </div>
                    {proj.techStack && (
                      <div className="text-sm text-slate-600 font-medium mb-2">Tech: {proj.techStack}</div>
                    )}
                    <div className="text-sm leading-relaxed whitespace-pre-wrap text-slate-700">
                      {proj.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Awards */}
          {resumeData.optionalSections?.awards && resumeData.optionalSections.awards.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-800 pb-1 mb-4 uppercase tracking-wider">
                Awards
              </h2>
              <div className="space-y-6">
                {resumeData.optionalSections.awards.map((award) => (
                  <div key={award.id}>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-lg text-slate-900">{award.title}</h3>
                      <span className="text-sm text-slate-600 font-medium">{award.date}</span>
                    </div>
                    <div className="text-sm text-slate-700 font-semibold mb-2">{award.organization}</div>
                    <div className="text-sm leading-relaxed whitespace-pre-wrap text-slate-700">
                      {award.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Volunteer Experience */}
          {resumeData.optionalSections?.volunteer && resumeData.optionalSections.volunteer.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-800 pb-1 mb-4 uppercase tracking-wider">
                Volunteer Experience
              </h2>
              <div className="space-y-6">
                {resumeData.optionalSections.volunteer.map((vol) => (
                  <div key={vol.id}>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-lg text-slate-900">{vol.role}</h3>
                      <span className="text-sm text-slate-600 font-medium">{vol.startDate} - {vol.endDate}</span>
                    </div>
                    <div className="text-sm text-slate-700 font-semibold mb-2">{vol.organization} {vol.location && `| ${vol.location}`}</div>
                    <div className="text-sm leading-relaxed whitespace-pre-wrap text-slate-700">
                      {vol.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Publications */}
          {resumeData.optionalSections?.publications && resumeData.optionalSections.publications.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-800 pb-1 mb-4 uppercase tracking-wider">
                Publications
              </h2>
              <div className="space-y-6">
                {resumeData.optionalSections.publications.map((pub) => (
                  <div key={pub.id}>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-lg text-slate-900">{pub.title}</h3>
                      <span className="text-sm text-slate-600 font-medium">{pub.date}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm text-slate-700 font-semibold">{pub.publisher}</div>
                      {pub.link && (
                        <a href={pub.link} className="text-sm text-blue-600 underline">
                          View Publication
                        </a>
                      )}
                    </div>
                    <div className="text-sm leading-relaxed whitespace-pre-wrap text-slate-700">
                      {pub.description}
                    </div>
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
