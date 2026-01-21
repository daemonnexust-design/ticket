'use client';

import styled from 'styled-components';
import { Container, Flex, Pill, Grid } from '@/components/ui/primitives';
import { EventCard } from '@/components/cards/EventCard';
import type { Event, Category, Venue } from '@/types/database';

const Main = styled.main`
  min-height: 100vh;
`;

const HeroBanner = styled.div`
  position: relative;
  height: 200px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  display: flex;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 160px;
  }
`;

const Breadcrumb = styled.nav`
  position: absolute;
  top: 16px;
  left: 0;
  right: 0;
`;

const BreadcrumbLink = styled.a`
  color: rgba(255, 255, 255, 0.7);
  font-size: ${({ theme }) => theme.typography.sizes.small};
  
  &:hover {
    color: ${({ theme }) => theme.colors.textInverse};
  }
  
  & + &::before {
    content: ' / ';
    margin: 0 8px;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.textInverse};
  text-transform: uppercase;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.75rem;
  }
`;

const FiltersSection = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.cardBg};
`;

const FilterRow = styled(Flex)`
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
`;

const LocationFilter = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${({ theme }) => theme.typography.sizes.body};
  color: ${({ theme }) => theme.colors.textPrimary};
  
  span {
    color: ${({ theme }) => theme.colors.blue};
    text-decoration: underline;
  }
`;

const ResultsSection = styled.section`
  padding: 32px 0;
`;

const ResultsHeader = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ResultsCount = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.h3};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const SortDropdown = styled.select`
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.sizes.body};
  background-color: ${({ theme }) => theme.colors.cardBg};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.blue};
  }
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

interface DiscoveryPageClientProps {
    category: string;
    categoryName: string;
    events: EventWithDetails[];
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

export function DiscoveryPageClient({
    category,
    categoryName,
    events,
}: DiscoveryPageClientProps) {
    return (
        <Main>
            <HeroBanner>
                <Container>
                    <Breadcrumb>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        <BreadcrumbLink href={`/discover/${category}`}>{categoryName}</BreadcrumbLink>
                    </Breadcrumb>
                    <PageTitle>{categoryName}</PageTitle>
                </Container>
            </HeroBanner>

            <FiltersSection>
                <Container>
                    <FilterRow>
                        <LocationFilter>
                            Near <span>Select your location</span>
                        </LocationFilter>

                        <Pill $active>All Dates</Pill>
                        <Pill>This Weekend</Pill>
                        <Pill>This Month</Pill>
                    </FilterRow>
                </Container>
            </FiltersSection>

            <ResultsSection>
                <Container>
                    <ResultsHeader>
                        <ResultsCount>{events.length} Results</ResultsCount>
                        <Flex $gap="16px" $align="center">
                            <span>Sort by:</span>
                            <SortDropdown>
                                <option>Date</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </SortDropdown>
                        </Flex>
                    </ResultsHeader>

                    {events.length > 0 ? (
                        <Grid $columns={4} $gap="24px" $minWidth="280px">
                            {events.map((event) => (
                                <EventCard key={event.id} {...eventToCardProps(event)} />
                            ))}
                        </Grid>
                    ) : (
                        <EmptyState>
                            <h3>No events found in this category</h3>
                            <p>Check back later for upcoming events.</p>
                        </EmptyState>
                    )}
                </Container>
            </ResultsSection>
        </Main>
    );
}
