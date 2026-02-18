import { Header } from "@/components/Header/Header";
import { ScrollyHero } from "@/components/Landing/ScrollyHero";
import { CountdownTimer } from "@/components/Landing/CountdownTimer";
import { BeforeAfterSection } from "@/components/Landing/BeforeAfterSection";
import { DifferentiatorTimeline } from "@/components/Landing/DifferentiatorTimeline";
import { AnimatedCounter } from "@/components/Landing/AnimatedCounter";
import { ScrollReveal } from "@/components/Landing/ScrollReveal";
import { WaitlistSection } from "@/components/Landing/WaitlistSection";
import { NewsletterSection } from "@/components/Landing/NewsletterSection";
import { Footer } from "@/components/Footer/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ScrollyHero />
        <CountdownTimer />
        <BeforeAfterSection />
        <DifferentiatorTimeline />
        <AnimatedCounter />
        <WaitlistSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
