import { useResumeStore, ResumeData } from "@/lib/store";
import { Mail, Phone, MapPin, User, Briefcase, GraduationCap, Code, Globe, Linkedin, Github, ArrowUp, ArrowDown } from "lucide-react";
import React from "react";
import EditableText from "../builder/EditableText";

export type LayoutId = "classic" | "sidebar" | "grid" | "executive" | "minimalist" | "compact" | "modern" | "clean" | "bold" | "technical" | "corporate" | "developer" | "modern-minimal" | "entrepreneur";
export type ThemeId = "midnight" | "sapphire" | "emerald" | "ruby" | "amber" | "slate" | "rose" | "indigo" | "forest" | "crimson";

interface ThemeStyles {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    muted: string;
    border: string;
    bg: string;
    sidebarBg?: string;
}

const THEMES: Record<ThemeId, ThemeStyles> = {
    midnight: { primary: "#0f172a", secondary: "#1e293b", accent: "#3b82f6", text: "#0f172a", muted: "#64748b", border: "#e2e8f0", bg: "#ffffff" },
    sapphire: { primary: "#1e3a8a", secondary: "#1e40af", accent: "#60a5fa", text: "#1e3a8a", muted: "#64748b", border: "#dbeafe", bg: "#ffffff" },
    emerald: { primary: "#064e3b", secondary: "#065f46", accent: "#34d399", text: "#064e3b", muted: "#64748b", border: "#d1fae5", bg: "#ffffff" },
    ruby: { primary: "#991b1b", secondary: "#b91c1c", accent: "#f87171", text: "#991b1b", muted: "#64748b", border: "#fee2e2", bg: "#ffffff" },
    amber: { primary: "#92400e", secondary: "#b45309", accent: "#fbbf24", text: "#92400e", muted: "#64748b", border: "#fef3c7", bg: "#ffffff" },
    slate: { primary: "#334155", secondary: "#475569", accent: "#94a3b8", text: "#334155", muted: "#64748b", border: "#f1f5f9", bg: "#ffffff" },
    rose: { primary: "#9f1239", secondary: "#be123c", accent: "#fb7185", text: "#9f1239", muted: "#64748b", border: "#ffe4e6", bg: "#ffffff" },
    indigo: { primary: "#3730a3", secondary: "#4338ca", accent: "#818cf8", text: "#3730a3", muted: "#64748b", border: "#e0e7ff", bg: "#ffffff" },
    forest: { primary: "#14532d", secondary: "#166534", accent: "#4ade80", text: "#14532d", muted: "#64748b", border: "#dcfce7", bg: "#ffffff" },
    crimson: { primary: "#7f1d1d", secondary: "#991b1b", accent: "#f87171", text: "#7f1d1d", muted: "#64748b", border: "#fee2e2", bg: "#ffffff" },
};

export default function UniversalTemplate({ data, layoutId, themeId }: { data: ResumeData; layoutId: LayoutId; themeId: ThemeId }) {
    const theme = THEMES[themeId] || THEMES.midnight;
    const { personalInfo, summary, experience, education, skills, projects, pageSettings } = data;
    const { margins } = pageSettings;

    const updatePersonalInfo = useResumeStore(state => state.updatePersonalInfo);
    const updateSummary = useResumeStore(state => state.updateSummary);
    const updateExperience = useResumeStore(state => state.updateExperience);
    const updateEducation = useResumeStore(state => state.updateEducation);
    const updateSkill = useResumeStore(state => state.updateSkill);
    const updateProject = useResumeStore(state => state.updateProject);
    const reorderExperience = useResumeStore(state => state.reorderExperience);
    const reorderEducation = useResumeStore(state => state.reorderEducation);
    const reorderProjects = useResumeStore(state => state.reorderProjects);

    // Unified design system tokens
    const styles = {
        h1: "text-5xl font-black uppercase tracking-[-0.04em] leading-tight",
        h2: "text-xs font-black uppercase tracking-[0.4em] mb-10 border-b-2 pb-3",
        h3: "font-bold text-xl tracking-tight",
        section: "space-y-12",
        label: "text-[10px] font-black opacity-30 uppercase tracking-widest",
        text: "text-[13px] leading-relaxed text-gray-500 font-medium",
    };

    const renderTechnical = () => (
        <div className="min-h-full overflow-y-auto bg-[#0d1117]" style={{ color: "#e6edf3", padding: `${margins}px`, fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
            <header className="pb-12 mb-12 border-b border-gray-800">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-blue-400 text-xs mb-2 flex items-center gap-2">
                            <Code className="w-3 h-3" /> <span>class</span> <span className="text-yellow-200">Professional</span> <span className="text-white">{`{`}</span>
                        </div>
                        <EditableText
                            tag="h1"
                            value={personalInfo.fullName}
                            onUpdate={(v) => updatePersonalInfo({ fullName: v })}
                            className="text-5xl font-black uppercase tracking-tighter pl-4"
                            style={{ color: "#fff" }}
                        />
                        <div className="flex items-center gap-2 pl-4 mt-2">
                            <span className="text-blue-300 text-sm font-bold italic">//</span>
                            <EditableText
                                tag="p"
                                value={personalInfo.jobTitle}
                                onUpdate={(v) => updatePersonalInfo({ jobTitle: v })}
                                className="text-blue-300 text-sm font-bold italic"
                            />
                        </div>
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono text-right space-y-1">
                        <div className="flex justify-end items-center gap-1">
                            <span className="text-purple-400">const</span><span> location = </span><span className="text-green-300">"</span>
                            <EditableText value={personalInfo.location} onUpdate={(v) => updatePersonalInfo({ location: v })} className="text-green-300 inline" />
                            <span className="text-green-300">"</span><span>;</span>
                        </div>
                        <div className="flex justify-end items-center gap-1">
                            <span className="text-purple-400">const</span><span> contact = </span><span className="text-green-300">"</span>
                            <EditableText value={personalInfo.email} onUpdate={(v) => updatePersonalInfo({ email: v })} className="text-green-300 inline" />
                            <span className="text-green-300">"</span><span>;</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="space-y-16 pl-4 border-l border-gray-800">
                <section>
                    <h2 className="text-pink-400 text-[10px] font-bold uppercase mb-6 flex items-center gap-2">
                        <User className="w-3 h-3" /> /** @description Profile */
                    </h2>
                    <div className="flex items-start gap-1">
                        <span className="text-orange-300">return</span><span className="text-gray-400"> "</span>
                        <EditableText
                            value={summary}
                            onUpdate={updateSummary}
                            multiline={true}
                            className="text-sm leading-relaxed text-gray-400 font-medium inline"
                        />
                        <span className="text-gray-400">";</span>
                    </div>
                </section>

                <section>
                    <h2 className="text-pink-400 text-[10px] font-bold uppercase mb-10 flex items-center gap-2">
                        <Briefcase className="w-3 h-3" /> /** @description Technical_Experience */
                    </h2>
                    <div className="space-y-12">
                        {experience.map((exp, idx: number) => (
                            <div key={exp.id} className="relative">
                                <div className="flex justify-between items-baseline mb-3">
                                    <EditableText
                                        tag="h3"
                                        value={exp.position}
                                        onUpdate={(v) => updateExperience(exp.id, { position: v })}
                                        className="font-bold text-xl text-blue-300 tracking-tight"
                                        showControls={true}
                                        onMoveUp={idx > 0 ? () => reorderExperience(idx, idx - 1) : undefined}
                                        onMoveDown={idx < experience.length - 1 ? () => reorderExperience(idx, idx + 1) : undefined}
                                    />
                                    <div className="text-[10px] text-gray-600 font-mono flex items-center gap-1">
                                        <span>[</span>
                                        <EditableText value={exp.startDate} onUpdate={(v) => updateExperience(exp.id, { startDate: v })} />
                                        <span>-</span>
                                        <EditableText value={exp.endDate} onUpdate={(v) => updateExperience(exp.id, { endDate: v })} />
                                        <span>]</span>
                                    </div>
                                </div>
                                <EditableText value={exp.company} onUpdate={(v) => updateExperience(exp.id, { company: v })} className="text-xs text-yellow-100/50 mb-4 uppercase tracking-widest" />
                                <div className="border-l-2 border-blue-400/20 pl-6">
                                    <EditableText value={exp.description} onUpdate={(v) => updateExperience(exp.id, { description: v })} multiline={true} className="text-[13px] leading-relaxed text-gray-400 font-medium whitespace-pre-line" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-2 gap-16">
                    <section>
                        <h2 className="text-pink-400 text-[10px] font-bold uppercase mb-8 flex items-center gap-2">
                            <Code className="w-3 h-3" /> /** @description Skill_Stack */
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map(s => (
                                <EditableText
                                    key={s.id}
                                    value={s.name}
                                    onUpdate={(v) => updateSkill(s.id, v)}
                                    className="px-3 py-1.5 bg-blue-400/5 border border-blue-400/20 text-[9px] font-bold text-blue-200 uppercase tracking-widest rounded"
                                />
                            ))}
                        </div>
                    </section>
                    <section>
                        <h2 className="text-pink-400 text-[10px] font-bold uppercase mb-8 flex items-center gap-2">
                            <GraduationCap className="w-3 h-3" /> /** @description Education */
                        </h2>
                        {education.map((edu, idx: number) => (
                            <div key={edu.id} className="mb-6">
                                <EditableText
                                    tag="h3"
                                    value={edu.degree}
                                    onUpdate={(v) => updateEducation(edu.id, { degree: v })}
                                    className="font-bold text-xs text-blue-300 uppercase"
                                    showControls={true}
                                    onMoveUp={idx > 0 ? () => reorderEducation(idx, idx - 1) : undefined}
                                    onMoveDown={idx < education.length - 1 ? () => reorderEducation(idx, idx + 1) : undefined}
                                />
                                <EditableText value={edu.school} onUpdate={(v) => updateEducation(edu.id, { school: v })} className="text-[10px] text-gray-500 uppercase tracking-widest mt-1" />
                            </div>
                        ))}
                    </section>
                </div>
            </div>
            <div className="mt-12 text-white/10 text-[10px] font-mono">{`}`} // End of Professional class</div>
        </div>
    );
    const renderClassic = () => (
        <div className="min-h-full overflow-y-auto bg-white" style={{ color: theme.text, padding: `${margins}px`, fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
            {/* Signature Header */}
            <header className="text-center space-y-6 pb-12 mb-12 border-b-2" style={{ borderColor: theme.primary + "10" }}>
                <div className="space-y-2">
                    <EditableText
                        tag="h1"
                        value={personalInfo.fullName}
                        onUpdate={(v) => updatePersonalInfo({ fullName: v })}
                        className="text-5xl font-black uppercase tracking-[-0.04em] leading-tight"
                        style={{ color: theme.primary }}
                    />
                    <div className="h-1.5 w-16 bg-black mx-auto rounded-full" style={{ backgroundColor: theme.primary }} />
                </div>

                <EditableText
                    tag="p"
                    value={personalInfo.jobTitle}
                    onUpdate={(v) => updatePersonalInfo({ jobTitle: v })}
                    className="text-lg font-bold uppercase tracking-[0.3em] opacity-80"
                    style={{ color: theme.primary }}
                />

                <div className="flex justify-center flex-wrap gap-x-8 gap-y-3 text-[10px] font-bold uppercase tracking-[0.15em] opacity-40">
                    <EditableText value={personalInfo.email} onUpdate={(v) => updatePersonalInfo({ email: v })} />
                    <span className="opacity-20">•</span>
                    <EditableText value={personalInfo.phone} onUpdate={(v) => updatePersonalInfo({ phone: v })} />
                    <span className="opacity-20">•</span>
                    <EditableText value={personalInfo.location} onUpdate={(v) => updatePersonalInfo({ location: v })} />
                </div>
            </header>

            <div className="grid grid-cols-12 gap-16">
                <div className="col-span-8 space-y-12">
                    {/* Experience Section */}
                    {experience.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] mb-10 border-b-2 pb-3" style={{ color: theme.primary, borderColor: theme.primary + "10" }}>Professional Experience</h2>
                            <div className="space-y-12">
                                {experience.map((exp, idx: number) => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <EditableText
                                                tag="h3"
                                                value={exp.position}
                                                onUpdate={(v) => updateExperience(exp.id, { position: v })}
                                                className="font-bold text-xl tracking-tight"
                                                style={{ color: theme.primary }}
                                                showControls={true}
                                                onMoveUp={idx > 0 ? () => reorderExperience(idx, idx - 1) : undefined}
                                                onMoveDown={idx < experience.length - 1 ? () => reorderExperience(idx, idx + 1) : undefined}
                                            />
                                            <div className="flex items-center gap-2">
                                                <EditableText value={exp.startDate} onUpdate={(v) => updateExperience(exp.id, { startDate: v })} className="text-[10px] font-black opacity-30 uppercase tracking-widest" />
                                                <span className="opacity-20">—</span>
                                                <EditableText value={exp.endDate} onUpdate={(v) => updateExperience(exp.id, { endDate: v })} className="text-[10px] font-black opacity-30 uppercase tracking-widest" />
                                            </div>
                                        </div>
                                        <EditableText value={exp.company} onUpdate={(v) => updateExperience(exp.id, { company: v })} className="text-sm font-bold opacity-60 mb-5 uppercase tracking-widest" style={{ color: theme.accent }} />
                                        <EditableText value={exp.description} onUpdate={(v) => updateExperience(exp.id, { description: v })} multiline={true} className="text-[13px] leading-relaxed text-gray-500 whitespace-pre-line text-justify font-medium" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education Section */}
                    {education.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] mb-10 border-b-2 pb-3" style={{ color: theme.primary, borderColor: theme.primary + "10" }}>Education & Training</h2>
                            <div className="space-y-8">
                                {education.map((edu, idx: number) => (
                                    <div key={edu.id} className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <EditableText
                                                tag="h3"
                                                value={edu.degree}
                                                onUpdate={(v) => updateEducation(edu.id, { degree: v })}
                                                className="font-bold text-base tracking-tight"
                                                style={{ color: theme.primary }}
                                                showControls={true}
                                                onMoveUp={idx > 0 ? () => reorderEducation(idx, idx - 1) : undefined}
                                                onMoveDown={idx < education.length - 1 ? () => reorderEducation(idx, idx + 1) : undefined}
                                            />
                                            <div className="flex items-center gap-2 text-sm opacity-50 font-medium">
                                                <EditableText value={edu.school} onUpdate={(v) => updateEducation(edu.id, { school: v })} />
                                                {edu.field && (
                                                    <>
                                                        <span>•</span>
                                                        <EditableText value={edu.field} onUpdate={(v) => updateEducation(edu.id, { field: v })} />
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <EditableText value={edu.endDate} onUpdate={(v) => updateEducation(edu.id, { endDate: v })} className="text-[10px] font-bold opacity-30" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="col-span-4 space-y-12">
                    {/* Summary Section */}
                    {summary && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] mb-6 border-b-2 pb-3" style={{ color: theme.primary, borderColor: theme.primary + "10" }}>Profile</h2>
                            <EditableText
                                value={summary}
                                onUpdate={updateSummary}
                                multiline={true}
                                className="text-[13px] leading-relaxed text-justify text-gray-400 font-medium italic opacity-80 italic"
                            />
                        </section>
                    )}

                    {/* Skills Section with Progress Bars */}
                    {skills.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] mb-8 border-b-2 pb-3" style={{ color: theme.primary, borderColor: theme.primary + "10" }}>Expertise</h2>
                            <div className="space-y-6">
                                {skills.map(skill => (
                                    <div key={skill.id} className="space-y-3">
                                        <EditableText
                                            value={skill.name}
                                            onUpdate={(v) => updateSkill(skill.id, v)}
                                            className="text-[10px] font-bold uppercase tracking-widest opacity-60"
                                        />
                                        <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="min-h-full rounded-full transition-all duration-1000"
                                                style={{
                                                    width: "85%", // Defaulting to high proficiency
                                                    backgroundColor: theme.primary
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );

    const renderSidebar = () => (
        <div className="flex h-full bg-white" style={{ color: theme.text, padding: `${margins}px`, fontFamily: "'Inter', sans-serif" }}>
            {/* Left Sidebar */}
            <div className="w-1/3 p-12 flex flex-col gap-12 border-r" style={{ borderColor: theme.primary + "10" }}>
                <section>
                    <div className="w-32 h-32 rounded-3xl mb-8 flex items-center justify-center overflow-hidden bg-gray-50 border relative" style={{ borderColor: theme.primary + "10" }}>
                        {personalInfo.profilePhoto ? (
                            <img src={personalInfo.profilePhoto} alt={personalInfo.fullName} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-4xl font-black opacity-10" style={{ color: theme.primary }}>
                                {personalInfo.fullName?.split(" ").map(n => n[0]).join("")}
                            </span>
                        )}
                    </div>
                    <EditableText
                        tag="h1"
                        value={personalInfo.fullName}
                        onUpdate={(v) => updatePersonalInfo({ fullName: v })}
                        className="text-3xl font-black leading-tight mb-3 tracking-tighter"
                        style={{ color: theme.primary }}
                    />
                    <EditableText
                        tag="p"
                        value={personalInfo.jobTitle}
                        onUpdate={(v) => updatePersonalInfo({ jobTitle: v })}
                        className="font-bold text-xs uppercase tracking-widest opacity-60"
                        style={{ color: theme.accent }}
                    />
                </section>

                <section className="space-y-6">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">Contact</h2>
                    <ul className="space-y-4 text-xs font-medium text-gray-400">
                        <li className="flex flex-col gap-1">
                            <span className="text-[9px] uppercase tracking-widest opacity-40">Email</span>
                            <EditableText value={personalInfo.email} onUpdate={(v) => updatePersonalInfo({ email: v })} />
                        </li>
                        <li className="flex flex-col gap-1">
                            <span className="text-[9px] uppercase tracking-widest opacity-40">Phone</span>
                            <EditableText value={personalInfo.phone} onUpdate={(v) => updatePersonalInfo({ phone: v })} />
                        </li>
                        <li className="flex flex-col gap-1">
                            <span className="text-[9px] uppercase tracking-widest opacity-40">Location</span>
                            <EditableText value={personalInfo.location} onUpdate={(v) => updatePersonalInfo({ location: v })} />
                        </li>
                    </ul>
                </section>

                <section className="space-y-6">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">Education</h2>
                    <div className="space-y-6">
                        {education.map((edu, idx: number) => (
                            <div key={edu.id}>
                                <EditableText
                                    tag="h3"
                                    value={edu.degree}
                                    onUpdate={(v) => updateEducation(edu.id, { degree: v })}
                                    className="font-bold text-sm"
                                    style={{ color: theme.primary }}
                                    showControls={true}
                                    onMoveUp={idx > 0 ? () => reorderEducation(idx, idx - 1) : undefined}
                                    onMoveDown={idx < education.length - 1 ? () => reorderEducation(idx, idx + 1) : undefined}
                                />
                                <EditableText value={edu.school} onUpdate={(v) => updateEducation(edu.id, { school: v })} className="text-[10px] text-gray-400 font-medium" />
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-16 overflow-y-auto">
                {summary && (
                    <section className="mb-16">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 opacity-30">Profile</h2>
                        <EditableText
                            value={summary}
                            onUpdate={updateSummary}
                            multiline={true}
                            className="text-sm leading-relaxed text-gray-500 font-medium italic"
                        />
                    </section>
                )}

                <section className="mb-16">
                    <h2 className="text-xs font-black uppercase tracking-[0.4em] mb-10 border-b pb-4" style={{ color: theme.primary, borderColor: theme.primary + "10" }}>Experience</h2>
                    <div className="space-y-12">
                        {experience.map((exp, idx: number) => (
                            <div key={exp.id} className="relative pl-8 border-l-2" style={{ borderColor: theme.primary + "10" }}>
                                <div className="absolute left-[-6px] top-1 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.accent }} />
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex-1">
                                        <EditableText
                                            tag="h3"
                                            value={exp.position}
                                            onUpdate={(v) => updateExperience(exp.id, { position: v })}
                                            className="font-black text-lg"
                                            style={{ color: theme.primary }}
                                            showControls={true}
                                            onMoveUp={idx > 0 ? () => reorderExperience(idx, idx - 1) : undefined}
                                            onMoveDown={idx < experience.length - 1 ? () => reorderExperience(idx, idx + 1) : undefined}
                                        />
                                        <EditableText value={exp.company} onUpdate={(v) => updateExperience(exp.id, { company: v })} className="text-xs font-bold opacity-60 uppercase tracking-widest" style={{ color: theme.accent }} />
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] font-black opacity-20">
                                        <EditableText value={exp.startDate} onUpdate={(v) => updateExperience(exp.id, { startDate: v })} />
                                        <span>—</span>
                                        <EditableText value={exp.endDate} onUpdate={(v) => updateExperience(exp.id, { endDate: v })} />
                                    </div>
                                </div>
                                <EditableText value={exp.description} onUpdate={(v) => updateExperience(exp.id, { description: v })} multiline={true} className="text-[13px] leading-relaxed text-gray-400 font-medium text-justify" />
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-xs font-black uppercase tracking-[0.4em] mb-10 border-b pb-4" style={{ color: theme.primary, borderColor: theme.primary + "10" }}>Expertise</h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                            <EditableText
                                key={skill.id}
                                value={skill.name}
                                onUpdate={(v) => updateSkill(skill.id, v)}
                                className="px-4 py-2 rounded-xl text-[10px] font-black border uppercase tracking-widest"
                                style={{ borderColor: theme.primary + "10", color: theme.primary }}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );

    const renderGrid = () => (
        <div className="min-h-full flex flex-col bg-white overflow-hidden" style={{ color: theme.text, padding: `${margins}px`, fontFamily: "'Inter', sans-serif" }}>
            <header className="px-16 pt-16 pb-12 border-b-2 flex justify-between items-end" style={{ borderColor: theme.primary + "10" }}>
                <div>
                    <EditableText
                        tag="h1"
                        value={personalInfo.fullName}
                        onUpdate={(v) => updatePersonalInfo({ fullName: v })}
                        className="text-5xl font-black tracking-tight"
                        style={{ color: theme.primary }}
                    />
                    <EditableText
                        tag="p"
                        value={personalInfo.jobTitle}
                        onUpdate={(v) => updatePersonalInfo({ jobTitle: v })}
                        className="text-md font-bold uppercase tracking-[0.4em] mt-3 opacity-40"
                        style={{ color: theme.primary }}
                    />
                </div>
                <div className="text-right space-y-1 text-[10px] font-black uppercase tracking-widest opacity-30">
                    <EditableText value={personalInfo.location} onUpdate={(v) => updatePersonalInfo({ location: v })} />
                    <EditableText value={personalInfo.email} onUpdate={(v) => updatePersonalInfo({ email: v })} />
                </div>
            </header>
            <main className="flex-1 grid grid-cols-12 gap-0 overflow-hidden">
                {/* Left Primary Column */}
                <div className="col-span-8 p-16 space-y-16 border-r overflow-y-auto scrollbar-hide" style={{ borderColor: theme.primary + "05" }}>
                    {summary && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] mb-10 opacity-20">Career Narrative</h2>
                            <EditableText
                                value={summary}
                                onUpdate={updateSummary}
                                multiline={true}
                                className="text-sm leading-relaxed text-gray-400 font-medium italic text-justify"
                            />
                        </section>
                    )}
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] mb-10 opacity-20">Milestones</h2>
                        <div className="space-y-12">
                            {experience.map((exp, idx: number) => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <EditableText
                                            tag="h3"
                                            value={exp.position}
                                            onUpdate={(v) => updateExperience(exp.id, { position: v })}
                                            className="text-xl font-black uppercase tracking-tight"
                                            style={{ color: theme.primary }}
                                            showControls={true}
                                            onMoveUp={idx > 0 ? () => reorderExperience(idx, idx - 1) : undefined}
                                            onMoveDown={idx < experience.length - 1 ? () => reorderExperience(idx, idx + 1) : undefined}
                                        />
                                        <div className="text-[10px] font-black opacity-20 flex items-center gap-1">
                                            <EditableText value={exp.startDate} onUpdate={(v) => updateExperience(exp.id, { startDate: v })} />
                                            <span>-</span>
                                            <EditableText value={exp.endDate} onUpdate={(v) => updateExperience(exp.id, { endDate: v })} />
                                        </div>
                                    </div>
                                    <EditableText value={exp.company} onUpdate={(v) => updateExperience(exp.id, { company: v })} className="text-xs font-black uppercase tracking-[0.2em] mb-4" style={{ color: theme.accent }} />
                                    <EditableText value={exp.description} onUpdate={(v) => updateExperience(exp.id, { description: v })} multiline={true} className="text-[13px] leading-relaxed text-gray-500 font-medium text-justify" />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                {/* Right Secondary Column */}
                <div className="col-span-4 bg-gray-50/50 p-12 space-y-12 overflow-y-auto scrollbar-hide">
                    {personalInfo.profilePhoto && (
                        <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-lg grayscale hover:grayscale-0 transition-all duration-700">
                            <img src={personalInfo.profilePhoto} alt={personalInfo.fullName} className="w-full h-full object-cover" />
                        </div>
                    )}
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 opacity-40">Core Stack</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map(skill => (
                                <EditableText
                                    key={skill.id}
                                    value={skill.name}
                                    onUpdate={(v) => updateSkill(skill.id, v)}
                                    className="text-[9px] font-black px-3 py-1.5 bg-white border rounded shadow-sm uppercase tracking-widest"
                                    style={{ borderColor: theme.border, color: theme.primary }}
                                />
                            ))}
                        </div>
                    </section>
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 opacity-40">Credentials</h2>
                        <div className="space-y-6">
                            {education.map((edu, idx: number) => (
                                <div key={edu.id}>
                                    <EditableText
                                        tag="p"
                                        value={edu.degree}
                                        onUpdate={(v) => updateEducation(edu.id, { degree: v })}
                                        className="text-xs font-black text-gray-700 uppercase"
                                        showControls={true}
                                        onMoveUp={idx > 0 ? () => reorderEducation(idx, idx - 1) : undefined}
                                        onMoveDown={idx < education.length - 1 ? () => reorderEducation(idx, idx + 1) : undefined}
                                    />
                                    <EditableText value={edu.school} onUpdate={(v) => updateEducation(edu.id, { school: v })} className="text-[10px] uppercase tracking-widest opacity-40 mt-1" />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );

    const renderExecutive = () => (
        <div className="flex h-full bg-white" style={{ color: theme.text, padding: `${margins}px`, fontFamily: "'Inter', sans-serif" }}>
            {/* Sidebar Column */}
            <div className="w-1/3 p-12 flex flex-col gap-12 text-white" style={{ backgroundColor: theme.primary }}>
                <section>
                    <div className="w-32 h-32 rounded-full mx-auto mb-8 overflow-hidden border-4 border-white/20 shadow-xl" style={{ backgroundColor: theme.secondary }}>
                        {personalInfo.profilePhoto ? (
                            <img src={personalInfo.profilePhoto} alt={personalInfo.fullName} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="text-4xl font-black opacity-20">{personalInfo.fullName?.split(" ").map(n => n[0]).join("")}</span>
                            </div>
                        )}
                    </div>
                    <div className="text-center">
                        <EditableText
                            tag="h1"
                            value={personalInfo.fullName}
                            onUpdate={(v) => updatePersonalInfo({ fullName: v })}
                            className="text-3xl font-black uppercase tracking-tight mb-2"
                        />
                        <EditableText
                            tag="p"
                            value={personalInfo.jobTitle}
                            onUpdate={(v) => updatePersonalInfo({ jobTitle: v })}
                            className="text-[10px] font-black mt-4 uppercase tracking-[4px] border-t border-white/10 pt-4"
                            style={{ color: theme.accent }}
                        />
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-[9px] font-black uppercase tracking-[0.3em] border-b border-white/10 pb-3 opacity-40">Contact Info</h2>
                    <div className="space-y-4 text-[11px] font-medium opacity-80 uppercase tracking-widest">
                        <div className="flex flex-col gap-1">
                            <span className="text-[8px] opacity-40">Direct Email</span>
                            <EditableText value={personalInfo.email} onUpdate={(v) => updatePersonalInfo({ email: v })} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[8px] opacity-40">Contact Number</span>
                            <EditableText value={personalInfo.phone} onUpdate={(v) => updatePersonalInfo({ phone: v })} />
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-[9px] font-black uppercase tracking-[0.3em] border-b border-white/10 pb-3 opacity-40">Top Skills</h2>
                    <div className="flex flex-col gap-4">
                        {skills.map((skill) => (
                            <div key={skill.id} className="space-y-2">
                                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest opacity-80">
                                    <EditableText value={skill.name} onUpdate={(v) => updateSkill(skill.id, v)} />
                                </div>
                                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className="min-h-full bg-white opacity-60" style={{ width: "85%" }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Content Column */}
            <div className="flex-1 p-16 overflow-y-auto">
                {summary && (
                    <section className="mb-16">
                        <h2 className="text-xs font-black uppercase border-b-2 pb-4 mb-8" style={{ color: theme.primary, borderColor: theme.primary }}>Core Summary</h2>
                        <EditableText
                            value={summary}
                            onUpdate={updateSummary}
                            multiline={true}
                            className="text-sm leading-relaxed text-gray-500 font-medium italic text-justify"
                        />
                    </section>
                )}

                <section className="mb-16">
                    <h2 className="text-xs font-black uppercase border-b-2 pb-4 mb-10" style={{ color: theme.primary, borderColor: theme.primary }}>Experience</h2>
                    <div className="space-y-12">
                        {experience.map((exp, idx: number) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-3">
                                    <EditableText
                                        tag="h3"
                                        value={exp.position}
                                        onUpdate={(v) => updateExperience(exp.id, { position: v })}
                                        className="font-black text-xl tracking-tight"
                                        style={{ color: theme.primary }}
                                        showControls={true}
                                        onMoveUp={idx > 0 ? () => reorderExperience(idx, idx - 1) : undefined}
                                        onMoveDown={idx < experience.length - 1 ? () => reorderExperience(idx, idx + 1) : undefined}
                                    />
                                    <div className="text-[10px] font-black opacity-20 uppercase tracking-widest flex items-center gap-1">
                                        <EditableText value={exp.startDate} onUpdate={(v) => updateExperience(exp.id, { startDate: v })} />
                                        <span>-</span>
                                        <EditableText value={exp.endDate} onUpdate={(v) => updateExperience(exp.id, { endDate: v })} />
                                    </div>
                                </div>
                                <EditableText value={exp.company} onUpdate={(v) => updateExperience(exp.id, { company: v })} className="text-xs font-bold mb-5 tracking-[0.2em] uppercase" style={{ color: theme.accent }} />
                                <EditableText value={exp.description} onUpdate={(v) => updateExperience(exp.id, { description: v })} multiline={true} className="text-[13px] text-gray-500 leading-relaxed font-medium italic text-justify" />
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-xs font-black uppercase border-b-2 pb-4 mb-10" style={{ color: theme.primary, borderColor: theme.primary }}>Academic Path</h2>
                    <div className="space-y-8">
                        {education.map((edu, idx: number) => (
                            <div key={edu.id} className="flex justify-between items-start">
                                <div>
                                    <EditableText
                                        tag="h3"
                                        value={edu.degree}
                                        onUpdate={(v) => updateEducation(edu.id, { degree: v })}
                                        className="font-bold text-base"
                                        style={{ color: theme.primary }}
                                        showControls={true}
                                        onMoveUp={idx > 0 ? () => reorderEducation(idx, idx - 1) : undefined}
                                        onMoveDown={idx < education.length - 1 ? () => reorderEducation(idx, idx + 1) : undefined}
                                    />
                                    <EditableText value={edu.school} onUpdate={(v) => updateEducation(edu.id, { school: v })} className="text-sm text-gray-400 font-medium" />
                                </div>
                                <EditableText value={edu.endDate} onUpdate={(v) => updateEducation(edu.id, { endDate: v })} className="text-[10px] font-black opacity-20 uppercase" />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );

    const renderMinimalist = () => (
        <div className="text-black bg-white h-full" style={{ color: theme.primary, padding: `${margins}px`, fontFamily: "'Inter', sans-serif" }}>
            <header className="mb-16 border-b-4 border-black pb-12" style={{ borderColor: theme.primary }}>
                <EditableText
                    tag="h1"
                    value={personalInfo.fullName}
                    onUpdate={(v) => updatePersonalInfo({ fullName: v })}
                    className="text-6xl font-black uppercase tracking-tighter mb-4"
                />
                <EditableText
                    tag="p"
                    value={personalInfo.jobTitle}
                    onUpdate={(v) => updatePersonalInfo({ jobTitle: v })}
                    className="text-lg font-bold tracking-[0.4em] uppercase opacity-40 mb-8"
                />

                <div className="flex flex-wrap gap-x-12 gap-y-3 text-[10px] uppercase font-black opacity-60">
                    <div className="flex gap-2"><span>EMAIL:</span> <EditableText value={personalInfo.email} onUpdate={(v) => updatePersonalInfo({ email: v })} /></div>
                    <div className="flex gap-2"><span>PHONE:</span> <EditableText value={personalInfo.phone} onUpdate={(v) => updatePersonalInfo({ phone: v })} /></div>
                    <div className="flex gap-2"><span>LOC:</span> <EditableText value={personalInfo.location} onUpdate={(v) => updatePersonalInfo({ location: v })} /></div>
                </div>
            </header>

            <main className="space-y-16 overflow-y-auto">
                <section>
                    <h2 className="text-xs font-black uppercase tracking-[0.5em] mb-6 border-l-8 pl-6" style={{ borderColor: theme.accent }}>01_Profile</h2>
                    <EditableText
                        value={summary}
                        onUpdate={updateSummary}
                        multiline={true}
                        className="text-sm leading-relaxed max-w-2xl text-gray-500 font-medium italic"
                    />
                </section>

                <section>
                    <h2 className="text-xs font-black uppercase tracking-[0.5em] mb-10 border-l-8 pl-6" style={{ borderColor: theme.accent }}>02_History</h2>
                    <div className="space-y-12">
                        {experience.map((exp, idx: number) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-3">
                                    <EditableText
                                        tag="h3"
                                        value={`${exp.position} // ${exp.company}`}
                                        onUpdate={(v) => {
                                            const [pos, comp] = v.split(" // ");
                                            updateExperience(exp.id, { position: pos || "", company: comp || "" });
                                        }}
                                        className="font-bold text-xl uppercase tracking-tighter"
                                        showControls={true}
                                        onMoveUp={idx > 0 ? () => reorderExperience(idx, idx - 1) : undefined}
                                        onMoveDown={idx < experience.length - 1 ? () => reorderExperience(idx, idx + 1) : undefined}
                                    />
                                    <div className="text-[10px] font-black opacity-30 flex items-center gap-1">
                                        <span>[</span>
                                        <EditableText value={exp.startDate} onUpdate={(v) => updateExperience(exp.id, { startDate: v })} />
                                        <span>—</span>
                                        <EditableText value={exp.endDate} onUpdate={(v) => updateExperience(exp.id, { endDate: v })} />
                                        <span>]</span>
                                    </div>
                                </div>
                                <EditableText value={exp.description} onUpdate={(v) => updateExperience(exp.id, { description: v })} multiline={true} className="text-sm leading-relaxed text-gray-500 font-medium whitespace-pre-line text-justify" />
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-2 gap-16">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] mb-8 border-l-8 pl-6" style={{ borderColor: theme.accent }}>03_Tools</h2>
                        <div className="flex flex-wrap gap-3">
                            {skills.map((skill) => (
                                <EditableText
                                    key={skill.id}
                                    value={skill.name}
                                    onUpdate={(v) => updateSkill(skill.id, v)}
                                    className="text-[10px] font-black border-2 px-3 py-2 uppercase tracking-widest"
                                    style={{ borderColor: theme.primary + "10" }}
                                />
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] mb-8 border-l-8 pl-6" style={{ borderColor: theme.accent }}>04_Edu</h2>
                        <div className="space-y-6">
                            {education.map((edu, idx: number) => (
                                <div key={edu.id}>
                                    <EditableText
                                        tag="h3"
                                        value={edu.degree}
                                        onUpdate={(v) => updateEducation(edu.id, { degree: v })}
                                        className="font-black text-sm uppercase tracking-tight"
                                        showControls={true}
                                        onMoveUp={idx > 0 ? () => reorderEducation(idx, idx - 1) : undefined}
                                        onMoveDown={idx < education.length - 1 ? () => reorderEducation(idx, idx + 1) : undefined}
                                    />
                                    <EditableText value={edu.school} onUpdate={(v) => updateEducation(edu.id, { school: v })} className="text-[10px] font-bold opacity-30" />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );

    const renderCompact = () => (
        <div className="text-[11px] space-y-8 flex flex-col h-full bg-white" style={{ color: theme.text, padding: `${margins}px`, fontFamily: "'Inter', sans-serif" }}>
            <div className="flex justify-between items-center border-b-2 pb-6" style={{ borderColor: theme.primary + "10" }}>
                <div>
                    <EditableText
                        tag="h1"
                        value={personalInfo.fullName}
                        onUpdate={(v) => updatePersonalInfo({ fullName: v })}
                        className="text-3xl font-black uppercase tracking-tight"
                        style={{ color: theme.primary }}
                    />
                    <EditableText
                        tag="p"
                        value={personalInfo.jobTitle}
                        onUpdate={(v) => updatePersonalInfo({ jobTitle: v })}
                        className="font-bold uppercase tracking-[0.3em] text-[10px] mt-1 opacity-60"
                        style={{ color: theme.primary }}
                    />
                </div>
                <div className="text-right font-black text-[9px] opacity-30 uppercase tracking-widest">
                    <div className="flex justify-end gap-1">
                        <EditableText value={personalInfo.email} onUpdate={(v) => updatePersonalInfo({ email: v })} />
                        <span>//</span>
                        <EditableText value={personalInfo.phone} onUpdate={(v) => updatePersonalInfo({ phone: v })} />
                    </div>
                    <EditableText value={personalInfo.location} onUpdate={(v) => updatePersonalInfo({ location: v })} />
                </div>
            </div>

            <div className="grid grid-cols-12 gap-10 flex-1 overflow-hidden">
                <div className="col-span-8 space-y-8 overflow-y-auto pr-4 scrollbar-hide">
                    {experience.length > 0 && (
                        <section className="space-y-6">
                            <h2 className="font-black uppercase tracking-[0.4em] text-[9px] border-l-4 pl-3" style={{ borderColor: theme.primary }}>Experience</h2>
                            <div className="space-y-8">
                                {experience.map((exp, idx: number) => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between font-bold mb-2">
                                            <EditableText
                                                tag="span"
                                                value={`${exp.position} // ${exp.company}`}
                                                onUpdate={(v) => {
                                                    const [pos, comp] = v.split(" // ");
                                                    updateExperience(exp.id, { position: pos || "", company: comp || "" });
                                                }}
                                                className="text-sm"
                                                style={{ color: theme.primary }}
                                                showControls={idx !== -1} // Always show for experience
                                                onMoveUp={idx > 0 ? () => reorderExperience(idx, idx - 1) : undefined}
                                                onMoveDown={idx < experience.length - 1 ? () => reorderExperience(idx, idx + 1) : undefined}
                                            />
                                            <div className="opacity-30 uppercase flex items-center gap-1">
                                                <EditableText value={exp.startDate} onUpdate={(v) => updateExperience(exp.id, { startDate: v })} />
                                                <span>-</span>
                                                <EditableText value={exp.endDate} onUpdate={(v) => updateExperience(exp.id, { endDate: v })} />
                                            </div>
                                        </div>
                                        <EditableText value={exp.description} onUpdate={(v) => updateExperience(exp.id, { description: v })} multiline={true} className="leading-relaxed opacity-60 whitespace-pre-line text-justify font-medium" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
                <div className="col-span-4 space-y-8">
                    <section className="space-y-4">
                        <h2 className="font-black uppercase tracking-[0.4em] text-[9px] border-l-4 pl-3" style={{ borderColor: theme.primary }}>Expertise</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map(s => (
                                <EditableText
                                    key={s.id}
                                    value={s.name}
                                    onUpdate={(v) => updateSkill(s.id, v)}
                                    className="px-2 py-1 rounded-md text-[9px] font-black border uppercase tracking-widest"
                                    style={{ borderColor: theme.primary + "10", color: theme.primary }}
                                />
                            ))}
                        </div>
                    </section>
                    <section className="space-y-4">
                        <h2 className="font-black uppercase tracking-[0.4em] text-[9px] border-l-4 pl-3" style={{ borderColor: theme.primary }}>Academic</h2>
                        {education.map((edu, idx: number) => (
                            <div key={edu.id} className="space-y-1">
                                <EditableText
                                    tag="p"
                                    value={edu.degree}
                                    onUpdate={(v) => updateEducation(edu.id, { degree: v })}
                                    className="font-bold text-[10px]"
                                    style={{ color: theme.primary }}
                                    showControls={true}
                                    onMoveUp={idx > 0 ? () => reorderEducation(idx, idx - 1) : undefined}
                                    onMoveDown={idx < education.length - 1 ? () => reorderEducation(idx, idx + 1) : undefined}
                                />
                                <EditableText value={edu.school} onUpdate={(v) => updateEducation(edu.id, { school: v })} className="opacity-40 font-medium" />
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </div>
    );

    const renderModern = () => (
        <div className="min-h-full flex flex-col bg-white overflow-hidden relative" style={{ color: theme.text, padding: `${margins}px`, fontFamily: "'Inter', sans-serif" }}>
            <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 opacity-40 -skew-x-12 translate-x-1/2 pointer-events-none" />

            <div className="flex-1 flex overflow-hidden">
                {/* Left Structural Column */}
                <div className="w-7/12 p-16 flex flex-col space-y-16 overflow-y-auto scrollbar-hide relative z-10">
                    <header className="space-y-8">
                        <div className="flex items-baseline gap-4">
                            <h1 className="text-7xl font-black leading-[0.8] tracking-tighter" style={{ color: theme.primary }}>
                                {personalInfo.fullName.split(" ").map((n, i) => (
                                    <span key={i} className="block">
                                        <EditableText value={n} onUpdate={(v) => {
                                            const names = personalInfo.fullName.split(" ");
                                            names[i] = v;
                                            updatePersonalInfo({ fullName: names.join(" ") });
                                        }} />
                                    </span>
                                ))}
                            </h1>
                            <div className="h-2 w-24 bg-blue-500 rounded-full" style={{ backgroundColor: theme.accent }} />
                        </div>
                        <EditableText
                            tag="p"
                            value={personalInfo.jobTitle}
                            onUpdate={(v) => updatePersonalInfo({ jobTitle: v })}
                            className="text-xl font-black uppercase tracking-[0.4em] opacity-30 mt-4"
                        />
                    </header>

                    <section className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] mb-6 opacity-20">Summary_Matrix</h2>
                        <EditableText
                            value={summary}
                            onUpdate={updateSummary}
                            multiline={true}
                            className="text-sm leading-relaxed text-gray-500 font-medium text-justify italic"
                        />
                    </section>

                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] mb-12 opacity-20">Career_Nodes</h2>
                        <div className="space-y-12">
                            {experience.map((exp, idx: number) => (
                                <div key={exp.id} className="relative pl-10 border-l-4" style={{ borderColor: theme.primary + "10" }}>
                                    <div className="absolute -left-[14px] top-1 w-6 h-6 rounded-full border-4 border-white shadow-md" style={{ backgroundColor: theme.primary }} />
                                    <EditableText
                                        tag="h3"
                                        value={exp.position}
                                        onUpdate={(v) => updateExperience(exp.id, { position: v })}
                                        className="text-xl font-black uppercase tracking-tight"
                                        style={{ color: theme.primary }}
                                        showControls={true}
                                        onMoveUp={idx > 0 ? () => reorderExperience(idx, idx - 1) : undefined}
                                        onMoveDown={idx < experience.length - 1 ? () => reorderExperience(idx, idx + 1) : undefined}
                                    />
                                    <div className="text-xs font-black uppercase tracking-widest mt-2 flex items-center gap-2" style={{ color: theme.accent }}>
                                        <EditableText value={exp.company} onUpdate={(v) => updateExperience(exp.id, { company: v })} />
                                        <span>•</span>
                                        <div className="flex items-center gap-1">
                                            <EditableText value={exp.startDate} onUpdate={(v) => updateExperience(exp.id, { startDate: v })} />
                                            <span>-</span>
                                            <EditableText value={exp.endDate} onUpdate={(v) => updateExperience(exp.id, { endDate: v })} />
                                        </div>
                                    </div>
                                    <EditableText value={exp.description} onUpdate={(v) => updateExperience(exp.id, { description: v })} multiline={true} className="text-[13px] mt-6 leading-relaxed text-gray-400 font-medium text-justify" />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Geometric Column */}
                <div className="w-5/12 bg-gray-50/80 p-16 flex flex-col space-y-12 overflow-y-auto scrollbar-hide border-l border-gray-100 relative">
                    <div className="absolute top-10 right-10 w-32 h-32 rounded-full blur-3xl opacity-10" style={{ backgroundColor: theme.accent }} />

                    <div className="relative z-10 space-y-16">
                        <div className="w-full aspect-square rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl rotate-3 hover:rotate-0 transition-all duration-700">
                            {personalInfo.profilePhoto ? (
                                <img src={personalInfo.profilePhoto} alt={personalInfo.fullName} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-8xl font-black text-white" style={{ backgroundColor: theme.primary }}>
                                    {personalInfo.fullName?.split(" ").map(n => n[0]).join("")}
                                </div>
                            )}
                        </div>

                        <section className="space-y-6">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] opacity-20">Contact_Net</h2>
                            <div className="space-y-4 text-[11px] font-black uppercase tracking-[0.1em] opacity-40">
                                <p className="flex items-center gap-3"><Mail className="w-4 h-4 opacity-40" /> <EditableText value={personalInfo.email} onUpdate={(v) => updatePersonalInfo({ email: v })} /></p>
                                <p className="flex items-center gap-3"><Phone className="w-4 h-4 opacity-40" /> <EditableText value={personalInfo.phone} onUpdate={(v) => updatePersonalInfo({ phone: v })} /></p>
                                <p className="flex items-center gap-3"><MapPin className="w-4 h-4 opacity-40" /> <EditableText value={personalInfo.location} onUpdate={(v) => updatePersonalInfo({ location: v })} /></p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] mb-8 opacity-20">Skill_Cluster</h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map(s => (
                                    <EditableText
                                        key={s.id}
                                        value={s.name}
                                        onUpdate={(v) => updateSkill(s.id, v)}
                                        className="px-4 py-2 bg-white text-[9px] font-black border-2 rounded-2xl uppercase tracking-widest shadow-sm hover:translate-y-[-2px] transition-transform"
                                        style={{ borderColor: theme.primary + "05", color: theme.primary }}
                                    />
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] mb-8 opacity-20">Education</h2>
                            <div className="space-y-6">
                                {education.map((edu, idx: number) => (
                                    <div key={edu.id} className="bg-white/40 p-4 rounded-2xl border border-white/50">
                                        <EditableText
                                            tag="p"
                                            value={edu.degree}
                                            onUpdate={(v) => updateEducation(edu.id, { degree: v })}
                                            className="font-black text-xs"
                                            style={{ color: theme.primary }}
                                            showControls={true}
                                            onMoveUp={idx > 0 ? () => reorderEducation(idx, idx - 1) : undefined}
                                            onMoveDown={idx < education.length - 1 ? () => reorderEducation(idx, idx + 1) : undefined}
                                        />
                                        <EditableText value={edu.school} onUpdate={(v) => updateEducation(edu.id, { school: v })} className="text-[9px] font-bold uppercase tracking-widest opacity-40 mt-1" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderClean = () => (
        <div className="min-h-full overflow-y-auto bg-white" style={{ color: theme.text, padding: `${margins}px`, fontFamily: "'Inter', sans-serif" }}>
            <header className="flex flex-col items-center text-center pb-12 mb-12 border-b-2" style={{ borderColor: theme.primary + "10" }}>
                <EditableText
                    tag="h1"
                    value={personalInfo.fullName}
                    onUpdate={(v) => updatePersonalInfo({ fullName: v })}
                    className="text-4xl font-black uppercase tracking-tight"
                    style={{ color: theme.primary }}
                />
                <EditableText
                    tag="p"
                    value={personalInfo.jobTitle}
                    onUpdate={(v) => updatePersonalInfo({ jobTitle: v })}
                    className="text-base font-bold mt-3 uppercase tracking-[0.2em] opacity-60"
                    style={{ color: theme.primary }}
                />
                <div className="flex justify-center gap-6 mt-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <EditableText value={personalInfo.email} onUpdate={(v) => updatePersonalInfo({ email: v })} />
                    <span className="opacity-20">|</span>
                    <EditableText value={personalInfo.phone} onUpdate={(v) => updatePersonalInfo({ phone: v })} />
                    <span className="opacity-20">|</span>
                    <EditableText value={personalInfo.location} onUpdate={(v) => updatePersonalInfo({ location: v })} />
                </div>
            </header>

            <main className="grid grid-cols-12 gap-16">
                <div className="col-span-4 space-y-12">
                    {summary && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-widest mb-6 border-b pb-2" style={{ borderColor: theme.border, color: theme.primary }}>Summary</h2>
                            <EditableText
                                value={summary}
                                onUpdate={updateSummary}
                                multiline={true}
                                className="text-xs leading-relaxed text-gray-500 text-justify"
                            />
                        </section>
                    )}
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-widest mb-6 border-b pb-2" style={{ borderColor: theme.border, color: theme.primary }}>Skills</h2>
                        <div className="space-y-3">
                            {skills.map(s => (
                                <div key={s.id} className="text-xs font-bold text-gray-500 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.accent }} />
                                    <EditableText value={s.name} onUpdate={(v) => updateSkill(s.id, v)} />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                <div className="col-span-8 space-y-12">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-widest mb-8 border-b pb-2" style={{ borderColor: theme.border, color: theme.primary }}>Experience</h2>
                        <div className="space-y-10">
                            {experience.map((exp, idx: number) => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <EditableText
                                            tag="h3"
                                            value={exp.position}
                                            onUpdate={(v) => updateExperience(exp.id, { position: v })}
                                            className="font-bold text-lg"
                                            style={{ color: theme.primary }}
                                            showControls={true}
                                            onMoveUp={idx > 0 ? () => reorderExperience(idx, idx - 1) : undefined}
                                            onMoveDown={idx < experience.length - 1 ? () => reorderExperience(idx, idx + 1) : undefined}
                                        />
                                        <div className="text-[10px] font-bold opacity-30 uppercase flex items-center gap-1">
                                            <EditableText value={exp.startDate} onUpdate={(v) => updateExperience(exp.id, { startDate: v })} />
                                            <span>-</span>
                                            <EditableText value={exp.endDate} onUpdate={(v) => updateExperience(exp.id, { endDate: v })} />
                                        </div>
                                    </div>
                                    <EditableText value={exp.company} onUpdate={(v) => updateExperience(exp.id, { company: v })} className="text-xs font-bold mb-4 uppercase tracking-widest" style={{ color: theme.accent }} />
                                    <EditableText value={exp.description} onUpdate={(v) => updateExperience(exp.id, { description: v })} multiline={true} className="text-xs leading-relaxed text-gray-500 whitespace-pre-line text-justify" />
                                </div>
                            ))}
                        </div>
                    </section>

                    {education.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-widest mb-8 border-b pb-2" style={{ borderColor: theme.border, color: theme.primary }}>Education</h2>
                            <div className="space-y-6">
                                {education.map((edu, idx: number) => (
                                    <div key={edu.id}>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <EditableText
                                                tag="h3"
                                                value={edu.degree}
                                                onUpdate={(v) => updateEducation(edu.id, { degree: v })}
                                                className="font-bold text-base"
                                                style={{ color: theme.primary }}
                                                showControls={true}
                                                onMoveUp={idx > 0 ? () => reorderEducation(idx, idx - 1) : undefined}
                                                onMoveDown={idx < education.length - 1 ? () => reorderEducation(idx, idx + 1) : undefined}
                                            />
                                            <EditableText value={edu.endDate} onUpdate={(v) => updateEducation(edu.id, { endDate: v })} className="text-[10px] font-bold opacity-30 uppercase" />
                                        </div>
                                        <EditableText value={edu.school} onUpdate={(v) => updateEducation(edu.id, { school: v })} className="text-xs font-bold text-gray-500 uppercase tracking-widest" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );

    const renderBold = () => (
        <div className="min-h-full flex flex-col bg-white" style={{ color: theme.text, padding: `${margins}px`, fontFamily: "'Inter', sans-serif" }}>
            <header className="p-20 flex justify-between items-start border-b-[12px]" style={{ borderColor: theme.primary }}>
                <div className="max-w-[70%]">
                    <EditableText
                        tag="h1"
                        value={personalInfo.fullName}
                        onUpdate={(v) => updatePersonalInfo({ fullName: v })}
                        className="text-7xl font-[900] uppercase leading-[0.8] tracking-tighter"
                        style={{ color: theme.primary }}
                    />
                    <EditableText
                        tag="p"
                        value={personalInfo.jobTitle}
                        onUpdate={(v) => updatePersonalInfo({ jobTitle: v })}
                        className="text-2xl font-black uppercase tracking-[0.2em] mt-8"
                        style={{ color: theme.primary }}
                    />
                    <div className="flex gap-8 mt-12 text-[11px] font-[900] uppercase tracking-widest opacity-30">
                        <EditableText value={personalInfo.email} onUpdate={(v) => updatePersonalInfo({ email: v })} />
                        <EditableText value={personalInfo.phone} onUpdate={(v) => updatePersonalInfo({ phone: v })} />
                        <EditableText value={personalInfo.location} onUpdate={(v) => updatePersonalInfo({ location: v })} />
                    </div>
                </div>
                {personalInfo.profilePhoto && (
                    <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden border-4 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)] transform rotate-2 hover:rotate-0 transition-all duration-500" style={{ borderColor: theme.primary }}>
                        <img src={personalInfo.profilePhoto} alt={personalInfo.fullName} className="w-full h-full object-cover" />
                    </div>
                )}
            </header>
            <main className="flex-1 p-20 grid grid-cols-12 gap-20 overflow-y-auto">
                <div className="col-span-8 space-y-20">
                    <section>
                        <h2 className="text-4xl font-black uppercase mb-10 tracking-tighter" style={{ color: theme.primary }}>About</h2>
                        <EditableText
                            value={summary}
                            onUpdate={updateSummary}
                            multiline={true}
                            className="text-lg leading-relaxed font-bold text-gray-400 italic"
                        />
                    </section>
                    <section>
                        <h2 className="text-4xl font-black uppercase mb-12 tracking-tighter" style={{ color: theme.primary }}>Experience</h2>
                        <div className="space-y-16">
                            {experience.map((exp, idx: number) => (
                                <div key={exp.id} className="group">
                                    <div className="flex justify-between items-baseline mb-4">
                                        <EditableText
                                            tag="h3"
                                            value={exp.position}
                                            onUpdate={(v) => updateExperience(exp.id, { position: v })}
                                            className="text-3xl font-black uppercase tracking-tight group-hover:text-blue-600 transition-colors"
                                            style={{ color: theme.primary }}
                                            showControls={true}
                                            onMoveUp={idx > 0 ? () => reorderExperience(idx, idx - 1) : undefined}
                                            onMoveDown={idx < experience.length - 1 ? () => reorderExperience(idx, idx + 1) : undefined}
                                        />
                                        <div className="text-[12px] font-black uppercase opacity-20 flex items-center gap-1">
                                            <EditableText value={exp.startDate} onUpdate={(v) => updateExperience(exp.id, { startDate: v })} />
                                            <span>-</span>
                                            <EditableText value={exp.endDate} onUpdate={(v) => updateExperience(exp.id, { endDate: v })} />
                                        </div>
                                    </div>
                                    <EditableText value={exp.company} onUpdate={(v) => updateExperience(exp.id, { company: v })} className="text-md font-black mb-6 uppercase tracking-widest" style={{ color: theme.accent }} />
                                    <EditableText value={exp.description} onUpdate={(v) => updateExperience(exp.id, { description: v })} multiline={true} className="text-base leading-relaxed font-medium text-gray-500 text-justify" />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                <div className="col-span-4 space-y-20">
                    <section>
                        <h2 className="text-xl font-black uppercase mb-8 border-b-8 pb-4" style={{ borderColor: theme.accent, color: theme.primary }}>Skills</h2>
                        <div className="flex flex-wrap gap-3">
                            {skills.map(s => (
                                <EditableText
                                    key={s.id}
                                    value={s.name}
                                    onUpdate={(v) => updateSkill(s.id, v)}
                                    className="px-5 py-3 bg-gray-50 border-2 text-[10px] font-black uppercase tracking-[0.2em]"
                                    style={{ borderColor: theme.primary + "10", color: theme.primary }}
                                />
                            ))}
                        </div>
                    </section>
                    <section>
                        <h2 className="text-xl font-black uppercase mb-8 border-b-8 pb-4" style={{ borderColor: theme.accent, color: theme.primary }}>Education</h2>
                        {education.map((edu, idx: number) => (
                            <div key={edu.id} className="mb-6">
                                <EditableText
                                    tag="h3"
                                    value={edu.degree}
                                    onUpdate={(v) => updateEducation(edu.id, { degree: v })}
                                    className="font-black text-sm uppercase"
                                    style={{ color: theme.primary }}
                                    showControls={true}
                                    onMoveUp={idx > 0 ? () => reorderEducation(idx, idx - 1) : undefined}
                                    onMoveDown={idx < education.length - 1 ? () => reorderEducation(idx, idx + 1) : undefined}
                                />
                                <EditableText value={edu.school} onUpdate={(v) => updateEducation(edu.id, { school: v })} className="text-[11px] font-bold opacity-30 uppercase tracking-widest mt-1" />
                            </div>
                        ))}
                    </section>
                </div>
            </main>
        </div>
    );

    const renderCorporate = () => (
        <div className="min-h-full overflow-y-auto bg-white" style={{ color: theme.text, padding: `${margins}px`, fontFamily: "'Inter', sans-serif" }}>
            <header className="mb-12 border-b-8 pb-8" style={{ borderColor: theme.primary }}>
                <EditableText
                    tag="h1"
                    value={personalInfo.fullName}
                    onUpdate={(v) => updatePersonalInfo({ fullName: v })}
                    className="text-4xl font-serif font-bold uppercase tracking-tight mb-2"
                    style={{ color: theme.primary }}
                />
                <EditableText
                    tag="p"
                    value={personalInfo.jobTitle}
                    onUpdate={(v) => updatePersonalInfo({ jobTitle: v })}
                    className="text-md font-bold uppercase tracking-[0.2em] opacity-60 italic"
                />
                <div className="flex gap-6 mt-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    <EditableText value={personalInfo.email} onUpdate={(v) => updatePersonalInfo({ email: v })} />
                    <span>|</span>
                    <EditableText value={personalInfo.phone} onUpdate={(v) => updatePersonalInfo({ phone: v })} />
                    <span>|</span>
                    <EditableText value={personalInfo.location} onUpdate={(v) => updatePersonalInfo({ location: v })} />
                </div>
            </header>

            <div className="space-y-12">
                {summary && (
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-4 pb-2 border-b" style={{ color: theme.primary, borderColor: theme.primary + "20" }}>Professional Profile</h2>
                        <EditableText
                            value={summary}
                            onUpdate={updateSummary}
                            multiline={true}
                            className="text-[13px] leading-relaxed text-gray-600 font-medium"
                        />
                    </section>
                )}

                <section>
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-8 pb-2 border-b" style={{ color: theme.primary, borderColor: theme.primary + "20" }}>Experience</h2>
                    <div className="space-y-10">
                        {experience.map((exp, idx: number) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-2">
                                    <EditableText
                                        tag="h3"
                                        value={exp.position}
                                        onUpdate={(v) => updateExperience(exp.id, { position: v })}
                                        className="font-bold text-lg"
                                        style={{ color: theme.primary }}
                                        showControls={true}
                                        onMoveUp={idx > 0 ? () => reorderExperience(idx, idx - 1) : undefined}
                                        onMoveDown={idx < experience.length - 1 ? () => reorderExperience(idx, idx + 1) : undefined}
                                    />
                                    <div className="text-[11px] font-bold opacity-40 italic flex items-center gap-1">
                                        <EditableText value={exp.startDate} onUpdate={(v) => updateExperience(exp.id, { startDate: v })} />
                                        <span>-</span>
                                        <EditableText value={exp.endDate} onUpdate={(v) => updateExperience(exp.id, { endDate: v })} />
                                    </div>
                                </div>
                                <EditableText value={exp.company} onUpdate={(v) => updateExperience(exp.id, { company: v })} className="text-xs font-bold mb-4 uppercase tracking-widest" style={{ color: theme.accent }} />
                                <EditableText value={exp.description} onUpdate={(v) => updateExperience(exp.id, { description: v })} multiline={true} className="text-[13px] leading-relaxed text-gray-500 whitespace-pre-line text-justify" />
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-2 gap-12">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-6 pb-2 border-b" style={{ color: theme.primary, borderColor: theme.primary + "20" }}>Core Competencies</h2>
                        <div className="grid grid-cols-2 gap-y-2">
                            {skills.map(skill => (
                                <div key={skill.id} className="text-[11px] font-bold text-gray-500 flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.accent }} />
                                    <EditableText value={skill.name} onUpdate={(v) => updateSkill(skill.id, v)} />
                                </div>
                            ))}
                        </div>
                    </section>
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-6 pb-2 border-b" style={{ color: theme.primary, borderColor: theme.primary + "20" }}>Education</h2>
                        {education.map((edu, idx: number) => (
                            <div key={edu.id} className="mb-4">
                                <EditableText
                                    tag="h3"
                                    value={edu.degree}
                                    onUpdate={(v) => updateEducation(edu.id, { degree: v })}
                                    className="font-bold text-sm"
                                    style={{ color: theme.primary }}
                                    showControls={true}
                                    onMoveUp={idx > 0 ? () => reorderEducation(idx, idx - 1) : undefined}
                                    onMoveDown={idx < education.length - 1 ? () => reorderEducation(idx, idx + 1) : undefined}
                                />
                                <EditableText value={edu.school} onUpdate={(v) => updateEducation(edu.id, { school: v })} className="text-[10px] text-gray-400 font-medium mt-1 uppercase tracking-widest" />
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </div>
    );

    const renderDeveloper = () => (
        <div className="min-h-full overflow-y-auto bg-[#fafafa]" style={{ color: "#24292e", padding: `${margins}px`, fontFamily: "'Inter', system-ui, sans-serif" }}>
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
                <header className="p-10 border-b border-gray-100 flex justify-between items-center bg-[#f6f8fa]">
                    <div>
                        <EditableText
                            tag="h1"
                            value={personalInfo.fullName}
                            onUpdate={(v) => updatePersonalInfo({ fullName: v })}
                            className="text-3xl font-black tracking-tight"
                        />
                        <EditableText
                            tag="p"
                            value={personalInfo.jobTitle}
                            onUpdate={(v) => updatePersonalInfo({ jobTitle: v })}
                            className="text-blue-600 font-mono text-sm mt-1"
                        />
                    </div>
                    <div className="flex gap-4">
                        <Github className="w-5 h-5 text-gray-400" />
                        <Linkedin className="w-5 h-5 text-gray-400" />
                        <Globe className="w-5 h-5 text-gray-400" />
                    </div>
                </header>

                <div className="p-10 space-y-12">
                    <section>
                        <p className="text-gray-500 font-mono text-xs mb-4 uppercase tracking-widest">/ summary</p>
                        <EditableText
                            value={summary}
                            onUpdate={updateSummary}
                            multiline={true}
                            className="text-sm leading-relaxed text-gray-600 border-l-4 pl-6"
                            style={{ borderColor: theme.accent }}
                        />
                    </section>

                    <section>
                        <p className="text-gray-500 font-mono text-xs mb-6 uppercase tracking-widest">/ experience</p>
                        <div className="space-y-10">
                            {experience.map((exp, idx: number) => (
                                <div key={exp.id} className="group">
                                    <div className="flex justify-between items-start mb-2">
                                        <EditableText
                                            tag="h3"
                                            value={exp.position}
                                            onUpdate={(v) => updateExperience(exp.id, { position: v })}
                                            className="font-bold text-lg group-hover:text-blue-600 transition-colors"
                                            showControls={true}
                                            onMoveUp={idx > 0 ? () => reorderExperience(idx, idx - 1) : undefined}
                                            onMoveDown={idx < experience.length - 1 ? () => reorderExperience(idx, idx + 1) : undefined}
                                        />
                                        <div className="text-[10px] font-mono text-gray-400 mt-1 flex items-center gap-1">
                                            <EditableText value={exp.startDate} onUpdate={(v) => updateExperience(exp.id, { startDate: v })} />
                                            <span>-</span>
                                            <EditableText value={exp.endDate} onUpdate={(v) => updateExperience(exp.id, { endDate: v })} />
                                        </div>
                                    </div>
                                    <EditableText value={exp.company} onUpdate={(v) => updateExperience(exp.id, { company: v })} className="text-xs font-bold text-gray-400 mb-4" />
                                    <EditableText value={exp.description} onUpdate={(v) => updateExperience(exp.id, { description: v })} multiline={true} className="text-[13px] leading-relaxed text-gray-500 whitespace-pre-line text-justify font-medium" />
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="grid grid-cols-3 gap-10 pt-6 border-t border-gray-100">
                        <section className="col-span-2">
                            <p className="text-gray-500 font-mono text-xs mb-6 uppercase tracking-widest">/ tech_stack</p>
                            <div className="flex flex-wrap gap-2">
                                {skills.map(s => (
                                    <EditableText
                                        key={s.id}
                                        value={s.name}
                                        onUpdate={(v) => updateSkill(s.id, v)}
                                        className="px-3 py-1.5 bg-[#f3f4f6] text-[10px] font-mono font-bold text-gray-700 rounded border border-gray-200"
                                    />
                                ))}
                            </div>
                        </section>
                        <section>
                            <p className="text-gray-500 font-mono text-xs mb-6 uppercase tracking-widest">/ education</p>
                            {education.map((edu, idx: number) => (
                                <div key={edu.id} className="mb-4">
                                    <EditableText
                                        tag="h3"
                                        value={edu.degree}
                                        onUpdate={(v) => updateEducation(edu.id, { degree: v })}
                                        className="font-bold text-[11px]"
                                        showControls={true}
                                        onMoveUp={idx > 0 ? () => reorderEducation(idx, idx - 1) : undefined}
                                        onMoveDown={idx < education.length - 1 ? () => reorderEducation(idx, idx + 1) : undefined}
                                    />
                                    <EditableText value={edu.school} onUpdate={(v) => updateEducation(edu.id, { school: v })} className="text-[10px] text-gray-400 mt-1" />
                                </div>
                            ))}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderModernMinimal = () => (
        <div className="min-h-full overflow-y-auto bg-white" style={{ color: "#111", padding: `${margins}px`, fontFamily: "'Inter', sans-serif" }}>
            <header className="mb-24 flex justify-between items-end">
                <div>
                    <h1 className="text-6xl font-black tracking-tighter leading-[0.9]">
                        <EditableText
                            value={personalInfo.fullName.toUpperCase()}
                            onUpdate={(v) => updatePersonalInfo({ fullName: v })}
                        />
                    </h1>
                    <EditableText
                        tag="p"
                        value={personalInfo.jobTitle}
                        onUpdate={(v) => updatePersonalInfo({ jobTitle: v })}
                        className="text-sm font-light mt-6 tracking-[0.5em] text-gray-400 uppercase"
                    />
                </div>
                <div className="text-right text-[10px] font-medium tracking-widest text-gray-300 uppercase space-y-1">
                    <EditableText value={personalInfo.location} onUpdate={(v) => updatePersonalInfo({ location: v })} />
                    <EditableText value={personalInfo.email} onUpdate={(v) => updatePersonalInfo({ email: v })} />
                </div>
            </header>

            <main className="space-y-24">
                <section className="max-w-2xl">
                    <p className="text-xs font-black mb-8 tracking-[0.3em] uppercase opacity-20">Intro</p>
                    <EditableText
                        value={summary}
                        onUpdate={updateSummary}
                        multiline={true}
                        className="text-lg leading-relaxed text-gray-400 font-light italic"
                    />
                </section>

                <section>
                    <p className="text-xs font-black mb-12 tracking-[0.3em] uppercase opacity-20">Path</p>
                    <div className="space-y-16">
                        {experience.map((exp, idx: number) => (
                            <div key={exp.id} className="flex gap-20">
                                <div className="w-32 shrink-0">
                                    <div className="text-[10px] font-black tracking-widest text-gray-200 uppercase flex items-center gap-1">
                                        <EditableText value={exp.startDate} onUpdate={(v) => updateExperience(exp.id, { startDate: v })} />
                                        <span>-</span>
                                        <EditableText value={exp.endDate} onUpdate={(v) => updateExperience(exp.id, { endDate: v })} />
                                    </div>
                                </div>
                                <div>
                                    <EditableText
                                        tag="h3"
                                        value={exp.position}
                                        onUpdate={(v) => updateExperience(exp.id, { position: v })}
                                        className="text-2xl font-black tracking-tight mb-2"
                                        showControls={true}
                                        onMoveUp={idx > 0 ? () => reorderExperience(idx, idx - 1) : undefined}
                                        onMoveDown={idx < experience.length - 1 ? () => reorderExperience(idx, idx + 1) : undefined}
                                    />
                                    <EditableText value={exp.company} onUpdate={(v) => updateExperience(exp.id, { company: v })} className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6" />
                                    <EditableText value={exp.description} onUpdate={(v) => updateExperience(exp.id, { description: v })} multiline={true} className="text-sm leading-relaxed text-gray-500 font-medium text-justify max-w-2xl" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-2 gap-32">
                    <section>
                        <p className="text-xs font-black mb-12 tracking-[0.3em] uppercase opacity-20">Expertise</p>
                        <div className="flex flex-wrap gap-x-8 gap-y-4">
                            {skills.map(skill => (
                                <EditableText
                                    key={skill.id}
                                    value={skill.name}
                                    onUpdate={(v) => updateSkill(skill.id, v)}
                                    className="text-xs font-bold text-gray-600 uppercase tracking-widest"
                                />
                            ))}
                        </div>
                    </section>
                    <section>
                        <p className="text-xs font-black mb-12 tracking-[0.3em] uppercase opacity-20">Academic</p>
                        {education.map((edu, idx: number) => (
                            <div key={edu.id} className="mb-8">
                                <EditableText
                                    tag="h3"
                                    value={edu.degree}
                                    onUpdate={(v) => updateEducation(edu.id, { degree: v })}
                                    className="text-sm font-black uppercase tracking-tight"
                                    showControls={true}
                                    onMoveUp={idx > 0 ? () => reorderEducation(idx, idx - 1) : undefined}
                                    onMoveDown={idx < education.length - 1 ? () => reorderEducation(idx, idx + 1) : undefined}
                                />
                                <EditableText value={edu.school} onUpdate={(v) => updateEducation(edu.id, { school: v })} className="text-xs text-gray-400 mt-2" />
                            </div>
                        ))}
                    </section>
                </div>
            </main>
        </div>
    );

    const renderEntrepreneur = () => (
        <div className="min-h-full bg-white flex flex-col" style={{ color: theme.text, padding: `${margins}px`, fontFamily: "'Inter', sans-serif" }}>
            <div className="flex-1 flex overflow-hidden">
                <div className="w-1/2 p-20 bg-gray-900 text-white flex flex-col justify-between">
                    <div>
                        <h1 className="text-7xl font-black leading-tight tracking-tighter mb-8 bg-gradient-to-br from-white to-gray-500 bg-clip-text text-transparent">
                            {personalInfo.fullName.split(" ").map((n, i) => (
                                <span key={i} className="block">
                                    <EditableText value={n} onUpdate={(v) => {
                                        const names = personalInfo.fullName.split(" ");
                                        names[i] = v;
                                        updatePersonalInfo({ fullName: names.join(" ") });
                                    }} />
                                </span>
                            ))}
                        </h1>
                        <div className="h-1 w-20 bg-white mb-10" style={{ backgroundColor: theme.accent }} />
                        <EditableText
                            tag="p"
                            value={personalInfo.jobTitle}
                            onUpdate={(v) => updatePersonalInfo({ jobTitle: v })}
                            className="text-xl font-bold tracking-[0.5em] text-gray-400 uppercase mb-16"
                        />
                        <EditableText
                            value={summary}
                            onUpdate={updateSummary}
                            multiline={true}
                            className="text-lg leading-relaxed text-gray-300 font-medium italic opacity-80 backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10"
                        />
                    </div>
                    <div className="space-y-4 text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">
                        <EditableText value={personalInfo.email} onUpdate={(v) => updatePersonalInfo({ email: v })} />
                        <EditableText value={personalInfo.phone} onUpdate={(v) => updatePersonalInfo({ phone: v })} />
                        <EditableText value={personalInfo.location} onUpdate={(v) => updatePersonalInfo({ location: v })} />
                    </div>
                </div>

                <div className="w-1/2 p-20 overflow-y-auto bg-[#fafafa]">
                    <section className="mb-20">
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] mb-12 opacity-30 border-b pb-4">Major Ventures</h2>
                        <div className="space-y-16">
                            {experience.map((exp, idx: number) => (
                                <div key={exp.id}>
                                    <EditableText
                                        tag="h3"
                                        value={exp.position}
                                        onUpdate={(v) => updateExperience(exp.id, { position: v })}
                                        className="text-2xl font-black tracking-tight mb-2"
                                        style={{ color: theme.primary }}
                                        showControls={true}
                                        onMoveUp={idx > 0 ? () => reorderExperience(idx, idx - 1) : undefined}
                                        onMoveDown={idx < experience.length - 1 ? () => reorderExperience(idx, idx + 1) : undefined}
                                    />
                                    <div className="text-xs font-black uppercase tracking-widest mb-6 opacity-40 flex items-center gap-1">
                                        <EditableText value={exp.company} onUpdate={(v) => updateExperience(exp.id, { company: v })} />
                                        <span>//</span>
                                        <div className="flex items-center gap-1">
                                            <EditableText value={exp.startDate} onUpdate={(v) => updateExperience(exp.id, { startDate: v })} />
                                            <span>-</span>
                                            <EditableText value={exp.endDate} onUpdate={(v) => updateExperience(exp.id, { endDate: v })} />
                                        </div>
                                    </div>
                                    <EditableText value={exp.description} onUpdate={(v) => updateExperience(exp.id, { description: v })} multiline={true} className="text-sm leading-relaxed text-gray-500 font-medium text-justify" />
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="grid grid-cols-1 gap-16">
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.5em] mb-10 opacity-30 border-b pb-4">Skillset</h2>
                            <div className="flex flex-wrap gap-4">
                                {skills.map(s => (
                                    <EditableText
                                        key={s.id}
                                        value={s.name}
                                        onUpdate={(v) => updateSkill(s.id, v)}
                                        className="px-5 py-2.5 bg-white border border-gray-200 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm"
                                        style={{ color: theme.primary }}
                                    />
                                ))}
                            </div>
                        </section>
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.5em] mb-10 opacity-30 border-b pb-4">Education</h2>
                            <div className="space-y-8">
                                {education.map((edu, idx: number) => (
                                    <div key={edu.id}>
                                        <EditableText
                                            tag="p"
                                            value={edu.degree}
                                            onUpdate={(v) => updateEducation(edu.id, { degree: v })}
                                            className="text-md font-black uppercase"
                                            style={{ color: theme.primary }}
                                            showControls={true}
                                            onMoveUp={idx > 0 ? () => reorderEducation(idx, idx - 1) : undefined}
                                            onMoveDown={idx < education.length - 1 ? () => reorderEducation(idx, idx + 1) : undefined}
                                        />
                                        <EditableText value={edu.school} onUpdate={(v) => updateEducation(edu.id, { school: v })} className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );

    // Dynamic layout selector
    const renderLayout = () => {
        switch (layoutId) {
            case "sidebar": return renderSidebar();
            case "grid": return renderGrid();
            case "executive": return renderExecutive();
            case "minimalist": return renderMinimalist();
            case "compact": return renderCompact();
            case "modern": return renderModern();
            case "technical": return renderTechnical();
            case "clean": return renderClean();
            case "bold": return renderBold();
            case "corporate": return renderCorporate();
            case "developer": return renderDeveloper();
            case "modern-minimal": return renderModernMinimal();
            case "entrepreneur": return renderEntrepreneur();
            case "classic":
            default: return renderClassic();
        }
    };

    return (
        <div className="w-full h-full shadow-inner overflow-hidden" style={{ backgroundColor: theme.bg }}>
            {renderLayout()}
        </div>
    );
}
