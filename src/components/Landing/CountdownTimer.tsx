import { useEffect, useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

const LAUNCH_DATE = new Date("2026-05-01T00:00:00+05:30").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const now = Date.now();
  const diff = Math.max(0, LAUNCH_DATE - now);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="countdown-digit p-3 sm:p-5">
      <span className="font-heading text-3xl sm:text-5xl font-extrabold gradient-text tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-body-sm text-muted-foreground mt-1 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer() {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-20 bg-secondary/30">
      <div className="section-container text-center">
        <ScrollReveal>
          <span className="badge-accent mb-4 inline-block">Launching 1st May 2026</span>
          <h2 className="font-heading text-display-2 text-foreground mb-2">
            The Countdown Has <span className="gradient-text">Begun</span>
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-xl mx-auto mb-10">
            India's first Learning Operating System is almost here. Be among the first to experience the future of education.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={200}>
          <div className="flex justify-center gap-3 sm:gap-5">
            <Digit value={time.days} label="Days" />
            <div className="flex items-center text-2xl font-heading font-bold text-primary self-start pt-5">:</div>
            <Digit value={time.hours} label="Hours" />
            <div className="flex items-center text-2xl font-heading font-bold text-primary self-start pt-5">:</div>
            <Digit value={time.minutes} label="Min" />
            <div className="flex items-center text-2xl font-heading font-bold text-primary self-start pt-5">:</div>
            <Digit value={time.seconds} label="Sec" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
