'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PlanItem {
  name: string;
  price: string;
  yearly_price?: string;
  period?: string;
  features: string[];
}

interface PricingConfig {
  yearly_discount: string;
  plans: PlanItem[];
}

interface PricingTiersProps {
  config: PricingConfig;
  themeConfig?: any;
  onPlanSelect?: () => void;
}

export function PricingTiers({ config, themeConfig, onPlanSelect }: PricingTiersProps) {
  const [isYearly, setIsYearly] = useState(true);

  if (!config || !config.plans || config.plans.length === 0) return null;

  return (
    <section className="py-24">
      <div className="container mx-auto max-w-[1280px] px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Simple, Transparent Pricing</h2>
          
          {/* 切换 */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900" type="button" onClick={() => setIsYearly(false)}>Monthly</button>
            <button 
              type="button" 
              onClick={() => setIsYearly(!isYearly)} 
              className={cn(
                "relative inline-flex w-12 h-6 items-center rounded-full transition-colors duration-300",
                isYearly ? "bg-orange-500" : "bg-gray-200"
              )}
            >
              <span className={cn("inline-block h-5 w-5 transform rounded-full bg-white transition-all duration-300", isYearly ? "translate-x-6" : "translate-x-1")} />
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900 flex items-center gap-1" type="button" onClick={() => setIsYearly(true)}>
              Yearly
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">Save 40%</span>
            </button>
          </div>
        </div>
        
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {config.plans.map((plan, idx) => {
            const isPro = idx === 1; // Assuming second plan is Pro
            const price = isYearly && plan.yearly_price ? plan.yearly_price : plan.price;
            
            return (
              <div 
                key={idx}
                className={cn(
                  "bg-white rounded-3xl border border-gray-200 shadow-xl p-8 h-full flex flex-col",
                  isPro ? "border-orange-500 relative" : ""
                )}
              >
                {isPro && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold uppercase">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="text-5xl font-bold mb-1">{price}</div>
                <div className="text-sm text-gray-500 mb-4">{plan.period || "/mo"}</div>
                <ul className="space-y-3 mb-8 text-sm flex-1">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <button 
                    onClick={onPlanSelect}
                    className={`w-full py-3 rounded-xl font-semibold ${isPro ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'border border-gray-300 hover:bg-gray-50'}`}
                  >
                    {isPro ? "Upgrade Now" : "Get Started"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
