import { Suspense } from 'react';
import { PaymentPageClient } from './PaymentPageClient';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function PaymentPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading payment details...</div>}>
        <PaymentPageClient />
      </Suspense>
      <Footer />
    </>
  );
}
