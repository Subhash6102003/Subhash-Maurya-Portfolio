import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDownRight, ArrowUpRight, Check, ChevronDown, Code2, Copy, Cpu, Download, ExternalLink, Github, Linkedin, Mail, MapPin, Menu, Moon, Phone, Sparkles, Sun, Terminal, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import type { ReactNode } from 'react';

const queryClient = new QueryClient();

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

const projects = [
  {
    number: '01',
    title: 'eGovTalent',
    kind: "India's first AI-powered e-governance job portal",
    description: 'A full-stack recruitment system built solo from architecture to AWS deployment. Claude AI handles resume extraction, screening, shortlisting, invitations, and assessments.',
    stack: ['React', 'TypeScript', 'Node.js', 'AWS'],
    href: 'https://egovtalent.com',
    tone: 'orange',
  },
  {
    number: '02',
    title: 'MGB Heights',
    kind: 'Residential society management app',
    description: 'Production Android experience with six RBAC tiers, offline-first Firestore architecture, visitor capture, real-time chat, auto-billing, FCM notifications, and Razorpay.',
    stack: ['Kotlin', 'Compose', 'Firebase', 'MVVM'],
    href: '#contact',
    tone: 'ink',
  },
  {
    number: '03',
    title: 'AnyTechPros',
    kind: 'Enterprise consulting website',
    description: 'A fast TypeScript SPA with a reusable design system, Redux Toolkit, Framer Motion, SEO foundations, and Core Web Vitals compliance that reached a 95+ Lighthouse score.',
    stack: ['React', 'TypeScript', 'Tailwind', 'CI/CD'],
    href: '#contact',
    tone: 'sand',
  },
];

const skillGroups = [
  { title: 'Android & mobile', icon: Cpu, items: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'MVVM', 'Clean Architecture', 'Firebase', 'REST APIs', 'Play Store'] },
  { title: 'Frontend & web', icon: Code2, items: ['React.js', 'TypeScript', 'JavaScript ES6+', 'HTML5', 'CSS3', 'Tailwind CSS', 'Redux Toolkit', 'Framer Motion'] },
  { title: 'Backend & delivery', icon: Terminal, items: ['Node.js', 'Express.js', 'AWS', 'Git', 'GitHub Actions', 'Agile / Scrum', 'Claude AI', 'GitHub Copilot'] },
];

const experience = [
  { role: 'SDE-1', company: 'NexLogic Innovation Private Limited', date: 'May 2026 — Present', text: 'Building full-stack features with React.js, Node.js, Express.js, and AWS while contributing to system design, REST architecture, code reviews, and deployment pipelines.' },
  { role: 'Associate Software Developer', company: 'AnyTechPros Infotech LLP · IT Enablement', date: 'Jan 2026 — Apr 2026', text: 'Architected IT-enablement features across React, TypeScript, Node, and REST microservices; reduced page-load time by 20% through rendering optimisation and lazy loading.' },
  { role: 'Web Developer Intern', company: 'Nixaa Vision Leads', date: 'Apr 2025 — Sep 2025', text: 'Built four responsive web applications with pixel-precise Figma handoffs, REST integrations, and reusable component libraries that increased team velocity by 30%.' },
  { role: 'Android Developer Intern', company: 'Mobrilz Private Limited', date: 'Sep 2024 — Mar 2025', text: 'Engineered three production Android features with Kotlin, Compose, MVVM, Clean Architecture, REST APIs, and Firebase; boosted performance by 30% and reduced drop-off by 25%.' },
];

function Home() {
  const [dark, setDark] = useState(() => localStorage.getItem('subhash-theme') === 'dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('about');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('subhash-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const sections = navItems.map((item) => document.querySelector(item.href));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: '-22% 0px -60% 0px', threshold: [0.1, 0.35, 0.7] },
    );
    sections.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const copyEmail = async () => {
    await navigator.clipboard?.writeText('subhashmaurya6102003@gmail.com');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="portfolio-shell">
      <div className="grain" aria-hidden="true" />
      <header className="site-header">
        <a className="brand-mark" href="#top" data-testid="link-home">
          <span className="brand-symbol">S</span>
          <span>SUBHASH<br /><em>MAURYA</em></span>
        </a>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={active === item.href.slice(1) ? 'active' : ''} onClick={closeMenu} data-testid={`link-nav-${item.label.toLowerCase()}`}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="theme-toggle" onClick={() => setDark((value) => !value)} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} data-testid="button-theme-toggle">
            {dark ? <Sun size={16} /> : <Moon size={16} />}
            <span>{dark ? 'Light' : 'Dark'}</span>
          </button>
          <a className="header-contact" href="#contact" data-testid="link-header-contact">Let&apos;s talk <ArrowUpRight size={15} /></a>
          <button className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} data-testid="button-menu-toggle">
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero section-frame" aria-labelledby="hero-title">
          <div className="hero-copy reveal">
            <div className="eyebrow"><span className="eyebrow-dot" /> Available for thoughtful builds <span className="eyebrow-city">Bhopal / India</span></div>
            <p className="hero-index">[01 — 06]</p>
            <h1 id="hero-title">I build <span>useful</span><br />things for<br /><strong>real people.</strong></h1>
            <p className="hero-intro">Subhash Maurya is a final-year Computer Science student and Android / full-stack developer making clear, durable software with a little more character.</p>
            <div className="hero-ctas">
              <a className="button button-primary" href="#projects" data-testid="link-hero-projects">See selected work <ArrowDownRight size={17} /></a>
              <a className="text-link" href="#about" data-testid="link-hero-about">More about me <ArrowDownRight size={16} /></a>
            </div>
          </div>
          <div className="hero-art reveal delay-1" aria-label="Abstract illustration of a retro developer workstation">
            <div className="art-stamp">SM / 26</div>
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="retro-machine">
              <div className="monitor">
                <div className="monitor-screen">
                  <div className="screen-bar"><span /><span /><span /> <small>build.log</small></div>
                  <div className="code-lines"><i /><i /><i /><i /><i /><i /></div>
                  <div className="screen-status">SHIP IT <span>●</span></div>
                </div>
              </div>
              <div className="machine-neck" />
              <div className="keyboard"><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>
              <div className="machine-base" />
            </div>
            <div className="floating-note note-top"><span>01</span> curious<br />by default</div>
            <div className="floating-note note-bottom">Kotlin<br /><b>+</b> React</div>
            <div className="cursor-cross">+</div>
            <div className="art-caption">A small studio of one<br />with a big surface area.</div>
          </div>
          <div className="hero-bottom">
            <div className="scroll-cue"><span className="scroll-line" /> Scroll to explore</div>
            <div className="hero-tech">Kotlin <b>·</b> React <b>·</b> TypeScript <b>·</b> Node.js</div>
            <div className="hero-metric"><strong>1.5+</strong><span>years shipping<br />production software</span></div>
          </div>
        </section>

        <section className="statement section-frame" id="about" aria-labelledby="about-title">
          <div className="section-kicker"><span>02</span> The short version</div>
          <div className="statement-grid">
            <h2 id="about-title">Software should feel <i>considered.</i></h2>
            <div className="statement-copy">
              <p>I&apos;m a developer who likes the space between a rough idea and the moment it starts helping somebody. My work moves between Android, full-stack web, and the systems that make both dependable.</p>
              <p>Currently finishing a B.Tech in Computer Science &amp; Engineering (AI/ML) at Lakshmi Narain College of Technology &amp; Science, Bhopal — and building things professionally alongside it.</p>
              <a className="text-link" href="#contact" data-testid="link-about-contact">Start a conversation <ArrowUpRight size={16} /></a>
            </div>
          </div>
          <div className="fact-strip">
            <div><span>01</span><strong>30%</strong><small>performance gain on Android features</small></div>
            <div><span>02</span><strong>95+</strong><small>Lighthouse score on shipped web work</small></div>
            <div><span>03</span><strong>100x</strong><small>productivity boost with AI tooling</small></div>
          </div>
        </section>

        <section className="projects section-frame" id="projects" aria-labelledby="projects-title">
          <div className="section-heading">
            <div className="section-kicker"><span>03</span> Selected work</div>
            <h2 id="projects-title">Built to leave<br /><i>a mark.</i></h2>
            <p>Three recent directions — from civic technology to the very practical business of making a building run better.</p>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <a className={`project-card project-${project.tone}`} href={project.href} target={project.href.startsWith('http') ? '_blank' : undefined} rel={project.href.startsWith('http') ? 'noreferrer' : undefined} key={project.number} data-testid={`link-project-${project.number}`}>
                <div className="project-top"><span>{project.number}</span><span>{project.kind}</span><ArrowUpRight size={19} /></div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                <div className="project-arrow"><span>View case note</span><ArrowUpRight size={18} /></div>
              </a>
            ))}
          </div>
        </section>

        <section className="skills section-frame" id="skills" aria-labelledby="skills-title">
          <div className="section-kicker"><span>04</span> The toolbox</div>
          <div className="skills-layout">
            <div><h2 id="skills-title">Sharp tools.<br /><i>Soft edges.</i></h2><p className="skills-lede">The stack is only useful when it disappears behind a good experience. These are the tools I reach for most often.</p></div>
            <div className="skill-grid">
              {skillGroups.map((group) => {
                const Icon = group.icon;
                return <div className="skill-group" key={group.title}><Icon size={20} strokeWidth={1.7} /><h3>{group.title}</h3><div className="skill-tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div></div>;
              })}
            </div>
          </div>
        </section>

        <section className="experience section-frame" id="experience" aria-labelledby="experience-title">
          <div className="section-heading experience-heading"><div className="section-kicker"><span>05</span> In the field</div><h2 id="experience-title">A little<br /><i>momentum.</i></h2></div>
          <div className="timeline">
            {experience.map((item, index) => <article className="timeline-item" key={item.company}><div className="timeline-rail"><span>{String(index + 1).padStart(2, '0')}</span><i /></div><div className="timeline-main"><div className="timeline-meta"><span>{item.date}</span><span>{index === 0 ? 'Current' : 'Experience'}</span></div><h3>{item.role}</h3><h4>{item.company}</h4><p>{item.text}</p></div></article>)}
          </div>
        </section>

        <section className="resume section-frame" id="resume" aria-labelledby="resume-title">
          <div className="resume-card">
            <div className="resume-copy"><div className="section-kicker"><span>06</span> Keep the paper trail</div><h2 id="resume-title">The longer<br />version <i>lives here.</i></h2><p>For the full timeline, project details, coursework, and the things that don&apos;t fit in a one-page portfolio.</p><div className="resume-actions"><a className="button button-dark" href="/Subhash_Maurya_Resume_1786592665045.pdf" target="_blank" rel="noreferrer" data-testid="link-resume-pdf">Open resume <ExternalLink size={16} /></a><a className="button button-outline" href="/Profile_1786592648816.pdf" target="_blank" rel="noreferrer" data-testid="link-profile-pdf">Profile PDF <Download size={16} /></a></div></div>
            <div className="resume-paper"><div className="paper-clip" /><div className="paper-header">SUBHASH<br /><b>MAURYA</b></div><div className="paper-rule" /><div className="paper-line long" /><div className="paper-line medium" /><div className="paper-line short" /><div className="paper-block"><span>ANDROID</span><span>FULL-STACK</span><span>AI / ML</span></div><div className="paper-footer">Bhopal, MP — 462022</div></div>
          </div>
        </section>

        <section className="contact section-frame" id="contact" aria-labelledby="contact-title">
          <div className="contact-top"><div className="section-kicker"><span>07</span> Your turn</div><div className="contact-aside">Have a problem worth solving?<br /><b>Say hello.</b></div></div>
          <div className="contact-layout"><h2 id="contact-title">Let&apos;s make<br /><i>something useful.</i></h2><div className="contact-info"><p>I&apos;m open to product conversations, thoughtful freelance work, and teams who care about the details.</p><a className="email-link" href="mailto:subhashmaurya6102003@gmail.com" data-testid="link-email">subhashmaurya6102003@gmail.com <ArrowUpRight size={20} /></a><button className="copy-email" onClick={copyEmail} data-testid="button-copy-email">{copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy email</>}</button><div className="contact-links"><a href="tel:+916386145186" data-testid="link-phone"><Phone size={15} /> +91 63861 45186</a><a href="https://github.com/Subhash6102003" target="_blank" rel="noreferrer" data-testid="link-github"><Github size={15} /> GitHub</a><a href="https://www.linkedin.com/in/subhash-maurya-656905243" target="_blank" rel="noreferrer" data-testid="link-linkedin"><Linkedin size={15} /> LinkedIn</a></div></div></div>
          <div className="contact-footer"><span><MapPin size={15} /> Bhopal, Madhya Pradesh</span><span>© {new Date().getFullYear()} Subhash Maurya</span><a href="#top" data-testid="link-back-top">Back to top <ArrowUpRight size={15} /></a></div>
        </section>
      </main>
    </div>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;