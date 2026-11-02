'use client';

import clsx from 'clsx';
import Link from 'next/link';
import React, { forwardRef, JSX, ReactNode } from 'react';
import Loader from '../loader';
import styles from './Button.module.scss';

type ButtonProps = {
  active?: boolean;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  text?: ReactNode;
  to?: string;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'text' | 'outlined';
  maxWidth?: boolean;
  name?: string;
};

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      active = false,
      className = '',
      disabled,
      icon,
      loading = false,
      onClick,
      text,
      to = '',
      type = 'button',
      variant = 'primary',
      maxWidth = false,
      ...rest
    }: ButtonProps,
    ref,
  ): JSX.Element => {
    const classes = {
      className: clsx(styles.root, className, styles[variant], {
        [styles.active]: active,
        [styles.maxWidth]: maxWidth,
        [styles.disabled]: disabled,
        [styles.withIcon]: icon,
      }),
    };

    const content = (
      <>
        <Loader loading={loading} small white={variant !== 'secondary'} className={styles.loader} />
        {!loading && icon}
        {!loading && text}
      </>
    );

    const linkElement = (
      <Link href={to} className={classes.className} target="_blank" rel="noopener noreferrer">
        {icon}
        <span>{text}</span>
      </Link>
    );

    const btnElement = (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        {...classes}
        type={type}
        onClick={(event) => onClick?.(event)}
        disabled={disabled || loading}
        {...rest}
      >
        {content}
      </button>
    );

    const component = (): JSX.Element => {
      if (to) return linkElement;
      else return btnElement;
    };

    return component();
  },
);

Button.displayName = 'Button';

export default Button;
