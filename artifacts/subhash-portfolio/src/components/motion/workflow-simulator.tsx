import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, GitCommit, Server, Database, Bot, ArrowRight, ShieldCheck, Globe } from 'lucide-react';

export type WorkflowType = 'cicd' | 'banking' | 'ai_screening';

interface Stage {
  id: string;
  name: string;
  icon: any;
  statusText: string;
  badge: string;
}

const WORKFLOW_CONFIGS: Record<WorkflowType, { title: string; subtitle: string; stages: Stage[] }> = {
  cicd: {
    title: 'Automated CI/CD & Zero-Downtime Deployment',
    subtitle: 'Simulating live commit pipeline pushing to AWS ECS via GitHub Actions',
    stages: [
      { id: 'commit', name: 'GitHub Push', icon: GitCommit, statusText: 'Commit hash 1387422 triggered on main', badge: 'v2.4.0' },
      { id: 'build', name: 'Docker Build', icon: Server, statusText: 'Multi-stage container compiled in 24.1s', badge: 'Layer Cache' },
      { id: 'test', name: 'Automated Tests', icon: ShieldCheck, statusText: '48 Unit + E2E regression suites passed', badge: '100% Pass' },
      { id: 'deploy', name: 'Live Edge Deploy', icon: Globe, statusText: 'Healthy canary shifted to 100% production', badge: 'Active' },
    ],
  },
  banking: {
    title: 'UPI Double-Spend Prevention & Saga Rollback',
    subtitle: 'Simulating atomic balance lease and idempotency reservation in high-traffic spikes',
    stages: [
      { id: 'ingress', name: 'Incoming Debit', icon: Globe, statusText: 'Concurrent payment request $450 received', badge: 'Idempotent' },
      { id: 'lock', name: 'CAS Atomic Lock', icon: Database, statusText: 'Redis SETNX acquired lease key (TTL 15s)', badge: 'P99 8ms' },
      { id: 'ledger', name: 'Ledger Commit', icon: ShieldCheck, statusText: 'Event-sourced ledger updated with CAS token', badge: 'Committed' },
      { id: 'ack', name: 'Bank Confirmation', icon: CheckCircle2, statusText: 'Zero slippage: Instant 200 OK returned to client', badge: 'Saga Closed' },
    ],
  },
  ai_screening: {
    title: 'eGovTalent Claude AI Screening Pipeline',
    subtitle: 'Simulating resume extraction, competency benchmarking, and automated assessment scoring',
    stages: [
      { id: 'extract', name: 'Resume Ingestion', icon: Server, statusText: 'PDF ingested via BullMQ background queue', badge: 'Extracted' },
      { id: 'tokenize', name: 'Multi-Anchor Hash', icon: Database, statusText: 'Parsed education, experience & tech nodes', badge: 'Normalized' },
      { id: 'claude', name: 'Claude AI Eval', icon: Bot, statusText: 'Competency scored against civic criteria', badge: 'Evaluated' },
      { id: 'verdict', name: 'Verified Match', icon: CheckCircle2, statusText: 'Candidate invitation & interview packet generated', badge: 'Matched 94%' },
    ],
  },
};

export function WorkflowSimulator({ initialWorkflow = 'cicd', className = '' }: { initialWorkflow?: WorkflowType; className?: string }) {
  const [activeWorkflow, setActiveWorkflow] = useState<WorkflowType>(initialWorkflow);
  const [currentStage, setCurrentStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const config = WORKFLOW_CONFIGS[activeWorkflow];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % config.stages.length);
    }, 2800);

    return () => clearInterval(interval);
  }, [isPlaying, config.stages.length]);

  const handleReset = () => {
    setCurrentStage(0);
    setIsPlaying(true);
  };

  return (
    <div className={`workflow-simulator-card glass-card ${className}`}>
      {/* Workflow Header & Mode Switcher */}
      <div className="workflow-card-header">
        <div>
          <span className="workflow-kicker">Interactive Product Demonstration</span>
          <h3 className="workflow-title">{config.title}</h3>
          <p className="workflow-subtitle">{config.subtitle}</p>
        </div>

        {/* Workflow Mode Tabs */}
        <div className="workflow-mode-tabs">
          <button
            className={`workflow-tab-btn ${activeWorkflow === 'cicd' ? 'active' : ''}`}
            onClick={() => { setActiveWorkflow('cicd'); setCurrentStage(0); }}
          >
            CI/CD Pipeline
          </button>
          <button
            className={`workflow-tab-btn ${activeWorkflow === 'banking' ? 'active' : ''}`}
            onClick={() => { setActiveWorkflow('banking'); setCurrentStage(0); }}
          >
            UPI Lock Saga
          </button>
          <button
            className={`workflow-tab-btn ${activeWorkflow === 'ai_screening' ? 'active' : ''}`}
            onClick={() => { setActiveWorkflow('ai_screening'); setCurrentStage(0); }}
          >
            Claude AI Match
          </button>
        </div>
      </div>

      {/* SVG Pipeline Diagram with Animated Signal Data Packets */}
      <div className="pipeline-visual-stage">
        <div className="pipeline-stages-grid">
          {config.stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isDone = idx < currentStage;
            const isActive = idx === currentStage;

            return (
              <div
                key={stage.id}
                className={`pipeline-node ${isActive ? 'is-active' : ''} ${isDone ? 'is-done' : ''}`}
                onClick={() => { setCurrentStage(idx); setIsPlaying(false); }}
                title={`Click to inspect stage: ${stage.name}`}
              >
                <div className="node-icon-wrapper">
                  <Icon size={18} strokeWidth={1.8} />
                  {isDone && <CheckCircle2 size={13} className="node-done-check" />}
                </div>
                <div className="node-label">
                  <span className="node-name">{stage.name}</span>
                  <span className="node-badge font-mono">{stage.badge}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Real Dynamic Data Movement Progress Track */}
        <div className="pipeline-track">
          <div
            className="pipeline-track-fill"
            style={{ width: `${((currentStage + 1) / config.stages.length) * 100}%` }}
          />
          <div
            className="pipeline-pulse-packet"
            style={{ left: `${((currentStage) / (config.stages.length - 1 || 1)) * 100}%` }}
          />
        </div>

        {/* Current Stage Telemetry Banner */}
        <div className="pipeline-telemetry-banner">
          <div className="telemetry-info">
            <span className="telemetry-step-num font-mono">Stage 0{currentStage + 1} of 0{config.stages.length}:</span>
            <span className="telemetry-text">{config.stages[currentStage].statusText}</span>
          </div>

          {/* Interactive Playback Controls */}
          <div className="telemetry-controls">
            <button
              className="ctrl-btn"
              onClick={() => setIsPlaying((p) => !p)}
              title={isPlaying ? 'Pause Demo' : 'Play Demo'}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <button className="ctrl-btn" onClick={handleReset} title="Replay Sequence">
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
