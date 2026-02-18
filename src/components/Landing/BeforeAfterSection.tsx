import {
  BookOpen, Clock, MessageCircle, BarChart3, Eye, Users,
  Video, Brain, TrendingUp, Zap, Smartphone, Target,
} from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import clipartTransformation from "@/assets/clipart-transformation.png";

const oldWay = [
  { icon: BookOpen, text: "Static content dumps", detail: "Upload PDFs, hope students read them" },
  { icon: Clock, text: "No revision structure", detail: "Students cram before exams, forget after" },
  { icon: MessageCircle, text: "WhatsApp chaos", detail: "Doubts scattered across groups, lost forever" },
  { icon: BarChart3, text: "Marks-only analytics", detail: "You see scores but never understand gaps" },
  { icon: Eye, text: "Zero engagement tracking", detail: "You discover dropouts after they've left" },
];

const newWay = [
  { icon: Video, text: "Interactive video learning", detail: "In-video questions, nudges, active participation" },
  { icon: Brain, text: "Automated revision planner", detail: "System structures revision, students retain more" },
  { icon: Smartphone, text: "Built-in messaging", detail: "Structured, trackable, inside your LMS" },
  { icon: TrendingUp, text: "Deep learning analytics", detail: "Time per question, hesitation zones, behavior patterns" },
  { icon: Target, text: "Proactive engagement alerts", detail: "Detect drops before disengagement happens" },
];

const comparisons = [
  { label: "Student Engagement", old: 25, new: 92 },
  { label: "Content Retention", old: 30, new: 88 },
  { label: "Educator Efficiency", old: 40, new: 95 },
];

export function BeforeAfterSection() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="badge-primary mb-4 inline-block">The Transformation</span>
            <h2 className="font-heading text-display-2 text-foreground mb-4">
              From Ordinary LMS to{" "}
              <span className="gradient-text">Learning Operating System</span>
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              See how EdSetu fundamentally changes the way educators teach and students learn.
            </p>
          </div>
        </ScrollReveal>

        {/* Clipart between heading and content */}
        <ScrollReveal direction="scale">
          <div className="flex justify-center mb-12">
            <img
              src={clipartTransformation}
              alt="From traditional to digital learning"
              className="w-full max-w-md drop-shadow-lg"
            />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Old Way */}
          <ScrollReveal direction="left">
            <div className="rounded-2xl border border-destructive/20 bg-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <span className="text-destructive font-bold">✕</span>
                </div>
                <h3 className="font-heading text-heading-3 text-foreground">The Old Way</h3>
              </div>
              <div className="space-y-4">
                {oldWay.map((item) => (
                  <div key={item.text} className="flex items-start gap-3 p-3 rounded-xl bg-destructive/5">
                    <item.icon className="w-5 h-5 text-destructive/60 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium text-foreground">{item.text}</div>
                      <div className="text-body-sm text-muted-foreground">{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* New Way */}
          <ScrollReveal direction="right">
            <div className="rounded-2xl border border-accent/30 bg-card p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />
              <div className="flex items-center gap-3 mb-6 relative">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-heading text-heading-3 text-foreground">The EdSetu Way</h3>
              </div>
              <div className="space-y-4 relative">
                {newWay.map((item) => (
                  <div key={item.text} className="flex items-start gap-3 p-3 rounded-xl bg-accent/5">
                    <item.icon className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium text-foreground">{item.text}</div>
                      <div className="text-body-sm text-muted-foreground">{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Comparison bars */}
        <ScrollReveal direction="up" delay={200}>
          <div className="glass-card p-8 max-w-3xl mx-auto">
            <h3 className="font-heading text-heading-4 text-foreground mb-6 text-center">
              The Numbers Speak
            </h3>
            <div className="space-y-6">
              {comparisons.map((c) => (
                <div key={c.label}>
                  <div className="flex justify-between text-body-sm mb-2">
                    <span className="font-medium text-foreground">{c.label}</span>
                    <span className="text-muted-foreground">
                      <span className="text-destructive/70">{c.old}%</span>
                      {" → "}
                      <span className="text-accent font-semibold">{c.new}%</span>
                    </span>
                  </div>
                  <div className="relative h-3 rounded-full bg-muted overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-destructive/30"
                      style={{ width: `${c.old}%` }}
                    />
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
                      style={{ width: `${c.new}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
