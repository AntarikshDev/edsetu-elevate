import { Link } from "react-router-dom";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  BookOpen,
  Video,
  FileText,
  HelpCircle,
  ArrowRight,
  Clock,
  User,
} from "lucide-react";

const categories = [
  { icon: BookOpen, name: "Getting Started", count: 12, href: "/resources/getting-started" },
  { icon: Video, name: "Video Tutorials", count: 24, href: "/resources/tutorials" },
  { icon: FileText, name: "Guides & Articles", count: 36, href: "/resources/guides" },
  { icon: HelpCircle, name: "FAQs", count: 18, href: "/resources/faqs" },
];

const featuredArticles = [
  {
    id: 1,
    title: "Complete Guide to Creating Your First Course",
    excerpt: "Learn everything you need to know about creating, launching, and marketing your first online course on EdSetu.",
    category: "Getting Started",
    author: "EdSetu Team",
    readTime: "15 min read",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop",
    href: "/resources/first-course-guide",
  },
  {
    id: 2,
    title: "10 Strategies to Increase Course Sales",
    excerpt: "Proven marketing strategies that successful creators use to boost their course sales and grow their audience.",
    category: "Marketing",
    author: "Priya Sharma",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
    href: "/resources/increase-sales",
  },
  {
    id: 3,
    title: "How to Host Engaging Live Webinars",
    excerpt: "Master the art of live webinars with tips on engagement, technical setup, and converting attendees to customers.",
    category: "Webinars",
    author: "Rahul Verma",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=200&fit=crop",
    href: "/resources/engaging-webinars",
  },
];

const latestArticles = [
  {
    title: "Setting Up Payment Methods",
    category: "Payments",
    readTime: "5 min",
    href: "/resources/payment-setup",
  },
  {
    title: "Using Analytics to Grow Your Business",
    category: "Analytics",
    readTime: "8 min",
    href: "/resources/analytics-guide",
  },
  {
    title: "Custom Domain Setup Guide",
    category: "Technical",
    readTime: "6 min",
    href: "/resources/custom-domain",
  },
  {
    title: "Building Your Email List",
    category: "Marketing",
    readTime: "10 min",
    href: "/resources/email-list",
  },
  {
    title: "Student Engagement Best Practices",
    category: "Teaching",
    readTime: "7 min",
    href: "/resources/student-engagement",
  },
  {
    title: "Pricing Your Courses Right",
    category: "Strategy",
    readTime: "9 min",
    href: "/resources/pricing-strategy",
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 hero-gradient">
          <div className="section-container text-center max-w-3xl mx-auto">
            <span className="badge-primary mb-4 inline-block">Resources</span>
            <h1 className="font-heading text-display-1 text-foreground mb-4">
              Knowledge <span className="gradient-text">Base</span>
            </h1>
            <p className="text-body-lg text-muted-foreground mb-8">
              Everything you need to succeed with EdSetu. Guides, tutorials, 
              and best practices from our team and community.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles, guides, and tutorials..."
                className="h-14 pl-12 pr-4 rounded-2xl text-base"
              />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 border-b border-border">
          <div className="section-container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.href}
                  className="premium-card p-6 flex items-center gap-4 hover:border-primary/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} articles</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-16">
          <div className="section-container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading text-heading-2 text-foreground">
                Featured Articles
              </h2>
              <Button variant="ghost" asChild>
                <Link to="/resources/all">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <Link
                  key={article.id}
                  to={article.href}
                  className="premium-card overflow-hidden group"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {article.category}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-foreground mt-2 mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {article.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Articles */}
        <section className="py-16 bg-muted/30">
          <div className="section-container">
            <h2 className="font-heading text-heading-2 text-foreground mb-8">
              Latest Articles
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {latestArticles.map((article) => (
                <Link
                  key={article.title}
                  to={article.href}
                  className="premium-card p-5 flex items-center justify-between group"
                >
                  <div>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {article.category}
                    </span>
                    <h3 className="font-medium text-foreground mt-1 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Help CTA */}
        <section className="py-16">
          <div className="section-container">
            <div className="premium-card p-8 lg:p-12 text-center max-w-3xl mx-auto">
              <h2 className="font-heading text-heading-2 text-foreground mb-4">
                Can't find what you're looking for?
              </h2>
              <p className="text-muted-foreground mb-6">
                Our support team is here to help. Reach out and we'll get back 
                to you within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" asChild>
                  <Link to="/contact">Contact Support</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/resources/faqs">Browse FAQs</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
