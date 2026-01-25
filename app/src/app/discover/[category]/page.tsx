import { createClient } from '@/lib/supabase/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DiscoveryPageClient } from './DiscoveryPageClient';
import { popularEvents, categories as mockCategories } from '@/lib/mockData';
import type { EventWithDetails, Category, Venue } from '@/types/database';

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

// Map category slug to mock data key
const mockDataKeys: Record<string, keyof typeof popularEvents> = {
  concerts: 'concerts',
  sports: 'sports',
  'arts-theater-comedy': 'arts',
  family: 'family',
};

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
    featured: false,
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

export default async function DiscoverPage({ params }: PageProps) {
  const { category } = await params;
  const categoryName = categoryNames[category] || 'Events';

  const supabase = await createClient();

  // Fetch events for this category
  const { data: dbEvents } = await supabase
    .from('events')
    .select(`
      *,
      category:categories(*),
      venue:venues(*)
    `)
    .eq('category.slug', category)
    .order('event_date', { ascending: true });

  // Always prepare mock data
  const mockKey = mockDataKeys[category];
  const categoryMockEvents = mockKey ? popularEvents[mockKey] : [];
  let mockEvents: EventWithDetails[] = [];

  if (categoryMockEvents) {
    mockEvents = categoryMockEvents.map(e => mapMockEventToDBEvent(e, category));
  }

  // Merge Data
  // We want to show everything we have.
  // DB events first, then mock events.
  // Filter out any duplicates if slug exists in both (though highly unlikely with random IDs)
  const dbEventsSafe = (dbEvents as EventWithDetails[]) || [];

  const events = [
    ...dbEventsSafe,
    ...mockEvents.filter(me => !dbEventsSafe.find(de => de.slug === me.slug))
  ];

  return (
    <>
      <Header />
      <DiscoveryPageClient
        category={category}
        categoryName={categoryName}
        events={events}
      />
      <Footer />
    </>
  );
}
