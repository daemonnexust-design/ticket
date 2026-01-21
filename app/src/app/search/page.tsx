import { createClient } from '@/lib/supabase/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SearchPageClient } from './SearchPageClient';

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q: query = '' } = await searchParams;

  const supabase = await createClient();

  // Search events
  const { data: events } = await supabase
    .from('events')
    .select(`
      *,
      category:categories(*),
      venue:venues(*)
    `)
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .order('featured', { ascending: false })
    .order('event_date', { ascending: true });

  // Get all events for suggestions
  const { data: allEvents } = await supabase
    .from('events')
    .select(`
      *,
      category:categories(*),
      venue:venues(*)
    `)
    .order('featured', { ascending: false })
    .limit(6);

  return (
    <>
      <Header />
      <SearchPageClient
        query={query}
        events={events || []}
        suggestions={allEvents || []}
      />
      <Footer />
    </>
  );
}
