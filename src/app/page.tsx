'use client';

import { siteCopy } from '@/components/site-copy';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useLanguage } from '@/components/language-provider';
import { VideoCarousel } from '@/components/video-carousel';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

type ReviewItem = {
  name: string;
  rating: number;
  ago: string;
  text: string;
};

const EVERFIT_ONLINE_12_WEEKS_URL = 'https://app.everfit.io/home/packages/MD799171/analytics';
const EVERFIT_ONLINE_4_WEEKS_URL = 'https://app.everfit.io/home/packages/QC927638/analytics';
const FIRST_BLOCK_PDF_URL = 'https://drive.google.com/file/d/1_jLtk7zmwKQgUbek9FmPczlwffLkBRp5/view?usp=drive_link';

const VISION_SHOTS = [
  '/res/shots/1.jpg',
  '/res/shots/2.jpg',
  '/res/shots/3.png',
  '/res/shots/4.jpg',
  '/res/shots/5.jpg',
  '/res/shots/20260504_170203.jpg',
  '/res/shots/20260504_170416.jpg',
  '/res/shots/20260504_170728(1).jpg',
  '/res/shots/20260504_172845.jpg',
  '/res/shots/95iXQ0FFiaSfzD5pXmOAiS3w1LOK5seBO0VybKAro0pZp98xhtx58M4VMnzZzpFap1K4NnV1DSANyBlsw1905.png',
  '/res/shots/HwHqjthOCu-CEKsz92zETXRTx_lrNLVVoBi80Tb5lxvKxOgJwcp9iSkB27i2s5EI4jzg6Asb4DhANcLPw1905.png',
  '/res/shots/jIEwjGKRWNmCgpCmymPd-iAdAnjas-f2aojNJGtSrR2UcBsV4_kSidorOgAG9kfDV7mVR_RAxYq-gyo6w1905.png',
  '/res/shots/vEcF4B2wsDDxI7vxeZTylanXHrVnq1alXqWvbsDlOxRe11t3Te2CukdWIsdkSp-PRxc-niRUJ26RTj90w1905.png',
] as const;

// Fallback hardcoded reviews if API fails
const FALLBACK_REVIEWS: { nl: ReviewItem[]; en: ReviewItem[] } = {
  nl: [
    {
      name: 'Angelique Franzen',
      rating: 5,
      ago: '3 weken geleden',
      text: 'Ik wilde graag aan mijn gezondheid werken maar zag er enorm tegen op om richting de sportschool te gaan. Ik heb Stef leren kennen als een heel fijn persoon die alle drempels snel wegnam. Zijn rustige aanpak en uitleg werkt voor mij erg prettig. Tijdens het sporten kan hij me behoorlijk uitdagen maar hij ziet snel wanneer de grens bereikt is. Na een training ga je altijd met een goed gevoel naar huis en weet je wat je de volgende training zelfstandig kan doen. Hij corrigeert waar nodig maar is zeker ook van de complimenten. Voor mij echt een motivatie en een stok achter de deur, ik had niet verwacht dat ik me zo snel veel fitter zou voelen en het nog leuk zou vinden ook!',
    },
    {
      name: 'Niels Franzen',
      rating: 5,
      ago: '3 weken geleden',
      text: 'Ik ben nu ruim twee maanden onder begeleiding van Stef aan mijn gezondheid aan het werken. Het mooie is dat je in overleg met Stef je persoonlijke doelen kan vaststellen en dat je daarin wel uitgedaagd wordt op haalbaarheid. Nadat we mijn persoonlijke doelen hadden besproken word je door Stef ontzorgd. Hij maakt een realistisch plan van aanpak, zorgt voor voedingsschema\'s en een trainingsplanning die in overleg gedurende het traject naar wens aangepast kan worden. Zijn aanpak is echt maatwerk. Zijn uitleg tijdens het sporten en op het gebied van voeding is erg fijn en beperkt zich niet tot de contactmomenten; je kan Stef elk moment van de dag om advies vragen. En niet geheel onbelangrijk, het resultaat mag er zijn.',
    },
    {
      name: 'Kim de Rooij',
      rating: 5,
      ago: '1 maand geleden',
      text: 'Top personal trainer!\n\nIk kwam bij Stef, omdat ik het krachttrainen weer wilde oppakken na een tijd eruit te hebben gelegen. Het belangrijkste vond ik dat mijn houding tijdens het trainen goed was en ik niets zou forceren.\n\nWat een top training was dat! Hij weet alles op een duidelijke en rustige manier uit te leggen. Ook zijn tips zijn super handig en goed te onthouden.\n\nEcht een aanrader 😍',
    },
    {
      name: 'Lara de Gelder',
      rating: 5,
      ago: '2 maanden geleden',
      text: 'Stef is een goede coach. Ik kwam hier na een maand lang erg ziek te zijn geweest om letterlijk en figuurlijk eerst weer op krachten te komen. En daarna te bouwen aan mijn conditie en kracht.\n\nOmdat ik zelf al veel weet van voeding en sport (als yogadocent) pastte hij hier heel goed zijn uitleg en training op aan. Uitleg over verschillende spiergroepen en hoe die benut worden bij de verschillende oefeningen.\n\nOmdat ik nooit in een sportschool ben geweest en er zelfs lichtelijk iets op tegen had, heeft hij in het begin me helemaal meegenomen. Na een paar weken begonnen we wat meer uitdagende oefeningen te doen. Na twee maanden kon ik inzien waarom de sportschool een goede aanvulling is bij de sporten die ik al doe en bouwde ik langzaam mijn kracht op. Na drie maanden kreeg ik er zelfs lol in! Sterkere spieren helpen ook mijn yoga en klimsport vooruit.\n\nStef heeft een goede kennis over spier ontwikkeling, en oefeningen die het best bij je persoonlijke doelen passen. Ook let hij heel goed op techniek, zodat als je \'zelfstanding\' gaat trainen het zeker op de juiste manier aanpakt. Ook is het fijn dat hij erg flexibel is in de dagen waarop je samen traint. Ook komt hij met nieuwe frisse ideeën. Een aanrader voor iedereen die een stap verder wil komen in een fittere leefstijl!',
    },
    {
      name: 'Karolina S',
      rating: 5,
      ago: '2 maanden geleden',
      text: 'Ik raad Candeias Coaching aan aan iedereen die actief en concreet aan de slag wilt. Hij heeft een geweldig trainingsplan voor mij opgesteld, tijdens onze trainingssessies mijn techniek goed in de gaten gehouden en gecorrigeerd. Mijn dieet is ook aangepast en alles bij elkaar heeft ervoor gezorgd dat mijn doelen zijn bereikt en zelfs overtroffen.',
    },
    {
      name: 'Egy Dhio',
      rating: 5,
      ago: '2 maanden geleden',
      text: 'Great coach, gives great advice and clear instructions',
    },
    {
      name: 'George Steven',
      rating: 5,
      ago: '2 maanden geleden',
      text: 'I worked with Stef for a few sessions via early online coaching and its made a huge impact on my training and nutrition. I had roughly 6 months of consistent lifting experience and my goal has been to lose weight and build muscle. The problems I faced was a lack of understanding of proper nutrition and progression models.\n\nWhat is clear about Stef is how great he is at breaking down concepts to a level that I, or any other beginner, can understand. One key thing he clarified about nutrition was the energy balance. I knew that I had to change my eating habits, and started substituting "junk" foods with "healthy" foods. However, I was not aware I was overeating by eating at my maintenance calories. My weight loss became stagnant until he explained this. He also explained very well carb timing around training and varying the calorie intake on rest days vs training days. This improved my performance in the gym and I saw significantly improved performance. I also lost 5kg since taking on his advice. Another topic Stef illustrated a great understanding of was progression systems. He taught me to use double progression for my lifts - hitting the top of the rep range over a series of sessions before increasing load. I saw steady strength increases in my compound movements.\n\nStef is also a very compassionate trainer. When I wanted to give up due to mental health difficulties, he chatted with me one on one and listened. He gave great encouragement to me and I still use that today to keep pushing myself to be the best I can. I cannot thank Stef enough for his approach to coaching. I highly recommend Stef to those who are looking to start training themselves.',
    },
    {
      name: 'samuelhuusko',
      rating: 5,
      ago: '2 maanden geleden',
      text: 'His approach to coaching is easy to understand and very thorough.',
    },
    {
      name: 'emmely bosman',
      rating: 5,
      ago: '2 maanden geleden',
      text: 'Stef is een geweldige personal trainer die mij enorm heeft geholpen, zowel fysiek als mentaal. Dankzij zijn begeleiding heb ik niet alleen gewerkt aan mijn conditie en doelen, maar ook veel meer zelfvertrouwen opgebouwd. Ook maakt hij duidelijke en haalbare schema\'s op maat.\n\nStef motiveert op een fijne manier, luistert goed en past trainingen aan op wat jij nodig hebt. Hierdoor voel ik me sterker, fitter en zekerder dan voorheen. Zeker een aanrader voor iedereen die serieus aan zichzelf wil werken!',
    },
  ],
  en: [
    {
      name: 'Angelique Franzen',
      rating: 5,
      ago: '3 weeks ago',
      text: 'I wanted to work on my health, but I really dreaded going to the gym. I got to know Stef as a very pleasant person who quickly removed all those barriers. His calm approach and explanations work very well for me. During training he can really challenge me, but he quickly sees when the limit has been reached. After a session you always go home feeling good and you know what you can do on your own next time. He corrects where needed, but he is also generous with compliments. For me he is a real motivator and a strong push in the right direction. I did not expect to feel so much fitter so quickly and to actually enjoy it too!',
    },
    {
      name: 'Niels Franzen',
      rating: 5,
      ago: '3 weeks ago',
      text: 'I have been working on my health with Stef for well over two months now. The great thing is that together with Stef you can define your personal goals, and he still challenges you on whether they are realistic. After we discussed my goals, Stef took a lot off my plate. He created a realistic plan, provided nutrition schedules, and set up a training plan that can be adjusted during the process whenever needed. His approach is truly tailored. His explanations during training and around nutrition are very helpful and are not limited to the contact moments; you can ask Stef for advice at any time of day. And not unimportant: the results speak for themselves.',
    },
    {
      name: 'Kim de Rooij',
      rating: 5,
      ago: '1 month ago',
      text: 'Top personal trainer!\n\nI came to Stef because I wanted to get back into strength training after a while away from it. The most important thing for me was that my posture during training was good and that I wouldn\'t force anything.\n\nWhat a great training session that was! He explains everything in a clear and calm way. His tips are also super useful and easy to remember.\n\nHighly recommended 😍',
    },
    {
      name: 'Lara de Gelder',
      rating: 5,
      ago: '2 months ago',
      text: 'Stef is a great coach. I came to him after a month of being very ill, to first regain my strength — both literally and figuratively — and then build up my conditioning and strength.\n\nBecause I already know a lot about nutrition and sport (as a yoga teacher), he tailored his explanations and training accordingly, covering the different muscle groups and how they\'re used in various exercises.\n\nBecause I had never been to a gym and was even slightly opposed to it, he eased me in completely at the start. After a few weeks we began doing more challenging exercises. After two months I could see why the gym is a great complement to the sports I already do, and I was slowly building strength. After three months I was even enjoying it! Stronger muscles also help my yoga and climbing.\n\nStef has solid knowledge of muscle development and the exercises that best fit your personal goals. He also pays close attention to technique, so when you train on your own you\'ll do it the right way. It\'s also great that he\'s very flexible with training days, and he comes up with fresh new ideas. Recommended for anyone who wants to take a step further toward a fitter lifestyle!',
    },
    {
      name: 'Karolina S',
      rating: 5,
      ago: '2 months ago',
      text: 'I highly recommend Candeias Coaching to anyone who wants practical, concrete progress. He created a great training plan for me, closely watched and corrected my technique during sessions, and adjusted my diet. Together, this helped me reach and even exceed my goals.',
    },
    {
      name: 'Egy Dhio',
      rating: 5,
      ago: '2 months ago',
      text: 'Great coach, gives great advice and clear instructions',
    },
    {
      name: 'George Steven',
      rating: 5,
      ago: '2 months ago',
      text: 'I worked with Stef for a few sessions via early online coaching and its made a huge impact on my training and nutrition. I had roughly 6 months of consistent lifting experience and my goal has been to lose weight and build muscle. The problems I faced was a lack of understanding of proper nutrition and progression models.\n\nWhat is clear about Stef is how great he is at breaking down concepts to a level that I, or any other beginner, can understand. One key thing he clarified about nutrition was the energy balance. I knew that I had to change my eating habits, and started substituting "junk" foods with "healthy" foods. However, I was not aware I was overeating by eating at my maintenance calories. My weight loss became stagnant until he explained this. He also explained very well carb timing around training and varying the calorie intake on rest days vs training days. This improved my performance in the gym and I saw significantly improved performance. I also lost 5kg since taking on his advice. Another topic Stef illustrated a great understanding of was progression systems. He taught me to use double progression for my lifts - hitting the top of the rep range over a series of sessions before increasing load. I saw steady strength increases in my compound movements.\n\nStef is also a very compassionate trainer. When I wanted to give up due to mental health difficulties, he chatted with me one on one and listened. He gave great encouragement to me and I still use that today to keep pushing myself to be the best I can. I cannot thank Stef enough for his approach to coaching. I highly recommend Stef to those who are looking to start training themselves.',
    },
    {
      name: 'samuelhuusko',
      rating: 5,
      ago: '2 months ago',
      text: 'His approach to coaching is easy to understand and very thorough.',
    },
    {
      name: 'emmely bosman',
      rating: 5,
      ago: '2 months ago',
      text: 'Stef is an excellent personal trainer who has helped me enormously, both physically and mentally. Thanks to his guidance, I not only worked on my fitness and goals, but also built much more self-confidence. He also creates clear and realistic custom plans.\n\nStef motivates in a very pleasant way, listens carefully, and adapts training to what you need. Because of that I feel stronger, fitter, and more confident than before. Definitely recommended for anyone who seriously wants to work on themselves!',
    },
  ],
};

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

type SectionId = 'home' | 'plans' | 'starter' | 'standard' | 'first-block' | 'about';

export default function Home() {
  const { locale } = useLanguage();
  const copy = siteCopy[locale];
  const [activeReview, setActiveReview] = useState(0);
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [plansPanel, setPlansPanel] = useState<'summary' | 'details'>('summary');
  const [aboutPanel, setAboutPanel] = useState<'vision' | 'bio'>('vision');
  const [contactExpanded, setContactExpanded] = useState(false);
  const [chromeCollapsed, setChromeCollapsed] = useState(false);
  const [chromeInteracting, setChromeInteracting] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const [visionParallaxY, setVisionParallaxY] = useState(0);
  const [activeVisionShot, setActiveVisionShot] = useState(0);
  const [activePlansShots, setActivePlansShots] = useState([0, 3, 6, 9]);
  const [homeBannerW, setHomeBannerW] = useState(0);
  const [visionInView, setVisionInView] = useState(false);
  const [plansInView, setPlansInView] = useState(false);
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
  const homeTopRot = homeBannerW ? `rotate(${rad2deg(Math.atan2(-50, homeBannerW))}deg)` : 'rotate(-1.7deg)';
  const homeBotRot = homeBannerW ? `rotate(${rad2deg(Math.atan2(30, homeBannerW))}deg)` : 'rotate(1.0deg)';

  const [reviews, setReviews] = useState<ReviewItem[]>(FALLBACK_REVIEWS[locale === 'nl' ? 'nl' : 'en']);

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

  const additionalPlans: Array<{ id: string; plan: PlanDetailCard; ctaHref?: string }> = [
    { id: 'starter', plan: copy.home.planDetails.starter, ctaHref: EVERFIT_ONLINE_12_WEEKS_URL },
    { id: 'standard', plan: copy.home.planDetails.standard },
    { id: 'advanced', plan: copy.home.planDetails.advanced },
    { id: 'premium', plan: copy.home.planDetails.premium },
    { id: 'online4', plan: copy.home.planDetails.online4, ctaHref: EVERFIT_ONLINE_4_WEEKS_URL },
    { id: 'tenSessions', plan: copy.home.planDetails.tenSessions },
    { id: 'varia', plan: copy.home.planDetails.varia },
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

  // Fetch reviews from Google Places API with fallback to hardcoded reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/reviews?locale=${locale}`);
        const data = await response.json();
        
        if (data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews);
        } else {
          // Fallback to hardcoded reviews if API returns empty
          setReviews(FALLBACK_REVIEWS[locale === 'nl' ? 'nl' : 'en']);
        }
      } catch (error) {
        console.warn('Failed to fetch Google reviews, using fallback:', error);
        // Fallback to hardcoded reviews if API fails
        setReviews(FALLBACK_REVIEWS[locale === 'nl' ? 'nl' : 'en']);
      }
    };

    fetchReviews();
  }, [locale]);

  useEffect(() => {
    const observers: ResizeObserver[] = [];
    if (homeBannerRef.current) {
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) setHomeBannerW(entry.contentRect.width);
      });
      ro.observe(homeBannerRef.current);
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
    const target = plansRef.current;
    if (!target) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setPlansInView(entry.intersectionRatio > 0.3);
        }
      },
      { root: mainRef.current, threshold: [0, 0.3, 0.6] },
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
    if (!visionInView) return;

    const intervalId = window.setInterval(() => {
      setActiveVisionShot((index) => (index + 1) % VISION_SHOTS.length);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [visionInView]);

  useEffect(() => {
    if (!plansInView) return;

    const timeoutIds: number[] = [];
    let disposed = false;

    const schedulePane = (paneIndex: number, initialDelay: boolean) => {
      const delay = initialDelay
        ? 3600 + paneIndex * 1300 + Math.random() * 2400
        : 7000 + Math.random() * 8000;

      timeoutIds[paneIndex] = window.setTimeout(() => {
        if (disposed) return;
        setActivePlansShots((shots) =>
          shots.map((shot, index) =>
            index === paneIndex ? (shot + 1) % VISION_SHOTS.length : shot,
          ),
        );
        schedulePane(paneIndex, false);
      }, delay);
    };

    [0, 1, 2, 3].forEach((paneIndex) => schedulePane(paneIndex, true));

    return () => {
      disposed = true;
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [plansInView]);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setParallaxY(el.scrollTop * 0.25);
        if (aboutRef.current) {
          const visionOffset = (el.scrollTop - aboutRef.current.offsetTop) * 0.12;
          setVisionParallaxY(Math.max(-60, Math.min(60, visionOffset)));
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

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    if (contactExpanded || chromeInteracting) {
      setChromeCollapsed(false);
      return;
    }

    let timeoutId = 0;
    const scheduleCollapse = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => setChromeCollapsed(true), 1400);
    };
    const handleScroll = () => {
      setChromeCollapsed(false);
      scheduleCollapse();
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    scheduleCollapse();
    return () => {
      el.removeEventListener('scroll', handleScroll);
      window.clearTimeout(timeoutId);
    };
  }, [contactExpanded, chromeInteracting]);

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
        <nav
          className={`site-nav fixed left-0 right-0 top-0 z-20 border-y border-white/15 bg-black/78 px-3 py-2.5 text-sm text-white/70 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur sm:px-4 sm:py-3 md:px-6 md:py-5 [@media(max-height:780px)]:py-1.5 [@media(max-height:780px)]:md:py-2 ${chromeCollapsed ? 'site-chrome-collapsed' : ''}`}
          onPointerEnter={() => setChromeInteracting(true)}
          onPointerLeave={() => setChromeInteracting(false)}
        >
          <div className="site-nav-inner mx-auto flex w-full max-w-6xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <button
              className="site-brand group flex items-center justify-center gap-2.5 self-center text-left md:justify-start sm:gap-4"
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
                className="site-brand-logo h-auto w-11 shrink-0 drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition duration-300 group-hover:scale-[1.04] sm:w-14 md:w-[4.5rem] [@media(max-height:780px)]:w-9 [@media(max-height:780px)]:sm:w-11 [@media(max-height:780px)]:md:w-14"
              />
              <div className="flex flex-col items-start">
                <span className="site-brand-title font-serif text-[1rem] uppercase tracking-[0.12em] text-white sm:text-xl sm:tracking-[0.18em] md:text-2xl">
                  Candeias
                </span>
                <span className="site-brand-subtitle text-[8px] uppercase tracking-[0.24em] text-white/60 sm:text-[10px] sm:tracking-[0.38em] md:text-[11px]">
                  Coaching
                </span>
              </div>
            </button>
            <div className="site-nav-links flex flex-wrap items-center justify-center gap-1.5 text-[9px] uppercase tracking-[0.14em] sm:gap-4 sm:text-[11px] sm:tracking-[0.22em] md:justify-end md:gap-8 md:text-xs md:tracking-[0.25em]">
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
        <div className="relative w-full shadow-[0_18px_40px_rgba(0,0,0,0.35)]" style={{ clipPath: 'polygon(0 50px, 100% 0, 100% calc(100% - 15px), 0 calc(100% - 40px))', marginTop: '-25px', marginBottom: '-40px' }}>
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
              style={{ top: '50px', transformOrigin: '0 0', transform: homeTopRot }}
            />
            <div
              className="pointer-events-none absolute inset-x-0 h-6 bg-gradient-to-t from-black/55 to-transparent"
              style={{ bottom: '40px', transformOrigin: '0 100%', transform: homeBotRot }}
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
        className={`relative z-10 mx-auto flex h-[100svh] min-h-0 snap-start items-stretch overflow-hidden px-6 transition-[padding] duration-500 md:h-screen ${
          chromeCollapsed
            ? 'pb-8 pt-12 md:pb-10 md:pt-14'
            : 'pb-[4.5rem] pt-[6.5rem] md:pb-16 md:pt-28 [@media(max-height:780px)]:pb-[4.5rem] [@media(max-height:780px)]:pt-20'
        }`}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 [clip-path:polygon(0_20px,100%_0,100%_calc(100%-24px),0_100%)] md:[clip-path:polygon(0_56px,100%_0,100%_calc(100%-48px),0_100%)]"
        >
          {[
            { className: 'left-0 top-0 h-[44%] w-[52%]', offset: 0 },
            { className: 'bottom-0 left-0 h-[56%] w-[52%]', offset: 3 },
            { className: 'right-0 top-0 h-[54%] w-[48%]', offset: 6 },
            { className: 'bottom-0 right-0 h-[46%] w-[48%]', offset: 9 },
          ].map((pane, paneIndex) => {
            const visibleShot = activePlansShots[paneIndex];
            const previousShot = (visibleShot - 1 + VISION_SHOTS.length) % VISION_SHOTS.length;
            return (
              <div key={pane.offset} className={`absolute overflow-hidden ${pane.className}`}>
                <Image
                  src={VISION_SHOTS[previousShot]}
                  alt=""
                  fill
                  sizes="52vw"
                  className="scale-[1.035] object-cover"
                />
                <Image
                  key={`${pane.offset}-${visibleShot}`}
                  src={VISION_SHOTS[visibleShot]}
                  alt=""
                  fill
                  sizes="52vw"
                  className="plans-gallery-reveal object-cover"
                />
              </div>
            );
          })}
          <div className="absolute inset-0 bg-black/[0.48] md:bg-black/[0.40]" />
          <svg
            className="absolute inset-0 h-full w-full overflow-visible"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="plans-gallery-border" filterUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="120">
                <feGaussianBlur stdDeviation="0.8" />
              </filter>
            </defs>
            <g stroke="rgba(0,0,0,0.9)" strokeWidth="1.8" vectorEffect="non-scaling-stroke" filter="url(#plans-gallery-border)">
              <line x1="-3" y1="2" x2="103" y2="-2" />
              <line x1="-3" y1="102" x2="103" y2="98" />
            </g>
          </svg>
          <div className="absolute bottom-0 left-[52%] top-0 w-[3px] bg-black/90" />
          <div className="absolute left-0 top-[44%] h-[3px] w-[52%] bg-black/90" />
          <div className="absolute left-[52%] right-0 top-[54%] h-[3px] bg-black/90" />
        </div>
        <div className="relative z-[1] mx-auto flex h-full min-h-0 w-full max-w-6xl flex-col overflow-hidden">
          <h2 className="shrink-0 text-center text-xs uppercase tracking-[0.35em] text-white/80">
            {copy.home.planDetails.title}
          </h2>
          <div className="mb-4 mt-3 flex shrink-0 justify-center md:mb-5 md:mt-4">
            <button
              type="button"
              onClick={() => setContactExpanded(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-black/45 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-[0_18px_40px_rgba(0,0,0,0.32)] backdrop-blur-sm transition hover:border-white/40 hover:bg-black/65"
            >
              <span>{locale === 'nl' ? 'Boek Gratis Consult' : 'Book Free Consultation'}</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
          <div
            className={`flex min-h-0 w-[200%] flex-1 transition-transform duration-700 ease-in-out ${
              plansPanel === 'details' ? 'translate-x-[-50%]' : 'translate-x-0'
            }`}
          >
            <div className="h-full min-h-0 w-1/2 shrink-0 pr-0 md:pr-6">
              <div className="mx-auto flex h-full min-h-0 max-w-3xl flex-col">
                <div className="plan-summary-cards grid min-h-0 flex-1 gap-6 overflow-y-auto pr-1 sm:grid-cols-2 sm:overflow-hidden">
                {[
                  {
                    id: 'starter',
                    ref: starterRef,
                    plan: copy.home.planDetails.starter,
                    ctaHref: EVERFIT_ONLINE_12_WEEKS_URL,
                  },
                  { id: 'standard', ref: standardRef, plan: copy.home.planDetails.standard },
                ].map((item) => (
                  <article
                    key={item.id}
                    id={item.id}
                    ref={item.ref}
                    className="plan-summary-card flex flex-col scroll-mt-32 border border-white/[0.18] bg-black/[0.44] p-6 text-left shadow-[0_18px_40px_rgba(0,0,0,0.32)] backdrop-blur-sm sm:h-full sm:min-h-0 sm:p-8"
                  >
                    <h3 className="plan-summary-title text-sm font-semibold uppercase tracking-[0.12em] text-white">
                      {item.plan.title}
                    </h3>
                    <ul className="plan-summary-features mt-6 space-y-3 text-sm text-white/72 sm:text-base">
                      {item.plan.features.map((feature) => (
                        <li key={feature} className="flex gap-3">
                          <span className="text-white/45">-</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {item.ctaHref && (
                      <a
                        href={item.ctaHref}
                        target="_blank"
                        rel="noreferrer"
                        className="plan-summary-book mt-6 inline-flex items-center justify-center gap-2 self-center rounded-xl border border-white/25 bg-white/8 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white/45 hover:bg-white/12"
                      >
                        <span>{locale === 'nl' ? 'Boek nu' : 'Book now'}</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    <p className="plan-summary-price mt-auto pt-8 text-center text-3xl font-bold tracking-[0.04em] text-white">
                      {item.plan.price}
                    </p>
                  </article>
                ))}
                </div>
                <button
                  id="more"
                  ref={moreRef}
                  type="button"
                  onClick={revealPlanDetails}
                  className="mt-4 shrink-0 border border-white/[0.16] bg-black/[0.40] px-6 py-3 text-center shadow-[0_18px_40px_rgba(0,0,0,0.28)] backdrop-blur-sm transition hover:border-white/[0.28] hover:bg-black/[0.48] hover:text-white sm:py-4"
                >
                  <span className="block text-sm font-semibold uppercase tracking-[0.22em] text-white">
                    {copy.home.planDetails.more.title}
                  </span>
                  <span className="mt-1.5 block text-xs uppercase tracking-[0.24em] text-white/55">
                    {copy.home.planDetails.more.action}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex h-full min-h-0 w-1/2 shrink-0 flex-col pl-0 md:pl-6">
              <div className="flex shrink-0 items-center justify-start">
                <button
                  type="button"
                  className="text-[10px] uppercase tracking-[0.22em] text-white/55 transition hover:text-white"
                  onClick={() => setPlansPanel('summary')}
                >
                  ←{' '}
                  {copy.home.planDetails.back}
                </button>
              </div>
              <div className="mx-auto mt-1 grid min-h-0 w-full max-w-3xl flex-1 items-stretch gap-5 overflow-y-auto pr-2 sm:grid-cols-2">
                {additionalPlans.map((item) => (
                  <article
                    key={item.id}
                    className="flex flex-col border border-white/[0.18] bg-black/[0.44] p-5 text-left shadow-[0_18px_40px_rgba(0,0,0,0.24)] backdrop-blur-sm"
                  >
                    <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-white underline decoration-white/60 underline-offset-4">
                      {item.plan.title}
                    </h3>
                    <ul className="mt-5 space-y-2 text-sm text-white/72">
                      {item.plan.features.map((feature) => (
                        <li key={feature} className="flex gap-3">
                          <span className="text-white/45">-</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {item.ctaHref && (
                      <a
                        href={item.ctaHref}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex items-center justify-center gap-2 self-center rounded-xl border border-white/25 bg-white/8 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white/45 hover:bg-white/12"
                      >
                        <span>{locale === 'nl' ? 'Boek nu' : 'Book now'}</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    {item.plan.price && (
                      <p className="mt-auto pt-6 text-center text-2xl font-bold tracking-[0.04em] text-white">
                        {item.plan.price}
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
        className="relative z-10 mx-auto flex min-h-[100svh] snap-end flex-col justify-start px-6 pt-32 scroll-mt-24 md:min-h-screen md:pt-36"
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
            <div className="flex flex-col items-start gap-3 border-t border-white/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-5">
              <a
                href={FIRST_BLOCK_PDF_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-white/70 transition hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M11 3a1 1 0 100 2h2.586L8.293 10.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
                {locale === 'nl' ? 'PDF bekijken' : 'View PDF'}
              </a>
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.14em] text-white/70 sm:gap-3 sm:text-sm sm:tracking-[0.2em]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                {locale === 'nl' ? 'Downloaden' : 'Download'}
                <a href={FIRST_BLOCK_PDF_URL} target="_blank" rel="noreferrer" className="transition hover:text-white">
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
              <div className="relative w-full">
                <div className="relative w-full [clip-path:polygon(0_0,100%_20px,100%_calc(100%-24px),0_calc(100%-8px))] md:[clip-path:polygon(0_0,100%_80px,100%_calc(100%-60px),0_calc(100%-20px))]">
                <div
                  ref={visionBannerRef}
                  className="relative min-h-[420px] w-full overflow-hidden sm:min-h-[500px] md:min-h-[580px]"
                >
                  <div
                    className="absolute -inset-y-16 inset-x-0 grid md:grid-cols-2"
                    style={{ transform: `translate3d(0, ${visionParallaxY}px, 0)`, willChange: 'transform' }}
                    aria-hidden="true"
                  >
                    <div className="relative overflow-hidden">
                      {VISION_SHOTS.map((shot, index) => (
                        <Image
                          key={shot}
                          src={shot}
                          alt=""
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className={`object-cover object-center transition-[opacity,transform] duration-1000 ease-out ${
                            index === activeVisionShot ? 'scale-100 opacity-100' : 'scale-[1.035] opacity-0'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="relative hidden overflow-hidden border-l border-white/20 md:block">
                      {VISION_SHOTS.map((shot, index) => (
                        <Image
                          key={shot}
                          src={shot}
                          alt=""
                          fill
                          sizes="50vw"
                          className={`object-cover object-center transition-[opacity,transform] duration-1000 ease-out ${
                            index === (activeVisionShot + 1) % VISION_SHOTS.length
                              ? 'scale-100 opacity-100'
                              : 'scale-[1.035] opacity-0'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35" />
                  <svg
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-0 z-[1] h-14 w-screen max-w-full overflow-visible md:hidden"
                    viewBox="0 0 100 56"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <filter id="vision-top-mobile-shadow" filterUnits="userSpaceOnUse" x="-50" y="-50" width="200" height="156">
                        <feGaussianBlur stdDeviation="9" />
                      </filter>
                    </defs>
                    <line x1="-10" y1="-2" x2="110" y2="22" stroke="rgba(0,0,0,0.85)" strokeWidth="22" vectorEffect="non-scaling-stroke" filter="url(#vision-top-mobile-shadow)" />
                  </svg>
                  <svg
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 z-[1] hidden h-[124px] w-full overflow-visible md:block"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <filter id="vision-top-desktop-shadow" x="-50%" y="-75%" width="200%" height="250%">
                        <feGaussianBlur stdDeviation="12" />
                      </filter>
                    </defs>
                    <line x1="-10%" y1="-8" x2="110%" y2="88" stroke="rgba(0,0,0,0.88)" strokeWidth="28" filter="url(#vision-top-desktop-shadow)" />
                  </svg>
                  <svg
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-0 z-[1] h-14 w-screen max-w-full overflow-visible md:hidden"
                    viewBox="0 0 100 56"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <filter id="vision-bottom-mobile-shadow" filterUnits="userSpaceOnUse" x="-50" y="-50" width="200" height="156">
                        <feGaussianBlur stdDeviation="9" />
                      </filter>
                    </defs>
                    <line x1="-10" y1="49.6" x2="110" y2="30.4" stroke="rgba(0,0,0,0.85)" strokeWidth="22" vectorEffect="non-scaling-stroke" filter="url(#vision-bottom-mobile-shadow)" />
                  </svg>
                  <svg
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] hidden h-[100px] w-full overflow-visible md:block"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <filter id="vision-bottom-desktop-shadow" x="-50%" y="-75%" width="200%" height="250%">
                        <feGaussianBlur stdDeviation="12" />
                      </filter>
                    </defs>
                    <line x1="-10%" y1="84" x2="110%" y2="36" stroke="rgba(0,0,0,0.88)" strokeWidth="28" filter="url(#vision-bottom-desktop-shadow)" />
                  </svg>
                  <div className="relative mx-auto flex h-full w-full max-w-6xl items-center px-4 py-8 sm:px-6 md:px-10">
                    <div className="max-w-2xl text-left">
                      <div className="relative px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-8">
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 bg-black/35 shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
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

      <div
        className={`site-contact-bar fixed inset-x-0 bottom-0 z-30 overflow-hidden border-y border-white/15 bg-black/88 text-white shadow-[0_-12px_40px_rgba(0,0,0,0.45)] backdrop-blur ${chromeCollapsed ? 'site-chrome-collapsed' : ''}`}
        onPointerEnter={() => setChromeInteracting(true)}
        onPointerLeave={() => setChromeInteracting(false)}
      >
        <button
          type="button"
          aria-expanded={contactExpanded}
          className="site-contact-trigger mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 text-left text-white/80 transition hover:text-white md:px-6"
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
          <span className="site-contact-summary hidden min-w-0 flex-1 items-center justify-center gap-6 text-[11px] tracking-[0.12em] text-white/65 md:flex">
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
