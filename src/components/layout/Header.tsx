"use client";

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const t = useTranslations('HomePage');

  return (
    <header className="sticky top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="container mx-auto max-w-[1280px] px-8 h-12 md:h-[48px] flex items-center">
        <a href="#top" className="text-lg font-semibold text-gray-900 shrink-0">
          {t('title')}
        </a>
        <nav className="hidden md:flex flex-1 items-center justify-center gap-8 text-sm text-gray-500 font-medium">
          <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-gray-900 transition-colors">FAQ</a>
          <Link href="/docs" className="hover:text-gray-900 transition-colors">Docs</Link>
          <button className="hover:text-gray-900 transition-colors" type="button">AI Tools 🔽</button>
        </nav>
        <div className="flex items-center gap-3 shrink-0 ml-auto">
          <LanguageSwitcher />
          <button className="text-sm text-gray-500 font-medium hover:text-gray-900 transition-colors">Login</button>
        </div>
      </div>
    </header>
  );
}
