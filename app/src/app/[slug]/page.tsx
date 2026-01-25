import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArtistPageClient } from './ArtistPageClient';

export default function ArtistPage({ params }: { params: { slug: string } }) {
    return (
        <>
            <Header />
            <ArtistPageClient slug={params.slug} />
            <Footer />
        </>
    );
}
