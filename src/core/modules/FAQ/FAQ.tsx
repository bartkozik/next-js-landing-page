'use client';

import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { JSX, useState } from 'react';
import { FaPlus as PlusIcon, FaMinus as MinusIcon } from 'react-icons/fa';
import styles from './FAQ.module.scss';

const faqItems = [
  {
    question: 'Czy mogę wdrożyć system na własnych serwerach?',
    answer: 'Tak, Epoca jest przygotowana do wdrożenia on-premise, bez konieczności korzystania z chmury publicznej.',
  },
  {
    question: 'Czy mogę użyć własnego systemu logowania?',
    answer: 'Tak, obsługujemy SSO przez SAML – Microsoft, Google i inni dostawcy.',
  },
  {
    question: 'Czy moi klienci mogą zobaczyć tylko swoje projekty?',
    answer: 'Konta typu „Gość” mają dostęp wyłącznie do wybranych danych i raportów własnych spraw.',
  },
  {
    question: 'Czy można wyeksportować dane do Excela lub PDF?',
    answer: 'Tak, każdy raport można jednym kliknięciem pobrać w formacie Excel.',
  },
  {
    question: 'Czy system obsługuje język angielski?',
    answer: 'Tak, pełna wersja anglojęzyczna jest dostępna od razu.',
  },
  {
    question: 'Czy mogę zmieniać branding i wygląd systemu?',
    answer: 'Tak, interfejs i dokumenty mogą być dostosowane do kolorystyki, logo i stylu kancelarii.',
  },
  {
    question: 'Jak wygląda wsparcie techniczne?',
    answer: 'Oferujemy wsparcie mailowe i wdrożeniowe – szybkie odpowiedzi, bez call center.',
  },
];

const FAQ = (): JSX.Element => {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set([0]));

  const toggleIndex = (index: number): void => {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);

      return next;
    });
  };

  return (
    <section id="faq" className={styles.root} aria-labelledby="faq-heading">
      <h2 id="faq-heading" className={styles.title}>
        FAQ
      </h2>
      <ul className={styles.list}>
        {faqItems.map((item, index) => (
          <li
            onClick={() => toggleIndex(index)}
            key={index}
            className={clsx(styles.item, { [styles.firstItem]: index === 0 })}
          >
            <button
              className={styles.question}
              aria-expanded={openIndexes.has(index)}
              aria-controls={`faq-answer-${index}`}
            >
              <span>{item.question}</span>
              {openIndexes.has(index) ? (
                <MinusIcon size={16} className={styles.icon} />
              ) : (
                <PlusIcon size={16} className={styles.icon} />
              )}
            </button>
            <AnimatePresence initial={false}>
              {openIndexes.has(index) && (
                <motion.div
                  id={`faq-answer-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className={styles.answer}>{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FAQ;
