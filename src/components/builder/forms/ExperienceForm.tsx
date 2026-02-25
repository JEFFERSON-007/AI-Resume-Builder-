"use client";

import { useResumeStore } from "@/lib/store";
import { Plus, Trash2, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ExperienceForm() {
    const { experience, addExperience, updateExperience, removeExperience, setAiOpen } = useResumeStore((state) => ({
        experience: state.resumeData.experience,
        addExperience: state.addExperience,
        updateExperience: state.updateExperience,
        removeExperience: state.removeExperience,
        setAiOpen: state.setAiOpen,
    }));

    const [expandedId, setExpandedId] = useState<string | null>(experience[0]?.id || null);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Work Experience</label>
                <button
                    onClick={addExperience}
                    className="flex items-center gap-1.5 text-[10px] font-bold text-blue-400 bg-blue-400/10 border border-blue-400/20 px-2.5 py-1 rounded-full hover:bg-blue-400/20 transition-colors"
                >
                    <Plus className="w-3 h-3" />
                    ADD EXPERIENCE
                </button>
            </div>

            <div className="space-y-4">
                {experience.map((exp, index) => (
                    <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-dark rounded-xl overflow-hidden border border-white/5"
                    >
                        <div
                            className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                            onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-xs">
                                    {index + 1}
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-white">
                                        {exp.position || "New Position"}
                                    </h3>
                                    <p className="text-[10px] text-gray-500">{exp.company || "Company Name"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); removeExperience(exp.id); }}
                                    className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                {expandedId === exp.id ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                            </div>
                        </div>

                        <AnimatePresence>
                            {expandedId === exp.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-4 pb-4 space-y-4 overflow-hidden"
                                >
                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-gray-500 uppercase tracking-tighter">Company</label>
                                            <input
                                                type="text"
                                                value={exp.company}
                                                onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-gray-500 uppercase tracking-tighter">Position</label>
                                            <input
                                                type="text"
                                                value={exp.position}
                                                onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-gray-500 uppercase tracking-tighter">Start Date</label>
                                            <input
                                                type="text"
                                                value={exp.startDate}
                                                onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                                                placeholder="Jan 2022"
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-gray-500 uppercase tracking-tighter">End Date</label>
                                            <input
                                                type="text"
                                                value={exp.endDate}
                                                onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                                                placeholder="Present"
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
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
                                            value={exp.description}
                                            onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                                            rows={4}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {experience.length === 0 && (
                <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl">
                    <p className="text-xs text-gray-500">No experience added yet. Click the button above to start.</p>
                </div>
            )}
        </div>
    );
}
