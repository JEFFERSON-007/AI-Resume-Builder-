export const AI_PROMPTS = {
  summary: (role: string, experience: string) => `
    As a professional career coach, generate a high-impact professional summary for a ${role}. 
    ${experience ? `Context of their experience: ${experience}.` : "The user is just starting out or focusing on this specific role."}
    The summary should be concise (3-4 sentences), action-oriented, and highlight key achievements or potential.
    Format: A single paragraph.
  `,
  improveBullet: (bullet: string) => `
    Improve the following resume bullet point to be more impact-driven and quantified: "${bullet}".
    Use strong action verbs and include metrics or specific outcomes where possible.
    Output: Only the improved bullet point.
  `,
  tailor: (jobDescription: string, resumeContent: string) => `
    Tailor the following resume content to better fit this job description:
    
    Job Description:
    ${jobDescription}
    
    Resume Content:
    ${resumeContent}
    
    Optimize the content by highlighting relevant skills and keywords while maintaining honesty.
    Output: JSON format with optimized sections.
  `,
  score: (resumeContent: string) => `
    Analyze the following resume and provide a score from 0-100 based on:
    1. Impact of bullet points
    2. Professional summary quality
    3. Keyword optimization
    4. Format and readability
    
    Resume Content:
    ${resumeContent}
    
    Output: JSON format with "score", "suggestions" (array), and "ats_feedback" (string).
  `,
};
