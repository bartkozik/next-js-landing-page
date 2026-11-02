import clsx from 'clsx';
import Image from 'next/image';
import { JSX } from 'react';
import styles from './Sticker.module.scss';

interface StickerProps {
  text: string;
  className?: string;
}

const Sticker = ({ text, className }: StickerProps): JSX.Element => {
  return (
    <div className={clsx(styles.root, className)}>
      <Image className={styles.icon} src={'/svg/dognut.svg'} alt="dognut" width={13} height={13} priority />
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Sticker;
