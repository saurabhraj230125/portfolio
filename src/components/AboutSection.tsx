import { useRef } from 'react';
import { useInView } from '../hooks/useInView';

const SKILLS = [
  { category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'TailwindCSS', 'Vite'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'Firebase'] },
  { category: 'Tools', items: ['Python', 'OpenCV', 'Git', 'Figma', 'Vercel'] },
  { category: 'Craft', items: ['UI/UX Design', 'Film Direction', 'Color Grading', 'Music', 'Content Strategy'] },
];

function SectionTag({ label }: { label: string }) {
  return (
    <span className="inline-block border border-white/20 text-white/50 text-[11px] tracking-widest uppercase px-3 py-1 rounded-full">
      {label}
    </span>
  );
}

export default function AboutSection() {
  const { ref: sectionRef, inView } = useInView();
  const skillsRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="about"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative bg-[#080808] py-24 md:py-36 px-5 sm:px-8 md:px-10 overflow-hidden"
    >
      {/* Subtle radial glow top-right */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 100% 0%, rgba(99,102,241,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        {/* Header row */}
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20 reveal ${inView ? 'in-view' : ''}`}>
          <div>
            <SectionTag label="About me" />
            <h2
              className="text-white mt-4"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(36px, 6vw, 72px)',
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
              }}
            >
              Builder.<br />
              <span
                className="gradient-text"
                style={{ backgroundImage: 'linear-gradient(90deg, #818cf8 0%, #c084fc 100%)' }}
              >
                Creator.
              </span><br />
              Founder.
            </h2>
          </div>
          <p
            className="text-white/55 max-w-md md:text-right"
            style={{ fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.75 }}
          >
            I'm <strong className="text-white/90">Saurabh Raj</strong> — a full-stack
            developer and creative builder from India. I build SaaS platforms,
            agency websites, and AI-powered tools that solve real problems for
            real people. From founding{' '}
            <strong className="text-white/90">CoachingWala</strong> to running
            my web agency <strong className="text-white/90">Future Q</strong>, I
            ship ideas that matter.
          </p>
        </div>

        {/* Divider */}
        <div className="section-divider mb-16" />

        {/* Skills grid */}
        <div
          ref={skillsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {SKILLS.map((group, i) => (
            <div
              key={group.category}
              className={`reveal ${inView ? 'in-view' : ''} delay-${(i + 1) * 100}`}
            >
              <p
                className="text-white/35 text-[11px] tracking-widest uppercase mb-4"
              >
                {group.category}
              </p>
              <ul className="flex flex-col gap-2">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="text-white/80 text-[14px] sm:text-[16px] flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stat row */}
        <div className={`mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 reveal ${inView ? 'in-view' : ''} delay-400`}>
          {[
            { value: '4+', label: 'Products Shipped' },
            { value: '2', label: 'Ventures Founded' },
            { value: '∞', label: 'Ideas in the Queue' },
            { value: '1', label: 'Goal: Build What Lasts' },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                className="text-white"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(32px, 5vw, 56px)',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                {stat.value}
              </p>
              <p className="text-white/40 text-[13px] mt-2 leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
