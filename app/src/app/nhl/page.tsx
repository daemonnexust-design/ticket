import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import NHLPageClient from './NHLPageClient';

export default function NHLPage() {
  return (
    <>
      <Header />
      <NHLPageClient />
      <Footer />
    </>
  );
}
