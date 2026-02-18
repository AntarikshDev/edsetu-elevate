import { Users, GraduationCap, TrendingUp, Star } from "lucide-react";
import { useScrollAnimation, useCountUp } from "@/hooks/useScrollAnimation";

const counters = [
  { icon: Users, target: 50000, suffix: "+", label: "Educators", prefix: "" },
  { icon: GraduationCap, target: 10, suffix: "M+", label: "Students Impacted", prefix: "" },
  { icon: TrendingUp, target: 95, suffix: "%", label: "Retention Rate", prefix: "" },
  { icon: Star, target: 49, suffix: "/5", label: "Average Rating", prefix: "", decimalize: true },
];

export function AnimatedCounter() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-violet-600 to-primary" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-3xl" style={{ background: "hsl(var(--accent) / 0.5)" }} />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl" style={{ background: "hsl(var(--violet-300) / 0.5)" }} />
      </div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {counters.map((c) => (
            <CounterItem key={c.label} {...c} isActive={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CounterItem({
  icon: Icon,
  target,
  suffix,
  label,
  prefix,
  isActive,
  decimalize,
}: {
  icon: React.ElementType;
  target: number;
  suffix: string;
  label: string;
  prefix: string;
  isActive: boolean;
  decimalize?: boolean;
}) {
  const count = useCountUp(target, 2500, isActive);
  const displayValue = decimalize ? (count / 10).toFixed(1) : count.toLocaleString();

  return (
    <div className="text-center">
      <Icon className="w-8 h-8 text-primary-foreground/80 mx-auto mb-3" />
      <div className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground">
        {prefix}{displayValue}{suffix}
      </div>
      <div className="text-body-sm text-primary-foreground/70 mt-1">{label}</div>
    </div>
  );
}
