import clsx from 'clsx';
import { JSX, RefObject } from 'react';
import styles from './SwiperButtons.module.scss';

interface SwiperButtonsProps {
  className?: string;
  prevRef: RefObject<HTMLButtonElement | null>;
  nextRef: RefObject<HTMLButtonElement | null>;
}

const SwiperButtons = ({ className, prevRef, nextRef }: SwiperButtonsProps): JSX.Element => {
  return (
    <div className={clsx(styles.root, className)}>
      <button ref={prevRef} className={clsx(styles.button, 'swiper-prev')}>
        ←
      </button>
      <button ref={nextRef} className={clsx(styles.button, 'swiper-next')}>
        →
      </button>
    </div>
  );
};

export default SwiperButtons;
