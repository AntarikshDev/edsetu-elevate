import { Link } from "react-router-dom";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Video,
  Users,
  ShoppingBag,
  MessageCircle,
  Bot,
  ArrowRight,
  Check,
} from "lucide-react";
import coursesImage from "@/assets/courses-illustration.png";
import webinarImage from "@/assets/webinar-illustration.png";

const products = [
  {
    id: "courses",
    icon: BookOpen,
    title: "Online Courses",
    description: "Create stunning courses with video, quizzes, assignments, and certifications. The most comprehensive course builder on the market.",
    color: "bg-violet-500",
    features: [
      "Drag-and-drop curriculum builder",
      "HD video hosting with HLS streaming",
      "Interactive quizzes and assignments",
      "Automated certificates",
      "Drip content scheduling",
      "Student progress tracking",
    ],
    image: coursesImage,
    href: "/products/courses",
  },
  {
    id: "webinars",
    icon: Video,
    title: "Live Webinars",
    description: "Host interactive live sessions with HD video, screen sharing, chat, and Q&A. Perfect for workshops and live training.",
    color: "bg-cyan-500",
    features: [
      "HD video and audio",
      "Screen sharing",
      "Live chat and Q&A",
      "Automatic recordings",
      "Paid webinar tickets",
      "Replay access",
    ],
    image: webinarImage,
    href: "/products/webinars",
  },
  {
    id: "memberships",
    icon: Users,
    title: "Memberships",
    description: "Build recurring revenue with exclusive membership tiers. Offer premium content, community access, and special perks.",
    color: "bg-pink-500",
    features: [
      "Multiple membership tiers",
      "Recurring billing",
      "Exclusive content areas",
      "Community forums",
      "Member directories",
      "Cancellation management",
    ],
    href: "/products/memberships",
  },
  {
    id: "digital-products",
    icon: ShoppingBag,
    title: "Digital Products",
    description: "Sell ebooks, templates, presets, spreadsheets, and any downloadable content. Instant delivery with secure hosting.",
    color: "bg-amber-500",
    features: [
      "Unlimited file uploads",
      "Secure file hosting",
      "Instant delivery",
      "Download tracking",
      "License key generation",
      "Product bundles",
    ],
    href: "/products/digital-products",
  },
  {
    id: "telegram",
    icon: MessageCircle,
    title: "Telegram Communities",
    description: "Monetize your Telegram groups and channels with paid access. Automatic member management and payments.",
    color: "bg-blue-500",
    features: [
      "Paid Telegram access",
      "Automatic member management",
      "Subscription billing",
      "Multiple group support",
      "Member analytics",
      "Invite link management",
    ],
    href: "/products/telegram",
  },
  {
    id: "ai-avatar",
    icon: Bot,
    title: "AI Avatar",
    description: "Create professional videos with AI avatars. No camera or studio needed. Perfect for course content and marketing.",
    color: "bg-emerald-500",
    features: [
      "Realistic AI avatars",
      "Multiple languages",
      "Custom scripts",
      "Quick video generation",
      "No camera needed",
      "Commercial usage rights",
    ],
    href: "/products/ai-avatar",
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 hero-gradient">
          <div className="section-container text-center max-w-4xl mx-auto">
            <span className="badge-primary mb-4 inline-block">Products</span>
            <h1 className="font-heading text-display-1 text-foreground mb-6">
              Everything to <span className="gradient-text">Monetize Knowledge</span>
            </h1>
            <p className="text-body-lg text-muted-foreground mb-8">
              From courses to communities, EdSetu gives you all the tools you need 
              to create, sell, and scale your knowledge business.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/pricing">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Products List */}
        <section className="py-24">
          <div className="section-container">
            <div className="space-y-32">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className={`flex flex-col ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                  } gap-12 lg:gap-16 items-center`}
                >
                  {/* Content */}
                  <div className="lg:w-1/2">
                    <div
                      className={`w-16 h-16 rounded-2xl ${product.color} flex items-center justify-center mb-6`}
                    >
                      <product.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h2 className="font-heading text-heading-1 text-foreground mb-4">
                      {product.title}
                    </h2>
                    <p className="text-body-lg text-muted-foreground mb-8">
                      {product.description}
                    </p>
                    <ul className="grid grid-cols-2 gap-3 mb-8">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-accent" />
                          </div>
                          <span className="text-sm text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" size="lg" asChild>
                      <Link to={product.href}>
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>

                  {/* Image */}
                  <div className="lg:w-1/2">
                    <div className="premium-card overflow-hidden">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={`${product.title} illustration`}
                          className="w-full h-80 object-contain bg-gradient-to-br from-secondary to-muted p-8"
                        />
                      ) : (
                        <div className="w-full h-80 bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                          <product.icon className="w-24 h-24 text-primary/20" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-br from-primary to-violet-600">
          <div className="section-container text-center">
            <h2 className="font-heading text-heading-1 text-primary-foreground mb-4">
              Ready to Start Creating?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join 50,000+ creators and start building your knowledge business today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="glass"
                size="xl"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                asChild
              >
                <Link to="/pricing">Get Started Free</Link>
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link to="/contact">Talk to Sales</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
