import { useEffect, useState, useRef } from "react";
import { ChevronDown, Users, GraduationCap, TrendingUp, Star } from "lucide-react";
import { useParallax } from "@/hooks/useScrollAnimation";

function TypedText({ texts, className }: { texts: string[]; className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[currentIndex];
    const speed = isDeleting ? 30 : 60;

    if (!isDeleting && displayed === current) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayed(
        isDeleting ? current.slice(0, displayed.length - 1) : current.slice(0, displayed.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, currentIndex, texts]);

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

function FloatingParticle({ size, x, y, delay, duration }: { size: number; x: string; y: string; delay: number; duration: number }) {
  return (
    <div
      className="absolute rounded-full bg-primary/10 animate-float"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  );
}

const stats = [
  { icon: Users, value: "50,000+", label: "Educators" },
  { icon: GraduationCap, value: "10M+", label: "Students" },
  { icon: TrendingUp, value: "95%", label: "Retention" },
  { icon: Star, value: "4.9/5", label: "Rating" },
];

const particles = [
  { size: 80, x: "10%", y: "20%", delay: 0, duration: 4 },
  { size: 40, x: "80%", y: "15%", delay: 1, duration: 5 },
  { size: 60, x: "70%", y: "60%", delay: 0.5, duration: 3.5 },
  { size: 30, x: "20%", y: "70%", delay: 1.5, duration: 4.5 },
  { size: 50, x: "50%", y: "80%", delay: 2, duration: 3 },
  { size: 20, x: "90%", y: "40%", delay: 0.8, duration: 5.5 },
  { size: 35, x: "5%", y: "50%", delay: 1.2, duration: 4.2 },
];

export function ScrollyHero() {
  const { ref, offset } = useParallax();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, hsl(var(--primary) / 0.15) 0%, transparent 70%),
                       radial-gradient(ellipse at 70% 30%, hsl(var(--accent) / 0.1) 0%, transparent 60%)`,
          transform: `translateY(${offset * 40}px)`,
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}

      {/* Hero content */}
      <div className="section-container relative z-10 text-center">
        <div
          className={`transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-body-sm font-medium text-primary">
              India's #1 Learning Operating System
            </span>
          </div>
        </div>

        <h1
          className={`font-heading text-4xl sm:text-5xl md:text-display-1 max-w-5xl mx-auto mb-6 transition-all duration-1000 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="text-muted-foreground line-through decoration-destructive/50 decoration-2">
            Not an LMS.
          </span>{" "}
          <br className="hidden sm:block" />
          <span className="gradient-text">A Learning Operating System.</span>
        </h1>

        <p
          className={`text-body-lg text-muted-foreground max-w-2xl mx-auto mb-4 transition-all duration-1000 delay-400 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <TypedText
            texts={[
              "Transform passive videos into active learning",
              "Deep analytics beyond just marks",
              "AI-powered teaching copilot for educators",
              "Built for serious educators who want results",
            ]}
          />
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center mt-10 transition-all duration-1000 delay-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <a
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-xl text-lg hover:opacity-90 transition-opacity btn-glow"
          >
            Start Free Trial
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 border border-border text-foreground font-semibold px-8 py-4 rounded-xl text-lg hover:bg-secondary transition-colors"
          >
            Book a Demo
          </a>
        </div>
      </div>

      {/* Stats bar */}
      <div
        className={`absolute bottom-20 left-0 right-0 z-10 transition-all duration-1000 delay-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="section-container">
          <div className="glass-card px-6 py-5 flex flex-wrap justify-center gap-8 md:gap-16">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <stat.icon className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-heading font-bold text-lg text-foreground">{stat.value}</div>
                  <div className="text-body-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
}
