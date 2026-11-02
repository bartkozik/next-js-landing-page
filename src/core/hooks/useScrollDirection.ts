import { useEffect, useRef, useState } from 'react';

type ScrollDirection = 'up' | 'down';

export const useScrollDirection = (): ScrollDirection => {
  const [direction, setDirection] = useState<ScrollDirection>('down');

  const lastScrollY = useRef(0);

  useEffect((): (() => void) => {
    lastScrollY.current = window.scrollY;

    const updateDirection = (): void => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

      if (Math.abs(diff) < 2) return;

      setDirection(diff > 0 ? 'down' : 'up');
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', updateDirection, { passive: true });
    return () => window.removeEventListener('scroll', updateDirection);
  }, []);

  return direction;
};
