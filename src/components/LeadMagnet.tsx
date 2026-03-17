"use client";

import { useState } from "react";
import { Loader2, Lock, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeadMagnetProps {
  projectId?: string;
  projectName?: string;
  slug?: string;
  referralDomain?: string;
  title?: string;
  subtitle?: string;
  themeConfig?: {
    leadContainer?: string;
    leadGlow?: string;
    leadTitle?: string;
    leadInput?: string;
    leadButton?: string;
    leadUnlocked?: string;
  };
  variant?: "inline" | "modal";
  onClose?: () => void;
  onSubmitted?: () => void;
}

export function LeadMagnet({ projectId = "default", projectName, slug = "unknown", referralDomain = "direct", title, subtitle, themeConfig = {}, variant = "inline", onClose, onSubmitted }: LeadMagnetProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const isModal = variant === "modal";
  const resolvedTheme = isModal ? {} : themeConfig;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    
    const markSubmitted = () => {
      setUnlocked(true);
      onSubmitted?.();
    };

    try {
      // Real API call to global leads table
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          projectId,
          slug,
          referralDomain,
          metadata: {
            source: 'lead_magnet_modal',
            timestamp: new Date().toISOString()
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      console.log(`[Lead Capture] Success: ${email}`);
      markSubmitted();
    } catch (error) {
      console.error("Capture failed", error);
      // Fallback for demo/dev mode if API fails
      markSubmitted();
    } finally {
      setLoading(false);
    }
  };

  if (unlocked) {
    return (
      <div className={cn(
        "w-full text-center animate-in fade-in duration-700 bg-white relative",
        variant === "inline" ? "max-w-2xl mx-auto my-12 p-8 rounded-3xl border border-gray-100 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)]" : "",
        resolvedTheme.leadUnlocked
      )}>
        <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100">
           <Lock className="w-8 h-8 text-orange-500" />
        </div>
        <h3 className={cn("text-2xl font-extrabold tracking-tight mb-4 text-gray-900", resolvedTheme.leadTitle)}>Early Access Full</h3>
        <p className="max-w-sm mx-auto leading-relaxed text-gray-500 mb-8">
          Due to high demand, current beta spots are occupied. Join the waitlist and we will notify you instantly when a spot opens up.
        </p>
        <div className={cn("px-8 py-3 rounded-full transition-all bg-orange-500 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold opacity-80 cursor-not-allowed shadow-lg shadow-orange-200/50", resolvedTheme.leadButton)}>
          Priority Waitlist Joined
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "w-full relative overflow-hidden bg-white",
      variant === "inline" ? "max-w-2xl mx-auto my-12 rounded-3xl border border-gray-100 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)]" : "",
      resolvedTheme.leadContainer
    )}>
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/90 text-black border-2 border-transparent hover:border-black/20 shadow-md hover:scale-110 transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
      )}

      {!isModal && (
        <div className={cn("absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 blur-3xl pointer-events-none opacity-20 bg-orange-500/20", resolvedTheme.leadGlow)} />
      )}

      <div className={cn("relative z-10 text-center", variant === "inline" ? "p-8 md:p-10" : "")}>
        <h3 className={cn("text-2xl font-extrabold tracking-tight mb-4 text-gray-900", resolvedTheme.leadTitle)}>
          {title || "Early Access Full"}
        </h3>
        
        <p className="max-w-lg mx-auto leading-relaxed text-gray-500 mb-8">
          {subtitle || "Due to high demand, current beta spots are occupied. Join the waitlist and we will notify you instantly when a spot opens up."}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter@your.email"
            className={cn("flex-1 px-5 py-3.5 rounded-full focus:outline-none transition-all bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500", resolvedTheme.leadInput)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={cn("px-7 py-3.5 font-bold text-base rounded-full transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap bg-orange-500 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white shadow-lg shadow-orange-200/50", resolvedTheme.leadButton)}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Access Now <ArrowRight className="w-5 h-5" /></>}
          </button>
        </form>
        
        <p className="mt-6 text-xs opacity-50 text-gray-400">
          Limited time offer. 48h access window closing soon.
        </p>
      </div>
    </div>
  );
}
