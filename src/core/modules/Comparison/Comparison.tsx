import Button from '@/core/theme/atoms/button';
import { JSX } from 'react';
import styles from './Comparison.module.scss';
import PackageComparisonTable from './components/PackageComparisonTable';

const Comparison = (): JSX.Element => {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '#';

  return (
    <section id="comparison" className={styles.root} aria-labelledby="comparison-heading">
      <h2 id="comparison-heading" className={styles.title}>
        Porównanie pakietów
      </h2>
      <p className={styles.content}>
        Wybierz wariant najlepiej dopasowany do skali i potrzeb swojej kancelarii. Każda opcja zawiera wszystkie
        kluczowe funkcje systemu Epoca, różni się natomiast sposobem wdrożenia, zakresem wsparcia i możliwością
        indywidualnych integracji.
      </p>

      <PackageComparisonTable />

      <p className={styles.cta}>Wybierz wersję i zamów prezentację</p>
      <Button text="Umów prezentację" aria-label="Umów prezentację" to={calendlyUrl} />
    </section>
  );
};

export default Comparison;
