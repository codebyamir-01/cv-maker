import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  github: string;
  portfolio: string;
  photo?: string;
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

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  templateId: string;
  accentColor: string;
}

interface ResumeState {
  resumeData: ResumeData;
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

  addProject: (project: Project) => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  removeProject: (id: string) => void;
  updateProjects: (projects: Project[]) => void;
  updateTemplateId: (templateId: string) => void;
  updateAccentColor: (color: string) => void;
}

const initialData: ResumeData = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    linkedIn: "",
    github: "",
    portfolio: "",
    photo: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  projects: [],
  templateId: "ats-classic",
  accentColor: "#0d9488",
};

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      resumeData: initialData,

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

  addProject: (project) =>
    set((state) => ({
      resumeData: { ...state.resumeData, projects: [...state.resumeData.projects, project] },
    })),

  updateProject: (id, data) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: state.resumeData.projects.map((proj) => 
          proj.id === id ? { ...proj, ...data } : proj
        ),
      },
    })),

  removeProject: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: state.resumeData.projects.filter((proj) => proj.id !== id),
      },
    })),

  updateProjects: (projects) =>
    set((state) => ({
      resumeData: { ...state.resumeData, projects },
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
    }
  )
);
