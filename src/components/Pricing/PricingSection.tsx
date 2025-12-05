import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Basic",
    description: "Perfect for getting started",
    monthlyPrice: 999,
    yearlyPrice: 799,
    features: [
      { name: "Up to 3 courses", included: true },
      { name: "1,000 students", included: true },
      { name: "Basic analytics", included: true },
      { name: "Email support", included: true },
      { name: "Custom domain", included: false },
      { name: "White label", included: false },
      { name: "Priority support", included: false },
      { name: "API access", included: false },
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    description: "For growing creators",
    monthlyPrice: 2499,
    yearlyPrice: 1999,
    features: [
      { name: "Unlimited courses", included: true },
      { name: "10,000 students", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Priority email support", included: true },
      { name: "Custom domain", included: true },
      { name: "White label", included: true },
      { name: "Priority support", included: false },
      { name: "API access", included: false },
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    monthlyPrice: null,
    yearlyPrice: null,
    features: [
      { name: "Unlimited everything", included: true },
      { name: "Unlimited students", included: true },
      { name: "Custom analytics", included: true },
      { name: "Dedicated support", included: true },
      { name: "Custom domain", included: true },
      { name: "White label", included: true },
      { name: "Priority support", included: true },
      { name: "API access", included: true },
    ],
    cta: "Talk to Sales",
    popular: false,
  },
];

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section className="py-24 bg-background">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="badge-primary mb-4 inline-block">Pricing</span>
          <h2 className="font-heading text-display-2 text-foreground mb-4">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span
            className={cn(
              "text-sm font-medium transition-colors",
              !isYearly ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative w-14 h-7 rounded-full bg-primary/20 transition-colors"
            aria-label={`Switch to ${isYearly ? "monthly" : "yearly"} billing`}
          >
            <div
              className={cn(
                "absolute top-1 w-5 h-5 rounded-full bg-primary transition-all duration-300",
                isYearly ? "left-8" : "left-1"
              )}
            />
          </button>
          <span
            className={cn(
              "text-sm font-medium transition-colors",
              isYearly ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Yearly
          </span>
          {isYearly && (
            <span className="badge-accent">Save 20%</span>
          )}
        </div>

        {/* Pricing Cards */}
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
                      !feature.included && "text-muted-foreground"
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
                <Link to={plan.name === "Enterprise" ? "/contact" : "/pricing"}>
                  {plan.cta}
                </Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Need a custom solution for your organization?
          </p>
          <Button variant="outline" size="lg" asChild>
            <Link to="/contact">Contact Sales</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
