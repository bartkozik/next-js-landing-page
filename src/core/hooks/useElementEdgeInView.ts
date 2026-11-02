import { useEffect, useState } from 'react';

/**
 * Hook that returns an object with booleans indicating whether the top and bottom edges
 * of the referenced element are currently inside the viewport.
 */
export const useElementEdgeInView = (
  ref: React.RefObject<HTMLElement | null>,
): { isTopEdgeInView: boolean; isBottomEdgeInView: boolean } => {
  const [inView, setInView] = useState({ isTopEdgeInView: false, isBottomEdgeInView: false });

  useEffect(() => {
    const update = (): void => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const topVisible = rect.top >= 0 && rect.top <= window.innerHeight;
      const bottomVisible = rect.bottom >= 0 && rect.bottom <= window.innerHeight;

      setInView({ isTopEdgeInView: topVisible, isBottomEdgeInView: bottomVisible });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [ref]);

  return inView;
};

export default useElementEdgeInView;
