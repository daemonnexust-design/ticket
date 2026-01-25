import { createClient } from '@/lib/supabase/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HomePageClient } from './HomePageClient';
import { popularEvents, categories as mockCategories } from '@/lib/mockData';
import type { EventWithDetails, Category, Venue } from '@/types/database';

// Helper to map mock data to DB shape
function mapMockEventToDBEvent(mockEvent: any, categorySlug: string): EventWithDetails {
  const category = mockCategories.find(c => c.slug === categorySlug) || mockCategories[0];

  return {
    id: mockEvent.id,
    slug: mockEvent.slug,
    title: mockEvent.title,
    description: null,
    category_id: 'mock-category-id',
    venue_id: 'mock-venue-id',
    event_date: mockEvent.date,
    event_time: mockEvent.time,
    status: mockEvent.status || 'onsale',
    min_price: 50,
    max_price: 500,
    image_url: mockEvent.imageUrl,
    featured: true,
    created_at: new Date().toISOString(),
    category: {
      id: 'mock-category-id',
      name: category.label,
      slug: category.slug,
      description: null,
      image_url: null,
      created_at: new Date().toISOString(),
    },
    venue: {
      id: 'mock-venue-id',
      name: mockEvent.venue,
      city: mockEvent.city.split(',')[0].trim(),
      state: mockEvent.city.split(',')[1]?.trim() || null,
      country: 'USA',
      address: null,
      capacity: 20000,
      seat_map_svg: null,
      image_url: null,
      created_at: new Date().toISOString(),
    },
  };
}

// Server component to fetch data
async function getHomePageData() {
  const supabase = await createClient();

  // Try to fetch real data
  const { data: dbFeaturedEvents } = await supabase
    .from('events')
    .select(`
      *,
      category:categories(*),
      venue:venues(*)
    `)
    .eq('featured', true)
    .order('event_date', { ascending: true })
    .limit(5);

  const { data: dbAllEvents } = await supabase
    .from('events')
    .select(`
      *,
      category:categories(*),
      venue:venues(*)
    `)
    .order('event_date', { ascending: true });

  const { data: dbCategories } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  // Check if we have DB data
  const hasDbData = dbFeaturedEvents && dbFeaturedEvents.length > 0;

  // Always prepare mock data
  const allMockEvents: EventWithDetails[] = [
    ...popularEvents.concerts.map(e => mapMockEventToDBEvent(e, 'concerts')),
    ...popularEvents.sports.map(e => mapMockEventToDBEvent(e, 'sports')),
    ...popularEvents.arts.map(e => mapMockEventToDBEvent(e, 'arts-theater-comedy')),
    ...popularEvents.family.map(e => mapMockEventToDBEvent(e, 'family')),
  ];

  const mappedMockCategories: Category[] = mockCategories.map(c => ({
    id: `mock-${c.slug}`,
    name: c.label,
    slug: c.slug,
    description: null,
    image_url: null,
    created_at: new Date().toISOString(),
  }));

  // Merge Data
  // If DB has data, use it. If not, rely entirely on mock.
  // Ideally, we might want to interleave, but prepending DB to mock ensures "real" data is first.
  const mergedAllEvents = [
    ...((dbAllEvents as EventWithDetails[]) || []),
    ...allMockEvents
  ];

  // For featured, we can also merge, or just use DB if present + some mock if needed.
  // For now, let's mix them.
  const featuredMockEvents = [
    allMockEvents.find(e => e.category?.slug === 'concerts'),
    allMockEvents.find(e => e.category?.slug === 'sports'),
    allMockEvents.find(e => e.category?.slug === 'arts-theater-comedy'),
    allMockEvents.find(e => e.category?.slug === 'family'),
  ].filter(Boolean) as EventWithDetails[];

  const mergedFeaturedEvents = [
    ...((dbFeaturedEvents as EventWithDetails[]) || []),
    ...featuredMockEvents
  ].slice(0, 8); // Limit total featured

  // Merge categories unique by slug
  const dbCats = dbCategories || [];
  const mergedCategories = [...dbCats];

  mappedMockCategories.forEach(mockCat => {
    if (!mergedCategories.find(c => c.slug === mockCat.slug)) {
      mergedCategories.push(mockCat);
    }
  });

  return {
    featuredEvents: mergedFeaturedEvents,
    allEvents: mergedAllEvents,
    categories: mergedCategories,
  };
}

export default async function HomePage() {
  const { featuredEvents, allEvents, categories } = await getHomePageData();

  // Group events by category
  const eventsByCategory: Record<string, EventWithDetails[]> = {};
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
