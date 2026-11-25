import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function AmbientScene() {
  const pointerGlowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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
      return () => window.removeEventListener('mousemove', onMouseMove);
    }
    return undefined;
  }, []);

  return (
    <div className="ambient-depth-environment" aria-hidden="true">
      {/* Clean Architectural Dot Grid */}
      <div className="ambient-grid-overlay" />

      {/* Subtle Pointer Responsive Light (Desktop Only, Monochrome/Indigo) */}
      <div ref={pointerGlowRef} className="cursor-ambient-glow" />

      {/* Organic Noise Grain */}
      <div className="ambient-grain" />
    </div>
  );
}
