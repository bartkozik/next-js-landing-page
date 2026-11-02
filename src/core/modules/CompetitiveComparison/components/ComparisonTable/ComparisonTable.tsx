'use client';

import { useIsMobile } from '@/core/hooks/useIsMobile';
import Logo from '@/core/theme/atoms/logo';
import SwiperButtons from '@/core/theme/atoms/swiperButtons';
import clsx from 'clsx';
import { JSX, useRef, useEffect } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './ComparisonTable.module.scss';

const rows = [
  {
    label: 'Specjalizacja dla prawników',
    epoca: 'Tak – liczenie godzin,\n raporty prawa',
    saas: 'Nie – mierzenie minut/sekwencji',
    big: 'Tak, ale ciężkie w konfiguracji,\n przestarzałe UI',
  },
  {
    label: 'Modele wdrożenia',
    epoca: 'On-premise (pełna kontrola)',
    saas: 'Chmura publiczna',
    big: 'Lokalne instalacje, ale często\n złożone i drogie',
  },
  {
    label: 'Branding i personalizacja',
    epoca: 'Pełna (logo, kolory)',
    saas: 'Limitowana (logotyp dostawcy)',
    big: 'Ograniczona, interfejsy\n przypominają stare aplikacje ERP',
  },
  {
    label: 'Krzywa uczenia się',
    epoca: 'Płaska – zero szkoleń',
    saas: 'Średnia – potrzebne tutoriale',
    big: 'Wysoka – szkolenia, wsparcie IT',
  },
  {
    label: 'Funkcjonalność raportowania',
    epoca: 'Szybkie raporty tygodniowe /\n miesięczne, eksport do Excel',
    saas: 'Zaawansowane wykresy, ale\n często nie do końca przydatne\nprawniczo',
    big: 'Rozbudowane raporty, ale trudno\n je dostosować samodzielnie',
  },
  {
    label: 'Bezpieczeństwo danych',
    epoca: 'On-premise + E2E szyfrowanie',
    saas: 'Dane w chmurze dostawcy, \nRODO zależne od regionu',
    big: 'Zwykle on-premise, ale brak \n nowoczesnej architektury klucza',
  },
  {
    label: 'UX / UI',
    epoca: 'Nowoczesny, minimalistyczny, poważny',
    saas: 'Nowoczesny, często „startupowy”',
    big: 'Przestarzały, „klockowaty”',
  },
] as const;

type ColKey = 'epoca' | 'saas' | 'big';

const COLUMNS: {
  key: ColKey;
  slideClass: string;
  headerMobile: JSX.Element;
  headerClassMobile: string;
  cellClassMobile: string;
  headerDesktop: JSX.Element;
  thClassDesktop: string;
  tdClassDesktop: string;
}[] = [
  {
    key: 'epoca',
    slideClass: clsx(styles.slide, styles.epocaSliderColumn),
    headerMobile: <Logo className={styles.logo} />,
    headerClassMobile: clsx(styles.mobileHeader, styles.epocaColumn),
    cellClassMobile: clsx(styles.mobileCell, styles.epocaColumn),
    headerDesktop: <Logo className={clsx(styles.logo, styles.logoWithMargin)} />,
    thClassDesktop: styles.epocaCard,
    tdClassDesktop: styles.epocaCardCell,
  },
  {
    key: 'saas',
    slideClass: styles.slide,
    headerMobile: (
      <>
        Typowe SaaS-owe <br /> time trackery
      </>
    ),
    headerClassMobile: styles.mobileHeader,
    cellClassMobile: styles.mobileCell,
    headerDesktop: (
      <>
        Typowe SaaS-owe <br /> time trackery
      </>
    ),
    thClassDesktop: styles.header,
    tdClassDesktop: styles.cell,
  },
  {
    key: 'big',
    slideClass: styles.slide,
    headerMobile: (
      <>
        Duże systemy prawnicze <br /> (np. Wolters Kluwer)
      </>
    ),
    headerClassMobile: styles.mobileHeader,
    cellClassMobile: styles.mobileCell,
    headerDesktop: (
      <>
        Duże systemy prawnicze <br /> (np. Wolters Kluwer)
      </>
    ),
    thClassDesktop: styles.header,
    tdClassDesktop: styles.cell,
  },
];

const ComparisonTable = (): JSX.Element => {
  const isMobile = useIsMobile(768);
  const isMobileXS = useIsMobile(430);

  const swiperRef = useRef<SwiperType | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const slidesPerViewByScreen = isMobile ? 1.45 : 1.8;

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || !prevRef.current || !nextRef.current) return;

    if (typeof swiper.params.navigation === 'object') {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.destroy();
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiperRef, prevRef, nextRef]);

  const desktopTable = (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.stickyBlank} scope="col"></th>
          {COLUMNS.map(({ key, headerDesktop, thClassDesktop }) => (
            <th key={key} className={thClassDesktop} scope="col">
              {headerDesktop}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((r, index) => (
          <tr key={r.label}>
            <td className={styles.rowLabel} scope="row">
              {r.label}
            </td>
            {COLUMNS.map(({ key, tdClassDesktop }) => (
              <td
                key={key}
                className={clsx(tdClassDesktop, {
                  [styles.bottomBorder]: key === 'epoca' && index !== rows.length - 1,
                  [styles.bottomRadius]: key === 'epoca' && index === rows.length - 1,
                })}
              >
                {r[key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  const mobileTable = (
    <div className={styles.mobileTableContainer}>
      <Swiper
        modules={[Navigation]}
        slidesPerView={isMobileXS ? 1.2 : slidesPerViewByScreen}
        spaceBetween={0}
        centeredSlides
        watchOverflow
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        navigation
        slideToClickedSlide
      >
        {COLUMNS.map(({ key, slideClass, headerMobile, headerClassMobile, cellClassMobile }) => (
          <SwiperSlide key={key} className={slideClass}>
            <table className={styles.mobileTable}>
              <thead>
                <tr>
                  <th className={headerClassMobile} scope="col">
                    {headerMobile}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, index) => (
                  <tr key={r.label}>
                    <td
                      className={clsx(cellClassMobile, {
                        [styles.mobileBottomBorder]: index !== rows.length - 1,
                      })}
                      scope="row"
                    >
                      <span>{r.label}: </span>
                      {r[key].replace(/\n/g, '')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SwiperSlide>
        ))}
      </Swiper>
      <SwiperButtons className={styles.swipeButtons} prevRef={prevRef} nextRef={nextRef} />
    </div>
  );

  return (
    <div className={styles.root}>
      {desktopTable}
      {mobileTable}
    </div>
  );
};

export default ComparisonTable;
