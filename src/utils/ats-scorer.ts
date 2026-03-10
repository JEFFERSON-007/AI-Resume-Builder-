import { ResumeData } from "@/lib/store";

export interface ScoreCategory {
    score: number;
    maxScore: number;
    suggestions: string[];
}

export interface DetailedScore {
    totalScore: number;
    categories: {
        contact: ScoreCategory;
        summary: ScoreCategory;
        experience: ScoreCategory;
        skills: ScoreCategory;
        education: ScoreCategory;
        projects: ScoreCategory;
    };
    overallSuggestions: string[];
}

export function calculateAtsScore(data: ResumeData): DetailedScore {
    const categories = {
        contact: calculateContactScore(data.personalInfo),
        summary: calculateSummaryScore(data.summary, data.personalInfo.jobTitle),
        experience: calculateExperienceScore(data.experience, data.skills),
        skills: calculateSkillsScore(data.skills),
        education: calculateEducationScore(data.education),
        projects: calculateProjectsScore(data.projects),
    };

    const totalScore = Math.round(
        categories.contact.score +
        categories.summary.score +
        categories.experience.score +
        categories.skills.score +
        categories.education.score +
        categories.projects.score
    );

    const overallSuggestions = Object.values(categories)
        .flatMap(cat => cat.suggestions)
        .slice(0, 5);

    return {
        totalScore: Math.min(100, totalScore),
        categories,
        overallSuggestions,
    };
}

function calculateContactScore(info: ResumeData['personalInfo']): ScoreCategory {
    let score = 0;
    const maxScore = 15;
    const suggestions: string[] = [];

    if (info.fullName) score += 3; else suggestions.push("Add your full name.");
    if (info.email && info.email.includes("@")) score += 3; else suggestions.push("Add a valid professional email.");
    if (info.phone) score += 3; else suggestions.push("Include a contact phone number.");
    if (info.location) score += 3; else suggestions.push("Add your city/state location.");
    if (info.jobTitle) score += 3; else suggestions.push("Add a target job title.");

    return { score, maxScore, suggestions };
}

function calculateSummaryScore(summary: string, jobTitle: string): ScoreCategory {
    let score = 0;
    const maxScore = 10;
    const suggestions: string[] = [];

    const text = summary.trim();
    const words = text ? text.split(/\s+/) : [];
    const wordCount = words.length;

    if (wordCount >= 40 && wordCount <= 100) {
        score += 7;
    } else if (wordCount > 0) {
        score += 3;
        if (wordCount < 40) suggestions.push("Professional summary is too brief. Expand to 40-100 words.");
    } else {
        suggestions.push("Write a punchy summary highlighting your years of experience and top skills.");
    }

    if (jobTitle && text.toLowerCase().includes(jobTitle.toLowerCase())) {
        score += 3;
    } else if (text) {
        suggestions.push(`Include your target title '${jobTitle || "Role"}' in your summary for better keyword match.`);
    }

    return { score, maxScore, suggestions };
}

function calculateExperienceScore(experience: ResumeData['experience'], skills: ResumeData['skills']): ScoreCategory {
    let score = 0;
    const maxScore = 30;
    const suggestions: string[] = [];

    if (experience.length === 0) {
        suggestions.push("Describe your work history with impact-focused bullets.");
        return { score, maxScore, suggestions };
    }

    score += Math.min(experience.length * 5, 10);

    const actionVerbs = ["managed", "developed", "led", "increased", "created", "spearheaded", "implemented", "designed", "optimized", "streamlined", "solved"];
    let verbCount = 0;
    let numberCount = 0;
    let skillMatchCount = 0;

    experience.forEach(exp => {
        const desc = exp.description.toLowerCase();
        // Check for action verbs
        actionVerbs.forEach(v => { if (desc.includes(v)) verbCount++; });
        // Check for numbers/percentages (Quantified impact)
        const numbers = desc.match(/\d+(%|\+)?/g);
        if (numbers) numberCount += numbers.length;
        // Check for skill usage
        skills.forEach(s => { if (desc.includes(s.name.toLowerCase())) skillMatchCount++; });
    });

    if (verbCount > 3) score += 7; else suggestions.push("Use more strong action verbs (e.g., 'Optimized', 'Streamlined').");
    if (numberCount > 1) score += 8; else suggestions.push("Quantify your impact with numbers or % (e.g., 'Increased revenue by 20%').");
    if (skillMatchCount > 2) score += 5; else suggestions.push("Mention your top skills within experience descriptions.");

    return { score: Math.min(score, maxScore), maxScore, suggestions };
}

function calculateSkillsScore(skills: ResumeData['skills']): ScoreCategory {
    let score = 0;
    const maxScore = 20;
    const suggestions: string[] = [];

    if (skills.length === 0) {
        suggestions.push("List technical and core competencies.");
        return { score, maxScore, suggestions };
    }

    score = Math.min(skills.length * 2.5, 20);

    if (skills.length < 8) {
        suggestions.push("List at least 8-12 skills to maximize ATS keyword scanning.");
    }

    return { score, maxScore, suggestions };
}

function calculateEducationScore(education: ResumeData['education']): ScoreCategory {
    let score = 0;
    const maxScore = 15;
    const suggestions: string[] = [];

    if (education.length === 0) {
        suggestions.push("Add degree and school information.");
        return { score, maxScore, suggestions };
    }

    education.forEach(edu => {
        if (edu.school && edu.degree) score += 10;
        if (edu.field) score += 5;
    });

    return { score: Math.min(score, maxScore), maxScore, suggestions };
}

function calculateProjectsScore(projects: ResumeData['projects']): ScoreCategory {
    let score = 0;
    const maxScore = 10;
    const suggestions: string[] = [];

    if (projects.length > 0) {
        score = Math.min(projects.length * 5, 10);
    } else {
        suggestions.push("Add a project section to demonstrate hands-on application.");
    }

    return { score, maxScore, suggestions };
}

