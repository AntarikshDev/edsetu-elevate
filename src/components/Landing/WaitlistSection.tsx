import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Rocket, CheckCircle, Users } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      setSubmitted(true);
      setEmail("");
      setName("");
    }
  };

  return (
    <section className="py-24" id="waitlist">
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-5 py-2 mb-6">
              <Users className="w-4 h-4 text-accent" />
              <span className="text-body-sm font-medium text-accent">
                Pre-Launch Waitlist
              </span>
            </div>

            <h2 className="font-heading text-display-2 text-foreground mb-4">
              Be the <span className="gradient-text">First</span> to Experience EdSetu
            </h2>
            <p className="text-body-lg text-muted-foreground mb-10">
              Join our exclusive waitlist and get early access, founding member benefits, and a front-row seat to the future of education in India.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            {submitted ? (
              <div className="glass-card p-8 flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-heading text-heading-3 text-foreground">
                  Welcome aboard! 🎉
                </h3>
                <p className="text-muted-foreground">
                  You've secured your spot. We'll reach out with early access details before launch.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-4">
                <Input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-14 rounded-xl text-base"
                />
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-14 rounded-xl text-base"
                />
                <Button
                  type="submit"
                  size="xl"
                  className="w-full rounded-xl font-semibold btn-glow"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Join the Waitlist — It's Free
                </Button>
                <p className="text-body-sm text-muted-foreground">
                  🔒 No credit card required. Early access guaranteed.
                </p>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
