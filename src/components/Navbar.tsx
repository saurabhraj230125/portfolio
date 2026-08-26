import { useState } from 'react';

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Work', href: '#projects' },
  { label: 'Creative', href: '#creative' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ─── Fixed Navbar ─── */}
      <nav
        className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5"
        style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.7) 0%, transparent 100%)', backdropFilter: 'none' }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 no-underline">
          <span
            className="text-[21px] sm:text-[26px] tracking-tight text-white leading-none"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            SR
          </span>
          <span
            className="text-[25px] sm:text-[30px] text-white select-none leading-none"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
            ✳︎
          </span>
        </a>

        {/* Desktop center nav links */}
        <div className="hidden md:flex items-center text-[18px] text-white gap-1" role="navigation">
          {NAV_LINKS.map((link, i) => (
            <span key={link.label}>
              <a
                href={link.href}
                className="hover:opacity-60 transition-opacity duration-200"
              >
                {link.label}
              </a>
              {i < NAV_LINKS.length - 1 && (
                <span className="opacity-40 select-none mx-[2px]">, </span>
              )}
            </span>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden md:block text-[18px] text-white underline underline-offset-2 hover:opacity-60 transition-opacity duration-200"
        >
          Let's build →
        </a>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-button"
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 cursor-pointer bg-transparent border-none p-0"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span
            className="block w-6 h-[2px] bg-white transition-all duration-300 origin-center"
            style={{ transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }}
          />
          <span
            className="block w-6 h-[2px] bg-white transition-all duration-300"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-[2px] bg-white transition-all duration-300 origin-center"
            style={{ transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }}
          />
        </button>
      </nav>

      {/* ─── Mobile overlay ─── */}
      <div
        id="mobile-menu-overlay"
        className="fixed inset-0 bg-black/95 backdrop-blur-md z-[9] flex flex-col justify-center px-8 gap-7 md:hidden transition-opacity duration-300"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-[36px] font-medium text-white hover:opacity-50 transition-opacity duration-200"
            style={{ fontFamily: 'var(--font-heading)' }}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="text-[36px] font-medium text-white underline underline-offset-4 hover:opacity-50 transition-opacity duration-200"
          style={{ fontFamily: 'var(--font-heading)' }}
          onClick={() => setMenuOpen(false)}
        >
          Let's build →
        </a>
      </div>
    </>
  );
}
