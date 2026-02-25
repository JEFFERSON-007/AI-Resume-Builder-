"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, BrainCircuit, TrendingUp, Search, Palette, Loader2 } from "lucide-react";

export default function AiAssistant({
    onClose,
    onAction,
    loading = false
}: {
    onClose: () => void;
    onAction: (action: string) => void;
    loading?: boolean;
}) {

    const features = [
        {
            id: "summary",
            title: "Generate Summary",
            desc: "Instant professional summary based on your role.",
            icon: BrainCircuit,
            color: "text-blue-400"
        },
        {
            id: "bullets",
            title: "Impact Bullets",
            desc: "Turn passive bullets into metric-driven achievements.",
            icon: TrendingUp,
            color: "text-green-400"
        },
        {
            id: "keywords",
            title: "Keyword Optimization",
            desc: "Tailor your resume for specific job descriptions.",
            icon: Search,
            color: "text-purple-400"
        },
        {
            id: "scoring",
            title: "Resume Score",
            desc: "Get an ATS score and improvement suggestions.",
            icon: Palette,
            color: "text-orange-400"
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
            <div className="glass-dark w-full max-w-2xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-blue-400" />
                        <h2 className="text-lg font-bold text-white">AI Career Assistant</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-500">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((feature) => (
                        <button
                            key={feature.id}
                            disabled={loading}
                            onClick={() => onAction(feature.id)}
                            className="flex flex-col items-start p-6 rounded-2xl bg-white/5 border border-white/5 text-left hover:border-blue-500/50 hover:bg-white/10 transition-all group active:scale-95"
                        >
                            <div className={`p-3 rounded-xl bg-white/5 mb-4 group-hover:bg-blue-500/10 transition-colors`}>
                                <feature.icon className={`w-6 h-6 ${feature.color}`} />
                            </div>
                            <h3 className="font-bold text-white mb-1">{feature.title}</h3>
                            <p className="text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
                        </button>
                    ))}
                </div>

                <div className="p-6 bg-black/50 border-t border-white/5 flex items-center justify-center">
                    {loading ? (
                        <div className="flex items-center gap-3 text-blue-400">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span className="text-sm font-medium tracking-wide">AI is thinking...</span>
                        </div>
                    ) : (
                        <p className="text-[10px] text-gray-600 uppercase tracking-widest font-medium">
                            Powered by GPT-4 Optimization Engine
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
