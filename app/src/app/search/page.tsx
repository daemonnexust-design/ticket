import { createClient } from '@/lib/supabase/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SearchPageClient } from './SearchPageClient';
import { popularEvents, categories as mockCategories } from '@/lib/mockData';
import type { EventWithDetails, Category, Venue } from '@/types/database';

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

// Helper to map mock data
function mapMockEventToDBEvent(mockEvent: any): EventWithDetails {
  // Try to determine category slug from ID prefix or context. 
  // Here we'll guess or default to 'concerts' if unknown, but usually we know context.
  // For search, we iterate all popularEvents, so we know which array it came from.
  // Actually, we can just pass category slug in the map loop.
  return mapMockEventToDBEventWithSlug(mockEvent, 'concerts'); // specific logic below
}

function mapMockEventToDBEventWithSlug(mockEvent: any, categorySlug: string): EventWithDetails {
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

export default async function SearchPage({ searchParams }: PageProps) {
  const { q: query = '' } = await searchParams;
  const searchLower = query.toLowerCase();

  const supabase = await createClient();

  // Search events in DB
  const { data: dbEvents } = await supabase
    .from('events')
    .select(`
      *,
      category:categories(*),
      venue:venues(*)
    `)
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .order('featured', { ascending: false })
    .order('event_date', { ascending: true });

  // Search in Mock Data
  let mockResults: EventWithDetails[] = [];
  if (query) {
    Object.entries(popularEvents).forEach(([catSlug, events]) => {
      const matches = events.filter(e =>
        e.title.toLowerCase().includes(searchLower) ||
        e.venue.toLowerCase().includes(searchLower) ||
        e.city.toLowerCase().includes(searchLower)
      );
      mockResults.push(...matches.map(e => mapMockEventToDBEventWithSlug(e, catSlug)));
    });
  }

  // Merge Results
  const dbSafe = (dbEvents as EventWithDetails[]) || [];
  const mergedEvents = [
    ...dbSafe,
    ...mockResults.filter(me => !dbSafe.find(de => de.slug === me.slug))
  ];

  // Get all events for suggestions (from DB primarily for now)
  const { data: allDbEvents } = await supabase
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
        events={mergedEvents}
        suggestions={(allDbEvents as EventWithDetails[]) || []}
      />
      <Footer />
    </>
  );
}
