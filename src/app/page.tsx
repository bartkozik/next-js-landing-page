import About from '@/core/modules/About';
import CTA from '@/core/modules/CTA';
import Comparison from '@/core/modules/Comparison';
import CompetitiveComparison from '@/core/modules/CompetitiveComparison';
import FAQ from '@/core/modules/FAQ';
import Footer from '@/core/modules/Footer';
import Functionality from '@/core/modules/Functionality';
import Hero from '@/core/modules/Hero';
import Navbar from '@/core/modules/Navbar';
import Trust from '@/core/modules/Trust';
import ScrollToTopButton from '@/core/theme/atoms/scrollToTop';
import { JSX } from 'react';

export const metadata = {
  title: 'Epoca – Zarządzaj sprawnie czasem pracy zespołu',
  description:
    'Nowoczesne, intuicyjne narzędzie do raportowania czasu pracy. Porównuj, analizuj i zwiększ efektywność swojego zespołu dzięki Epoca.',
};

export default function HomePage(): JSX.Element {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Hero />
        <About />
        <CompetitiveComparison />
        <Functionality />
        <Trust />
        <Comparison />
        <FAQ />
        <CTA />
      </main>
      <footer>
        <Footer />
      </footer>
      <ScrollToTopButton />
    </>
  );
}
