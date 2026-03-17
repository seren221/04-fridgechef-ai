import { cn } from "@/lib/utils";

interface BenefitItem {
  title: string;
  description: string;
}

interface BenefitCardsProps {
  items: BenefitItem[];
  themeConfig?: any;
}

export function BenefitCards({ items, themeConfig }: BenefitCardsProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Key Features</h2>
          <p className="text-gray-600">Discover what makes us different</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-blue-600">{idx + 1}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
