'use client';

import clsx from 'clsx';
import styles from './Hamburger.module.scss';

interface HamburgerProps {
  isOpen: boolean;
  toggle: () => void;
  className?: string;
}

const Hamburger = ({ isOpen, toggle, className }: HamburgerProps): React.JSX.Element => {
  return (
    <div className={clsx(styles.root, className)}>
      <div className={clsx(styles.burger, isOpen && styles.change)} onClick={toggle}>
        <div className={styles.bar1} />
        <div className={styles.bar2} />
      </div>
    </div>
  );
};

export default Hamburger;
