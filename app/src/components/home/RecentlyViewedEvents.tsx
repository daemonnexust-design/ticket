'use client';

import styled from 'styled-components';
import { Container, Flex } from '@/components/ui/primitives';
import { HorizontalScroll } from '@/components/carousel/Carousel';
import { EventCardHorizontal } from '@/components/cards/EventCard';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { ArrowRightIcon } from '@/components/ui/icons';

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

export function RecentlyViewedEvents() {
    const { items, isLoaded } = useRecentlyViewed();

    if (!isLoaded || items.length === 0) return null;

    return (
        <Section>
            <Container>
                <SectionHeader>
                    <SectionTitle>Recently Viewed</SectionTitle>
                </SectionHeader>

                <HorizontalScroll>
                    {items.map((event) => (
                        <EventCardHorizontal
                            key={event.id}
                            id={event.id}
                            slug={event.slug}
                            title={event.title}
                            venue="Recently Viewed"
                            city="Viewed just now"
                            date={new Date(event.timestamp).toLocaleDateString()}
                            time="Recently"
                            imageUrl={event.imageUrl}
                            status="onsale"
                        />
                    ))}
                </HorizontalScroll>
            </Container>
        </Section>
    );
}
