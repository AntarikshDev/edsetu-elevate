import catDesign from "@/assets/template/cat-design.jpg";
import catBusiness from "@/assets/template/cat-business.jpg";
import catCode from "@/assets/template/cat-code.jpg";
import catPhoto from "@/assets/template/cat-photo.jpg";
import course1 from "@/assets/template/course-1.jpg";
import course2 from "@/assets/template/course-2.jpg";
import course3 from "@/assets/template/course-3.jpg";
import course4 from "@/assets/template/course-4.jpg";
import course5 from "@/assets/template/course-5.jpg";
import course6 from "@/assets/template/course-6.jpg";
import instructor1 from "@/assets/template/instructor-1.jpg";

export const categories = [
  { id: "design", name: "Design & Creativity", count: 142, image: catDesign, color: "270 95% 60%" },
  { id: "code", name: "Code & Engineering", count: 218, image: catCode, color: "210 100% 60%" },
  { id: "business", name: "Business & Growth", count: 96, image: catBusiness, color: "30 100% 60%" },
  { id: "photo", name: "Photo & Film", count: 74, image: catPhoto, color: "330 95% 60%" },
];

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  students: number;
  hours: number;
  lessons: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  image: string;
  instructor: { name: string; title: string; avatar: string };
  badges?: string[];
  description: string;
  outcomes: string[];
  curriculum: { title: string; lessons: number; duration: string }[];
}

const instructor = {
  name: "Aarav Mehta",
  title: "Principal Designer · Ex-Google",
  avatar: instructor1,
};

export const courses: Course[] = [
  {
    id: "1",
    slug: "advanced-ui-ux-masterclass",
    title: "Advanced UI/UX Masterclass",
    subtitle: "Design products people obsess over",
    category: "design",
    price: 89,
    originalPrice: 199,
    rating: 4.9,
    students: 12480,
    hours: 32,
    lessons: 86,
    level: "Advanced",
    image: course1,
    instructor,
    badges: ["Bestseller", "Updated 2026"],
    description:
      "A deep, hands-on dive into modern product design — from research and IA to interaction systems, motion, and design ops. Build a portfolio recruiters fight over.",
    outcomes: [
      "Ship pixel-perfect interfaces using design systems",
      "Run fast research and synthesize sharp insights",
      "Master Figma auto-layout, variables, and tokens",
      "Design micro-interactions that feel alive",
      "Present work that wins stakeholder buy-in",
    ],
    curriculum: [
      { title: "Foundations of Modern UX", lessons: 12, duration: "4h 30m" },
      { title: "Design Systems at Scale", lessons: 18, duration: "7h 10m" },
      { title: "Motion & Micro-Interactions", lessons: 14, duration: "5h 45m" },
      { title: "Portfolio & Career", lessons: 10, duration: "3h 20m" },
    ],
  },
  {
    id: "2",
    slug: "fullstack-web-bootcamp",
    title: "Full-Stack Web Development Bootcamp",
    subtitle: "Zero to deployed in 12 weeks",
    category: "code",
    price: 129,
    originalPrice: 299,
    rating: 4.8,
    students: 28930,
    hours: 64,
    lessons: 184,
    level: "Beginner",
    image: course2,
    instructor,
    badges: ["Hot"],
    description:
      "Build production-grade apps with React, Node, Postgres, and the tools real engineering teams use. Project-based and brutally practical.",
    outcomes: [
      "Architect scalable full-stack apps",
      "Master React, TypeScript, and modern tooling",
      "Design and query relational databases",
      "Deploy to the cloud with CI/CD",
    ],
    curriculum: [
      { title: "Web Foundations", lessons: 24, duration: "8h" },
      { title: "React + TypeScript", lessons: 48, duration: "16h" },
      { title: "Backend with Node", lessons: 42, duration: "14h" },
      { title: "Ship it: DevOps", lessons: 22, duration: "6h" },
    ],
  },
  {
    id: "3",
    slug: "digital-marketing-strategy",
    title: "Digital Marketing Strategy",
    subtitle: "Grow brands that actually convert",
    category: "business",
    price: 69,
    originalPrice: 149,
    rating: 4.7,
    students: 9120,
    hours: 18,
    lessons: 52,
    level: "Intermediate",
    image: course3,
    instructor,
    description:
      "Frameworks, funnels, and data-driven playbooks from operators who've scaled brands past $100M.",
    outcomes: [
      "Build full-funnel growth strategies",
      "Run paid ads that compound",
      "Use analytics to find unlock points",
      "Craft brand stories that travel",
    ],
    curriculum: [
      { title: "Strategy & Positioning", lessons: 12, duration: "4h" },
      { title: "Paid Acquisition", lessons: 16, duration: "6h" },
      { title: "Lifecycle & Retention", lessons: 14, duration: "5h" },
      { title: "Measure & Iterate", lessons: 10, duration: "3h" },
    ],
  },
  {
    id: "4",
    slug: "photography-fundamentals",
    title: "Photography Fundamentals",
    subtitle: "From snapshots to stunning",
    category: "photo",
    price: 49,
    originalPrice: 119,
    rating: 4.8,
    students: 6420,
    hours: 14,
    lessons: 38,
    level: "Beginner",
    image: course4,
    instructor,
    description:
      "Light, composition, and storytelling — the timeless foundations every great photographer relies on.",
    outcomes: [
      "Understand exposure deeply",
      "Compose images that command attention",
      "Edit with intention in Lightroom",
      "Build a signature visual style",
    ],
    curriculum: [
      { title: "The Camera", lessons: 8, duration: "3h" },
      { title: "Light & Composition", lessons: 12, duration: "5h" },
      { title: "Editing Workflow", lessons: 10, duration: "4h" },
      { title: "Your Style", lessons: 8, duration: "2h" },
    ],
  },
  {
    id: "5",
    slug: "data-science-ai",
    title: "Data Science & AI Essentials",
    subtitle: "Think in models, ship intelligence",
    category: "code",
    price: 99,
    originalPrice: 229,
    rating: 4.9,
    students: 15780,
    hours: 40,
    lessons: 112,
    level: "Intermediate",
    image: course5,
    instructor,
    badges: ["New"],
    description:
      "Python, statistics, ML, and modern AI — taught by practitioners who deploy models at scale.",
    outcomes: [
      "Wrangle and visualize real datasets",
      "Train and evaluate ML models",
      "Apply LLMs to real product problems",
      "Communicate insights that drive action",
    ],
    curriculum: [
      { title: "Python for Data", lessons: 28, duration: "10h" },
      { title: "Statistics & ML", lessons: 36, duration: "14h" },
      { title: "Deep Learning", lessons: 28, duration: "10h" },
      { title: "Applied AI", lessons: 20, duration: "6h" },
    ],
  },
  {
    id: "6",
    slug: "business-leadership",
    title: "Business Leadership Masterclass",
    subtitle: "Lead teams that win",
    category: "business",
    price: 119,
    originalPrice: 249,
    rating: 4.9,
    students: 4310,
    hours: 22,
    lessons: 64,
    level: "Advanced",
    image: course6,
    instructor,
    description:
      "Strategy, communication, and decision-making for leaders shaping the next decade of business.",
    outcomes: [
      "Make sharper decisions under uncertainty",
      "Run teams that compound talent",
      "Communicate with executive presence",
      "Build organizations that scale",
    ],
    curriculum: [
      { title: "Strategic Thinking", lessons: 16, duration: "5h" },
      { title: "People Leadership", lessons: 18, duration: "6h" },
      { title: "Operating Cadence", lessons: 14, duration: "5h" },
      { title: "Personal Mastery", lessons: 16, duration: "6h" },
    ],
  },
];

export interface Package {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  courseIds: string[];
  perks: string[];
  badge?: string;
  accent: string;
}

export const packages: Package[] = [
  {
    id: "p1",
    slug: "creator-starter",
    name: "Creator Starter Pack",
    tagline: "Design + Photo essentials to launch your portfolio.",
    price: 119,
    originalPrice: 318,
    courseIds: ["1", "4"],
    perks: ["2 cinematic courses", "Lifetime access", "Certificate of completion", "Community access"],
    badge: "Save 62%",
    accent: "270 95% 60%",
  },
  {
    id: "p2",
    slug: "developer-career",
    name: "Developer Career Bundle",
    tagline: "From first commit to shipping AI-powered apps.",
    price: 199,
    originalPrice: 528,
    courseIds: ["2", "5"],
    perks: ["2 elite engineering tracks", "Real-world projects", "Career coaching session", "Job-ready portfolio"],
    badge: "Most Popular",
    accent: "210 100% 60%",
  },
  {
    id: "p3",
    slug: "founder-mastery",
    name: "Founder Mastery Suite",
    tagline: "Strategy, growth and leadership in one ride.",
    price: 169,
    originalPrice: 498,
    courseIds: ["3", "6"],
    perks: ["2 boardroom-grade courses", "Strategy templates", "1:1 mentor intro", "Lifetime updates"],
    badge: "Founder Favourite",
    accent: "30 100% 60%",
  },
];

export const testimonials = [
  {
    name: "Riya Kapoor",
    role: "Product Designer @ Stripe",
    quote: "The most concentrated dose of design wisdom I've ever paid for. I 3x'd my offer in 4 months.",
  },
  {
    name: "Marcus Chen",
    role: "Founding Engineer @ Linear",
    quote: "Felt like working alongside senior engineers. The depth here is unreal.",
  },
  {
    name: "Aïsha Diallo",
    role: "Growth Lead @ Notion",
    quote: "I rebuilt our growth engine from scratch using these frameworks. Numbers spoke loud.",
  },
];
