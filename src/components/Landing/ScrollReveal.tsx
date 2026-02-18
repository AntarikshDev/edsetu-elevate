import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type Direction = "up" | "down" | "left" | "right" | "scale";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

const directionStyles: Record<Direction, { hidden: string; visible: string }> = {
  up: {
    hidden: "translate-y-10 opacity-0",
    visible: "translate-y-0 opacity-100",
  },
  down: {
    hidden: "-translate-y-10 opacity-0",
    visible: "translate-y-0 opacity-100",
  },
  left: {
    hidden: "-translate-x-16 opacity-0",
    visible: "translate-x-0 opacity-100",
  },
  right: {
    hidden: "translate-x-16 opacity-0",
    visible: "translate-x-0 opacity-100",
  },
  scale: {
    hidden: "scale-90 opacity-0",
    visible: "scale-100 opacity-100",
  },
};

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  className,
  threshold = 0.15,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold });
  const styles = directionStyles[direction];

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all will-change-transform",
        isVisible ? styles.visible : styles.hidden,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}
