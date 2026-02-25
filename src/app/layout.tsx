import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "AI Resume Builder | Modern & 3D Animated",
    description: "Build a premium resume with AI content generation and live 3D preview.",
};

import Navbar from "@/components/layout/Navbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={inter.className}>
                <Navbar />
                <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1)_0%,rgba(0,0,0,1)_100%)]" />
                <main className="relative min-h-screen">
                    {children}
                </main>
            </body>
        </html>
    );
}
