import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import clipartNewsletter from "@/assets/clipart-newsletter.png";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-24 relative overflow-hidden" id="newsletter">
      <div className="absolute inset-0 bg-gradient-primary" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="section-container relative">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <ScrollReveal direction="left">
            <img
              src={clipartNewsletter}
              alt="Stay updated with EdSetu"
              className="w-full max-w-sm mx-auto drop-shadow-2xl"
            />
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-foreground/20 rounded-full px-4 py-2 mb-6">
                <Mail className="w-4 h-4 text-primary-foreground" />
                <span className="text-sm font-medium text-primary-foreground">
                  Webinar & Launch Updates
                </span>
              </div>

              <h2 className="font-heading text-display-2 text-primary-foreground mb-4">
                Don't Miss Our Launch Webinar
              </h2>

              <p className="text-lg text-primary-foreground/80 mb-8">
                Subscribe for exclusive early-access updates, webinar invitations, and insider previews of EdSetu before anyone else.
              </p>

              {submitted ? (
                <div className="flex items-center gap-3 bg-primary-foreground/20 rounded-2xl p-6">
                  <CheckCircle className="w-8 h-8 text-accent" />
                  <div>
                    <p className="text-primary-foreground font-semibold">You're on the list! 🎉</p>
                    <p className="text-primary-foreground/70 text-sm">
                      We'll send you webinar details and launch updates soon.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-14 rounded-xl bg-primary-foreground/15 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 flex-1 text-base"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="h-14 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 text-base"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Subscribe
                  </Button>
                </form>
              )}

              <p className="text-sm text-primary-foreground/50 mt-4">
                No spam. Unsubscribe anytime. We respect your inbox.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
