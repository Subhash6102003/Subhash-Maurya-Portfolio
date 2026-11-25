import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ArrowDown, ArrowRight, Cpu, Database, Server, ShieldCheck, Globe } from 'lucide-react';
import { ProjectInstanceData } from './project-instance-modal';

type DiagramPattern = 'state_machine' | 'pipeline_dag' | 'monorepo_topology' | 'agent_loop';

interface FlowchartStep {
  nodeId: string;
  nodeLabel: string;
  edgeLabel: string;
  detail: string;
  command: string;
}

interface ProjectDiagramSpec {
  pattern: DiagramPattern;
  subtitle: string;
  steps: FlowchartStep[];
  leftBranchEdge: string;
  leftBranchResult: string;
  rightBranchEdge: string;
  rightBranchResult: string;
  retryLabel: string;
}

function resolvePattern(project: ProjectInstanceData): DiagramPattern {
  if (['postal_nexus', 'upi_double_spend', 'flash_sale_oversell', 'emi_cascade_warning'].includes(project.id)) {
    return 'state_machine';
  }
  if (['fake_review_spam_dag', 'ats_resume_dedup', 'wardrobing_fraud', 'rideshare_ghosting', 'hospital_opd_queue'].includes(project.id)) {
    return 'pipeline_dag';
  }
  if (['forge', 'safety_vault', 'settle', 'kicking_ninja', 'systemflow', 'rkm_development', 'cs_system_design_vault'].includes(project.id)) {
    return 'agent_loop';
  }
  return 'monorepo_topology';
}

const SPECIFIC_SPECS: Record<string, Partial<ProjectDiagramSpec>> = {
  postal_nexus: {
    subtitle: 'Postal Nexus strictly differentiates between acceptance, queueing, processing, transmission, and downstream delivery verification:',
    steps: [
      { nodeId: 'ACCEPTED', nodeLabel: 'ACCEPTED', edgeLabel: 'API Gateway Validates & Authenticates', detail: 'Ingress validates JWT, sliding-window Redis rate limit, and payload schema.', command: 'POST /v1/mail/send → 202 ACCEPTED { id: "msg_901" }' },
      { nodeId: 'QUEUED', nodeLabel: 'QUEUED', edgeLabel: 'Pushed to Redis Stream', detail: 'Message appended to partitioned Redis Stream with backpressure control.', command: 'XADD mail:stream * id msg_901 priority high → "173248-0"' },
      { nodeId: 'PROCESSING', nodeLabel: 'PROCESSING', edgeLabel: 'Worker Picks Up Job (XREADGROUP)', detail: 'Consumer group worker claims message; transient errors trigger exponential backoff + jitter.', command: 'XREADGROUP GROUP mailers w1 COUNT 10 STREAMS mail:stream >' },
      { nodeId: 'SENT', nodeLabel: 'SENT', edgeLabel: 'SMTP MTA Accepts (250 OK)', detail: 'Downstream SMTP MTA accepts payload; awaiting provider delivery webhook.', command: 'SMTP 250 2.0.0 OK queued as 8F4A21C → state=SENT' },
      { nodeId: 'DELIVERED', nodeLabel: 'DELIVERED', edgeLabel: 'Downstream Provider Webhook Confirmed', detail: 'Provider webhook confirms recipient inbox delivery and closes telemetry trace.', command: 'WEBHOOK /ses/delivered → XACK mail:stream 173248-0' },
    ],
    leftBranchEdge: 'Downstream Provider Webhook Confirmed',
    leftBranchResult: 'DELIVERED',
    rightBranchEdge: 'Retries Exhausted or Fatal 5xx Error -> DLQ',
    rightBranchResult: 'FAILED',
    retryLabel: 'Transient Error (Exponential Backoff + Jitter)',
  },
  upi_double_spend: {
    subtitle: 'Idempotent UPI debit pipeline enforcing CAS optimistic balance locking, duplicate gating, and compensating saga rollback:',
    steps: [
      { nodeId: 'ACCEPTED', nodeLabel: 'INGRESS', edgeLabel: 'Client Sends Payment + Idempotency Key', detail: 'Concurrent retry requests hit API gateway with identical SHA-256 idempotency key.', command: 'POST /upi/debit { idempotencyKey: "sha256:9f2a", amt: 450 }' },
      { nodeId: 'QUEUED', nodeLabel: 'KEY GATED', edgeLabel: 'Redis SETNX Checks Duplicate Key', detail: 'First request acquires key; duplicate concurrent retry immediately receives 409 Conflict.', command: 'SETNX idem:9f2a "LOCKED" EX 30 → (1) | req_2 → 409' },
      { nodeId: 'PROCESSING', nodeLabel: 'CAS RESERVED', edgeLabel: 'Optimistic Balance Lock (CAS)', detail: 'Atomic Compare-And-Swap reserves $450 without blocking other accounts.', command: 'UPDATE accounts SET balance=balance-450 WHERE id=12 AND ver=7' },
      { nodeId: 'SENT', nodeLabel: 'NPCI ACK', edgeLabel: 'Downstream Bank Gateway (200 OK)', detail: 'NPCI / Bank switch confirms settlement; saga moves to final commit.', command: 'NPCI.settle(tx_98421) → 200 OK [11ms]' },
      { nodeId: 'DELIVERED', nodeLabel: 'COMMITTED', edgeLabel: 'Ledger Finalized & Lock Released', detail: 'Immutable ledger entry committed with 0.00% double-spend slippage.', command: 'saga.commit(tx_98421) → LEDGER_COMMITTED' },
    ],
    leftBranchEdge: 'Ledger Finalized & Lock Released',
    leftBranchResult: 'COMMITTED',
    rightBranchEdge: 'Bank Timeout / 5xx -> Compensating Saga',
    rightBranchResult: 'ROLLED BACK',
    retryLabel: 'Transient Network Timeout (Idempotent Retry)',
  },
  egovtalent: {
    subtitle: 'Multi-tier recruitment architecture connecting React portal, Node.js API Gateway, BullMQ workers, and Claude AI scoring:',
    steps: [
      { nodeId: '1', nodeLabel: 'React + S3 Portal', edgeLabel: 'Candidate Uploads Resume PDF', detail: 'React frontend uploads candidate document directly via pre-signed S3 URL.', command: 'PUT s3://egov-resumes/cand_2941.pdf → 200 OK' },
      { nodeId: '2', nodeLabel: 'Node API Gateway', edgeLabel: 'Validates & Enqueues Job', detail: 'Express API validates token and dispatches asynchronous screening job.', command: 'bullmq.add("parse_resume", { candId: 2941 })' },
      { nodeId: '3', nodeLabel: 'Claude AI Engine', edgeLabel: 'Competency & Rubric Scoring', detail: 'Claude AI evaluates skills, experience, and civic hiring criteria.', command: 'claude.evaluate(rubric: "eGov-SDE") → score: 94/100' },
      { nodeId: '4', nodeLabel: 'PostgreSQL + SES', edgeLabel: 'Shortlist & Invite Dispatch', detail: 'Persists verified ranking and dispatches automated assessment link.', command: 'INSERT INTO shortlists VALUES (2941, 94) → INVITED' },
    ],
  },
  pdf_suite_monorepo: {
    subtitle: 'Turborepo monorepo routing small tasks to Client WASM and heavy jobs through Fastify + BullMQ + Python QPDF/Sharp:',
    steps: [
      { nodeId: '1', nodeLabel: 'Next.js 15 / Flutter', edgeLabel: 'Hybrid Size Routing (<5MB WASM)', detail: 'Small PDFs process in-browser via WebAssembly with 0ms server latency.', command: 'wasm.compress(file) → 0ms server cost [client-side]' },
      { nodeId: '2', nodeLabel: 'Fastify 5.x Gateway', edgeLabel: 'Dispatches Heavy Job to Redis', detail: 'Multi-document batches enqueue cleanly into BullMQ with Dead-Letter fallback.', command: 'fastify → 202 Accepted { jobId: "job_772" }' },
      { nodeId: '3', nodeLabel: 'QPDF / Sharp / Python', edgeLabel: 'Polyglot Worker Execution', detail: 'Isolated Docker workers run lossless QPDF, Sharp, or LibreOffice bindings.', command: 'qpdf --linearize --object-streams=generate → 6.4 MB' },
      { nodeId: '4', nodeLabel: 'Prisma + 24h Purge', edgeLabel: 'Signed URL & TTL Cleanup', detail: 'Result stored in S3/MinIO with automated 24-hour cron purge.', command: 'prisma.document.update(DONE) → signed_url_ready' },
    ],
  },
  forge: {
    subtitle: 'Local-first AI IDE orchestrating Monaco Editor AST, Studio Brain task briefs, and adversarial Multi-Brain debate:',
    steps: [
      { nodeId: '1', nodeLabel: 'Monaco AST', edgeLabel: 'Step 1: Intake & Scope', detail: 'PM agent clarifies scope, latency targets, and workspace AST context.', command: 'monaco.editor.onDidChangeModelContent(ast_hash)' },
      { nodeId: '2', nodeLabel: 'Studio Brain', edgeLabel: 'Step 2: Adversarial Debate', detail: 'Architect and Security sub-brains challenge bottlenecks before touching code.', command: 'debate.round(2) → edge_case_guard_approved=true' },
      { nodeId: '3', nodeLabel: 'Surgical Diff', edgeLabel: 'Step 3: Minimal Code Execution', detail: 'Applies clean TypeScript diff enforcing zero bloat and strict typing.', command: 'patch.apply(ast_diff) → +24/-8 lines' },
      { nodeId: '4', nodeLabel: 'Verification Gates', edgeLabel: 'Step 4: Secret Scan & Unit Tests', detail: 'Automated secret scan, tsc --noEmit, and latency checks pass.', command: 'tsc --noEmit → 0 errors · diff verified [142ms]' },
    ],
  },
  safety_vault: {
    subtitle: 'Kernel-level Android app concealment gated by hardware volume-key gestures and Android Keystore BiometricPrompt:',
    steps: [
      { nodeId: '1', nodeLabel: 'App Concealment', edgeLabel: 'PackageManager Stealth', detail: 'Target enterprise apps hidden from launcher and recent-tasks tray.', command: 'PackageManager.setComponentEnabledSetting(DISABLED)' },
      { nodeId: '2', nodeLabel: 'Gesture Intercept', edgeLabel: 'Hardware Key Sequence', detail: 'Secret volume-key pattern arms the encrypted unlock gate.', command: 'onKeyDown(KEYCODE_VOLUME_UP x3) → gate_armed=true' },
      { nodeId: '3', nodeLabel: 'BiometricPrompt', edgeLabel: 'Hardware Keystore Auth', detail: 'Verifies fingerprint/face bound to AES/GCM CryptoObject.', command: 'BiometricPrompt.authenticate(cipher: AES/GCM/NoPadding)' },
      { nodeId: '4', nodeLabel: 'Encrypted Enclave', edgeLabel: 'In-Memory Unlock', detail: 'SQLCipher container and protected apps unlock strictly in memory.', command: 'SQLCipher.openDatabase(key_enclave) → UNLOCKED [11ms]' },
    ],
  },
};

function buildDiagramSpec(project: ProjectInstanceData): ProjectDiagramSpec {
  const pattern = resolvePattern(project);
  const override = SPECIFIC_SPECS[project.id] || {};
  const s = project.stack;

  const defaultSteps: FlowchartStep[] = [
    { nodeId: '1', nodeLabel: s[0] || 'INGRESS', edgeLabel: `${s[0] || 'Client'} Validates Input`, detail: `Request enters ${project.title} via ${s[0] || 'client'} layer.`, command: `ingress.validate("${project.id}") → 200 OK` },
    { nodeId: '2', nodeLabel: s[1] || 'GATED', edgeLabel: `${s[1] || 'Policy'} Checks Constraints`, detail: project.problem, command: `policy.check("${s[1] || 'guard'}") → PASSED` },
    { nodeId: '3', nodeLabel: s[2] || 'PROCESSING', edgeLabel: `${s[2] || 'Engine'} Executes Logic`, detail: project.solution, command: `worker.run("${s[2] || 'core'}") → STATE_UPDATED` },
    { nodeId: '4', nodeLabel: s[3] || 'COMMITTED', edgeLabel: `${s[3] || 'Store'} Commits State`, detail: project.metrics?.[0] ? `${project.metrics[0].label}: ${project.metrics[0].value}` : 'Verified production execution.', command: `db.commit("${s[3] || 'store'}") → ACK` },
    { nodeId: '5', nodeLabel: 'VERIFIED', edgeLabel: 'Downstream Ack Complete', detail: 'Final state verified and telemetry closed.', command: `telemetry.verify() → ${project.metrics?.[0]?.value || 'OK'}` },
  ];

  return {
    pattern,
    subtitle: override.subtitle || `${project.title} architecture across ${s.slice(0, 4).join(' · ')}:`,
    steps: override.steps || defaultSteps,
    leftBranchEdge: override.leftBranchEdge || 'Downstream Ack Complete',
    leftBranchResult: override.leftBranchResult || 'VERIFIED',
    rightBranchEdge: override.rightBranchEdge || 'Constraint Violation / Fatal Error',
    rightBranchResult: override.rightBranchResult || 'MITIGATED',
    retryLabel: override.retryLabel || 'Transient Error (Backoff + Retry)',
  };
}

export function ProjectArchitectureGraph({ project }: { project: ProjectInstanceData }) {
  const spec = buildDiagramSpec(project);
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLooping, setIsLooping] = useState(true);
  const [mode, setMode] = useState<'happy' | 'failure'>('happy');

  useEffect(() => {
    setActiveStep(0);
    setIsPlaying(true);
    setMode('happy');
  }, [project.id]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= spec.steps.length - 1) {
          if (!isLooping) {
            setIsPlaying(false);
            return prev;
          }
          return 0;
        }
        return prev + 1;
      });
    }, 2200);
    return () => clearInterval(timer);
  }, [isPlaying, isLooping, spec.steps.length]);

  const accent = 'var(--indigo-tint, #8f88d6)';
  const current = spec.steps[Math.min(activeStep, spec.steps.length - 1)];

  return (
    <div className="mermaid-flow-card">
      {/* Header + Controls */}
      <div className="mermaid-flow-header">
        <div>
          <span className="arch-graph-kicker font-mono" style={{ color: accent }}>
            {spec.pattern === 'state_machine'
              ? 'STATE MACHINE & DLQ FLOWCHART'
              : spec.pattern === 'pipeline_dag'
              ? 'MULTI-STAGE DAG & POLICY GATE'
              : spec.pattern === 'monorepo_topology'
              ? 'MULTI-CLIENT & WORKER TOPOLOGY'
              : 'AUTONOMOUS ORCHESTRATION LOOP'}
          </span>
          <p className="mermaid-flow-sub">{spec.subtitle}</p>
        </div>

        <div className="telemetry-controls">
          {spec.pattern === 'state_machine' && (
            <>
              <button
                className={`ctrl-btn-pill font-mono ${mode === 'happy' ? 'is-on' : ''}`}
                onClick={() => { setMode('happy'); setActiveStep(0); setIsPlaying(true); }}
              >
                Success Path
              </button>
              <button
                className={`ctrl-btn-pill font-mono ${mode === 'failure' ? 'is-on' : ''}`}
                onClick={() => { setMode('failure'); setActiveStep(2); setIsPlaying(false); }}
              >
                Retry / DLQ
              </button>
            </>
          )}
          <button
            className={`ctrl-btn-pill font-mono ${isLooping ? 'is-on' : ''}`}
            onClick={() => setIsLooping((l) => !l)}
          >
            Loop: {isLooping ? 'ON' : 'OFF'}
          </button>
          <button className="ctrl-btn" onClick={() => setIsPlaying((p) => !p)} title={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button className="ctrl-btn" onClick={() => { setActiveStep(0); setMode('happy'); setIsPlaying(true); }} title="Replay">
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* PATTERN 1: Branched State Machine (postal_nexus, upi, flash_sale, emi) */}
      {spec.pattern === 'state_machine' && (
        <div className="mermaid-diagram-canvas">
          <div className="mermaid-entry-dot" style={{ borderColor: accent }} />
          {[0, 1, 2].map((idx) => {
            const step = spec.steps[idx];
            const isActive = activeStep === idx;
            const isDone = activeStep > idx;
            return (
              <div key={step.nodeId} className="mermaid-spine-segment">
                <div className="mermaid-edge-vert">
                  <span className="vert-line" style={{ background: isDone || isActive ? accent : 'var(--line)' }} />
                  {isActive && <span className="vert-packet" style={{ background: accent }} />}
                  <span className="mermaid-edge-tag font-mono">{step.edgeLabel}</span>
                  <ArrowDown size={13} style={{ color: isDone || isActive ? accent : 'var(--muted-foreground)' }} />
                </div>
                <div className={idx === 2 ? 'mermaid-processing-row' : 'mermaid-center-row'}>
                  {idx === 2 && (
                    <div className={`mermaid-retry-box font-mono ${mode === 'failure' ? 'is-active-err' : ''}`}>
                      <span>{spec.retryLabel}</span>
                      <span>⇄</span>
                    </div>
                  )}
                  <button
                    type="button"
                    className={`mermaid-node-pill font-mono ${isActive ? 'is-active' : ''} ${isDone ? 'is-done' : ''}`}
                    style={isActive ? { borderColor: accent } : undefined}
                    onClick={() => { setActiveStep(idx); setIsPlaying(false); }}
                  >
                    {step.nodeLabel}
                  </button>
                </div>
              </div>
            );
          })}

          <div className="mermaid-fork-connector" aria-hidden="true">
            <span className="fork-stem" style={{ background: activeStep >= 3 ? accent : 'var(--line)' }} />
            <div className="fork-shoulders">
              <span className="fork-left" style={{ borderColor: mode === 'happy' && activeStep >= 3 ? accent : 'var(--line)' }} />
              <span className="fork-right" style={{ borderColor: mode === 'failure' ? '#d49b4b' : 'var(--line)' }} />
            </div>
          </div>

          <div className="mermaid-branches-grid">
            <div className="mermaid-branch-col">
              <span className="mermaid-edge-tag font-mono">{spec.steps[3].edgeLabel}</span>
              <button
                type="button"
                className={`mermaid-node-pill font-mono ${mode === 'happy' && activeStep === 3 ? 'is-active' : ''} ${mode === 'happy' && activeStep > 3 ? 'is-done' : ''}`}
                style={mode === 'happy' && activeStep === 3 ? { borderColor: accent } : undefined}
                onClick={() => { setMode('happy'); setActiveStep(3); setIsPlaying(false); }}
              >
                {spec.steps[3].nodeLabel}
              </button>
              <div className="mermaid-edge-vert short">
                <span className="vert-line" style={{ background: mode === 'happy' && activeStep >= 4 ? accent : 'var(--line)' }} />
                <span className="mermaid-edge-tag font-mono">{spec.leftBranchEdge}</span>
                <ArrowDown size={13} style={{ color: mode === 'happy' && activeStep >= 4 ? accent : 'var(--muted-foreground)' }} />
              </div>
              <button
                type="button"
                className={`mermaid-node-pill font-mono ${mode === 'happy' && activeStep === 4 ? 'is-active' : ''}`}
                style={mode === 'happy' && activeStep === 4 ? { borderColor: accent } : undefined}
                onClick={() => { setMode('happy'); setActiveStep(4); setIsPlaying(false); }}
              >
                {spec.leftBranchResult}
              </button>
            </div>
            <div className="mermaid-branch-col">
              <span className="mermaid-edge-tag font-mono">{spec.rightBranchEdge}</span>
              <button
                type="button"
                className={`mermaid-node-pill font-mono ${mode === 'failure' ? 'is-active-err' : ''}`}
                onClick={() => { setMode('failure'); setActiveStep(2); setIsPlaying(false); }}
              >
                {spec.rightBranchResult}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PATTERN 2: Multi-Stage Horizontal DAG (Spam DAG, ATS Dedup, Wardrobing, OPD, Rideshare) */}
      {spec.pattern === 'pipeline_dag' && (
        <div className="mermaid-diagram-canvas">
          <div className="dag-horizontal-grid">
            {spec.steps.slice(0, 4).map((step, idx) => {
              const isActive = activeStep === idx;
              const isDone = activeStep > idx;
              const Icon = [Globe, Cpu, Server, ShieldCheck][idx % 4];
              return (
                <div key={step.nodeId} className="dag-col-item">
                  <button
                    type="button"
                    className={`dag-node-card ${isActive ? 'is-active' : ''} ${isDone ? 'is-done' : ''}`}
                    onClick={() => { setActiveStep(idx); setIsPlaying(false); }}
                  >
                    <div className="dag-node-head">
                      <Icon size={14} style={{ color: accent }} />
                      <span className="font-mono">STAGE 0{idx + 1}</span>
                    </div>
                    <strong>{step.nodeLabel}</strong>
                    <small>{step.edgeLabel}</small>
                  </button>
                  {idx < 3 && <ArrowRight size={14} className="dag-arrow" style={{ color: isDone || isActive ? accent : 'var(--muted-foreground)' }} />}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PATTERN 3: Multi-Client -> API Gateway -> Polyglot Workers (PDF Suite, eGovTalent, NexLogic, Eternity, MGB) */}
      {spec.pattern === 'monorepo_topology' && (
        <div className="mermaid-diagram-canvas">
          <div className="topo-stack">
            <button
              type="button"
              className={`topo-tier-box ${activeStep === 0 ? 'is-active' : ''}`}
              onClick={() => { setActiveStep(0); setIsPlaying(false); }}
            >
              <Globe size={15} style={{ color: accent }} />
              <div>
                <span className="font-mono">01 · CLIENT LAYER</span>
                <strong>{spec.steps[0].nodeLabel}</strong>
              </div>
              <small className="font-mono">{spec.steps[0].edgeLabel}</small>
            </button>

            <div className="topo-connector-down">
              <ArrowDown size={14} style={{ color: accent }} />
            </div>

            <div className="topo-workers-row">
              {spec.steps.slice(1, 4).map((step, i) => {
                const idx = i + 1;
                const Icon = [Server, Cpu, Database][i % 3];
                return (
                  <button
                    key={step.nodeId}
                    type="button"
                    className={`topo-worker-box ${activeStep === idx ? 'is-active' : ''}`}
                    onClick={() => { setActiveStep(idx); setIsPlaying(false); }}
                  >
                    <Icon size={14} style={{ color: accent }} />
                    <span className="font-mono">0{idx + 1} · {step.nodeLabel}</span>
                    <small>{step.edgeLabel}</small>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* PATTERN 4: Autonomous Orchestration / Enclave Loop (Forge, Safety Vault, Settle, Kicking Ninja, SystemFlow) */}
      {spec.pattern === 'agent_loop' && (
        <div className="mermaid-diagram-canvas">
          <div className="loop-2x2-grid">
            {spec.steps.slice(0, 4).map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.nodeId}
                  type="button"
                  className={`loop-quad-card ${isActive ? 'is-active' : ''}`}
                  onClick={() => { setActiveStep(idx); setIsPlaying(false); }}
                >
                  <div className="loop-quad-top font-mono">
                    <span style={{ color: accent }}>PHASE 0{idx + 1}</span>
                    <span>{isActive ? 'ACTIVE' : 'READY'}</span>
                  </div>
                  <strong>{step.nodeLabel}</strong>
                  <small>{step.edgeLabel}</small>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Live Step Readout + Executed Command */}
      <div className="arch-step-readout-stack">
        <div className="arch-step-readout">
          <span className="arch-step-num font-mono" style={{ color: accent }}>
            {mode === 'failure' ? 'RETRY / DLQ:' : `STATE [${current.nodeLabel}]:`}
          </span>
          <span className="arch-step-detail">
            {mode === 'failure'
              ? `${spec.retryLabel} — if retries exhaust, routed safely to ${spec.rightBranchResult} without data loss.`
              : current.detail}
          </span>
        </div>
        <div className="arch-step-cmd font-mono">
          <span style={{ color: accent }}>$</span>
          <span>{current.command}</span>
        </div>
      </div>
    </div>
  );
}
