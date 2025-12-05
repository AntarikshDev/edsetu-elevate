import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="py-16 hero-gradient">
          <div className="section-container text-center max-w-3xl mx-auto">
            <h1 className="font-heading text-display-2 text-foreground mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: December 1, 2024</p>
          </div>
        </section>
        <section className="py-16">
          <div className="section-container max-w-3xl mx-auto">
            <div className="premium-card p-8 lg:p-12 space-y-6 text-foreground">
              <h2 className="font-heading text-heading-3 text-foreground">1. Information We Collect</h2>
              <p className="text-muted-foreground">We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This includes name, email, payment information, and content you upload.</p>
              
              <h2 className="font-heading text-heading-3 text-foreground">2. How We Use Your Information</h2>
              <p className="text-muted-foreground">We use the information to provide, maintain, and improve our services, process transactions, send communications, and protect against fraud and abuse.</p>
              
              <h2 className="font-heading text-heading-3 text-foreground">3. Information Sharing</h2>
              <p className="text-muted-foreground">We do not sell your personal information. We may share information with service providers, for legal compliance, or with your consent.</p>
              
              <h2 className="font-heading text-heading-3 text-foreground">4. Data Security</h2>
              <p className="text-muted-foreground">We implement industry-standard security measures to protect your data, including encryption, secure servers, and regular security audits.</p>
              
              <h2 className="font-heading text-heading-3 text-foreground">5. Your Rights</h2>
              <p className="text-muted-foreground">You have the right to access, correct, or delete your personal information. Contact us at privacy@edsetu.com to exercise these rights.</p>
              
              <h2 className="font-heading text-heading-3 text-foreground">6. Contact Us</h2>
              <p className="text-muted-foreground">For questions about this Privacy Policy, please contact us at privacy@edsetu.com</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
