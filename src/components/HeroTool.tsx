'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { Settings2, ChevronDown } from 'lucide-react';
import { LeadMagnet } from '@/components/LeadMagnet';

export interface AdvancedOption {
  id: string;
  label: string;
  type: 'select' | 'switch' | 'input';
  options?: string[];
  default?: any;
}

interface HeroToolProps {
  title: string;
  description: string;
  placeholder?: string;
  ctaText?: string;
  presetTags?: string[];
  advancedOptions?: AdvancedOption[];
  onOpenModal?: () => void;
  themeConfig?: any;
  externalInput?: string;
  leadMagnetProps?: {
    projectId?: string;
    projectName?: string;
    slug?: string;
    referralDomain?: string;
    themeConfig?: any;
  };
  openLeadModalSignal?: number;
}

export function HeroTool({
  title,
  description,
  placeholder,
  ctaText,
  presetTags = [],
  advancedOptions = [],
  onOpenModal,
  themeConfig,
  externalInput,
  leadMagnetProps,
  openLeadModalSignal = 0,
}: HeroToolProps) {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [optionsState, setOptionsState] = useState<any>({});
  const intervalRef = useRef<number | null>(null);
  const t = useTranslations('HomePage');

  // Initialize default options
  useEffect(() => {
    if (advancedOptions.length > 0) {
      const defaults: any = {};
      advancedOptions.forEach(opt => {
        defaults[opt.id] = opt.default;
      });
      setOptionsState(defaults);
    }
  }, [advancedOptions]);

  // Sync external input (e.g., from Inspiration Gallery)
  useEffect(() => {
    if (externalInput) {
      setInputValue(externalInput);
    }
  }, [externalInput]);

  useEffect(() => {
    if (openLeadModalSignal > 0) {
      setShowLeadModal(true);
      setIsSubmitted(false);
    }
  }, [openLeadModalSignal]);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const closeLeadModal = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsLoading(false);
    setProgress(0);
    setShowLeadModal(false);
    setIsSubmitted(false);
  };

  const handleGenerateClick = () => {
    if (!inputValue.trim()) return;
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsLoading(true);
    setProgress(1);
    const startTime = Date.now();
    intervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min(99, Math.floor(1 + (98 * elapsed) / 2000));
      setProgress(nextProgress);
      if (elapsed >= 2000) {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsLoading(false);
        setShowLeadModal(true);
        setIsSubmitted(false);
        onOpenModal?.();
      }
    }, 20);
  };

  const handleTagClick = (tag: string) => {
    setInputValue(tag);
  };

  const handleOptionChange = (id: string, value: any) => {
    setOptionsState((prev: any) => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <section className="min-h-[90vh] flex flex-col justify-center py-12 bg-white">
      <div className="container mx-auto max-w-[1280px] px-8">
        
        {/* 标题 */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-gray-900">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
        
        {/* === 核心工具仪表盘 === */}
        <div className="mx-auto max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          
          {/* 上半部分：纯净输入区 */}
          <div className="relative">
            <textarea
              className="w-full min-h-[200px] bg-transparent p-8 border-none focus:ring-0 resize-none text-base placeholder:text-gray-400 text-gray-900"
              placeholder={placeholder || "Paste your Amazon suspension notice or describe your issue here (e.g., Section 3, ODR)..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleGenerateClick();
                }
              }}
            ></textarea>
            
            {/* 字数统计 (可选) */}
            <div className="absolute bottom-4 right-6 text-xs text-gray-300 pointer-events-none">
              {inputValue.length} chars
            </div>
          </div>
          
          <div className="bg-gray-50/80 p-6 border-t border-gray-100 flex items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {advancedOptions.length > 0 && (
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors px-2 py-1.5"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  <span>Settings</span>
                  <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", showAdvanced ? "rotate-180" : "")} />
                </button>
              )}
              {presetTags.length > 0 && !isLoading && (
                <div className="flex flex-wrap gap-2">
                  {presetTags.map((tag) => (
                    <button
                      key={tag}
                      className="px-3 py-1.5 bg-white border border-gray-200 hover:border-orange-200 hover:bg-orange-50/50 hover:text-orange-700 rounded-lg text-xs font-medium transition-all"
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={handleGenerateClick}
              disabled={isLoading || !inputValue.trim()}
              data-testid="generate-button"
              className="w-full sm:w-auto px-10 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold shadow-lg shadow-orange-200/50 transition-all disabled:opacity-80 disabled:cursor-not-allowed"
            >
              {isLoading ? <span>Generating... {progress}%</span> : <span>{ctaText || "Generate Winning Appeal"}</span>}
            </button>
          </div>
          
          {/* 高级设置面板 (展开) */}
          {showAdvanced && advancedOptions.length > 0 && (
            <div className="bg-gray-50 border-t border-gray-100 px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-2">
               {advancedOptions.map((opt) => (
                  <div key={opt.id} className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-500 uppercase">{opt.label}</label>
                    {opt.type === 'select' ? (
                      <select 
                        className="w-full text-sm bg-white border border-gray-200 rounded-md px-3 py-2 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none"
                        onChange={(e) => handleOptionChange(opt.id, e.target.value)}
                        defaultValue={opt.default}
                      >
                        {opt.options?.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input 
                        type="text" 
                        className="w-full text-sm bg-white border border-gray-200 rounded-md px-3 py-2 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none"
                        onChange={(e) => handleOptionChange(opt.id, e.target.value)}
                      />
                    )}
                  </div>
               ))}
            </div>
          )}
          
        </div>
        
      </div>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm p-4">
          <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg blur-md">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5 mb-4"></div>
            </div>
          </div>
          <div className="relative z-10 bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 w-full max-w-md text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI is drafting your appeal...</h3>
            <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2 overflow-hidden">
              <div className="bg-orange-500 h-2.5 rounded-full transition-[width] duration-75 linear" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-sm text-gray-500 font-medium">{progress}% Complete</p>
          </div>
        </div>
      )}
      {showLeadModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" onClick={closeLeadModal}></div>
          <div className="relative w-full max-w-lg bg-white rounded-[2rem] p-10 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] border border-gray-50 transform transition-all" data-submitted={isSubmitted}>
            <button 
              onClick={closeLeadModal} 
              data-testid="lead-modal-close"
              className="absolute top-4 right-4 z-20 text-gray-300 hover:text-gray-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <LeadMagnet
              {...leadMagnetProps}
              variant="modal"
              onSubmitted={() => setIsSubmitted(true)}
            />
          </div>
        </div>
      )}
    </section>
  );
}
