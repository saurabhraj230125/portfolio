import { useEffect, useState } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const TYPEWRITER_TEXT =
  "Hey — I'm Saurabh Raj. I build products that actually work. SaaS platforms, creative tools, and agencies born from real problems. What are we making next?";

const PILLS = [
  { id: 'pill-work', label: '→ View Projects', href: '#projects' },
  { id: 'pill-creative', label: '✦ Creative Side', href: '#creative' },
  { id: 'pill-about', label: 'About me', href: '#about' },
  { id: 'pill-contact', label: '💬 WhatsApp Me', href: 'https://wa.me/916306814355' },
];

const EMAIL = 'hello@saurabhraj.dev';

function CopyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export default function HeroSection() {
  const { displayed, done } = useTypewriter({ text: TYPEWRITER_TEXT, speed: 32, startDelay: 700 });

  const [pillsVisible, setPillsVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setPillsVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  const handleCopyEmail = async () => {
    try { await navigator.clipboard.writeText(EMAIL); } catch { /* silent */ }
  };

  return (
    <section
      id="hero"
      className="relative z-[1] h-screen flex flex-col justify-end pb-14 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden"
      aria-label="Hero"
    >
      {/* Gradient overlays for text legibility */}
      {/* Desktop: Left-to-right gradient */}
      <div
        className="hidden md:block absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(105deg, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.4) 55%, rgba(8,8,8,0) 100%)',
        }}
      />
      {/* Mobile: Bottom-to-top gradient (leaves the top character fully visible) */}
      <div
        className="md:hidden absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.6) 45%, rgba(8,8,8,0) 85%)',
        }}
      />

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #080808)' }}
      />

      <div className="relative z-10 max-w-xl">
        {/* Eyebrow blurred label */}
        <p
          className="pointer-events-none select-none mb-5 sm:mb-6 text-white"
          style={{
            fontSize: 'clamp(16px, 3.5vw, 22px)',
            lineHeight: 1.3,
            fontWeight: 400,
            filter: 'blur(4px)',
          }}
          aria-hidden="true"
        >
          Full-Stack Developer · Founder · Creative
          <br />
          Building from India, shipping everywhere
        </p>

        {/* Typewriter text */}
        <p
          className="text-white mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.4,
            fontWeight: 400,
            minHeight: '60px',
          }}
        >
          {displayed}
          {!done && (
            <span
              className="cursor-blink inline-block w-[2px] bg-white align-middle ml-[2px]"
              style={{ height: '1.1em' }}
              aria-hidden="true"
            />
          )}
        </p>

        {/* Action pill buttons */}
        <div
          className="flex flex-wrap gap-y-1"
          style={{
            opacity: pillsVisible ? 1 : 0,
            transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {PILLS.map((pill) => (
            <a
              key={pill.id}
              id={pill.id}
              href={pill.href}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 no-underline"
            >
              {pill.label}
            </a>
          ))}

          {/* Email copy pill */}
          <button
            id="pill-email"
            onClick={handleCopyEmail}
            className="inline-flex items-center justify-center gap-2 sm:gap-3 text-white bg-transparent border border-white/60 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer"
            title="Click to copy email"
            aria-label="Copy email address"
          >
            <span>
              Reach:{' '}
              <span className="underline underline-offset-1">{EMAIL}</span>
            </span>
            <CopyIcon />
          </button>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-6 right-8 hidden md:flex flex-col items-center gap-2"
        style={{ opacity: pillsVisible ? 0.4 : 0, transition: 'opacity 0.6s ease 1s' }}
        aria-hidden="true"
      >
        <span className="text-white text-[11px] tracking-widest uppercase rotate-90 origin-center translate-y-6">Scroll</span>
        <div className="w-[1px] h-10 bg-white/40 mt-6" />
      </div>
    </section>
  );
}
