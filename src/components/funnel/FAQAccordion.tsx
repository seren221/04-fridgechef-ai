import { useState } from "react";
import { cn } from "@/lib/utils";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  themeConfig?: unknown;
}

export function FAQAccordion({ items, themeConfig }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  if (!items || items.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto max-w-[1280px] px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-3">
          {items.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  type="button"
                >
                  <span className="font-medium">{faq.q}</span>
                  <svg className={cn("w-5 h-5 text-gray-400 transition-transform duration-300", isOpen && "rotate-180")} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className={cn("px-6 overflow-hidden transition-all duration-300 ease-out", isOpen ? "max-h-40 pb-4 opacity-100" : "max-h-0 pb-0 opacity-0")}>
                  <div className="text-gray-600">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
