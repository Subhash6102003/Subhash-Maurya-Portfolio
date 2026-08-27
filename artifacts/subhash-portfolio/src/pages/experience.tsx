import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Calendar,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ExternalLink,
  Layers,
  ShieldCheck,
  Sparkles,
  Trophy,
  Zap,
} from 'lucide-react';

interface ExperienceItem {
  id: string;
  number: string;
  role: string;
  company: string;
  period: string;
  badge: string;
  summary: string;
  highlights: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 'sde-1',
    number: '01',
    role: 'SDE-1',
    company: 'NexLogic Innovation Private Limited',
    period: 'May 2026 — Present',
    badge: 'Current Role',
    summary: 'Building full-stack features with React.js, Node.js, Express.js, and AWS while contributing to system design, REST architecture, code reviews, and deployment pipelines.',
    highlights: [
      'Engineered core React & Node.js services driving cloud integration.',
      'Participated in system architecture reviews and AWS infrastructure deployments.',
      'Accelerated feature velocity through standardized REST endpoints and code reviews.',
    ],
  },
  {
    id: 'associate-dev',
    number: '02',
    role: 'Associate Software Developer',
    company: 'AnyTechPros Infotech LLP · IT Enablement',
    period: 'Jan 2026 — Apr 2026',
    badge: 'Full-time',
    summary: 'Architected IT-enablement features across React, TypeScript, Node, and REST microservices; reduced page-load time by 20% through rendering optimisation and lazy loading.',
    highlights: [
      'Delivered 95+ Lighthouse Web Vitals compliance on production SPA apps.',
      'Led Agile/Scrum ceremonies, Git branching strategy, and peer code reviews.',
      'Collaborated with cross-functional teams on API contract design and performance profiling.',
    ],
  },
  {
    id: 'web-intern',
    number: '03',
    role: 'Web Developer Intern',
    company: 'Nixaa Vision Leads',
    period: 'Apr 2025 — Sep 2025',
    badge: 'Internship',
    summary: 'Built four responsive web applications with pixel-precise Figma handoffs, REST integrations, and reusable component libraries that increased team velocity by 30%.',
    highlights: [
      'Implemented responsive design systems compliant across all mobile/desktop viewports.',
      'Reduced QA turnaround cycles by writing clean self-documenting code.',
      'Integrated RESTful APIs and optimized front-end bundle size.',
    ],
  },
  {
    id: 'android-intern',
    number: '04',
    role: 'Android Developer Intern',
    company: 'Mobrilz Private Limited',
    period: 'Sep 2024 — Mar 2025',
    badge: 'Internship',
    summary: 'Engineered three production Android features with Kotlin, Compose, MVVM, Clean Architecture, REST APIs, and Firebase; boosted performance by 30% and reduced drop-off by 25%.',
    highlights: [
      'Implemented offline-first architecture with Room DB and Firebase Firestore.',
      'Enforced 95%+ static-analysis pass rate through structured code reviews.',
      'Consistently delivered sprint goals on schedule across 2 release cycles.',
    ],
  },
];

export default function ExperiencePage() {
  const [expandedId, setExpandedId] = useState<string | null>('sde-1');

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="experience-page-container">
      <section className="experience section-frame" aria-labelledby="experience-title">
        {/* Left Column: Heading + Impact Grid + Track Record Card */}
        <div className="experience-heading-group">
          <div className="section-kicker"><span>05</span> In the field</div>
          <h2 id="experience-title">A little<br /><i>momentum.</i></h2>
          <p className="experience-subtitle">
            Chronological career path shipping Android applications, full-stack web platforms, and cloud solutions.
          </p>

          {/* Impact Statistics Grid */}
          <div className="experience-impact-grid">
            <div className="impact-box">
              <strong>1.5+</strong>
              <span>Years Shipping Code</span>
            </div>
            <div className="impact-box">
              <strong>30%</strong>
              <span>Android Speed Boost</span>
            </div>
            <div className="impact-box">
              <strong>95+</strong>
              <span>Lighthouse Web Score</span>
            </div>
            <div className="impact-box">
              <strong>4</strong>
              <span>Engineering Roles</span>
            </div>
          </div>

          {/* Track Record & Engineering Highlights Card */}
          <motion.div
            className="track-record-card"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="track-card-header">
              <ShieldCheck size={18} />
              <h3>Engineering Track Record</h3>
            </div>
            <ul className="track-card-list">
              <li>
                <CheckCircle2 size={15} />
                <span><strong>Clean Architecture:</strong> Offline-first Room/Firestore sync, MVVM patterns, and REST microservices.</span>
              </li>
              <li>
                <CheckCircle2 size={15} />
                <span><strong>Agile Leadership:</strong> Daily Scrum ceremonies, code reviews, and Git branching workflows.</span>
              </li>
              <li>
                <CheckCircle2 size={15} />
                <span><strong>AI Velocity:</strong> Leveraging Claude AI &amp; Copilot to deliver features 100x faster.</span>
              </li>
            </ul>
          </motion.div>

          {/* Domain Capability Badges */}
          <div className="experience-domain-pills">
            <span><Zap size={12} /> Native Android</span>
            <span><Layers size={12} /> Full-Stack Web</span>
            <span><Sparkles size={12} /> Cloud Microservices</span>
          </div>
        </div>

        {/* Right Column: Timeline Rail */}
        <div className="timeline">
          {experiences.map((exp) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div key={exp.id} className="timeline-item" data-testid={`timeline-item-${exp.id}`}>
                <div className="timeline-rail">
                  <span>{exp.number}</span>
                  <i />
                </div>
                <div className="timeline-main">
                  <div className="timeline-meta">
                    <span><Calendar size={13} style={{ display: 'inline', marginRight: 4 }} />{exp.period}</span>
                    <span className="role-badge">{exp.badge}</span>
                  </div>
                  <h3>{exp.role}</h3>
                  <h4>{exp.company}</h4>
                  <p>{exp.summary}</p>

                  <button
                    className="toggle-highlights-btn"
                    onClick={() => toggleExpand(exp.id)}
                    data-testid={`button-toggle-highlights-${exp.id}`}
                  >
                    <span>{isExpanded ? 'Hide Key Highlights' : 'View Key Highlights'}</span>
                    {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        className="highlights-container"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ul>
                          {exp.highlights.map((h, idx) => (
                            <li key={idx}>
                              <CheckCircle2 size={14} className="highlight-bullet" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
