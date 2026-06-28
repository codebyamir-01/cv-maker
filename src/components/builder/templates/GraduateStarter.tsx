import { ResumeData } from "@/store/useResumeStore";

interface Props {
  resumeData: ResumeData;
  accentColor?: string;
}

export default function GraduateStarter({ resumeData, accentColor = "#10b981" }: Props) {
  const { personalInfo, experience, summary, education, skills, optionalSections } = resumeData;

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center gap-4 mb-4">
      <h2 className="text-[15px] font-bold uppercase tracking-wider text-slate-800 whitespace-nowrap">
        {children}
      </h2>
      <div className="h-[2px] w-full" style={{ backgroundColor: accentColor, opacity: 0.3 }} />
    </div>
  );

  return (
    <div
      className="bg-white text-left font-sans"
      style={{
        width: "816px",
        minHeight: "1056px",
        padding: "54px",
        boxSizing: "border-box",
        color: "#334155"
      }}
    >
      {/* Header */}
      <div className="mb-8 flex flex-col items-start border-l-8 pl-6" style={{ borderColor: accentColor }}>
        <h1 className="font-extrabold uppercase tracking-tight mb-1 text-slate-900" style={{ fontSize: "32px" }}>
          {personalInfo.fullName || "YOUR FULL NAME"}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-[16px] font-semibold mb-3" style={{ color: accentColor }}>
            {personalInfo.jobTitle}
          </p>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] font-medium text-slate-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedIn && <a href={personalInfo.linkedIn}>{personalInfo.linkedIn.replace(/^https?:\/\//, '')}</a>}
          {personalInfo.portfolio && <a href={personalInfo.portfolio}>{personalInfo.portfolio.replace(/^https?:\/\//, '')}</a>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <p className="text-[12px] leading-relaxed font-medium text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-100">
            {summary}
          </p>
        </div>
      )}

      {/* Education (Prioritized for Graduates) */}
      {education.length > 0 && (
        <div className="mb-8">
          <SectionTitle>Education</SectionTitle>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="relative pl-4 border-l-2 border-slate-200">
                <div className="absolute w-2 h-2 rounded-full -left-[5px] top-1.5" style={{ backgroundColor: accentColor }} />
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-[14px] text-slate-900">{edu.degree}</h3>
                  <span className="text-[12px] font-bold text-slate-600">
                    {edu.startYear} - {edu.endYear}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <p className="text-[13px] font-semibold text-slate-700">{edu.institution}</p>
                  <span className="text-[12px] text-slate-500">{edu.location}</span>
                </div>
                {edu.grade && <p className="text-[12px] mt-1 text-slate-600"><strong>GPA/Grade:</strong> {edu.grade}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects (Also highly prioritized for graduates) */}
      {optionalSections?.projects && optionalSections.projects.length > 0 && (
        <div className="mb-8">
          <SectionTitle>Academic & Personal Projects</SectionTitle>
          <div className="space-y-5">
            {optionalSections.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[13px] text-slate-900">{proj.name}</h3>
                  {proj.link && <a href={proj.link} className="text-[11px] underline" style={{ color: accentColor }}>View Project</a>}
                </div>
                {proj.techStack && <p className="text-[11px] font-semibold text-slate-500 mb-1">Technologies: {proj.techStack}</p>}
                {proj.description && <p className="text-[12px] leading-relaxed text-slate-600 whitespace-pre-wrap">{proj.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience / Internships */}
      {experience.length > 0 && (
        <div className="mb-8">
          <SectionTitle>Experience & Internships</SectionTitle>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-[13px] text-slate-900">{exp.jobTitle}</h3>
                  <span className="text-[12px] font-semibold text-slate-600">
                    {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <p className="text-[12px] font-bold" style={{ color: accentColor }}>{exp.company}</p>
                  <span className="text-[12px] text-slate-500">{exp.location}</span>
                </div>
                {exp.description && (
                  <p className="text-[12px] leading-relaxed text-slate-600 whitespace-pre-wrap">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-8">
          <SectionTitle>Technical Skills</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill.id} className="text-[12px] font-medium px-3 py-1 rounded-full border border-slate-200 text-slate-700">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Volunteer / Extracurricular */}
      {optionalSections?.volunteer && optionalSections.volunteer.length > 0 && (
        <div className="mb-8">
          <SectionTitle>Extracurricular & Volunteer</SectionTitle>
          <div className="space-y-4">
            {optionalSections.volunteer.map((vol) => (
              <div key={vol.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[12px] text-slate-900">{vol.role}</h3>
                  <span className="text-[11px] text-slate-500">{vol.startDate} - {vol.endDate}</span>
                </div>
                <p className="text-[12px] font-semibold text-slate-600 mb-1">{vol.organization}</p>
                {vol.description && <p className="text-[12px] leading-relaxed text-slate-600 whitespace-pre-wrap">{vol.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
