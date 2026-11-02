'use client';

import { useEffect, useLayoutEffect, useState } from 'react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const useIsMobile = (breakpoint: number = 768): boolean => {
  const query = `(max-width: ${breakpoint - 1}px)`;

  const getMatch = (): boolean => typeof window !== 'undefined' && window.matchMedia(query).matches;

  const [isMobile, setIsMobile] = useState(getMatch);

  useIsomorphicLayoutEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== isMobile) setIsMobile(media.matches);

    const handler = (e: MediaQueryListEvent): void => setIsMobile(e.matches);

    media.addEventListener?.('change', handler);
    return () => media.removeEventListener?.('change', handler);
  }, [query]);

  return isMobile;
};
