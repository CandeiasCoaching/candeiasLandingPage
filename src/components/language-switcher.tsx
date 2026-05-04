"use client";

import { useLanguage, type Locale } from "./language-provider";

function FlagIcon({ locale }: { locale: Locale }) {
  if (locale === "en") {
    return (
      <svg viewBox="0 0 24 16" className="h-3.5 w-5" aria-hidden="true">
        <rect width="24" height="16" fill="#1f3f95" />
        <path d="M0 0 L24 16 M24 0 L0 16" stroke="#fff" strokeWidth="4" />
        <path d="M0 0 L24 16 M24 0 L0 16" stroke="#c8102e" strokeWidth="2" />
        <rect x="10" width="4" height="16" fill="#fff" />
        <rect y="6" width="24" height="4" fill="#fff" />
        <rect x="11" width="2" height="16" fill="#c8102e" />
        <rect y="7" width="24" height="2" fill="#c8102e" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 16" className="h-3.5 w-5" aria-hidden="true">
      <rect width="24" height="16" fill="#ffffff" />
      <rect width="24" height="5.33" fill="#ae1c28" />
      <rect y="10.67" width="24" height="5.33" fill="#21468b" />
    </svg>
  );
}

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

type LanguageSwitcherProps = {
  className?: string;
};

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();
  const copy = switcherCopy[locale];

  return (
    <div
      className={`inline-flex rounded-full border border-white/10 bg-black/65 p-1 text-white/70 shadow-[0_10px_24px_rgba(0,0,0,0.25)] backdrop-blur ${className ?? ""}`}
    >
      <div className="flex items-center gap-1">
        {(["en", "nl"] as const).map((item) => {
          const isActive = item === locale;

          return (
            <button
              key={item}
              type="button"
              aria-pressed={isActive}
              aria-label={`${copy.changeLanguage}: ${copy.localeNames[item]}`}
              className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition ${
                isActive
                  ? "border border-white/60 bg-white/15"
                  : "border border-transparent hover:border-white/35"
              }`}
              onClick={() => setLocale(item)}
            >
              <FlagIcon locale={item} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
