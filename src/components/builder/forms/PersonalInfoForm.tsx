"use client";

import { useResumeStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Link as LinkIcon, X } from "lucide-react";
import { useState, useRef } from "react";

export default function PersonalInfoForm() {
    const { personalInfo, updatePersonalInfo } = useResumeStore((state) => ({
        personalInfo: state.resumeData.personalInfo,
        updatePersonalInfo: state.updatePersonalInfo,
    }));

    const [uploadType, setUploadType] = useState<"url" | "file">("file");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updatePersonalInfo({ [name]: value });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please upload an image file.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            updatePersonalInfo({ profilePhoto: base64String });
        };
        reader.readAsDataURL(file);
    };

    const clearPhoto = () => {
        updatePersonalInfo({ profilePhoto: "" });
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={personalInfo.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Job Title</label>
                    <input
                        type="text"
                        name="jobTitle"
                        value={personalInfo.jobTitle}
                        onChange={handleChange}
                        placeholder="Senior Full Stack Engineer"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={personalInfo.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone Number</label>
                    <input
                        type="text"
                        name="phone"
                        value={personalInfo.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={personalInfo.location}
                        onChange={handleChange}
                        placeholder="San Francisco, CA"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Portfolio / Website</label>
                    <input
                        type="text"
                        name="website"
                        value={personalInfo.website}
                        onChange={handleChange}
                        placeholder="https://johndoe.com"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Profile Photo</label>
                    <div className="flex bg-white/5 rounded-lg p-1">
                        <button
                            type="button"
                            onClick={() => setUploadType("file")}
                            className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${uploadType === "file" ? "bg-blue-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
                        >
                            Upload File
                        </button>
                        <button
                            type="button"
                            onClick={() => setUploadType("url")}
                            className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${uploadType === "url" ? "bg-blue-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
                        >
                            URL Link
                        </button>
                    </div>
                </div>

                <div className="relative group">
                    <AnimatePresence mode="wait">
                        {uploadType === "file" ? (
                            <motion.div
                                key="file-upload"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="relative"
                            >
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full h-32 bg-white/5 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group"
                                >
                                    {personalInfo.profilePhoto ? (
                                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-blue-500">
                                            <img src={personalInfo.profilePhoto} alt="Profile Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                <Upload className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Upload className="w-6 h-6 text-blue-400" />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-medium text-white">Click to upload photo</p>
                                                <p className="text-xs text-gray-500 mt-1">PNG, JPG or WebP up to 5MB</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                {personalInfo.profilePhoto && (
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); clearPhoto(); }}
                                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="url-upload"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-3"
                            >
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <LinkIcon className="h-4 w-4 text-gray-500" />
                                    </div>
                                    <input
                                        type="text"
                                        name="profilePhoto"
                                        value={personalInfo.profilePhoto}
                                        onChange={handleChange}
                                        placeholder="https://images.unsplash.com/photo-1599566150163-29194dcaad36"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <p className="text-[10px] text-gray-500 italic">Provide a direct link to a public image URL.</p>
                                {personalInfo.profilePhoto && (
                                    <div className="mt-4 flex items-center gap-4 p-3 bg-white/5 rounded-lg border border-white/10">
                                        <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20">
                                            <img src={personalInfo.profilePhoto} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-medium text-gray-400 truncate">{personalInfo.profilePhoto}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={clearPhoto}
                                            className="p-1 hover:text-red-400 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
