import { JSX } from 'react';
import styles from './CompetitiveComparison.module.scss';
import ComparisonTable from './components/ComparisonTable';
import FeaturesIconsSection from './components/FeaturesIconsSection';

export const CompetitiveComparison = (): JSX.Element => {
  return (
    <section className={styles.root} aria-labelledby="comparison-heading">
      <h2 id="comparison-heading" className={styles.title}>
        Epoca vs konkurencja
      </h2>
      <ComparisonTable />
      <h3 className={styles.subsectionTitle}>Wszystkie te elementy łączą się w jeden, jasny argument…</h3>
      <FeaturesIconsSection />
    </section>
  );
};

export default CompetitiveComparison;
