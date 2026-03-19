'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, ChefHat, Sparkles, Share2, Bookmark, Play, RotateCcw, Lock, ArrowRight, Clock, Flame, Twitter, FileText, Shield } from 'lucide-react';
import { LeadMagnet } from '@/components/LeadMagnet';

interface FridgeHeroToolProps {
  projectId?: string;
  projectName?: string;
  slug?: string;
  referralDomain?: string;
  themeConfig?: any;
  expertIdentity?: string;
  locale?: string;
}

const DEMO_RECIPES_EN = [
  { ingredients: ['Rice', 'Eggs', 'Scallions'], result: 'Golden Shrimp Fried Rice', emoji: '🍳' },
  { ingredients: ['Potato', 'Carrot', 'Beef'], result: 'Braised Beef Stew', emoji: '🥘' },
  { ingredients: ['Toast', 'Eggs', 'Milk'], result: 'French Toast', emoji: '🥪' },
];

const DEMO_RECIPES_ZH = [
  { ingredients: ['剩米饭', '鸡蛋', '葱花'], result: '黄金虾仁炒饭', emoji: '🍳' },
  { ingredients: ['土豆', '胡萝卜', '牛肉'], result: '秘制红烧牛肉', emoji: '🥘' },
  { ingredients: ['吐司', '鸡蛋', '牛奶'], result: '法式西多士', emoji: '🥪' },
];

const PROGRESS_STEPS_EN = [
  { text: 'Scanning fridge dimensions...', duration: 800 },
  { text: 'Identifying mysterious ingredients...', duration: 700 },
  { text: 'Summoning Michelin chef...', duration: 600 },
  { text: 'Creating magic recipe...', duration: 900 },
];

const PROGRESS_STEPS_ZH = [
  { text: '正在扫描冰箱维度...', duration: 800 },
  { text: '识别神秘酱料中...', duration: 700 },
  { text: '召唤米其林大厨...', duration: 600 },
  { text: '生成魔法菜谱...', duration: 900 },
];
const TRANSLATIONS = {
  en: {
    tagline: 'The ultimate magic to solve "What\'s for dinner?"',
    title: 'Snap Your Fridge,',
    titleHighlight: 'AI Becomes Your Michelin Chef in Seconds',
    subtitle: 'Photo-recognize ingredients, get delicious recipes instantly',
    uploadTitle: 'Upload Fridge Photo',
    uploadDesc: 'Click or drag image here',
    uploadFormat: 'Supports JPG, PNG',
    freeLimit: 'Free',
    daily: 'times daily',
    aiPowered: 'AI-Powered',
    magicTitle: 'Today\'s Magic Transformations ✨',
    previewTitle: 'Your Ingredients',
    remainingUses: 'Remaining uses today:',
    limitReached: 'Daily limit reached',
    startMagic: 'Start AI Magic',
    changePhoto: 'Change Photo',
    analyzingTitle: 'AI Chef is Working Magic ✨',
    analyzingComplete: 'Complete',
    ingredientsTitle: 'Ingredients',
    stepsTitle: 'Instructions',
    tipsTitle: 'Tips',
    shareButton: 'Share Result',
    saveButton: 'Save to My Recipes',
    retryButton: 'Try Again',
    shareText: (title: string) => `I discovered these ingredients in my fridge, and AI chef made ${title}! #FridgeChefChallenge`,
    defaultRecipeTitle: 'Magic Recipe Created!',
    shareTitleDefault: 'Magic Recipe',
    shareTextDefault: 'a delicious dish',
    prompt: 'You are a professional chef. Analyze these ingredients and create a delicious recipe.',
    footerLeft: 'By using this tool, you agree to our',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    footerRight: 'Share on',
  },
  zh: {
    tagline: '解决"今晚吃啥"的终极魔法',
    title: '拍一下冰箱，',
    titleHighlight: 'AI 秒变米其林大厨',
    subtitle: '拍照识别冰箱食材，秒出美味菜谱',
    uploadTitle: '上传冰箱照片',
    uploadDesc: '点击或拖拽图片到这里',
    uploadFormat: '支持 JPG、PNG 格式',
    freeLimit: '每日免费',
    daily: '次',
    aiPowered: 'AI 智能识别',
    magicTitle: '今日神奇变身 ✨',
    previewTitle: '你的食材',
    remainingUses: '今日剩余次数:',
    limitReached: '已达每日上限',
    startMagic: '开始 AI 魔法',
    changePhoto: '重新选择图片',
    analyzingTitle: 'AI 大厨正在施展魔法 ✨',
    analyzingComplete: '完成',
    ingredientsTitle: '食材清单',
    stepsTitle: '烹饪步骤',
    tipsTitle: '小贴士',
    shareButton: '分享成果',
    saveButton: '保存到我的食谱',
    retryButton: '再试一次',
    shareText: (title: string) => `我的冰箱里发现了这些食材，AI 大厨做出了 ${title}！#FridgeChefChallenge`,
    defaultRecipeTitle: '魔法料理诞生！',
    shareTitleDefault: '魔法菜谱',
    shareTextDefault: '美味佳肴',
    prompt: '你是一位专业的米其林大厨，分析这些食材并创造一份美味的食谱。',
    footerLeft: '使用本工具即表示您同意我们的',
    terms: '用户协议',
    privacy: '隐私政策',
    footerRight: '分享到',
  },
};
export function FridgeHeroTool({
  projectId = 'fridgechef',
  projectName = 'FridgeChef AI',
  slug = 'fridgechef-ai',
  referralDomain = 'fridgechef.vercel.app',
  themeConfig,
  expertIdentity,
  locale = 'zh',
}: FridgeHeroToolProps) {
  const [step, setStep] = useState<'hero' | 'preview' | 'analyzing' | 'result'>('hero');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [progressText, setProgressText] = useState('');
  const [progress, setProgress] = useState(0);
  const [recipeResult, setRecipeResult] = useState<any>(null);
  const [showLeadMagnet, setShowLeadMagnet] = useState(false);
  const [dailyUsage, setDailyUsage] = useState(0);
  const [freeLimit] = useState(3);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = TRANSLATIONS[locale as 'en' | 'zh'] || TRANSLATIONS.zh;
  const demoRecipes = locale === 'en' ? DEMO_RECIPES_EN : DEMO_RECIPES_ZH;
  const progressSteps = locale === 'en' ? PROGRESS_STEPS_EN : PROGRESS_STEPS_ZH;

  useEffect(() => {
    const saved = localStorage.getItem('fridgechef_daily_usage');
    const today = new Date().toDateString();
    const savedData = saved ? JSON.parse(saved) : { date: today, count: 0 };
    if (savedData.date !== today) {
      setDailyUsage(0);
      localStorage.setItem('fridgechef_daily_usage', JSON.stringify({ date: today, count: 0 }));
    } else {
      setDailyUsage(savedData.count);
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result as string);
          setStep('preview');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = async () => {
    if (!uploadedImage) return;
    if (dailyUsage >= freeLimit) {
      setShowLeadMagnet(true);
      return;
    }
    const today = new Date().toDateString();
    const newCount = dailyUsage + 1;
    setDailyUsage(newCount);
    localStorage.setItem('fridgechef_daily_usage', JSON.stringify({ date: today, count: newCount }));
    setStep('analyzing');
    setProgress(0);
    setProgressText(progressSteps[0].text);
    for (let i = 0; i < progressSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, progressSteps[i].duration));
      setProgress(Math.round(((i + 1) / progressSteps.length) * 100));
      if (i < progressSteps.length - 1) setProgressText(progressSteps[i + 1].text);
    }
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: uploadedImage, prompt: expertIdentity || t.prompt, locale }),
      });
      if (!response.ok) throw new Error('API call failed');
      const data = await response.json();
      setRecipeResult(data);
      setStep('result');
    } catch (error) {
      console.error('Analysis failed:', error);
      setStep('preview');
    }
  };

  const handleReset = () => {
    setStep('hero');
    setUploadedImage(null);
    setRecipeResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSaveRecipe = () => setShowLeadMagnet(true);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `🍳 ${recipeResult?.title || t.shareTitleDefault}`,
        text: t.shareText(recipeResult?.title || t.shareTextDefault),
        url: window.location.href,
      });
    }
  };

  const handleShareToX = () => {
    const text = encodeURIComponent(t.shareText(recipeResult?.title || t.shareTextDefault));
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };
  if (showLeadMagnet) {
    return (<LeadMagnet projectId={projectId} projectName={projectName} slug={slug} referralDomain={referralDomain} themeConfig={themeConfig} onClose={() => setShowLeadMagnet(false)} />);
  }

  if (step === 'analyzing') {
    return (
      <section className="min-h-[90vh] flex flex-col items-center justify-center py-12 bg-gradient-to-b from-orange-50 via-amber-50 to-yellow-50">
        <div className="container mx-auto max-w-[1280px] px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8"><ChefHat className="w-24 h-24 mx-auto text-orange-500 animate-bounce" /></div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.analyzingTitle}</h2>
            <p className="text-gray-600 mb-8">{progressText}</p>
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-orange-100">
              <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-sm text-gray-500">{progress}% {t.analyzingComplete}</p>
            </div>
            {uploadedImage && <div className="mt-8"><img src={uploadedImage} alt="Your ingredients" className="w-48 h-48 object-cover rounded-2xl mx-auto shadow-lg" /></div>}
          </div>
        </div>
      </section>
    );
  }

  if (step === 'result' && recipeResult) {
    return (
      <section className="min-h-[90vh] py-12 bg-gradient-to-b from-orange-50 via-amber-50 to-yellow-50">
        <div className="container mx-auto max-w-[1280px] px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-[2rem] shadow-2xl border border-orange-100 overflow-hidden">
              {uploadedImage && (<div className="relative"><img src={uploadedImage} alt="Ingredients" className="w-full h-64 object-cover" /><div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"><span className="text-orange-600 font-medium">#FridgeChefChallenge</span></div></div>)}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4"><Sparkles className="w-8 h-8 text-amber-500" /><h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">{recipeResult.title || t.defaultRecipeTitle}</h2></div>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-orange-50 rounded-2xl p-6"><h3 className="text-lg font-bold text-orange-700 mb-4 flex items-center gap-2"><span>🥗</span> {t.ingredientsTitle}</h3><ul className="space-y-2">{(recipeResult.ingredients || []).map((item: string, idx: number) => (<li key={idx} className="flex items-center gap-2 text-gray-700"><span className="w-2 h-2 bg-orange-400 rounded-full" />{item}</li>))}</ul></div>
                  <div><h3 className="text-lg font-bold text-orange-700 mb-4 flex items-center gap-2"><span>👨‍</span> {t.stepsTitle}</h3><div className="space-y-4">{recipeResult.instructions?.split('\n').filter(Boolean).map((step: string, idx: number) => (<div key={idx} className="flex gap-4"><div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 text-orange-600 font-bold">{idx + 1}</div><p className="text-gray-700">{step}</p></div>))}</div></div>
                </div>
                {recipeResult.tips && (<div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8"><h3 className="text-lg font-bold text-amber-700 mb-2 flex items-center gap-2"><Flame className="w-5 h-5" /> {t.tipsTitle}</h3><p className="text-gray-700">{recipeResult.tips}</p></div>)}
                <div className="flex flex-wrap gap-4">
                  <button onClick={handleShare} className="flex-1 min-w-[200px] bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"><Share2 className="w-5 h-5" />{t.shareButton}</button>
                  <button onClick={handleSaveRecipe} className="flex-1 min-w-[200px] bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-4 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"><Lock className="w-5 h-5" />{t.saveButton}</button>
                  <button onClick={handleReset} className="flex-1 min-w-[200px] border-2 border-orange-500 text-orange-500 px-6 py-4 rounded-full font-medium hover:bg-orange-50 transition-all flex items-center justify-center gap-2"><RotateCcw className="w-5 h-5" />{t.retryButton}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (step === 'preview' && uploadedImage) {
    return (
      <section className="min-h-[90vh] flex flex-col items-center justify-center py-12 bg-gradient-to-b from-orange-50 to-amber-50">
        <div className="container mx-auto max-w-[1280px] px-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-[2rem] shadow-2xl border border-orange-100 overflow-hidden p-6">
              <img src={uploadedImage} alt="Preview" className="w-full h-80 object-cover rounded-2xl mb-6" />
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-gray-600"><Clock className="w-5 h-5" /><span>{t.remainingUses} {freeLimit - dailyUsage}/{freeLimit}</span></div>
                {dailyUsage >= freeLimit && <span className="text-red-500 text-sm font-medium">{t.limitReached}</span>}
              </div>
              <button onClick={startAnalysis} disabled={dailyUsage >= freeLimit} className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"><Play className="w-6 h-6" />{t.startMagic}<ArrowRight className="w-6 h-6" /></button>
              <button onClick={handleReset} className="w-full mt-4 text-gray-500 hover:text-gray-700">{t.changePhoto}</button>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center py-12 bg-gradient-to-b from-orange-50 via-amber-50 to-yellow-50">
      <div className="container mx-auto max-w-[1280px] px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">{t.tagline}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t.title}<br />
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              {t.titleHighlight}
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">{t.subtitle}</p>
          <div onClick={() => fileInputRef.current?.click()} className="border-4 border-dashed border-orange-200 rounded-[2rem] p-12 cursor-pointer hover:border-orange-400 hover:bg-orange-50/50 transition-all group">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Upload className="w-12 h-12 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.uploadTitle}</h3>
            <p className="text-gray-600 mb-4">{t.uploadDesc}</p>
            <p className="text-sm text-orange-600 font-medium">{t.uploadFormat}</p>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </div>
          <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-500">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {t.freeLimit} {freeLimit} {t.daily}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><ChefHat className="w-4 h-4" /> {t.aiPowered}</span>
          </div>
        </div>
        <div className="mt-16">
          <h3 className="text-center text-lg font-bold text-gray-700 mb-8">{t.magicTitle}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {demoRecipes.map((demo, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{demo.emoji}</div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {demo.ingredients.map((ing, i) => (
                    <span key={i} className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm">{ing}</span>
                  ))}
                </div>
                <div className="text-gray-400 text-sm">→</div>
                <div className="font-bold text-orange-600">{demo.result}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-orange-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FileText className="w-4 h-4" />
              <span>{t.footerLeft}</span>
              <a href="/terms" className="text-orange-600 hover:underline">{t.terms}</a>
              <span>&</span>
              <a href="/privacy" className="text-orange-600 hover:underline">{t.privacy}</a>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{t.footerRight}</span>
              <button onClick={handleShareToX} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-all">
                <Twitter className="w-4 h-4" />
                <span className="text-sm font-medium">X</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}