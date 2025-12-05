import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Twitter, Linkedin, Youtube, Instagram, Facebook } from "lucide-react";

const footerLinks = {
  products: {
    title: "Products",
    links: [
      { label: "Courses", href: "/products/courses" },
      { label: "Webinars", href: "/products/webinars" },
      { label: "Memberships", href: "/products/memberships" },
      { label: "Digital Products", href: "/products/digital-products" },
      { label: "Telegram Communities", href: "/products/telegram" },
      { label: "AI Avatar", href: "/products/ai-avatar" },
    ],
  },
  reachUs: {
    title: "Reach Us",
    links: [
      { label: "Contact Sales", href: "/contact" },
      { label: "Support Center", href: "/support" },
      { label: "Feature Request", href: "/feature-request" },
      { label: "Report a Bug", href: "/report-bug" },
      { label: "Partner Program", href: "/partners" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Knowledge Base", href: "/resources" },
      { label: "Case Studies", href: "/testimonials" },
      { label: "Webinar Archive", href: "/resources/webinars" },
      { label: "API Documentation", href: "/resources/api" },
      { label: "System Status", href: "/status" },
    ],
  },
  alternatives: {
    title: "Compare",
    links: [
      { label: "vs Teachable", href: "/compare/teachable" },
      { label: "vs Thinkific", href: "/compare/thinkific" },
      { label: "vs Kajabi", href: "/compare/kajabi" },
      { label: "vs Graphy", href: "/compare/graphy" },
      { label: "vs LearnWorlds", href: "/compare/learnworlds" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "GDPR", href: "/gdpr" },
      { label: "Refund Policy", href: "/refunds" },
    ],
  },
};

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/edsetu", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/edsetu", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/edsetu", label: "YouTube" },
  { icon: Instagram, href: "https://instagram.com/edsetu", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com/edsetu", label: "Facebook" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="section-container py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold font-heading mb-2">
                Get product updates & learning tips
              </h3>
              <p className="text-background/70">
                No spam. Unsubscribe anytime.
              </p>
            </div>
            <div className="flex gap-3 max-w-md w-full">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 rounded-xl bg-background/10 border-background/20 text-background placeholder:text-background/50 flex-1"
              />
              <Button variant="accent" size="lg" className="rounded-xl">
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="section-container py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">E</span>
              </div>
              <span className="font-heading text-2xl font-bold">EdSetu</span>
            </Link>
            <p className="text-background/70 text-sm mb-6">
              Empowering educators and creators to build, launch, and scale their knowledge business.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-background/70 hover:text-background transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="section-container py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-background/50">
              © {new Date().getFullYear()} EdSetu. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link
                to="/privacy"
                className="text-sm text-background/50 hover:text-background transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-background/50 hover:text-background transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/cookies"
                className="text-sm text-background/50 hover:text-background transition-colors"
              >
                Cookies
              </Link>
              <Link
                to="/sitemap"
                className="text-sm text-background/50 hover:text-background transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
