import { useParallax } from "@/hooks/useScrollAnimation";

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxSection({ children, speed = 0.3, className }: ParallaxSectionProps) {
  const { ref, offset } = useParallax();
  const translateY = (offset - 0.5) * speed * 100;

  return (
    <div ref={ref} className={`relative overflow-hidden ${className || ""}`}>
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${translateY}px)`, willChange: "transform" }}
      >
        {/* parallax background blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
