import { useState, useEffect } from 'react';
import { Terminal as TerminalIcon, Check, Circle } from 'lucide-react';

interface TerminalStep {
  command: string;
  outputs: string[];
  duration: number;
}

const TERMINAL_SCRIPTS: TerminalStep[] = [
  {
    command: 'git log -1 --pretty=format:"%h - %s"',
    outputs: [
      'commit 1387422 (HEAD -> main, origin/main)',
      'Author: Subhash Maurya <subhash@dev>',
      'feat(core): atomic redis SETNX idempotency & failover saga',
    ],
    duration: 3200,
  },
  {
    command: 'redis-cli SETNX lock:upi:tx_98421 "HELD" EX 15',
    outputs: [
      '(integer) 1  # Lock acquired successfully',
      'EVENT: Balance reservation $450.00 confirmed [CAS OK]',
      'METRICS: P99 latency: 12.4ms | Throughput: 14,200 ops/s',
    ],
    duration: 3600,
  },
  {
    command: 'pnpm --filter @workspace/forge typecheck',
    outputs: [
      '> @workspace/forge@1.0.0 typecheck',
      '> tsc -p tsconfig.json --noEmit',
      '✓ Monaco Editor multi-agent bridge verified: 0 errors [1.4s]',
    ],
    duration: 3400,
  },
  {
    command: 'curl -I https://api.egovtalent.com/v1/health',
    outputs: [
      'HTTP/2 200 OK',
      'x-claude-eval-status: READY (queue: 0, workers: 8)',
      'server: AWS-EC2/CloudFront-Edge (Bangalore-ap-south-1)',
    ],
    duration: 3500,
  },
];

export function LivingTerminal({ className = '' }: { className?: string }) {
  const [scriptIndex, setScriptIndex] = useState(0);
  const [displayedCommand, setDisplayedCommand] = useState('');
  const [outputLines, setOutputLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const currentScript = TERMINAL_SCRIPTS[scriptIndex];
    let charIndex = 0;

    setDisplayedCommand('');
    setOutputLines([]);
    setIsTyping(true);

    // Type command character-by-character
    const typingInterval = setInterval(() => {
      if (charIndex < currentScript.command.length) {
        setDisplayedCommand(currentScript.command.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);

        // Display outputs with short stagger
        currentScript.outputs.forEach((line, idx) => {
          setTimeout(() => {
            setOutputLines((prev) => [...prev, line]);
          }, (idx + 1) * 220);
        });

        // Advance to next script after duration
        timeoutId = setTimeout(() => {
          setScriptIndex((prev) => (prev + 1) % TERMINAL_SCRIPTS.length);
        }, currentScript.duration);
      }
    }, 45);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(timeoutId);
    };
  }, [scriptIndex]);

  return (
    <div className={`living-terminal-box glass-card ${className}`}>
      {/* Terminal Titlebar */}
      <div className="terminal-titlebar">
        <div className="terminal-dots">
          <span className="dot dot-close" />
          <span className="dot dot-minimize" />
          <span className="dot dot-expand" />
        </div>
        <div className="terminal-title">
          <TerminalIcon size={13} className="terminal-icon" />
          <span>subhash@workstation:~/{scriptIndex === 0 ? 'engine' : scriptIndex === 1 ? 'banking' : 'dev'}</span>
        </div>
        <div className="terminal-status-pill">
          <span className="pulse-dot" />
          <span>LIVE</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="terminal-body">
        <div className="terminal-command-line">
          <span className="terminal-prompt">$</span>
          <span className="command-text">{displayedCommand}</span>
          {isTyping && <span className="cursor-caret">▋</span>}
        </div>

        <div className="terminal-output-stream">
          {outputLines.map((line, idx) => (
            <div key={idx} className="terminal-output-line">
              {line.startsWith('✓') ? (
                <span className="out-success">{line}</span>
              ) : line.startsWith('HTTP') || line.startsWith('(integer)') ? (
                <span className="out-highlight">{line}</span>
              ) : line.startsWith('METRICS') ? (
                <span className="out-metric tabular-nums">{line}</span>
              ) : (
                <span className="out-dim">{line}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
