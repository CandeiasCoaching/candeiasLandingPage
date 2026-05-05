'use client';

import { siteCopy } from '@/components/site-copy';
import { LanguageSwitcher } from '@/components/language-switcher';
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
  const [pdfExpanded, setPdfExpanded] = useState(false);

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
              name: 'Karolina S',
              rating: 5,
              ago: '2 dagen geleden',
              text: 'Ik raad Candeias Coaching aan aan iedereen die actief en concreet aan de slag wilt. Hij heeft een geweldig trainingsplan voor mij opgesteld, tijdens onze training sessies mijn techniek goed in de gaten gehouden en gecorrigeerd. Mijn dieet is ook aangepast en alles bij elkaar heeft ervoor gezorgd dat mijn doelen zijn bereikt en zelfs overtroffen.',
            },
            {
              name: 'emmely bosman',
              rating: 5,
              ago: '4 dagen geleden',
              text: 'Stef is een geweldige personal trainer die mij enorm heeft geholpen, zowel fysiek als mentaal. Dankzij zijn begeleiding heb ik niet alleen gewerkt aan mijn conditie en doelen, maar ook veel meer zelfvertrouwen opgebouwd. Ook maakt hij duidelijke en haalbare schema\'s op maat. Stef motiveert op een fijne manier, luistert goed en past trainingen aan op wat jij nodig hebt. Hierdoor voel ik me sterker, fitter en zekerder dan voorheen. Zeker een aanrader voor iedereen die serieus aan zichzelf wil werken!',
            },
            {
              name: 'Verona Nimani',
              rating: 5,
              ago: '2 dagen geleden',
              text: 'Een geweldige coach die echt aandachtig luistert en goed observeert. Met als doel afvallen door samen van regelmatige sportschoolbezoeken een gewoonte te maken.',
            },
            {
              name: 'George Steven',
              rating: 5,
              ago: '3 dagen geleden',
              text: 'Ik heb een paar sessies met Stef gevolgd via online coaching en dat heeft een grote impact gehad op mijn training en voeding. Wat opvalt is hoe goed hij concepten uitlegt op een manier die ik, of elke andere beginner, kan begrijpen. Ik ben ook 5 kg afgevallen sinds ik zijn adviezen opvolg. Stef is ook een erg betrokken trainer – ik kan hem niet genoeg bedanken voor zijn aanpak. Ik raad Stef ten zeerste aan aan iedereen die wil beginnen met trainen.',
            },
            {
              name: 'Egy Dhio',
              rating: 5,
              ago: '3 dagen geleden',
              text: 'Geweldige coach, geeft goed advies en duidelijke instructies.',
            },
            {
              name: 'samuelhuusko',
              rating: 5,
              ago: '3 dagen geleden',
              text: 'Zijn coachingaanpak is makkelijk te begrijpen en erg grondig.',
            },
          ]
        : [
            {
              name: 'Karolina S',
              rating: 5,
              ago: '2 days ago',
              text: 'I highly recommend Candeias Coaching to anyone who wants practical, concrete progress. He created a great training plan for me, closely watched and corrected my technique during sessions, and adjusted my diet. Together, this helped me reach and even exceed my goals.',
            },
            {
              name: 'emmely bosman',
              rating: 5,
              ago: '4 days ago',
              text: 'Stef is an excellent personal trainer who has helped me enormously, both physically and mentally. Thanks to his guidance, I improved my fitness and confidence with clear, realistic programs. He motivates in a supportive way, listens well, and adapts training to what you need.',
            },
            {
              name: 'Verona Nimani',
              rating: 5,
              ago: '2 days ago',
              text: 'A great coach who truly listens attentively and is observant. With the goal of weight loss by making regular gym visits a habit together.',
            },
            {
              name: 'George Steven',
              rating: 5,
              ago: '3 days ago',
              text: 'I worked with Stef for a few sessions via early online coaching and it\'s made a huge impact on my training and nutrition. What is clear about Stef is how great he is at breaking down concepts to a level that I, or any other beginner, can understand. I also lost 5kg since taking on his advice. Stef is also a very compassionate trainer - I cannot thank Stef enough for his approach to coaching. I highly recommend Stef to those who are looking to start training themselves.',
            },
            {
              name: 'Egy Dhio',
              rating: 5,
              ago: '3 days ago',
              text: 'Great coach, gives great advice and clear instructions.',
            },
            {
              name: 'samuelhuusko',
              rating: 5,
              ago: '3 days ago',
              text: 'His approach to coaching is easy to understand and very thorough.',
            },
          ],
    [locale]
  );

  const heroBanner = useMemo(
    () =>
      locale === 'nl'
        ? {
            eyebrow: 'Welkom bij Candeias Coaching',
            title: 'Energieker leven begint hier.',
            description:
              'Werk aan een fitte, gezonde en haalbare versie van jezelf met persoonlijke begeleiding en een duidelijk plan.',
            contactCta: 'Plan een gratis intake',
            plansCta: 'Bekijk ons aanbod',
          }
        : {
            eyebrow: 'Welcome to Candeias Coaching',
            title: 'Stop guessing. Start progressing.',
            description:
              'Candeias Coaching makes fitness achievable for anyone.',
            contactCta: 'Book a free intake',
            plansCta: 'View our plans',
          },
    [locale]
  );

  const previousReview = reviews[(activeReview - 1 + reviews.length) % reviews.length];
  const nextReview = reviews[(activeReview + 1) % reviews.length];

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
    if (!mainRef.current) {
      return;
    }

    // Prevent browser scroll-restoration from reopening the page at a previous section.
    mainRef.current.scrollTo({ top: 0, behavior: 'auto' });
    setActiveSection('home');
  }, []);

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
              <LanguageSwitcher className="ml-1" />
            </div>
          </div>
        </nav>
      </header>

      <section
        id="home"
        ref={homeRef}
        className="relative z-10 mx-auto flex min-h-[100svh] snap-start flex-col items-center justify-center px-6 pt-36 text-center scroll-mt-32 md:min-h-screen md:pt-40"
      >
        <div className="relative w-[calc(100vw-22px)] -translate-x-1/2 border-y border-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.35)]" style={{ left: 'calc(50% + 11px)', clipPath: 'polygon(0 80px, 100% 0, 100% calc(100% - 20px), 0 calc(100% - 60px))', marginTop: '-40px', marginBottom: '-60px' }}>
          <div
            className="relative h-[440px] w-full bg-cover bg-center"
            style={{
              backgroundImage: "url('/mockup/landing_banner_improved.png')",
              backgroundPosition: 'center 15%',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/25" />
            <div className="relative mx-auto flex h-full w-full max-w-6xl items-center px-6 py-8 md:px-10">
              <div className="max-w-2xl text-left">
                <h1 className="mt-2 text-3xl font-semibold leading-tight text-white md:text-5xl">
                  {locale === 'en' ? (
                    <>Stop guessing.<br />Start progressing.</>
                  ) : heroBanner.title}
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/88 md:text-[1.1rem]">
                  {heroBanner.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setContactExpanded(true)}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-black/35 px-5 py-3 text-base font-semibold text-white transition hover:bg-black/50"
                  >
                    <span aria-hidden="true">◌</span>
                    <span>{heroBanner.contactCta}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('plans')}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-black/35 px-5 py-3 text-base font-semibold text-white transition hover:bg-black/50"
                  >
                    <span aria-hidden="true">▢</span>
                    <span>{heroBanner.plansCta}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 mx-auto mt-16 w-full max-w-6xl px-6 pb-20 md:mt-20">
          <p className="text-center text-[10px] uppercase tracking-[0.36em] text-white/50 md:text-xs">
            {locale === 'nl' ? 'Klantgetuigenissen' : 'Client Testimonials'}
          </p>
          <div className="mt-5 flex items-center justify-center gap-3 md:gap-4">
            <aside className="hidden h-[180px] w-[281px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-black/18 p-3 text-left shadow-[0_12px_28px_rgba(0,0,0,0.28)] backdrop-blur-sm md:flex">
              <div className="mt-3">
                <p className="text-sm font-semibold text-white/85">{previousReview.name}</p>
                <p className="mt-1 text-xs text-[#fbbc04]">{'★'.repeat(previousReview.rating)}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {previousReview.text.slice(0, 80)}...
                </p>
              </div>
            </aside>

            <div className="flex h-[320px] w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-5 text-left shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm md:w-[500px] md:p-6">
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

              <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-white">{reviews[activeReview].name}</p>
                </div>
                <p className="mt-2 text-sm tracking-[0.18em] text-[#fbbc04]">{'★'.repeat(reviews[activeReview].rating)}</p>
                <p className="mt-4 text-base leading-relaxed text-white/80">{reviews[activeReview].text}</p>
              </div>

              <div className="mt-4 grid grid-cols-[auto_1fr_auto] items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveReview((index) => (index - 1 + reviews.length) % reviews.length)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-[1.1rem] leading-none text-white/80 transition hover:border-white/40 hover:text-white"
                  aria-label="Previous review"
                >
                  <span className="-mt-px">‹</span>
                </button>

                <div className="flex items-center justify-center gap-2">
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

                <button
                  type="button"
                  onClick={() => setActiveReview((index) => (index + 1) % reviews.length)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-[1.1rem] leading-none text-white/80 transition hover:border-white/40 hover:text-white"
                  aria-label="Next review"
                >
                  <span className="-mt-px">›</span>
                </button>
              </div>
            </div>

            <aside className="hidden h-[180px] w-[281px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-black/18 p-3 text-left shadow-[0_12px_28px_rgba(0,0,0,0.28)] backdrop-blur-sm md:flex">
              <div className="mt-3">
                <p className="text-sm font-semibold text-white/85">{nextReview.name}</p>
                <p className="mt-1 text-xs text-[#fbbc04]">{'★'.repeat(nextReview.rating)}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {nextReview.text.slice(0, 80)}...
                </p>
              </div>
            </aside>
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
        className="relative z-10 mx-auto flex min-h-[100svh] snap-start flex-col justify-start px-6 pt-32 scroll-mt-24 md:min-h-screen md:pt-36"
      >
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-10 text-left">
            <h2 className="text-xs uppercase tracking-[0.35em] text-white/80">
              {copy.home.firstBlock.title}
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/75 md:text-xl">
              Most beginner guides you find online are generic programs that are easy to follow but don&apos;t teach you anything.
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/75 md:text-xl">
              This guide will help you understand the basics of training and dieting rather than just telling you what to do.
            </p>
          </div>
          <div className="mt-32 overflow-hidden rounded-2xl border border-white/10 bg-black/25 shadow-[0_18px_40px_rgba(0,0,0,0.32)] backdrop-blur-sm">
            <div
              className="overflow-hidden transition-[height] duration-500 ease-in-out"
              style={{ height: pdfExpanded ? '70svh' : '0px' }}
            >
              <iframe
                src="/res/the_first_block.pdf#toolbar=0&navpanes=0&scrollbar=0"
                title={copy.home.firstBlock.pdfTitle}
                className="w-full bg-white"
                style={{ height: 'calc(100% + 40px)', marginTop: '-40px' }}
              />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-white/10 px-6 py-5">
              <button
                type="button"
                onClick={() => setPdfExpanded((v) => !v)}
                className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-white/70 transition hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 shrink-0 transition-transform duration-300 ${pdfExpanded ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                {pdfExpanded
                  ? (locale === 'nl' ? 'PDF verbergen' : 'Hide PDF')
                  : (locale === 'nl' ? 'PDF bekijken' : 'View PDF')}
              </button>
              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-white/70">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                {locale === 'nl' ? 'Downloaden' : 'Download'}
                <a href="/res/the_first_block.pdf" download className="transition hover:text-white">
                  PDF
                </a>
                <span className="text-white/30">|</span>
                <a href="/res/First_4_Weeks_Tracker.xlsx" download className="transition hover:text-white">
                  Tracker
                </a>
              </div>
            </div>
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
                width={18}
                height={18}
                className="h-[18px] w-[18px] shrink-0"
              />
              <span className="truncate">Candeiasstef@gmail.com</span>
            </span>
            <span className="flex items-center gap-2">
              <Image
                src="/mockup/whatsappcontacticon.png"
                alt=""
                width={18}
                height={18}
                className="h-[18px] w-[18px] shrink-0"
              />
              <span>+31655577683</span>
            </span>
            <span className="flex items-center gap-2">
              <Image
                src="/mockup/instacontacticon.png"
                alt=""
                width={18}
                height={18}
                className="h-[18px] w-[18px] shrink-0"
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
                  <div className="grid grid-cols-[1.75rem_minmax(0,1fr)] items-center gap-3">
                    <span className="justify-self-center text-[11px] font-semibold text-white/40">KVK</span>
                    <span className="text-left">97499455</span>
                  </div>
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
