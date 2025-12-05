import { useState } from "react";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, MessageSquare, HelpCircle, Users } from "lucide-react";

const contactOptions = [
  {
    icon: MessageSquare,
    title: "Sales",
    description: "Talk to our sales team about enterprise solutions",
    action: "sales@edsetu.com",
    href: "mailto:sales@edsetu.com",
  },
  {
    icon: HelpCircle,
    title: "Support",
    description: "Get help with your account or technical issues",
    action: "support@edsetu.com",
    href: "mailto:support@edsetu.com",
  },
  {
    icon: Users,
    title: "Partnerships",
    description: "Explore partnership and collaboration opportunities",
    action: "partners@edsetu.com",
    href: "mailto:partners@edsetu.com",
  },
];

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({ name: "", email: "", company: "", subject: "", message: "" });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 hero-gradient">
          <div className="section-container text-center max-w-3xl mx-auto">
            <span className="badge-primary mb-4 inline-block">Contact Us</span>
            <h1 className="font-heading text-display-1 text-foreground mb-4">
              Let's <span className="gradient-text">Talk</span>
            </h1>
            <p className="text-body-lg text-muted-foreground">
              Have questions about EdSetu? We'd love to hear from you. 
              Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-12">
          <div className="section-container">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {contactOptions.map((option) => (
                <a
                  key={option.title}
                  href={option.href}
                  className="premium-card p-6 text-center hover:border-primary/30 transition-colors"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <option.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-1">
                    {option.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {option.description}
                  </p>
                  <p className="text-primary font-medium text-sm">{option.action}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Form */}
              <div className="premium-card p-8">
                <h2 className="font-heading text-heading-2 text-foreground mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company (Optional)</Label>
                      <Input
                        id="company"
                        placeholder="Your company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="How can we help?"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="min-h-[150px] rounded-xl resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="font-heading text-heading-2 text-foreground mb-4">
                    Get in Touch
                  </h2>
                  <p className="text-muted-foreground">
                    Our team is available Monday through Friday, 9am to 6pm IST. 
                    We aim to respond to all inquiries within 24 hours.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email</h3>
                      <p className="text-muted-foreground">hello@edsetu.com</p>
                      <p className="text-muted-foreground">support@edsetu.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                      <p className="text-muted-foreground">+91 1800 123 4567</p>
                      <p className="text-sm text-muted-foreground">(Toll-free, Mon-Fri)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Office</h3>
                      <p className="text-muted-foreground">
                        WeWork Embassy TechVillage<br />
                        Outer Ring Road, Devarabisanahalli<br />
                        Bengaluru, Karnataka 560103
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="premium-card overflow-hidden h-64">
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <p className="text-muted-foreground">Map integration available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
