'use client';

import Button from '@/core/theme/atoms/button';
import Image from 'next/image';
import { JSX } from 'react';
import styles from './Trust.module.scss';

const Trust = (): JSX.Element => {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '#';

  return (
    <section className={styles.root} aria-labelledby="trust-heading">
      <div className={styles.imageWrapper}>
        <Image
          src="/images/trustBackground.png"
          alt="Zrzut ekranu aplikacji Epoca"
          fill
          className={styles.image}
          priority
        />
      </div>

      <div className={styles.content}>
        <h2 id="trust-heading">Zaufali nam prawnicy</h2>

        <p>
          Epoca powstała i była rozwijana wspólnie z zespołami kancelarii prawnych. Każda funkcja, raport i ekran były
          projektowane na realnych przykładach z codziennej pracy. System działa produkcyjnie w kilku kancelariach — od
          obsługi korporacji po zespoły rodzinne czy podatkowe.
        </p>

        <p className={styles.small}>
          Wdrażaliśmy m.in. autoryzację SSO przez Microsoft i Google oraz integrację z wewnętrznymi systemami
          kancelarii. Raporty bezpieczeństwa z testów penetracyjnych udostępniamy do wglądu przy wdrożeniu. Projekt UX
          konsultowaliśmy z prawnikami, co przekłada się na prostotę obsługi i brak potrzeby szkoleń dla zespołu.
        </p>

        <blockquote>
          <p>
            <em>Treść referencji pominięta w publicznym eksporcie.</em>
          </p>
          <footer aria-label="Referencja klienta — dane pominięte">
            <Image src="/svg/reference-placeholder.svg" alt="Logo klienta pominięte" width={46} height={28} />
            <span>Referencja klienta — dane pominięte</span>
          </footer>
        </blockquote>

        <p className={styles.note}>Referencje i opisy wdrożeń udostępniamy na życzenie.</p>

        <Button text="Umów prezentację" aria-label="Umów prezentację" to={calendlyUrl} />
      </div>
    </section>
  );
};

export default Trust;
