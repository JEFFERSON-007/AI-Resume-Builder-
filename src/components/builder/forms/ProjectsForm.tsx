"use client";

import { useResumeStore } from "@/lib/store";
import { Plus, Trash2, ChevronDown, ChevronUp, Link as LinkIcon, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectsForm() {
    const { projects, addProject, updateProject, removeProject, setAiOpen } = useResumeStore((state) => ({
        projects: state.resumeData.projects,
        addProject: state.addProject,
        updateProject: state.updateProject,
        removeProject: state.removeProject,
        setAiOpen: state.setAiOpen,
    }));

    const [expandedId, setExpandedId] = useState<string | null>(projects[0]?.id || null);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Key Projects</label>
                <button
                    onClick={addProject}
                    className="flex items-center gap-1.5 text-[10px] font-bold text-blue-400 bg-blue-400/10 border border-blue-400/20 px-2.5 py-1 rounded-full hover:bg-blue-400/20 transition-colors"
                >
                    <Plus className="w-3 h-3" />
                    ADD PROJECT
                </button>
            </div>

            <div className="space-y-4">
                {projects.map((proj, index) => (
                    <motion.div
                        key={proj.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-dark rounded-xl overflow-hidden border border-white/5"
                    >
                        <div
                            className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                            onClick={() => setExpandedId(expandedId === proj.id ? null : proj.id)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold text-xs">
                                    {index + 1}
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-white">
                                        {proj.name || "New Project"}
                                    </h3>
                                    {proj.link && <p className="text-[10px] text-blue-400 truncate w-40">{proj.link}</p>}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); removeProject(proj.id); }}
                                    className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                {expandedId === proj.id ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                            </div>
                        </div>

                        <AnimatePresence>
                            {expandedId === proj.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-4 pb-4 space-y-4 overflow-hidden"
                                >
                                    <div className="grid grid-cols-1 gap-4 pt-2">
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-gray-500 uppercase tracking-tighter">Project Name</label>
                                            <input
                                                type="text"
                                                value={proj.name}
                                                onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] text-gray-500 uppercase tracking-tighter">Project Link / URL</label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                                <LinkIcon className="w-3 h-3 text-gray-500" />
                                            </div>
                                            <input
                                                type="text"
                                                value={proj.link}
                                                onChange={(e) => updateProject(proj.id, { link: e.target.value })}
                                                placeholder="https://github.com/..."
                                                className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <label className="text-[10px] text-gray-500 uppercase tracking-tighter">Description</label>
                                            <button
                                                onClick={() => setAiOpen(true)}
                                                className="flex items-center gap-1 text-[8px] font-bold text-blue-400 hover:text-blue-300 transition-colors"
                                            >
                                                <Sparkles className="w-2 h-2" />
                                                IMPROVE WITH AI
                                            </button>
                                        </div>
                                        <textarea
                                            value={proj.description}
                                            onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                                            rows={3}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
