import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, Play, Quote, ArrowRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Finance Educator",
    company: "FinanceGuru Academy",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    quote: "EdSetu transformed my teaching career. I went from struggling to monetize my knowledge to earning ₹5L/month in just 6 months. The platform is incredibly intuitive and the support team is always there when I need help.",
    fullStory: "I started teaching finance on YouTube in 2019. While I had a decent following, I struggled to convert viewers into paying students. Traditional course platforms felt clunky and had high fees. When I discovered EdSetu, everything changed. The onboarding was seamless, and I launched my first course within a week. The built-in marketing tools helped me reach my existing audience effectively. Today, I run a full-fledged academy with 15,000+ students and growing.",
    revenue: "₹5L/month",
    students: "15,000+",
    rating: 5,
    hasVideo: true,
    featured: true,
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Tech Course Creator",
    company: "CodeMaster Pro",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    quote: "The course builder is phenomenal. I've tried Teachable, Thinkific, and others - EdSetu is hands down the best for Indian creators. The payment processing is seamless and support is exceptional!",
    fullStory: "As a software engineer turned educator, I was frustrated with platforms that didn't understand the Indian market. High transaction fees, limited payment options, and poor video hosting were constant headaches. EdSetu solved all of this. The UPI integration means my students can pay instantly, and the video quality is excellent even on slower connections.",
    revenue: "₹8L/month",
    students: "25,000+",
    rating: 5,
    hasVideo: false,
    featured: true,
  },
  {
    id: 3,
    name: "Sneha Patel",
    role: "Art & Design Instructor",
    company: "Creative Canvas",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    quote: "I was skeptical at first, but EdSetu made it so easy to launch my art courses. The payment processing is seamless and I love the analytics dashboard that helps me understand my students better.",
    fullStory: "Art education online seemed impossible to me. How do you teach hands-on skills through video? EdSetu's platform made it work. The high-quality video hosting captures every brushstroke, and the community features let my students share their work and get feedback.",
    revenue: "₹3L/month",
    students: "8,000+",
    rating: 5,
    hasVideo: true,
    featured: false,
  },
  {
    id: 4,
    name: "Amit Kumar",
    role: "CA & Business Coach",
    company: "Business Mastery",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    quote: "The webinar feature is a game-changer. I conduct weekly live sessions and the engagement tools are fantastic. My students love the interactive experience and the automatic recordings save me hours.",
    fullStory: "Running live webinars was always a challenge. Other platforms had connectivity issues, limited attendee capacity, or poor recording quality. EdSetu's webinar feature handles hundreds of attendees smoothly, with crystal-clear audio and video.",
    revenue: "₹12L/month",
    students: "40,000+",
    rating: 5,
    hasVideo: false,
    featured: true,
  },
  {
    id: 5,
    name: "Ananya Reddy",
    role: "Fitness & Wellness Coach",
    company: "FitLife Academy",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
    quote: "From zero to ₹7L/month in my first year! EdSetu's membership feature lets me offer exclusive content to my community. The mobile app experience is perfect for fitness content.",
    fullStory: "Fitness content requires a different approach - people need to follow along, pause, replay. EdSetu's mobile-first design means my students can workout with their phones propped up, easily navigating through exercises.",
    revenue: "₹7L/month",
    students: "12,000+",
    rating: 5,
    hasVideo: true,
    featured: false,
  },
  {
    id: 6,
    name: "Deepak Nair",
    role: "Photography Instructor",
    company: "Lens Masters",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    quote: "The ability to sell photo presets along with my courses was exactly what I needed. EdSetu handles digital product delivery flawlessly and my students love the bundled offerings.",
    fullStory: "Photography education isn't just about videos - it's about presets, templates, and downloadable resources. EdSetu lets me bundle everything together seamlessly.",
    revenue: "₹4L/month",
    students: "9,000+",
    rating: 5,
    hasVideo: false,
    featured: false,
  },
];

const metrics = [
  { value: "₹100Cr+", label: "Total Creator Earnings" },
  { value: "50,000+", label: "Active Creators" },
  { value: "10M+", label: "Students Taught" },
  { value: "4.9/5", label: "Average Rating" },
];

export default function TestimonialsPage() {
  const featuredTestimonials = testimonials.filter((t) => t.featured);
  const otherTestimonials = testimonials.filter((t) => !t.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 hero-gradient">
          <div className="section-container text-center max-w-4xl mx-auto">
            <span className="badge-primary mb-4 inline-block">Success Stories</span>
            <h1 className="font-heading text-display-1 text-foreground mb-6">
              Creators Building <span className="gradient-text">Dream Businesses</span>
            </h1>
            <p className="text-body-lg text-muted-foreground mb-8">
              Join thousands of educators and creators who have transformed their 
              knowledge into thriving online businesses with EdSetu.
            </p>
          </div>
        </section>

        {/* Metrics */}
        <section className="py-12 bg-card border-y border-border">
          <div className="section-container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {metrics.map((metric) => (
                <div key={metric.label} className="text-center">
                  <p className="text-3xl lg:text-4xl font-bold font-heading gradient-text mb-1">
                    {metric.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Testimonials */}
        <section className="py-24">
          <div className="section-container">
            <div className="text-center mb-16">
              <h2 className="font-heading text-heading-1 text-foreground mb-4">
                Featured Success Stories
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Hear from creators who have built successful businesses on EdSetu
              </p>
            </div>

            <div className="space-y-12">
              {featuredTestimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`premium-card p-8 lg:p-12 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                >
                  <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Profile */}
                    <div className="lg:w-1/3 text-center lg:text-left">
                      <div className="relative inline-block mb-4">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-primary/20"
                        />
                        {testimonial.hasVideo && (
                          <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                            <Play className="w-4 h-4 text-primary-foreground fill-current" />
                          </button>
                        )}
                      </div>
                      <h3 className="font-heading text-xl font-bold text-foreground">
                        {testimonial.name}
                      </h3>
                      <p className="text-primary font-medium">{testimonial.role}</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        {testimonial.company}
                      </p>
                      <div className="flex justify-center lg:justify-start gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-secondary rounded-xl p-3">
                          <p className="text-lg font-bold text-foreground">
                            {testimonial.revenue}
                          </p>
                          <p className="text-xs text-muted-foreground">Monthly Revenue</p>
                        </div>
                        <div className="bg-secondary rounded-xl p-3">
                          <p className="text-lg font-bold text-foreground">
                            {testimonial.students}
                          </p>
                          <p className="text-xs text-muted-foreground">Students</p>
                        </div>
                      </div>
                    </div>

                    {/* Story */}
                    <div className="lg:w-2/3">
                      <Quote className="w-10 h-10 text-primary/20 mb-4" />
                      <p className="text-xl lg:text-2xl text-foreground leading-relaxed mb-6">
                        "{testimonial.quote}"
                      </p>
                      <p className="text-muted-foreground mb-6">
                        {testimonial.fullStory}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* More Testimonials Grid */}
        <section className="py-24 bg-muted/30">
          <div className="section-container">
            <div className="text-center mb-12">
              <h2 className="font-heading text-heading-1 text-foreground mb-4">
                More Creator Stories
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="premium-card p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
                    />
                    <div>
                      <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-foreground mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary font-semibold">{testimonial.revenue}</span>
                    <span className="text-muted-foreground">{testimonial.students} students</span>
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
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are building their dream businesses with EdSetu.
            </p>
            <Button
              variant="glass"
              size="xl"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              asChild
            >
              <Link to="/pricing">
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
