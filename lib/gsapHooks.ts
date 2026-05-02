'use client';

import { useEffect, useRef } from 'react';

export function useGSAPReveal(deps: unknown[] = []) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!ref.current) return;

      ctx = gsap.context(() => {
        const elements = ref.current!.querySelectorAll('.gsap-reveal');
        gsap.fromTo(elements,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 85%',
            }
          }
        );
      }, ref);
    };

    init();
    return () => ctx?.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

export function useGSAPHero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { gsap } = await import('gsap');

      if (!ref.current) return;
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        tl.fromTo('.hero-eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 })
          .fromTo('.hero-title', { opacity: 0, y: 60, skewY: 3 }, { opacity: 1, y: 0, skewY: 0, duration: 1.2 }, '-=0.4')
          .fromTo('.hero-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.7')
          .fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 }, '-=0.5')
          .fromTo('.hero-line', { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power2.out' }, '-=0.8');
      }, ref);
    };

    init();
    return () => ctx?.revert();
  }, []);

  return ref;
}

export function useGSAPMagneticButtons() {
  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap');

      const buttons = document.querySelectorAll('.magnetic-btn');
      buttons.forEach(btn => {
        const el = btn as HTMLElement;
        el.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
        });
      });
    };
    init();
  }, []);
}
