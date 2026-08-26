import { useInView } from '../hooks/useInView';

interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  accent: string;
  accentLight: string;
  icon: string;
  link?: string;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: 'coachingwala',
    number: '01',
    title: 'CoachingWala',
    tagline: 'SaaS ERP · Coaching Institutes',
    description:
      'A complete SaaS platform built for coaching institutes — handling student admissions, real-time attendance tracking, and full fee ledger management. Designed to automate the back-office so owners can focus on teaching.',
    tags: ['React', 'Node.js', 'MongoDB', 'SaaS', 'ERP', 'Dashboard'],
    accent: '#3B82F6',
    accentLight: 'rgba(59,130,246,0.12)',
    icon: '🎓',
    featured: true,
  },
  {
    id: 'futureq',
    number: '02',
    title: 'Future Q',
    tagline: 'Web Agency · UI/UX · Automation',
    description:
      'A creative web development agency delivering modern websites, intuitive UI/UX design, and workflow automation for businesses — at prices that make sense for every founder.',
    tags: ['Next.js', 'TailwindCSS', 'Figma', 'Agency', 'Automation'],
    accent: '#8B5CF6',
    accentLight: 'rgba(139,92,246,0.12)',
    icon: '⚡',
  },
  {
    id: 'cricket-ai',
    number: '03',
    title: 'Cricket AI Coach',
    tagline: 'Biomechanics · Motion Tracking · Python',
    description:
      'A Python-based tool using OpenCV for biomechanical motion analysis of cricket batting techniques. Tracks body keypoints, simulates ball trajectory, and delivers actionable coaching feedback.',
    tags: ['Python', 'OpenCV', 'NumPy', 'Computer Vision', 'AI'],
    accent: '#10B981',
    accentLight: 'rgba(16,185,129,0.12)',
    icon: '🏏',
  },
  {
    id: 'focusmode',
    number: '04',
    title: 'Focusmode.online',
    tagline: 'Study Workspace · Web App · Students',
    description:
      'A distraction-free, browser-based study workspace and video player built for students. Clean interface, ambient sound options, and a focused video player that removes every distraction.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Web App', 'EdTech'],
    accent: '#F59E0B',
    accentLight: 'rgba(245,158,11,0.12)',
    icon: '🎯',
    link: 'https://focusmode.online',
  },
];

function ProjectCard({ project, delay, inView }: { project: Project; delay: number; inView: boolean }) {
  return (
    <div
      className={`project-card reveal ${inView ? 'in-view' : ''} delay-${delay * 100}`}
      style={{
        background: `linear-gradient(135deg, ${project.accentLight} 0%, rgba(255,255,255,0.02) 100%)`,
        border: `1px solid ${project.accent}22`,
        borderRadius: '20px',
        padding: 'clamp(24px, 4vw, 40px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: `linear-gradient(90deg, ${project.accent}, transparent)`,
          borderRadius: '20px 20px 0 0',
        }}
      />

      {/* Background number */}
      <span
        className="absolute bottom-4 right-6 select-none pointer-events-none"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(72px, 10vw, 120px)',
          lineHeight: 1,
          color: project.accent,
          opacity: 0.06,
          letterSpacing: '-0.04em',
        }}
        aria-hidden="true"
      >
        {project.number}
      </span>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-3xl leading-none">{project.icon}</span>
        </div>
        <span
          className="text-[11px] tracking-widest uppercase px-2 py-1 rounded-full border flex-shrink-0"
          style={{
            color: project.accent,
            borderColor: `${project.accent}40`,
            background: `${project.accent}15`,
          }}
        >
          {project.number}
        </span>
      </div>

      {/* Title + tagline */}
      <div>
        <h3
          className="text-white mb-1"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(22px, 3.5vw, 32px)',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
          }}
        >
          {project.title}
        </h3>
        <p style={{ color: project.accent, fontSize: '13px', opacity: 0.85 }}>
          {project.tagline}
        </p>
      </div>

      {/* Description */}
      <p
        className="text-white/55 leading-relaxed flex-1"
        style={{ fontSize: 'clamp(14px, 1.8vw, 16px)' }}
      >
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[12px] px-2 py-[3px] rounded-md"
            style={{
              background: 'rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.55)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Link if available */}
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[13px] no-underline mt-1 hover:opacity-70 transition-opacity"
          style={{ color: project.accent }}
        >
          Visit live site
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17L17 7M7 7h10v10"/>
          </svg>
        </a>
      )}
    </div>
  );
}

function SectionTag({ label }: { label: string }) {
  return (
    <span className="inline-block border border-white/20 text-white/50 text-[11px] tracking-widest uppercase px-3 py-1 rounded-full">
      {label}
    </span>
  );
}

export default function ProjectsSection() {
  const { ref: sectionRef, inView } = useInView(0.05);

  return (
    <section
      id="projects"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative bg-[#080808] py-24 md:py-36 px-5 sm:px-8 md:px-10"
    >
      {/* Decorative glow */}
      <div
        className="absolute top-1/3 left-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 0% 50%, rgba(139,92,246,0.05) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className={`mb-14 md:mb-20 reveal ${inView ? 'in-view' : ''}`}>
          <SectionTag label="Selected Work" />
          <div className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              className="text-white"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(36px, 6vw, 72px)',
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
              }}
            >
              Things I've{' '}
              <span
                className="gradient-text"
                style={{ backgroundImage: 'linear-gradient(90deg, #60a5fa 0%, #818cf8 100%)' }}
              >
                Built
              </span>
            </h2>
            <p className="text-white/40 text-[15px] max-w-xs sm:text-right leading-relaxed">
              Four products. Real users. Real problems solved.
            </p>
          </div>
        </div>

        {/* 2×2 project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              delay={i + 1}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
