'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

/* ──────────────────────────────────────────
   Hooks
────────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('about');
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }); },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

/* ──────────────────────────────────────────
   Data
────────────────────────────────────────── */
const DESIGN_TOOLS = [
  { name: 'Figma',       src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Photoshop',   src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg' },
  { name: 'Illustrator', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg' },
  { name: 'Canva',       src: '/logos/canva.svg' },
  { name: 'Lightroom',   src: '/logos/lightroom.svg' },
  { name: 'CapCut',      src: '/logos/capcut.svg' },
];

const DEV_TOOLS = [
  { name: 'React',        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js',      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'TypeScript',   src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Node.js',      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Express',      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { name: 'MySQL',        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Tailwind',     src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Git',          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Postman',      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
  { name: 'React Native', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
];

const SOFT_SKILLS = [
  'Communication','Critical Thinking','Teamwork','Problem Solving',
  'Adaptability','Creative Thinking','Time Management','Leadership',
];

const PORTFOLIO = [
  {
    cat: 'Graphic Design', accent: '#ff6b9d',
    items: [
      { title: 'Social Media Content', stack: 'Photoshop · Illustrator · Canva',
        desc: 'Posters, banners, infographics, and story templates for brands and school events.',
        tags: ['Branding','Poster','Social Media'], href: '#', cta: 'View Work' },
      { title: 'Video Content Creation', stack: 'CapCut · Lightroom · Photoshop',
        desc: 'Short-form video content with motion graphics, color grading, and dynamic storytelling.',
        tags: ['Video Editing','Motion Graphics','Color Grading'], href: '#', cta: 'View Work' },
    ],
  },
  {
    cat: 'Web Development', accent: '#e91e8c',
    items: [
      { title: 'WargaCare — Web', stack: 'Next.js · TypeScript · Tailwind · Express · MySQL',
        desc: 'Public complaint management system with real-time tracking and a clean admin dashboard.',
        tags: ['Full Stack','REST API','Dashboard'], href: 'https://github.com/denovallav', cta: 'View Repository' },
    ],
  },
  {
    cat: 'Mobile Development', accent: '#b5179e',
    items: [
      { title: 'WargaCare — Mobile', stack: 'React Native · TypeScript · Express · MySQL',
        desc: 'Cross-platform complaint app with JWT auth, REST API, and citizen-first UX.',
        tags: ['React Native','JWT Auth','Cross Platform'], href: 'https://github.com/denovallav', cta: 'View Repository' },
    ],
  },
  {
    cat: 'UI/UX Design', accent: '#f072b6',
    items: [
      { title: 'Wixie — On-demand App', stack: 'Figma · Prototyping · User Research',
        desc: 'Accessible on-demand service app for elderly and disabled users — full design system and prototype.',
        tags: ['UI Design','Accessibility','Prototype'], href: '#', cta: 'View in Figma' },
      { title: 'Office Management System', stack: 'Figma · Responsive Design',
        desc: 'Web dashboard for attendance, inventory, and scheduling in one unified interface.',
        tags: ['Dashboard','Responsive','Design System'], href: '#', cta: 'View in Figma' },
    ],
  },
];

const CERTS = [
  { title: 'Create multi-platform projects',           org: 'SMK TARUNA BHAKTI', year: '2026' },
  { title: 'Simple school library',                    org: 'SMK TARUNA BHAKTI', year: '2025' },
  { title: 'Create a simple project about e-commerce', org: 'SMK TARUNA BHAKTI', year: '2024' },
];

const NAV = [
  { id: 'about',     label: 'About'     },
  { id: 'skills',    label: 'Skills'    },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'certs',     label: 'Certs'     },
];

/* ──────────────────────────────────────────
   Gradient text — rendered only client side
   to avoid SSR/hydration mismatch
────────────────────────────────────────── */
function GradText({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      backgroundImage: 'linear-gradient(135deg,#ff6ec7 0%,#ff3da6 45%,#c2185b 100%)',
      backgroundSize: '200% 200%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      animation: 'gradientFlow 4s ease infinite',
      display: 'inline',
    }}>
      {children}
    </span>
  );
}

/* ──────────────────────────────────────────
   Main Page
────────────────────────────────────────── */
export default function Portfolio() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted]       = useState(false);
  const active = useActiveSection(NAV.map(n => n.id));

  const onScroll = useCallback(() => setScrolled(window.scrollY > 50), []);

  useEffect(() => {
    setMounted(true);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  const goto = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ background: '#080008', minHeight: '100vh' }}>

      {/* ══ NAVBAR ══ */}
      <header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{
          background: (mounted && scrolled) ? 'rgba(8,0,8,0.82)' : 'transparent',
          backdropFilter: (mounted && scrolled) ? 'blur(24px) saturate(180%)' : 'none',
          borderBottom: (mounted && scrolled) ? '1px solid rgba(233,30,140,0.12)' : '1px solid transparent',
        }}
      >
        <div className="max-w-5xl mx-auto px-6 h-[62px] flex items-center justify-between">
          {/* Logo — plain text to avoid SSR mismatch */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-black text-lg tracking-tighter select-none"
            style={{ color: '#f48fb1' }}
          >
            denoval.
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map(n => (
              <button key={n.id} onClick={() => goto(n.id)}
                className="nav-item px-4 py-2 text-[13px] font-medium rounded-md transition-colors"
                style={{ color: active === n.id ? '#f48fb1' : 'rgba(255,200,230,0.45)' }}>
                {n.label}
              </button>
            ))}
            <a
              href="/CVsaya.pdf" target="_blank" rel="noopener noreferrer"
              className="ml-4 px-5 py-2 text-[13px] font-bold rounded-full transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#e91e8c,#a8005c)', color: '#fff', boxShadow: '0 2px 18px rgba(233,30,140,0.3)' }}
            >
              View CV
            </a>
          </nav>

          {/* Hamburger */}
          <button className="md:hidden p-2 flex flex-col gap-[5px]"
            onClick={() => setMobileOpen(o => !o)} aria-label="menu">
            {[0,1,2].map(i => (
              <span key={i} className="block h-[1.5px] w-5 rounded-full transition-all duration-300"
                style={{
                  background: '#f48fb1',
                  transform: mobileOpen
                    ? i === 0 ? 'rotate(45deg) translate(4.5px,4.5px)'
                    : i === 2 ? 'rotate(-45deg) translate(4.5px,-4.5px)'
                    : 'scaleX(0)'
                    : 'none',
                  opacity: mobileOpen && i === 1 ? 0 : 1,
                }} />
            ))}
          </button>
        </div>

        {/* Mobile drawer */}
        <div className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: mobileOpen ? '280px' : '0',
            background: 'rgba(8,0,8,0.96)',
            borderBottom: mobileOpen ? '1px solid rgba(233,30,140,0.12)' : 'none',
          }}>
          <div className="px-5 py-4 flex flex-col gap-1">
            {NAV.map(n => (
              <button key={n.id} onClick={() => goto(n.id)}
                className="text-left text-sm font-medium px-4 py-3 rounded-xl"
                style={{ color: 'rgba(255,200,230,0.75)', background: 'rgba(233,30,140,0.06)' }}>
                {n.label}
              </button>
            ))}
            <a href="/CVsaya.pdf" target="_blank" rel="noopener noreferrer"
              className="mt-1 text-sm font-bold text-center py-3 rounded-xl"
              style={{ background: 'linear-gradient(135deg,#e91e8c,#a8005c)', color: '#fff' }}>
              View CV
            </a>
          </div>
        </div>
      </header>

      {/* ══ HERO ══ */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 62,
        overflow: 'hidden',
      }}>
        {/* bg */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 65% at 65% 45%, #3a0028 0%, #180010 45%, #080008 100%)',
        }} />
        {/* glow blobs */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', width: 560, height: 560, borderRadius: '50%',
            top: '-5%', right: '-8%',
            background: 'radial-gradient(circle, rgba(200,20,110,0.16) 0%, transparent 70%)',
            animation: 'glowPulse 6s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', width: 420, height: 420, borderRadius: '50%',
            bottom: '-10%', left: '-5%',
            background: 'radial-gradient(circle, rgba(100,0,70,0.14) 0%, transparent 70%)',
            animation: 'glowPulse 9s ease-in-out infinite 3s',
          }} />
        </div>
        {/* deco ring */}
        <div style={{
          position: 'absolute', width: 650, height: 650, borderRadius: '50%',
          border: '1px solid rgba(233,30,140,0.07)',
          top: '50%', right: '-18%',
          transform: 'translateY(-50%)',
          animation: 'rotateSlow 22s linear infinite',
          pointerEvents: 'none', zIndex: 0,
        }} />

        {/* ── Content ── */}
        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1100, margin: '0 auto', padding: '5rem 2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap' }}>

            {/* ══ LEFT: Editorial Text ══ */}
            <div style={{ flex: '1 1 340px', minWidth: 0 }}>

              {/* available tag */}
              <div className="au-fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: '2rem' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff3da6', boxShadow: '0 0 8px #ff3da6', flexShrink: 0, animation: 'glowPulse 2s ease-in-out infinite' }} />
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,180,220,0.55)' }}>
                  Available for Creative Work
                </span>
              </div>

              {/* BIG editorial name — inspired by denovallport style */}
              <div className="au-fade-up" style={{ marginBottom: '1.6rem', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
                <div style={{ fontSize: 'clamp(4rem,9vw,7rem)', fontWeight: 900, textTransform: 'uppercase', color: '#fff', lineHeight: 0.92 }}>
                  DENOVAL
                </div>
                <div style={{ fontSize: 'clamp(1.4rem,3.2vw,2.4rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.3rem' }}>
                  <GradText>Muhammad Rosyadi</GradText>
                </div>
              </div>

              {/* descriptor line */}
              <div className="au-fade-up" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.8rem' }}>
                <span style={{ flex: 1, height: 1, background: 'rgba(233,30,140,0.25)', maxWidth: 48 }} />
                <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,180,220,0.5)', margin: 0 }}>
                  Software Eng · UI/UX · Graphic Design · Video
                </p>
              </div>

              {/* location + email */}
              <div className="au-fade-up" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.2rem' }}>
                {['Depok, Indonesia', 'lavedden209@gmail.com'].map(t => (
                  <span key={t} style={{
                    fontSize: 11, padding: '5px 13px', borderRadius: 999,
                    background: 'rgba(255,255,255,0.04)', color: 'rgba(255,185,220,0.5)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* CTA row */}
              <div className="au-fade-up" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
                {/* primary CTA */}
                <a href="https://wa.me/qr/63A25RCAH5LQL1" target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    fontSize: 12, fontWeight: 700, padding: '11px 22px', borderRadius: 999,
                    background: 'linear-gradient(135deg,#ff3da6,#c2185b)',
                    color: '#fff', textDecoration: 'none',
                    boxShadow: '0 4px 22px rgba(233,30,140,0.35)',
                    letterSpacing: '0.04em', textTransform: 'uppercase',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <WaIcon />Let&apos;s Talk ↗
                </a>

                {/* secondary socials */}
                {[
                  { label: 'GitHub',    href: 'https://github.com/denovallav',         icon: <GhIcon /> },
                  { label: 'Instagram', href: 'https://www.instagram.com/iamdenovaa/', icon: <IgIcon /> },
                ].map(({ label, href, icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 7,
                      fontSize: 12, fontWeight: 600, padding: '11px 18px', borderRadius: 999,
                      background: 'rgba(255,255,255,0.055)',
                      color: 'rgba(255,210,235,0.8)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      textDecoration: 'none',
                      transition: 'transform 0.2s ease, border-color 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.borderColor = 'rgba(233,30,140,0.4)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                  >
                    {icon}{label}
                  </a>
                ))}
              </div>
            </div>

            {/* ══ RIGHT: Photo ══ */}
            <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', animation: 'floatY 5s ease-in-out infinite' }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                {/* glow blob behind */}
                <div style={{
                  position: 'absolute', inset: -32, borderRadius: '50%', zIndex: 0,
                  background: 'radial-gradient(circle, rgba(255,61,166,0.4) 0%, transparent 68%)',
                  filter: 'blur(28px)',
                }} />
                {/* gradient ring */}
                <div style={{
                  position: 'relative', zIndex: 1,
                  padding: 3, borderRadius: '50%', display: 'inline-block',
                  background: 'linear-gradient(145deg,#ff8ec8 0%,#ff3da6 45%,#6a0030 100%)',
                  boxShadow: '0 12px 50px rgba(255,61,166,0.3)',
                }}>
                  <div style={{ borderRadius: '50%', overflow: 'hidden', width: 320, height: 320, background: '#080008' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/profile.jpeg"
                      alt="Denoval Muhammad Rosyadi"
                      width={320}
                      height={320}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 10%', display: 'block' }}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* bottom fade */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to bottom, transparent, #080008)', pointerEvents: 'none' }} />
      </section>

      {/* ══ MAIN ══ */}
      <main style={{ maxWidth: 1024, margin: '0 auto', padding: '0 1.5rem 6rem' }}>

        <Divider />

        {/* About */}
        <Section id="about">
          <Label>About Me</Label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }}>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(255,200,230,0.65)' }}>
              I am a Software Engineering student at SMK Taruna Bhakti with a strong background in full-stack web and mobile development, seamlessly blending code with creative design. My expertise spans UI/UX design, graphic design (including posters, banners, and digital assets), and video editing for dynamic short-form content. I am passionate about building digital products that are not only scalable and functional, but also visually stunning and highly engaging.
            </p>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(233,30,140,0.42)', marginBottom: '1rem' }}>Education</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { school: 'SMK TARUNA BHAKTI', period: '2024 – 2027', detail: 'Software Engineering' },
                  { school: 'SMPN 24 DEPOK',     period: '2021 – 2024' },
                ].map(e => (
                  <div key={e.school} className="glass glass-hover shimmer" style={{ borderRadius: 16, padding: '16px 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,240,250,0.9)' }}>{e.school}</p>
                        {e.detail && <p style={{ fontSize: 11, marginTop: 2, color: 'rgba(255,185,220,0.48)' }}>{e.detail}</p>}
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#f48fb1', flexShrink: 0 }}>{e.period}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Divider />

        {/* Skills */}
        <Section id="skills">
          <Label>Skills</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <SkillGroup label="Design & Creative" tools={DESIGN_TOOLS} />
            <SkillGroup label="Programming & Tools" tools={DEV_TOOLS} />
            <div>
              <SubLabel>Soft Skills</SubLabel>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
                {SOFT_SKILLS.map(s => (
                  <span key={s} style={{
                    fontSize: 12, fontWeight: 500, padding: '8px 16px', borderRadius: 999, cursor: 'default',
                    background: 'rgba(255,255,255,0.03)', color: 'rgba(255,200,230,0.68)',
                    border: '1px solid rgba(233,30,140,0.16)',
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Divider />

        {/* Portfolio */}
        <Section id="portfolio">
          <Label>Portfolio</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {PORTFOLIO.map(cat => (
              <div key={cat.cat}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0, background: cat.accent, boxShadow: `0 0 8px ${cat.accent}` }} />
                  <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: cat.accent }}>{cat.cat}</p>
                  <span style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${cat.accent}35, transparent)` }} />
                </div>

                {/* Graphic Design — video background cards */}
                {cat.cat === 'Graphic Design' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Video cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                      {[
                        { src: '/Vidio1.mp4', title: 'Social Media Edit', tags: ['Branding','Social Media'] },
                        { src: '/Vidio2.mp4', title: 'Creative Content',  tags: ['Poster','Design'] },
                        { src: '/Vidio3.mp4', title: 'Motion Graphics',   tags: ['Motion','Color Grading'] },
                        { src: '/Vidio4.mp4', title: 'Video Editing',     tags: ['Video Editing','Creative'] },
                      ].map((v, i) => (
                        <VideoCard key={i} src={v.src} title={v.title} tags={v.tags} accent={cat.accent} />
                      ))}
                    </div>

                    {/* Poster designs — below videos */}
                    <div className="glass" style={{ borderRadius: 20, padding: '1.5rem' }}>
                      <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,107,157,0.6)', marginBottom: '1.25rem' }}>Some of my designs</p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.875rem', marginBottom: '1.25rem' }}>
                        {['Poster1.jpg','Poster2.png','Poster3.png','Poster44.png'].map((f, i) => (
                          <div key={i} style={{ aspectRatio: '3/4', borderRadius: 12, overflow: 'hidden', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,107,157,0.15)' }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={`/${f}`} alt={`Design ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                          </div>
                        ))}
                      </div>
                      <p style={{ fontSize: 12, color: 'rgba(255,190,225,0.5)', lineHeight: 1.7, margin: 0 }}>
                        These are some of my designs as a graphic designer, using Canva, Photoshop, Illustrator, and many other tools.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: cat.items.length === 1 ? '1fr' : 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.25rem', maxWidth: cat.items.length === 1 ? 440 : undefined }}>
                    {cat.items.map(p => (
                      <a key={p.title} href={p.href} target="_blank" rel="noopener noreferrer"
                        className="glass glass-hover shimmer"
                        style={{ borderRadius: 20, padding: '1.5rem', display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,240,250,0.95)' }}>{p.title}</h3>
                          <ArrowIcon color={cat.accent} />
                        </div>
                        <p style={{ fontSize: 11, fontWeight: 600, color: cat.accent, marginBottom: 12 }}>{p.stack}</p>
                      <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(255,200,230,0.58)', flex: 1 }}>{p.desc}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
                        {p.tags.map(t => (
                          <span key={t} style={{ fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 999, background: `${cat.accent}12`, color: cat.accent, border: `1px solid ${cat.accent}28` }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </a>
                  ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* Certs */}
        <Section id="certs">
          <Label>Certifications</Label>
          <div className="glass" style={{ borderRadius: 20, overflow: 'hidden' }}>
            {CERTS.map((c, i) => (
              <div key={i} className="shimmer"
                style={{
                  padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
                  borderBottom: i < CERTS.length - 1 ? '1px solid rgba(233,30,140,0.08)' : 'none',
                }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,238,248,0.88)' }}>{c.title}</p>
                  <p style={{ fontSize: 11, marginTop: 2, color: 'rgba(255,180,215,0.42)' }}>{c.org}</p>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '5px 14px', borderRadius: 999, flexShrink: 0, background: 'rgba(233,30,140,0.1)', color: '#f48fb1', border: '1px solid rgba(233,30,140,0.22)' }}>
                  {c.year}
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* Contact */}
        <Section id="contact">
          <div style={{ position: 'relative', borderRadius: 28, overflow: 'hidden', padding: 'clamp(3rem,8vw,4.5rem) 2rem', textAlign: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 75% 55% at 50% 110%, rgba(233,30,140,0.2) 0%, transparent 65%), rgba(255,255,255,0.018)', border: '1px solid rgba(233,30,140,0.14)', borderRadius: 'inherit' }} />
            <div style={{ position: 'relative' }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(233,30,140,0.5)', marginBottom: '1rem' }}>Get in touch</p>
              <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, color: '#fff', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                Let&apos;s Work Together
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,190,225,0.55)', maxWidth: 360, margin: '0 auto 2.5rem' }}>
                Available for freelance projects, creative collabs, and internship opportunities.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
                <a href="mailto:lavedden209@gmail.com"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 700, padding: '12px 28px', borderRadius: 999, textDecoration: 'none', background: 'linear-gradient(135deg,#ff3da6,#c2185b)', color: '#fff', boxShadow: '0 4px 28px rgba(233,30,140,0.35)' }}>
                  <MailIcon />Send Email
                </a>
              </div>
            </div>
          </div>
        </Section>

      </main>

      {/* ══ FOOTER ══ */}
      <footer style={{ borderTop: '1px solid rgba(233,30,140,0.09)', background: 'rgba(0,0,0,0.3)', padding: '2.5rem 1rem', textAlign: 'center' }}>
        <p style={{ fontWeight: 900, fontSize: 15, color: '#f48fb1', letterSpacing: '-0.01em' }}>denoval.</p>
        <p style={{ marginTop: 8, fontSize: 11, color: 'rgba(255,160,210,0.32)' }}>
          © {new Date().getFullYear()} Denoval Muhammad Rosyadi &nbsp;·&nbsp; Be Smart and Be Safe Online.
        </p>
      </footer>

    </div>
  );
}

/* ──────────────────────────────────────────
   Sub-components
────────────────────────────────────────── */
function Section({ id, children }: { id: string; children: React.ReactNode }) {
  const ref = useReveal() as React.RefObject<HTMLElement>;
  return (
    <section id={id} ref={ref} className="reveal" style={{ marginBottom: '6rem' }}>
      {children}
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '2.5rem' }}>
      <h2 style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'rgba(233,30,140,0.65)', whiteSpace: 'nowrap' }}>
        {children}
      </h2>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(233,30,140,0.28), transparent)' }} />
    </div>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(255,150,200,0.45)', marginBottom: '1rem' }}>
      {children}
    </p>
  );
}

function Divider() {
  return <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(233,30,140,0.14), transparent)', margin: '0 0 5rem' }} />;
}

function SkillGroup({ label, tools }: { label: string; tools: { name: string; src: string }[] }) {
  return (
    <div>
      <SubLabel>{label}</SubLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px,1fr))', gap: '1rem' }}>
        {tools.map((t, i) => <SkillLogo key={t.name} name={t.name} src={t.src} i={i} />)}
      </div>
    </div>
  );
}

function SkillLogo({ name, src, i }: { name: string; src: string; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.05 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="skill-item" style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, cursor: 'default',
      opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(14px) scale(0.85)',
      transition: `opacity 0.5s ease ${i * 60}ms, transform 0.5s cubic-bezier(.34,1.45,.64,1) ${i * 60}ms`,
    }}>
      <div className="skill-box" style={{ width: 58, height: 58, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.042)', border: '1px solid rgba(233,30,140,0.14)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={name} width={28} height={28} style={{ width: 28, height: 28, objectFit: 'contain' }} />
      </div>
      <span style={{ fontSize: 10, fontWeight: 500, textAlign: 'center', lineHeight: 1.3, color: 'rgba(255,185,220,0.52)' }}>{name}</span>
    </div>
  );
}

function VideoCard({ src, title, tags, accent }: { src: string; title: string; tags: string[]; accent: string }) {
  const vidRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = vidRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', aspectRatio: '9/16', cursor: 'pointer',
      border: `1px solid ${accent}28`, boxShadow: `0 8px 32px rgba(0,0,0,0.4)` }}
      className="glass-hover">
      {/* video background */}
      <video
        ref={vidRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      {/* gradient overlay — dark vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,0,8,0.85) 0%, rgba(8,0,8,0.2) 45%, rgba(8,0,8,0.15) 70%, rgba(8,0,8,0.4) 100%)', pointerEvents: 'none' }} />
      {/* top accent line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right, transparent, ${accent}, transparent)` }} />
      {/* text overlay bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.25rem 1rem' }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: '#fff', letterSpacing: '0.02em', textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>{title}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 8 }}>
          {tags.map(t => (
            <span key={t} style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 999, background: `${accent}22`, color: accent, border: `1px solid ${accent}40`, backdropFilter: 'blur(4px)' }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ArrowIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2, opacity: 0.7 }}>
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}
function GhIcon()   { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.165c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.21.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>; }
function IgIcon()   { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>; }
function WaIcon()   { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>; }
function MailIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>; }
