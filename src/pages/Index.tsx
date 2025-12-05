import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import { FeaturesSection } from "@/components/Features/FeaturesSection";
import { TestimonialsSection } from "@/components/Testimonials/TestimonialsSection";
import { PricingSection } from "@/components/Pricing/PricingSection";
import { CTASection } from "@/components/CTA/CTASection";
import { Footer } from "@/components/Footer/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
