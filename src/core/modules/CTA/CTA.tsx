import Button from '@/core/theme/atoms/button';
import { JSX } from 'react';
import styles from './CTA.module.scss';

const CTA = (): JSX.Element => {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '#';

  return (
    <section className={styles.root} aria-labelledby="cta-heading">
      <h2 id="cta-heading" className={styles.visuallyHidden}>
        Sprawdź, jak Epoca usprawni rozliczenia w Twojej kancelarii. Umów prezentację online.
      </h2>
      <p>
        Sprawdź, jak Epoca <strong>usprawni rozliczenia</strong> w Twojej kancelarii. Umów prezentację online.
      </p>
      <Button text="Umów się na demo" to={calendlyUrl} aria-label="Umów się na demo" />
    </section>
  );
};

export default CTA;
