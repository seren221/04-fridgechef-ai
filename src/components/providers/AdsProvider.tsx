'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdsContextType {
  isPro: boolean;
  setIsPro: (value: boolean) => void;
}

const AdsContext = createContext<AdsContextType | undefined>(undefined);

export function AdsProvider({ children }: { children: React.ReactNode }) {
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    // Check local storage or cookie for pro status
    // For now, we default to false (show ads)
    const storedStatus = localStorage.getItem('is_pro');
    if (storedStatus === 'true') {
      setIsPro(true);
    }
  }, []);

  return (
    <AdsContext.Provider value={{ isPro, setIsPro }}>
      {children}
    </AdsContext.Provider>
  );
}

export function useAds() {
  const context = useContext(AdsContext);
  if (context === undefined) {
    throw new Error('useAds must be used within an AdsProvider');
  }
  return context;
}
