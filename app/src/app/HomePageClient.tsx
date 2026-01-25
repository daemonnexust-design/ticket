'use client';

import styled from 'styled-components';
import { useState } from 'react';
import { Container, Flex, Pill, Grid } from '@/components/ui/primitives';
import { HeroCarousel, HorizontalScroll } from '@/components/carousel/Carousel';
import { EventCard, EventCardHorizontal } from '@/components/cards/EventCard';
import { CityCard } from '@/components/cards/HeroCard';
import { ArrowRightIcon } from '@/components/ui/icons';
import type { Event, Category, Venue } from '@/types/database';
import { AdSidebar } from '@/components/home/AdSidebar';

// Page Styles
const Main = styled.main`
  min-height: 100vh;
`;

const Section = styled.section`
  padding: 32px 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 24px 0;
  }
`;

const SectionHeader = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.h2};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const SeeAllLink = styled.a`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.blue};
  font-size: ${({ theme }) => theme.typography.sizes.body};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  &:hover {
    text-decoration: underline;
  }
`;

const TrendingSection = styled(Section)`
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const TrendingPills = styled(Flex)`
  gap: 12px;
  flex-wrap: wrap;
`;

const CategoryTabs = styled(Flex)`
  gap: 8px;
  margin-bottom: 24px;
  overflow-x: auto;
  padding-bottom: 8px;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Touch target improvement */
  padding: 8px 4px; 
  -webkit-overflow-scrolling: touch;
`;

const CategoryTab = styled.button<{ $active?: boolean }>`
  padding: 8px 16px;
  font-size: ${({ theme }) => theme.typography.sizes.body};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ $active, theme }) =>
        $active ? theme.colors.blue : theme.colors.textSecondary};
  background: none;
  border: none;
  border-bottom: 2px solid ${({ $active, theme }) =>
        $active ? theme.colors.blue : 'transparent'};
  transition: all ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;
  
  &:hover {
    color: ${({ theme }) => theme.colors.blue};
  }
`;

const CitiesSection = styled(Section)`
  background-color: ${({ theme }) => theme.colors.bodyBg};
`;

// Types
const ContentGrid = styled.div`
  display: flex;
  align-items: flex-start;
  max-width: 100%;
`;

const MainContent = styled.div`
  flex: 1;
  min-width: 0; /* Prevent overflow */
  max-width: 100%;
`;

type EventWithDetails = Event & {
    category: Category | null;
    venue: Venue | null;
};

interface HomePageClientProps {
    featuredEvents: EventWithDetails[];
    eventsByCategory: Record<string, EventWithDetails[]>;
    categories: Category[];
}

// Trending searches (static for now)
const trendingSearches = [
    'Taylor Swift',
    'Bad Bunny',
    'Beyoncé',
    'NBA',
    'Hamilton',
    'Morgan Wallen',
];

// Popular cities (static for now)
const popularCities = [
    {
        name: 'New York City',
        imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=200&h=267&fit=crop',
        href: '/cities/new-york',
    },
    {
        name: 'Los Angeles',
        imageUrl: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=200&h=267&fit=crop',
        href: '/cities/los-angeles',
    },
    {
        name: 'Las Vegas',
        imageUrl: 'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=200&h=267&fit=crop',
        href: '/cities/las-vegas',
    },
    {
        name: 'Chicago',
        imageUrl: 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=200&h=267&fit=crop',
        href: '/cities/chicago',
    },
];

// Convert event to hero slide format
function eventToHeroSlide(event: EventWithDetails) {
    return {
        id: event.id,
        title: event.title,
        category: event.category?.name || 'Event',
        imageUrl: event.image_url || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=500&fit=crop',
        href: `/${event.slug}/event/${event.id}`,
        ctaText: 'Find Tickets',
    };
}

// Convert event to card props
function eventToCardProps(event: EventWithDetails) {
    return {
        id: event.id,
        slug: event.slug,
        title: event.title,
        venue: event.venue?.name || 'TBA',
        city: event.venue ? `${event.venue.city}, ${event.venue.state}` : 'TBA',
        date: event.event_date,
        time: event.event_time?.slice(0, 5) || 'TBA',
        imageUrl: event.image_url || 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=225&fit=crop',
        status: event.status as 'presale' | 'onsale' | 'cancelled' | undefined,
    };
}

import { RecentlyViewedEvents } from '@/components/home/RecentlyViewedEvents';
import { useRouter } from 'next/navigation';

export function HomePageClient({
    featuredEvents,
    eventsByCategory,
    categories,
}: HomePageClientProps) {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState(categories[0]?.slug || 'concerts');

    // Get events for active category
    const categoryEvents = eventsByCategory[activeCategory] || [];

    // Create hero slides from featured events
    const heroSlides = featuredEvents.length > 0
        ? featuredEvents.map(eventToHeroSlide)
        : [
            {
                id: 'placeholder',
                title: 'Discover Live Events',
                category: 'Featured',
                imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=500&fit=crop',
                href: '/discover/concerts',
                ctaText: 'Browse Events',
            },
        ];

    const handleSearch = (term: string) => {
        router.push(`/search?q=${encodeURIComponent(term)}`);
    };



    // ... inside HomePageClient
    return (
        <Main>
            {/* Highlights / Hero Carousel */}
            <Section>
                <Container>
                    <SectionTitle style={{ marginBottom: '16px' }}>Highlights</SectionTitle>
                    <HeroCarousel slides={heroSlides} />
                </Container>
            </Section>

            {/* Quick Category Pills */}
            <Section style={{ paddingTop: 0, paddingBottom: '16px' }}>
                <Container>
                    <TrendingPills style={{ justifyContent: 'center', gap: '16px' }}>
                        {categories.map(cat => (
                            <Pill
                                key={cat.slug}
                                onClick={() => setActiveCategory(cat.slug)}
                                style={{
                                    background: activeCategory === cat.slug ? '#026cdf' : 'white',
                                    color: activeCategory === cat.slug ? 'white' : '#026cdf',
                                    border: '1px solid #026cdf',
                                    padding: '12px 24px',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                {cat.name}
                            </Pill>
                        ))}
                    </TrendingPills>
                </Container>
            </Section>

            {/* Trending Searches */}
            <TrendingSection>
                <Container>
                    <SectionTitle style={{ marginBottom: '16px' }}>Trending Searches</SectionTitle>
                    <TrendingPills>
                        {trendingSearches.map((search) => (
                            <Pill
                                key={search}
                                onClick={() => handleSearch(search)}
                                style={{ cursor: 'pointer' }}
                            >
                                {search}
                            </Pill>
                        ))}
                    </TrendingPills>
                </Container>
            </TrendingSection>

            {/* Recently Viewed */}
            <RecentlyViewedEvents />

            <Container>
                <ContentGrid>
                    <MainContent>
                        {/* Popular Near You */}
                        <Section style={{ paddingTop: 0 }}>
                            <SectionHeader>
                                <SectionTitle>Popular Near You</SectionTitle>
                                <SeeAllLink href={`/discover/${activeCategory}`}>
                                    See All {categories.find(c => c.slug === activeCategory)?.name}
                                    <ArrowRightIcon />
                                </SeeAllLink>
                            </SectionHeader>

                            <CategoryTabs>
                                {categories.map((category) => (
                                    <CategoryTab
                                        key={category.slug}
                                        $active={activeCategory === category.slug}
                                        onClick={() => setActiveCategory(category.slug)}
                                    >
                                        {category.name}
                                    </CategoryTab>
                                ))}
                            </CategoryTabs>

                            <HorizontalScroll>
                                {categoryEvents.length > 0 ? (
                                    categoryEvents.map((event) => (
                                        <EventCardHorizontal
                                            key={event.id}
                                            {...eventToCardProps(event)}
                                        />
                                    ))
                                ) : (
                                    <p>No events in this category yet.</p>
                                )}
                            </HorizontalScroll>
                        </Section>

                        {/* Popular Cities */}
                        <CitiesSection>
                            <SectionHeader>
                                <SectionTitle>Popular Cities</SectionTitle>
                                <SeeAllLink href="/cities">
                                    Discover More
                                    <ArrowRightIcon />
                                </SeeAllLink>
                            </SectionHeader>

                            <HorizontalScroll>
                                {popularCities.map((city) => (
                                    <CityCard
                                        key={city.name}
                                        {...city}
                                    />
                                ))}
                            </HorizontalScroll>
                        </CitiesSection>

                        {/* Featured Events Grid */}
                        <Section>
                            <SectionHeader>
                                <SectionTitle>Don&apos;t Miss These Events</SectionTitle>
                            </SectionHeader>

                            <Grid $columns={3} $gap="24px" $minWidth="220px">
                                {featuredEvents.slice(0, 6).map((event) => (
                                    <EventCard key={event.id} {...eventToCardProps(event)} />
                                ))}
                            </Grid>
                        </Section>
                    </MainContent>

                    <AdSidebar />
                </ContentGrid>
            </Container>
        </Main>
    );
}
