import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "How does the credit system work?",
    a: "You get 10 free credits daily. Pro plan offers unlimited generations."
  },
  {
    q: "Can I cancel my subscription?",
    a: "Yes, you can cancel anytime from your dashboard. No questions asked."
  },
  {
    q: "Is my data secure?",
    a: "We use enterprise-grade encryption. Your inputs are never trained on without permission."
  }
];

export function PricingFAQ({ themeConfig }: { themeConfig?: any }) {
  return (
    <section className="w-full max-w-4xl mx-auto py-16 px-6 space-y-24">
      
      {/* Pricing Section */}
      <div className="text-center space-y-8">
        <h2 className={cn("text-3xl font-bold", themeConfig?.title)}>Simple Pricing</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Free Plan */}
          <div className={cn("p-8 rounded-2xl border", themeConfig?.card || "bg-white border-gray-200")}>
            <h3 className="text-xl font-bold mb-2">Starter</h3>
            <div className="text-3xl font-bold mb-4">$0</div>
            <ul className="space-y-3 text-sm text-left mb-8 opacity-80">
              <li>✓ 10 Daily Credits</li>
              <li>✓ Basic Support</li>
              <li>✓ Standard Speed</li>
            </ul>
            <Button variant="outline" className="w-full">Current Plan</Button>
          </div>
          
          {/* Pro Plan */}
          <div className={cn("p-8 rounded-2xl border-2 relative overflow-hidden", themeConfig?.leadContainer || "border-black bg-gray-50")}>
            <div className="absolute top-0 right-0 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
            <h3 className="text-xl font-bold mb-2">Pro</h3>
            <div className="text-3xl font-bold mb-4">$9.99<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
            <ul className="space-y-3 text-sm text-left mb-8">
              <li>✓ Unlimited Credits</li>
              <li>✓ Priority Support</li>
              <li>✓ Fast GPU Access</li>
            </ul>
            <Button className={cn("w-full", themeConfig?.leadButton)}>Upgrade Now</Button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-8">
        <h2 className={cn("text-3xl font-bold text-center", themeConfig?.title)}>Frequently Asked Questions</h2>
        <div className="grid gap-6">
          {FAQS.map((faq, i) => (
            <div key={i} className={cn("p-6 rounded-xl border", themeConfig?.card || "bg-white border-gray-200")}>
              <h4 className="font-semibold mb-2">{faq.q}</h4>
              <p className="text-sm opacity-70">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
