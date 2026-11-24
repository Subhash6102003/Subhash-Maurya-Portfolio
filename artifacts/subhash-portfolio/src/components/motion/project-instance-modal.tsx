import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Download, ShieldCheck, Zap, Layers, Sparkles } from 'lucide-react';
import { ProjectArchitectureGraph } from './project-architecture-graph';
import { WorkflowType } from './workflow-simulator';

export interface ProjectInstanceData {
  id: string;
  title: string;
  category: 'company' | 'pain_points' | 'freelance' | 'flagship';
  categoryLabel: string;
  tagline: string;
  problem: string;
  solution: string;
  metrics: Array<{ label: string; value: string }>;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  apkUrl?: string;
  workflowType?: WorkflowType;
  motionFxType: 'workflow' | 'terminal' | 'database';
}

interface ProjectInstanceModalProps {
  project: ProjectInstanceData | null;
  onClose: () => void;
}

export function ProjectInstanceModal({ project, onClose }: ProjectInstanceModalProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="project-instance-backdrop" onClick={onClose}>
        <motion.div
          className="project-instance-sheet glass-card"
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 35, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="sheet-top-bar">
            <div className="sheet-category-pill">
              <span className="cat-dot" />
              <span>{project.categoryLabel}</span>
            </div>
            <button
              className="sheet-close-btn"
              onClick={onClose}
              title="Close modal (Esc)"
              data-testid="button-close-instance"
            >
              <X size={18} />
              <span>Close (Esc)</span>
            </button>
          </div>

          <div className="sheet-content-scroll">
            {/* Title & Tagline */}
            <div className="sheet-hero">
              <h2 className="sheet-title">{project.title}</h2>
              <p className="sheet-tagline">{project.tagline}</p>
            </div>

            {/* Living Visual Architecture Graph Stage */}
            <div className="sheet-motion-stage">
              <ProjectArchitectureGraph project={project} />
            </div>

            {/* Problem & Solution Breakdown Grid */}
            <div className="sheet-analysis-grid">
              <div className="analysis-box box-problem">
                <div className="analysis-box-header">
                  <ShieldCheck size={16} className="text-orange" />
                  <h4>Production Challenge / Failure Mode</h4>
                </div>
                <p>{project.problem}</p>
              </div>

              <div className="analysis-box box-solution">
                <div className="analysis-box-header">
                  <Zap size={16} className="text-orange" />
                  <h4>Architectural Solution &amp; Mitigation</h4>
                </div>
                <p>{project.solution}</p>
              </div>
            </div>

            {/* Real Impact Metrics Banner */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="sheet-metrics-row">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="metric-tile glass-card">
                    <strong className="font-mono tabular-nums">{m.value}</strong>
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Stack Chips */}
            <div className="sheet-stack-section">
              <span className="stack-label">Core Technologies:</span>
              <div className="stack-chips-wrap">
                {project.stack.map((t) => (
                  <span key={t} className="tech-chip font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action CTAs */}
            <div className="sheet-actions-row">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="button button-primary"
                  data-testid="link-instance-live"
                >
                  <ExternalLink size={16} /> Open Live Platform
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="button button-dark"
                  data-testid="link-instance-github"
                >
                  <Github size={16} /> Inspect GitHub Architecture
                </a>
              )}
              {project.apkUrl && (
                <a
                  href={project.apkUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="button button-primary"
                  data-testid="link-instance-apk"
                >
                  <Download size={16} /> Download Signed APK
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
