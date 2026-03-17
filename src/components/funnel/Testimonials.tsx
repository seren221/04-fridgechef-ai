import { cn } from "@/lib/utils";

interface FeatureItem {
  icon?: string;
  title: string;
  description: string;
}

interface FeaturesProps {
  items: FeatureItem[];
  themeConfig?: any;
}

export function Testimonials({ items, themeConfig }: FeaturesProps) {
  if (!items || items.length === 0) return null;
  const accents = [
    "bg-blue-50 text-blue-600",
    "bg-green-50 text-green-600",
    "bg-purple-50 text-purple-600"
  ];

  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="container mx-auto max-w-[1280px] px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Key Features</h2>
          <p className="text-gray-600">Discover what makes us different</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div 
              key={i} 
              className="text-center"
            >
              <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold", accents[i % accents.length])}>
                {i + 1}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{item.title}</h3>
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
