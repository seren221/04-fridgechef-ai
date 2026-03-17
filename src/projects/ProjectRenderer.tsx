'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useLocale } from 'next-intl';
import { HeroTool } from "@/components/HeroTool";
import { FridgeHeroTool } from "@/components/FridgeHeroTool";
import { ProjectConfig } from "@/types";

// Lazy load heavy components for performance (LCP optimization)
const Testimonials = dynamic(() => import('@/components/funnel/Testimonials').then(mod => mod.Testimonials));
const PricingTiers = dynamic(() => import('@/components/funnel/PricingTiers').then(mod => mod.PricingTiers));
const FAQAccordion = dynamic(() => import('@/components/funnel/FAQAccordion').then(mod => mod.FAQAccordion));

export function ProjectRenderer({ project, slug }: { project: ProjectConfig; slug: string }) {
  const [openLeadModalSignal, setOpenLeadModalSignal] = useState(0);
  const [heroInput] = useState("");
  const theme = project.theme_config || {};
  const locale = useLocale();
  const isZh = locale === 'zh';

  const isFridgeChef = slug === 'fridge-chef';
  const HeroComponent = isFridgeChef ? FridgeHeroTool : HeroTool;

  const getLocalizedValue = (field: string, fallback?: string): string => {
    const zhField = `${field}_zh` as keyof ProjectConfig;
    return isZh && project[zhField] ? String(project[zhField]) : (project[field as keyof ProjectConfig] as string || fallback || '');
  };

  const title = getLocalizedValue('h1');
  const description = getLocalizedValue('subtitle');
  const placeholder = getLocalizedValue('input_placeholder');
  const ctaText = getLocalizedValue('cta_text');
  const presetTags = isZh && project.preset_tags_zh ? project.preset_tags_zh as string[] : project.preset_tags as string[];

  return (
    <div className={`min-h-screen flex flex-col ${theme.wrapper || 'bg-white'} text-gray-900`}>
      
      {/* === Hero 核心工具区 === */}
      <div className="relative z-20">
        <HeroComponent 
          title={title} 
          description={description} 
          placeholder={placeholder}
          ctaText={ctaText}
          presetTags={presetTags}
          advancedOptions={project.advanced_options}
          onOpenModal={() => setOpenLeadModalSignal((prev) => prev + 1)}
          openLeadModalSignal={openLeadModalSignal}
          leadMagnetProps={{
            projectId: process.env.NEXT_PUBLIC_GA_ID || "unknown",
            projectName: project.name,
            slug,
            referralDomain: process.env.NEXT_PUBLIC_SITE_URL || "direct",
            themeConfig: theme
          }}
          themeConfig={theme}
          externalInput={heroInput}
          expertIdentity={project.expert_identity as string || ''}
          locale={locale}
        />
      </div>

      {/* === Stats 数据统计区 === */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-[1280px] px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {project.stats ? (
              project.stats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm py-8 px-6">
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-xs font-semibold tracking-widest text-gray-500 uppercase">{stat.label}</div>
                </div>
              ))
            ) : (
              <>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-8 px-6">
                  <div className="text-4xl font-bold text-gray-900 mb-2">10,000+</div>
                  <div className="text-xs font-semibold tracking-widest text-gray-500 uppercase">Appeals Generated</div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-8 px-6">
                  <div className="text-4xl font-bold text-gray-900 mb-2">92%</div>
                  <div className="text-xs font-semibold tracking-widest text-gray-500 uppercase">Success Rate</div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-8 px-6">
                  <div className="text-4xl font-bold text-gray-900 mb-2">$5M+</div>
                  <div className="text-xs font-semibold tracking-widest text-gray-500 uppercase">Money Saved</div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* === Features 特性区 === */}
      {project.features && (
        <div id="features">
          <Testimonials 
            items={project.features}
            themeConfig={theme}
          />
        </div>
      )}

      {/* === Pricing 定价区 === */}
      {project.pricing && (
        <div id="pricing">
          <PricingTiers 
            config={project.pricing} 
            themeConfig={theme} 
            onPlanSelect={() => setOpenLeadModalSignal((prev) => prev + 1)}
          />
        </div>
      )}

      {/* === FAQ 常见问题区 === */}
      {project.faq && (
        <div id="faq">
          <FAQAccordion items={project.faq} themeConfig={theme} />
        </div>
      )}

      {/* === Footer 底部区 === */}
      
    </div>
  );
}
