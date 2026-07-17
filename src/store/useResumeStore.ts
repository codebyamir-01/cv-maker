import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  fullName: string; // Kept for backward compatibility
  jobTitle: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  location: string; // Kept for backward compatibility
  linkedIn: string;
  github: string;
  portfolio: string;
  photo?: string;
  showPhoto?: boolean;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
  currentlyStudying?: boolean;
  grade: string;
}

export interface Skill {
  id: string;
  name: string;
  category: "Technical" | "Soft" | "Tools" | "Languages";
}

export interface Project {
  id: string;
  name: string;
  techStack: string;
  description: string;
  link: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  doesNotExpire?: boolean;
  link: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string; // Basic, Intermediate, Fluent, Native
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
}

export interface Volunteer {
  id: string;
  role: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyVolunteering?: boolean;
  description: string;
}

export interface Publication {
  id: string;
  title: string;
  publisher: string;
  date: string;
  link: string;
  description: string;
}

export interface OptionalSections {
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  awards: Award[];
  volunteer: Volunteer[];
  publications: Publication[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  optionalSections: OptionalSections;
  
  // Keep projects at root strictly for backward compatibility with older local storage
  projects?: Project[];
  
  templateId: string;
  accentColor: string;
}

interface ResumeState {
  databaseId: string | null;
  slug: string | null;
  resumeData: ResumeData;
  setDatabaseId: (id: string | null) => void;
  setSlug: (slug: string | null) => void;
  setResumeData: (data: ResumeData) => void;
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  updateSummary: (summary: string) => void;
  
  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  removeExperience: (id: string) => void;

  addEducation: (edu: Education) => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;

  addSkill: (skill: Skill) => void;
  removeSkill: (id: string) => void;

  // Generic optional section updaters
  addOptionalItem: <K extends keyof OptionalSections>(section: K, item: OptionalSections[K][0]) => void;
  updateOptionalItem: <K extends keyof OptionalSections>(section: K, id: string, data: Partial<OptionalSections[K][0]>) => void;
  removeOptionalItem: <K extends keyof OptionalSections>(section: K, id: string) => void;

  // Aliases for legacy project functions to not break existing code
  addProject: (project: Project) => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  removeProject: (id: string) => void;
  updateProjects: (projects: Project[]) => void;

  updateTemplateId: (templateId: string) => void;
  updateAccentColor: (color: string) => void;
  resetStore: () => void;
}

const initialData: ResumeData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    location: "",
    linkedIn: "",
    github: "",
    portfolio: "",
    photo: "",
    showPhoto: true,
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  optionalSections: {
    projects: [],
    certifications: [],
    languages: [],
    awards: [],
    volunteer: [],
    publications: []
  },
  templateId: "ats-classic",
  accentColor: "#0d9488",
};

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      databaseId: null,
      slug: null,
      resumeData: initialData,

      setDatabaseId: (id) => set({ databaseId: id }),
      setSlug: (slug) => set({ slug }),
      
      setResumeData: (data) => set({ resumeData: data }),

      resetStore: () => set({ databaseId: null, slug: null, resumeData: initialData }),

      updatePersonalInfo: (data) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            personalInfo: { ...state.resumeData.personalInfo, ...data },
          },
        })),

      updateSummary: (summary) =>
        set((state) => ({
          resumeData: { ...state.resumeData, summary },
        })),

      addExperience: (exp) =>
        set((state) => ({
          resumeData: { ...state.resumeData, experience: [...state.resumeData.experience, exp] },
        })),

      updateExperience: (id, data) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.map((exp) => 
              exp.id === id ? { ...exp, ...data } : exp
            ),
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.filter((exp) => exp.id !== id),
          },
        })),

      addEducation: (edu) =>
        set((state) => ({
          resumeData: { ...state.resumeData, education: [...state.resumeData.education, edu] },
        })),

      updateEducation: (id, data) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.map((edu) => 
              edu.id === id ? { ...edu, ...data } : edu
            ),
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.filter((edu) => edu.id !== id),
          },
        })),

      addSkill: (skill) =>
        set((state) => ({
          resumeData: { ...state.resumeData, skills: [...state.resumeData.skills, skill] },
        })),

      removeSkill: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.filter((skill) => skill.id !== id),
          },
        })),

      // Generic optional item handlers
      addOptionalItem: (section, item) =>
        set((state) => {
          const currentSection = state.resumeData.optionalSections?.[section] || [];
          return {
            resumeData: {
              ...state.resumeData,
              optionalSections: {
                ...state.resumeData.optionalSections,
                [section]: [...currentSection, item],
              },
            },
          };
        }),

      updateOptionalItem: (section, id, data) =>
        set((state) => {
          const currentSection = state.resumeData.optionalSections?.[section] || [];
          return {
            resumeData: {
              ...state.resumeData,
              optionalSections: {
                ...state.resumeData.optionalSections,
                // @ts-ignore
                [section]: currentSection.map((item) => (item.id === id ? { ...item, ...data } : item)),
              },
            },
          };
        }),

      removeOptionalItem: (section, id) =>
        set((state) => {
          const currentSection = state.resumeData.optionalSections?.[section] || [];
          return {
            resumeData: {
              ...state.resumeData,
              optionalSections: {
                ...state.resumeData.optionalSections,
                // @ts-ignore
                [section]: currentSection.filter((item) => item.id !== id),
              },
            },
          };
        }),

      // Legacy aliases pointing to optionalSections.projects
      addProject: (project) =>
        set((state) => {
          const currentProjects = state.resumeData.optionalSections?.projects || state.resumeData.projects || [];
          return {
            resumeData: {
              ...state.resumeData,
              optionalSections: {
                ...state.resumeData.optionalSections,
                projects: [...currentProjects, project],
              },
            },
          };
        }),

      updateProject: (id, data) =>
        set((state) => {
          const currentProjects = state.resumeData.optionalSections?.projects || state.resumeData.projects || [];
          return {
            resumeData: {
              ...state.resumeData,
              optionalSections: {
                ...state.resumeData.optionalSections,
                projects: currentProjects.map((proj) => 
                  proj.id === id ? { ...proj, ...data } : proj
                ),
              },
            },
          };
        }),

      removeProject: (id) =>
        set((state) => {
          const currentProjects = state.resumeData.optionalSections?.projects || state.resumeData.projects || [];
          return {
            resumeData: {
              ...state.resumeData,
              optionalSections: {
                ...state.resumeData.optionalSections,
                projects: currentProjects.filter((proj) => proj.id !== id),
              },
            },
          };
        }),

      updateProjects: (projects) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            optionalSections: {
              ...state.resumeData.optionalSections,
              projects,
            },
          },
        })),

      updateTemplateId: (templateId) =>
        set((state) => ({
          resumeData: { ...state.resumeData, templateId },
        })),

      updateAccentColor: (accentColor) =>
        set((state) => ({
          resumeData: { ...state.resumeData, accentColor },
        })),
    }),
    {
      name: "resume-storage",
      onRehydrateStorage: () => (state) => {
        // Migration logic for old stored data when page reloads
        if (state && state.resumeData) {
          if (!state.resumeData.optionalSections) {
            state.resumeData.optionalSections = {
              projects: state.resumeData.projects || [],
              certifications: [],
              languages: [],
              awards: [],
              volunteer: [],
              publications: []
            };
          } else if (state.resumeData.projects && state.resumeData.optionalSections.projects.length === 0) {
            // Migrate root projects to optionalSections if optionalSections is empty
            state.resumeData.optionalSections.projects = state.resumeData.projects;
          }
        }
      }
    }
  )
);
