import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Compass,
  Copy,
  Github,
  Heart,
  HeartOff,
  Linkedin,
  MapPin,
  Phone,
  Send,
  Sparkles,
  Trophy,
} from 'lucide-react';

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
    title: 'Eternity Gym Ecosystem',
    kind: 'Comprehensive fitness management platform',
    description: 'Dual-module ecosystem featuring a full-stack web management portal and a native Android application with Jetpack Compose, offline-first sync, trainer scheduling, and push alerts.',
    stack: ['Kotlin', 'Compose', 'React', 'TypeScript', 'Node.js'],
    href: '/projects',
    tone: 'ink',
  },
  {
    number: '03',
    title: 'NexLogic',
    kind: 'Enterprise digital innovation platform',
    description: 'A modern, high-performance web platform built with React, Node.js, and AWS microservices, engineered for high reliability, fast page loads, and enterprise scalability.',
    stack: ['React', 'Node.js', 'Express', 'AWS', 'Tailwind'],
    href: 'https://nexlogic.co.in',
    tone: 'sand',
  },
];

export default function Home() {
  const [screenPowered, setScreenPowered] = useState(true);
  const [keyPressed, setKeyPressed] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="home-page-container">
      {/* Hero Section */}
      <section className="hero section-frame" aria-labelledby="hero-title">
        <motion.div
          className="hero-copy"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="eyebrow">
            <span className="eyebrow-dot" /> Available for thoughtful builds{' '}
            <span className="eyebrow-city">Bhopal / India</span>
          </motion.div>
          <motion.p variants={itemVariants} className="hero-index">
            [01 — 06]
          </motion.p>
          <motion.h1 variants={itemVariants} id="hero-title">
            I build <span>useful</span>
            <br />
            things for
            <br />
            <strong>real people.</strong>
          </motion.h1>
          <motion.p variants={itemVariants} className="hero-intro">
            Subhash Maurya is a final-year Computer Science student and Android / full-stack developer making clear,
            durable software with a little more character.
          </motion.p>
          <motion.div variants={itemVariants} className="hero-ctas">
            <Link className="button button-primary" href="/projects" data-testid="link-hero-projects">
              See selected work <ArrowDownRight size={17} />
            </Link>
            <a className="text-link" href="#contact" data-testid="link-hero-contact">
              Let&apos;s build together <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </motion.div>

        {/* Interactive Refined Modern Workstation Desk (Option 3 with Original Brand Orange Colors) */}
        <div className="hero-art reveal delay-1" aria-label="Illustration of a modern developer workstation desk">
          <div className="art-stamp">SM / 26</div>
          <div className="floating-note note-top">
            <span>01</span> curious by default
          </div>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />

          <motion.div
            className="modern-workstation-container"
            whileHover={{ scale: 1.015 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Ambient Glow Reflection */}
            <div className="monitor-ambient-glow" />

            {/* Brand Orange Modern Curved Monitor */}
            <div className={`modern-monitor ${screenPowered ? 'powered-on' : 'powered-off'}`}>
              <div className="monitor-bezel">
                <div className="monitor-screen">
                  <div className="screen-header">
                    <div className="window-dots">
                      <span className="dot-red" />
                      <span className="dot-yellow" />
                      <span className="dot-green" />
                    </div>
                    <div className="screen-tabs">
                      <span className="tab active">App.tsx</span>
                      <span className="tab">AndroidSDK.kt</span>
                    </div>
                    <small className="file-tag">build.log</small>
                  </div>

                  {screenPowered ? (
                    <div className="code-lines">
                      <i className="line-1" />
                      <i className="line-2" />
                      <i className="line-3" />
                      <i className="line-4" />
                      <i className="line-5" />
                      <i className="line-6" />
                    </div>
                  ) : (
                    <div className="screen-off-msg">SYSTEM PAUSED</div>
                  )}

                  <button
                    className="screen-status-btn"
                    onClick={() => setScreenPowered((prev) => !prev)}
                    title="Toggle Display Power"
                    data-testid="button-toggle-power"
                  >
                    SHIP IT <span className={screenPowered ? 'dot-active' : 'dot-inactive'}>●</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Brand Orange Monitor Neck & Base */}
            <div className="slim-monitor-neck" />
            <div className="slim-monitor-base" />

            {/* Brand Orange Mechanical Keyboard */}
            <div className="slim-keyboard">
              {Array.from({ length: 14 }).map((_, i) => (
                <motion.span
                  key={i}
                  className={i === 4 || i === 9 ? 'accent-key' : ''}
                  animate={{ y: keyPressed === i ? 2 : 0 }}
                  whileHover={{ scale: 1.1 }}
                  onMouseDown={() => setKeyPressed(i)}
                  onMouseUp={() => setKeyPressed(null)}
                />
              ))}
            </div>
          </motion.div>

          <div className="art-caption">
            A small studio of one<br />with a big surface area.
          </div>
        </div>

        <div className="hero-bottom">
          <div className="scroll-cue">
            <span className="scroll-line" /> Scroll to explore
          </div>
          <div className="hero-tech">Kotlin <b>·</b> React <b>·</b> TypeScript <b>·</b> Node.js</div>
          <div className="hero-metric">
            <strong>1.5+</strong>
            <span>
              years shipping
              <br />
              production software
            </span>
          </div>
        </div>
      </section>

      {/* Statement & Personal Journey */}
      <section className="statement section-frame" id="about" aria-labelledby="about-title">
        <div className="section-kicker"><span>02</span> The short version &amp; My Journey</div>
        <div className="statement-grid">
          <h2 id="about-title">Software should feel <i>considered.</i></h2>
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

        {/* Personal Story Cards */}
        <div className="personal-journey-grid">
          <motion.div
            className="journey-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="journey-icon"><Trophy size={18} /></div>
            <h3>How I Achieved My Skills</h3>
            <p>
              Rather than sticking to textbook theory, I built real production apps early on. From mastering native Android (Kotlin, Jetpack Compose, MVVM) during my internship at Mobrilz to architecting full-stack microservices at AnyTechPros and NexLogic, I honed my craft by shipping code directly to users.
            </p>
          </motion.div>

          <motion.div
            className="journey-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="journey-icon"><Compass size={18} /></div>
            <h3>Hobbies &amp; What Drives Me</h3>
            <p>
              When I&apos;m not writing Kotlin or React, I explore emerging AI tooling (Claude AI, Copilot), benchmark Core Web Vitals, tinker with custom system setups, and dissect open-source architecture patterns to learn how great software is engineered.
            </p>
          </motion.div>

          <motion.div
            className="journey-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="journey-icon"><Heart size={18} className="love-icon" /></div>
            <h3>What I Love</h3>
            <p>
              Clean, modular architecture; sub-second page response times; intuitive user interfaces; detailed micro-animations; and self-documenting code that makes team collaboration seamless.
            </p>
          </motion.div>

          <motion.div
            className="journey-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="journey-icon"><HeartOff size={18} className="hate-icon" /></div>
            <h3>What I Hate</h3>
            <p>
              Bloated dependencies; silent error swallowing; unconsidered browser defaults; sluggish UI feedback; and rushed code without clear architectural boundaries.
            </p>
          </motion.div>
        </div>

        <div className="fact-strip">
          <div>
            <span>01</span>
            <strong>30%</strong>
            <small>performance gain on Android features</small>
          </div>
          <div>
            <span>02</span>
            <strong>95+</strong>
            <small>Lighthouse score on shipped web work</small>
          </div>
          <div>
            <span>03</span>
            <strong>100x</strong>
            <small>productivity boost with AI tooling</small>
          </div>
        </div>
      </section>

      {/* Selected Work Section (eGovTalent, Eternity Gym Ecosystem, NexLogic) */}
      <section className="projects section-frame" id="projects" aria-labelledby="projects-title">
        <div className="section-heading">
          <div className="section-kicker"><span>03</span> Selected work</div>
          <h2 id="projects-title">Built to leave<br /><i>a mark.</i></h2>
          <p>Three recent directions — from civic technology to enterprise software platforms.</p>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <a
              className={`project-card project-${project.tone}`}
              href={project.href}
              target={project.href.startsWith('http') ? '_blank' : undefined}
              rel={project.href.startsWith('http') ? 'noreferrer' : undefined}
              key={project.number}
              data-testid={`link-project-${project.number}`}
            >
              <div className="project-top">
                <span>{project.number}</span>
                <span>{project.kind}</span>
                <ArrowUpRight size={19} />
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-stack">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="project-arrow">
                <span>View project</span>
                <ArrowUpRight size={18} />
              </div>
            </a>
          ))}
        </div>

        <div className="projects-redirect-cta">
          <Link className="button button-primary see-all-projects-btn" href="/projects" data-testid="button-see-all-projects">
            See all projects &amp; live repos <ArrowDownRight size={18} />
          </Link>
        </div>
      </section>

      {/* Integrated Contact Section */}
      <section className="contact section-frame" id="contact" aria-labelledby="contact-title">
        <div className="contact-top">
          <div className="section-kicker"><span>04</span> Your turn</div>
          <div className="contact-aside">
            Have a problem worth solving?<br />
            <b>Say hello.</b>
          </div>
        </div>

        <div className="contact-layout">
          <div className="contact-left">
            <h2 id="contact-title">
              Let&apos;s make<br />
              <i>something useful.</i>
            </h2>
            <div className="contact-info">
              <p>I&apos;m open to software engineering roles, product conversations, and teams who care about clean design and solid code.</p>

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
                <a href="tel:+916386145186" data-testid="link-phone">
                  <Phone size={15} /> +91 63861 45186
                </a>
                <a href="https://www.linkedin.com/in/subhash-maurya-656905243" target="_blank" rel="noreferrer" data-testid="link-linkedin">
                  <Linkedin size={15} /> LinkedIn
                </a>
              </div>

              {/* GitHub Profile Connection Spotlight Card */}
              <motion.div
                className="github-spotlight-card"
                whileHover={{ scale: 1.02 }}
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

          {/* Re-created Interactive Contact Form with Distinct Styled Blocks */}
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

        <div className="contact-footer">
          <span><MapPin size={15} /> Bhopal, Madhya Pradesh</span>
          <span>© {new Date().getFullYear()} Subhash Maurya</span>
          <a href="#top" data-testid="link-back-top">Back to top <ArrowUpRight size={15} /></a>
        </div>
      </section>
    </div>
  );
}
