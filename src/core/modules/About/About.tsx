'use client';

import { useInView, useElementEdgeInView, useIsMobile } from '@/core/hooks';
import clsx from 'clsx';
import { JSX, useRef, useEffect } from 'react';
import styles from './About.module.scss';
import Sections from './components/Sections/Sections';
import { WHY_EPOCA_SECTIONS } from './sectionContent';

export const About = (): JSX.Element => {
  const [scrolledSectionRef, isSectionInView] = useInView(0.1);
  const isMobile = useIsMobile(1080);
  const sectionRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const { isTopEdgeInView, isBottomEdgeInView } = useElementEdgeInView(rootRef);

  useEffect(() => {
    const update = (): void => {
      if (!sectionRef.current || !bgRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const bg = bgRef.current;

      if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
        bg.style.transform = 'translateY(0)';
        return;
      }

      const speed = 0.5;
      const offset = -rect.top * speed;

      bg.style.transform = `translateY(${offset}px)`;
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    const ro = new ResizeObserver(update);
    if (sectionRef.current) ro.observe(sectionRef.current);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      ro.disconnect();
    };
  }, []);

  const isParallaxActive = isSectionInView && !isBottomEdgeInView;

  return (
    <section ref={rootRef} className={styles.root} id="about" aria-labelledby="about-heading">
      <div
        ref={bgRef}
        className={clsx(styles.parallaxBackground, {
          [styles.parallaxBackgroundVisible]: isParallaxActive,
          [styles.backgroundAnimation]: isTopEdgeInView,
        })}
        aria-hidden
      />
      <h2 id="about-heading" className={styles.heading}>
        Dlaczego Epoca?
      </h2>
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <p>
            Epoca powstała z jasnym celem: dostarczyć kancelariom prawnym narzędzie do monitorowania czasu pracy, które
            nie jest „ogólnym SaaS-em dla wszystkich”, lecz rozwiązaniem skrojonym pod specyficzne potrzeby prawnicze.
            Poniżej zbieramy główne powody, dla których warto wybrać właśnie Epoca.
          </p>
        </div>
        <div ref={scrolledSectionRef} className={styles.rightColumn}>
          <Sections sections={WHY_EPOCA_SECTIONS} isSectionInView={isSectionInView} isMobile={isMobile} />
        </div>
      </div>
      <div className={styles.bg} aria-hidden="true" />
    </section>
  );
};

export default About;
