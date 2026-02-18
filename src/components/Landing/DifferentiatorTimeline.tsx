import {
  GraduationCap, Play, BarChart3, TrendingUp, RefreshCw,
  Calendar, MessageSquare, Activity, Award, Layers,
  Palette, Globe, FileText, Video, Bot,
  CheckCircle2, AlertTriangle, Search,
} from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

/* ─── Rich UI Mockup Components ─── */

function HesitationZonesMockup() {
  const subjects = [
    { name: "Calculus", time: "120s", pct: 90, danger: true },
    { name: "Algebra", time: "45s", pct: 35, danger: false },
    { name: "Geometry", time: "90s", pct: 68, danger: false },
    { name: "Trigonometry", time: "110s", pct: 82, danger: true },
    { name: "Statistics", time: "30s", pct: 22, danger: false },
  ];
  return (
    <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-lg">
      <div className="flex items-center justify-between mb-5">
        <h4 className="font-heading text-sm font-semibold text-foreground">Hesitation Zones Analysis</h4>
        <span className="text-[10px] font-semibold bg-destructive/10 text-destructive px-2.5 py-1 rounded-full">Critical Gaps Detected</span>
      </div>
      <div className="space-y-3">
        {subjects.map((s) => (
          <div key={s.name} className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-20 shrink-0">{s.name}</span>
            <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${s.danger ? "bg-destructive" : "bg-primary"}`}
                style={{ width: `${s.pct}%` }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground w-16 text-right">{s.time} avg time</span>
          </div>
        ))}
      </div>
      <div className="flex gap-8 mt-5 pt-4 border-t border-border/50">
        <div className="text-center">
          <div className="font-heading text-2xl font-bold text-foreground">42%</div>
          <div className="text-[10px] text-muted-foreground">Struggle with Calculus</div>
        </div>
        <div className="text-center">
          <div className="font-heading text-2xl font-bold text-foreground">18s</div>
          <div className="text-[10px] text-muted-foreground">Avg. Hesitation</div>
        </div>
      </div>
    </div>
  );
}

function CalendarMockup() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const planned = [1, 5, 12, 15, 22, 28];
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  // May 2026 starts on Friday (index 4), so we need 4 empty cells
  const startOffset = 3; // Thursday = 3 (0-indexed, Mon=0)

  return (
    <div className="bg-card rounded-2xl border border-border/50 p-5 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-heading text-sm font-semibold text-foreground">May 2026</h4>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-[10px] text-muted-foreground">Planned Revision</span>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {dayNames.map((d) => (
          <div key={d} className="text-[10px] font-medium text-primary py-1">{d}</div>
        ))}
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.map((d) => (
          <div
            key={d}
            className={`text-xs py-1.5 rounded-lg relative ${
              d === 1
                ? "bg-foreground text-background font-bold"
                : planned.includes(d)
                ? "border border-primary/40 text-foreground font-medium"
                : "text-muted-foreground"
            }`}
          >
            {d}
            {planned.includes(d) && d !== 1 && (
              <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 p-2.5 bg-secondary/50 rounded-lg border border-border/30">
        <div className="text-[10px] text-muted-foreground">Up Next</div>
        <div className="text-xs font-semibold text-foreground">Physics: Thermodynamics</div>
        <div className="text-[10px] text-primary">Due for revision today</div>
      </div>
    </div>
  );
}

function ChatMockup() {
  return (
    <div className="bg-foreground rounded-2xl border border-border/20 p-0 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-background/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-[10px] font-bold">JD</div>
          <span className="text-sm font-medium text-background">John Doe</span>
        </div>
        <span className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded-full font-medium">Online</span>
      </div>
      {/* Messages */}
      <div className="p-4 space-y-3">
        <div className="bg-background/10 rounded-xl rounded-tl-sm p-3 max-w-[85%]">
          <p className="text-xs text-background/80">Sir, I'm stuck on question 4 regarding fluid dynamics.</p>
        </div>
        <div className="bg-primary/80 rounded-xl rounded-tr-sm p-3 max-w-[85%] ml-auto">
          <p className="text-xs text-primary-foreground">Let's look at the pressure variance again. Did you apply Bernoulli's principle?</p>
        </div>
      </div>
      {/* Engagement Alert */}
      <div className="mx-4 mb-4 p-3 bg-destructive/10 rounded-xl border border-destructive/20">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
          <div>
            <div className="text-xs font-semibold text-background">Engagement Alert</div>
            <div className="text-[10px] text-background/60">John hasn't attempted a test in 5 days. Retention risk: <span className="text-destructive font-semibold">High</span>.</div>
          </div>
        </div>
        <button className="mt-2 text-[10px] bg-destructive/20 text-destructive px-3 py-1 rounded-md font-medium">Send Nudge</button>
      </div>
    </div>
  );
}

function CanvaIntegrationMockup() {
  return (
    <div className="bg-foreground rounded-2xl border border-background/10 p-5 shadow-lg">
      <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mb-3">
        <Palette className="w-5 h-5 text-primary" />
      </div>
      <h4 className="font-heading text-sm font-semibold text-background mb-1">Canva API Integration</h4>
      <p className="text-[11px] text-background/50 mb-4">Create, edit, and schedule posts directly to Meta without leaving the dashboard.</p>
      <div className="rounded-xl border border-background/10 overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-2 bg-background/5">
          <div className="w-5 h-5 rounded-full bg-background/20" />
          <div className="h-1.5 w-16 bg-background/20 rounded" />
        </div>
        <div className="h-32 bg-gradient-to-br from-primary via-accent to-primary/60 flex items-center justify-center">
          <span className="text-xs font-medium text-background/90">New Course Launch! 🚀</span>
        </div>
      </div>
    </div>
  );
}

function AIWebsiteMockup() {
  return (
    <div className="bg-foreground rounded-2xl border border-background/10 p-5 shadow-lg">
      <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center mb-3">
        <Globe className="w-5 h-5 text-accent" />
      </div>
      <h4 className="font-heading text-sm font-semibold text-background mb-1">AI-Powered Websites</h4>
      <p className="text-[11px] text-background/50 mb-4">No generic templates. Dynamic content that changes when you want.</p>
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex-1 rounded-lg border border-background/10 bg-background/5 p-2">
            {i === 2 && (
              <>
                <div className="h-1 w-full bg-background/20 rounded mb-1" />
                <div className="h-1 w-3/4 bg-background/15 rounded mb-2" />
                <span className="text-[8px] bg-accent/30 text-accent px-1.5 py-0.5 rounded font-medium">Auto-Generated</span>
              </>
            )}
            {i !== 2 && <div className="h-10" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function AIAvatarMockup() {
  return (
    <div className="bg-foreground rounded-2xl border border-background/10 p-5 shadow-lg">
      <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center mb-3">
        <Video className="w-5 h-5 text-accent" />
      </div>
      <h4 className="font-heading text-sm font-semibold text-background mb-1">No-Recording Video Creation</h4>
      <p className="text-[11px] text-background/50 mb-4">Use your Doppelgänger to teach 24/7. Generate lessons from text.</p>
      <div className="flex items-center gap-3 p-3 rounded-xl bg-background/5 border border-background/10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 shrink-0" />
        <div className="flex-1 space-y-1.5">
          <div className="h-1.5 w-full bg-background/15 rounded" />
          <div className="h-1.5 w-3/4 bg-background/10 rounded" />
          <div className="flex items-center gap-1.5 mt-1">
            <div className="w-2 h-2 rounded-sm bg-accent" />
            <span className="text-[9px] text-accent">Generating voice...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AICopilotMockup() {
  return (
    <div className="bg-foreground rounded-2xl border border-background/10 p-5 shadow-lg">
      <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center mb-3">
        <Bot className="w-5 h-5 text-accent" />
      </div>
      <h4 className="font-heading text-sm font-semibold text-background mb-1">AI Learning Copilot</h4>
      <p className="text-[11px] text-background/50 mb-4">Your personal assistant for lesson plans, doubts, and parent comms. Trained on YOUR teaching style.</p>
      <div className="p-3 rounded-xl bg-background/5 border border-accent/20 font-mono space-y-1">
        <p className="text-[10px] text-accent/80">&gt; Generate lesson plan for Thermodynamics</p>
        <p className="text-[10px] text-background/40">... Analyzing your past lectures...</p>
        <p className="text-[10px] text-accent">✓ Plan ready. 3 Interactive points added.</p>
      </div>
    </div>
  );
}

function AIBlogMockup() {
  return (
    <div className="bg-secondary/30 rounded-2xl border border-border/50 p-8 text-center">
      <div className="w-12 h-12 rounded-xl bg-card border border-border/50 flex items-center justify-center mx-auto mb-4 shadow-sm">
        <FileText className="w-6 h-6 text-foreground" />
      </div>
      <h4 className="font-heading text-lg font-semibold text-foreground mb-2">Dominate Search with AI Blogs</h4>
      <p className="text-body-sm text-muted-foreground max-w-md mx-auto mb-4">
        Tell about your blog and enrich it with the help of AI. Share your thoughts with SEO-friendly content directly on your website.
      </p>
      <div className="inline-flex items-center gap-1.5 text-primary text-sm font-medium">
        <Search className="w-4 h-4" />
        See SEO Features
      </div>
    </div>
  );
}

function InteractiveVideoMockup() {
  return (
    <div className="bg-card rounded-2xl border border-border/50 p-5 shadow-lg">
      {/* Video player mockup */}
      <div className="relative bg-foreground rounded-xl overflow-hidden mb-4">
        <div className="aspect-video flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
            <Play className="w-7 h-7 text-primary ml-1" />
          </div>
        </div>
        {/* Overlay question */}
        <div className="absolute bottom-3 left-3 right-3 bg-card/95 backdrop-blur-md rounded-lg p-3 border border-primary/20">
          <p className="text-[10px] text-muted-foreground mb-1">Quick Check — 04:32</p>
          <p className="text-xs font-medium text-foreground mb-2">What happens to pressure when velocity increases?</p>
          <div className="flex gap-2">
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-md border border-primary/20">A) Increases</span>
            <span className="text-[10px] bg-accent/10 text-accent px-2 py-1 rounded-md border border-accent/20 font-semibold">B) Decreases ✓</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="font-heading text-lg font-bold text-foreground">94%</div>
          <div className="text-[9px] text-muted-foreground">Completion rate</div>
        </div>
        <div className="w-px h-8 bg-border" />
        <div className="text-center">
          <div className="font-heading text-lg font-bold text-foreground">3.2×</div>
          <div className="text-[9px] text-muted-foreground">More engagement</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Differentiator Sections (Full-Width Feature Blocks) ─── */

interface FeatureBlockProps {
  icon: React.ElementType;
  title: string;
  description: string;
  bullets: string[];
  mockup: React.ReactNode;
  reverse?: boolean;
  bgClass?: string;
}

function FeatureBlock({ icon: Icon, title, description, bullets, mockup, reverse, bgClass }: FeatureBlockProps) {
  return (
    <section className={bgClass || ""}>
      <div className="section-container py-20">
        <div className={`grid md:grid-cols-2 gap-12 items-center ${reverse ? "direction-rtl" : ""}`}>
          {/* Mockup */}
          <ScrollReveal direction={reverse ? "right" : "left"}>
            <div className={`${reverse ? "md:order-2" : ""}`}>
              {mockup}
            </div>
          </ScrollReveal>

          {/* Text */}
          <ScrollReveal direction={reverse ? "left" : "right"} delay={150}>
            <div className={`${reverse ? "md:order-1" : ""}`} style={{ direction: "ltr" }}>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-heading text-heading-1 text-foreground mb-4">{title}</h2>
              <p className="text-body-lg text-muted-foreground mb-6">{description}</p>
              <div className="space-y-3">
                {bullets.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <span className="text-body text-muted-foreground">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function DarkCardsSection({ cards }: { cards: { mockup: React.ReactNode }[] }) {
  return (
    <section className="bg-foreground py-20">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-8">
          {cards.map((card, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 150}>
              {card.mockup}
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Main Export ─── */

export function DifferentiatorTimeline() {
  return (
    <div>
      {/* Section Header */}
      <div className="section-container py-16">
        <ScrollReveal>
          <div className="text-center">
            <span className="badge-accent mb-4 inline-block">15 Reasons to Choose EdSetu</span>
            <h2 className="font-heading text-display-2 text-foreground mb-4">
              The <span className="gradient-text">Differentiator</span> Journey
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              Each feature is designed to solve a real problem faced by educators in India today.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Chapter 1: Transform Learning */}
      <ScrollReveal direction="scale">
        <div className="text-center mb-4 section-container">
          <span className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 rounded-full px-5 py-2 text-body-sm font-medium text-primary">Chapter 1</span>
          <h3 className="font-heading text-heading-2 text-foreground mt-2">Transform Learning</h3>
          <p className="text-body text-muted-foreground">Student-centric features that drive outcomes</p>
        </div>
      </ScrollReveal>

      {/* 1 - Student Centric */}
      <FeatureBlock
        icon={GraduationCap}
        title="Student-Centric Architecture."
        description="Most LMS platforms focus on content hosting. Ours focuses on learning outcomes. When students improve, your brand grows."
        bullets={[
          "Built around learning outcomes, not content dumps.",
          "Every feature designed to improve student results.",
          "Your brand reputation grows with student success.",
        ]}
        mockup={<InteractiveVideoMockup />}
      />

      {/* 2 - Interactive Video */}
      <FeatureBlock
        icon={Play}
        title="Transform Passive Videos into Active Learning."
        description="Your recorded lectures become interactive sessions. In-video overlays, embedded questions, and nudges ensure students think while watching."
        bullets={[
          "In-video questions and nudges at key moments.",
          "Higher retention. Higher engagement.",
          "Lower dropout rates across all batches.",
        ]}
        mockup={<InteractiveVideoMockup />}
        reverse
        bgClass="bg-secondary/20"
      />

      {/* 3 & 4 - Analytics & Insights */}
      <FeatureBlock
        icon={BarChart3}
        title="Diagnose, Don't Just Grade."
        description="Move from reactive teaching to data-driven decisions. Our deep analytics engine identifies not just what students got wrong, but why."
        bullets={[
          "Track time-per-question to spot hesitation.",
          "Identify underperforming batches instantly.",
          "Analyze accuracy vs. speed trends.",
        ]}
        mockup={<HesitationZonesMockup />}
      />

      {/* 5 & 6 - Revision & Timetable */}
      <FeatureBlock
        icon={RefreshCw}
        title="Structured Revision & Personalization."
        description="Students often fail due to poor planning, not lack of ability. EdSetu integrates a smart revision planner directly into their daily routine."
        bullets={[
          "Auto-generated revision schedules.",
          "Integration with student's daily timetable.",
          "Adaptive pacing based on learning speed.",
        ]}
        mockup={<CalendarMockup />}
        reverse
        bgClass="bg-secondary/20"
      />

      {/* Chapter 2: Empower Educators */}
      <div className="py-12">
        <ScrollReveal direction="scale">
          <div className="text-center section-container">
            <span className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 rounded-full px-5 py-2 text-body-sm font-medium text-primary">Chapter 2</span>
            <h3 className="font-heading text-heading-2 text-foreground mt-2">Empower Educators</h3>
            <p className="text-body text-muted-foreground">Tools that make teaching smarter, not harder</p>
          </div>
        </ScrollReveal>
      </div>

      {/* 7 & 8 - Communication & Engagement */}
      <FeatureBlock
        icon={MessageSquare}
        title="Intervene Before They Drop Out."
        description="Engagement monitoring detects drops in activity and test attempts. Communicate directly through the built-in messaging system to bring them back on track."
        bullets={[
          "Real-time disengagement alerts.",
          "Direct student-educator messaging.",
          "No WhatsApp clutter or lost doubts.",
        ]}
        mockup={<ChatMockup />}
      />

      {/* 9 & 10 - Brand & Learning OS */}
      <FeatureBlock
        icon={Layers}
        title="Your Brand, Elevated."
        description="Interactive video learning, analytics, and revision systems position you as technologically advanced, student-focused, and outcome-oriented."
        bullets={[
          "Full integrated learning ecosystem.",
          "Video, Assessment, Diagnostics, Revision — all in one.",
          "Stand out in a crowded market of generic LMS tools.",
        ]}
        mockup={
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Play, label: "Video" },
              { icon: BarChart3, label: "Analytics" },
              { icon: RefreshCw, label: "Revision" },
              { icon: Calendar, label: "Timetable" },
              { icon: MessageSquare, label: "Comms" },
              { icon: Activity, label: "Monitor" },
            ].map((item) => (
              <div key={item.label} className="bg-card rounded-xl border border-border/50 p-4 flex flex-col items-center gap-2 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-[11px] font-medium text-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        }
        reverse
        bgClass="bg-secondary/20"
      />

      {/* Chapter 3: Scale Your Impact */}
      <div className="py-12">
        <ScrollReveal direction="scale">
          <div className="text-center section-container">
            <span className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 rounded-full px-5 py-2 text-body-sm font-medium text-primary">Chapter 3</span>
            <h3 className="font-heading text-heading-2 text-foreground mt-2">Scale Your Impact</h3>
            <p className="text-body text-muted-foreground">AI-powered growth and automation tools</p>
          </div>
        </ScrollReveal>
      </div>

      {/* 11 & 12 - Canva + AI Websites (dark cards) */}
      <DarkCardsSection
        cards={[
          { mockup: <CanvaIntegrationMockup /> },
          { mockup: <AIWebsiteMockup /> },
        ]}
      />

      {/* 13 - AI Blog (light centered) */}
      <div className="section-container py-16">
        <ScrollReveal direction="up">
          <AIBlogMockup />
        </ScrollReveal>
      </div>

      {/* 14 & 15 - AI Avatar + AI Copilot (dark cards) */}
      <DarkCardsSection
        cards={[
          { mockup: <AIAvatarMockup /> },
          { mockup: <AICopilotMockup /> },
        ]}
      />
    </div>
  );
}