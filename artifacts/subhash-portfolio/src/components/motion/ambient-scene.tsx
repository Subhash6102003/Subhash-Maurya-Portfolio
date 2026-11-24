import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function AmbientScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pointerGlowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Gentle autonomous floating for ambient lighting orbs
      gsap.to('.ambient-orb-1', {
        x: '+=35',
        y: '-=40',
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.ambient-orb-2', {
        x: '-=45',
        y: '+=30',
        duration: 11,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.5,
      });

      gsap.to('.ambient-orb-3', {
        x: '+=25',
        y: '+=35',
        duration: 8.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.8,
      });
    }, containerRef);

    // Mouse-following ambient glow on desktop only
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (isFinePointer && pointerGlowRef.current) {
      const glowEl = pointerGlowRef.current;
      const onMouseMove = (e: MouseEvent) => {
        gsap.to(glowEl, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.45,
          ease: 'power2.out',
        });
      };
      window.addEventListener('mousemove', onMouseMove, { passive: true });

      return () => {
        ctx.revert();
        window.removeEventListener('mousemove', onMouseMove);
      };
    }

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="ambient-depth-environment" aria-hidden="true">
      {/* Layer 1: Static Architectural Grid Texture */}
      <div className="ambient-grid-overlay" />

      {/* Layer 2: Slow-Moving Warm Ambient Diffusers (Zero Neon, strictly warm ivory & brand orange) */}
      <div className="ambient-orb ambient-orb-1" />
      <div className="ambient-orb ambient-orb-2" />
      <div className="ambient-orb ambient-orb-3" />

      {/* Layer 3: Subtle Pointer Responsive Ambient Light (Desktop Only) */}
      <div ref={pointerGlowRef} className="cursor-ambient-glow" />

      {/* Organic Noise Grain */}
      <div className="ambient-grain" />
    </div>
  );
}
