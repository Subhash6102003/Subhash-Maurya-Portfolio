import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, MessageSquare, Cpu, Cloud, Activity, Layers } from 'lucide-react';

interface AcquireStep {
  stepNum: string;
  tabLabel: string;
  card1Title: string;
  card1Metric: string;
  bars: number[];
  advisorRole: string;
  advisorName: string;
  card2Kicker: string;
  card2Title: string;
  card2Badge: string;
  col1Label: string;
  col1Val: string;
  col2Label: string;
  col2Val: string;
  col3Label: string;
  col3Val: string;
  chatLine: string;
  btnSecondary: string;
  btnPrimary: string;
  miniFlex1Label: string;
  miniFlex1Val: string;
  miniFlex2Label: string;
  miniFlex2Val: string;
}

const ACQUIRE_STEPS: AcquireStep[] = [
  {
    stepNum: '01',
    tabLabel: 'What We Do',
    card1Title: 'Distributed Systems',
    card1Metric: '24+ Live',
    bars: [42, 68, 55, 88, 96],
    advisorRole: 'SDE-1 & Founding Member',
    advisorName: 'Subhash Maurya',
    card2Kicker: 'Step 01 · Architecture',
    card2Title: 'Full-Stack & Native Mobile',
    card2Badge: 'Production Verified',
    col1Label: 'Frontend',
    col1Val: 'React · TS',
    col2Label: 'Mobile',
    col2Val: 'Kotlin · Flutter',
    col3Label: 'Scale',
    col3Val: '14K/s',
    chatLine: '“Designing resilient systems from mobile UI down to atomic database locks.”',
    btnSecondary: 'View Stack',
    btnPrimary: 'Explore Systems ✓',
    miniFlex1Label: 'Core Stack',
    miniFlex1Val: 'React · Kotlin · Node',
    miniFlex2Label: 'Reliability',
    miniFlex2Val: '99.99% SLA',
  },
  {
    stepNum: '02',
    tabLabel: 'How We Do It',
    card1Title: 'UPI CAS Pipeline',
    card1Metric: '8ms P99',
    bars: [60, 74, 82, 91, 100],
    advisorRole: 'Failure Mitigation',
    advisorName: 'Zero Slippage',
    card2Kicker: 'Step 02 · Execution',
    card2Title: 'Atomic Locks & Sagas',
    card2Badge: '0% Double-Spend',
    col1Label: 'Locking',
    col1Val: 'Redis SETNX',
    col2Label: 'Queues',
    col2Val: 'BullMQ',
    col3Label: 'Safety',
    col3Val: 'Idempotent',
    chatLine: '“Duplicate retry intercepted via SHA-256 key; balance reserved atomically.”',
    btnSecondary: 'Inspect DAG',
    btnPrimary: 'Saga Committed ✓',
    miniFlex1Label: 'Lock Engine',
    miniFlex1Val: 'Redis CAS + Saga',
    miniFlex2Label: 'Double Debits',
    miniFlex2Val: '0.00% Loss',
  },
  {
    stepNum: '03',
    tabLabel: 'Live Chat',
    card1Title: 'Forge Studio Brain',
    card1Metric: '100x AI',
    bars: [50, 65, 78, 86, 95],
    advisorRole: 'AI Agent Debate',
    advisorName: 'Claude + Monaco',
    card2Kicker: 'Step 03 · Team & AI Chat',
    card2Title: 'Multi-Agent Code Review',
    card2Badge: '0 Type Errors',
    col1Label: 'Reviewer',
    col1Val: 'Architect AI',
    col2Label: 'Lead',
    col2Val: '3 Devs',
    col3Label: 'Checks',
    col3Val: '100% Pass',
    chatLine: '“@Subhash: Edge-case guard verified on PR #42. Ready for production merge.”',
    btnSecondary: 'Review Diff',
    btnPrimary: 'Approve Merge ✓',
    miniFlex1Label: 'Orchestration',
    miniFlex1Val: 'Multi-Brain Debate',
    miniFlex2Label: 'Typecheck',
    miniFlex2Val: '0 Errors',
  },
  {
    stepNum: '04',
    tabLabel: 'Deployment',
    card1Title: 'AWS Bangalore Edge',
    card1Metric: '99.99%',
    bars: [72, 80, 89, 94, 99],
    advisorRole: 'Cloud Infrastructure',
    advisorName: 'ap-south-1 Live',
    card2Kicker: 'Step 04 · Delivery',
    card2Title: 'Zero-Downtime CI/CD',
    card2Badge: 'Lighthouse 95+',
    col1Label: 'Pipeline',
    col1Val: 'GitHub Actions',
    col2Label: 'Runtime',
    col2Val: 'Docker · Node',
    col3Label: 'Latency',
    col3Val: '38ms',
    chatLine: '“Canary shifted to 100% traffic. All 128 health checks reporting 200 OK.”',
    btnSecondary: 'View Logs',
    btnPrimary: 'Live in Prod ✓',
    miniFlex1Label: 'Deploy Region',
    miniFlex1Val: 'AWS ap-south-1',
    miniFlex2Label: 'Edge Latency',
    miniFlex2Val: '38ms P95',
  },
  {
    stepNum: '05',
    tabLabel: "Founder's Office",
    card1Title: '0-to-1 Venture Ops',
    card1Metric: '3 Devs Led',
    bars: [58, 75, 84, 92, 98],
    advisorRole: "Founder's Office & HR",
    advisorName: 'Talent + Execution',
    card2Kicker: "Step 05 · Founder's Office",
    card2Title: 'Product, Hiring & GTM Ops',
    card2Badge: 'Cross-Functional Lead',
    col1Label: 'Hiring',
    col1Val: 'Tech + HR Ops',
    col2Label: 'Strategy',
    col2Val: '0-to-1 GTM',
    col3Label: 'Velocity',
    col3Val: '100x AI',
    chatLine: '“Built automated hiring pipelines, led sprint reviews & shipped production MVP.”',
    btnSecondary: 'View Resume',
    btnPrimary: 'Hire for FO ✓',
    miniFlex1Label: 'Target Role',
    miniFlex1Val: "Founder's Office",
    miniFlex2Label: 'Team Scope',
    miniFlex2Val: 'Hiring + 0-to-1',
  },
];

export function HeroAcquireShowcase() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % ACQUIRE_STEPS.length);
    }, 3600);
    return () => clearInterval(timer);
  }, []);

  const step = ACQUIRE_STEPS[stepIndex];

  return (
    <div className="acquire-hero-showcase" aria-label="Interactive step-by-step engineering workflow showcase">
      {/* Subtle Geometric Indigo Background Tiles */}
      <div className="acquire-bg-tiles" aria-hidden="true">
        <div className="bg-tile tile-a" />
        <div className="bg-tile tile-b" />
        <div className="bg-tile tile-c" />
      </div>

      {/* Autonomous Step Selector Pills */}
      <div className="acquire-step-pills">
        {ACQUIRE_STEPS.map((s, idx) => (
          <button
            key={s.stepNum}
            type="button"
            className={`acquire-step-pill font-mono ${idx === stepIndex ? 'is-active' : ''}`}
            onClick={() => setStepIndex(idx)}
          >
            <span>{s.stepNum}</span> {s.tabLabel}
          </button>
        ))}
      </div>

      {/* Staggered Dual Flag Cards + Dotted SVG Connector */}
      <div className="acquire-cards-stage">
        <svg className="acquire-dotted-svg" viewBox="0 0 520 380" aria-hidden="true">
          <path
            d="M 145 255 L 145 342 Q 145 352 155 352 L 365 352 Q 375 352 375 342 L 375 322"
            fill="none"
            stroke="rgba(143, 136, 214, 0.35)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path
            d="M 300 68 L 365 68 Q 375 68 375 78 L 375 130"
            fill="none"
            stroke="rgba(143, 136, 214, 0.35)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <circle cx="145" cy="255" r="5" fill="#2A2551" stroke="#ffffff" strokeWidth="2" />
          <circle cx="375" cy="322" r="5" fill="#2A2551" stroke="#ffffff" strokeWidth="2" />
        </svg>

        <AnimatePresence mode="wait">
          <motion.div
            key={step.stepNum}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="acquire-cards-pair"
          >
            {/* Flag Card 1: Distinct Flexbox Content Per Step! */}
            <div className="acquire-flag-card flag-card-primary">
              <div className="flag-card-head">
                <span className="flag-card-title">{step.card1Title}</span>
                <strong className="flag-card-big-num tabular-nums">{step.card1Metric}</strong>
              </div>

              {/* STEP 01: Bar Chart + Donut Ring */}
              {stepIndex === 0 && (
                <div className="flag-charts-row">
                  <div className="flag-mini-panel">
                    <div className="flag-bars">
                      {step.bars.map((h, i) => (
                        <span
                          key={i}
                          className="flag-bar"
                          style={{ height: `${h}%`, opacity: 0.45 + i * 0.13 }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flag-mini-panel flag-donut-wrap">
                    <div className="flag-donut-ring">
                      <span className="font-mono">{step.stepNum}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 02: Atomic Lock Race Flexbox */}
              {stepIndex === 1 && (
                <div className="lock-race-stack">
                  <div className="lock-race-item">
                    <span>req_1 (sha256:9f2a)</span>
                    <span className="race-tag-ok">CAS LOCKED</span>
                  </div>
                  <div className="lock-race-item">
                    <span>req_2 (duplicate)</span>
                    <span className="race-tag-block">409 BLOCKED</span>
                  </div>
                </div>
              )}

              {/* STEP 03: Multi-Turn Live Chat Thread Flexbox */}
              {stepIndex === 2 && (
                <div className="chat-thread-stack">
                  <div className="chat-msg-bubble">
                    <strong>@ClaudeAI · Architect</strong>
                    Verified edge-case guard &amp; strict TypeScript AST diff.
                  </div>
                  <div className="chat-msg-bubble is-reply">
                    <strong>@Subhash · Founding Member</strong>
                    Approved. Ship to production.
                  </div>
                </div>
              )}

              {/* STEP 04: CI/CD Deployment Matrix Flexbox */}
              {stepIndex === 3 && (
                <div className="cicd-matrix-grid">
                  <div className="cicd-cell">
                    <span>BUILD</span>
                    <strong>Docker OK ✓</strong>
                  </div>
                  <div className="cicd-cell">
                    <span>TESTS</span>
                    <strong>48/48 Pass</strong>
                  </div>
                  <div className="cicd-cell">
                    <span>REGION</span>
                    <strong>ap-south-1</strong>
                  </div>
                  <div className="cicd-cell">
                    <span>STATUS</span>
                    <strong>200 Healthy</strong>
                  </div>
                </div>
              )}

              {/* STEP 05: Founder's Office & HR Ops Scorecard Flexbox */}
              {stepIndex === 4 && (
                <div className="fo-scorecard-grid">
                  <div className="fo-row">
                    <span>Engineering Team Led</span>
                    <strong>3 Devs</strong>
                  </div>
                  <div className="fo-row">
                    <span>HR Screening Speed</span>
                    <strong>100x AI</strong>
                  </div>
                  <div className="fo-row">
                    <span>0-to-1 Shipped</span>
                    <strong>24+ Apps</strong>
                  </div>
                </div>
              )}

              <div className="flag-skeleton-lines">
                <span className="skel-line long" />
                <span className="skel-line med" />
              </div>

              {/* Overlapping #2A2551 Badge Card */}
              <div className="flag-floating-badge">
                <div className="badge-avatar">SM</div>
                <div className="badge-text">
                  <span className="badge-role">{step.advisorRole}</span>
                  <strong className="badge-name">{step.advisorName}</strong>
                </div>
              </div>
            </div>

            {/* Flag Card 2: Bottom-Right Step / Chat Card */}
            <div className="acquire-flag-card flag-card-secondary">
              <div className="flag2-profile-row">
                <div className="flag2-avatar-circle">
                  {stepIndex === 2 ? <MessageSquare size={15} /> : stepIndex === 3 ? <Cloud size={15} /> : <Cpu size={15} />}
                </div>
                <div>
                  <span className="flag2-kicker font-mono">{step.card2Kicker}</span>
                  <h4 className="flag2-title">{step.card2Title}</h4>
                  <span className="flag2-verified">
                    <ShieldCheck size={12} /> {step.card2Badge}
                  </span>
                </div>
              </div>

              <div className="flag2-metrics-grid">
                <div>
                  <span>{step.col1Label}</span>
                  <strong>{step.col1Val}</strong>
                </div>
                <div>
                  <span>{step.col2Label}</span>
                  <strong>{step.col2Val}</strong>
                </div>
                <div>
                  <span>{step.col3Label}</span>
                  <strong>{step.col3Val}</strong>
                </div>
              </div>

              <div className="flag2-chat-bubble">
                {step.chatLine}
              </div>

              <div className="flag2-actions">
                <span className="flag2-btn-sec">{step.btnSecondary}</span>
                <span className="flag2-btn-pri">{step.btnPrimary}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Extra Animated Mini-Flexboxes */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`mini-${step.stepNum}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="hero-extra-flexboxes"
        >
          <div className="mini-flex-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Layers size={13} style={{ color: 'var(--indigo-tint)' }} />
              <span>{step.miniFlex1Label}</span>
            </div>
            <strong>{step.miniFlex1Val}</strong>
          </div>
          <div className="mini-flex-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Activity size={13} style={{ color: '#4d9e7a' }} />
              <span>{step.miniFlex2Label}</span>
            </div>
            <strong className="tabular-nums">{step.miniFlex2Val}</strong>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
