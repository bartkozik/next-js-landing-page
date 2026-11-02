'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { JSX } from 'react';
import styles from './EpocaFeaturesShowcase.module.scss';

export type FeatureSection = {
  image: string;
  title: string;
  bullets: (string | string[])[];
};

type Props = {
  sections: FeatureSection[];
};

const EpocaFeaturesShowcase = ({ sections }: Props): JSX.Element => {
  const generateBullet = (content: string, index: number): JSX.Element => {
    return (
      <motion.li
        key={index}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 1 }}
        viewport={{ once: true }}
      >
        {content}
      </motion.li>
    );
  };

  return (
    <section className={styles.root} aria-labelledby="epoca-features-showcase">
      {sections.map((section, index) => {
        const isEven = index % 2 === 0;
        const leftOffset = -80;
        const rightOffset = 80;

        const initialX = isEven ? rightOffset : leftOffset;
        const delay = 0.05;

        return (
          <motion.div
            key={index}
            className={styles.row}
            initial={{ opacity: 0, x: initialX }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div
              className={clsx(styles.imageContainer, {
                [styles.left]: isEven,
                [styles.right]: !isEven,
                [styles.rolesImg]: index === 6,
              })}
            >
              <Image
                src={section.image}
                alt={`Ilustracja: ${section.title}`}
                width={520}
                height={320}
                className={styles.image}
                priority
              />
            </div>
            <div
              className={clsx(styles.textContainer, {
                [styles.right]: isEven,
                [styles.left]: !isEven,
              })}
            >
              <h3 id={index === 0 ? 'epoca-features-showcase' : undefined} className={styles.title}>
                <span>{index + 1}. </span>
                {section.title}
              </h3>
              <ul className={styles.bullets}>
                {section.bullets.map((bullet, idx) =>
                  typeof bullet === 'string' ? (
                    generateBullet(bullet, idx)
                  ) : (
                    <ul key={idx} className={styles.subbullets}>
                      {bullet.map((sub, subIdx) => generateBullet(sub, subIdx))}
                    </ul>
                  ),
                )}
              </ul>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
};

export default EpocaFeaturesShowcase;
