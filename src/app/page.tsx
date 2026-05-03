'use client';

import { siteCopy } from '@/components/site-copy';
import { useLanguage } from '@/components/language-provider';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

type PlanDetailCard = {
  title: string;
  features: string[];
  price?: string;
};

type ReviewItem = {
  name: string;
  rating: number;
  ago: string;
  text: string;
};

type SectionId = 'home' | 'plans' | 'starter' | 'standard' | 'first-block' | 'about';

export default function Home() {
  const { locale } = useLanguage();
  const copy = siteCopy[locale];
  const [activeReview, setActiveReview] = useState(0);
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [plansPanel, setPlansPanel] = useState<'summary' | 'details'>('summary');
  const [contactExpanded, setContactExpanded] = useState(false);

  const mainRef = useRef<HTMLDivElement | null>(null);
  const homeRef = useRef<HTMLElement | null>(null);
  const plansRef = useRef<HTMLElement | null>(null);
  const starterRef = useRef<HTMLElement | null>(null);
  const standardRef = useRef<HTMLElement | null>(null);
  const moreRef = useRef<HTMLButtonElement | null>(null);
  const firstBlockRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);

  const reviews = useMemo<ReviewItem[]>(
    () =>
      locale === 'nl'
        ? [
            {
              name: 'Milan V.',
              rating: 5,
              ago: '2 weken geleden',
              text: 'Stef is scherp, duidelijk en motiveert op de juiste manier. Ik ben sterker en fitter dan ooit.',
            },
            {
              name: 'Sanne K.',
              rating: 5,
              ago: '1 maand geleden',
              text: 'Eindelijk een schema dat ik echt volhoud. Persoonlijke begeleiding is top en super praktisch.',
            },
            {
              name: 'Ruben D.',
              rating: 5,
              ago: '3 maanden geleden',
              text: 'Veel resultaat zonder onnodige onzin. Voeding en training sluiten perfect op elkaar aan.',
            },
          ]
        : [
            {
              name: 'Milan V.',
              rating: 5,
              ago: '2 weeks ago',
              text: 'Stef is clear, focused, and pushes you in the right way. I am stronger and fitter than ever.',
            },
            {
              name: 'Sanne K.',
              rating: 5,
              ago: '1 month ago',
              text: 'Finally a plan I can stick to. The personal guidance is excellent and very practical.',
            },
            {
              name: 'Ruben D.',
              rating: 5,
              ago: '3 months ago',
              text: 'Great results without the nonsense. Nutrition and training fit together perfectly.',
            },
          ],
    [locale]
  );

  const additionalPlans: PlanDetailCard[] = [
    copy.home.planDetails.advanced,
    copy.home.planDetails.premium,
    copy.home.planDetails.online4,
    copy.home.planDetails.online12,
    copy.home.planDetails.friendsFamily,
    copy.home.planDetails.tenSessions,
    copy.home.planDetails.varia,
  ];

  const scrollToSection = (section: SectionId) => {
    if (section === 'plans' || section === 'starter' || section === 'standard') {
      setPlansPanel('summary');
    }

    setActiveSection(section);
    const sectionRef = {
      home: homeRef,
      plans: plansRef,
      starter: starterRef,
      standard: standardRef,
      'first-block': firstBlockRef,
      about: aboutRef,
    }[section];

    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const sectionRef = {
      home: homeRef,
      plans: plansRef,
      starter: starterRef,
      standard: standardRef,
      'first-block': firstBlockRef,
      about: aboutRef,
    }[activeSection];

    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [activeSection]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveReview((index) => (index + 1) % reviews.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [reviews.length]);

  const revealPlanDetails = () => {
    setPlansPanel('details');
    setActiveSection('plans');
    plansRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main
      ref={mainRef}
      className="relative h-[100svh] overflow-y-auto snap-y md:h-screen md:snap-mandatory text-white"
      style={{
        backgroundImage: "url('/mockup/bgtexture.jpg')",
        backgroundSize: '2000px 2000px',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
      }}
    >
      <header className="relative z-20">
        <nav className="fixed left-0 right-0 top-0 z-20 border-y border-white/15 bg-black/78 px-4 py-4 text-sm text-white/70 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur md:px-6 md:py-5">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <button
              className="group flex items-center justify-center gap-4 self-center text-left md:justify-start"
              onClick={() => {
                scrollToSection('home');
              }}
            >
              <Image
                src="/mockup/logo2.png"
                alt={copy.home.logoAlt}
                width={472}
                height={376}
                priority
                className="h-auto w-14 shrink-0 drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition duration-300 group-hover:scale-[1.04] md:w-[4.5rem]"
              />
              <div className="flex flex-col items-start">
                <span className="font-serif text-xl uppercase tracking-[0.18em] text-white md:text-2xl">
                  Candeias
                </span>
                <span className="text-[10px] uppercase tracking-[0.38em] text-white/60 md:text-[11px]">
                  Coaching
                </span>
              </div>
            </button>
            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] uppercase tracking-[0.22em] md:justify-end md:gap-8 md:text-xs md:tracking-[0.25em]">
              <button
                className="transition hover:text-white"
              onClick={() => {
                  scrollToSection('home');
                }}
              >
                {copy.nav.home}
              </button>
              <div className="group relative">
                <button
                  className="transition hover:text-white focus:text-white"
                  onClick={() => scrollToSection('plans')}
                >
                  {copy.nav.plans}
                </button>
                <div className="invisible absolute left-1/2 top-full z-30 min-w-36 -translate-x-1/2 pt-3 text-center opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="border border-white/10 bg-black/90 p-2 shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur">
                    {[
                    { label: copy.nav.starter, section: 'starter' as const },
                    { label: copy.nav.standard, section: 'standard' as const },
                  ].map((item) => (
                    <button
                      key={item.section}
                        className="block w-full px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-white/65 transition hover:text-white"
                        onClick={() => scrollToSection(item.section)}
                      >
                      {item.label}
                    </button>
                  ))}
                    <button
                      className="block w-full px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-white/65 transition hover:text-white"
                      onClick={revealPlanDetails}
                    >
                      {copy.nav.more}
                    </button>
                  </div>
                </div>
              </div>
              <button
                className="transition hover:text-white"
                onClick={() => scrollToSection('first-block')}
              >
                {copy.nav.firstBlock}
              </button>
              <button
                className="transition hover:text-white"
                onClick={() => scrollToSection('about')}
              >
                {copy.nav.about}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <section
        id="home"
        ref={homeRef}
        className="relative z-10 mx-auto flex min-h-[100svh] snap-start flex-col items-center justify-center px-6 pt-36 text-center scroll-mt-32 md:min-h-screen md:pt-40"
      >
        <div className="max-w-3xl">
          <p className="text-[10px] uppercase tracking-[0.46em] text-white/40 md:text-xs">
            Online Coaching
          </p>
        </div>
        <h1 className="mt-6 max-w-4xl text-[15px] font-semibold uppercase tracking-[0.28em] text-white/70 sm:text-[19px] sm:tracking-[0.32em]">
          {copy.home.heroTitle}
        </h1>
        <div className="relative z-10 mx-auto mt-10 w-full max-w-3xl px-6 pb-20">
          <p className="text-center text-[10px] uppercase tracking-[0.36em] text-white/50 md:text-xs">
            {locale === 'nl' ? 'Google Reviews' : 'Google Reviews'}
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-6 text-left shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-base font-bold text-black">
                  G
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">Candeias Coaching</p>
                  <p className="text-xs tracking-[0.1em] text-white/55">Google Business Profile</p>
                </div>
              </div>
              <a
                href="https://www.google.com/search?q=candeias+coaching"
                target="_blank"
                rel="noreferrer"
                className="text-[10px] uppercase tracking-[0.22em] text-white/60 transition hover:text-white"
              >
                {locale === 'nl' ? 'Bekijk alle' : 'View all'}
              </a>
            </div>

            <div className="mt-6 min-h-[10rem]">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-white">{reviews[activeReview].name}</p>
                <p className="text-xs text-white/45">{reviews[activeReview].ago}</p>
              </div>
              <p className="mt-2 text-sm tracking-[0.18em] text-[#fbbc04]">{'★'.repeat(reviews[activeReview].rating)}</p>
              <p className="mt-4 text-base leading-relaxed text-white/80">{reviews[activeReview].text}</p>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {reviews.map((review, index) => (
                  <button
                    key={review.name}
                    type="button"
                    aria-label={`Show review ${index + 1}`}
                    onClick={() => setActiveReview(index)}
                    className={`h-1.5 rounded-full transition ${
                      index === activeReview ? 'w-8 bg-white' : 'w-4 bg-white/25 hover:bg-white/55'
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/55">
                <button
                  type="button"
                  onClick={() => setActiveReview((index) => (index - 1 + reviews.length) % reviews.length)}
                  className="h-8 w-8 border border-white/15 text-white/80 transition hover:border-white/40 hover:text-white"
                  aria-label="Previous review"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => setActiveReview((index) => (index + 1) % reviews.length)}
                  className="h-8 w-8 border border-white/15 text-white/80 transition hover:border-white/40 hover:text-white"
                  aria-label="Next review"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="plans"
        ref={plansRef}
        className="relative z-10 mx-auto flex min-h-[100svh] snap-start items-center overflow-hidden px-6 py-28 scroll-mt-24 md:min-h-screen"
      >
        <div className="mx-auto w-full max-w-6xl overflow-hidden">
          <div
            className={`flex w-[200%] transition-transform duration-700 ease-in-out ${
              plansPanel === 'details' ? 'translate-x-[-50%]' : 'translate-x-0'
            }`}
          >
            <div className="w-1/2 shrink-0 pr-0 md:pr-6">
              <h2 className="text-center text-xs uppercase tracking-[0.35em] text-white/80">
                {copy.home.planDetails.title}
              </h2>
              <div className="mt-10 grid gap-6 lg:grid-cols-2">
                {[
                  { id: 'starter', ref: starterRef, plan: copy.home.planDetails.starter },
                  { id: 'standard', ref: standardRef, plan: copy.home.planDetails.standard },
                ].map((item) => (
                  <article
                    key={item.id}
                    id={item.id}
                    ref={item.ref}
                    className="scroll-mt-32 border border-white/10 bg-black/22 p-6 text-left shadow-[0_18px_40px_rgba(0,0,0,0.32)] backdrop-blur-sm sm:p-8"
                  >
                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
                      {item.plan.title}
                    </h3>
                    <ul className="mt-6 space-y-3 text-sm text-white/72 sm:text-base">
                      {item.plan.features.map((feature) => (
                        <li key={feature} className="flex gap-3">
                          <span className="text-white/45">-</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-8 text-center text-3xl font-bold tracking-[0.04em] text-white">
                      {item.plan.price}
                    </p>
                  </article>
                ))}
                <button
                  id="more"
                  ref={moreRef}
                  type="button"
                  onClick={revealPlanDetails}
                  className="lg:col-span-2 border border-white/10 bg-black/18 p-6 text-center shadow-[0_18px_40px_rgba(0,0,0,0.28)] backdrop-blur-sm transition hover:border-white/25 hover:bg-black/28 hover:text-white sm:p-8"
                >
                  <span className="block text-sm font-semibold uppercase tracking-[0.22em] text-white">
                    {copy.home.planDetails.more.title}
                  </span>
                  <span className="mt-3 block text-xs uppercase tracking-[0.24em] text-white/55">
                    {copy.home.planDetails.more.action}
                  </span>
                </button>
              </div>
            </div>

            <div className="w-1/2 shrink-0 pl-0 md:pl-6">
              <div className="flex items-center justify-start">
                <button
                  type="button"
                  className="text-[10px] uppercase tracking-[0.22em] text-white/55 transition hover:text-white"
                  onClick={() => setPlansPanel('summary')}
                >
                  ←{' '}
                  {copy.home.planDetails.back}
                </button>
              </div>
              <div className="mt-8 grid max-h-[72svh] gap-5 overflow-y-auto pr-2 lg:grid-cols-2">
                {additionalPlans.map((item) => (
                  <article
                    key={item.title}
                    className="border border-white/10 bg-black/22 p-5 text-left shadow-[0_18px_40px_rgba(0,0,0,0.24)] backdrop-blur-sm"
                  >
                    <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-white underline decoration-white/60 underline-offset-4">
                      {item.title}
                    </h3>
                    <ul className="mt-5 space-y-2 text-sm text-white/72">
                      {item.features.map((feature) => (
                        <li key={feature} className="flex gap-3">
                          <span className="text-white/45">-</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {item.price && (
                      <p className="mt-6 text-center text-2xl font-bold tracking-[0.04em] text-white">
                        {item.price}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="first-block"
        ref={firstBlockRef}
        className="relative z-10 mx-auto flex min-h-[100svh] snap-start items-center px-6 py-28 scroll-mt-24 md:min-h-screen"
      >
        <div className="mx-auto w-full max-w-6xl text-center">
          <h2 className="text-xs uppercase tracking-[0.35em] text-white/80">
            {copy.home.firstBlock.title}
          </h2>
          <div className="mt-8 overflow-hidden border border-white/10 bg-black/25 shadow-[0_18px_40px_rgba(0,0,0,0.32)] backdrop-blur-sm">
            <iframe
              src="/res/the_first_block_2.pdf"
              title={copy.home.firstBlock.pdfTitle}
              className="h-[70svh] min-h-[32rem] w-full bg-white"
            />
          </div>
        </div>
      </section>

      <section
        id="about"
        ref={aboutRef}
        className="relative z-10 mx-auto flex min-h-[100svh] snap-start items-center px-6 scroll-mt-24 md:min-h-screen"
      >
        <div className="mx-auto -mt-14 w-full max-w-5xl">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="text-left">
              <h2 className="text-xs uppercase tracking-[0.35em] text-white/80">{copy.home.about.title}</h2>
              <div className="mt-4 space-y-4 text-white/70">
                {copy.home.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="h-[min(90vw,28rem)] w-[min(90vw,28rem)] overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_18px_40px_rgba(0,0,0,0.35)] md:h-[28rem] md:w-[28rem]">
                <Image
                  src="/mockup/stefbio.png"
                  alt={copy.home.about.imageAlt}
                  width={512}
                  height={640}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 overflow-hidden border-y border-white/15 bg-black/88 text-white shadow-[0_-12px_40px_rgba(0,0,0,0.45)] backdrop-blur">
        <button
          type="button"
          aria-expanded={contactExpanded}
          className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 text-left text-white/80 transition hover:text-white md:px-6"
          onClick={() => setContactExpanded((expanded) => !expanded)}
        >
          <span className="inline-flex items-center gap-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-white">
            <svg
              viewBox="0 0 28 10"
              aria-hidden="true"
              className={`h-[10px] w-7 text-white/70 transition-transform duration-300 ${
                contactExpanded ? '' : 'rotate-180'
              }`}
            >
              <path
                d="M2 2 L14 8 L26 2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{copy.home.contact.title}</span>
          </span>
          <span className="hidden min-w-0 flex-1 items-center justify-center gap-6 text-[11px] tracking-[0.12em] text-white/65 md:flex">
            {/* compact desktop contact info */}
            <span className="flex min-w-0 items-center gap-2">
              <Image
                src="/mockup/gmailcontacticon.png"
                alt=""
                width={16}
                height={16}
                className="h-4 w-4"
              />
              <span className="truncate">Candeiasstef@gmail.com</span>
            </span>
            <span className="flex items-center gap-2">
              <Image
                src="/mockup/whatsappcontacticon.png"
                alt=""
                width={18}
                height={18}
                className="h-[18px] w-[18px]"
              />
              <span>0655577683</span>
            </span>
            <span className="flex items-center gap-2">
              <Image
                src="/mockup/instacontacticon.png"
                alt=""
                width={18}
                height={18}
                className="h-[18px] w-[18px]"
              />
              <span>candeiascoaching</span>
            </span>
          </span>
        </button>
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
            contactExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            <div className="mx-auto grid max-w-3xl gap-8 border-t border-white/10 px-4 py-7 text-left md:max-w-5xl md:grid-cols-[1fr_0.75fr_1fr] md:px-6">
              <div className="expanded contact brand column">
                <div className="flex items-center gap-4">
                  <Image
                    src="/mockup/logo2.png"
                    alt={copy.home.logoAlt}
                    width={472}
                    height={376}
                    className="h-auto w-16"
                  />
                  <div>
                    <p className="font-serif text-lg uppercase tracking-[0.18em] text-white">
                      Candeias
                    </p>
                    <p className="text-[9px] uppercase tracking-[0.32em] text-white/55">
                      Coaching
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex gap-3">
                  <a
                    href="https://www.instagram.com/candeiascoaching"
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-11 w-11 items-center justify-center transition hover:opacity-85"
                  >
                    <Image
                      src="/mockup/instacontacticon.png"
                      alt={copy.home.contact.instagramIconAlt}
                      width={44}
                      height={44}
                      className="h-11 w-11 object-contain"
                    />
                  </a>
                  <a
                    href="https://wa.me/31655577683"
                    className="flex h-11 w-11 items-center justify-center transition hover:opacity-85"
                  >
                    <Image
                      src="/mockup/whatsappcontacticon.png"
                      alt={copy.home.contact.whatsappIconAlt}
                      width={44}
                      height={44}
                      className="h-11 w-11 object-contain"
                    />
                  </a>
                </div>
              </div>

              <div className="expanded contact links column">
                <h3 className="text-sm font-semibold text-white">{copy.nav.plans}</h3>
                <div className="mt-5 grid gap-3 text-sm text-white/70">
                  {[
                    { label: copy.nav.home, action: () => scrollToSection('home') },
                    { label: copy.nav.plans, action: () => scrollToSection('plans') },
                    { label: copy.nav.firstBlock, action: () => scrollToSection('first-block') },
                    { label: copy.nav.about, action: () => scrollToSection('about') },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      className="text-left transition hover:text-white"
                      onClick={() => {
                        item.action();
                        setContactExpanded(false);
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="expanded contact details column">
                <h3 className="text-sm font-semibold text-white">{copy.home.contact.title}</h3>
                <div className="mt-5 grid gap-4 text-sm text-white/75">
                  <a
                    href="mailto:Candeiasstef@gmail.com"
                    className="grid grid-cols-[1.75rem_minmax(0,1fr)] items-center gap-3 transition hover:text-white"
                  >
                    <Image
                      src="/mockup/gmailcontacticon.png"
                      alt={copy.home.contact.emailIconAlt}
                      width={18}
                      height={18}
                      className="h-[18px] w-[18px] justify-self-center"
                    />
                    <span className="break-all text-left">Candeiasstef@gmail.com</span>
                  </a>
                  <a
                    href="https://wa.me/31655577683"
                    className="grid grid-cols-[1.75rem_minmax(0,1fr)] items-center gap-3 transition hover:text-white"
                  >
                    <Image
                      src="/mockup/whatsappcontacticon.png"
                      alt={copy.home.contact.whatsappIconAlt}
                      width={22}
                      height={22}
                      className="h-[22px] w-[22px] justify-self-center"
                    />
                    <span className="text-left">0655577683</span>
                  </a>
                  <a
                    href="https://www.instagram.com/candeiascoaching"
                    target="_blank"
                    rel="noreferrer"
                    className="grid grid-cols-[1.75rem_minmax(0,1fr)] items-center gap-3 transition hover:text-white"
                  >
                    <Image
                      src="/mockup/instacontacticon.png"
                      alt={copy.home.contact.instagramIconAlt}
                      width={24}
                      height={24}
                      className="h-6 w-6 justify-self-center"
                    />
                    <span className="text-left">candeiascoaching</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="relative z-10 border-t border-white/10 py-6 text-center text-xs text-white/50">
        <p>{copy.home.footer}</p>
      </footer>
    </main>
  );
}
