import { useState, useEffect } from 'react';
import { GitBranch, Globe, Server, Database, Terminal, CheckCircle2, ArrowRight } from 'lucide-react';

const TERMINAL_STATUSES = [
  { cmd: '$ git push origin main', out: '✓ CI/CD verified · 24 systems live (38ms p99)' },
  { cmd: '$ redis-cli SETNX lock:tx_98421 OK', out: '● CAS atomic reserve · 14.2k ops/s (0% slippage)' },
  { cmd: '$ meshctl status --aws ap-south-1', out: '● 128 nodes healthy · Bangalore Edge active' },
];

export function HeroArchitectureCanvas() {
  const [activeNode, setActiveNode] = useState(0);
  const [termIdx, setTermIdx] = useState(0);

  useEffect(() => {
    const nodeTimer = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 4);
    }, 2000);
    const termTimer = setInterval(() => {
      setTermIdx((prev) => (prev + 1) % TERMINAL_STATUSES.length);
    }, 3600);
    return () => {
      clearInterval(nodeTimer);
      clearInterval(termTimer);
    };
  }, []);

  const currentTerm = TERMINAL_STATUSES[termIdx];

  return (
    <div className="hero-arch-wrapper" aria-label="Interactive full-stack and cloud architecture diagram">
      {/* Main Smoked-Glass Architecture Canvas (Railway / Vercel Style) */}
      <div className="hero-arch-board glass-card">
        <div className="hero-arch-topbar">
          <span className="hero-arch-label font-mono">PRODUCTION TOPOLOGY · BANGALORE</span>
          <span className="hero-arch-live font-mono">
            <span className="sage-dot" /> 99.99% SLA
          </span>
        </div>

        {/* Connected 2-Tier Node Graph */}
        <div className="hero-arch-graph">
          {/* Top Node: Client / Frontend */}
          <div className={`arch-mini-node node-cobalt ${activeNode === 0 ? 'is-pulsing' : ''}`}>
            <Globe size={14} style={{ color: '#5350f6' }} />
            <div>
              <strong>Frontend &amp; Mobile</strong>
              <span className="font-mono">React · Flutter · Kotlin</span>
            </div>
          </div>

          {/* Branching SVG Connector Lines */}
          <div className="hero-arch-branches" aria-hidden="true">
            <span className="branch-stem" />
            <span className="branch-bar" />
          </div>

          {/* Bottom 3 Connected Infrastructure Nodes */}
          <div className="hero-arch-row">
            <div className={`arch-mini-node node-sand ${activeNode === 1 ? 'is-pulsing' : ''}`}>
              <GitBranch size={14} style={{ color: '#d6b88d' }} />
              <div>
                <strong>GitHub CI/CD</strong>
                <span className="font-mono">Actions · Docker</span>
              </div>
            </div>

            <ArrowRight size={13} className="arch-mini-arrow" />

            <div className={`arch-mini-node node-terracotta ${activeNode === 2 ? 'is-pulsing' : ''}`}>
              <Server size={14} style={{ color: '#d96b43' }} />
              <div>
                <strong>Backend API</strong>
                <span className="font-mono">Node · BullMQ</span>
              </div>
            </div>

            <ArrowRight size={13} className="arch-mini-arrow" />

            <div className={`arch-mini-node node-sage ${activeNode === 3 ? 'is-pulsing' : ''}`}>
              <Database size={14} style={{ color: '#4d9e7a' }} />
              <div>
                <strong>AWS &amp; Data</strong>
                <span className="font-mono">Postgres · Redis</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlapping Live Terminal Card (Option 2 / Option 6 Signature) */}
      <div className="hero-floating-terminal glass-card">
        <div className="hero-term-line font-mono">
          <Terminal size={12} style={{ color: '#d6b88d', flexShrink: 0 }} />
          <span>{currentTerm.cmd}</span>
        </div>
        <div className="hero-term-out font-mono">
          <CheckCircle2 size={12} style={{ color: '#4d9e7a', flexShrink: 0 }} />
          <span>{currentTerm.out}</span>
        </div>
      </div>
    </div>
  );
}
