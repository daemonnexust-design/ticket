import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { EventPageClient } from './EventPageClient';

export default function EventPage({ params }: { params: { id: string } }) {
  return (
    <>
      <Header />
      <EventPageClient />
      <Footer />
    </>
  );
}
