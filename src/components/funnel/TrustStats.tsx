import { cn } from "@/lib/utils";

interface StatItem {
  label: string;
  value: string;
}

interface TrustStatsProps {
  items: StatItem[];
  themeConfig?: any;
}

export function TrustStats({ items, themeConfig }: TrustStatsProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-12 bg-slate-50 border-y border-gray-100">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {items.map((item, idx) => (
            <div key={idx}>
              <div className="text-4xl font-bold mb-2 text-gray-900">
                {item.value}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
