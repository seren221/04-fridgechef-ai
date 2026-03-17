
export interface HeroModuleProps {
  title: string;
  description: string;
  h1?: string;
  subtitle?: string;
  ctaText?: string;
  placeholder?: string;
  presetTags?: string[];
  advancedOptions?: {
    id: string;
    label: string;
    type: 'select' | 'switch' | 'input';
    options?: string[];
    default?: any;
  }[];
  themeConfig?: ThemeConfig;
  onGenerate?: (input: string, options?: any) => void;
  isGenerating?: boolean;
  onProgress?: (value: number, status: string) => void;
  externalInput?: string;
}

export interface FeatureModuleProps {
  features: {
    title: string;
    description: string;
    icon?: string;
  }[];
  themeConfig?: ThemeConfig;
}

export interface BenefitModuleProps {
  benefits: {
    title: string;
    description: string;
  }[];
  themeConfig?: ThemeConfig;
}

export interface StatModuleProps {
  stats: {
    label: string;
    value: string;
  }[];
  themeConfig?: ThemeConfig;
}

export interface TestimonialModuleProps {
  testimonials: {
    name: string;
    role: string;
    content: string;
    avatar: string;
  }[];
  themeConfig?: ThemeConfig;
}

export interface PricingModuleProps {
  config: {
    yearly_discount: string;
    plans: {
      name: string;
      price: string;
      yearly_price?: string;
      period?: string;
      features: string[];
    }[];
  };
  themeConfig?: ThemeConfig;
}

export interface FAQModuleProps {
  items: {
    q: string;
    a: string;
  }[];
  themeConfig?: ThemeConfig;
}

export interface InspirationModuleProps {
  items: {
    prompt: string;
    label: string;
  }[];
  themeConfig?: ThemeConfig;
  onTry?: (prompt: string) => void;
}

export type ThemeConfig = {
  wrapper?: string;
  badge?: string;
  title?: string;
  card?: string;
  list?: string;
  leadContainer?: string;
  leadGlow?: string;
  leadTitle?: string;
  leadInput?: string;
  leadButton?: string;
  leadUnlocked?: string;
};

export interface ProjectConfig {
  name: string;
  name_zh?: string;
  expert_identity?: string;
  style: string;
  description: string;
  description_zh?: string;
  h1?: string;
  h1_zh?: string;
  subtitle?: string;
  subtitle_zh?: string;
  cta_text?: string;
  cta_text_zh?: string;
  input_placeholder?: string;
  input_placeholder_zh?: string;
  is_validation_mode?: boolean;
  // Robustness: All modules are optional
  features?: FeatureModuleProps['features'];
  benefits?: BenefitModuleProps['benefits'];
  stats?: StatModuleProps['stats'];
  testimonials?: TestimonialModuleProps['testimonials'];
  pricing?: PricingModuleProps['config'];
  faq?: FAQModuleProps['items'];
  inspiration?: InspirationModuleProps['items'];
  preset_tags?: string[];
  preset_tags_zh?: string[];
  advanced_options?: HeroModuleProps['advancedOptions'];
  theme_config?: ThemeConfig;
}
