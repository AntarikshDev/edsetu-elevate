import { Link } from "react-router-dom";
import {
  BookOpen,
  Video,
  Users,
  ShoppingBag,
  MessageCircle,
  Bot,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import coursesImage from "@/assets/courses-illustration.png";
import webinarImage from "@/assets/webinar-illustration.png";

const features = [
  {
    icon: BookOpen,
    title: "Online Courses",
    description: "Create stunning courses with video, quizzes, assignments, and certifications. Drip content and track student progress.",
    href: "/products/courses",
    color: "bg-violet-500",
  },
  {
    icon: Video,
    title: "Live Webinars",
    description: "Host interactive live sessions with HD video, screen sharing, and real-time Q&A. Automatic recordings included.",
    href: "/products/webinars",
    color: "bg-cyan-500",
  },
  {
    icon: Users,
    title: "Memberships",
    description: "Build recurring revenue with exclusive membership tiers. Offer premium content and community access.",
    href: "/products/memberships",
    color: "bg-pink-500",
  },
  {
    icon: ShoppingBag,
    title: "Digital Products",
    description: "Sell ebooks, templates, presets, and downloadable resources. Instant delivery with secure file hosting.",
    href: "/products/digital-products",
    color: "bg-amber-500",
  },
  {
    icon: MessageCircle,
    title: "Telegram Communities",
    description: "Monetize your Telegram groups with paid access. Automatic member management and payments.",
    href: "/products/telegram",
    color: "bg-blue-500",
  },
  {
    icon: Bot,
    title: "AI Avatar",
    description: "Create professional videos with AI avatars. No camera or studio needed. Perfect for course content.",
    href: "/products/ai-avatar",
    color: "bg-emerald-500",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="badge-primary mb-4 inline-block">Products</span>
          <h2 className="font-heading text-display-2 text-foreground mb-4">
            Everything You Need to{" "}
            <span className="gradient-text">Monetize Knowledge</span>
          </h2>
          <p className="text-body-lg text-muted-foreground">
            From courses to communities, we've got all the tools you need to create, 
            sell, and scale your knowledge business.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Link
              key={feature.title}
              to={feature.href}
              className="group premium-card p-6 flex flex-col"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-heading-4 text-foreground mb-2 font-heading group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm flex-1">
                {feature.description}
              </p>
              <div className="mt-4 flex items-center text-primary text-sm font-semibold group-hover:gap-3 gap-2 transition-all">
                Learn more
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Product Showcase */}
        <div className="grid lg:grid-cols-2 gap-8 mt-24">
          {/* Courses Showcase */}
          <div className="premium-card p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <span className="badge-accent mb-4 inline-block">Most Popular</span>
              <h3 className="font-heading text-heading-2 text-foreground mb-4">
                Powerful Course Builder
              </h3>
              <p className="text-muted-foreground mb-6">
                Create engaging courses with our drag-and-drop builder. Add videos, 
                quizzes, assignments, and more. Issue certificates automatically.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Drag-and-drop curriculum builder",
                  "Video hosting with HLS streaming",
                  "Automated certificates",
                  "Student progress tracking",
                  "Drip content scheduling",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button variant="hero" asChild>
              <Link to="/products/courses">
                Explore Courses
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Webinars Showcase */}
          <div className="premium-card overflow-hidden">
            <img
              src={webinarImage}
              alt="Live webinars and workshops illustration"
              className="w-full h-64 object-contain bg-gradient-to-br from-secondary to-muted p-4"
            />
            <div className="p-8">
              <span className="badge-primary mb-4 inline-block">Live & Interactive</span>
              <h3 className="font-heading text-heading-2 text-foreground mb-4">
                Live Webinars & Workshops
              </h3>
              <p className="text-muted-foreground mb-6">
                Host live sessions with HD video, screen sharing, chat, and Q&A. 
                Engage your audience in real-time and convert viewers to customers.
              </p>
              <Button variant="outline" asChild>
                <Link to="/products/webinars">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
