'use client';

import { siteCopy } from '@/components/site-copy';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useLanguage } from '@/components/language-provider';
import { VideoCarousel } from '@/components/video-carousel';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

const VIDEOS_BASE_URL = (process.env.NEXT_PUBLIC_VIDEOS_BASE_URL ?? '/res/videos').replace(/\/$/, '');

const videoUrl = (filename: string) => `${VIDEOS_BASE_URL}/${encodeURIComponent(filename)}`;

const FIRST_BLOCK_VIDEOS = [
  { src: videoUrl('cable row.mp4'), label: 'Cable row' },
  { src: videoUrl('chest press machine 9x16.mp4'), label: 'Chest press' },
  { src: videoUrl('incline chest press machine.mp4'), label: 'Incline chest press' },
  { src: videoUrl('lat pulldown.mp4'), label: 'Lat pulldown' },
  { src: videoUrl('lat raise.mp4'), label: 'Lat raise' },
  { src: videoUrl('dumbbell curl.mp4'), label: 'Dumbbell curl' },
  { src: videoUrl('preacher curl.mp4'), label: 'Preacher curl' },
  { src: videoUrl('pushdown.mp4'), label: 'Pushdown' },
  { src: videoUrl('hacksquat.mp4'), label: 'Hack squat' },
  { src: videoUrl('Leg press.mp4'), label: 'Leg press' },
  { src: videoUrl('leg extension.mp4'), label: 'Leg extension' },
  { src: videoUrl('leg curl.mp4'), label: 'Leg curl' },
  { src: videoUrl('calf raise.mp4'), label: 'Calf raise' },
];

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
  const [aboutPanel, setAboutPanel] = useState<'vision' | 'bio'>('vision');
  const [contactExpanded, setContactExpanded] = useState(false);
  const [pdfExpanded, setPdfExpanded] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const [visionParallaxY, setVisionParallaxY] = useState(0);
  const [homeBannerW, setHomeBannerW] = useState(0);
  const [visionBannerW, setVisionBannerW] = useState(0);
  const [visionInView, setVisionInView] = useState(false);
  const [firstBlockInView, setFirstBlockInView] = useState(false);

  const mainRef = useRef<HTMLDivElement | null>(null);
  const homeRef = useRef<HTMLElement | null>(null);
  const plansRef = useRef<HTMLElement | null>(null);
  const starterRef = useRef<HTMLElement | null>(null);
  const standardRef = useRef<HTMLElement | null>(null);
  const moreRef = useRef<HTMLButtonElement | null>(null);
  const firstBlockRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const homeBannerRef = useRef<HTMLDivElement | null>(null);
  const visionBannerRef = useRef<HTMLDivElement | null>(null);

  const rad2deg = (rad: number) => (rad * 180) / Math.PI;
  const homeTopRot = homeBannerW ? `rotate(${rad2deg(Math.atan2(-80, homeBannerW))}deg)` : 'rotate(-2.7deg)';
  const homeBotRot = homeBannerW ? `rotate(${rad2deg(Math.atan2(40, homeBannerW))}deg)` : 'rotate(1.35deg)';
  const visionTopRot = visionBannerW ? `rotate(${rad2deg(Math.atan2(80, visionBannerW))}deg)` : 'rotate(2.7deg)';
  const visionBotRot = visionBannerW ? `rotate(${rad2deg(Math.atan2(-40, visionBannerW))}deg)` : 'rotate(-1.35deg)';

  const reviews = useMemo<ReviewItem[]>(
    () =>
      locale === 'nl'
        ? [
            {
              name: 'Lara de Gelder',
              rating: 5,
              ago: '1 dag geleden',
              text: 'Stef is een goede coach. Ik kwam hier na een maand lang erg ziek te zijn geweest om letterlijk en figuurlijk eerst weer op krachten te komen. En daarna te bouwen aan mijn conditie en kracht.\n\nOmdat ik zelf al veel weet van voeding en sport (als yogadocent) pastte hij hier heel goed zijn uitleg en training op aan. Uitleg over verschillende spiergroepen en hoe die benut worden bij de verschillende oefeningen.\n\nOmdat ik nooit in een sportschool ben geweest en er zelfs lichtelijk iets op tegen had, heeft hij in het begin me helemaal meegenomen. Na een paar weken begonnen we wat meer uitdagende oefeningen te doen. Na twee maanden kon ik inzien waarom de sportschool een goede aanvulling is bij de sporten die ik al doe en bouwde ik langzaam mijn kracht op. Na drie maanden kreeg ik er zelfs lol in! Sterkere spieren helpen ook mijn yoga en klimsport vooruit.\n\nStef heeft een goede kennis over spier ontwikkeling, en oefeningen die het best bij je persoonlijke doelen passen. Ook let hij heel goed op techniek, zodat als je \'zelfstanding\' gaat trainen het zeker op de juiste manier aanpakt. Ook is het fijn dat hij erg flexibel is in de dagen waarop je samen traint. Ook komt hij met nieuwe frisse ideeën. Een aanrader voor iedereen die een stap verder wil komen in een fittere leefstijl!',
            },
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
              name: 'Lara de Gelder',
              rating: 5,
              ago: '1 day ago',
              text: 'Stef is a great coach. I came to him after a month of being very ill, to first regain my strength — both literally and figuratively — and then build up my conditioning and strength.\n\nBecause I already know a lot about nutrition and sport (as a yoga teacher), he tailored his explanations and training accordingly, covering the different muscle groups and how they\'re used in various exercises.\n\nBecause I had never been to a gym and was even slightly opposed to it, he eased me in completely at the start. After a few weeks we began doing more challenging exercises. After two months I could see why the gym is a great complement to the sports I already do, and I was slowly building strength. After three months I was even enjoying it! Stronger muscles also help my yoga and climbing.\n\nStef has solid knowledge of muscle development and the exercises that best fit your personal goals. He also pays close attention to technique, so when you train on your own you\'ll do it the right way. It\'s also great that he\'s very flexible with training days, and he comes up with fresh new ideas. Recommended for anyone who wants to take a step further toward a fitter lifestyle!',
            },
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
    if (section === 'about') {
      setAboutPanel('vision');
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
    const observers: ResizeObserver[] = [];
    if (homeBannerRef.current) {
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) setHomeBannerW(entry.contentRect.width);
      });
      ro.observe(homeBannerRef.current);
      observers.push(ro);
    }
    if (visionBannerRef.current) {
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) setVisionBannerW(entry.contentRect.width);
      });
      ro.observe(visionBannerRef.current);
      observers.push(ro);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const target = visionBannerRef.current;
    if (!target) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setVisionInView(entry.intersectionRatio > 0.35);
        }
      },
      { root: mainRef.current, threshold: [0, 0.35, 0.6] },
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const target = firstBlockRef.current;
    if (!target) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setFirstBlockInView(entry.intersectionRatio > 0.25);
        }
      },
      { root: mainRef.current, threshold: [0, 0.25, 0.5] },
    );
    io.observe(target);
    return () => io.disconnect();
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

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setParallaxY(el.scrollTop * 0.25);
        if (aboutRef.current) {
          setVisionParallaxY((el.scrollTop - aboutRef.current.offsetTop) * 0.25);
        }
        frame = 0;
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const revealPlanDetails = () => {
    setPlansPanel('details');
    setActiveSection('plans');
    plansRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main
      ref={mainRef}
      className="relative h-[100svh] overflow-y-auto snap-y pb-16 text-white md:h-screen md:pb-0 md:snap-mandatory"
      style={{
        backgroundImage: "url('/mockup/bgtexture.jpg')",
        backgroundSize: '2000px 2000px',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
      }}
    >
      <header className="relative z-20">
        <nav className="fixed left-0 right-0 top-0 z-20 border-y border-white/15 bg-black/78 px-3 py-2.5 text-sm text-white/70 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur sm:px-4 sm:py-3 md:px-6 md:py-5 [@media(max-height:780px)]:py-1.5 [@media(max-height:780px)]:md:py-2">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <button
              className="group flex items-center justify-center gap-2.5 self-center text-left md:justify-start sm:gap-4"
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
                className="h-auto w-11 shrink-0 drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition duration-300 group-hover:scale-[1.04] sm:w-14 md:w-[4.5rem] [@media(max-height:780px)]:w-9 [@media(max-height:780px)]:sm:w-11 [@media(max-height:780px)]:md:w-14"
              />
              <div className="flex flex-col items-start">
                <span className="font-serif text-[1rem] uppercase tracking-[0.12em] text-white sm:text-xl sm:tracking-[0.18em] md:text-2xl">
                  Candeias
                </span>
                <span className="text-[8px] uppercase tracking-[0.24em] text-white/60 sm:text-[10px] sm:tracking-[0.38em] md:text-[11px]">
                  Coaching
                </span>
              </div>
            </button>
            <div className="flex flex-wrap items-center justify-center gap-1.5 text-[9px] uppercase tracking-[0.14em] sm:gap-4 sm:text-[11px] sm:tracking-[0.22em] md:justify-end md:gap-8 md:text-xs md:tracking-[0.25em]">
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
              <LanguageSwitcher className="ml-0.5 scale-90 sm:ml-1 sm:scale-100" />
            </div>
          </div>
        </nav>
      </header>

      <section
        id="home"
        ref={homeRef}
        className="relative z-10 flex min-h-[100svh] snap-start flex-col items-center justify-center pt-32 pb-24 text-center scroll-mt-32 md:min-h-screen md:pb-24 md:pt-36 [@media(max-height:780px)]:pt-20 [@media(max-height:780px)]:md:pt-24"
      >
        <div className="relative w-full shadow-[0_18px_40px_rgba(0,0,0,0.35)]" style={{ clipPath: 'polygon(0 80px, 100% 0, 100% calc(100% - 20px), 0 calc(100% - 60px))', marginTop: '-40px', marginBottom: '-60px' }}>
          <div
            ref={homeBannerRef}
            className="relative h-[clamp(260px,38svh,320px)] w-full bg-cover bg-center sm:h-[clamp(300px,42svh,380px)] md:h-[clamp(320px,50svh,440px)]"
            style={{
              backgroundImage: "url('/mockup/landing_banner_improved.png')",
              backgroundPosition: `center calc(15% + ${parallaxY}px)`,
              willChange: 'background-position',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/25" />
            <div
              className="pointer-events-none absolute inset-x-0 h-6 bg-gradient-to-b from-black/55 to-transparent"
              style={{ top: '80px', transformOrigin: '0 0', transform: homeTopRot }}
            />
            <div
              className="pointer-events-none absolute inset-x-0 h-6 bg-gradient-to-t from-black/55 to-transparent"
              style={{ bottom: '60px', transformOrigin: '0 100%', transform: homeBotRot }}
            />
            <div className="relative mx-auto flex h-full w-full max-w-6xl items-center pl-10 pr-6 py-12 sm:pl-14 md:pl-20 md:pr-10 md:py-14">
              <div className="max-w-2xl text-left">
                <h1 className="mt-2 text-3xl font-semibold leading-tight text-white md:text-5xl [text-shadow:_0_2px_14px_rgba(0,0,0,0.9)]">
                  {locale === 'en' ? (
                    <>Stop guessing.<br />Start progressing.</>
                  ) : heroBanner.title}
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/88 md:text-[1.1rem] [text-shadow:_0_1px_10px_rgba(0,0,0,0.85)]">
                  {heroBanner.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setContactExpanded(true)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-black/35 px-3 py-2 text-xs font-semibold text-white transition hover:bg-black/50 sm:gap-2 sm:px-5 sm:py-3 sm:text-base"
                  >
                    <span aria-hidden="true">◌</span>
                    <span>{heroBanner.contactCta}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('plans')}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-black/35 px-3 py-2 text-xs font-semibold text-white transition hover:bg-black/50 sm:gap-2 sm:px-5 sm:py-3 sm:text-base"
                  >
                    <span aria-hidden="true">▢</span>
                    <span>{heroBanner.plansCta}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 mx-auto mt-6 w-full max-w-6xl px-2 pb-2 sm:mt-8 sm:px-4 md:mt-10 md:px-6">
          <p className="hidden text-center text-[10px] uppercase tracking-[0.36em] text-white/50 sm:block md:text-xs">
            {locale === 'nl' ? 'Klantgetuigenissen' : 'Client Testimonials'}
          </p>
          <div className="mt-4 flex items-center justify-center gap-3 md:mt-5 md:gap-4">
            <aside className="hidden h-[clamp(120px,calc(100svh-680px),170px)] w-[281px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-black/18 p-3 text-left shadow-[0_12px_28px_rgba(0,0,0,0.28)] backdrop-blur-sm md:flex">
              <div className="mt-3">
                <p className="text-sm font-semibold text-white/85">{previousReview.name}</p>
                <p className="mt-1 text-xs text-[#fbbc04]">{'★'.repeat(previousReview.rating)}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {previousReview.text.slice(0, 80)}...
                </p>
              </div>
            </aside>

            <div className="flex h-[clamp(140px,24svh,220px)] w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-2.5 text-left shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:h-[clamp(170px,28svh,260px)] sm:p-4 md:w-[500px] md:h-[clamp(190px,34svh,300px)] md:p-6">
              <div className="flex items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-bold text-black sm:h-8 sm:w-8 sm:text-base">
                    G
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-white sm:text-sm">Candeias Coaching</p>
                    <p className="text-[10px] tracking-[0.08em] text-white/55 sm:text-xs sm:tracking-[0.1em]">Google Business Profile</p>
                  </div>
                </div>
                <a
                  href="https://maps.app.goo.gl/16S9CXzmwjeLmgy16"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[9px] uppercase tracking-[0.18em] text-white/60 transition hover:text-white sm:text-[10px] sm:tracking-[0.22em]"
                >
                  {locale === 'nl' ? 'Bekijk alle' : 'View all'}
                </a>
              </div>

              <div className="mt-3 min-h-0 flex-1 overflow-y-auto pr-1 sm:mt-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold text-white sm:text-sm">{reviews[activeReview].name}</p>
                </div>
                <p className="mt-1.5 text-[10px] tracking-[0.14em] text-[#fbbc04] sm:mt-2 sm:text-sm sm:tracking-[0.18em]">{'★'.repeat(reviews[activeReview].rating)}</p>
                <p className="mt-2 whitespace-pre-line text-[12px] leading-relaxed text-white/80 sm:mt-3 sm:text-sm md:mt-4 md:text-base">{reviews[activeReview].text}</p>
              </div>

              <div className="mt-2.5 grid grid-cols-[auto_1fr_auto] items-center gap-1 sm:mt-3 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setActiveReview((index) => (index - 1 + reviews.length) % reviews.length)}
                  className="inline-flex h-4.5 w-4.5 items-center justify-center rounded-full border border-white/15 text-[0.74rem] leading-none text-white/80 transition hover:border-white/40 hover:text-white sm:h-5 sm:w-5 sm:text-[0.82rem] md:h-8 md:w-8 md:text-[1.1rem]"
                  aria-label="Previous review"
                >
                  <span className="-mt-px">‹</span>
                </button>

                <div className="flex items-center justify-center gap-0.5 sm:gap-1">
                  {reviews.map((review, index) => (
                    <button
                      key={review.name}
                      type="button"
                      aria-label={`Show review ${index + 1}`}
                      onClick={() => setActiveReview(index)}
                      className={`h-0.5 rounded-full transition sm:h-1 ${
                        index === activeReview ? 'w-4 bg-white sm:w-5 md:w-8' : 'w-2 bg-white/25 hover:bg-white/55 sm:w-3.5'
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveReview((index) => (index + 1) % reviews.length)}
                  className="inline-flex h-4.5 w-4.5 items-center justify-center rounded-full border border-white/15 text-[0.74rem] leading-none text-white/80 transition hover:border-white/40 hover:text-white sm:h-5 sm:w-5 sm:text-[0.82rem] md:h-8 md:w-8 md:text-[1.1rem]"
                  aria-label="Next review"
                >
                  <span className="-mt-px">›</span>
                </button>
              </div>
            </div>

            <aside className="hidden h-[clamp(120px,calc(100svh-680px),170px)] w-[281px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-black/18 p-3 text-left shadow-[0_12px_28px_rgba(0,0,0,0.28)] backdrop-blur-sm md:flex">
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
        className="relative z-10 mx-auto flex min-h-[100svh] snap-start items-center overflow-hidden px-6 py-22 scroll-mt-24 md:min-h-screen md:py-28"
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
        className={`relative z-10 mx-auto flex flex-col justify-start px-6 pt-32 scroll-mt-24 md:pt-36 ${pdfExpanded ? 'min-h-fit' : 'min-h-[100svh] snap-end md:min-h-screen'}`}
      >
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-10 grid items-center gap-10 md:grid-cols-2 md:gap-12">
            <div
              className={`text-left transition-all duration-700 ease-out ${
                firstBlockInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              <h2 className="text-sm uppercase tracking-[0.35em] text-white/85 md:text-base">
                {copy.home.firstBlock.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/85 md:text-lg">
                Most beginner guides you find online are generic programs that are easy to follow but don&apos;t teach you anything.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/85 md:text-lg">
                This guide will help you understand the basics of training and dieting rather than just telling you what to do.
              </p>
            </div>
            <div>
              <VideoCarousel
                videos={FIRST_BLOCK_VIDEOS}
                prevLabel={locale === 'nl' ? 'Vorige' : 'Previous'}
                nextLabel={locale === 'nl' ? 'Volgende' : 'Next'}
              />
            </div>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black/25 shadow-[0_18px_40px_rgba(0,0,0,0.32)] backdrop-blur-sm md:mt-12">
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
            <div className="flex flex-col items-start gap-3 border-t border-white/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-5">
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
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.14em] text-white/70 sm:gap-3 sm:text-sm sm:tracking-[0.2em]">
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
        className="relative z-10 flex min-h-[100svh] snap-start items-center overflow-hidden scroll-mt-24 md:min-h-screen"
      >
        <div className="w-full overflow-hidden">
          <div
            className={`flex w-[200%] transition-transform duration-700 ease-in-out ${
              aboutPanel === 'bio' ? 'translate-x-[-50%]' : 'translate-x-0'
            }`}
          >
            <div className="w-1/2 shrink-0">
              <div
                className="relative w-full shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
                style={{
                  clipPath: 'polygon(0 0, 100% 80px, 100% calc(100% - 60px), 0 calc(100% - 20px))',
                }}
              >
                <div
                  ref={visionBannerRef}
                  className="relative h-[420px] w-full bg-cover bg-center sm:h-[500px] md:h-[580px]"
                  style={{
                    backgroundImage: "url('/res/vision.jpg')",
                    backgroundPosition: `center calc(50% + ${visionParallaxY}px)`,
                    willChange: 'background-position',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/25" />
                  <div
                    className="pointer-events-none absolute inset-x-0 h-6 bg-gradient-to-b from-black/55 to-transparent"
                    style={{ top: '0px', transformOrigin: '0 0', transform: visionTopRot }}
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 h-6 bg-gradient-to-t from-black/55 to-transparent"
                    style={{ bottom: '20px', transformOrigin: '0 100%', transform: visionBotRot }}
                  />
                  <div className="relative mx-auto flex h-full w-full max-w-6xl items-center px-6 py-8 md:px-10">
                    <div className="max-w-2xl text-left">
                      <div className="relative px-8 py-6 md:px-10 md:py-8">
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0"
                          style={{
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            WebkitMaskImage:
                              'radial-gradient(ellipse at center, black 40%, rgba(0,0,0,0) 100%)',
                            maskImage:
                              'radial-gradient(ellipse at center, black 40%, rgba(0,0,0,0) 100%)',
                          }}
                        />
                        <div
                          className={`relative transition-all duration-700 ease-out [text-shadow:0_2px_8px_rgba(0,0,0,0.6)] ${
                            visionInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                          }`}
                        >
                          <h2 className="text-sm uppercase tracking-[0.35em] text-white/95 md:text-base">
                            {copy.home.vision.title}
                          </h2>
                          <div className="mt-4 space-y-3 text-sm leading-relaxed text-white/95 md:text-base">
                            {copy.home.vision.paragraphs.map((paragraph) => (
                              <p key={paragraph}>{paragraph}</p>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => setAboutPanel('bio')}
                            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-black/45 px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-[0_18px_40px_rgba(0,0,0,0.32)] backdrop-blur-sm transition hover:border-white/35 hover:bg-black/65"
                          >
                            <span>{copy.home.vision.more.title}</span>
                            <span aria-hidden="true">→</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-1/2 shrink-0 px-6">
              <div className="mx-auto w-full max-w-5xl">
                <div className="flex items-center justify-start">
                  <button
                    type="button"
                    className="text-[10px] uppercase tracking-[0.22em] text-white/55 transition hover:text-white"
                    onClick={() => setAboutPanel('vision')}
                  >
                    ← {copy.home.about.back}
                  </button>
                </div>
                <div className="mt-6 grid gap-10 md:grid-cols-2 md:items-center">
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
                  <a
                    href="https://maps.app.goo.gl/16S9CXzmwjeLmgy16"
                    target="_blank"
                    rel="noreferrer"
                    className="grid grid-cols-[1.75rem_minmax(0,1fr)] items-start gap-3 transition hover:text-white"
                  >
                    <span aria-hidden="true" className="justify-self-center text-base leading-none text-white/55">⌖</span>
                    <span className="text-left leading-snug">Baskensburgplein 2,<br />4383 NE Vlissingen, Netherlands</span>
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
