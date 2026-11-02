'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { JSX } from 'react';
import styles from './FeaturesIconsSection.module.scss';

const CALLOUTS = [
  {
    key: 'topLeft',
    text: 'Dedykacja dla kancelarii prawnych: Epoca rozumie realia rozliczeń w branży prawnej.',
    imgSrc: '/svg/leftTopArrow.svg',
    imgFirst: false,
    delay: 0.3,
  },
  {
    key: 'topRight',
    text: 'Pełna kontrola nad danymi: on-premise + szyfrowanie, zgodność z audytami i RODO',
    imgSrc: '/svg/rightTopArrow.svg',
    imgFirst: true,
    delay: 0.4,
  },
  {
    key: 'bottomRight',
    text: 'Skupienie na prostocie: zero zbędnych funkcji, szybkie raporty, intuicyjna obsługa od pierwszego kliknięcia.',
    imgSrc: '/svg/leftDownArrow.svg',
    imgFirst: true,
    delay: 0.5,
  },
  {
    key: 'bottomLeft',
    text: 'Branding i wizerunek: interfejs godny kancelarii, spójność wizualna „od A do Z”.',
    imgSrc: '/svg/rightDownArrow.svg',
    imgFirst: false,
    delay: 0.6,
  },
];

const FeaturesIconsSection = (): JSX.Element => {
  const showImgElement = (imgSrc: string, key: string): JSX.Element => {
    return (
      <Image
        src={imgSrc}
        alt=""
        width={60}
        height={60}
        aria-hidden="true"
        className={styles[`arrow${key.charAt(0).toUpperCase() + key.slice(1)}`]}
      />
    );
  };

  return (
    <div className={styles.root}>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className={styles.centerText}
        viewport={{ once: true }}
        aria-label="Dlaczego Epoca to wybór dla kancelarii"
      >
        Epoca jest jedynym narzędziem, które zamiast próbować zadowolić wszystkich, skupia się na{' '}
        <strong>
          <em>realnych potrzebach </em>
        </strong>
        kancelarii prawnych –
        <strong>
          <em> bez kompromisów </em>
        </strong>
        ani nadmiarowości.
      </motion.p>
      <div className={styles.callouts}>
        {CALLOUTS.map(({ key, text, imgSrc, imgFirst, delay }) => (
          <motion.div
            key={key}
            className={clsx(styles.callout, styles[key])}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            viewport={{ once: true }}
          >
            {imgFirst && showImgElement(imgSrc, key)}
            <span className={styles.text}>{text}</span>
            {!imgFirst && showImgElement(imgSrc, key)}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesIconsSection;
