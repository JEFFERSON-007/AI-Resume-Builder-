"use client";

import { useResumeStore } from "@/lib/store";
import { Plus, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SkillsForm() {
    const { skills, addSkill, updateSkill, removeSkill } = useResumeStore((state) => ({
        skills: state.resumeData.skills,
        addSkill: state.addSkill,
        updateSkill: state.updateSkill,
        removeSkill: state.removeSkill,
    }));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Skills & Technologies</label>
                <button
                    onClick={addSkill}
                    className="flex items-center gap-1.5 text-[10px] font-bold text-blue-400 bg-blue-400/10 border border-blue-400/20 px-2.5 py-1 rounded-full hover:bg-blue-400/20 transition-colors"
                >
                    <Plus className="w-3 h-3" />
                    ADD SKILL
                </button>
            </div>

            <div className="flex flex-wrap gap-3">
                <AnimatePresence>
                    {skills.map((skill) => (
                        <motion.div
                            key={skill.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="group relative flex items-center bg-white/5 border border-white/10 rounded-full pl-4 pr-10 py-2 hover:border-blue-500/50 transition-colors"
                        >
                            <input
                                type="text"
                                value={skill.name}
                                onChange={(e) => updateSkill(skill.id, e.target.value)}
                                placeholder="Skill name"
                                className="bg-transparent border-none focus:outline-none text-xs text-white w-24"
                            />
                            <button
                                onClick={() => removeSkill(skill.id)}
                                className="absolute right-2 p-1 text-gray-500 hover:text-red-400 transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {skills.length === 0 && (
                <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl">
                    <p className="text-xs text-gray-500">No skills added yet.</p>
                </div>
            )}
        </div>
    );
}
