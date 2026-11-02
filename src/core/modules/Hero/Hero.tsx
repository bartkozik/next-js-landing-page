'use client';

import { useIsMobile } from '@/core/hooks';
import Button from '@/core/theme/atoms/button';
import SwiperButtons from '@/core/theme/atoms/swiperButtons';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { JSX, useEffect, useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './Hero.module.scss';
import BenefitPoint from './components/BenefitPoint';

const Logo = dynamic(() => import('@/core/theme/atoms/logo'), { ssr: false });
const FlyingStickers = dynamic(() => import('./components/FlyingStickers/FlyingStickers'), { ssr: false });

const STICKERS = [
  'Pełna kontrola nad danymi',
  'Szyfrowanie end-to-end',
  'Praktyczne scenariusze prawnicze',
  'On-premise',
  'Raporty godzinowe',
  'Whitelabel',
  'Zgodność z audytami i RODO',
  'Zarządzanie czasem pracy',
  'Ewidencja zadań zespołu',
  'Bezpieczne logowanie',
  'Wersjonowanie dokumentów',
  'Dziennik czynności',
  'Personalizowane szablony',
  'Uprawnienia użytkowników',
  'Tryb poufny',
  'Historia zmian',
  'Personalizowane raporty',
];

const MAX_STICKERS_SHOWN = 10;

interface BenefitPoint {
  icon: string;
  area: string;
  bullets: string[];
}

const BENEFIT_AREAS: BenefitPoint[] = [
  {
    icon: '/svg/computer.svg',
    area: 'Prostota i oszczędność czasu',
    bullets: [
      'Intuicyjny interfejs',
      'Automatyczne raporty, szybka edycja, eksport do Excela',
      'Brak potrzeby szkoleń',
    ],
  },
  {
    icon: '/svg/safe.svg',
    area: 'Bezpieczeństwo i pełna kontrola',
    bullets: [
      'Wersja on-premise, dane tylko w Twojej infrastrukturze',
      'Szyfrowanie end-to-end, architektura klucza prywatnego',
      'Zgodność z wymaganiami audytowymi kancelarii',
    ],
  },
  {
    icon: '/svg/design.svg',
    area: 'Branding dopasowany do kancelarii',
    bullets: [
      'Logo, kolory, elementy wizualne zgodne z wizerunkiem',
      'Profesjonalny, przejrzysty wygląd',
      'Spójność z dokumentami i komunikacją',
    ],
  },
];

export const HeroSection = (): JSX.Element => {
  const isMobileXS = useIsMobile(431);
  const isSmallDesktop = useIsMobile(1300);
  const [stickersPool, setStickersPool] = useState<string[]>(STICKERS.slice(0, MAX_STICKERS_SHOWN));

  const stickersMaxPerView = isSmallDesktop ? 7 : MAX_STICKERS_SHOWN;

  useEffect(() => {
    setStickersPool([...STICKERS].sort(() => 0.5 - Math.random()).slice(0, stickersMaxPerView));
  }, [stickersMaxPerView]);

  const logoVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: 'easeOut' as const },
    },
  };

  const swiperRef = useRef<SwiperType | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const stickersMobileRef = useRef<HTMLDivElement | null>(null);

  const desktopBenefitItemsAnimated = (
    <div className={styles.animatedBenefitPoint}>
      {BENEFIT_AREAS.map(({ icon, area, bullets }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <BenefitPoint icon={icon} area={area} bullets={bullets} />
        </motion.div>
      ))}
    </div>
  );

  const mobileBenefitSlides = (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      viewport={{ once: true, amount: 0.3 }}
      className={styles.notAnimatedBenefitPoint}
    >
      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView={isMobileXS ? 1.7 : 1.9}
        centeredSlides
        watchOverflow
        slideToClickedSlide
        initialSlide={1}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
          if (swiper.params.navigation && typeof swiper.params.navigation === 'object') {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        breakpoints={{
          768: {
            slidesPerView: 3,
            centeredSlides: false,
          },
        }}
      >
        {BENEFIT_AREAS.map(({ icon, area, bullets }, i) => (
          <SwiperSlide key={i}>
            <BenefitPoint icon={icon} area={area} bullets={bullets} />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );

  return (
    <section className={styles.root} id="hero">
      <div className={styles.titleContainer}>
        <motion.div
          className={styles.title}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h1 className={styles.mainTitle}>
            Prosty, bezpieczny <strong>time tracking.</strong>
          </h1>
          <h2 className={styles.mainTitle}>
            Zaprojektowany dla <strong>kancelarii prawnych.</strong>
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.7 }}
          viewport={{ once: true }}
          className={styles.subtitle}
        >
          Oszczędzaj czas na rozliczeniach. Zachowaj pełną kontrolę nad danymi – wdrożenie on-premise, architektura
          zgodna z wymaganiami kancelarii.
        </motion.p>
      </div>

      <div className={styles.imageSection}>
        <div className={styles.backgroundImageWrapper}>
          <Image
            className={styles.heroBackgroundImg}
            src="/images/heroBackground.png"
            alt=""
            aria-hidden="true"
            width={1552}
            height={1290}
            priority
          />
          <div className={styles.stickersDesktop}>
            <FlyingStickers stickers={stickersPool} />
          </div>
          <motion.div
            className={styles.logoContainer}
            variants={logoVariants}
            initial="hidden"
            whileInView="visible"
            style={{ willChange: 'opacity, transform' }}
            viewport={{ once: true }}
          >
            <Logo isWhite className={styles.logo} />
          </motion.div>
        </div>
        <div className={styles.stickersMobile} ref={stickersMobileRef}>
          <FlyingStickers stickers={stickersPool} containerRef={stickersMobileRef} />
        </div>
      </div>
      <div className={styles.bacgroundColoredContainer}>
        <div className={styles.benefitsWrapper}>
          {desktopBenefitItemsAnimated}

          {mobileBenefitSlides}
        </div>
        <SwiperButtons className={styles.swiperButtons} prevRef={prevRef} nextRef={nextRef} />
        <Button
          text="Umów prezentację"
          to={process.env.NEXT_PUBLIC_CALENDLY_URL || '#'}
          aria-label="Umów prezentację przez Calendly"
        />
      </div>
    </section>
  );
};

export default HeroSection;
