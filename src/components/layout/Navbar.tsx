"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Layout, FileText, Sparkles, Home } from "lucide-react";

const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Templates", path: "/templates", icon: Layout },
    { name: "Builder", path: "/builder", icon: FileText },
];

export default function Navbar() {
    const pathname = usePathname();

    if (pathname === "/builder") return null;

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-4 w-full max-w-2xl">
            <div className="flex items-center justify-center gap-4 bg-transparent text-gray-400">
                <div className="flex items-center gap-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link key={item.path} href={item.path} className="relative group">
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                                    }`}>
                                    <item.icon className="w-4 h-4" />
                                    <span className="text-sm font-medium">{item.name}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-bg"
                                            className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-500 rounded-full"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
