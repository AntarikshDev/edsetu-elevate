import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote, Star, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Finance Educator",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    quote: "EdSetu transformed my teaching career. I went from struggling to monetize my knowledge to earning ₹5L/month in just 6 months. The platform is incredibly intuitive.",
    revenue: "₹5L/month",
    students: "15,000+",
    hasVideo: true,
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Tech Course Creator",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    quote: "The course builder is phenomenal. I've tried Teachable, Thinkific, and others - EdSetu is hands down the best for Indian creators. Support is exceptional!",
    revenue: "₹8L/month",
    students: "25,000+",
    hasVideo: false,
  },
  {
    id: 3,
    name: "Sneha Patel",
    role: "Art & Design Instructor",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    quote: "I was skeptical at first, but EdSetu made it so easy to launch my art courses. The payment processing is seamless and I love the analytics dashboard.",
    revenue: "₹3L/month",
    students: "8,000+",
    hasVideo: true,
  },
  {
    id: 4,
    name: "Amit Kumar",
    role: "CA & Business Coach",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    quote: "The webinar feature is a game-changer. I conduct weekly live sessions and the engagement tools are fantastic. My students love the interactive experience.",
    revenue: "₹12L/month",
    students: "40,000+",
    hasVideo: false,
  },
  {
    id: 5,
    name: "Ananya Reddy",
    role: "Fitness & Wellness Coach",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    quote: "From zero to ₹7L/month in my first year! EdSetu's membership feature lets me offer exclusive content to my community. Couldn't have done it without them.",
    revenue: "₹7L/month",
    students: "12,000+",
    hasVideo: true,
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className="py-24 bg-muted/30">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="badge-primary mb-4 inline-block">Success Stories</span>
          <h2 className="font-heading text-display-2 text-foreground mb-4">
            Loved by <span className="gradient-text">50,000+ Creators</span>
          </h2>
          <p className="text-body-lg text-muted-foreground">
            See how educators and creators are transforming their knowledge into 
            thriving businesses with EdSetu.
          </p>
        </div>

        {/* Main Testimonial Carousel */}
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="premium-card p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {/* Avatar & Info */}
              <div className="flex flex-col items-center text-center lg:w-1/3">
                <div className="relative mb-4">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                  />
                  {testimonials[currentIndex].hasVideo && (
                    <button className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 text-primary-foreground fill-current" />
                    </button>
                  )}
                </div>
                <h4 className="font-heading text-lg font-bold text-foreground">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {testimonials[currentIndex].role}
                </p>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="bg-secondary rounded-xl p-3">
                    <p className="text-lg font-bold text-foreground">
                      {testimonials[currentIndex].revenue}
                    </p>
                    <p className="text-xs text-muted-foreground">Revenue</p>
                  </div>
                  <div className="bg-secondary rounded-xl p-3">
                    <p className="text-lg font-bold text-foreground">
                      {testimonials[currentIndex].students}
                    </p>
                    <p className="text-xs text-muted-foreground">Students</p>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="lg:w-2/3">
                <Quote className="w-12 h-12 text-primary/20 mb-4" />
                <p className="text-xl lg:text-2xl text-foreground leading-relaxed mb-6">
                  "{testimonials[currentIndex].quote}"
                </p>
                <Link
                  to="/testimonials"
                  className="text-primary font-semibold hover:underline inline-flex items-center gap-2"
                >
                  Read full story
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "bg-border hover:bg-muted-foreground"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/testimonials">
              View All Success Stories
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
