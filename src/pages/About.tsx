import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Target, Heart, Globe, Award, Rocket } from "lucide-react";

const stats = [
  { value: "50,000+", label: "Active Creators" },
  { value: "10M+", label: "Learners Served" },
  { value: "₹100Cr+", label: "Creator Earnings" },
  { value: "150+", label: "Countries" },
];

const values = [
  {
    icon: Heart,
    title: "Creator First",
    description: "Everything we build starts with the question: How does this help creators succeed?",
  },
  {
    icon: Target,
    title: "Simplicity",
    description: "Complex technology made simple. We obsess over making powerful tools easy to use.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Breaking barriers so anyone, anywhere can share their knowledge with the world.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We set the bar high. Premium experience for creators and their students.",
  },
];

const team = [
  {
    name: "Arun Sharma",
    role: "Co-founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    bio: "Former Google PM, passionate about democratizing education technology.",
  },
  {
    name: "Priya Mehta",
    role: "Co-founder & CTO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
    bio: "Engineering leader from Amazon, building scalable EdTech infrastructure.",
  },
  {
    name: "Vikram Singh",
    role: "Head of Product",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    bio: "Product veteran with 15+ years building consumer products at scale.",
  },
  {
    name: "Sneha Reddy",
    role: "Head of Customer Success",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    bio: "Dedicated to ensuring every creator achieves their business goals.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 hero-gradient">
          <div className="section-container text-center max-w-4xl mx-auto">
            <span className="badge-primary mb-4 inline-block">About Us</span>
            <h1 className="font-heading text-display-1 text-foreground mb-6">
              Empowering the World's{" "}
              <span className="gradient-text">Knowledge Creators</span>
            </h1>
            <p className="text-body-lg text-muted-foreground mb-8">
              We're on a mission to help educators, creators, and experts turn their 
              knowledge into thriving businesses. EdSetu provides the tools and 
              platform to create, sell, and scale online education.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/pricing">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-card border-y border-border">
          <div className="section-container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-4xl lg:text-5xl font-bold font-heading gradient-text mb-2">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-24">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="badge-primary mb-4 inline-block">Our Story</span>
                <h2 className="font-heading text-heading-1 text-foreground mb-6">
                  Born from a Simple Idea
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    EdSetu was founded in 2021 by a team of educators and technologists 
                    who believed that sharing knowledge shouldn't require a computer 
                    science degree or a big budget.
                  </p>
                  <p>
                    We saw talented teachers struggling with complex tools, creators 
                    losing revenue to high platform fees, and students missing out on 
                    quality education because of geographical barriers.
                  </p>
                  <p>
                    So we built EdSetu — a platform that makes it easy for anyone with 
                    knowledge to share it with the world and earn a living doing what 
                    they love.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="premium-card p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Rocket className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-foreground">Our Mission</h3>
                      <p className="text-muted-foreground text-sm">What drives us every day</p>
                    </div>
                  </div>
                  <p className="text-lg text-foreground leading-relaxed">
                    "To democratize knowledge sharing by giving every educator and 
                    creator the tools to build a sustainable business around their expertise."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-muted/30">
          <div className="section-container">
            <div className="text-center mb-16">
              <span className="badge-primary mb-4 inline-block">Our Values</span>
              <h2 className="font-heading text-heading-1 text-foreground">
                What We Stand For
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div key={value.title} className="premium-card p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24">
          <div className="section-container">
            <div className="text-center mb-16">
              <span className="badge-primary mb-4 inline-block">Our Team</span>
              <h2 className="font-heading text-heading-1 text-foreground mb-4">
                Meet the People Behind EdSetu
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A diverse team of educators, engineers, and entrepreneurs united by 
                a shared passion for empowering creators.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <div key={member.name} className="premium-card p-6 text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-primary/20"
                  />
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-br from-primary to-violet-600">
          <div className="section-container text-center">
            <h2 className="font-heading text-heading-1 text-primary-foreground mb-4">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join 50,000+ creators who are already building their dream businesses with EdSetu.
            </p>
            <Button
              variant="glass"
              size="xl"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              asChild
            >
              <Link to="/pricing">Get Started Free</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
