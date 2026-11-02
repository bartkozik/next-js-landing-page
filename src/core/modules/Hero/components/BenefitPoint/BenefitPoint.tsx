import Image from 'next/image';
import React from 'react';
import styles from './BenefitPoint.module.scss';

type BenefitPointProps = {
  icon: string;
  area: string;
  bullets: string[];
};

const BenefitPoint = ({ icon, area, bullets }: BenefitPointProps): React.JSX.Element => {
  return (
    <div className={styles.root}>
      <div className={styles.circle}>{icon && <Image src={icon} alt={area} width={48} height={48} />}</div>
      <div className={styles.bulletsWrapper}>
        <h3 className={styles.area}>{area}</h3>
        <ul className={styles.bullets}>
          {bullets.map((bullet, idx) => (
            <li key={idx}>{bullet}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BenefitPoint;
