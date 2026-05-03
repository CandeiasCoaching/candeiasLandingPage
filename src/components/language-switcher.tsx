"use client";

import { useLanguage, type Locale } from "./language-provider";

const localeLabels: Record<Locale, string> = {
  en: "EN",
  nl: "NL",
};

const switcherCopy = {
  en: {
    changeLanguage: "Change language",
    localeNames: {
      en: "English",
      nl: "Dutch",
    },
  },
  nl: {
    changeLanguage: "Verander taal",
    localeNames: {
      en: "Engels",
      nl: "Nederlands",
    },
  },
} satisfies Record<Locale, { changeLanguage: string; localeNames: Record<Locale, string> }>;

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const copy = switcherCopy[locale];

  return (
    <div className="fixed bottom-20 right-4 z-30 rounded-full border border-white/10 bg-black/65 p-1 text-[11px] uppercase tracking-[0.24em] text-white/70 shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur md:bottom-20 md:right-6">
      <div className="flex items-center gap-1">
        {(["en", "nl"] as const).map((item) => {
          const isActive = item === locale;

          return (
            <button
              key={item}
              type="button"
              aria-pressed={isActive}
              aria-label={`${copy.changeLanguage}: ${copy.localeNames[item]}`}
              className={`rounded-full px-3 py-2 transition ${
                isActive ? "bg-white text-black" : "text-white/70 hover:text-white"
              }`}
              onClick={() => setLocale(item)}
            >
              {localeLabels[item]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
