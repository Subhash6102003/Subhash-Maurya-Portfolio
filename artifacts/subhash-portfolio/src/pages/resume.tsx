import { useState, useEffect } from 'react';
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

export const RESUME_DRIVE_VIEW_URL = 'https://drive.google.com/file/d/1IMFPHuTJmO3GrGzGOJ-Cgr5zAoCDlIlM/view?usp=sharing';
export const RESUME_DRIVE_PREVIEW_URL = 'https://drive.google.com/file/d/1IMFPHuTJmO3GrGzGOJ-Cgr5zAoCDlIlM/preview';

export default function ResumePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));
  const handleResetZoom = () => setZoom(100);

  return (
    <div className="resume-page-container">
      <section className="resume section-frame" aria-labelledby="resume-title">
        <div className="resume-card-container">
          {/* Main Interactive Desk Pad Paper Preview */}
          <div className="resume-card">
            <div className="resume-copy">
              <div className="section-kicker"><span>06</span> Paper Trail &amp; Qualifications</div>
              <h2 id="resume-title">The longer<br />version <i>lives here.</i></h2>
              <p>
                A detailed breakdown of professional software development experience, computer science academic coursework, technical competencies, and verified credentials.
              </p>
              <div className="resume-actions">
                <button
                  className="button button-dark"
                  onClick={() => setIsModalOpen(true)}
                  data-testid="button-open-resume-modal"
                >
                  <FileText size={16} /> Open Resume Pop-Up <Sparkles size={14} />
                </button>
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
              className="resume-paper"
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
                <span>ANDROID SDK &amp; KOTLIN</span>
                <span>REACT &amp; NODE.JS</span>
                <span>AWS &amp; AI TOOLING</span>
              </div>
              <div className="paper-footer">Bhopal, MP — 462022</div>
            </motion.div>
          </div>
        </div>

        {/* Extended Resume Detailed Breakdown */}
        <div className="resume-breakdown-grid resume-expanded-grid">
          {/* Professional Summary */}
          <motion.div
            className="resume-detail-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="detail-card-header">
              <Briefcase size={20} />
              <h3>Executive Profile</h3>
            </div>
            <div className="detail-card-body">
              <p className="inst-desc">
                Software Development Engineer (SDE) specializing in native Android engineering (Kotlin, Jetpack Compose, MVVM) and full-stack web architectures (React.js, Node.js, AWS). Over 1.5 years of experience delivering production web portals, society management applications, and AI recruitment systems with a focus on performance optimization and clean code design.
              </p>
            </div>
          </motion.div>

          {/* Education Card */}
          <motion.div
            className="resume-detail-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="detail-card-header">
              <GraduationCap size={20} />
              <h3>Education</h3>
            </div>
            <div className="detail-card-body">
              <h4>B.Tech in Computer Science &amp; Engineering (AI/ML)</h4>
              <p className="inst-name">Lakshmi Narain College of Technology &amp; Science, Bhopal</p>
              <span className="inst-date">2022 — 2026 (Final Year)</span>
              <p className="inst-desc">
                Specialized coursework: Data Structures &amp; Algorithms, Object-Oriented Programming, Database Management Systems (SQL), Operating Systems, Software Engineering, Artificial Intelligence, and Machine Learning algorithms.
              </p>
            </div>
          </motion.div>

          {/* Core Capabilities */}
          <motion.div
            className="resume-detail-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="detail-card-header">
              <Code size={20} />
              <h3>Core Capabilities</h3>
            </div>
            <div className="detail-card-body">
              <ul className="competency-list">
                <li>
                  <CheckCircle2 size={16} />
                  <span><strong>Native Mobile Engineering:</strong> Kotlin, Android SDK, Jetpack Compose, Room Database, Retrofit, Coroutines, MVVM, Firebase Firestore/FCM.</span>
                </li>
                <li>
                  <CheckCircle2 size={16} />
                  <span><strong>Full-Stack Web Development:</strong> React.js, Next.js, TypeScript, Redux Toolkit, Node.js, Express.js, REST APIs, Tailwind CSS.</span>
                </li>
                <li>
                  <CheckCircle2 size={16} />
                  <span><strong>Cloud Services &amp; AI:</strong> AWS EC2, S3, Docker, Nginx, PostgreSQL, MongoDB, GitHub Actions, Claude AI, Copilot, Gemini.</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Key Achievements */}
          <motion.div
            className="resume-detail-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="detail-card-header">
              <Award size={20} />
              <h3>Key Achievements</h3>
            </div>
            <div className="detail-card-body">
              <ul className="competency-list">
                <li>
                  <CheckCircle2 size={16} />
                  <span>Achieved <strong>30% performance boost</strong> on native Android features at Mobrilz Private Limited.</span>
                </li>
                <li>
                  <CheckCircle2 size={16} />
                  <span>Delivered <strong>95+ Lighthouse Web Vitals score</strong> on enterprise web applications at AnyTechPros.</span>
                </li>
                <li>
                  <CheckCircle2 size={16} />
                  <span>Solo-engineered <strong>eGovTalent Platform</strong>: India&apos;s first AI-driven e-governance recruitment ecosystem.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive PDF Resume Pop-Up Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="resume-modal-backdrop" onClick={() => setIsModalOpen(false)}>
            <motion.div
              className={`resume-modal-container ${isMaximized ? 'is-maximized' : ''}`}
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

                  {/* External Drive Link */}
                  <a
                    href={RESUME_DRIVE_VIEW_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="modal-icon-btn"
                    title="Open in Google Drive"
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
