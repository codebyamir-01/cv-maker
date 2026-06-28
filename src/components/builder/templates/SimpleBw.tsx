import { ResumeData } from "@/store/useResumeStore";

interface Props {
  resumeData: ResumeData;
  accentColor?: string; // Won't be strictly used as it's Simple B&W, but kept for interface compliance
}

export default function SimpleBw({ resumeData }: Props) {
  const { personalInfo, experience, summary, education, skills, optionalSections } = resumeData;

  const SectionTitle = ({ title }: { title: string }) => (
    <div className="w-[25%] pr-6 text-right">
      <h2 className="text-[12px] font-bold uppercase tracking-widest text-black mt-1">
        {title}
      </h2>
    </div>
  );

  const SectionContent = ({ children }: { children: React.ReactNode }) => (
    <div className="w-[75%] pl-6 border-l-2 border-black">
      {children}
    </div>
  );

  const SectionRow = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="flex w-full mb-8">
      <SectionTitle title={title} />
      <SectionContent>{children}</SectionContent>
    </div>
  );

  return (
    <div
      className="bg-white text-black font-sans"
      style={{
        width: "816px",
        minHeight: "1056px",
        padding: "60px",
        boxSizing: "border-box",
      }}
    >
      {/* Header Row (Name & Contact) */}
      <div className="flex w-full mb-12 border-b-4 border-black pb-8">
        <div className="w-[60%]">
          <h1 className="font-extrabold uppercase tracking-tight leading-none mb-2" style={{ fontSize: "40px" }}>
            {personalInfo.fullName || "YOUR NAME"}
          </h1>
          {personalInfo.jobTitle && (
            <p className="text-[16px] font-bold tracking-widest uppercase">
              {personalInfo.jobTitle}
            </p>
          )}
        </div>
        <div className="w-[40%] text-[11px] font-medium leading-relaxed flex flex-col items-end text-right">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
          {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="underline">{personalInfo.linkedIn.replace(/^https?:\/\//, '')}</a>}
          {personalInfo.portfolio && <a href={personalInfo.portfolio} className="underline">{personalInfo.portfolio.replace(/^https?:\/\//, '')}</a>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <SectionRow title="Profile">
          <p className="text-[12px] leading-relaxed font-medium text-justify">{summary}</p>
        </SectionRow>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <SectionRow title="Experience">
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[14px] uppercase">{exp.jobTitle}</h3>
                  <span className="text-[11px] font-bold tracking-wider">
                    {exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <p className="text-[13px] font-bold italic">{exp.company}</p>
                  <span className="text-[11px] font-medium">{exp.location}</span>
                </div>
                {exp.description && (
                  <p className="text-[12px] leading-relaxed whitespace-pre-wrap pl-4 border-l-[1.5px] border-black mt-2 font-medium">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </SectionRow>
      )}

      {/* Education */}
      {education.length > 0 && (
        <SectionRow title="Education">
          <div className="space-y-5">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[14px]">{edu.degree}</h3>
                  <span className="text-[11px] font-bold tracking-wider">
                    {edu.startYear} {edu.startYear && edu.endYear ? "–" : ""} {edu.endYear}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <p className="text-[13px] font-medium">{edu.institution}</p>
                  <span className="text-[11px]">{edu.location}</span>
                </div>
                {edu.grade && <p className="text-[12px] mt-1 font-bold">Grade: {edu.grade}</p>}
              </div>
            ))}
          </div>
        </SectionRow>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <SectionRow title="Skills">
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[12px] font-bold uppercase tracking-wide">
            {skills.map((s, i) => (
              <span key={i} className="bg-black text-white px-2 py-1">
                {s.name}
              </span>
            ))}
          </div>
        </SectionRow>
      )}

      {/* Projects */}
      {optionalSections?.projects && optionalSections.projects.length > 0 && (
        <SectionRow title="Projects">
          <div className="space-y-5">
            {optionalSections.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[14px] uppercase">{proj.name}</h3>
                  {proj.link && <a href={proj.link} className="text-[11px] underline font-bold">Link</a>}
                </div>
                {proj.techStack && <p className="text-[11px] font-bold italic mb-2 tracking-wide border-b border-black pb-1 inline-block">{proj.techStack}</p>}
                {proj.description && <p className="text-[12px] leading-relaxed whitespace-pre-wrap font-medium">{proj.description}</p>}
              </div>
            ))}
          </div>
        </SectionRow>
      )}

      {/* Certifications */}
      {optionalSections?.certifications && optionalSections.certifications.length > 0 && (
        <SectionRow title="Licenses">
          <div className="space-y-3">
            {optionalSections.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-[13px]">{cert.name}</span>
                  <span className="text-[12px] ml-2 italic">({cert.issuer})</span>
                </div>
                <span className="text-[11px] font-bold">{cert.issueDate}</span>
              </div>
            ))}
          </div>
        </SectionRow>
      )}

      {/* Languages */}
      {optionalSections?.languages && optionalSections.languages.length > 0 && (
        <SectionRow title="Languages">
          <div className="flex flex-wrap gap-4 text-[12px] font-bold">
            {optionalSections.languages.map((l, i) => (
              <span key={i}>
                {l.name} {l.proficiency ? <span className="font-medium italic">({l.proficiency})</span> : ''}
              </span>
            ))}
          </div>
        </SectionRow>
      )}

      {/* Awards */}
      {optionalSections?.awards && optionalSections.awards.length > 0 && (
        <SectionRow title="Awards">
          <div className="space-y-4">
            {optionalSections.awards.map((award) => (
              <div key={award.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-[13px]">{award.title}</h3>
                  <span className="text-[11px] font-bold">{award.date}</span>
                </div>
                <p className="text-[12px] italic">{award.organization}</p>
                {award.description && <p className="text-[12px] mt-1 font-medium">{award.description}</p>}
              </div>
            ))}
          </div>
        </SectionRow>
      )}

      {/* Publications */}
      {optionalSections?.publications && optionalSections.publications.length > 0 && (
        <SectionRow title="Publications">
          <div className="space-y-4">
            {optionalSections.publications.map((pub) => (
              <div key={pub.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-[13px]">{pub.title}</h3>
                  <span className="text-[11px] font-bold">{pub.date}</span>
                </div>
                <p className="text-[12px] italic">{pub.publisher}</p>
                {pub.description && <p className="text-[12px] mt-1 font-medium">{pub.description}</p>}
              </div>
            ))}
          </div>
        </SectionRow>
      )}

      {/* Volunteer */}
      {optionalSections?.volunteer && optionalSections.volunteer.length > 0 && (
        <SectionRow title="Volunteer">
          <div className="space-y-4">
            {optionalSections.volunteer.map((vol) => (
              <div key={vol.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-[13px] uppercase">{vol.role}</h3>
                  <span className="text-[11px] font-bold">{vol.startDate} – {vol.endDate}</span>
                </div>
                <p className="text-[12px] font-bold italic">{vol.organization}</p>
                {vol.description && <p className="text-[12px] mt-1 font-medium">{vol.description}</p>}
              </div>
            ))}
          </div>
        </SectionRow>
      )}

    </div>
  );
}
