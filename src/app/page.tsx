'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

type OptionCardProps = {
  title: string;
  image?: string;
  subtitle?: string;
  showTitle?: boolean;
  titleClassName?: string;
  sizeClassName?: string;
  href?: string;
  onSelect?: () => void;
};

function OptionCard({
  title,
  image,
  subtitle,
  showTitle = true,
  titleClassName,
  sizeClassName,
  href,
  onSelect,
}: OptionCardProps) {
  const content = (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
        style={{
          backgroundImage: image ? `url(${image})` : "url('/mockup/programcard.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 border-t border-white/10 bg-black/45 backdrop-blur" />
      <div className="relative flex h-full w-full flex-col items-center justify-end p-4 text-center">
        {subtitle && <p className="text-xs uppercase tracking-[0.3em] text-white/60">{subtitle}</p>}
        {showTitle && (
          <h3 className={titleClassName ?? 'mt-2 text-lg font-medium text-white'}>{title}</h3>
        )}
      </div>
    </>
  );

  const baseClass = `group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left shadow-[0_18px_40px_rgba(0,0,0,0.35)] ${
    sizeClassName ?? 'h-[176px] w-[255px]'
  }`;

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={baseClass} onClick={onSelect}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onSelect} className={baseClass}>
      {content}
    </button>
  );
}

const steps = [
  { id: 'plan', label: 'Choose your program.' },
  { id: 'gender', label: '' },
] as const;

type StepId = (typeof steps)[number]['id'];
type PlanId = 'starter4' | 'starter12' | 'premium12';

type SectionId = 'home' | 'about' | 'contact';

export default function Home() {
  const [step, setStep] = useState<StepId>('plan');
  const [headlineText, setHeadlineText] = useState(steps[0].label);
  const [plan, setPlan] = useState<PlanId | null>(null);
  const [activeSection, setActiveSection] = useState<SectionId>('home');

  const mainRef = useRef<HTMLDivElement | null>(null);
  const homeRef = useRef<HTMLElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  const progressIndex = useMemo(
    () => steps.findIndex((item) => item.id === step),
    [step]
  );
  const promptText = step === 'plan' ? steps[0].label : headlineText;

  useEffect(() => {
    if (activeSection === 'home' && homeRef.current) {
      homeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (activeSection === 'about' && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (activeSection === 'contact' && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeSection]);

  return (
    <main
      ref={mainRef}
      className="relative h-screen overflow-y-auto snap-y snap-mandatory text-white"
      style={{
        backgroundImage: "url('/mockup/bgtexture.jpg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
      }}
    >
      <header className="relative z-20">
        <nav className="fixed left-0 right-0 top-0 z-20 border-b border-white/10 bg-black/70 py-4 text-sm text-white/70 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur">
          <div className="mx-auto flex w-[min(90%,920px)] items-center justify-end gap-6 text-xs uppercase tracking-[0.25em]">
            <button
              className="transition hover:text-white"
              onClick={() => {
                setActiveSection('home');
                setStep('plan');
                homeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              Home
            </button>
            <button
              className="transition hover:text-white"
              onClick={() => {
                setActiveSection('about');
                aboutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              About
            </button>
            <button
              className="transition hover:text-white"
              onClick={() => {
                setActiveSection('contact');
                contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              Contact
            </button>
          </div>
        </nav>
      </header>

      <section
        id="home"
        ref={homeRef}
        className="relative z-10 mx-auto flex min-h-screen snap-start flex-col items-center justify-center px-6 pt-28 text-center scroll-mt-24 md:pt-32"
      >
        <div
          ref={logoRef}
          className="relative -mt-12 mb-6 flex h-[22rem] w-[22rem] items-center justify-center md:h-[26rem] md:w-[26rem]"
        >
          <Image
            src="/mockup/logo.png"
            alt="Candeias Coaching logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="mt-12 text-[21px] font-semibold uppercase tracking-[0.32em] text-white/70">
          Training Program - Mealplan - 1to1 Contact
        </h1>
        <div className="relative z-10 mx-auto mt-8 w-full max-w-5xl px-6 pb-20 text-center">
          <div className="flex items-center justify-center gap-3">
            {steps.map((item, index) => (
              <span
                key={item.id}
                className={`h-1.5 w-10 rounded-full ${
                  index <= progressIndex ? 'bg-white/80' : 'bg-white/15'
                }`}
              />
            ))}
          </div>

          {step !== 'start' && promptText && (
            <p className="mt-6 text-sm uppercase tracking-[0.3em] text-white/50">
              {promptText}
            </p>
          )}

          {step === 'plan' && (
            <div className="mt-8 grid justify-center justify-items-center gap-5 sm:grid-cols-3">
              <OptionCard
                title="Starter Online Coaching 4 Weeks"
                image="/mockup/4weeks.jpg"
                sizeClassName="h-[176px] w-[255px]"
                titleClassName="absolute bottom-[10px] left-0 right-0 text-[15px] tracking-[0.26em] text-white/80 [font-variant:small-caps]"
                onSelect={() => {
                  setHeadlineText('Starter Online Coaching 4 Weeks');
                  setPlan('starter4');
                  setStep('gender');
                }}
              />
              <OptionCard
                title="Starter Online Coaching 12 Weeks"
                image="/mockup/12weeks.jpg"
                sizeClassName="h-[176px] w-[255px]"
                titleClassName="absolute bottom-[10px] left-0 right-0 text-[15px] tracking-[0.26em] text-white/80 [font-variant:small-caps]"
                onSelect={() => {
                  setHeadlineText('Starter Online Coaching 12 Weeks');
                  setPlan('starter12');
                  setStep('gender');
                }}
              />
              <OptionCard
                title="Premium Online Coaching 12 Weeks"
                image="/mockup/12weeks.jpg"
                sizeClassName="h-[176px] w-[255px]"
                titleClassName="absolute bottom-[10px] left-0 right-0 text-[15px] tracking-[0.26em] text-white/80 [font-variant:small-caps]"
                onSelect={() => setHeadlineText('Premium Online Coaching 12 Weeks')}
                href="https://coach.everfit.io/package/MD799171"
              />
            </div>
          )}

          {step === 'gender' && plan !== 'premium12' && (
            <div className="mt-8 grid justify-center justify-items-center gap-6 sm:grid-cols-2">
              <OptionCard
                title="Male"
                image="/mockup/male.png"
                sizeClassName="h-[176px] w-[255px]"
                titleClassName="absolute bottom-[22px] left-0 right-0 text-base uppercase tracking-[0.3em] text-white/70"
                href={
                  plan === 'starter4'
                    ? 'https://coach.everfit.io/package/SK383306'
                    : 'https://coach.everfit.io/package/EV357808'
                }
              />
              <OptionCard
                title="Female"
                image="/mockup/female.png"
                sizeClassName="h-[176px] w-[255px]"
                titleClassName="absolute bottom-[22px] left-0 right-0 text-base uppercase tracking-[0.3em] text-white/70"
                href={
                  plan === 'starter4'
                    ? 'https://coach.everfit.io/package/QC927638'
                    : 'https://coach.everfit.io/package/UB075404'
                }
              />
            </div>
          )}

          <div className="mt-8 flex items-center justify-center gap-4 text-xs text-white/50">
            {step !== 'plan' && (
              <button
                className="transition hover:text-white"
                onClick={() => {
                  setPlan(null);
                  setStep('plan');
                  setHeadlineText(steps[0].label);
                }}
              >
                Restart
              </button>
            )}
            {step === 'gender' && (
              <button
                className="transition hover:text-white"
                onClick={() => {
                  setStep('plan');
                  setHeadlineText(steps[0].label);
                }}
              >
                Back
              </button>
            )}
          </div>
        </div>
      </section>

      <section
        id="about"
        ref={aboutRef}
        className="relative z-10 mx-auto flex min-h-screen snap-start items-center px-6 scroll-mt-24"
      >
        <div className="mx-auto -mt-14 w-full max-w-5xl">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="text-left">
              <h2 className="text-xs uppercase tracking-[0.35em] text-white/80">About</h2>
              <div className="mt-4 space-y-4 text-white/70">
                <p>Hi, I'm Stef.</p>
                <p>
                  I'm a personal trainer based in the Netherlands, and I'm here to help you
                  transform your physique and get in the best shape of your life.
                </p>
                <p>
                  My approach is grounded in evidence-based training and nutrition. I stay
                  current with the latest research to ensure my coaching methods are effective,
                  safe, and tailored to what actually works - not just what's trendy.
                </p>
                <p>
                  I'd describe my coaching style as positive and encouraging. I believe in
                  smart, sustainable training that matches your effort to your goals. Progress
                  does not require destroying yourself in the gym seven days a week - it
                  requires the right program, consistency, and a plan that fits your life.
                </p>
                <p>
                  Whether you're just starting out or looking to break through a plateau, I'm
                  here to guide you with a methodical, no-nonsense approach that gets results.
                </p>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="h-[28rem] w-[28rem] overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
                <Image
                  src="/mockup/stefbio.png"
                  alt="Stefan bio portrait"
                  width={512}
                  height={640}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        ref={contactRef}
        className="relative z-10 mx-auto flex min-h-screen snap-start items-center px-6 scroll-mt-24"
      >
        <div className="mx-auto -mt-14 w-full max-w-4xl text-center">
          <h2 className="text-xs uppercase tracking-[0.35em] text-white/80">Contact</h2>
          <div className="mt-10 grid justify-items-center gap-6 text-left">
            <a
              href="mailto:Candeiasstef@gmail.com"
              className="flex w-full max-w-[18.5rem] items-center gap-4 rounded-2xl border border-white/10 bg-black/15 px-5 py-4 text-white/80 shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition hover:backdrop-blur-sm hover:text-white"
            >
              <div className="flex h-10 w-10 items-center justify-center">
                <Image
                  src="/mockup/gmailcontacticon.png"
                  alt="Email icon"
                  width={22}
                  height={22}
                  className="h-[22px] w-[22px]"
                />
              </div>
              <span className="text-sm tracking-[0.12em]">Candeiasstef@gmail.com</span>
            </a>
            <a
              href="https://wa.me/31655577683"
              className="flex w-full max-w-[18.5rem] items-center gap-4 rounded-2xl border border-white/10 bg-black/15 px-5 py-4 text-white/80 shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition hover:backdrop-blur-sm hover:text-white"
            >
              <div className="flex h-10 w-10 items-center justify-center">
                <Image
                  src="/mockup/whatsappcontacticon.png"
                  alt="WhatsApp icon"
                  width={36}
                  height={36}
                  className="h-9 w-9"
                />
              </div>
              <span className="text-sm tracking-[0.12em]">0655577683</span>
            </a>
            <a
              href="https://www.instagram.com/candeiascoaching"
              target="_blank"
              rel="noreferrer"
              className="flex w-full max-w-[18.5rem] items-center gap-4 rounded-2xl border border-white/10 bg-black/15 px-5 py-4 text-white/80 shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition hover:backdrop-blur-sm hover:text-white"
            >
              <div className="flex h-10 w-10 items-center justify-center">
                <Image
                  src="/mockup/instacontacticon.png"
                  alt="Instagram icon"
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
              </div>
              <span className="text-sm tracking-[0.12em]">candeiascoaching</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-6 text-center text-xs text-white/50">
        <p>© 2026 Candeias Coaching. All rights reserved.</p>
      </footer>
    </main>
  );
}
