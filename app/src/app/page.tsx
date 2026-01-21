import { createClient } from '@/lib/supabase/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HomePageClient } from './HomePageClient';

// Server component to fetch data
async function getHomePageData() {
  const supabase = await createClient();

  // Fetch featured events
  const { data: featuredEvents } = await supabase
    .from('events')
    .select(`
      *,
      category:categories(*),
      venue:venues(*)
    `)
    .eq('featured', true)
    .order('event_date', { ascending: true })
    .limit(5);

  // Fetch all events grouped by category
  const { data: allEvents } = await supabase
    .from('events')
    .select(`
      *,
      category:categories(*),
      venue:venues(*)
    `)
    .order('event_date', { ascending: true });

  // Fetch categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  return {
    featuredEvents: featuredEvents || [],
    allEvents: allEvents || [],
    categories: categories || [],
  };
}

export default async function HomePage() {
  const { featuredEvents, allEvents, categories } = await getHomePageData();

  // Group events by category
  const eventsByCategory: Record<string, typeof allEvents> = {};
  categories.forEach(cat => {
    eventsByCategory[cat.slug] = allEvents.filter(
      event => event.category?.slug === cat.slug
    );
  });

  return (
    <>
      <Header />
      <HomePageClient
        featuredEvents={featuredEvents}
        eventsByCategory={eventsByCategory}
        categories={categories}
      />
      <Footer />
    </>
  );
}
