import {
  GraduationCap, Play, BarChart3, TrendingUp, RefreshCw,
  Calendar, MessageSquare, Activity, Award, Layers,
  Palette, Globe, FileText, Video, Bot,
} from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

interface Differentiator {
  num: number;
  title: string;
  icon: React.ElementType;
  description: string;
}

const chapters = [
  {
    title: "Transform Learning",
    subtitle: "Student-centric features that drive outcomes",
    items: [
      { num: 1, title: "Student-Centric Architecture", icon: GraduationCap, description: "Built around learning outcomes, not content hosting. When students improve, your brand grows." },
      { num: 2, title: "Interactive Video Learning", icon: Play, description: "In-video overlays, embedded questions, and nudges transform passive watching into active learning." },
      { num: 3, title: "Deep Learning Analytics", icon: BarChart3, description: "Beyond marks — see time per question, accuracy trends, concept hesitation zones, and behavior patterns." },
      { num: 4, title: "Actionable Performance Insights", icon: TrendingUp, description: "Identify struggling topics, abnormal time consumption, and underperforming batches. Data-driven teaching." },
      { num: 5, title: "Structured Revision Ecosystem", icon: RefreshCw, description: "Automated revision planner. Better retention leads to better results and stronger testimonials." },
    ] as Differentiator[],
  },
  {
    title: "Empower Educators",
    subtitle: "Tools that make teaching smarter, not harder",
    items: [
      { num: 6, title: "Personalized Timetable", icon: Calendar, description: "Custom study schedules based on each student's daily routine. Consistency over cramming." },
      { num: 7, title: "Built-in Communication", icon: MessageSquare, description: "Structured student-educator messaging inside LMS. No WhatsApp clutter, fully trackable." },
      { num: 8, title: "Engagement Monitoring", icon: Activity, description: "Detect activity drops, declining revision frequency, and inconsistent attempts before disengagement." },
      { num: 9, title: "Brand Differentiation", icon: Award, description: "Position yourself as technologically advanced, student-focused, and outcome-oriented." },
      { num: 10, title: "Learning Operating System", icon: Layers, description: "Integrated ecosystem: Video, Assessment, Diagnostics, Revision, Timetable, Communication." },
    ] as Differentiator[],
  },
  {
    title: "Scale Your Impact",
    subtitle: "AI-powered growth and automation tools",
    items: [
      { num: 11, title: "Content Creation Studio", icon: Palette, description: "Create and edit social media posts and reels with Canva API. Schedule and post directly to Meta." },
      { num: 12, title: "AI-Powered Websites", icon: Globe, description: "No more template websites. Change your website whenever you want with AI generation." },
      { num: 13, title: "AI Blog Engine", icon: FileText, description: "AI-enriched, SEO-friendly blog content published directly on your website." },
      { num: 14, title: "AI Video Avatars", icon: Video, description: "Be available 24/7 or create videos without recording using HeyGen-powered digital doppelgängers." },
      { num: 15, title: "AI Teaching Copilot", icon: Bot, description: "Personal AI assistant that generates lesson plans, question papers, and communication drafts in your style." },
    ] as Differentiator[],
  },
];

function TimelineCard({ item, index }: { item: Differentiator; index: number }) {
  const isLeft = item.num % 2 === 1;

  return (
    <div className="relative flex items-center md:gap-8">
      {/* Left side */}
      <div className={`hidden md:block w-5/12 ${isLeft ? "" : "order-2"}`}>
        {isLeft && (
          <ScrollReveal direction="left" delay={index * 100}>
            <CardContent item={item} align="right" />
          </ScrollReveal>
        )}
        {!isLeft && (
          <ScrollReveal direction="right" delay={index * 100}>
            <CardContent item={item} align="left" />
          </ScrollReveal>
        )}
      </div>

      {/* Timeline dot */}
      <div className="hidden md:flex w-2/12 justify-center relative z-10">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-heading font-bold text-sm shadow-lg">
          {item.num}
        </div>
      </div>

      {/* Right side (desktop) / Full (mobile) */}
      <div className={`hidden md:block w-5/12 ${isLeft ? "order-2" : ""}`} />

      {/* Mobile layout */}
      <div className="md:hidden w-full">
        <ScrollReveal direction="up" delay={index * 80}>
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-heading font-bold text-xs shrink-0">
                {item.num}
              </div>
              <div className="w-px flex-1 bg-border mt-2" />
            </div>
            <div className="pb-8 flex-1">
              <CardContent item={item} align="left" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

function CardContent({ item, align }: { item: Differentiator; align: "left" | "right" }) {
  return (
    <div
      className={`premium-card p-6 ${align === "right" ? "text-right" : "text-left"}`}
    >
      <div className={`flex items-center gap-3 mb-3 ${align === "right" ? "justify-end" : ""}`}>
        <div className={`w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center ${align === "right" ? "order-2" : ""}`}>
          <item.icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-heading text-heading-4 text-foreground">{item.title}</h3>
      </div>
      <p className="text-body-sm text-muted-foreground leading-relaxed">{item.description}</p>
    </div>
  );
}

export function DifferentiatorTimeline() {
  return (
    <section className="py-24">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="badge-accent mb-4 inline-block">15 Reasons to Choose EdSetu</span>
            <h2 className="font-heading text-display-2 text-foreground mb-4">
              The <span className="gradient-text">Differentiator</span> Journey
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              Each feature is designed to solve a real problem faced by educators in India today.
            </p>
          </div>
        </ScrollReveal>

        {chapters.map((chapter, ci) => (
          <div key={chapter.title} className="mb-20 last:mb-0">
            <ScrollReveal direction="scale">
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 rounded-full px-5 py-2 text-body-sm font-medium text-primary mb-2">
                  Chapter {ci + 1}
                </span>
                <h3 className="font-heading text-heading-2 text-foreground">{chapter.title}</h3>
                <p className="text-body text-muted-foreground">{chapter.subtitle}</p>
              </div>
            </ScrollReveal>

            {/* Timeline line (desktop) */}
            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-primary/20 via-primary/40 to-accent/20" />
              <div className="space-y-8 md:space-y-12">
                {chapter.items.map((item, i) => (
                  <TimelineCard key={item.num} item={item} index={i} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
