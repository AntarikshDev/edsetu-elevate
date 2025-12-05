import { Link } from "react-router-dom";
import {
  BookOpen,
  Video,
  Users,
  ShoppingBag,
  MessageCircle,
  Bot,
  FileText,
  Award,
  BarChart3,
  Shield,
  Zap,
  Globe,
} from "lucide-react";

const products = [
  {
    title: "Courses",
    description: "Create and sell online courses with ease",
    icon: BookOpen,
    href: "/products/courses",
  },
  {
    title: "Webinars",
    description: "Host live webinars and workshops",
    icon: Video,
    href: "/products/webinars",
  },
  {
    title: "Memberships",
    description: "Build recurring revenue with memberships",
    icon: Users,
    href: "/products/memberships",
  },
  {
    title: "Digital Products",
    description: "Sell ebooks, templates, and more",
    icon: ShoppingBag,
    href: "/products/digital-products",
  },
  {
    title: "Telegram Communities",
    description: "Manage paid Telegram groups",
    icon: MessageCircle,
    href: "/products/telegram",
  },
  {
    title: "AI Avatar",
    description: "AI-powered video creation tools",
    icon: Bot,
    href: "/products/ai-avatar",
  },
];

const features = [
  { title: "Course Builder", icon: FileText, href: "/features/course-builder" },
  { title: "Certifications", icon: Award, href: "/features/certifications" },
  { title: "Analytics", icon: BarChart3, href: "/features/analytics" },
  { title: "White Label", icon: Globe, href: "/features/white-label" },
  { title: "Integrations", icon: Zap, href: "/features/integrations" },
  { title: "Security", icon: Shield, href: "/features/security" },
];

export function MegaMenu() {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[800px]">
      <div className="mega-menu p-6 animate-scale-in">
        <div className="grid grid-cols-2 gap-8">
          {/* Products Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              Products
            </h3>
            <div className="space-y-1">
              {products.map((product) => (
                <Link
                  key={product.title}
                  to={product.href}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <product.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {product.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {product.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Features Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              Features
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {features.map((feature) => (
                <Link
                  key={feature.title}
                  to={feature.href}
                  className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors group"
                >
                  <feature.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </span>
                </Link>
              ))}
            </div>

            {/* CTA Card */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
              <h4 className="font-semibold text-foreground mb-1">
                Ready to get started?
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Launch your knowledge business in minutes.
              </p>
              <Link
                to="/pricing"
                className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                View pricing →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
