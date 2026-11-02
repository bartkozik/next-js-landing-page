import Logo from '@/core/theme/atoms/logo';
import { JSX } from 'react';

export default function PolitykaPrywatnosciPage(): JSX.Element {
  return (
    <main className="legal-pages">
      <Logo className="logo" />
      <div className="legal-content">
        <h1>Polityka Prywatności</h1>
        <p>Treść polityki prywatności...</p>
      </div>
    </main>
  );
}
