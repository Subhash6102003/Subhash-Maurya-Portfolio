import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Laptop, Cpu, Server, Database, Cloud, ShieldCheck, Sparkles } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollytellingArchitecture() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !triggerRef.current) return;

    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Stage 1: Reveal Frontend Client
      tl.fromTo(
        '.scrolly-node-client',
        { scale: 0.85, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      );

      // Stage 2: Draw SVG Path 1 -> API Gateway
      tl.fromTo(
        '.scrolly-path-1',
        { strokeDashoffset: 400 },
        { strokeDashoffset: 0, duration: 1.2, ease: 'none' }
      );
      tl.fromTo(
        '.scrolly-node-gateway',
        { scale: 0.85, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.6'
      );

      // Stage 3: Draw SVG Path 2 -> Microservices & DB
      tl.fromTo(
        '.scrolly-path-2',
        { strokeDashoffset: 400 },
        { strokeDashoffset: 0, duration: 1.2, ease: 'none' }
      );
      tl.fromTo(
        '.scrolly-node-backend',
        { scale: 0.85, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.6'
      );

      tl.fromTo(
        '.scrolly-path-3',
        { strokeDashoffset: 400 },
        { strokeDashoffset: 0, duration: 1.2, ease: 'none' }
      );
      tl.fromTo(
        '.scrolly-node-database',
        { scale: 0.85, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.6'
      );

      // Stage 4: Packet transmission pulse
      tl.fromTo(
        '.scrolly-data-packet',
        { opacity: 0, offsetDistance: '0%' },
        { opacity: 1, offsetDistance: '100%', duration: 2, ease: 'power1.inOut' }
      );

      // Stage 5: Final system coherence banner
      tl.fromTo(
        '.scrolly-footer-banner',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'back.out(1.2)' }
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={triggerRef} className="scrollytelling-section">
      <div ref={containerRef} className="scrollytelling-container">
        {/* Section Heading */}
        <div className="scrolly-header">
          <div className="section-kicker"><span>01</span> Architecture in Motion</div>
          <h2 className="scrolly-title">
            How reliable systems <i>actually breathe.</i>
          </h2>
          <p className="scrolly-subtitle">
            Scroll down to trace an event-driven transaction moving from client device through our distributed microservices and database layers.
          </p>
        </div>

        {/* Pinned Topology Board */}
        <div className="scrolly-topology-board glass-card">
          {/* Node 1: Client Ingress */}
          <div className="scrolly-node scrolly-node-client">
            <div className="scrolly-icon-wrap">
              <Laptop size={22} className="text-orange" />
            </div>
            <div className="scrolly-node-info">
              <span className="scrolly-node-badge font-mono">01 · INGRESS</span>
              <h4>React &amp; Mobile Client</h4>
              <p>Optimistic local UI update with idempotency token generation</p>
            </div>
          </div>

          {/* Node 2: API Gateway & Auth */}
          <div className="scrolly-node scrolly-node-gateway">
            <div className="scrolly-icon-wrap">
              <Cpu size={22} className="text-orange" />
            </div>
            <div className="scrolly-node-info">
              <span className="scrolly-node-badge font-mono">02 · GATEWAY</span>
              <h4>Reverse Proxy &amp; Rate Limiter</h4>
              <p>Sliding-window Redis token bucket &amp; JWT validation (&lt;10ms)</p>
            </div>
          </div>

          {/* Node 3: Core Service & Sagas */}
          <div className="scrolly-node scrolly-node-backend">
            <div className="scrolly-icon-wrap">
              <Server size={22} className="text-orange" />
            </div>
            <div className="scrolly-node-info">
              <span className="scrolly-node-badge font-mono">03 · COMPUTE</span>
              <h4>Distributed Microservices</h4>
              <p>Node.js &amp; BullMQ worker queues with compensating sagas</p>
            </div>
          </div>

          {/* Node 4: Persistence & Sync */}
          <div className="scrolly-node scrolly-node-database">
            <div className="scrolly-icon-wrap">
              <Database size={22} className="text-orange" />
            </div>
            <div className="scrolly-node-info">
              <span className="scrolly-node-badge font-mono">04 · PERSISTENCE</span>
              <h4>PostgreSQL &amp; Redis Cluster</h4>
              <p>Atomic CAS locks, event-sourced CQRS projections, and read replicas</p>
            </div>
          </div>

          {/* SVG Connection Pipeline Paths */}
          <svg className="scrolly-svg-canvas" aria-hidden="true" viewBox="0 0 800 240">
            <path
              className="scrolly-path scrolly-path-1"
              d="M 180 120 L 260 120"
              strokeDasharray="400"
              strokeDashoffset="400"
            />
            <path
              className="scrolly-path scrolly-path-2"
              d="M 380 120 L 460 120"
              strokeDasharray="400"
              strokeDashoffset="400"
            />
            <path
              className="scrolly-path scrolly-path-3"
              d="M 580 120 L 660 120"
              strokeDasharray="400"
              strokeDashoffset="400"
            />
          </svg>
        </div>

        {/* Coherence Telemetry Footer */}
        <div className="scrolly-footer-banner">
          <div className="telemetry-pill">
            <ShieldCheck size={16} className="text-orange" />
            <span>End-to-End Latency: <strong>38ms</strong></span>
          </div>
          <div className="telemetry-pill">
            <Sparkles size={16} className="text-orange" />
            <span>Throughput: <strong>14,200 req/sec</strong></span>
          </div>
          <div className="telemetry-pill">
            <Cloud size={16} className="text-orange" />
            <span>High-Availability: <strong>99.99% AWS</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
}
