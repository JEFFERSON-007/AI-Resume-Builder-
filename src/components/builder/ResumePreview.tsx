"use client";

import { useResumeStore } from "@/lib/store";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Settings, Minus, Plus } from "lucide-react";
import UniversalTemplate, { LayoutId, ThemeId } from "../templates/UniversalTemplate";

export default function ResumePreview() {
    const resumeData = useResumeStore((state) => state.resumeData);
    const zoom = useResumeStore((state) => state.zoom);
    const setZoom = useResumeStore((state) => state.setZoom);
    const updatePageSettings = useResumeStore((state) => state.updatePageSettings);
    const { format, width, height, margins, cropToContent } = resumeData.pageSettings;

    const containerRef = useRef<HTMLDivElement>(null);
    const [showFormatMenu, setShowFormatMenu] = useState(false);
    const [isResizing, setIsResizing] = useState<null | 'bottom' | 'right' | 'bottom-right'>(null);
    const lastPos = useRef({ x: 0, y: 0 });

    // Parallax motion values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [5, -5]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-5, 5]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const startResizing = (e: React.MouseEvent, type: 'bottom' | 'right' | 'bottom-right') => {
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(type);
        lastPos.current = { x: e.clientX, y: e.clientY };
    };

    useEffect(() => {
        if (!isResizing) return;

        const handleGlobalMouseMove = (e: MouseEvent) => {
            const deltaX = (e.clientX - lastPos.current.x) / zoom;
            const deltaY = (e.clientY - lastPos.current.y) / zoom;

            // 1mm is approx 3.78px at 96dpi
            const mmDeltaX = deltaX / 3.78;
            const mmDeltaY = deltaY / 3.78;

            const newSettings: any = { format: 'Custom' };

            if (isResizing === 'right' || isResizing === 'bottom-right') {
                if (Math.abs(mmDeltaX) > 0.1) {
                    newSettings.width = Math.max(100, width + mmDeltaX);
                }
            }
            if (isResizing === 'bottom' || isResizing === 'bottom-right') {
                if (Math.abs(mmDeltaY) > 0.1) {
                    newSettings.height = Math.max(100, height + mmDeltaY);
                }
            }

            if (Object.keys(newSettings).length > 1) {
                updatePageSettings(newSettings);
                lastPos.current = { x: e.clientX, y: e.clientY };
            }
        };

        const handleGlobalMouseUp = () => {
            setIsResizing(null);
        };

        window.addEventListener('mousemove', handleGlobalMouseMove);
        window.addEventListener('mouseup', handleGlobalMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            window.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, [isResizing, zoom, width, height, updatePageSettings]);

    const renderTemplate = () => {
        const parts = resumeData.templateId.split("-");
        const themeId = parts.pop() as ThemeId;
        const layoutId = parts.join("-") as LayoutId;

        return (
            <UniversalTemplate
                data={resumeData}
                layoutId={layoutId as LayoutId}
                themeId={themeId as ThemeId}
            />
        );
    };

    return (
        <div className="flex flex-col h-full bg-slate-900 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />

            <motion.div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="flex-1 overflow-auto p-4 md:p-8 flex justify-center items-start scrollbar-thin scrollbar-white/10 scrollbar-track-transparent mt-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="relative" style={{ scale: zoom, transformOrigin: 'top' }}>
                    <div className="absolute -inset-1 border-2 border-blue-500/20 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                    <motion.div
                        id="resume-preview-root"
                        className="bg-white shadow-2xl transition-all duration-300 ease-out mb-24 relative"
                        style={{
                            width: `${width}mm`,
                            minHeight: cropToContent ? "auto" : `${height}mm`,
                            rotateX,
                            rotateY,
                            transformPerspective: 1000,
                        }}
                    >
                        {renderTemplate()}

                        {/* Resize Handles (Dots) */}
                        {!cropToContent && (
                            <>
                                {/* Bottom Handle */}
                                <div
                                    onMouseDown={(e) => startResizing(e, 'bottom')}
                                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-4 cursor-ns-resize z-30 flex items-center justify-center group/h"
                                >
                                    <div className="w-3 h-3 bg-white border-2 border-blue-600 rounded-full shadow-lg group-hover/h:scale-125 transition-transform" />
                                </div>

                                {/* Right Handle */}
                                <div
                                    onMouseDown={(e) => startResizing(e, 'right')}
                                    className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-4 h-4 cursor-ew-resize z-30 flex items-center justify-center group/h"
                                >
                                    <div className="w-3 h-3 bg-white border-2 border-blue-600 rounded-full shadow-lg group-hover/h:scale-125 transition-transform" />
                                </div>

                                {/* Bottom Right Corner Handle */}
                                <div
                                    onMouseDown={(e) => startResizing(e, 'bottom-right')}
                                    className="absolute -bottom-1.5 -right-1.5 w-5 h-5 cursor-nwse-resize z-30 flex items-center justify-center group/h"
                                >
                                    <div className="w-4 h-4 bg-white border-2 border-blue-600 rounded-full shadow-lg group-hover/h:scale-125 transition-transform" />
                                </div>
                            </>
                        )}
                    </motion.div>
                </div>
            </motion.div>

            {/* Floating Controls */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20">
                <AnimatePresence>
                    {showFormatMenu && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            className="p-6 bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl grid grid-cols-2 gap-8 w-[400px]"
                        >
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Page Format</label>
                                <div className="flex flex-col gap-2">
                                    {[
                                        { id: 'A4', w: 210, h: 297 },
                                        { id: 'Letter', w: 215.9, h: 279.4 },
                                    ].map(f => (
                                        <button
                                            key={f.id}
                                            onClick={() => updatePageSettings({ format: f.id as any, width: f.w, height: f.h })}
                                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${format === f.id ? "bg-blue-600 text-white" : "bg-white/5 text-white/60 hover:bg-white/10"
                                                }`}
                                        >
                                            {f.id}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Margins ({margins}px)</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={margins}
                                    onChange={(e) => updatePageSettings({ margins: parseInt(e.target.value) })}
                                    className="w-full accent-blue-600"
                                />
                                <div className="pt-2">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <div
                                            onClick={() => updatePageSettings({ cropToContent: !cropToContent })}
                                            className={`w-10 h-5 rounded-full transition-all relative ${cropToContent ? "bg-blue-600" : "bg-white/10"}`}
                                        >
                                            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${cropToContent ? "left-6" : "left-1"}`} />
                                        </div>
                                        <span className="text-[10px] font-bold text-white/60 uppercase group-hover:text-white transition-colors">Crop to content</span>
                                    </label>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex items-center gap-4 px-6 py-3 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
                    <button
                        onClick={() => setShowFormatMenu(!showFormatMenu)}
                        className={`p-2 rounded-full transition-all ${showFormatMenu ? "bg-blue-600 text-white" : "text-white/60 hover:bg-white/10"}`}
                    >
                        <Settings className="w-5 h-5" />
                    </button>

                    <div className="w-[1px] h-4 bg-white/10 mx-2" />

                    <button
                        onClick={() => setZoom(Math.max(0.4, zoom - 0.1))}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Zoom out"
                    >
                        <Minus className="w-4 h-4 text-white" />
                    </button>
                    <div className="text-[10px] font-black text-white uppercase tracking-widest w-12 text-center">
                        {Math.round(zoom * 100)}%
                    </div>
                    <button
                        onClick={() => setZoom(Math.min(1.5, zoom + 0.1))}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Zoom in"
                    >
                        <Plus className="w-4 h-4 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}

