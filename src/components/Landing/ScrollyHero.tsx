import { useEffect, useState, useRef, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

function TypedText({ texts, className }: { texts: string[]; className?: string }) {
  const [displayed, setDisplayed] = useState("");
  const stateRef = useRef({ currentIndex: 0, isDeleting: false });
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const tick = useCallback(() => {
    const { currentIndex, isDeleting } = stateRef.current;
    const current = texts[currentIndex];

    setDisplayed((prev) => {
      if (!isDeleting && prev === current) {
        timerRef.current = setTimeout(() => {
          stateRef.current.isDeleting = true;
          tick();
        }, 2000);
        return prev;
      }

      if (isDeleting && prev === "") {
        stateRef.current.isDeleting = false;
        stateRef.current.currentIndex = (currentIndex + 1) % texts.length;
        timerRef.current = setTimeout(tick, 80);
        return prev;
      }

      const next = isDeleting
        ? current.slice(0, prev.length - 1)
        : current.slice(0, prev.length + 1);

      timerRef.current = setTimeout(tick, isDeleting ? 30 : 60);
      return next;
    });
  }, [texts]);

  useEffect(() => {
    tick();
    return () => clearTimeout(timerRef.current);
  }, [tick]);

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

const particles = [
  { size: 80, x: "10%", y: "20%", delay: 0, duration: 4 },
  { size: 40, x: "85%", y: "15%", delay: 1, duration: 5 },
  { size: 60, x: "75%", y: "65%", delay: 0.5, duration: 3.5 },
  { size: 30, x: "15%", y: "75%", delay: 1.5, duration: 4.5 },
  { size: 20, x: "90%", y: "40%", delay: 0.8, duration: 5.5 },
];

export function ScrollyHero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, hsl(var(--primary) / 0.15) 0%, transparent 70%),
                       radial-gradient(ellipse at 70% 30%, hsl(var(--accent) / 0.1) 0%, transparent 60%)`,
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}

      {/* Hero content */}
      <div className="section-container relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div className={`transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-body-sm font-medium text-primary">
                Launching 1st May 2026
              </span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-display-1 mb-6">
              <span className="text-muted-foreground line-through decoration-destructive/50 decoration-2">
                Not an LMS.
              </span>{" "}
              <br />
              <span className="gradient-text">A Learning Operating System.</span>
            </h1>

            <p className="text-body-lg text-muted-foreground mb-4 min-h-[3rem]">
              <TypedText
                texts={[
                  "Transform passive videos into active learning",
                  "Deep analytics beyond just marks",
                  "AI-powered teaching copilot for educators",
                  "Built for serious educators who want results",
                ]}
              />
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button size="xl" className="rounded-xl btn-glow" asChild>
                <a href="#waitlist">
                  Join the Waitlist 🚀
                </a>
              </Button>
              <Button variant="outline" size="xl" className="rounded-xl" asChild>
                <a href="#newsletter">
                  Get Webinar Updates
                </a>
              </Button>
            </div>
          </div>

          {/* Hero visual - abstract gradient shapes */}
          <div className={`transition-all duration-1000 delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="relative w-full max-w-lg mx-auto aspect-square">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 animate-float" style={{ animationDuration: "5s" }} />
              <div className="absolute inset-8 rounded-2xl bg-gradient-to-tr from-accent/15 to-primary/10 animate-float" style={{ animationDuration: "7s", animationDelay: "1s" }} />
              <div className="absolute inset-16 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50 shadow-xl flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="font-heading text-4xl font-bold gradient-text mb-2">EdSetu</div>
                  <div className="text-body-sm text-muted-foreground">Learning Operating System</div>
                </div>
              </div>
            </div>
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
