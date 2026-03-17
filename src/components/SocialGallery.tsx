import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    name: "Alex Chen",
    role: "Product Manager",
    content: "This tool saved me 4 hours of work in just 10 minutes. The accuracy is insane.",
    avatar: "AC"
  },
  {
    name: "Sarah Miller",
    role: "Digital Artist",
    content: "I was skeptical at first, but the results speak for themselves. Highly recommended.",
    avatar: "SM"
  },
  {
    name: "David Kim",
    role: "Developer",
    content: "The API integration is seamless. It's now a core part of my workflow.",
    avatar: "DK"
  },
  {
    name: "Emily Wang",
    role: "Content Creator",
    content: "Finally, an AI tool that actually understands context. 10/10.",
    avatar: "EW"
  },
  {
    name: "Michael Brown",
    role: "Analyst",
    content: "The deep dive analysis feature is a game changer for my reports.",
    avatar: "MB"
  },
  {
    name: "Jessica Davis",
    role: "Marketing Lead",
    content: "Boosted our campaign efficiency by 300%. Just wow.",
    avatar: "JD"
  }
];

export function SocialGallery({ themeConfig }: { themeConfig?: any }) {
  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-6">
      <h2 className={cn("text-3xl font-bold text-center mb-12", themeConfig?.title)}>
        Trusted by 10,000+ Innovators
      </h2>
      
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {TESTIMONIALS.map((t, i) => (
          <div 
            key={i} 
            className={cn(
              "break-inside-avoid rounded-xl p-6 shadow-sm border transition-all hover:shadow-md",
              themeConfig?.card || "bg-white border-gray-200"
            )}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm",
                themeConfig?.badge || "bg-gray-100 text-gray-700"
              )}>
                {t.avatar}
              </div>
              <div>
                <div className={cn("font-medium text-sm", themeConfig?.leadTitle)}>{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
            <p className={cn("text-sm leading-relaxed", themeConfig?.list || "text-gray-600")}>
              "{t.content}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
