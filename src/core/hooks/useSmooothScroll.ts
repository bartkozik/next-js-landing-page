import { useRef } from 'react';

const cancelRaf = (ref: { current: number | null }): void => {
  if (ref.current !== null) {
    cancelAnimationFrame(ref.current);
    ref.current = null;
  }
};

const easeInOutQuad = (t: number): number => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
const SCROLL_EVENTS = ['wheel', 'touchstart', 'keydown', 'mousedown'] as const;

enum ListenerMethod {
  Add = 'addEventListener',
  Remove = 'removeEventListener',
}

export const useSmoothScroll = (getOffset: () => number = () => 0, durationMs = 700): ((id: string) => void) => {
  const animRef = useRef<number | null>(null);
  const reconcileRef = useRef<number | null>(null);
  const targetRef = useRef<string | null>(null);

  const scrollToId = (id: string): void => {
    if ((animRef.current || reconcileRef.current) && targetRef.current !== id) {
      cancelRaf(animRef);
      cancelRaf(reconcileRef);
    }

    function handleInterrupt(): void {
      cleanupTimers();
      setListeners(ListenerMethod.Remove);
      targetRef.current = null;
    }

    const setListeners = (method: ListenerMethod): void => {
      SCROLL_EVENTS.forEach((event) =>
        method === ListenerMethod.Add
          ? window.addEventListener(event, handleInterrupt, { once: true })
          : window.removeEventListener(event, handleInterrupt),
      );
    };

    const cleanupTimers = (): void => {
      cancelRaf(animRef);
      cancelRaf(reconcileRef);
    };

    const el = document.getElementById(id);
    if (!el) return;

    const offset = getOffset();

    const initialTargetY = el.getBoundingClientRect().top + window.pageYOffset - offset;
    if (Math.abs(initialTargetY - window.pageYOffset) <= 2) {
      return;
    }

    const startY = window.pageYOffset;
    const startTime = performance.now();

    const step = (now: number): void => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const eased = easeInOutQuad(progress);

      const dynOffset = getOffset();
      const currentTargetY = el.getBoundingClientRect().top + window.pageYOffset - dynOffset;
      const currentDistance = currentTargetY - startY;

      const currentY = startY + currentDistance * eased;
      window.scrollTo(0, currentY);

      if (progress < 1) animRef.current = requestAnimationFrame(step);
      else {
        animRef.current = null;

        const finalTargetY = el.getBoundingClientRect().top + window.pageYOffset - getOffset();
        window.scrollTo({ top: finalTargetY });

        const reconcile = (): void => {
          const freshTargetY = el.getBoundingClientRect().top + window.pageYOffset - getOffset();

          if (Math.abs(freshTargetY - window.pageYOffset) > 2) {
            window.scrollTo({ top: freshTargetY });
            reconcileRef.current = requestAnimationFrame(reconcile);
          } else {
            reconcileRef.current = null;
            setListeners(ListenerMethod.Remove);
          }
        };
        requestAnimationFrame(reconcile);
      }
    };

    targetRef.current = id;
    setListeners(ListenerMethod.Add);
    animRef.current = requestAnimationFrame(step);
  };

  return scrollToId;
};

export default useSmoothScroll;
