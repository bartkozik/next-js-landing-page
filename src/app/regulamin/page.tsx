import Logo from '@/core/theme/atoms/logo';
import { JSX } from 'react';

export default function RegulaminPage(): JSX.Element {
  return (
    <main className="legal-pages">
      <Logo className="logo" />
      <div className="legal-content">
        <h1>Regulamin</h1>
        <p>Treść regulaminu...</p>
      </div>
    </main>
  );
}
