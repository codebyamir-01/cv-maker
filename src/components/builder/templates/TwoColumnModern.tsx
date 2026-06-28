import { ResumeData } from "@/store/useResumeStore";

interface Props {
  resumeData: ResumeData;
  accentColor?: string;
}

export default function TwoColumnModern({ resumeData, accentColor = "#2563eb" }: Props) {
  const { personalInfo, experience, education, skills, optionalSections, summary } = resumeData;

  const LeftHeading = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-[14px] font-bold uppercase tracking-wider mb-4 border-b border-white/30 pb-1 text-white">
      {children}
    </h2>
  );

  const RightHeading = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-[16px] font-bold uppercase tracking-wider mb-4 pb-1" style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}>
      {children}
    </h2>
  );

  return (
    <div
      className="flex font-sans text-left"
      style={{
        width: "816px",
        minHeight: "1056px",
        boxSizing: "border-box",
      }}
    >
      {/* LEFT COLUMN (35%) */}
      <div 
        className="text-white p-8"
        style={{ width: "35%", backgroundColor: accentColor }}
      >
        {/* Photo would go here if supported, but we'll stick to text for now */}
        <div className="mb-10 text-center">
          {personalInfo.photo ? (
            <div className="w-32 h-32 mx-auto rounded-full bg-white/20 mb-4 overflow-hidden border-4 border-white/30">
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
            </div>
          ) : (
             <div className="w-24 h-24 mx-auto rounded-full bg-white/20 mb-4 flex items-center justify-center text-3xl font-bold border-4 border-white/30 text-white">
                {personalInfo.fullName?.charAt(0) || "U"}
             </div>
          )}
          <h1 className="text-[22px] font-bold leading-tight mb-1">{personalInfo.fullName || "YOUR NAME"}</h1>
          <p className="text-[13px] text-white/80 uppercase tracking-widest">{personalInfo.jobTitle}</p>
        </div>

        <div className="space-y-8">
          <div>
            <LeftHeading>Contact</LeftHeading>
            <div className="space-y-2 text-[11px] text-white/90">
              {personalInfo.phone && <div>{personalInfo.phone}</div>}
              {personalInfo.email && <div className="break-all">{personalInfo.email}</div>}
              {personalInfo.location && <div>{personalInfo.location}</div>}
              {personalInfo.linkedIn && <div className="break-all"><a href={personalInfo.linkedIn}>{personalInfo.linkedIn.replace(/^https?:\/\//, '')}</a></div>}
              {personalInfo.portfolio && <div className="break-all"><a href={personalInfo.portfolio}>{personalInfo.portfolio.replace(/^https?:\/\//, '')}</a></div>}
            </div>
          </div>

          {skills.length > 0 && (
            <div>
              <LeftHeading>Skills</LeftHeading>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="text-[11px] px-2 py-1 bg-white/10 rounded border border-white/20 text-white">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {optionalSections?.languages && optionalSections.languages.length > 0 && (
            <div>
              <LeftHeading>Languages</LeftHeading>
              <ul className="space-y-1.5 text-[11px] text-white/90">
                {optionalSections.languages.map(lang => (
                  <li key={lang.id} className="flex justify-between">
                    <span className="font-semibold text-white">{lang.name}</span>
                    <span className="text-white/70">{lang.proficiency}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN (65%) */}
      <div 
        className="bg-white p-8"
        style={{ width: "65%" }}
      >
        {summary && (
          <div className="mb-8">
            <RightHeading>Profile</RightHeading>
            <p className="text-[12px] leading-relaxed text-slate-600">{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mb-8">
            <RightHeading>Experience</RightHeading>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <h3 className="font-bold text-[14px] text-slate-800">{exp.jobTitle}</h3>
                  <div className="flex justify-between items-baseline mb-2 text-[12px]">
                    <span className="font-semibold text-slate-600">{exp.company}</span>
                    <span className="text-slate-500 font-medium">
                      {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-[12px] leading-relaxed text-slate-600 whitespace-pre-wrap">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="mb-8">
            <RightHeading>Education</RightHeading>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-[13px] text-slate-800">{edu.degree}</h3>
                  <div className="flex justify-between items-baseline text-[12px] mt-0.5">
                    <span className="text-slate-600">{edu.institution}</span>
                    <span className="text-slate-500 font-medium">{edu.startYear} - {edu.endYear}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {optionalSections?.projects && optionalSections.projects.length > 0 && (
          <div className="mb-8">
            <RightHeading>Projects</RightHeading>
            <div className="space-y-5">
              {optionalSections.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-[13px] text-slate-800">{proj.name}</h3>
                    {proj.link && <a href={proj.link} className="text-[11px] text-blue-500 underline">{proj.link.replace(/^https?:\/\//, '')}</a>}
                  </div>
                  {proj.description && <p className="text-[12px] leading-relaxed text-slate-600 whitespace-pre-wrap">{proj.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {optionalSections?.certifications && optionalSections.certifications.length > 0 && (
          <div className="mb-8">
            <RightHeading>Certifications</RightHeading>
            <div className="space-y-3">
              {optionalSections.certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline text-[12px]">
                  <div>
                    <span className="font-bold text-slate-800">{cert.name}</span>
                    <span className="text-slate-500 ml-1">| {cert.issuer}</span>
                  </div>
                  <span className="text-slate-500">{cert.issueDate}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
