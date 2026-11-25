import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  ExternalLink,
  GraduationCap,
  Award,
  CheckCircle2,
  FileText,
  Briefcase,
  Code,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  Sparkles,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { attachCardTilt } from '@/lib/animations';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const RESUME_PDF_LOCAL_URL = 'https://drive.google.com/uc?export=download&id=17tlOCfyleyMoVmtP2WH4G-qnQYaMccz9';
export const RESUME_DRIVE_VIEW_URL = 'https://drive.google.com/file/d/17tlOCfyleyMoVmtP2WH4G-qnQYaMccz9/view?usp=sharing';
export const RESUME_DRIVE_PREVIEW_URL = 'https://drive.google.com/file/d/17tlOCfyleyMoVmtP2WH4G-qnQYaMccz9/preview';

export default function ResumePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [isMaximized, setIsMaximized] = useState(false);
  const resumeContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  useEffect(() => {
    if (!resumeContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Main resume card header & paper entrance
      gsap.from('.resume-intro-animate', {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.resume-paper-animate', {
        scale: 0.94,
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.15)',
        delay: 0.2,
      });

      // Detail breakdown cards staggered entrance
      const detailCards = gsap.utils.toArray<HTMLElement>('.resume-detail-card');
      if (detailCards.length > 0) {
        gsap.from(detailCards, {
          y: 35,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.resume-expanded-grid',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, resumeContainerRef);

    // Desktop 3D Card tilt on breakdown cards
    const cleanupFns: Array<() => void> = [];
    if (window.matchMedia('(pointer: fine)').matches) {
      const cards = resumeContainerRef.current.querySelectorAll<HTMLElement>('.resume-detail-card, .resume-card');
      cards.forEach((card) => cleanupFns.push(attachCardTilt(card, 5)));
    }

    return () => {
      ctx.revert();
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));
  const handleResetZoom = () => setZoom(100);

  return (
    <div ref={resumeContainerRef} className="resume-page-container">
      <section className="resume section-frame" aria-labelledby="resume-title">
        <div className="resume-card-container">
          {/* Main Interactive Desk Pad Paper Preview */}
          <div className="resume-card glass-card">
            <div className="resume-copy resume-intro-animate">
              <div className="section-kicker"><span>06</span> Paper Trail &amp; Qualifications</div>
              <h2 id="resume-title">The longer<br />version <i>lives here.</i></h2>
              <p>
                Full-stack developer with 1.5+ years of experience shipping products across mobile, web, API, and cloud data layers: Flutter, Kotlin, Jetpack Compose, React, TypeScript, Node.js, and AWS.
              </p>
              <div className="resume-actions">
                <button
                  className="button button-dark"
                  onClick={() => setIsModalOpen(true)}
                  data-testid="button-open-resume-modal"
                >
                  <FileText size={16} /> Open Resume Pop-Up <Sparkles size={14} />
                </button>
                <a
                  className="button button-primary"
                  href={RESUME_PDF_LOCAL_URL}
                  download="Subhash_Maurya_Resume.pdf"
                  data-testid="button-download-resume"
                >
                  <Download size={16} /> Download PDF
                </a>
                <button
                  className="button button-outline"
                  onClick={() => setIsModalOpen(true)}
                  data-testid="button-profile-pdf-modal"
                >
                  Interactive Preview <Maximize2 size={16} />
                </button>
              </div>
            </div>

            {/* Stylized Desk-Pad Paper Card */}
            <motion.div
              className="resume-paper resume-paper-animate"
              whileHover={{ rotate: -1, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 260 }}
              onClick={() => setIsModalOpen(true)}
              style={{ cursor: 'pointer' }}
              title="Click to view interactive resume pop-up"
            >
              <div className="paper-clip" />
              <div className="paper-header">
                SUBHASH<br /><b>MAURYA</b>
              </div>
              <div className="paper-rule" />
              <div className="paper-line long" />
              <div className="paper-line medium" />
              <div className="paper-line short" />
              <div className="paper-block">
                <span>FLUTTER · KOTLIN · REACT</span>
                <span>NODE.JS &amp; REST APIS</span>
                <span>AWS &amp; CLAUDE AI PIPELINES</span>
              </div>
              <div className="paper-footer">Bengaluru, Karnataka — India</div>
            </motion.div>
          </div>
        </div>

        {/* Extended Resume Detailed Breakdown */}
        <div className="resume-breakdown-grid resume-expanded-grid">
          {/* Professional Summary */}
          <div className="resume-detail-card glass-card">
            <div className="detail-card-header">
              <Briefcase size={20} />
              <h3>Summary &amp; Profile</h3>
            </div>
            <div className="detail-card-body">
              <p className="inst-desc">
                Software Engineer I &amp; Full-Stack Developer with 1.5+ years of experience shipping products across mobile, web, API, and data layers: Flutter and Kotlin/Jetpack Compose apps, and React, TypeScript, and Node.js systems on AWS. Builds complete user flows including loading, empty, error, and retry states, utilizing AI tools (Claude, GitHub Copilot) to move faster while taking full ownership of every line shipped. Bengaluru-based and ready to work in person.
              </p>
            </div>
          </div>

          {/* Education Card */}
          <div className="resume-detail-card glass-card">
            <div className="detail-card-header">
              <GraduationCap size={20} />
              <h3>Education</h3>
            </div>
            <div className="detail-card-body">
              <h4>B.Tech in Computer Science &amp; Engineering (AI/ML)</h4>
              <p className="inst-name">Lakshmi Narain College of Technology &amp; Science, Bhopal</p>
              <span className="inst-date">Nov 2022 — Jul 2026 (Final Year)</span>
              <p className="inst-desc">
                Specialized Coursework: Data Structures &amp; Algorithms (DSA), Object-Oriented Programming (OOP), Database Management Systems (DBMS), Machine Learning, Deep Learning, Software Engineering, Mobile App Development, Computer Networks.
              </p>
            </div>
          </div>

          {/* Core Technical Skills */}
          <div className="resume-detail-card glass-card">
            <div className="detail-card-header">
              <Code size={20} />
              <h3>Technical Skills</h3>
            </div>
            <div className="detail-card-body">
              <ul className="competency-list">
                <li>
                  <CheckCircle2 size={16} />
                  <span><strong>Mobile:</strong> Flutter, Dart, Kotlin, Jetpack Compose, MVVM, Clean Architecture, FCM, WorkManager, Play Store.</span>
                </li>
                <li>
                  <CheckCircle2 size={16} />
                  <span><strong>Backend &amp; Data:</strong> Node.js, Express.js, REST APIs, Firebase Auth, Firestore, Firebase Storage, real-time sync, AWS.</span>
                </li>
                <li>
                  <CheckCircle2 size={16} />
                  <span><strong>Web &amp; Tooling:</strong> React.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Git, GitHub Actions CI/CD, Razorpay, JIRA, Agile/Scrum, Claude, Copilot.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Shipped Projects Highlights */}
          <div className="resume-detail-card glass-card">
            <div className="detail-card-header">
              <Award size={20} />
              <h3>Shipped Projects Highlights</h3>
            </div>
            <div className="detail-card-body">
              <ul className="competency-list">
                <li>
                  <CheckCircle2 size={16} />
                  <span><strong>eGovTalent:</strong> End-to-end AI-powered recruitment platform (React, TypeScript, Node.js, AWS, Claude AI) automating resume extraction and assessments.</span>
                </li>
                <li>
                  <CheckCircle2 size={16} />
                  <span><strong>Eternity Fitness Club:</strong> Shipped production Flutter app, React/Node.js web app, and Firebase backend with role-based auth, Claude AI fitness coach.</span>
                </li>
                <li>
                  <CheckCircle2 size={16} />
                  <span><strong>MGB Heights:</strong> Kotlin &amp; Compose residential society app with Firebase Auth (6 RBAC tiers), 14 Firestore collections, WorkManager auto-billing, and Razorpay.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive PDF Resume Pop-Up Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="resume-modal-backdrop" onClick={() => setIsModalOpen(false)}>
            <motion.div
              className={`resume-modal-container glass-card ${isMaximized ? 'is-maximized' : ''}`}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Standout Prominent Red Close Button (Always visible on top-right) */}
              <button
                className="prominent-modal-close-btn"
                onClick={() => setIsModalOpen(false)}
                title="Close Pop-Up (Esc)"
                data-testid="button-modal-close-prominent"
              >
                <X size={18} />
                <span>Close (Esc)</span>
              </button>

              {/* Modal Toolbar */}
              <div className="resume-modal-toolbar">
                <div className="toolbar-title">
                  <FileText size={18} className="doc-icon" />
                  <span>Subhash_Maurya_Resume.pdf</span>
                </div>

                <div className="toolbar-controls">
                  {/* Zoom Controls */}
                  <div className="zoom-group">
                    <button className="modal-icon-btn" onClick={handleZoomOut} title="Zoom Out (-)">
                      <ZoomOut size={16} />
                    </button>
                    <span className="zoom-indicator">{zoom}%</span>
                    <button className="modal-icon-btn" onClick={handleZoomIn} title="Zoom In (+)">
                      <ZoomIn size={16} />
                    </button>
                    <button className="modal-icon-btn" onClick={handleResetZoom} title="Reset Zoom (100%)">
                      <RotateCcw size={15} />
                    </button>
                  </div>

                  <div className="toolbar-divider" />

                  {/* Direct Download in Toolbar */}
                  <a
                    href={RESUME_PDF_LOCAL_URL}
                    download="Subhash_Maurya_Resume.pdf"
                    className="modal-icon-btn"
                    title="Download PDF"
                  >
                    <Download size={16} />
                  </a>

                  {/* Open in new tab Link */}
                  <a
                    href={RESUME_DRIVE_VIEW_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="modal-icon-btn"
                    title="Open in New Tab"
                  >
                    <ExternalLink size={16} />
                  </a>

                  {/* Maximize Toggle */}
                  <button
                    className="modal-icon-btn"
                    onClick={() => setIsMaximized((prev) => !prev)}
                    title={isMaximized ? 'Restore Size' : 'Maximize Window'}
                  >
                    {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                  </button>
                </div>
              </div>

              {/* Modal Viewer Body */}
              <div className="resume-modal-body">
                <div
                  className="iframe-scale-wrapper"
                  style={{
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: 'top center',
                    transition: 'transform 0.2s ease-out',
                  }}
                >
                  <iframe
                    src={RESUME_DRIVE_PREVIEW_URL}
                    className="resume-pdf-iframe"
                    title="Subhash Maurya Resume PDF Viewer"
                    allow="autoplay"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
