import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, ArrowRight, Cpu, Database, Server, ShieldCheck, Globe, Bot, Layers } from 'lucide-react';
import { ProjectInstanceData } from './project-instance-modal';

interface GraphNode {
  id: string;
  label: string;
  sublabel: string;
  detail: string;
  command: string;
  badge: string;
}

const PROJECT_SPECIFIC_GRAPHS: Record<string, GraphNode[]> = {
  egovtalent: [
    { id: '1', label: 'Resume PDF', sublabel: 'React + S3', detail: 'Applicant uploads resume via React portal to encrypted S3 bucket.', command: 'POST /v1/candidates/upload → s3://egov-resumes/2941.pdf', badge: 'INGRESS' },
    { id: '2', label: 'BullMQ Worker', sublabel: 'Node.js Async', detail: 'Background worker extracts text and normalizes candidate credentials.', command: 'bullmq:parse_pdf → extracted 14 skills, 2.1yr exp', badge: 'PARSE' },
    { id: '3', label: 'Claude AI Eval', sublabel: 'LLM Scoring', detail: 'Claude AI benchmarks domain competency against e-governance rubrics.', command: 'claude-3-5: score=94/100 [rubric: civic-tech-v2]', badge: 'AI EVAL' },
    { id: '4', label: 'Civic Shortlist', sublabel: 'PostgreSQL', detail: 'Verified score persisted; automated assessment invitation dispatched.', command: 'INSERT INTO shortlists VALUES (2941, 94) → 200 OK', badge: '94% MATCH' },
  ],
  safety_vault: [
    { id: '1', label: 'App Intent', sublabel: 'Android OS', detail: 'Target enterprise app hidden from launcher and recent-tasks tray.', command: 'PackageManager.setComponentEnabledSetting(DISABLED)', badge: 'STEALTH' },
    { id: '2', label: 'Gesture Gate', sublabel: 'Hardware Key', detail: 'Intercepts secret volume-key sequence before exposing unlock prompt.', command: 'onKeyDown(KEYCODE_VOLUME_UP x3) → gate_armed=true', badge: 'GATED' },
    { id: '3', label: 'BiometricPrompt', sublabel: 'CryptoObject', detail: 'Hardware-backed fingerprint/face verification via Android Keystore.', command: 'BiometricPrompt.authenticate(cipher: AES/GCM/NoPadding)', badge: 'AES-256' },
    { id: '4', label: 'Secure Enclave', sublabel: 'Encrypted DB', detail: 'Encrypted SQLite & app container unlocked strictly in memory.', command: 'SQLCipher.openDatabase(key_enclave) → UNLOCKED [11ms]', badge: 'ISOLATED' },
  ],
  upi_double_spend: [
    { id: '1', label: 'Concurrent Req', sublabel: 'Retry Burst', detail: 'Two identical debit requests arrive simultaneously from flaky network.', command: 'POST /upi/debit x2 { tx: "tx_98421", amt: 450 }', badge: 'CONFLICT' },
    { id: '2', label: 'Idempotency Key', sublabel: 'SHA-256 Gate', detail: 'First request acquires SHA-256 key; duplicate request blocked (409).', command: 'GET idem:sha256(tx_98421) → req_2 BLOCKED [409]', badge: 'GATED' },
    { id: '3', label: 'Redis CAS Lock', sublabel: 'Atomic Reserve', detail: 'Compare-And-Swap balance reservation executed in 8ms P99.', command: 'redis-cli SETNX lock:upi:tx_98421 "HELD" EX 15 → (1)', badge: 'LOCKED' },
    { id: '4', label: 'Saga Ledger', sublabel: 'Zero Slippage', detail: 'Bank ack commits debit or runs compensating rollback on failure.', command: 'saga.commit(tx_98421) → balance_verified [0% loss]', badge: '0% LOSS' },
  ],
  flash_sale_oversell: [
    { id: '1', label: '25K Burst', sublabel: 'Flash Traffic', detail: 'High-concurrency checkout surge hits inventory gateway.', command: 'ws://flash-ingress → 25,000 req/s spike detected', badge: 'SURGE' },
    { id: '2', label: 'Redis SETNX', sublabel: 'TTL Lease', detail: 'Atomic in-memory token lease prevents negative inventory oversell.', command: 'DECRBY stock:sku_88 1 → remaining=412 [atomic]', badge: 'ATOMIC' },
    { id: '3', label: 'BullMQ Persist', sublabel: 'Deferred DB', detail: 'Confirmed leases batch-written safely to PostgreSQL.', command: 'bullmq:flush_orders batch=250 → pg_commit OK', badge: 'SYNCED' },
    { id: '4', label: 'WS Broadcast', sublabel: 'Live Stock', detail: 'WebSocket pushes exact remaining stock to all connected clients.', command: 'io.emit("stock:update", { sku: 88, left: 412 })', badge: '0 OVERSELL' },
  ],
  forge: [
    { id: '1', label: 'Monaco Core', sublabel: 'Desktop IDE', detail: 'Developer edits TypeScript/React AST inside native Monaco workspace.', command: 'monaco.editor.onDidChangeModelContent(ast_hash)', badge: 'EDITOR' },
    { id: '2', label: 'Studio Brain', sublabel: 'Orchestrator', detail: 'Hierarchical router splits task across specialized local agents.', command: 'studioBrain.dispatch(["architect", "reviewer"])', badge: 'ROUTER' },
    { id: '3', label: 'Agent Debate', sublabel: 'Multi-Brain', detail: 'Architect & Reviewer agents critique edge cases before patching.', command: 'debate.round(2) → edge_case_guard_approved=true', badge: 'DEBATE' },
    { id: '4', label: 'Verified Diff', sublabel: '0 Errors', detail: 'Type-checked AST diff applied cleanly to workspace.', command: 'tsc --noEmit → 0 errors · diff applied [142ms]', badge: 'SHIPPED' },
  ],
  pdf_suite_monorepo: [
    { id: '1', label: 'Next.js / Flutter', sublabel: 'Multi-Client', detail: 'Client uploads multi-page PDF for compression and watermarking.', command: 'POST /api/pdf/compress (42.8 MB, 120 pages)', badge: 'UPLOAD' },
    { id: '2', label: 'Fastify API', sublabel: 'Job Enqueue', detail: 'API validates payload and dispatches async job ID immediately.', command: 'fastify → 202 Accepted { jobId: "job_772" }', badge: 'FASTIFY' },
    { id: '3', label: 'Python QPDF', sublabel: 'BullMQ Worker', detail: 'Isolated Docker worker slices, compresses, and stamps pages.', command: 'qpdf --linearize --object-streams=generate → 6.4 MB', badge: 'WORKER' },
    { id: '4', label: 'Prisma + S3', sublabel: 'Ready URL', detail: 'Optimized artifact stored and signed download link returned.', command: 'prisma.document.update(DONE) → signed_url_ready', badge: 'COMPLETE' },
  ],
};

function getGraphNodes(project: ProjectInstanceData): GraphNode[] {
  if (PROJECT_SPECIFIC_GRAPHS[project.id]) {
    return PROJECT_SPECIFIC_GRAPHS[project.id];
  }

  const s = project.stack;
  return [
    {
      id: '1',
      label: s[0] || 'Client Layer',
      sublabel: 'Ingress',
      detail: `User or event triggers ${project.title} via ${s[0] || 'frontend'} interface.`,
      command: `ingress.dispatch("${project.id}", { stack: "${s[0] || 'client'}" })`,
      badge: 'INGRESS',
    },
    {
      id: '2',
      label: s[1] || 'Core Logic',
      sublabel: 'Validation',
      detail: project.problem,
      command: `validator.verify("${project.id}") → constraints_passed=true`,
      badge: 'PROTECTED',
    },
    {
      id: '3',
      label: s[2] || 'Engine',
      sublabel: 'Execution',
      detail: project.solution,
      command: `engine.execute("${s[2] || 'worker'}") → state_transition_ok`,
      badge: 'COMPUTE',
    },
    {
      id: '4',
      label: s[3] || 'Persistence',
      sublabel: 'Verified State',
      detail: project.metrics?.[0] ? `${project.metrics[0].label}: ${project.metrics[0].value}` : 'Production state committed cleanly.',
      command: `commit.finalize() → 200 OK [${project.metrics?.[0]?.value || 'VERIFIED'}]`,
      badge: 'VERIFIED',
    },
  ];
}

export function ProjectArchitectureGraph({ project }: { project: ProjectInstanceData }) {
  const nodes = getGraphNodes(project);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLooping, setIsLooping] = useState(true);

  useEffect(() => {
    setActiveIdx(0);
    setIsPlaying(true);
  }, [project.id]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => {
        if (prev === nodes.length - 1) {
          if (!isLooping) {
            setIsPlaying(false);
            return prev;
          }
          return 0;
        }
        return prev + 1;
      });
    }, 2400);
    return () => clearInterval(timer);
  }, [isPlaying, isLooping, nodes.length]);

  const accentColor =
    project.category === 'company'
      ? '#5350f6'
      : project.category === 'pain_points'
      ? '#d96b43'
      : project.category === 'freelance'
      ? '#4d9e7a'
      : '#d6b88d';

  const icons = [Globe, Cpu, Server, Database];

  return (
    <div className="arch-graph-card glass-card">
      <div className="arch-graph-header">
        <div>
          <span className="arch-graph-kicker font-mono" style={{ color: accentColor }}>
            INTERACTIVE ARCHITECTURE WORKFLOW
          </span>
          <h4 className="arch-graph-title">{project.title} — Live System Topology</h4>
        </div>

        <div className="telemetry-controls">
          <button
            className={`ctrl-btn-pill font-mono ${isLooping ? 'is-on' : ''}`}
            onClick={() => setIsLooping((l) => !l)}
            title="Toggle Continuous Loop"
          >
            Loop: {isLooping ? 'ON' : 'OFF'}
          </button>
          <button
            className="ctrl-btn"
            onClick={() => setIsPlaying((p) => !p)}
            title={isPlaying ? 'Pause Workflow' : 'Play Workflow'}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button
            className="ctrl-btn"
            onClick={() => {
              setActiveIdx(0);
              setIsPlaying(true);
            }}
            title="Replay Workflow"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Connected Node Graph */}
      <div className="arch-nodes-row">
        {nodes.map((node, idx) => {
          const Icon = icons[idx % icons.length];
          const isActive = idx === activeIdx;
          const isDone = idx < activeIdx;

          return (
            <div key={node.id} className="arch-node-step">
              <button
                type="button"
                className={`arch-node-box ${isActive ? 'is-active' : ''} ${isDone ? 'is-done' : ''}`}
                style={isActive ? { borderColor: accentColor, boxShadow: `0 0 20px ${accentColor}26` } : undefined}
                onClick={() => {
                  setActiveIdx(idx);
                  setIsPlaying(false);
                }}
              >
                <div className="arch-node-top">
                  <Icon size={15} style={{ color: isDone ? '#4d9e7a' : accentColor }} />
                  <span className="arch-node-badge font-mono" style={{ color: accentColor }}>
                    {node.badge}
                  </span>
                </div>
                <strong className="arch-node-label">{node.label}</strong>
                <span className="arch-node-sub font-mono">{node.sublabel}</span>
              </button>

              {idx < nodes.length - 1 && (
                <div className="arch-edge-connector" aria-hidden="true">
                  <span
                    className="arch-edge-line"
                    style={{ background: isDone || isActive ? accentColor : 'var(--line)' }}
                  />
                  {isActive && (
                    <span className="arch-edge-packet" style={{ background: accentColor }} />
                  )}
                  <ArrowRight size={13} style={{ color: isDone || isActive ? accentColor : 'var(--muted-foreground)' }} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Step Readout + Real Command Execution */}
      <div className="arch-step-readout-stack">
        <div className="arch-step-readout">
          <span className="arch-step-num font-mono" style={{ color: accentColor }}>
            STEP 0{activeIdx + 1}:
          </span>
          <span className="arch-step-detail">{nodes[activeIdx].detail}</span>
        </div>
        <div className="arch-step-cmd font-mono">
          <span style={{ color: accentColor }}>$</span>
          <span>{nodes[activeIdx].command}</span>
        </div>
      </div>
    </div>
  );
}
