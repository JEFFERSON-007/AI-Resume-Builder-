"use client";

import { useResumeStore } from "@/lib/store";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EducationForm() {
    const { education, addEducation, updateEducation, removeEducation } = useResumeStore((state) => ({
        education: state.resumeData.education,
        addEducation: state.addEducation,
        updateEducation: state.updateEducation,
        removeEducation: state.removeEducation,
    }));

    const [expandedId, setExpandedId] = useState<string | null>(education[0]?.id || null);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Education</label>
                <button
                    onClick={addEducation}
                    className="flex items-center gap-1.5 text-[10px] font-bold text-blue-400 bg-blue-400/10 border border-blue-400/20 px-2.5 py-1 rounded-full hover:bg-blue-400/20 transition-colors"
                >
                    <Plus className="w-3 h-3" />
                    ADD EDUCATION
                </button>
            </div>

            <div className="space-y-4">
                {education.map((edu, index) => (
                    <motion.div
                        key={edu.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-dark rounded-xl overflow-hidden border border-white/5"
                    >
                        <div
                            className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                            onClick={() => setExpandedId(expandedId === edu.id ? null : edu.id)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-xs">
                                    {index + 1}
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-white">
                                        {edu.degree || "New Degree"}
                                    </h3>
                                    <p className="text-[10px] text-gray-500">{edu.school || "University Name"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); removeEducation(edu.id); }}
                                    className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                {expandedId === edu.id ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                            </div>
                        </div>

                        <AnimatePresence>
                            {expandedId === edu.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-4 pb-4 space-y-4 overflow-hidden"
                                >
                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-gray-500 uppercase tracking-tighter">School / University</label>
                                            <input
                                                type="text"
                                                value={edu.school}
                                                onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-gray-500 uppercase tracking-tighter">Degree</label>
                                            <input
                                                type="text"
                                                value={edu.degree}
                                                onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-gray-500 uppercase tracking-tighter">Field of Study</label>
                                            <input
                                                type="text"
                                                value={edu.field}
                                                onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-gray-500 uppercase tracking-tighter">Start Date</label>
                                            <input
                                                type="text"
                                                value={edu.startDate}
                                                onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                                                placeholder="Sep 2018"
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-gray-500 uppercase tracking-tighter">End Date</label>
                                            <input
                                                type="text"
                                                value={edu.endDate}
                                                onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                                                placeholder="Jun 2022"
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
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
