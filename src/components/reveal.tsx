'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { animate, useReducedMotion } from 'motion/react';
// Server markup stays visible; animation is a progressive enhancement.
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || !('IntersectionObserver' in window)) return;
    let animation: ReturnType<typeof animate> | undefined;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animation = animate(node, { opacity: [0.4, 1], y: [30, 0] }, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
        observer.disconnect();
      }
    }, { threshold: 0.08 });
    observer.observe(node);
    return () => { observer.disconnect(); animation?.stop(); };
  }, [reduced]);
  return <div ref={ref} className={className}>{children}</div>;
}
