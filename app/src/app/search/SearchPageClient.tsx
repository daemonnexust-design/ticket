'use client';

import styled from 'styled-components';
import { Container, Flex } from '@/components/ui/primitives';
import { EventCardHorizontal } from '@/components/cards/EventCard';
import { HorizontalScroll } from '@/components/carousel/Carousel';
import type { Event, Category, Venue } from '@/types/database';

const Main = styled.main`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.bodyBg};
`;

const ResultsHeader = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.cardBg};
`;

const ResultsTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes.h2};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Section = styled.section`
  padding: 32px 0;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.h3};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 16px;
`;

const SortDropdown = styled.select`
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.sizes.body};
  background-color: ${({ theme }) => theme.colors.cardBg};
  cursor: pointer;
`;

const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const EventListItem = styled.article`
  display: flex;
  gap: 16px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const EventImage = styled.img`
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    height: 160px;
  }
`;

const EventInfo = styled.div`
  flex: 1;
`;

const EventDate = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.small};
  color: ${({ theme }) => theme.colors.blue};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  margin-bottom: 4px;
`;

const EventTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.body};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 4px;
`;

const EventVenue = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.small};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

type EventWithDetails = Event & {
    category: Category | null;
    venue: Venue | null;
};

interface SearchPageClientProps {
    query: string;
    events: EventWithDetails[];
    suggestions: EventWithDetails[];
}

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

export function SearchPageClient({
    query,
    events,
    suggestions,
}: SearchPageClientProps) {
    return (
        <Main>
            <ResultsHeader>
                <Container>
                    <ResultsTitle>
                        {events.length} Results for &quot;{query || 'all events'}&quot;
                    </ResultsTitle>
                </Container>
            </ResultsHeader>

            {/* Top Suggestions */}
            <Section>
                <Container>
                    <SectionTitle>Top Suggestions</SectionTitle>
                    <HorizontalScroll>
                        {suggestions.map((event) => (
                            <EventCardHorizontal key={event.id} {...eventToCardProps(event)} />
                        ))}
                    </HorizontalScroll>
                </Container>
            </Section>

            {/* Event List */}
            <Section>
                <Container>
                    <Flex $justify="space-between" $align="center">
                        <SectionTitle>Events • {events.length} Results</SectionTitle>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>Sort by:</span>
                            <SortDropdown>
                                <option>Relevance</option>
                                <option>Date</option>
                                <option>Price</option>
                            </SortDropdown>
                        </div>
                    </Flex>

                    {events.length > 0 ? (
                        <EventList>
                            {events.map((event) => {
                                const dateObj = new Date(event.event_date);
                                const formattedDate = dateObj.toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                });

                                return (
                                    <EventListItem key={event.id}>
                                        <EventImage
                                            src={event.image_url || 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=225&fit=crop'}
                                            alt={event.title}
                                        />
                                        <EventInfo>
                                            <EventDate>{formattedDate} • {event.event_time?.slice(0, 5)}</EventDate>
                                            <EventTitle>{event.title}</EventTitle>
                                            <EventVenue>
                                                {event.venue?.name} • {event.venue?.city}, {event.venue?.state}
                                            </EventVenue>
                                        </EventInfo>
                                    </EventListItem>
                                );
                            })}
                        </EventList>
                    ) : (
                        <EmptyState>
                            <h3>No events found</h3>
                            <p>Try a different search term.</p>
                        </EmptyState>
                    )}
                </Container>
            </Section>
        </Main>
    );
}
