import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Laptop, Cpu, Server, Database, Cloud, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollytellingArchitecture() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 65%',
          scrub: 0.8,
        },
      });

      tl.fromTo(
        '.scrolly-node-client',
        { scale: 0.92, opacity: 0, y: 24 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      )
        .fromTo(
          '.scrolly-connector-1',
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(
          '.scrolly-node-gateway',
          { scale: 0.92, opacity: 0, y: 24 },
          { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.2'
        )
        .fromTo(
          '.scrolly-connector-2',
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(
          '.scrolly-node-backend',
          { scale: 0.92, opacity: 0, y: 24 },
          { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.2'
        )
        .fromTo(
          '.scrolly-connector-3',
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(
          '.scrolly-node-database',
          { scale: 0.92, opacity: 0, y: 24 },
          { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.2'
        )
        .fromTo(
          '.scrolly-footer-banner',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.2'
        );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="scrollytelling-section section-frame" aria-labelledby="scrolly-title">
      <div className="scrollytelling-container">
        <div className="scrolly-header">
          <div className="section-kicker"><span>03</span> Architecture in Motion</div>
          <h2 id="scrolly-title" className="scrolly-title">
            How reliable systems <i>actually breathe.</i>
          </h2>
          <p className="scrolly-subtitle">
            Trace an event-driven transaction moving from client device through distributed API gateways, microservices, and atomic database layers.
          </p>
        </div>

        {/* Clean Horizontal Pipeline Board — Connectors sit strictly BETWEEN cards */}
        <div className="scrolly-topology-flow glass-card">
          {/* Node 1 */}
          <div className="scrolly-node scrolly-node-client">
            <div className="scrolly-icon-wrap">
              <Laptop size={20} className="text-orange" />
            </div>
            <span className="scrolly-node-badge font-mono">01 · INGRESS</span>
            <h4>React &amp; Mobile Client</h4>
            <p>Optimistic local UI update with idempotency token generation</p>
          </div>

          <div className="scrolly-connector scrolly-connector-1" aria-hidden="true">
            <span className="connector-line" />
            <span className="connector-packet" />
            <ArrowRight size={14} className="connector-arrow" />
          </div>

          {/* Node 2 */}
          <div className="scrolly-node scrolly-node-gateway">
            <div className="scrolly-icon-wrap">
              <Cpu size={20} className="text-orange" />
            </div>
            <span className="scrolly-node-badge font-mono">02 · GATEWAY</span>
            <h4>Proxy &amp; Rate Limiter</h4>
            <p>Sliding-window Redis token bucket &amp; JWT validation (&lt;10ms)</p>
          </div>

          <div className="scrolly-connector scrolly-connector-2" aria-hidden="true">
            <span className="connector-line" />
            <span className="connector-packet" />
            <ArrowRight size={14} className="connector-arrow" />
          </div>

          {/* Node 3 */}
          <div className="scrolly-node scrolly-node-backend">
            <div className="scrolly-icon-wrap">
              <Server size={20} className="text-orange" />
            </div>
            <span className="scrolly-node-badge font-mono">03 · COMPUTE</span>
            <h4>Distributed Services</h4>
            <p>Node.js &amp; BullMQ worker queues with compensating sagas</p>
          </div>

          <div className="scrolly-connector scrolly-connector-3" aria-hidden="true">
            <span className="connector-line" />
            <span className="connector-packet" />
            <ArrowRight size={14} className="connector-arrow" />
          </div>

          {/* Node 4 */}
          <div className="scrolly-node scrolly-node-database">
            <div className="scrolly-icon-wrap">
              <Database size={20} className="text-orange" />
            </div>
            <span className="scrolly-node-badge font-mono">04 · PERSISTENCE</span>
            <h4>PostgreSQL &amp; Redis</h4>
            <p>Atomic CAS locks, CQRS projections, and read replicas</p>
          </div>
        </div>

        {/* Coherence Telemetry Footer */}
        <div className="scrolly-footer-banner">
          <div className="telemetry-pill">
            <ShieldCheck size={15} className="text-orange" />
            <span className="tabular-nums">End-to-End Latency: <strong>38ms</strong></span>
          </div>
          <div className="telemetry-pill">
            <Sparkles size={15} className="text-orange" />
            <span className="tabular-nums">Throughput: <strong>14,200 req/s</strong></span>
          </div>
          <div className="telemetry-pill">
            <Cloud size={15} className="text-orange" />
            <span className="tabular-nums">Availability: <strong>99.99% AWS</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
}
