# 🚀 AI-Powered Resume Builder

A premium, interactive, and AI-driven resume builder built with Next.js. Create professional resumes in minutes with real-time feedback and a polished design experience.

### 🌐 [Live Demo](https://jefferson-007.github.io/AI-Resume-Builder-/)

---

## ✨ Key Features

### 🤖 AI Career Assistant
- **AI Summary**: Generate impact-driven professional summaries tailored to your role.
- **Achievement Bullets**: Transform basic tasks into metric-heavy achievements.
- **Keyword Optimization**: Tailor your resume for specific Job Descriptions (ATS friendly).
- **Resume Scoring**: Get instant feedback and improvement suggestions.

### 🎨 Premium Design & Interaction
- **14+ Professional Layouts**: Toggle between Technical, Classic, Modern, Sidebar, Grid, and many more.
- **One-Click Themes**: Instantly switch between Emerald, Midnight, Rose, and Slate aesthetics.
- **Interactive Parallax Preview**: A state-of-the-art preview that responds to your mouse movement for a premium "tangible" feel.

### 📏 Unparalleled Control
- **Interactive Page Resizing**: Drag handles (edges/corners) to manually crop or extend your resume.
- **On-the-fly Text Scaling**: Hover and drag the corner of any text element to scale its font size.
- **Dynamic Margins**: Control page whitespace with a real-time slider.
- **Auto-Formatting**: Supports A4, Letter, and Custom formats.

### 📁 Export & Portability
- **PDF Export**: Generate high-quality PDF renders of your resume using `html2canvas` and `jsPDF`.
- **Local Persistence**: All adjustments are saved in a robust global store (Zustand).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF) + [html2canvas](https://html2canvas.hertzen.com/)
- **Deployment**: [GitHub Pages](https://pages.github.com/) + [GitHub Actions](https://github.com/features/actions)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm (or yarn/pnpm)

### Step 1: Clone and Install
```bash
git clone https://github.com/JEFFERSON-007/AI-Resume-Builder-.git
cd AI-Resume-Builder-
npm install
```

### Step 2: Environment Setup
Create a `.env.local` file in the root and add your [Google Gemini API Key](https://aistudio.google.com/app/apikey):
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

### Step 3: Run Locally
```bash
npm run dev
# The app will be available at http://localhost:3000
```

---

## 🏗️ Deployment

This project is configured for automated deployment to **GitHub Pages** via GitHub Actions.

1. Go to your repository **Settings > Pages**.
2. Set **Source** to **GitHub Actions**.
3. Every push to the `main` branch will trigger a fresh build and deployment.

---

## 📄 License

This project is open-source and available under the MIT License.

Created with ❤️ by JEFFERSON-007