"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Type, ArrowUpDown, ChevronUp, ChevronDown } from "lucide-react";

interface EditableTextProps {
    value: string;
    onUpdate: (newValue: string) => void;
    className?: string;
    tag?: "h1" | "h2" | "h3" | "p" | "span" | "div";
    multiline?: boolean;
    placeholder?: string;
    showControls?: boolean;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
    style?: React.CSSProperties;
}

export default function EditableText({
    value,
    onUpdate,
    className = "",
    tag = "div",
    multiline = false,
    placeholder = "Type here...",
    showControls = false,
    onMoveUp,
    onMoveDown,
    style,
}: EditableTextProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [fontSize, setFontSize] = useState(100); // Percentage
    const [isHovered, setIsHovered] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const lastX = useRef(0);
    const contentRef = useRef<HTMLDivElement>(null);
    const Tag = tag as any;

    const handleBlur = () => {
        setIsEditing(false);
        if (contentRef.current) {
            onUpdate(contentRef.current.innerText);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !multiline) {
            e.preventDefault();
            contentRef.current?.blur();
        }
    };

    const startResizing = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(true);
        lastX.current = e.clientX;
    };

    useEffect(() => {
        if (!isResizing) return;

        const handleMouseMove = (e: MouseEvent) => {
            const deltaX = e.clientX - lastX.current;
            // Scale font size based on horizontal movement
            // 5px move = 1% change (adjustable)
            const change = deltaX / 5;
            setFontSize(prev => Math.min(400, Math.max(20, prev + change)));
            lastX.current = e.clientX;
        };

        const handleMouseUp = () => {
            setIsResizing(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    return (
        <div
            className={`relative group/editable ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Tag
                ref={contentRef}
                contentEditable={true}
                onFocus={() => setIsEditing(true)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                suppressContentEditableWarning={true}
                className={`outline-none transition-all duration-200 rounded px-1 -mx-1 relative
                    ${isHovered ? "bg-blue-50/50 ring-1 ring-blue-200" : ""}
                    ${isEditing ? "bg-white ring-2 ring-blue-500 shadow-sm z-10" : ""}
                `}
                style={{ ...style, fontSize: fontSize !== 100 ? `${fontSize}%` : undefined }}
            >
                {value || (isEditing ? "" : placeholder)}
            </Tag>

            {/* Resize Handle */}
            {isHovered && !isEditing && (
                <div
                    onMouseDown={startResizing}
                    className="absolute -bottom-1.5 -right-1.5 w-4 h-4 cursor-nwse-resize z-30 flex items-center justify-center group/text-handle"
                >
                    <div className="w-2.5 h-2.5 bg-white border-2 border-blue-600 rounded-full shadow-md group-hover/text-handle:scale-125 transition-transform" />
                </div>
            )}

            <AnimatePresence>
                {isHovered && !isEditing && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="absolute -top-10 left-0 flex items-center gap-1 bg-white border border-gray-200 shadow-xl rounded-lg p-1 z-50 pointer-events-auto"
                    >
                        <div className="flex items-center gap-1 border-r border-gray-100 pr-1 mr-1">
                            <button
                                onClick={() => setFontSize(Math.max(50, fontSize - 10))}
                                className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-blue-600 transition-colors"
                                title="Decrease font size"
                            >
                                <ChevronDown className="w-3 h-3" />
                            </button>
                            <span className="text-[9px] font-bold text-gray-400 w-8 text-center">{fontSize}%</span>
                            <button
                                onClick={() => setFontSize(Math.min(200, fontSize + 10))}
                                className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-blue-600 transition-colors"
                                title="Increase font size"
                            >
                                <ChevronUp className="w-3 h-3" />
                            </button>
                        </div>

                        {showControls && (
                            <div className="flex items-center gap-1">
                                {onMoveUp && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onMoveUp(); }}
                                        className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-blue-600 transition-colors"
                                        title="Move Up"
                                    >
                                        <ChevronUp className="w-3 h-3" />
                                    </button>
                                )}
                                {onMoveDown && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onMoveDown(); }}
                                        className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-blue-600 transition-colors"
                                        title="Move Down"
                                    >
                                        <ChevronDown className="w-3 h-3" />
                                    </button>
                                )}
                            </div>
                        )}

                        <div className="pl-2 pr-1 text-[8px] font-black uppercase tracking-tighter text-blue-500 opacity-50 flex items-center gap-1">
                            <Type className="w-2 h-2" /> EDITING
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
