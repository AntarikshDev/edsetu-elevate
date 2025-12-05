import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Star, Users, BookOpen } from "lucide-react";
import heroImage from "@/assets/hero-illustration.png";

const stats = [
  { icon: Users, value: "50,000+", label: "Active creators" },
  { icon: BookOpen, value: "10M+", label: "Learners served" },
  { icon: Star, value: "4.9/5", label: "Creator rating" },
];

const logos = [
  "TechCrunch",
  "Forbes",
  "YourStory",
  "Inc42",
  "Economic Times",
];

export function Hero() {
  return (
    <section className="relative min-h-screen hero-gradient overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float animate-delay-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-200/20 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-2 mb-6 animate-slide-up">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-secondary-foreground">
                Trusted by 50,000+ creators worldwide
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-heading text-display-1 text-foreground mb-6 animate-slide-up animate-delay-100">
              Turn Your Knowledge Into a{" "}
              <span className="gradient-text">Thriving Business</span>
            </h1>

            {/* Subheading */}
            <p className="text-body-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 animate-slide-up animate-delay-200">
              Create and sell courses, webinars, memberships, and digital products. 
              Everything you need to build, launch, and scale your knowledge business.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up animate-delay-300">
              <Button variant="hero" size="xl" asChild>
                <Link to="/pricing">
                  Get Started — Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="glass" size="xl">
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 animate-slide-up animate-delay-400">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                    <stat.icon className="w-5 h-5 text-primary" />
                    <span className="text-2xl font-bold text-foreground font-heading">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-slide-up animate-delay-200">
            <div className="relative">
              {/* Main image */}
              <img
                src={heroImage}
                alt="EdSetu platform illustration showing online learning and course creation"
                className="w-full h-auto rounded-3xl shadow-2xl animate-float"
              />

              {/* Floating cards */}
              <div className="absolute -top-6 -left-6 bg-card rounded-2xl shadow-xl p-4 animate-float animate-delay-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">New Enrollment</p>
                    <p className="text-xs text-muted-foreground">+247 students today</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-card rounded-2xl shadow-xl p-4 animate-float animate-delay-300">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Revenue</p>
                    <p className="text-xs text-accent font-semibold">+₹2.4L this month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted by logos */}
        <div className="mt-20 text-center animate-slide-up animate-delay-500">
          <p className="text-sm text-muted-foreground mb-6">Featured in</p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            {logos.map((logo) => (
              <span
                key={logo}
                className="text-lg font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
