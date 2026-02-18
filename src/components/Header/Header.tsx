import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-card/80 backdrop-blur-xl shadow-lg border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <div className="section-container">
        <nav className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="EdSetu" className="w-10 h-10 rounded-xl" />
            <span className="font-heading text-2xl font-bold text-foreground">
              EdSetu
            </span>
          </Link>

          <Button variant="default" size="sm" className="rounded-full" asChild>
            <a href="#waitlist">Join the Waitlist 🚀</a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
