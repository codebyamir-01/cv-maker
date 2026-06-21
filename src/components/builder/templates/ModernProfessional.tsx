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
          
          {personalInfo.photo && (
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
          
          <div className="mb-6 opacity-50">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-3 border-b border-slate-300 pb-1">
              Skills
            </h2>
            <p className="text-sm italic">Skills coming soon...</p>
          </div>
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
        </div>
      </div>
    </div>
  );
}
