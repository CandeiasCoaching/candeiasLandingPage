'use client';

import { useEffect, useRef, useState } from 'react';

type VideoItem = {
  src: string;
  label: string;
};

type Props = {
  videos: VideoItem[];
  prevLabel?: string;
  nextLabel?: string;
};

export function VideoCarousel({ videos, prevLabel = 'Previous', nextLabel = 'Next' }: Props) {
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const [fullscreenIdx, setFullscreenIdx] = useState<number | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const fullscreenVideoRef = useRef<HTMLVideoElement | null>(null);

  const count = videos.length;
  const go = (delta: number) => setActive((i) => (i + delta + count) % count);

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      v.muted = i !== active ? true : muted;
      if (i === active && fullscreenIdx === null) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active, muted, fullscreenIdx]);

  useEffect(() => {
    if (fullscreenIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullscreenIdx(null);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [fullscreenIdx]);

  const requestFullscreen = (i: number) => {
    setFullscreenIdx(i);
  };

  return (
    <div className="relative w-full select-none">
      <div className="mb-4 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-white/80 transition-opacity duration-300 md:text-base">
          {videos[active]?.label}
        </p>
      </div>
      <div
        className="relative mx-auto h-[clamp(220px,42svh,440px)] w-full"
        style={{ perspective: '1400px' }}
      >
        <div
          className="relative h-full w-full"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {videos.map((video, i) => {
            let offset = i - active;
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;

            const abs = Math.abs(offset);
            const isActive = offset === 0;
            const visible = abs <= 2;

            const translateX = offset * 38; // percentage of container width
            const translateZ = isActive ? 0 : -180 * abs;
            const rotateY = offset * -28;
            const opacity = abs > 2 ? 0 : 1 - abs * 0.25;
            const zIndex = 100 - abs;

            return (
              <div
                key={video.src}
                aria-hidden={!visible}
                className={`absolute left-1/2 top-1/2 aspect-[9/16] h-[88%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_30px_60px_rgba(0,0,0,0.55)] transition-all duration-500 ease-out ${
                  isActive ? 'ring-1 ring-white/20' : ''
                }`}
                style={{
                  transform: `translate(-50%, -50%) translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                  opacity,
                  zIndex,
                  transformStyle: 'preserve-3d',
                  pointerEvents: visible ? 'auto' : 'none',
                }}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  src={video.src}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onClick={() => {
                    if (isActive) requestFullscreen(i);
                    else setActive(i);
                  }}
                  className={`h-full w-full object-cover ${isActive ? 'cursor-zoom-in' : 'cursor-pointer'}`}
                />
                {!isActive && (
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={video.label}
                    className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50"
                  />
                )}
                {isActive && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMuted((m) => !m);
                    }}
                    aria-label={muted ? 'Unmute' : 'Mute'}
                    aria-pressed={!muted}
                    className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/55 text-white/90 backdrop-blur-sm transition hover:bg-black/75 hover:text-white"
                  >
                    {muted ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                        <path d="M11 5 6 9H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3l5 4V5Z" />
                        <path d="m17.59 12 2.7-2.7a1 1 0 1 0-1.41-1.41L16.17 10.6 13.46 7.88a1 1 0 1 0-1.41 1.42L14.76 12l-2.71 2.71a1 1 0 1 0 1.41 1.41l2.71-2.7 2.71 2.7a1 1 0 0 0 1.41-1.41L17.59 12Z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                        <path d="M11 5 6 9H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3l5 4V5Z" />
                        <path d="M15.54 8.46a1 1 0 0 1 1.41 0 5 5 0 0 1 0 7.08 1 1 0 1 1-1.41-1.42 3 3 0 0 0 0-4.24 1 1 0 0 1 0-1.42Z" />
                        <path d="M18.36 5.64a1 1 0 0 1 1.41 0 9 9 0 0 1 0 12.72 1 1 0 1 1-1.41-1.41 7 7 0 0 0 0-9.9 1 1 0 0 1 0-1.41Z" />
                      </svg>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={prevLabel}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition hover:bg-white/15 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M12.707 4.293a1 1 0 010 1.414L8.414 10l4.293 4.293a1 1 0 11-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          {videos.map((v, i) => (
            <button
              key={v.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${v.label}`}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? 'w-6 bg-white' : 'w-1.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={nextLabel}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition hover:bg-white/15 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M7.293 15.707a1 1 0 010-1.414L11.586 10 7.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {fullscreenIdx !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={() => setFullscreenIdx(null)}
          role="dialog"
          aria-modal="true"
          aria-label={videos[fullscreenIdx]?.label}
        >
          <video
            ref={fullscreenVideoRef}
            src={videos[fullscreenIdx].src}
            autoPlay
            loop
            playsInline
            controls
            className="h-[100svh] w-auto max-w-[100vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => setFullscreenIdx(null)}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/55 text-white/90 backdrop-blur-sm transition hover:bg-black/75 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
