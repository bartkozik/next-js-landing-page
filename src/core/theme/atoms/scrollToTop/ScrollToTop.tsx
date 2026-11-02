'use client';

import { useSmoothScroll } from '@/core/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import { JSX, useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import styles from './ScrollToTop.module.scss';

const ScrollToTop = (): JSX.Element => {
  const [visible, setVisible] = useState(false);
  const smoothScroll = useSmoothScroll();

  useEffect(() => {
    const toggleVisibility = (): void => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleClick = (): void => {
    smoothScroll('hero');
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className={styles.scrollButton}
          onClick={handleClick}
          aria-label="Powrót na górę strony"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <FaArrowUp className={styles.icon} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
