import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/**
 * Hook to run GSAP animations with automatic context cleanup
 */
export function useGsapContext(
  animationCallback: (context: gsap.Context) => void,
  dependencies: unknown[] = []
) {
  const scopeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scopeRef.current) return;

    const ctx = gsap.context(() => {
      animationCallback(ctx);
    }, scopeRef);

    return () => {
      ctx.revert();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return scopeRef;
}

/**
 * Subtle 3D tilt + pointer specular sheen (--mx, --my) for architectural cards
 */
export function attachCardTilt(element: HTMLElement, maxTiltAngle = 3.5) {
  const xTo = gsap.quickTo(element, 'rotateY', { duration: 0.35, ease: 'power2.out' });
  const yTo = gsap.quickTo(element, 'rotateX', { duration: 0.35, ease: 'power2.out' });

  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    element.style.setProperty('--mx', `${((x / rect.width) * 100).toFixed(1)}%`);
    element.style.setProperty('--my', `${((y / rect.height) * 100).toFixed(1)}%`);

    gsap.set(element, { transformPerspective: 1100 });
    yTo(((y - centerY) / centerY) * -maxTiltAngle);
    xTo(((x - centerX) / centerX) * maxTiltAngle);
  };

  const handleMouseLeave = () => {
    yTo(0);
    xTo(0);
  };

  element.addEventListener('mousemove', handleMouseMove, { passive: true });
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
}

/**
 * Restrained magnetic pull for primary CTA buttons
 */
export function attachMagnetic(element: HTMLElement, strength = 0.18) {
  const xTo = gsap.quickTo(element, 'x', { duration: 0.3, ease: 'power3.out' });
  const yTo = gsap.quickTo(element, 'y', { duration: 0.3, ease: 'power3.out' });

  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    xTo(relX * strength);
    yTo(relY * strength);
  };

  const handleMouseLeave = () => {
    xTo(0);
    yTo(0);
  };

  element.addEventListener('mousemove', handleMouseMove, { passive: true });
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
}
