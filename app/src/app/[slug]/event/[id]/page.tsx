import { createClient } from '@/lib/supabase/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { EventDetailClient } from './EventDetailClient';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string; id: string }>;
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug, id } = await params;

  const supabase = await createClient();

  // Fetch event with relations
  const { data: event, error } = await supabase
    .from('events')
    .select(`
      *,
      category:categories(*),
      venue:venues(*)
    `)
    .eq('id', id)
    .single();

  if (error || !event) {
    notFound();
  }

  // Fetch tickets for this event
  const { data: tickets } = await supabase
    .from('tickets')
    .select('*')
    .eq('event_id', id)
    .eq('available', true)
    .order('price', { ascending: true });

  return (
    <>
      <Header />
      <EventDetailClient
        event={event}
        tickets={tickets || []}
        slug={slug}
      />
      <Footer />
    </>
  );
}
