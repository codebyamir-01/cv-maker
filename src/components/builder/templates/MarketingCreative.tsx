import { ResumeData } from "@/store/useResumeStore";

interface Props {
  resumeData: ResumeData;
  accentColor?: string;
}

export default function MarketingCreative({ resumeData, accentColor = "#f43f5e" }: Props) {
  const { personalInfo, experience, summary, education, skills, optionalSections } = resumeData;

  const SectionHeading = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-[16px] font-black uppercase tracking-widest mb-4" style={{ color: accentColor }}>
      {children}
    </h2>
  );

  return (
    <div
      className="bg-white text-left font-sans"
      style={{
        width: "816px",
        minHeight: "1056px",
        boxSizing: "border-box",
        color: "#1f2937",
      }}
    >
      {/* Heavy Colored Header */}
      <div 
        className="px-[54px] py-[40px] text-white flex flex-col justify-center"
        style={{ backgroundColor: accentColor, minHeight: "200px" }}
      >
        <h1 className="font-black uppercase tracking-tighter mb-2" style={{ fontSize: "42px", lineHeight: 1 }}>
          {personalInfo.fullName || "YOUR FULL NAME"}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-[18px] font-bold tracking-widest uppercase text-white/80 mb-6">
            {personalInfo.jobTitle}
          </p>
        )}
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] font-medium text-white/90">
          {personalInfo.email && <div className="flex items-center gap-1">Email: {personalInfo.email}</div>}
          {personalInfo.phone && <div className="flex items-center gap-1">Tel: {personalInfo.phone}</div>}
          {personalInfo.location && <div className="flex items-center gap-1">Loc: {personalInfo.location}</div>}
          {personalInfo.linkedIn && <div className="flex items-center gap-1">In: <a href={personalInfo.linkedIn}>{personalInfo.linkedIn.replace(/^https?:\/\//, '')}</a></div>}
          {personalInfo.portfolio && <div className="flex items-center gap-1 font-bold text-white">Portfolio: <a href={personalInfo.portfolio}>{personalInfo.portfolio.replace(/^https?:\/\//, '')}</a></div>}
        </div>
      </div>

      <div className="p-[54px] grid grid-cols-[2fr_1fr] gap-10">
        {/* Main Content */}
        <div>
          {summary && (
            <div className="mb-8">
              <SectionHeading>Profile</SectionHeading>
              <p className="text-[13px] leading-relaxed font-medium text-slate-700">{summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div className="mb-8">
              <SectionHeading>Experience</SectionHeading>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <h3 className="font-bold text-[15px] text-slate-900">{exp.jobTitle}</h3>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-[13px] font-bold" style={{ color: accentColor }}>{exp.company}</span>
                      <span className="text-[12px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
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

          {optionalSections?.projects && optionalSections.projects.length > 0 && (
            <div className="mb-8">
              <SectionHeading>Campaigns & Projects</SectionHeading>
              <div className="space-y-5">
                {optionalSections.projects.map((proj) => (
                  <div key={proj.id} className="border-l-4 pl-4" style={{ borderColor: accentColor }}>
                    <h3 className="font-bold text-[14px] text-slate-900">{proj.name}</h3>
                    {proj.link && <a href={proj.link} className="text-[11px] font-bold uppercase underline" style={{ color: accentColor }}>View Live</a>}
                    {proj.description && <p className="text-[12px] leading-relaxed text-slate-600 whitespace-pre-wrap mt-1">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {skills.length > 0 && (
            <div>
              <SectionHeading>Core Skills</SectionHeading>
              <div className="flex flex-col gap-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                    <span className="text-[13px] font-bold text-slate-700">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div>
              <SectionHeading>Education</SectionHeading>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-[13px] text-slate-900 leading-tight mb-1">{edu.degree}</h3>
                    <p className="text-[12px] text-slate-600 mb-1">{edu.institution}</p>
                    <p className="text-[11px] font-bold text-slate-400 uppercase">{edu.startYear} - {edu.endYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {optionalSections?.awards && optionalSections.awards.length > 0 && (
            <div>
              <SectionHeading>Awards</SectionHeading>
              <div className="space-y-3">
                {optionalSections.awards.map((award) => (
                  <div key={award.id}>
                    <h3 className="font-bold text-[12px] text-slate-900">{award.title}</h3>
                    <p className="text-[11px] text-slate-500">{award.organization} ({award.date})</p>
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
