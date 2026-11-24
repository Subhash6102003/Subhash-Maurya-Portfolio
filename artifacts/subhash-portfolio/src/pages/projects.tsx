import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github, Search, ShieldCheck, Zap, Terminal, Sparkles, Filter } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { attachCardTilt } from '@/lib/animations';
import { ALL_PROJECTS_CATALOG } from '@/data/projects-catalog';
import { ProjectInstanceModal, ProjectInstanceData } from '@/components/motion/project-instance-modal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CATEGORY_TABS = [
  { id: 'all', label: 'All Projects', count: ALL_PROJECTS_CATALOG.length },
  { id: 'company', label: 'Company Engineering', count: ALL_PROJECTS_CATALOG.filter((p) => p.category === 'company').length },
  { id: 'pain_points', label: 'Industry Failure Mitigation', count: ALL_PROJECTS_CATALOG.filter((p) => p.category === 'pain_points').length },
  { id: 'freelance', label: 'Freelance & Client Systems', count: ALL_PROJECTS_CATALOG.filter((p) => p.category === 'freelance').length },
  { id: 'flagship', label: 'Flagship Platforms & Labs', count: ALL_PROJECTS_CATALOG.filter((p) => p.category === 'flagship').length },
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectInstanceData | null>(null);

  const scopeRef = useRef<HTMLDivElement | null>(null);

  // Extract all unique tech tags
  const allTechs = ['All', ...Array.from(new Set(ALL_PROJECTS_CATALOG.flatMap((p) => p.stack)))].slice(0, 16);

  // Filtered project list
  const filteredProjects = ALL_PROJECTS_CATALOG.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      searchTerm === '' ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.stack.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTech = selectedTech === 'All' || p.stack.includes(selectedTech);

    return matchesCategory && matchesSearch && matchesTech;
  });

  // GSAP ScrollTrigger & Desktop 3D Card Tilt
  useEffect(() => {
    if (!scopeRef.current) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from('.projects-header-animate', {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Filter tabs entrance
      gsap.from('.project-cat-tab', {
        y: 16,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        delay: 0.15,
      });

      // Staggered project cards reveal
      const cards = scopeRef.current?.querySelectorAll<HTMLElement>('.project-showcase-tile');
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          y: 35,
          opacity: 0,
          scale: 0.98,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.projects-showcase-grid',
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, scopeRef);

    // Desktop 3D Card tilt
    const cleanupFns: Array<() => void> = [];
    if (window.matchMedia('(pointer: fine)').matches) {
      const tiltCards = scopeRef.current.querySelectorAll<HTMLElement>('.project-showcase-tile');
      tiltCards.forEach((card) => cleanupFns.push(attachCardTilt(card, 5)));
    }

    return () => {
      ctx.revert();
      cleanupFns.forEach((fn) => fn());
    };
  }, [selectedCategory, selectedTech, searchTerm]);

  return (
    <div ref={scopeRef} className="projects-page-container">
      <section className="projects section-frame" aria-labelledby="projects-title">
        {/* Section Header */}
        <div className="section-kicker projects-header-animate">
          <span>03</span> Architecture &amp; Production Index
        </div>

        <div className="projects-header-animate">
          <h2 id="projects-title">
            Built to endure.<br />
            <i>Engineered to scale.</i>
          </h2>
          <p className="projects-lede">
            From high-throughput failure mitigation pipelines and AI e-governance systems to full-stack desktop IDEs and mobile apps. Click any card to inspect its real-time telemetry, live architecture, and failure mitigation models.
          </p>
        </div>

        {/* 4-Tier Strategic Category Navigation Bar */}
        <div className="project-category-bar">
          {CATEGORY_TABS.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                className={`project-cat-tab ${isActive ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(tab.id)}
                data-testid={`tab-cat-${tab.id}`}
              >
                <span>{tab.label}</span>
                <span className="cat-count font-mono tabular-nums">({tab.count})</span>
                {isActive && (
                  <motion.div
                    layoutId="active-project-pill"
                    className="active-pill-background"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Search Bar & Tech Filter Chips */}
        <div className="project-filter-toolbar glass-card">
          <div className="project-search-wrap">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search by system design, problem, or technology (e.g. UPI, Redis, Claude AI, Jetpack)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="project-search-input font-sans"
              data-testid="input-search-projects"
            />
          </div>

          <div className="project-tech-chips">
            {allTechs.map((tech) => (
              <button
                key={tech}
                className={`tech-filter-pill ${selectedTech === tech ? 'active' : ''}`}
                onClick={() => setSelectedTech(tech)}
                data-testid={`pill-tech-${tech.toLowerCase()}`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Project Showcase Grid */}
        <div className="projects-showcase-grid">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              className={`project-showcase-tile glass-card tile-tone-${project.category}`}
              onClick={() => setActiveProject(project)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              data-testid={`card-project-${project.id}`}
            >
              {/* Card Header Topline */}
              <div className="tile-top-bar">
                <span className="tile-number font-mono">0{idx + 1}</span>
                <span className="tile-category-tag font-mono">{project.categoryLabel}</span>
              </div>

              {/* Title & Tagline */}
              <h3 className="tile-title">{project.title}</h3>
              <p className="tile-tagline">{project.tagline}</p>

              {/* Problem / Architecture Snapshot */}
              <div className="tile-problem-snippet">
                <span className="snippet-badge font-mono">
                  <ShieldCheck size={12} className="text-orange" /> Core Challenge:
                </span>
                <p>{project.problem}</p>
              </div>

              {/* Primary Metrics */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="tile-metrics-strip">
                  {project.metrics.slice(0, 2).map((m, mIdx) => (
                    <div key={mIdx} className="mini-metric">
                      <strong className="font-mono tabular-nums">{m.value}</strong>
                      <span>{m.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech Stack Chips */}
              <div className="tile-stack-chips">
                {project.stack.slice(0, 4).map((tech) => (
                  <span key={tech} className="tile-tech-chip font-mono">
                    {tech}
                  </span>
                ))}
                {project.stack.length > 4 && (
                  <span className="tile-tech-more font-mono">+{project.stack.length - 4}</span>
                )}
              </div>

              {/* Footer Open Stage Trigger */}
              <div className="tile-footer">
                <span className="open-stage-btn">
                  <span>Inspect Live Architecture</span>
                  <ArrowUpRight size={15} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="projects-empty-state glass-card">
            <h4>No projects match your filter.</h4>
            <p>Try clearing your search query or selecting &quot;All Projects&quot;.</p>
            <button
              className="button button-outline"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedTech('All');
                setSearchTerm('');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Interactive Project Stage Modal */}
      <ProjectInstanceModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}
