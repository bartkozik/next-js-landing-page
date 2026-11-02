'use client';

import { useSmoothScroll } from '@/core/hooks/';
import Logo from '@/core/theme/atoms/logo';
import { JSX } from 'react';
import { FaLinkedinIn } from 'react-icons/fa';
import styles from './Footer.module.scss';

const Footer = (): JSX.Element => {
  const scrollTo = useSmoothScroll();

  return (
    <footer className={styles.root} aria-label="Stopka">
      <div className={styles.top}>
        <div
          className={styles.left}
          onClick={() => {
            scrollTo('hero');
          }}
        >
          <Logo className={styles.logo} />
          <span className={styles.powered}>POWERED BY ITERATORS</span>
        </div>
        <div className={styles.right}>
          <a href="mailto:contact@example.invalid" className={styles.email} aria-label="Adres e-mail do Iterators">
            contact@example.invalid
          </a>
          <div className={styles.address}>
            <strong>Iterators sp. z o.o.</strong>
            <br />
            Adres pominięty w eksporcie portfolio
            <br />
            NIP: pominięto
            <br />
            REGON: pominięto
            <br />
            KRS: pominięto
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.legal}>
          <a href="/polityka-prywatnosci" className={styles.link} target="_blank" rel="noopener noreferrer">
            Polityka prywatności
          </a>
          <span>|</span>
          <a href="/regulamin" className={styles.link} target="_blank" rel="noopener noreferrer">
            Regulamin
          </a>
          <span className={styles.separator}></span>
          Dane rejestrowe operatora pominięto w eksporcie portfolio
        </div>
        <a
          href="https://linkedin.com/company/iterators"
          className={styles.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Strona Iterators na LinkedIn"
        >
          <FaLinkedinIn />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
