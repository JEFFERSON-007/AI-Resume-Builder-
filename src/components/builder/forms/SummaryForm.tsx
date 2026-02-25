"use client";

import { useResumeStore } from "@/lib/store";
import { Sparkles } from "lucide-react";

export default function SummaryForm() {
    const { summary, updateSummary, setAiOpen } = useResumeStore((state) => ({
        summary: state.resumeData.summary,
        updateSummary: state.updateSummary,
        setAiOpen: state.setAiOpen,
    }));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Professional Summary</label>
                <button
                    onClick={() => setAiOpen(true)}
                    className="flex items-center gap-1.5 text-[10px] font-bold text-blue-400 bg-blue-400/10 border border-blue-400/20 px-2.5 py-1 rounded-full hover:bg-blue-400/20 transition-colors"
                >
                    <Sparkles className="w-3 h-3" />
                    AI GENERATE
                </button>
            </div>

            <div className="relative">
                <textarea
                    value={summary}
                    onChange={(e) => updateSummary(e.target.value)}
                    placeholder="I am a highly motivated individual with experience in..."
                    rows={8}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none leading-relaxed text-sm"
                />
                <div className="absolute bottom-4 right-4 text-[10px] text-gray-500">
                    {summary.length} characters
                </div>
            </div>
        </div>
    );
}
