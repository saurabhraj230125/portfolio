import { useInView } from '../hooks/useInView';

const SOCIALS = [
  { label: 'YouTube', href: '#', icon: '▶' },
  { label: 'GitHub', href: '#', icon: '⌥' },
  { label: 'Twitter/X', href: '#', icon: '✕' },
  { label: 'LinkedIn', href: '#', icon: 'in' },
  { label: 'WhatsApp', href: 'https://wa.me/916306814355', icon: '💬' },
];

function SectionTag({ label }: { label: string }) {
  return (
    <span className="inline-block border border-white/20 text-white/50 text-[11px] tracking-widest uppercase px-3 py-1 rounded-full">
      {label}
    </span>
  );
}

export default function ContactSection() {
  const { ref: sectionRef, inView } = useInView(0.05);

  return (
    <section
      id="contact"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative bg-[#080808] pt-24 md:pt-36 pb-16 px-5 sm:px-8 md:px-10 overflow-hidden"
    >
      {/* Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top divider */}
        <div className="section-divider mb-16 md:mb-24" />

        {/* CTA Block */}
        <div className={`reveal ${inView ? 'in-view' : ''} text-center`}>
          <SectionTag label="Get in touch" />
          <h2
            className="text-white mt-6 mb-6"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(40px, 7vw, 96px)',
              lineHeight: 1.0,
              letterSpacing: '-0.035em',
            }}
          >
            Let's build
            <br />
            <span
              className="gradient-text"
              style={{ backgroundImage: 'linear-gradient(90deg, #818cf8 0%, #c084fc 50%, #f472b6 100%)' }}
            >
              something real.
            </span>
          </h2>
          <p className="text-white/45 text-[16px] md:text-[18px] max-w-md mx-auto leading-relaxed mb-10">
            A SaaS idea, a website, a collaboration, or just a conversation — I'm all ears.
          </p>

          <div className={`flex flex-wrap justify-center gap-3 reveal ${inView ? 'in-view' : ''} delay-200`}>
            <a
              href="https://wa.me/916306814355"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white rounded-full px-6 py-3 text-[15px] font-medium hover:bg-[#20b858] transition-colors no-underline"
            >
              WhatsApp Me ↗
            </a>
            <a
              href="mailto:hello@saurabhraj.dev"
              className="inline-flex items-center gap-2 bg-white text-black rounded-full px-6 py-3 text-[15px] font-medium hover:bg-white/85 transition-colors no-underline"
            >
              Send an email
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-transparent text-white border border-white/25 rounded-full px-6 py-3 text-[15px] hover:border-white/50 transition-colors no-underline"
            >
              View my work
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-24 md:mt-32 flex flex-col md:flex-row items-center justify-between gap-8 reveal ${inView ? 'in-view' : ''} delay-300`}>
          {/* Left: Name + tagline */}
          <div>
            <p
              className="text-white text-[20px]"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}
            >
              Saurabh Raj ✳︎
            </p>
            <p className="text-white/30 text-[13px] mt-1">
              Full-Stack Developer · Founder · Creative
            </p>
          </div>

          {/* Center: Nav links */}
          <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {[
              { label: 'Work', href: '#projects' },
              { label: 'Creative', href: '#creative' },
              { label: 'About', href: '#about' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/40 text-[14px] hover:text-white/75 transition-colors no-underline"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Social icons */}
          <div className="flex items-center gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 text-[11px] hover:border-white/35 hover:text-white/75 transition-all no-underline"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row justify-between gap-2">
          <p className="text-white/20 text-[12px]">© 2026 Saurabh Raj. All rights reserved.</p>
          <p className="text-white/15 text-[12px]">Made with intent. Shipped with care.</p>
        </div>
      </div>
    </section>
  );
}
