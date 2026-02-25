import { create } from 'zustand';

export interface ResumeData {
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
        jobTitle: string;
        website?: string;
        profilePhoto?: string;
    };
    summary: string;
    experience: {
        id: string;
        company: string;
        position: string;
        location: string;
        startDate: string;
        endDate: string;
        current: boolean;
        description: string;
    }[];
    education: {
        id: string;
        school: string;
        degree: string;
        field: string;
        startDate: string;
        endDate: string;
        location: string;
    }[];
    skills: {
        id: string;
        name: string;
        level: string;
    }[];
    projects: {
        id: string;
        name: string;
        description: string;
        link?: string;
    }[];
    templateId: string;
    pageSettings: {
        format: 'A4' | 'Letter' | 'Custom';
        width: number;
        height: number;
        margins: number;
        cropToContent: boolean;
    };
}

interface ResumeState {
    resumeData: ResumeData;
    zoom: number;
    setZoom: (zoom: number) => void;
    updatePersonalInfo: (data: Partial<ResumeData['personalInfo']>) => void;
    updateSummary: (summary: string) => void;
    addExperience: () => void;
    updateExperience: (id: string, data: Partial<ResumeData['experience'][0]>) => void;
    removeExperience: (id: string) => void;
    addEducation: () => void;
    updateEducation: (id: string, data: Partial<ResumeData['education'][0]>) => void;
    removeEducation: (id: string) => void;
    addSkill: () => void;
    updateSkill: (id: string, name: string) => void;
    removeSkill: (id: string) => void;
    addProject: () => void;
    updateProject: (id: string, data: Partial<ResumeData['projects'][0]>) => void;
    removeProject: (id: string) => void;
    setTemplate: (id: string) => void;
    updatePageSettings: (settings: Partial<ResumeData['pageSettings']>) => void;
    reorderExperience: (startIndex: number, endIndex: number) => void;
    reorderEducation: (startIndex: number, endIndex: number) => void;
    reorderProjects: (startIndex: number, endIndex: number) => void;
    isAiOpen: boolean;
    setAiOpen: (isOpen: boolean) => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
    isAiOpen: false,
    setAiOpen: (isOpen) => set({ isAiOpen: isOpen }),
    zoom: 0.7,
    setZoom: (zoom) => set({ zoom }),
    resumeData: {
        personalInfo: {
            fullName: '',
            email: '',
            phone: '',
            location: '',
            jobTitle: '',
            website: '',
            profilePhoto: '',
        },
        summary: '',
        experience: [],
        education: [],
        skills: [],
        projects: [],
        templateId: 'classic-midnight',
        pageSettings: {
            format: 'A4',
            width: 210,
            height: 297,
            margins: 40,
            cropToContent: false,
        },
    },
    updatePageSettings: (settings) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                pageSettings: { ...state.resumeData.pageSettings, ...settings },
            },
        })),
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
    addExperience: () =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                experience: [
                    ...state.resumeData.experience,
                    {
                        id: Math.random().toString(36).substr(2, 9),
                        company: '',
                        position: '',
                        location: '',
                        startDate: '',
                        endDate: '',
                        current: false,
                        description: '',
                    },
                ],
            },
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
    reorderExperience: (startIndex, endIndex) =>
        set((state) => {
            const experience = [...state.resumeData.experience];
            const [removed] = experience.splice(startIndex, 1);
            experience.splice(endIndex, 0, removed);
            return {
                resumeData: { ...state.resumeData, experience },
            };
        }),
    removeExperience: (id) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                experience: state.resumeData.experience.filter((exp) => exp.id !== id),
            },
        })),
    addEducation: () =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                education: [
                    ...state.resumeData.education,
                    {
                        id: Math.random().toString(36).substr(2, 9),
                        school: '',
                        degree: '',
                        field: '',
                        startDate: '',
                        endDate: '',
                        location: '',
                    },
                ],
            },
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
    reorderEducation: (startIndex, endIndex) =>
        set((state) => {
            const education = [...state.resumeData.education];
            const [removed] = education.splice(startIndex, 1);
            education.splice(endIndex, 0, removed);
            return {
                resumeData: { ...state.resumeData, education },
            };
        }),
    removeEducation: (id) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                education: state.resumeData.education.filter((edu) => edu.id !== id),
            },
        })),
    addSkill: () =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                skills: [
                    ...state.resumeData.skills,
                    {
                        id: Math.random().toString(36).substr(2, 9),
                        name: '',
                        level: 'Intermediate',
                    },
                ],
            },
        })),
    updateSkill: (id, name) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                skills: state.resumeData.skills.map((skill) =>
                    skill.id === id ? { ...skill, name } : skill
                ),
            },
        })),
    removeSkill: (id) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                skills: state.resumeData.skills.filter((skill) => skill.id !== id),
            },
        })),
    addProject: () =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                projects: [
                    ...state.resumeData.projects,
                    {
                        id: Math.random().toString(36).substr(2, 9),
                        name: '',
                        description: '',
                        link: '',
                    },
                ],
            },
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
    reorderProjects: (startIndex, endIndex) =>
        set((state) => {
            const projects = [...state.resumeData.projects];
            const [removed] = projects.splice(startIndex, 1);
            projects.splice(endIndex, 0, removed);
            return {
                resumeData: { ...state.resumeData, projects },
            };
        }),
    removeProject: (id) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                projects: state.resumeData.projects.filter((proj) => proj.id !== id),
            },
        })),
    setTemplate: (id) =>
        set((state) => ({
            resumeData: { ...state.resumeData, templateId: id },
        })),
}));
