"use client";

import { useLanguage } from "@/components/language-provider";
import { siteCopy } from "@/components/site-copy";

export default function ProgramsPage() {
  const { locale } = useLanguage();
  const copy = siteCopy[locale].pages.programs;

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold">{copy.title}</h1>
        <p className="mt-4 text-white/70">
          {copy.description}
        </p>
      </div>
    </main>
  );
}
