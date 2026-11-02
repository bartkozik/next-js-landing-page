'use client';

import { useSmoothScroll } from '@/core/hooks';
import Button from '@/core/theme/atoms/button';
import Hamburger from '@/core/theme/atoms/hamburger';
import Logo from '@/core/theme/atoms/logo';
import clsx from 'clsx';
import { JSX, useEffect, useState, useRef } from 'react';
import styles from './Navbar.module.scss';

const NAV_ITEMS = [
  { id: 'about', label: 'Dlaczego Epoca?' },
  { id: 'functionality', label: 'Funkcjonalności' },
  { id: 'comparison', label: 'Porównanie pakietów' },
  { id: 'faq', label: 'FAQ' },
];

const Navbar = (): JSX.Element => {
  const [activeSection, setActiveSection] = useState<string>();
  const ratiosRef = useRef<Record<string, number>>({});
  const navRef = useRef<HTMLElement | null>(null);
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '#';

  const smoothScroll = useSmoothScroll(() => navRef.current?.offsetHeight ?? 0);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = (): void => setIsMobileMenuOpen((prev) => !prev);

  const scrollTo = (id: string): void => {
    smoothScroll(id);
    setActiveSection(id);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratiosRef.current[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        });
        const [topEntry] = Object.entries(ratiosRef.current).sort((a, b) => b[1] - a[1]);
        if (topEntry && topEntry[1] > 0) setActiveSection(topEntry[0]);
        else setActiveSection(undefined);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const navbarItems = NAV_ITEMS.map(({ id, label }) => (
    <li key={id}>
      <a
        href={`#${id}`}
        onClick={(e) => {
          e.preventDefault();
          scrollTo(id);
          setIsMobileMenuOpen(false);
        }}
        className={clsx({ [styles.active]: activeSection === id })}
      >
        {label}
      </a>
    </li>
  ));

  return (
    <nav ref={navRef} className={styles.root} aria-label="Główne menu">
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          scrollTo('hero');
        }}
        aria-label="Powrót do początku"
      >
        <Logo size="small" />
      </a>
      <div className={styles.hamburger}>
        <Button text="Umów prezentację" className={styles.desktopButton} to={calendlyUrl} />
        <Hamburger
          isOpen={isMobileMenuOpen}
          toggle={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
        />
      </div>
      <ul className={clsx(styles.sections, isMobileMenuOpen && styles.open)}>
        {navbarItems}
        <Button text="Umów prezentację" maxWidth className={styles.mobileButton} to={calendlyUrl} />
      </ul>
      <Button text="Umów prezentację" className={styles.desktopOnly} to={calendlyUrl} />
    </nav>
  );
};

export default Navbar;
