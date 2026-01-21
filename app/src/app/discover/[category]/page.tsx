import { createClient } from '@/lib/supabase/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DiscoveryPageClient } from './DiscoveryPageClient';

interface PageProps {
  params: Promise<{ category: string }>;
}

// Category name mapping
const categoryNames: Record<string, string> = {
  concerts: 'Concert Tickets',
  sports: 'Sports Tickets',
  'arts-theater-comedy': 'Arts, Theater & Comedy Tickets',
  family: 'Family Event Tickets',
};

export default async function DiscoverPage({ params }: PageProps) {
  const { category } = await params;
  const categoryName = categoryNames[category] || 'Events';

  const supabase = await createClient();

  // Fetch events for this category
  const { data: events } = await supabase
    .from('events')
    .select(`
      *,
      category:categories(*),
      venue:venues(*)
    `)
    .eq('category.slug', category)
    .order('event_date', { ascending: true });

  return (
    <>
      <Header />
      <DiscoveryPageClient
        category={category}
        categoryName={categoryName}
        events={events || []}
      />
      <Footer />
    </>
  );
}
