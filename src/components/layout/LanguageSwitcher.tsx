
'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { locales, localeLabels, Locale } from '@/config/i18n';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-9 px-3 text-sm text-gray-500 font-medium transition-colors hover:text-gray-900 data-[state=open]:text-gray-900"
        >
          <Globe className="mr-2 h-4 w-4 opacity-70" />
          <span className="font-geist">{localeLabels[locale as Locale]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-[150px] bg-black/80 backdrop-blur-md border-white/10 text-white shadow-xl animate-in fade-in zoom-in-95 duration-200"
      >
        {locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => handleLocaleChange(l)}
            className={cn(
              "cursor-pointer font-geist text-sm transition-colors focus:bg-white/10 focus:text-white",
              locale === l && "bg-white/10 text-white font-medium"
            )}
          >
            {localeLabels[l]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
