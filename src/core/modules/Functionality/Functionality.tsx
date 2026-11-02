'use client';

import { JSX } from 'react';
import styles from './Functionality.module.scss';
import EpocaFeaturesShowcase, { FeatureSection } from './components/EpocaFeaturesShowcase';

export const EPOCA_FEATURE_SECTIONS: FeatureSection[] = [
  {
    image: '/images/reporting.png',
    title: 'Raportowanie czasu na godziny',
    bullets: [
      'Dokładne raporty czasu pracy dla każdej sprawy i klienta',
      'Rozliczenia prowadzone w jednostkach godzinowych, zgodnie z praktyką kancelarii',
      'Szybkie podsumowania tygodniowe i miesięczne — jednym kliknięciem do Excela/CSV',
      'Możliwość filtrowania wg. sprawy, typu zadania, członka zespołu',
    ],
  },
  {
    image: '/images/sso.png',
    title: 'Single Sign-On / SAML (Microsoft, Google)',
    bullets: [
      'Bezpieczne logowanie przez SSO — integracja z Microsoft, Google i innymi dostawcami SAML',
      'Centralne zarządzanie dostępami dla całej kancelarii, bez ręcznego zakładania kont',
      'Automatyczne odbieranie dostępu po odejściu pracownika z organizacji',
    ],
  },
  {
    image: '/images/externalAccounts.png',
    title: 'Konta zewnętrzne dla klientów',
    bullets: [
      'Możliwość nadania klientowi konta „Gość”, by widział raporty i status swojego projektu',
      'Klient widzi tylko wybrane dane — pełna kontrola po stronie kancelarii',
      'Możliwość komentowania i akceptowania raportów online',
    ],
  },
  {
    image: '/images/advancedReports.png',
    title: 'Zaawansowane raporty i rozliczenia',
    bullets: [
      'Generowanie szczegółowych rozliczeń na podstawie wprowadzonych godzin',
      'Eksport do Excela/CSV – gotowe do przesłania klientowi lub do księgowości',
    ],
  },
  {
    image: '/images/clientManagement.png',
    title: 'Zarządzanie klientami',
    bullets: [
      'Przypisywanie projektów do klientów',
      'Szybkie wyszukiwanie klientów, historia współpracy, archiwum projektów',
    ],
  },
  {
    image: '/images/personalization.png',
    title: 'Personalizacja wyglądu dla klientów i projektów',
    bullets: [
      'Możliwość oznaczania klientów/projektów kolorami i symbolami (np. złoto/drewno/metal)',
      'Intuicyjne rozpoznawanie kluczowych klientów — od razu widzisz, co jest ważne, a co można odłożyć',
      'Możliwość zmiany wyglądu projektów na poziomie interfejsu (np. różne akcenty kolorystyczne)',
    ],
  },
  {
    image: '/images/projectMembers.png',
    title: 'Zarządzanie projektami, członkami i sprawami',
    bullets: [
      'Dodawanie projektów i spraw, przypisywanie członków zespołu, określanie ról i dostępów',
      'Hierarchiczna struktura (np. klient → projekt → identyfikator zadania)',
      'Szybka edycja składu zespołu',
    ],
  },
  {
    image: '/images/drafts.png',
    title: 'Opisy, drafty i szybka edycja',
    bullets: [
      'Możliwość dodawania opisów do wpisów czasu (np. „przygotowanie opinii”, „kontakt z klientem”)',
      'Zapisywanie roboczych wersji wpisów (drafty)',
      'Edycja wpisów przez drag & drop, autokorekta dat i formatów',
    ],
  },
  {
    image: '/images/language.png',
    title: 'Pełna wersja anglojęzyczna',
    bullets: [
      'Interfejs dostępny w całości po angielsku (i polsku) — dla kancelarii międzynarodowych lub zespołów mieszanych',
      'Możliwość ustawienia języka indywidualnie na poziomie użytkownika',
    ],
  },
  {
    image: '/images/roles.png',
    title: 'Role i uprawnienia: Administrator, Manager, Pracownik, Gość',
    bullets: [
      'Precyzyjnie zdefiniowane role:',
      [
        'Administrator: Pełna kontrola, zarządzanie infrastrukturą i użytkownikami',
        'Manager: Zarządzanie projektami, przydzielanie zadań',
        'Pracownik: Rejestrowanie czasu, edycja własnych wpisów',
        'Gość: Podgląd wybranych danych/projektów',
      ],
      'Możliwość indywidualnego nadawania dostępu na poziomie projektu/sprawy',
    ],
  },
];

export const Functionality = (): JSX.Element => {
  return (
    <section id="functionality" className={styles.root} aria-labelledby="functionality-heading">
      <h2 id="functionality-heading" className={styles.title}>
        Co potrafi Epoca?
      </h2>
      <EpocaFeaturesShowcase sections={EPOCA_FEATURE_SECTIONS} />
    </section>
  );
};

export default Functionality;
