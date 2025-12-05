import { Link } from "react-router-dom";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Clock, User, ArrowRight, Tag } from "lucide-react";

const featuredPost = {
  id: 1,
  title: "The Future of Online Education: Trends to Watch in 2024",
  excerpt: "As we look ahead, online education continues to evolve rapidly. From AI-powered personalization to immersive learning experiences, here are the key trends shaping the future of digital learning.",
  category: "Industry Insights",
  author: "EdSetu Editorial",
  date: "Dec 1, 2024",
  readTime: "8 min read",
  image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=400&fit=crop",
  href: "/blog/future-online-education-2024",
};

const blogPosts = [
  {
    id: 2,
    title: "How to Price Your Online Course: A Complete Guide",
    excerpt: "Finding the right price for your course can make or break your success. Learn the strategies top creators use.",
    category: "Creator Tips",
    author: "Priya Mehta",
    date: "Nov 28, 2024",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop",
    href: "/blog/pricing-guide",
  },
  {
    id: 3,
    title: "Building a Community Around Your Courses",
    excerpt: "Discover how successful educators create thriving communities that boost engagement and retention.",
    category: "Growth",
    author: "Rahul Verma",
    date: "Nov 25, 2024",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=200&fit=crop",
    href: "/blog/building-community",
  },
  {
    id: 4,
    title: "From Teacher to Entrepreneur: Making the Transition",
    excerpt: "A step-by-step guide for educators looking to build a business around their expertise.",
    category: "Creator Stories",
    author: "Sneha Patel",
    date: "Nov 22, 2024",
    readTime: "15 min read",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=200&fit=crop",
    href: "/blog/teacher-to-entrepreneur",
  },
  {
    id: 5,
    title: "The Psychology of Student Engagement",
    excerpt: "Understanding what makes students stick with your courses and come back for more.",
    category: "Teaching",
    author: "Dr. Amit Kumar",
    date: "Nov 19, 2024",
    readTime: "11 min read",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop",
    href: "/blog/student-engagement-psychology",
  },
  {
    id: 6,
    title: "Marketing Your Course on Social Media",
    excerpt: "Effective social media strategies to reach your target audience and drive enrollments.",
    category: "Marketing",
    author: "Ananya Reddy",
    date: "Nov 16, 2024",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=200&fit=crop",
    href: "/blog/social-media-marketing",
  },
  {
    id: 7,
    title: "Creating Video Content That Converts",
    excerpt: "Tips and techniques for producing professional-quality course videos that keep students engaged.",
    category: "Content Creation",
    author: "Vikram Singh",
    date: "Nov 13, 2024",
    readTime: "14 min read",
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=400&h=200&fit=crop",
    href: "/blog/video-content-tips",
  },
];

const categories = [
  "All",
  "Creator Tips",
  "Growth",
  "Marketing",
  "Teaching",
  "Industry Insights",
  "Creator Stories",
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 hero-gradient">
          <div className="section-container text-center max-w-3xl mx-auto">
            <span className="badge-primary mb-4 inline-block">Blog</span>
            <h1 className="font-heading text-display-1 text-foreground mb-4">
              Creator <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-body-lg text-muted-foreground mb-8">
              Tips, strategies, and inspiration for knowledge entrepreneurs. 
              Learn from experts and successful creators.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="h-14 pl-12 pr-4 rounded-2xl text-base"
              />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-6 border-b border-border sticky top-20 bg-background/80 backdrop-blur-xl z-10">
          <div className="section-container">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "ghost"}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-12">
          <div className="section-container">
            <Link
              to={featuredPost.href}
              className="premium-card overflow-hidden flex flex-col lg:flex-row group"
            >
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full lg:w-1/2 h-64 lg:h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-8 lg:p-12 lg:w-1/2 flex flex-col justify-center">
                <span className="badge-accent mb-4 inline-block w-fit">Featured</span>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {featuredPost.category}
                </span>
                <h2 className="font-heading text-heading-2 text-foreground mt-2 mb-4 group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {featuredPost.author}
                  </span>
                  <span>{featuredPost.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-12">
          <div className="section-container">
            <h2 className="font-heading text-heading-2 text-foreground mb-8">
              Latest Articles
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  to={post.href}
                  className="premium-card overflow-hidden group"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {post.category}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-foreground mt-2 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-muted/30">
          <div className="section-container max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-heading-2 text-foreground mb-4">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-6">
              Get the latest articles, tips, and creator insights delivered 
              straight to your inbox every week.
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 rounded-xl flex-1"
              />
              <Button variant="hero" className="h-12">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
