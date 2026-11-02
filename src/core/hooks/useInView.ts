'use client';

import { useCallback, useState, useRef } from 'react';

export const useInView = (
  threshold: number = 0.3,
  dwellMs: number = 0,
): [(node: HTMLDivElement | null) => void, boolean] => {
  const [inView, setInView] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const refCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (timerRef.current) clearTimeout(timerRef.current);
            if (dwellMs === 0) {
              setInView(true);
            } else {
              timerRef.current = setTimeout(() => setInView(true), dwellMs);
            }
          } else {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = null;
            setInView(false);
          }
        },
        { threshold },
      );

      observer.observe(node);

      return () => {
        observer.disconnect();
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    },
    [threshold, dwellMs],
  );

  return [refCallback, inView];
};

export default useInView;
