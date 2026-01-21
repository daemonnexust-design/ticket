import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import NBAPageClient from './NBAPageClient';

export default function NBAPage() {
    return (
        <>
            <Header />
            <NBAPageClient />
            <Footer />
        </>
    );
}
