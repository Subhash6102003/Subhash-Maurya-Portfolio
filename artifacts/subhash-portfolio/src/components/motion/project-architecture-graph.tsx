import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ArrowDown, GitBranch } from 'lucide-react';
import { ProjectInstanceData } from './project-instance-modal';

interface FlowchartStep {
  nodeId: string;
  nodeLabel: string;
  edgeLabel: string;
  detail: string;
  command: string;
  branch?: 'main' | 'retry' | 'error';
}

interface ProjectFlowchartSpec {
  subtitle: string;
  steps: FlowchartStep[];
  leftBranchTitle: string;
  leftBranchEdge: string;
  leftBranchResult: string;
  rightBranchEdge: string;
  rightBranchResult: string;
  retryLabel: string;
}

const SPECIFIC_FLOWCHARTS: Record<string, ProjectFlowchartSpec> = {
  postal_nexus: {
    subtitle: 'Postal Nexus strictly differentiates between acceptance, queueing, processing, transmission, and downstream delivery verification:',
    steps: [
      { nodeId: 'ACCEPTED', nodeLabel: 'ACCEPTED', edgeLabel: 'API Gateway Validates & Authenticates', detail: 'Ingress validates JWT, sliding-window Redis rate limit, and payload schema.', command: 'POST /v1/mail/send → 202 ACCEPTED { id: "msg_901" }', branch: 'main' },
      { nodeId: 'QUEUED', nodeLabel: 'QUEUED', edgeLabel: 'Pushed to Redis Stream', detail: 'Message appended to partitioned Redis Stream with backpressure control.', command: 'XADD mail:stream * id msg_901 priority high → "173248-0"', branch: 'main' },
      { nodeId: 'PROCESSING', nodeLabel: 'PROCESSING', edgeLabel: 'Worker Picks Up Job (XREADGROUP)', detail: 'Consumer group worker claims message; transient errors trigger exponential backoff + jitter.', command: 'XREADGROUP GROUP mailers w1 COUNT 10 STREAMS mail:stream >', branch: 'main' },
      { nodeId: 'SENT', nodeLabel: 'SENT', edgeLabel: 'SMTP MTA Accepts (250 OK)', detail: 'Downstream SMTP MTA accepts payload; awaiting provider delivery webhook.', command: 'SMTP 250 2.0.0 OK queued as 8F4A21C → state=SENT', branch: 'main' },
      { nodeId: 'DELIVERED', nodeLabel: 'DELIVERED', edgeLabel: 'Downstream Provider Webhook Confirmed', detail: 'Provider webhook confirms recipient inbox delivery and closes telemetry trace.', command: 'WEBHOOK /ses/delivered → XACK mail:stream 173248-0', branch: 'main' },
    ],
    leftBranchTitle: 'SENT',
    leftBranchEdge: 'Downstream Provider Webhook Confirmed',
    leftBranchResult: 'DELIVERED',
    rightBranchEdge: 'Retries Exhausted or Fatal 5xx Error -> DLQ',
    rightBranchResult: 'FAILED',
    retryLabel: 'Transient Error (Exponential Backoff + Jitter)',
  },
  upi_double_spend: {
    subtitle: 'Idempotent UPI debit pipeline enforcing CAS optimistic balance locking, duplicate gating, and compensating saga rollback:',
    steps: [
      { nodeId: 'ACCEPTED', nodeLabel: 'INGRESS', edgeLabel: 'Client Sends Payment + Idempotency Key', detail: 'Concurrent retry requests hit API gateway with identical SHA-256 idempotency key.', command: 'POST /upi/debit { idempotencyKey: "sha256:9f2a", amt: 450 }', branch: 'main' },
      { nodeId: 'QUEUED', nodeLabel: 'KEY GATED', edgeLabel: 'Redis SETNX Checks Duplicate Key', detail: 'First request acquires key; duplicate concurrent retry immediately receives 409 Conflict.', command: 'SETNX idem:9f2a "LOCKED" EX 30 → (1) | req_2 → 409', branch: 'main' },
      { nodeId: 'PROCESSING', nodeLabel: 'CAS RESERVED', edgeLabel: 'Optimistic Balance Lock (CAS)', detail: 'Atomic Compare-And-Swap reserves $450 without blocking other accounts.', command: 'UPDATE accounts SET balance=balance-450 WHERE id=12 AND ver=7', branch: 'main' },
      { nodeId: 'SENT', nodeLabel: 'NPCI ACK', edgeLabel: 'Downstream Bank Gateway (200 OK)', detail: 'NPCI / Bank switch confirms settlement; saga moves to final commit.', command: 'NPCI.settle(tx_98421) → 200 OK [11ms]', branch: 'main' },
      { nodeId: 'DELIVERED', nodeLabel: 'COMMITTED', edgeLabel: 'Ledger Finalized & Lock Released', detail: 'Immutable ledger entry committed with 0.00% double-spend slippage.', command: 'saga.commit(tx_98421) → LEDGER_COMMITTED', branch: 'main' },
    ],
    leftBranchTitle: 'NPCI ACK',
    leftBranchEdge: 'Ledger Finalized & Lock Released',
    leftBranchResult: 'COMMITTED',
    rightBranchEdge: 'Bank Timeout / 5xx -> Compensating Saga',
    rightBranchResult: 'ROLLED BACK',
    retryLabel: 'Transient Network Timeout (Idempotent Retry)',
  },
  egovtalent: {
    subtitle: 'eGovTalent AI civic recruitment pipeline differentiating upload, async extraction, Claude AI scoring, and shortlisted dispatch:',
    steps: [
      { nodeId: 'ACCEPTED', nodeLabel: 'UPLOADED', edgeLabel: 'Candidate Submits PDF to S3', detail: 'React portal streams applicant resume to encrypted AWS S3 bucket.', command: 'PUT s3://egov-resumes/cand_2941.pdf → 200 OK', branch: 'main' },
      { nodeId: 'QUEUED', nodeLabel: 'QUEUED', edgeLabel: 'Dispatched to BullMQ Queue', detail: 'Node.js API enqueues non-blocking parsing job and returns instant receipt.', command: 'bullmq.add("parse_resume", { candId: 2941 })', branch: 'main' },
      { nodeId: 'PROCESSING', nodeLabel: 'CLAUDE EVAL', edgeLabel: 'Text Extracted & Claude AI Scored', detail: 'Claude AI evaluates skills, experience, and civic eligibility criteria.', command: 'claude.evaluate(rubric: "eGov-SDE") → score: 94/100', branch: 'main' },
      { nodeId: 'SENT', nodeLabel: 'SHORTLISTED', edgeLabel: 'Threshold >= 80 Passed', detail: 'Candidate persisted in PostgreSQL shortlist and queued for assessment.', command: 'INSERT INTO shortlists VALUES (2941, 94) → COMMIT', branch: 'main' },
      { nodeId: 'DELIVERED', nodeLabel: 'INVITED', edgeLabel: 'Assessment Link Dispatched', detail: 'Automated invitation and assessment token delivered to candidate.', command: 'ses.sendAssessmentInvite(2941) → DELIVERED', branch: 'main' },
    ],
    leftBranchTitle: 'SHORTLISTED',
    leftBranchEdge: 'Assessment Link Dispatched',
    leftBranchResult: 'INVITED',
    rightBranchEdge: 'Score < Threshold or Invalid Doc',
    rightBranchResult: 'ARCHIVED',
    retryLabel: 'LLM Rate Limit (Exponential Backoff + Jitter)',
  },
};

function getFlowchartSpec(project: ProjectInstanceData): ProjectFlowchartSpec {
  if (SPECIFIC_FLOWCHARTS[project.id]) {
    return SPECIFIC_FLOWCHARTS[project.id];
  }
  const s = project.stack;
  return {
    subtitle: `${project.title} execution lifecycle across ${s.slice(0, 4).join(', ')}:`,
    steps: [
      { nodeId: 'ACCEPTED', nodeLabel: 'INGRESS', edgeLabel: `${s[0] || 'Client'} Validates & Authenticates`, detail: `Request enters ${project.title} via ${s[0] || 'client'} layer.`, command: `ingress.validate("${project.id}") → 200 OK`, branch: 'main' },
      { nodeId: 'QUEUED', nodeLabel: 'GATED', edgeLabel: `${s[1] || 'Policy'} Checks Constraints`, detail: project.problem, command: `policy.check("${s[1] || 'guard'}") → PASSED`, branch: 'main' },
      { nodeId: 'PROCESSING', nodeLabel: 'PROCESSING', edgeLabel: `${s[2] || 'Engine'} Executes Core Logic`, detail: project.solution, command: `worker.run("${s[2] || 'core'}") → STATE_UPDATED`, branch: 'main' },
      { nodeId: 'SENT', nodeLabel: 'PERSISTED', edgeLabel: `${s[3] || 'Store'} Commits Transaction`, detail: 'State written atomically to persistence layer.', command: `db.commit("${s[3] || 'store'}") → ACK`, branch: 'main' },
      { nodeId: 'DELIVERED', nodeLabel: 'VERIFIED', edgeLabel: 'Downstream Confirmation Complete', detail: project.metrics?.[0] ? `${project.metrics[0].label}: ${project.metrics[0].value}` : 'Verified production execution.', command: `telemetry.verify() → ${project.metrics?.[0]?.value || 'OK'}`, branch: 'main' },
    ],
    leftBranchTitle: 'PERSISTED',
    leftBranchEdge: 'Downstream Confirmation Complete',
    leftBranchResult: 'VERIFIED',
    rightBranchEdge: 'Constraint Violation / Fatal Error',
    rightBranchResult: 'MITIGATED',
    retryLabel: 'Transient Error (Backoff + Retry)',
  };
}

export function ProjectArchitectureGraph({ project }: { project: ProjectInstanceData }) {
  const spec = getFlowchartSpec(project);
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

  const accent =
    project.category === 'company'
      ? '#6a8e6e'
      : project.category === 'pain_points'
      ? '#d97757'
      : project.category === 'freelance'
      ? '#d49b4b'
      : '#f4f2ed';

  const current = spec.steps[activeStep];

  return (
    <div className="mermaid-flow-card">
      {/* Header + Controls */}
      <div className="mermaid-flow-header">
        <div>
          <span className="arch-graph-kicker font-mono" style={{ color: accent }}>
            LIVE STATE MACHINE &amp; ARCHITECTURAL WORKFLOW
          </span>
          <p className="mermaid-flow-sub">{spec.subtitle}</p>
        </div>

        <div className="telemetry-controls">
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
            Retry / DLQ Branch
          </button>
          <button
            className={`ctrl-btn-pill font-mono ${isLooping ? 'is-on' : ''}`}
            onClick={() => setIsLooping((l) => !l)}
          >
            Loop: {isLooping ? 'ON' : 'OFF'}
          </button>
          <button
            className="ctrl-btn"
            onClick={() => setIsPlaying((p) => !p)}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button
            className="ctrl-btn"
            onClick={() => { setActiveStep(0); setMode('happy'); setIsPlaying(true); }}
            title="Replay"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Mermaid-Style Vertical & Branching State Flowchart */}
      <div className="mermaid-diagram-canvas">
        <div className="mermaid-entry-dot" style={{ borderColor: accent }} />

        {/* Steps 1 to 3 (Linear Vertical Spine with Edge Labels & Retry Side-Box) */}
        {[0, 1, 2].map((idx) => {
          const step = spec.steps[idx];
          const isActive = activeStep === idx;
          const isDone = activeStep > idx;

          return (
            <div key={step.nodeId} className="mermaid-spine-segment">
              {/* Animated Vertical Arrow + Edge Label */}
              <div className="mermaid-edge-vert">
                <span
                  className="vert-line"
                  style={{ background: isDone || isActive ? accent : 'rgba(244,242,237,0.16)' }}
                />
                {isActive && <span className="vert-packet" style={{ background: accent }} />}
                <span className="mermaid-edge-tag font-mono">{step.edgeLabel}</span>
                <ArrowDown size={13} style={{ color: isDone || isActive ? accent : 'rgba(244,242,237,0.35)' }} />
              </div>

              {/* Node + Optional Transient Retry Side Loop on Step 3 (PROCESSING) */}
              <div className={idx === 2 ? 'mermaid-processing-row' : 'mermaid-center-row'}>
                {idx === 2 && (
                  <div className={`mermaid-retry-box font-mono ${mode === 'failure' ? 'is-active-err' : ''}`}>
                    <span>{spec.retryLabel}</span>
                    <span className="retry-arrow">⇄</span>
                  </div>
                )}

                <button
                  type="button"
                  className={`mermaid-node-pill font-mono ${isActive ? 'is-active' : ''} ${isDone ? 'is-done' : ''}`}
                  style={isActive ? { borderColor: accent, boxShadow: `0 0 22px ${accent}33` } : undefined}
                  onClick={() => { setActiveStep(idx); setIsPlaying(false); }}
                >
                  {step.nodeLabel}
                </button>
              </div>
            </div>
          );
        })}

        {/* Branch Fork from Step 3 (PROCESSING) -> Left (SENT -> DELIVERED) & Right (FAILED / DLQ) */}
        <div className="mermaid-fork-connector" aria-hidden="true">
          <span className="fork-stem" style={{ background: activeStep >= 3 ? accent : 'rgba(244,242,237,0.18)' }} />
          <div className="fork-shoulders">
            <span className="fork-left" style={{ borderColor: mode === 'happy' && activeStep >= 3 ? accent : 'rgba(244,242,237,0.18)' }} />
            <span className="fork-right" style={{ borderColor: mode === 'failure' ? '#d97757' : 'rgba(244,242,237,0.18)' }} />
          </div>
        </div>

        <div className="mermaid-branches-grid">
          {/* Left Branch: Happy Path (SENT -> DELIVERED) */}
          <div className="mermaid-branch-col">
            <span className="mermaid-edge-tag font-mono">{spec.steps[3].edgeLabel}</span>
            <button
              type="button"
              className={`mermaid-node-pill font-mono ${mode === 'happy' && activeStep === 3 ? 'is-active' : ''} ${mode === 'happy' && activeStep > 3 ? 'is-done' : ''}`}
              style={mode === 'happy' && activeStep === 3 ? { borderColor: accent, boxShadow: `0 0 20px ${accent}33` } : undefined}
              onClick={() => { setMode('happy'); setActiveStep(3); setIsPlaying(false); }}
            >
              {spec.steps[3].nodeLabel}
            </button>

            <div className="mermaid-edge-vert short">
              <span className="vert-line" style={{ background: mode === 'happy' && activeStep >= 4 ? accent : 'rgba(244,242,237,0.16)' }} />
              <span className="mermaid-edge-tag font-mono">{spec.leftBranchEdge}</span>
              <ArrowDown size={13} style={{ color: mode === 'happy' && activeStep >= 4 ? accent : 'rgba(244,242,237,0.35)' }} />
            </div>

            <button
              type="button"
              className={`mermaid-node-pill font-mono ${mode === 'happy' && activeStep === 4 ? 'is-active' : ''}`}
              style={mode === 'happy' && activeStep === 4 ? { borderColor: '#6a8e6e', boxShadow: '0 0 20px rgba(106,142,110,0.35)' } : undefined}
              onClick={() => { setMode('happy'); setActiveStep(4); setIsPlaying(false); }}
            >
              {spec.leftBranchResult}
            </button>
          </div>

          {/* Right Branch: Failure / DLQ Path */}
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

      {/* Live Step Readout + Executed Command */}
      <div className="arch-step-readout-stack">
        <div className="arch-step-readout">
          <span className="arch-step-num font-mono" style={{ color: mode === 'failure' ? '#d97757' : accent }}>
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
