// Default Client Landing Template — Theme Configuration
// Change these values per client to fully re-skin the template.
// All colors are HSL strings to align with our CSS variable contract.

export const templateTheme = {
  brand: {
    name: "Lumina Academy",
    tagline: "Where Curious Minds Become Unstoppable",
    logoText: "LUMINA",
  },
  colors: {
    // Primary brand color (HSL components only)
    primary: "270 95% 60%",
    primaryGlow: "290 100% 70%",
    accent: "330 95% 60%",
    secondary: "200 100% 60%",
    dark: "260 40% 8%",
    darkSoft: "260 30% 14%",
    light: "270 30% 98%",
  },
  hero: {
    eyebrow: "New Cohort • Spring 2026",
    title: ["Learn Boldly.", "Create Fearlessly.", "Live Limitlessly."],
    subtitle:
      "Join 120,000+ learners mastering tomorrow's skills with world-class instructors, immersive projects, and a community that lifts you higher.",
    primaryCta: "Browse Courses",
    secondaryCta: "Watch Showreel",
    stats: [
      { value: "120K+", label: "Active Learners" },
      { value: "850+", label: "Premium Courses" },
      { value: "4.9/5", label: "Avg. Rating" },
      { value: "92%", label: "Completion Rate" },
    ],
  },
};

export type TemplateTheme = typeof templateTheme;
