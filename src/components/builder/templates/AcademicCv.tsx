import { ResumeData } from "@/store/useResumeStore";

interface Props {
  resumeData: ResumeData;
  accentColor?: string;
}

export default function AcademicCv({ resumeData, accentColor = "#0f172a" }: Props) {
  const { personalInfo, experience, education, optionalSections } = resumeData;

  const sectionHeaderStyle = {
    fontSize: "14px",
    fontWeight: "bold",
    textTransform: "uppercase" as const,
    borderBottom: `2px solid ${accentColor}`,
    color: accentColor,
    paddingBottom: "4px",
    marginBottom: "12px",
    marginTop: "20px"
  };

  return (
    <div
      className="bg-white text-left"
      style={{
        width: "816px",
        minHeight: "1056px",
        padding: "54px",
        boxSizing: "border-box",
        fontFamily: "'Georgia', serif",
        color: "#27272a",
      }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-bold mb-2" style={{ fontSize: "28px", color: accentColor }}>
          {personalInfo.fullName || "YOUR FULL NAME"}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-3 text-[12px] text-slate-600">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <><span className="text-slate-300">•</span><span>{personalInfo.phone}</span></>}
          {personalInfo.email && <><span className="text-slate-300">•</span><span>{personalInfo.email}</span></>}
        </div>
        {(personalInfo.linkedIn || personalInfo.portfolio) && (
          <div className="flex flex-wrap justify-center gap-x-3 mt-1 text-[12px] text-slate-600">
            {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="underline">{personalInfo.linkedIn.replace(/^https?:\/\//, '')}</a>}
            {personalInfo.portfolio && <><span className="text-slate-300">•</span><a href={personalInfo.portfolio} className="underline">{personalInfo.portfolio.replace(/^https?:\/\//, '')}</a></>}
          </div>
        )}
      </div>

      {/* Education */}
      {education.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-[14px]">{edu.degree}</h3>
                  <span className="text-[12px] italic">
                    {edu.startYear} {edu.startYear && edu.endYear ? "-" : ""} {edu.endYear}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <p className="text-[13px]">{edu.institution}</p>
                  <span className="text-[12px]">{edu.location}</span>
                </div>
                {edu.grade && <p className="text-[12px] mt-0.5 text-slate-600">Grade: {edu.grade}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Publications (High priority in Academic CV) */}
      {optionalSections?.publications && optionalSections.publications.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Publications</h2>
          <ul className="list-disc list-outside ml-4 space-y-3">
            {optionalSections.publications.map((pub) => (
              <li key={pub.id} className="text-[12px] pl-1 leading-relaxed">
                <strong>{pub.title}</strong>. <em>{pub.publisher}</em>, {pub.date}.
                {pub.description && <p className="mt-1 text-slate-700">{pub.description}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Experience / Academic Appointments */}
      {experience.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Academic & Professional Experience</h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-[14px]">{exp.jobTitle}</h3>
                  <span className="text-[12px] italic">
                    {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-1.5">
                  <p className="text-[13px] font-semibold">{exp.company}</p>
                  <span className="text-[12px]">{exp.location}</span>
                </div>
                {exp.description && (
                  <p className="text-[12px] leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Honors & Awards */}
      {optionalSections?.awards && optionalSections.awards.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Honors & Awards</h2>
          <div className="space-y-3">
            {optionalSections.awards.map((award) => (
              <div key={award.id} className="flex justify-between items-baseline">
                <div className="text-[12px]">
                  <strong>{award.title}</strong>, {award.organization}
                </div>
                <span className="text-[12px] italic">{award.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grants & Projects */}
      {optionalSections?.projects && optionalSections.projects.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Grants & Selected Projects</h2>
          <div className="space-y-4">
            {optionalSections.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[13px]">{proj.name}</h3>
                </div>
                {proj.description && <p className="text-[12px] leading-relaxed whitespace-pre-wrap mt-1">{proj.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills / Methodologies */}
      {resumeData.skills.length > 0 && (
        <div>
          <h2 style={sectionHeaderStyle}>Technical Skills & Methodologies</h2>
          <div className="text-[12px] leading-relaxed">
            {resumeData.skills.map(s => s.name).join(", ")}
          </div>
        </div>
      )}
    </div>
  );
}
