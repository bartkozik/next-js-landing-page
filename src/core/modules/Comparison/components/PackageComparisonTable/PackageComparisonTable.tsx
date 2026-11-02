'use client';

import useInView from '@/core/hooks/useInView';
import { useIsMobile } from '@/core/hooks/useIsMobile';
import SwiperButtons from '@/core/theme/atoms/swiperButtons';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { JSX, useRef } from 'react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './PackageComparisonTable.module.scss';

type Feature = {
  label: string;
  basic: boolean;
  enterprise: boolean;
};

const features: Feature[] = [
  { label: 'Raportowanie czasu na godziny', basic: true, enterprise: true },
  { label: 'Raporty i eksport (Excel/PDF)', basic: true, enterprise: true },
  { label: 'Zarządzanie projektami i klientami', basic: true, enterprise: true },
  { label: 'Role i uprawnienia (Owner, Manager, itd.)', basic: true, enterprise: true },
  { label: 'Możliwość dodatkowych audytów', basic: false, enterprise: true },
];

type AnimatedHeaderCellProps = {
  title: string;
  subtitle: string;
  delay?: number;
  animate: boolean;
  scope?: 'col' | 'row';
};

const AnimatedHeaderCell = ({ title, subtitle, delay = 0, animate, scope }: AnimatedHeaderCellProps): JSX.Element => (
  <motion.th
    scope={scope}
    className={styles.card}
    initial={{ opacity: 0, y: 20 }}
    animate={animate ? { opacity: 1, y: 0 } : {}}
    transition={{ delay, duration: 0.8 }}
  >
    <span className={styles.planTitle}>{title}</span>
    <span className={styles.planSubtitle}>{subtitle}</span>
  </motion.th>
);

type AnimatedPlanCellProps = {
  value: boolean;
  cellIndex: number;
  delay?: number;
  animate: boolean;
};

const AnimatedPlanCell = ({ value, cellIndex, delay = 0, animate }: AnimatedPlanCellProps): JSX.Element => (
  <motion.td
    className={clsx(styles.basicCardCell, { [styles.notLastCell]: cellIndex !== features.length - 1 })}
    initial={{ opacity: 0, y: 20 }}
    animate={animate ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.7, delay }}
  >
    <span className={styles.gradientText}>{value ? '✓' : '—'}</span>
  </motion.td>
);

const PackageComparisonTable = (): JSX.Element => {
  const isMobile = useIsMobile(768);
  const isMobileXS = useIsMobile(430);
  const slidesPerViewByScreen = isMobile ? 1.3 : 1.7;
  const [ref, inView] = useInView(0.3);

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const enterprisePriceCell = (
    <td className={styles.price}>
      <span className={styles.enterpricePrice}>Indywidualna&nbsp;wycena</span>
    </td>
  );

  const basicPriceCell = (
    <td className={clsx(styles.price, styles.basicPrice)}>
      50 zł <span>/ seat* / mc</span>
    </td>
  );

  const desktopTable = (
    <div ref={ref} className={styles.desktopTable}>
      <table>
        <thead>
          <tr>
            <th className={styles.blank} />
            <th className={styles.gapCol} />
            <AnimatedHeaderCell
              title="Basic"
              subtitle="(Cloud, multi-tenant)"
              animate={inView}
              delay={0.1}
              scope="col"
            />
            <th className={styles.gapCol} />
            <AnimatedHeaderCell title="Enterprice" subtitle="/ On-Premise" animate={inView} delay={0.3} scope="col" />
          </tr>
        </thead>

        <tbody>
          {features.map((f, index) => (
            <tr key={f.label}>
              <th scope="row" className={styles.rowLabel}>
                {f.label}
              </th>
              <td className={styles.gapCol} />
              <AnimatedPlanCell animate={inView} value={f.basic} cellIndex={index} />
              <td className={styles.gapCol} />
              <AnimatedPlanCell animate={inView} value={f.enterprise} cellIndex={index} />
            </tr>
          ))}
          <tr>
            <td className={styles.blank} />
            <td className={styles.gapCol} />
            {basicPriceCell}
            <td className={styles.gapCol} />
            {enterprisePriceCell}
          </tr>
        </tbody>
      </table>
    </div>
  );

  const mobileTable = (
    <div className={styles.mobileTable}>
      <Swiper
        modules={[Navigation]}
        slidesPerView={isMobileXS ? 1.15 : slidesPerViewByScreen}
        spaceBetween={20}
        centeredSlides
        navigation={{ nextEl: '.swiper-next', prevEl: '.swiper-prev' }}
        slideToClickedSlide
        className={styles.swiper}
      >
        {['basic', 'enterprise'].map((type, i) => (
          <SwiperSlide key={i} className={styles.slide}>
            <table aria-label={`Porównanie pakietu ${type === 'basic' ? 'Basic' : 'Enterprise'}`} role="table">
              <thead>
                <tr>
                  <th className={styles.mobileHeader} scope="col">
                    <span className={styles.planTitle}>{type === 'basic' ? 'Basic' : 'Enterprise'}</span>
                    <span className={styles.planSubtitle}>
                      {type === 'basic' ? '(Cloud, multi-tenant)' : '/ On-Premise'}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((field) => {
                  const isChecked = (type === 'basic' && field.basic) || (type === 'enterprise' && field.enterprise);
                  return (
                    <tr key={field.label}>
                      <td className={styles.mobileCell} scope="row">
                        <span className={styles.gradientText}>{isChecked ? '✓' : '—'}</span>
                        <span className={styles.cellLabel}> {field.label}</span>
                      </td>
                    </tr>
                  );
                })}
                {type === 'basic' ? <tr>{basicPriceCell}</tr> : <tr>{enterprisePriceCell}</tr>}
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
      {mobileTable}
      {desktopTable}
      <div className={styles.disclaimer}>
        *Seat – co to oznacza?
        <p>
          Seat to aktywny użytkownik rozliczający więcej niż 16 godzin miesięcznie. Pracownicy okazjonalni („z doskoku”,
          poniżej 16h/mc) nie są liczeni do opłat.
        </p>
      </div>
    </div>
  );
};

export default PackageComparisonTable;
