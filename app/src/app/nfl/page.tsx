import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import NFLPageClient from './NFLPageClient';

export default function NFLPage() {
  return (
    <>
      <Header />
      <NFLPageClient />
      <Footer />
    </>
  );
}
