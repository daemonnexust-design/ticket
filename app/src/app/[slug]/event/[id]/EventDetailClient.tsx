'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { Container, Flex } from '@/components/ui/primitives';
import type { Event, Category, Venue, Ticket } from '@/types/database';

const Main = styled.main`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.footerBg};
`;

const EventHeader = styled.div`
  padding: 24px 0;
  background-color: ${({ theme }) => theme.colors.footerBg};
`;

const Breadcrumb = styled.nav`
  margin-bottom: 16px;
`;

const BreadcrumbLink = styled(Link)`
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

const EventInfo = styled(Flex)`
  gap: 16px;
  align-items: flex-start;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const EventImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  object-fit: cover;
`;

const EventDetails = styled.div`
  flex: 1;
`;

const EventTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes.h2};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.textInverse};
  margin-bottom: 8px;
`;

const EventMeta = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.body};
  color: ${({ theme }) => theme.colors.textInverse};
  margin-bottom: 4px;
`;

const VenueLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textInverse};
  text-decoration: underline;
`;

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.sizes.caption};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  text-transform: uppercase;
  background-color: ${({ $status, theme }) => {
        if ($status === 'presale') return theme.colors.presale;
        if ($status === 'onsale') return theme.colors.onsale;
        if ($status === 'cancelled') return theme.colors.cancelled;
        return theme.colors.border;
    }};
  color: ${({ theme }) => theme.colors.textInverse};
`;

const ContentWrapper = styled(Flex)`
  gap: 24px;
  padding: 24px 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-direction: column;
  }
`;

const SeatMapArea = styled.div`
  flex: 2;
`;

const SeatMapPlaceholder = styled.div`
  aspect-ratio: 4 / 3;
  background-color: ${({ theme }) => theme.colors.headerBg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textInverse};
  position: relative;
`;

const SeatMapSVG = styled.svg`
  width: 80%;
  height: 80%;
  max-width: 400px;
`;

const MapLegend = styled.button`
  position: absolute;
  bottom: 16px;
  left: 16px;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.cardBg};
  color: ${({ theme }) => theme.colors.textPrimary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.sizes.small};
`;

const TicketPanel = styled.div`
  flex: 1;
  min-width: 320px;
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 24px;
  max-height: 600px;
  overflow-y: auto;
`;

const TicketHeader = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const TicketCount = styled.select`
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.sizes.body};
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.sizes.small};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PriceSlider = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const PriceLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: nowrap;
`;

const PriceRange = styled.input`
  flex: 1;
  accent-color: ${({ theme }) => theme.colors.blue};
`;

const SortTabs = styled(Flex)`
  gap: 24px;
  margin-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 8px;
`;

const SortTab = styled.button<{ $active?: boolean }>`
  font-size: ${({ theme }) => theme.typography.sizes.small};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ $active, theme }) =>
        $active ? theme.colors.blue : theme.colors.textSecondary};
  border-bottom: 2px solid ${({ $active, theme }) =>
        $active ? theme.colors.blue : 'transparent'};
  padding-bottom: 8px;
  margin-bottom: -9px;
`;

const PayPalBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.blueLight};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-bottom: 16px;
`;

const TicketList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TicketItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.bodyBg};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  text-align: left;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.blueLight};
  }
`;

const TicketImageBox = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

const TicketInfo = styled.div`
  flex: 1;
`;

const TicketSection = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.body};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const TicketRow = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.small};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const TicketPrice = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.body};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const TermsNotice = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.caption};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 16px;
  text-align: center;
`;

const EmptyTickets = styled.div`
  text-align: center;
  padding: 24px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

type EventWithDetails = Event & {
    category: Category | null;
    venue: Venue | null;
};

interface EventDetailClientProps {
    event: EventWithDetails;
    tickets: Ticket[];
    slug: string;
}

export function EventDetailClient({
    event,
    tickets,
    slug,
}: EventDetailClientProps) {
    const dateObj = new Date(event.event_date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    const minPrice = tickets.length > 0 ? Math.min(...tickets.map(t => Number(t.price))) : 0;
    const maxPrice = tickets.length > 0 ? Math.max(...tickets.map(t => Number(t.price))) : 0;

    return (
        <Main>
            <EventHeader>
                <Container>
                    <Breadcrumb>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        <BreadcrumbLink href={`/discover/${event.category?.slug || 'concerts'}`}>
                            {event.category?.name || 'Events'}
                        </BreadcrumbLink>
                        <BreadcrumbLink href={`/${slug}/event/${event.id}`}>{event.title}</BreadcrumbLink>
                    </Breadcrumb>

                    <EventInfo>
                        <EventImage
                            src={event.image_url || 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=225&fit=crop'}
                            alt={event.title}
                        />
                        <EventDetails>
                            <EventTitle>{event.title}</EventTitle>
                            <EventMeta>{formattedDate} • {event.event_time?.slice(0, 5)}</EventMeta>
                            <EventMeta>
                                <VenueLink href="#">{event.venue?.name}</VenueLink>, {event.venue?.city}, {event.venue?.state}
                            </EventMeta>
                        </EventDetails>
                        <StatusBadge $status={event.status}>{event.status}</StatusBadge>
                    </EventInfo>
                </Container>
            </EventHeader>

            <Container>
                <ContentWrapper>
                    {/* Seat Map */}
                    <SeatMapArea>
                        <SeatMapPlaceholder>
                            <SeatMapSVG viewBox="0 0 400 300">
                                <rect x="100" y="20" width="200" height="40" rx="4" fill="#026cdf" />
                                <text x="200" y="45" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">STAGE</text>
                                <path d="M50 80 Q200 140 350 80 L350 180 Q200 240 50 180 Z" fill="#4a90d9" opacity="0.8" />
                                <path d="M80 100 Q200 150 320 100 L320 160 Q200 210 80 160 Z" fill="#6ba3e0" opacity="0.8" />
                                <path d="M110 120 Q200 160 290 120 L290 140 Q200 180 110 140 Z" fill="#8cb8e8" opacity="0.8" />
                                <text x="60" y="140" fill="white" fontSize="10">101</text>
                                <text x="200" y="130" textAnchor="middle" fill="white" fontSize="10">102</text>
                                <text x="340" y="140" fill="white" fontSize="10">103</text>
                                <path d="M30 200 Q200 260 370 200 L370 280 Q200 320 30 280 Z" fill="#3498db" opacity="0.6" />
                                <text x="80" y="250" fill="white" fontSize="10">201</text>
                                <text x="200" y="260" textAnchor="middle" fill="white" fontSize="10">202</text>
                                <text x="320" y="250" fill="white" fontSize="10">203</text>
                            </SeatMapSVG>
                            <MapLegend>Legend</MapLegend>
                        </SeatMapPlaceholder>
                    </SeatMapArea>

                    {/* Ticket Panel */}
                    <TicketPanel>
                        <TicketHeader>
                            <TicketCount>
                                <option>2 Tickets</option>
                                <option>1 Ticket</option>
                                <option>3 Tickets</option>
                                <option>4 Tickets</option>
                            </TicketCount>
                            <FilterButton>🎚️ Filters</FilterButton>
                        </TicketHeader>

                        {tickets.length > 0 && (
                            <PriceSlider>
                                <PriceLabel>${minPrice.toFixed(0)}</PriceLabel>
                                <PriceRange type="range" min={minPrice} max={maxPrice} />
                                <PriceLabel>${maxPrice.toFixed(0)}+</PriceLabel>
                            </PriceSlider>
                        )}

                        <SortTabs>
                            <SortTab $active>Lowest Price</SortTab>
                            <SortTab>Best Seats</SortTab>
                        </SortTabs>

                        <PayPalBanner>
                            <strong>PayPal</strong>
                            <span>Buy Now, Pay Later</span>
                            <a href="#" style={{ marginLeft: 'auto', color: '#026cdf' }}>More Info</a>
                        </PayPalBanner>

                        <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '16px' }}>
                            We&apos;re All In: Prices include fees (before taxes).
                        </p>

                        {tickets.length > 0 ? (
                            <TicketList>
                                {tickets.map((ticket) => (
                                    <TicketItem key={ticket.id}>
                                        <TicketImageBox />
                                        <TicketInfo>
                                            <TicketSection>{ticket.section} • {ticket.row}</TicketSection>
                                            <TicketRow>{ticket.type}</TicketRow>
                                        </TicketInfo>
                                        <TicketPrice>${Number(ticket.price).toFixed(2)}</TicketPrice>
                                    </TicketItem>
                                ))}
                            </TicketList>
                        ) : (
                            <EmptyTickets>
                                <p>No tickets available at this time.</p>
                            </EmptyTickets>
                        )}

                        <TermsNotice>
                            By continuing past this page, you agree to our <a href="#">Terms of Use</a>.
                        </TermsNotice>
                    </TicketPanel>
                </ContentWrapper>
            </Container>
        </Main>
    );
}
