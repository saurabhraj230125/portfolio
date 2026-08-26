import { useInView } from '../hooks/useInView';

interface Creative {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  accent: string;
  accentBg: string;
}

const CREATIVES: Creative[] = [
  {
    id: 'krish-nova',
    emoji: '📺',
    title: 'Krish Nova',
    subtitle: 'YouTube · Content Strategy · Creator',
    description:
      'My YouTube channel where I build in public, document my creative process, and share what it really looks like to ship products as a solo developer-founder.',
    details: [
      'Channel strategy & growth',
      'Cinematic thumbnail design',
      'Storytelling through tech',
      'Building in public',
    ],
    accent: '#FF5C5C',
    accentBg: 'rgba(255,92,92,0.08)',
  },
  {
    id: 'short-films',
    emoji: '🎬',
    title: 'Short Films',
    subtitle: 'Direction · Script · Color Grading',
    description:
      'I write, direct, and color-grade independent short films set in hostel corridors and college campuses — raw stories told with minimal crew and maximum emotion.',
    details: [
      'Original screenwriting',
      'On-set direction & blocking',
      'DaVinci Resolve color grading',
      'Hostel & campus cinema',
    ],
    accent: '#F97316',
    accentBg: 'rgba(249,115,22,0.08)',
  },
  {
    id: 'music',
    emoji: '🎸',
    title: 'Music',
    subtitle: 'Songwriting · Guitar · Vocals',
    description:
      'Acoustic songs written in quiet rooms, performed by myself — fingerpicking arrangements, introspective lyrics, and the kind of melodies that stick around longer than they should.',
    details: [
      'Original songwriting',
      'Acoustic guitar arrangements',
      'Vocal performance & recording',
      'Indie / folk sensibility',
    ],
    accent: '#A78BFA',
    accentBg: 'rgba(167,139,250,0.08)',
  },
];

function SectionTag({ label }: { label: string }) {
  return (
    <span className="inline-block border border-white/20 text-white/50 text-[11px] tracking-widest uppercase px-3 py-1 rounded-full">
      {label}
    </span>
  );
}

function CreativeCard({ item, delay, inView }: { item: Creative; delay: number; inView: boolean }) {
  return (
    <div
      className={`reveal ${inView ? 'in-view' : ''} delay-${delay * 100} flex flex-col gap-6 p-8 md:p-10 rounded-2xl relative overflow-hidden group`}
      style={{
        background: item.accentBg,
        border: `1px solid ${item.accent}25`,
      }}
    >
      {/* Ambient glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${item.accent}15 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px]"
        style={{ background: `linear-gradient(90deg, ${item.accent}80, transparent)` }}
      />

      <div className="flex items-start justify-between relative z-10">
        <span className="text-4xl">{item.emoji}</span>
        <span
          className="text-[11px] tracking-widest uppercase px-2 py-1 rounded-full"
          style={{
            color: item.accent,
            background: `${item.accent}18`,
            border: `1px solid ${item.accent}30`,
          }}
        >
          Creative
        </span>
      </div>

      <div className="relative z-10">
        <h3
          className="text-white mb-1"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(22px, 3vw, 28px)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          {item.title}
        </h3>
        <p className="text-[13px]" style={{ color: item.accent, opacity: 0.85 }}>
          {item.subtitle}
        </p>
      </div>

      <p className="text-white/55 leading-relaxed text-[15px] relative z-10">{item.description}</p>

      <ul className="flex flex-col gap-[10px] mt-auto relative z-10">
        {item.details.map((d) => (
          <li
            key={d}
            className="flex items-center gap-3 text-[13px] text-white/50"
          >
            <span
              className="w-[5px] h-[5px] rounded-full flex-shrink-0"
              style={{ background: item.accent, opacity: 0.7 }}
            />
            {d}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CreativeSection() {
  const { ref: sectionRef, inView } = useInView(0.05);

  return (
    <section
      id="creative"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-24 md:py-36 px-5 sm:px-8 md:px-10 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #080808 0%, #0c0c10 100%)' }}
    >
      {/* Large ambient blob */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(139,92,246,0.04) 0%, rgba(249,115,22,0.02) 50%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className={`mb-14 md:mb-20 reveal ${inView ? 'in-view' : ''}`}>
          <SectionTag label="Beyond the Code" />
          <div className="mt-4">
            <h2
              className="text-white"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(36px, 6vw, 72px)',
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
              }}
            >
              The{' '}
              <span
                className="gradient-text"
                style={{ backgroundImage: 'linear-gradient(90deg, #FB923C 0%, #A78BFA 100%)' }}
              >
                Creative
              </span>{' '}
              Side
            </h2>
            <p className="text-white/40 mt-4 text-[15px] max-w-md leading-relaxed">
              Building software is one form of expression. Here are the others.
            </p>
          </div>
        </div>

        {/* Creative cards — 3 column on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {CREATIVES.map((item, i) => (
            <CreativeCard key={item.id} item={item} delay={i + 1} inView={inView} />
          ))}
        </div>

        {/* Quote strip */}
        <div
          className={`mt-16 md:mt-24 py-10 px-8 md:px-14 rounded-2xl text-center reveal ${inView ? 'in-view' : ''} delay-500`}
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <blockquote
            className="text-white/70 italic"
            style={{ fontSize: 'clamp(16px, 2.5vw, 22px)', lineHeight: 1.6 }}
          >
            "Every product, frame, and chord is an attempt to make something that outlasts the moment it was made in."
          </blockquote>
          <p className="text-white/30 text-[13px] mt-4">— Saurabh Raj</p>
        </div>
      </div>
    </section>
  );
}
