import { Header } from "@/components/Header/Header";
import { ScrollyHero } from "@/components/Landing/ScrollyHero";
import { BeforeAfterSection } from "@/components/Landing/BeforeAfterSection";
import { DifferentiatorTimeline } from "@/components/Landing/DifferentiatorTimeline";
import { AnimatedCounter } from "@/components/Landing/AnimatedCounter";
import { ScrollReveal } from "@/components/Landing/ScrollReveal";
import { ParallaxSection } from "@/components/Landing/ParallaxSection";
import { TestimonialsSection } from "@/components/Testimonials/TestimonialsSection";
import { PricingSection } from "@/components/Pricing/PricingSection";
import { CTASection } from "@/components/CTA/CTASection";
import { Footer } from "@/components/Footer/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ScrollyHero />
        <BeforeAfterSection />
        <DifferentiatorTimeline />
        <AnimatedCounter />
        <ScrollReveal>
          <TestimonialsSection />
        </ScrollReveal>
        <ScrollReveal>
          <PricingSection />
        </ScrollReveal>
        <ParallaxSection>
          <CTASection />
        </ParallaxSection>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
