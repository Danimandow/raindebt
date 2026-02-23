import React, { createContext, useState, useCallback } from "react";
import type { Locale, TranslationFunction } from "@/types/i18n";
import { getDeviceLocale, createTranslationFunction } from "@/i18n";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationFunction;
}

const defaultLocale = getDeviceLocale();
export const I18nContext = createContext<I18nContextType>({
  locale: defaultLocale, setLocale: () => {}, t: createTranslationFunction(defaultLocale),
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [t, setT] = useState<TranslationFunction>(() => createTranslationFunction(defaultLocale));

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    setT(() => createTranslationFunction(newLocale));
  }, []);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}
