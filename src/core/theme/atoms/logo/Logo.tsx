'use client';

import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';
import React, { FC } from 'react';
import styles from './Logo.module.scss';

interface LogoProps extends Omit<ImageProps, 'src' | 'alt'> {
  className?: string;
  isWhite?: boolean;
  size?: 'regular' | 'small';
  onClick?: () => void;
}

const Logo: FC<LogoProps> = ({ className, isWhite, size = 'regular', onClick, ...otherProps }) => {
  const logoSrc = isWhite ? '/svg/logoWhite.svg' : '/images/logo.png';

  return (
    <Image
      src={logoSrc}
      alt="logo"
      width={115}
      height={35}
      className={clsx(styles.root, styles[size], { [styles.pointer]: onClick }, className)}
      priority
      onClick={onClick}
      {...otherProps}
    />
  );
};

export default Logo;
