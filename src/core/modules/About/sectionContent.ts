export type CalloutBlock = { type: 'callout'; text: string };
export type ParagraphBlock = { type: 'paragraph'; text: string };
export type ListBlock = { type: 'list'; items: string[] };
export type BulletsBlock = { type: 'bullets'; entries: { title: string; content: string }[] };

export type SectionBlock = CalloutBlock | ParagraphBlock | ListBlock | BulletsBlock;

export interface Section {
  id: string;
  title: string;
  blocks: SectionBlock[];
}

export const WHY_EPOCA_SECTIONS: Section[] = [
  {
    id: 'legal-solution',
    title: 'Dedykowane rozwiązanie dla branży prawnej',
    blocks: [
      { type: 'callout', text: 'Nisza prawnicza zamiast „dla wszystkich wolnych zawodów”' },

      {
        type: 'paragraph',
        text: 'Większość popularnych time trackerów (Toggl, Clockify, Everhour, TimeCamp) celuje w freelancerów lub zespoły IT, mierząc czas w sekundach/minutach i kładąc nacisk na maksymalną elastyczność. Dla prawników, którzy rozliczają zlecenia godzinowo lub ryczałtowo, model „każda minuta się liczy” nie odzwierciedla realiów kancelarii. Epoca została zaprojektowana tak, aby:',
      },

      {
        type: 'list',
        items: [
          'Uwzględnić standardowe jednostki rozliczeniowe (godziny/dni).',
          'Umożliwić prostą segmentację czasu na poszczególne sprawy czy stałe stawki godzinowe.',
          'Uniknąć nadmiarowych funkcji służących tylko do „mierzenia sekund i pokazywania wykresów”.',
        ],
      },

      { type: 'callout', text: 'Praktyczne scenariusze prawnicze' },

      {
        type: 'list',
        items: [
          'Rozliczenia za konsultacje telefoniczne, spotkania czy analizę dokumentów w godzinach.',
          'Prosty import/eksport zestawień do dokumentów w MS Word czy Excel, zgodnie z praktykami prawniczymi.',
          'Możliwość szybkiego przypisania czasu do klienta, sprawy i typu usługi (np. porada, zastępstwo procesowe, opinia).',
        ],
      },
    ],
  },

  /* 2. On-premise i pełna kontrola nad danymi */
  {
    id: 'on-premise-control',
    title: 'On-premise i pełna kontrola nad danymi',
    blocks: [
      { type: 'callout', text: 'Własna infrastruktura zamiast chmury publicznej' },

      {
        type: 'paragraph',
        text: 'Konkurencyjne rozwiązania SaaS (Everhour, TimeCamp, Hubstaff) przechowują dane w chmurze dostawcy. Dla kancelarii prawnych oznacza to konieczność weryfikacji zgodności z RODO, archiwizacji danych w konkretnym regionie czy uzależnienie od zewnętrznych polityk bezpieczeństwa. Epoca oferuje wdrożenie on-premise, co daje:',
      },

      {
        type: 'list',
        items: [
          'Dane klientów i historii rozliczeń wyłącznie w infrastrukturze kancelarii.',
          'Łatwiejsze spełnienie audytów wewnętrznych i zewnętrznych (np. kontrole RODO, standardy bezpieczeństwa).',
          'Brak uzależnienia od usług trzecich (dostawców chmury publicznej).',
        ],
      },

      { type: 'callout', text: 'Szyfrowanie end-to-end i architektura klucza prywatnego' },

      {
        type: 'list',
        items: [
          'Każdy rekord czasu i notatka są szyfrowane po stronie serwera kancelarii.',
          'Klucz prywatny jest przechowywany lokalnie, co eliminuje ryzyko nieautoryzowanego dostępu („nawet dostawca oprogramowania nie może odczytać wpisów”).',
          'Przygotowane procedury do wewnętrznych pen-testów i audytów bezpieczeństwa.',
        ],
      },

      { type: 'callout', text: 'Zgodność z wymaganiami audytowymi' },

      {
        type: 'list',
        items: [
          'Możliwość integracji z wewnętrznymi systemami SIEM lub DMS kancelarii.',
          'Logi aktywności przechowywane w formacie umożliwiającym szybki przegląd i raportowanie.',
          'Jasne procedury backupu i archiwizacji – w standardzie harmonogramy codziennego, tygodniowego i miesięcznego.',
        ],
      },
    ],
  },

  /* 3. Branding i wizerunek kancelarii */
  {
    id: 'branding',
    title: 'Branding i wizerunek kancelarii',
    blocks: [
      { type: 'callout', text: 'Spójna identyfikacja wizualna' },

      {
        type: 'list',
        items: [
          'Epoca umożliwia pełną personalizację interfejsu: własne logo, kolory firmowe, typografię.',
          'Pracownicy i klienci korzystają z narzędzia, które nie zaburza tożsamości kancelarii.',
          'UI zaprojektowane z myślą o powadze i elegancji – bez krzykliwych badge’y czy gamifikacji.',
        ],
      },

      { type: 'callout', text: 'Profesjonalny przekaz do klienta' },

      {
        type: 'list',
        items: [
          'Raporty godzinowe (PDF/Excel) wysyłane klientowi są od początku do końca w brandingu kancelarii.',
          'E-mail API automatycznie generuje wiadomości z brandowanym nagłówkiem (nazwa, logo, kolorystyka).',
          'Dokumenty pozbawione śladów zewnętrznej platformy wzmacniają profesjonalny wizerunek.',
        ],
      },
    ],
  },

  /* 4. Prostota i oszczędność czasu */
  {
    id: 'simplicity-speed',
    title: 'Prostota i oszczędność czasu',
    blocks: [
      { type: 'callout', text: 'Intuicyjny interfejs bez wymaganych szkoleń' },

      {
        type: 'list',
        items: [
          'Nowy pracownik po dwóch–trzech kliknięciach wie, jak uruchomić timer czy wygenerować raport.',
          'Brak złożonych konfiguracji – wystarczy jednorazowo ustawić podstawowe parametry spraw.',
        ],
      },

      { type: 'callout', text: 'Szybkie raportowanie i edycja' },

      {
        type: 'list',
        items: [
          'W kilka sekund można wprowadzić poprawki do wielu wpisów (drag & drop, multi-select).',
          'Automatyczne archiwum tygodniowe i miesięczne – zestawienia gotowe do wysyłki.',
          'Eksport do Excel/CSV w jednym kliknięciu – dane gotowe do dalszej analizy lub importu.',
        ],
      },

      { type: 'callout', text: 'Uniknięcie „feature bloat”' },

      {
        type: 'paragraph',
        text: 'Zamiast dodawać funkcje dla każdego (np. Agile, Gantty, zaawansowane budżety), Epoca skupia się na:',
      },

      {
        type: 'list',
        items: [
          'Mierzeniu czasu w godzinach/dniach.',
          'Generowaniu czytelnych zestawień.',
          'Utrzymaniu prostoty obsługi – skróty klawiszowe i drag & drop.',
        ],
      },
    ],
  },
];
