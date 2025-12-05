import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MegaMenu } from "./MegaMenu";
import { AuthButtons } from "./AuthButtons";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Products", href: "/products", hasMegaMenu: true },
  { label: "Pricing", href: "/pricing" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMegaMenu(null);
  }, [location.pathname]);

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
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="EdSetu" className="w-10 h-10 rounded-xl" />
            <span className="font-heading text-2xl font-bold text-foreground">
              EdSetu
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.hasMegaMenu && setActiveMegaMenu(item.label)
                }
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  to={item.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                    location.pathname === item.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {item.label}
                </Link>
                {item.hasMegaMenu && activeMegaMenu === item.label && (
                  <MegaMenu />
                )}
              </div>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <AuthButtons />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border animate-slide-down">
          <div className="section-container py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                  location.pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border space-y-2">
              <AuthButtons mobile />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
