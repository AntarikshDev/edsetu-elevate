import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { Button } from "@/components/ui/button";
import { Check, X, Sparkles, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Basic",
    description: "Perfect for getting started with your first course",
    monthlyPrice: 999,
    yearlyPrice: 799,
    features: [
      { name: "Up to 3 courses", included: true },
      { name: "1,000 students", included: true },
      { name: "Basic analytics", included: true },
      { name: "Email support", included: true },
      { name: "Custom domain", included: false },
      { name: "White label branding", included: false },
      { name: "Live webinars", included: false },
      { name: "Priority support", included: false },
      { name: "API access", included: false },
      { name: "Dedicated account manager", included: false },
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    description: "For growing creators who need more power",
    monthlyPrice: 2499,
    yearlyPrice: 1999,
    features: [
      { name: "Unlimited courses", included: true },
      { name: "10,000 students", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Priority email support", included: true },
      { name: "Custom domain", included: true },
      { name: "White label branding", included: true },
      { name: "Live webinars", included: true },
      { name: "Priority support", included: false },
      { name: "API access", included: false },
      { name: "Dedicated account manager", included: false },
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations with custom needs",
    monthlyPrice: null,
    yearlyPrice: null,
    features: [
      { name: "Unlimited everything", included: true },
      { name: "Unlimited students", included: true },
      { name: "Custom analytics & reports", included: true },
      { name: "24/7 dedicated support", included: true },
      { name: "Custom domain", included: true },
      { name: "White label branding", included: true },
      { name: "Live webinars", included: true },
      { name: "Priority support", included: true },
      { name: "Full API access", included: true },
      { name: "Dedicated account manager", included: true },
    ],
    cta: "Talk to Sales",
    popular: false,
  },
];

const comparisonFeatures = [
  { category: "Content", features: [
    { name: "Number of courses", basic: "3", pro: "Unlimited", enterprise: "Unlimited" },
    { name: "Video hosting", basic: "50GB", pro: "500GB", enterprise: "Unlimited" },
    { name: "Digital products", basic: "10", pro: "100", enterprise: "Unlimited" },
    { name: "Live webinars", basic: "✗", pro: "✓", enterprise: "✓" },
    { name: "Memberships", basic: "✗", pro: "✓", enterprise: "✓" },
  ]},
  { category: "Students", features: [
    { name: "Student limit", basic: "1,000", pro: "10,000", enterprise: "Unlimited" },
    { name: "Certificates", basic: "✓", pro: "✓", enterprise: "✓" },
    { name: "Quizzes & assignments", basic: "Basic", pro: "Advanced", enterprise: "Advanced" },
    { name: "Progress tracking", basic: "✓", pro: "✓", enterprise: "✓" },
  ]},
  { category: "Customization", features: [
    { name: "Custom domain", basic: "✗", pro: "✓", enterprise: "✓" },
    { name: "White label", basic: "✗", pro: "✓", enterprise: "✓" },
    { name: "Custom branding", basic: "Basic", pro: "Full", enterprise: "Full" },
    { name: "Custom CSS/JS", basic: "✗", pro: "✓", enterprise: "✓" },
  ]},
  { category: "Support", features: [
    { name: "Email support", basic: "48h", pro: "24h", enterprise: "Instant" },
    { name: "Chat support", basic: "✗", pro: "✓", enterprise: "✓" },
    { name: "Phone support", basic: "✗", pro: "✗", enterprise: "✓" },
    { name: "Dedicated manager", basic: "✗", pro: "✗", enterprise: "✓" },
  ]},
];

const faqs = [
  {
    question: "Can I try EdSetu before purchasing?",
    answer: "Yes! All plans include a 14-day free trial. No credit card required to start. You can explore all features and cancel anytime."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit/debit cards, UPI, net banking, and international cards. For Enterprise plans, we also offer bank transfers and purchase orders."
  },
  {
    question: "Can I change my plan later?",
    answer: "Absolutely! You can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, you'll receive a credit for your next billing cycle."
  },
  {
    question: "What happens when I reach my student limit?",
    answer: "You'll be notified when you're approaching your limit. You can upgrade your plan to accommodate more students, or contact us for a custom solution."
  },
  {
    question: "Do you offer discounts for annual billing?",
    answer: "Yes! When you choose annual billing, you save 20% compared to monthly billing. That's 2 months free every year!"
  },
  {
    question: "Is there a money-back guarantee?",
    answer: "Yes, we offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund."
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 hero-gradient">
          <div className="section-container text-center">
            <span className="badge-primary mb-4 inline-block">Pricing</span>
            <h1 className="font-heading text-display-1 text-foreground mb-4">
              Simple, <span className="gradient-text">Transparent Pricing</span>
            </h1>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include a 14-day free trial.
              No credit card required.
            </p>
          </div>
        </section>

        {/* Billing Toggle */}
        <section className="py-8">
          <div className="section-container">
            <div className="flex items-center justify-center gap-4">
              <span className={cn(
                "text-sm font-medium transition-colors",
                !isYearly ? "text-foreground" : "text-muted-foreground"
              )}>
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className="relative w-14 h-7 rounded-full bg-primary/20 transition-colors"
              >
                <div className={cn(
                  "absolute top-1 w-5 h-5 rounded-full bg-primary transition-all duration-300",
                  isYearly ? "left-8" : "left-1"
                )} />
              </button>
              <span className={cn(
                "text-sm font-medium transition-colors",
                isYearly ? "text-foreground" : "text-muted-foreground"
              )}>
                Yearly
              </span>
              {isYearly && <span className="badge-accent">Save 20%</span>}
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-12">
          <div className="section-container">
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={cn(
                    "relative rounded-3xl p-8 transition-all duration-300",
                    plan.popular
                      ? "bg-gradient-to-br from-primary to-violet-600 text-primary-foreground scale-105 lg:scale-110 shadow-2xl z-10"
                      : "premium-card"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Sparkles className="w-4 h-4" />
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className={cn(
                      "font-heading text-2xl font-bold mb-2",
                      !plan.popular && "text-foreground"
                    )}>
                      {plan.name}
                    </h3>
                    <p className={cn(
                      "text-sm",
                      plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"
                    )}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    {plan.monthlyPrice ? (
                      <div className="flex items-baseline gap-1">
                        <span className={cn(
                          "text-4xl font-bold font-heading",
                          !plan.popular && "text-foreground"
                        )}>
                          ₹{isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                        </span>
                        <span className={cn(
                          "text-sm",
                          plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"
                        )}>
                          /month
                        </span>
                      </div>
                    ) : (
                      <div className={cn(
                        "text-4xl font-bold font-heading",
                        !plan.popular && "text-foreground"
                      )}>
                        Custom
                      </div>
                    )}
                    {isYearly && plan.monthlyPrice && (
                      <p className={cn(
                        "text-sm mt-1",
                        plan.popular ? "text-primary-foreground/60" : "text-muted-foreground"
                      )}>
                        Billed annually (₹{(plan.yearlyPrice ?? 0) * 12}/year)
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature.name} className="flex items-center gap-3">
                        {feature.included ? (
                          <div className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center",
                            plan.popular ? "bg-primary-foreground/20" : "bg-accent/20"
                          )}>
                            <Check className={cn(
                              "w-3 h-3",
                              plan.popular ? "text-primary-foreground" : "text-accent"
                            )} />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                            <X className="w-3 h-3 text-muted-foreground" />
                          </div>
                        )}
                        <span className={cn(
                          "text-sm",
                          !feature.included && !plan.popular && "text-muted-foreground"
                        )}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.popular ? "glass" : "hero"}
                    size="lg"
                    className="w-full"
                    asChild
                  >
                    <Link to={plan.name === "Enterprise" ? "/contact" : "/signup"}>
                      {plan.cta}
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-24 bg-muted/30">
          <div className="section-container">
            <div className="text-center mb-12">
              <h2 className="font-heading text-heading-1 text-foreground mb-4">
                Compare Plans in Detail
              </h2>
              <p className="text-muted-foreground">
                See exactly what's included in each plan
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-4 px-4 text-left font-heading text-foreground">Features</th>
                    <th className="py-4 px-4 text-center font-heading text-foreground">Basic</th>
                    <th className="py-4 px-4 text-center font-heading text-primary bg-primary/5 rounded-t-xl">Pro</th>
                    <th className="py-4 px-4 text-center font-heading text-foreground">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((section) => (
                    <>
                      <tr key={section.category} className="bg-muted/50">
                        <td colSpan={4} className="py-3 px-4 font-semibold text-foreground">
                          {section.category}
                        </td>
                      </tr>
                      {section.features.map((feature) => (
                        <tr key={feature.name} className="border-b border-border/50">
                          <td className="py-3 px-4 text-sm text-foreground">{feature.name}</td>
                          <td className="py-3 px-4 text-center text-sm text-muted-foreground">{feature.basic}</td>
                          <td className="py-3 px-4 text-center text-sm text-foreground bg-primary/5">{feature.pro}</td>
                          <td className="py-3 px-4 text-center text-sm text-muted-foreground">{feature.enterprise}</td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24">
          <div className="section-container max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="font-heading text-heading-1 text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Got questions? We've got answers.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="premium-card overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left"
                  >
                    <span className="font-semibold text-foreground">{faq.question}</span>
                    <HelpCircle className={cn(
                      "w-5 h-5 text-primary transition-transform",
                      openFaq === index && "rotate-180"
                    )} />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4 text-muted-foreground animate-slide-up">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
