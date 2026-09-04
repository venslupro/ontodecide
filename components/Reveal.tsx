'use client';

import { useEffect, useRef } from 'react';

interface RevealProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly delay?: number;
}

const SAFETY_TIMEOUT = 1200;

export function Reveal({
  children,
  className,
  delay = 0,
}: RevealProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const show = (): void => node.classList.add('is-visible');

    if (typeof IntersectionObserver === 'undefined') {
      show();
      return;
    }

    let fallback: number | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          if (delay > 0) {
            window.setTimeout(show, delay);
          } else {
            show();
          }
          if (fallback !== undefined) {
            window.clearTimeout(fallback);
            fallback = undefined;
          }
          observer.unobserve(target);
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(node);
    // Safety net: if the observer never fires (e.g. layout quirks), reveal.
    fallback = window.setTimeout(show, SAFETY_TIMEOUT);

    return () => {
      observer.disconnect();
      if (fallback !== undefined) window.clearTimeout(fallback);
    };
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className ?? ''}`}>
      {children}
    </div>
  );
}
