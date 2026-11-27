import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  Check,
  Compass,
  Copy,
  Github,
  Heart,
  HeartOff,
  Linkedin,
  MapPin,
  Send,
  Sparkles,
  Trophy,
  Twitter,
  Activity,
  Layers,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { attachCardTilt, attachMagnetic } from '@/lib/animations';
import { ScrollytellingArchitecture } from '@/components/motion/scrollytelling-architecture';
import { LivingTerminal } from '@/components/motion/living-terminal';
import { LivingDatabase } from '@/components/motion/living-database';
import { ProjectInstanceModal, ProjectInstanceData } from '@/components/motion/project-instance-modal';
import { HeroAcquireShowcase } from '@/components/motion/hero-acquire-showcase';
import { ALL_PROJECTS_CATALOG } from '@/data/projects-catalog';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const featuredProjectIds = ['egovtalent', 'upi_double_spend', 'forge'];
const featuredProjects = ALL_PROJECTS_CATALOG.filter((p) => featuredProjectIds.includes(p.id));

export default function Home() {
  const [screenPowered, setScreenPowered] = useState(true);
  const [keyPressed, setKeyPressed] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [selectedProject, setSelectedProject] = useState<ProjectInstanceData | null>(null);

  const homeScopeRef = useRef<HTMLDivElement | null>(null);
  const journeyCardsRef = useRef<HTMLDivElement | null>(null);
  const projectListRef = useRef<HTMLDivElement | null>(null);

  // GSAP ScrollTrigger & 3D Tilt Animations
  useEffect(() => {
    if (!homeScopeRef.current) return;

    const ctx = gsap.context(() => {
      // Heading reveals with ScrollTrigger
      const headings = gsap.utils.toArray<HTMLElement>('.gsap-reveal-heading');
      headings.forEach((heading) => {
        gsap.from(heading, {
          y: 26,
          opacity: 0,
          duration: 0.72,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      });

      // Subtle scrubbed parallax depth on Hero Showcase
      const heroShowcase = homeScopeRef.current?.querySelector('.hero-art-modern');
      if (heroShowcase) {
        gsap.to(heroShowcase, {
          y: -24,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }

      // Metric strip staggered entrance
      const metricCells = gsap.utils.toArray<HTMLElement>('.acquire-metric-cell');
      if (metricCells.length > 0) {
        gsap.from(metricCells, {
          y: 18,
          opacity: 0,
          duration: 0.55,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.acquire-metric-strip',
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Journey cards staggered scroll reveal
      if (journeyCardsRef.current) {
        const cards = journeyCardsRef.current.querySelectorAll('.journey-card');
        gsap.from(cards, {
          y: 30,
          opacity: 0,
          duration: 0.65,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: journeyCardsRef.current,
            start: 'top 86%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Fact stat cards scroll reveal
      const statCards = gsap.utils.toArray<HTMLElement>('.stat-glass-card');
      if (statCards.length > 0) {
        gsap.from(statCards, {
          y: 24,
          opacity: 0,
          scale: 0.97,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statCards[0],
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Selected work project cards
      if (projectListRef.current) {
        const pCards = projectListRef.current.querySelectorAll('.project-card');
        gsap.from(pCards, {
          y: 34,
          opacity: 0,
          duration: 0.72,
          stagger: 0.11,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: projectListRef.current,
            start: 'top 86%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, homeScopeRef);

    // Attach subtle 3D tilt + specular sheen & magnetic CTAs (desktop only)
    const cleanupFns: Array<() => void> = [];
    if (window.matchMedia('(pointer: fine)').matches) {
      const tiltCards = homeScopeRef.current.querySelectorAll<HTMLElement>('.journey-card, .project-card, .stat-glass-card');
      tiltCards.forEach((card) => {
        cleanupFns.push(attachCardTilt(card));
      });
      const magneticBtns = document.querySelectorAll<HTMLElement>('.button-primary, .glass-talk-btn');
      magneticBtns.forEach((btn) => {
        cleanupFns.push(attachMagnetic(btn));
      });
    }

    return () => {
      ctx.revert();
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  const copyEmail = async () => {
    await navigator.clipboard?.writeText('subhashmaurya6102003@gmail.com');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setSubmitted(true);
    window.setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div ref={homeScopeRef} className="home-page-container">
      {/* Hero Section */}
      <section className="hero section-frame" aria-labelledby="hero-title">
        <motion.div
          className="hero-copy"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="eyebrow">
            <span className="hero-status-pill">
              <span className="eyebrow-dot" />
              <span>Open to Founder&apos;s Office &amp; SDE-1 Roles</span>
              <span className="eyebrow-city">Bangalore / India</span>
            </span>
          </motion.div>

          <motion.p variants={itemVariants} className="hero-index">
            [01 — 06]
          </motion.p>

          <motion.h1 variants={itemVariants} id="hero-title">
            Architecting <span>resilient</span>
            <br />
            systems &amp;
            <br />
            <strong>real products.</strong>
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-intro">
            Subhash Maurya is a Founding Member, SDE-1, and Founder&apos;s Office builder shipping 0-to-1 products,
            hiring automation, and distributed systems across React, Kotlin, Node.js, and AWS.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-ctas">
            <Link className="button button-primary" href="/projects" data-testid="link-hero-projects">
              Explore 24 Systems <ArrowDownRight size={17} />
            </Link>
            <a className="button button-dark" href="#contact" data-testid="link-hero-contact">
              Let&apos;s build together <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </motion.div>

        {/* Acquire.com Style Dual Flag-Box Autonomous Step Showcase */}
        <div className="hero-art-modern">
          <HeroAcquireShowcase />
        </div>

        {/* Acquire.com Style 5-Column Metric Strip */}
        <div className="acquire-metric-strip">
          <div className="acquire-metric-cell">
            <strong className="tabular-nums">24+</strong>
            <span>production systems shipped</span>
          </div>
          <div className="acquire-metric-cell">
            <strong className="tabular-nums">1.5+ yrs</strong>
            <span>shipping live software</span>
          </div>
          <div className="acquire-metric-cell">
            <strong className="tabular-nums">95+</strong>
            <span>Lighthouse web vitals</span>
          </div>
          <div className="acquire-metric-cell">
            <strong className="tabular-nums">14K/s</strong>
            <span>peak pipeline throughput</span>
          </div>
          <div className="acquire-metric-cell">
            <strong>SDE-1</strong>
            <span>Founding Member (SM)</span>
          </div>
        </div>
      </section>

      {/* Statement & Personal Journey */}
      <section className="statement section-frame" id="about" aria-labelledby="about-title">
        <div className="section-kicker"><span>02</span> The short version &amp; My Journey</div>
        <div className="statement-grid">
          <h2 id="about-title" className="gsap-reveal-heading">Software should feel <i>considered.</i></h2>
          <div className="statement-copy">
            <p>
              I&apos;m a developer who likes the space between a rough idea and the moment it starts helping somebody. My work moves between Android, full-stack web, and the systems that make both dependable.
            </p>
            <p>
              Currently finishing a B.Tech in Computer Science &amp; Engineering (AI/ML) at Lakshmi Narain College of Technology &amp; Science, Bhopal — and building things professionally alongside it.
            </p>
            <a className="text-link" href="#contact" data-testid="link-about-contact">
              Start a conversation <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        {/* Personal Story Cards (Matching the design reference) */}
        <div ref={journeyCardsRef} className="personal-journey-grid">
          <div className="journey-card" data-testid="card-journey-skills">
            <div className="journey-header">
              <div className="journey-icon"><Trophy size={18} /></div>
              <ArrowUpRight size={16} className="journey-arrow" />
            </div>
            <h3>How I Achieved My Skills</h3>
            <p>
              Rather than sticking to textbook theory, I built real production apps early on. From mastering native Android (Kotlin, Jetpack Compose, MVVM) during my internship at Mobrilz to architecting full-stack microservices at AnyTechPros and NexLogic, I honed my craft by shipping code directly to users.
            </p>
          </div>

          <div className="journey-card" data-testid="card-journey-hobbies">
            <div className="journey-header">
              <div className="journey-icon"><Compass size={18} /></div>
              <ArrowUpRight size={16} className="journey-arrow" />
            </div>
            <h3>Hobbies &amp; What Drives Me</h3>
            <p>
              When I&apos;m not writing Kotlin or React, I explore emerging AI tooling (Claude AI, Copilot), benchmark Core Web Vitals, tinker with custom system setups, and dissect open-source architecture patterns to learn how great software is engineered.
            </p>
          </div>

          <div className="journey-card" data-testid="card-journey-love">
            <div className="journey-header">
              <div className="journey-icon"><Heart size={18} className="love-icon" /></div>
              <ArrowUpRight size={16} className="journey-arrow" />
            </div>
            <h3>What I Love</h3>
            <p>
              Clean, modular architecture; sub-second page response times; intuitive user interfaces; detailed micro-animations; and self-documenting code that makes team collaboration seamless.
            </p>
          </div>

          <div className="journey-card" data-testid="card-journey-hate">
            <div className="journey-header">
              <div className="journey-icon"><HeartOff size={18} className="hate-icon" /></div>
              <ArrowUpRight size={16} className="journey-arrow" />
            </div>
            <h3>What I Hate</h3>
            <p>
              Bloated dependencies; silent error swallowing; unconsidered browser defaults; sluggish UI feedback; and rushed code without clear architectural boundaries.
            </p>
          </div>
        </div>

        {/* Fact Strip Glass Cards */}
        <div className="fact-strip">
          <div className="stat-glass-card">
            <span>01</span>
            <strong>30%</strong>
            <small>performance gain on Android features</small>
          </div>
          <div className="stat-glass-card">
            <span>02</span>
            <strong>95+</strong>
            <small>Lighthouse score on shipped web work</small>
          </div>
          <div className="stat-glass-card">
            <span>03</span>
            <strong>100x</strong>
            <small>productivity boost with AI tooling</small>
          </div>
        </div>
      </section>

      {/* 03: Scrollytelling Architecture (Cinematic Scroll-Controlled Storytelling) */}
      <ScrollytellingArchitecture />

      {/* 04: Always-Alive Interface: Living Telemetry Pulse (Terminal + Database) */}
      <section className="telemetry-pulse-section section-frame" aria-labelledby="telemetry-title">
        <div className="section-kicker"><span>04</span> Living Architecture &amp; Telemetry</div>
        <div className="section-heading">
          <h2 id="telemetry-title" className="gsap-reveal-heading">
            Always running.<br />
            <i>Zero ghost states.</i>
          </h2>
          <p>
            Autonomous background telemetry capturing real distributed events, CAS locks, BullMQ queue slices, and compiler benchmarks.
          </p>
        </div>

        <div className="live-telemetry-grid">
          <LivingTerminal />
          <LivingDatabase />
        </div>
      </section>

      {/* 05: Selected Work Section (eGovTalent, UPI Double-Spend, Forge IDE) */}
      <section className="projects section-frame" id="projects" aria-labelledby="projects-title">
        <div className="section-heading">
          <div className="section-kicker"><span>05</span> Selected Architecture &amp; Projects</div>
          <h2 id="projects-title" className="gsap-reveal-heading">Built to leave<br /><i>a mark.</i></h2>
          <p>Three flagship directions — from civic technology to distributed banking pipelines and developer environments.</p>
        </div>

        <div ref={projectListRef} className="project-list">
          {featuredProjects.map((project, idx) => (
            <div
              className={`project-card project-${idx === 0 ? 'orange' : idx === 1 ? 'ink' : 'sand'}`}
              key={project.id}
              onClick={() => setSelectedProject(project)}
              style={{ cursor: 'pointer' }}
              data-testid={`card-home-project-${project.id}`}
            >
              <div className="project-top">
                <span>0{idx + 1}</span>
                <span>{project.categoryLabel}</span>
                <ArrowUpRight size={19} />
              </div>
              <h3>{project.title}</h3>
              <p>{project.tagline}</p>
              <div className="project-stack">
                {project.stack.slice(0, 4).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="project-arrow">
                <span>Inspect Live Architecture</span>
                <ArrowUpRight size={18} />
              </div>
            </div>
          ))}
        </div>

        <div className="projects-redirect-cta">
          <Link className="button button-primary see-all-projects-btn" href="/projects" data-testid="button-see-all-projects">
            See all 24 projects &amp; live architectures <ArrowDownRight size={18} />
          </Link>
        </div>
      </section>

      {/* Project Instance Stage Modal */}
      <ProjectInstanceModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* Integrated Contact Section */}
      <section className="contact section-frame" id="contact" aria-labelledby="contact-title">
        <div className="contact-top">
          <div className="section-kicker"><span>06</span> Get in touch</div>
          <div className="contact-aside">
            Have a problem worth solving?<br />
            <b>Say hello.</b>
          </div>
        </div>

        <div className="contact-layout">
          <div className="contact-left">
            <h2 id="contact-title" className="gsap-reveal-heading">
              Let&apos;s make<br />
              <i>something useful.</i>
            </h2>
            <div className="contact-info">
              <p>I&apos;m actively seeking Founder&apos;s Office, Founding Engineer, and SDE-1 roles with fast-moving teams who value 0-to-1 execution, talent ops, and solid engineering.</p>

              <a className="email-link" href="mailto:subhashmaurya6102003@gmail.com" data-testid="link-email">
                subhashmaurya6102003@gmail.com <ArrowUpRight size={20} />
              </a>

              <button className="copy-email" onClick={copyEmail} data-testid="button-copy-email">
                {copied ? (
                  <><Check size={14} /> Copied to clipboard</>
                ) : (
                  <><Copy size={14} /> Copy email address</>
                )}
              </button>

              <div className="contact-links">
                <a href="https://www.linkedin.com/in/subhash-maurya-656905243/" target="_blank" rel="noreferrer" data-testid="link-linkedin">
                  <Linkedin size={15} /> LinkedIn
                </a>
                <a href="https://github.com/Subhash6102003" target="_blank" rel="noreferrer" data-testid="link-github">
                  <Github size={15} /> GitHub
                </a>
                <a href="https://tal.club/meet/subhash-maurya" target="_blank" rel="noreferrer" data-testid="link-tal-club">
                  <Calendar size={15} /> Tal Club
                </a>
                <a href="https://x.com/Subhash25488410" target="_blank" rel="noreferrer" data-testid="link-twitter">
                  <Twitter size={15} /> Twitter / X
                </a>
              </div>

              {/* GitHub Profile Connection Spotlight Card */}
              <motion.div
                className="github-spotlight-card"
                whileHover={{ scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="spotlight-header">
                  <Github size={20} />
                  <span>GitHub Profile</span>
                  <span className="spotlight-badge"><Sparkles size={12} /> Live Repos</span>
                </div>
                <p>Explore public source repositories, native Android experiments, and full-stack modules.</p>
                <a
                  href="https://github.com/Subhash6102003"
                  target="_blank"
                  rel="noreferrer"
                  className="button button-primary github-spotlight-btn"
                  data-testid="link-github-spotlight"
                >
                  Connect on GitHub @Subhash6102003 <ArrowUpRight size={16} />
                </a>
              </motion.div>
            </div>
          </div>

          {/* Interactive Contact Form */}
          <div className="contact-right">
            <form className="contact-form-card" onSubmit={handleFormSubmit}>
              <h3>Send a message</h3>

              <div className="form-field-group">
                <label htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Subhash Maurya"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="styled-form-input"
                  data-testid="input-contact-name"
                />
              </div>

              <div className="form-field-group">
                <label htmlFor="contact-email">Email Address *</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="styled-form-input"
                  data-testid="input-contact-email"
                />
              </div>

              <div className="form-field-group">
                <label htmlFor="contact-message">Message *</label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Tell me about your project or open position..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="styled-form-textarea"
                  data-testid="input-contact-message"
                />
              </div>

              <motion.button
                type="submit"
                className="button button-primary form-submit-btn"
                whileTap={{ scale: 0.98 }}
                data-testid="button-contact-submit"
              >
                {submitted ? (
                  <><Check size={16} /> Message Sent!</>
                ) : (
                  <><Send size={16} /> Send Message</>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
