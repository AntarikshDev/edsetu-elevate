import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="py-16 hero-gradient">
          <div className="section-container text-center max-w-3xl mx-auto">
            <h1 className="font-heading text-display-2 text-foreground mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: December 1, 2024</p>
          </div>
        </section>
        <section className="py-16">
          <div className="section-container max-w-3xl mx-auto prose prose-slate">
            <div className="premium-card p-8 lg:p-12 space-y-6 text-foreground">
              <h2 className="font-heading text-heading-3 text-foreground">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">By accessing and using EdSetu's services, you accept and agree to be bound by the terms and provision of this agreement.</p>
              
              <h2 className="font-heading text-heading-3 text-foreground">2. Use License</h2>
              <p className="text-muted-foreground">Permission is granted to temporarily use EdSetu's services for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
              
              <h2 className="font-heading text-heading-3 text-foreground">3. User Account</h2>
              <p className="text-muted-foreground">You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>
              
              <h2 className="font-heading text-heading-3 text-foreground">4. Content Ownership</h2>
              <p className="text-muted-foreground">Creators retain ownership of their content. By uploading content, you grant EdSetu a license to host, display, and distribute your content through our platform.</p>
              
              <h2 className="font-heading text-heading-3 text-foreground">5. Payment Terms</h2>
              <p className="text-muted-foreground">Subscription fees are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law or as stated in our refund policy.</p>
              
              <h2 className="font-heading text-heading-3 text-foreground">6. Contact</h2>
              <p className="text-muted-foreground">Questions about the Terms of Service should be sent to legal@edsetu.com</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
