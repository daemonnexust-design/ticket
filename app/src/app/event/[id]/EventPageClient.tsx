'use client';

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { mockEvents } from '@/lib/mockData';
import { SeatMapSVG } from './SeatMapSVG';
import { CalendarIcon, ChevronDownIcon, FilterIcon, SearchIcon } from '@/components/ui/icons';

// --- Shared Styles ---
const PageContainer = styled.div`
  background: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const BackLink = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #026cdf;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
  
  &:hover {
    text-decoration: underline;
  }
`;

// --- Expired State Styles ---
const ExpiredContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 32px 24px;
`;
const ExpiredBanner = styled.div`
  background-color: #1f262d; 
  color: white;
  padding: 16px 24px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 32px;
`;

// --- Booking Page Styles ---
const BookingLayout = styled.div`
  display: flex;
  flex: 1;
  height: calc(100vh - 120px); 
  overflow: hidden;
`;

// Left Sidebar (Dates)
const DateSidebar = styled.div`
  width: 280px;
  background: white;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    display: none; // Hide on tablet/mobile for now or make foldable
  }
`;

const SidebarHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DateList = styled.div`
  overflow-y: auto;
  flex: 1;
`;

const DateItem = styled.div<{ $active?: boolean }>`
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;
  background: ${({ $active }) => ($active ? '#1f262d' : 'white')};
  color: ${({ $active }) => ($active ? 'white' : '#1f262d')};
  border-left: 4px solid ${({ $active }) => ($active ? '#026cdf' : 'transparent')};

  &:hover {
    background: ${({ $active }) => ($active ? '#1f262d' : '#f9fafb')};
  }
`;

const DateMonth = styled.div`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 4px;
  color: inherit;
  opacity: 0.9;
`;

const DateDay = styled.div`
  font-size: 14px;
  color: inherit;
`;

const CalendarButton = styled.button`
  margin: 16px;
  padding: 12px;
  background: #026cdf;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
`;

// Center (Map)
const MapSection = styled.div`
  flex: 1;
  position: relative;
  background: #fbfbfb;
`;

const MapControls = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
`;

const ControlBtn = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #026cdf;
  font-size: 20px;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: #f3f4f6;
  }
`;

// Right Sidebar (Tickets)
const TicketSidebar = styled.div`
  width: 400px;
  background: white;
  border-left: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

   @media (max-width: 768px) {
    display: none; // Stack on mobile
  }
`;

const FilterBar = styled.div`
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  gap: 12px;
`;

const Dropdown = styled.button`
  flex: 1;
  padding: 8px 12px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const FilterBtn = styled.button`
  padding: 8px 16px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

const PriceSliderContainer = styled.div`
  padding: 24px 16px;
  border-bottom: 1px solid #e5e7eb;
`;

const SliderTrack = styled.div`
  height: 4px;
  background: #e5e7eb;
  position: relative;
  margin: 0 10px;
`;

const SliderRange = styled.div`
  position: absolute;
  left: 0;
  right: 60%;
  height: 100%;
  background: #1f262d;
`;

const Handle = styled.div<{ $pos: string }>`
  width: 24px;
  height: 24px;
  background: white;
  border: 1px solid #1f262d;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: ${({ $pos }) => $pos};
  cursor: pointer;
`;

const PriceLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;

const PriceBox = styled.div`
  border: 1px solid #e5e7eb;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #026cdf;
`;

const Tab = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: 16px;
  background: none;
  border: none;
  font-size: 12px;
  font-weight: 700;
  color: ${({ $active }) => ($active ? '#026cdf' : '#6b7280')};
  cursor: pointer;
  border-bottom: 3px solid ${({ $active }) => ($active ? '#026cdf' : 'transparent')};
  margin-bottom: -2px;
`;

const TicketList = styled.div`
  flex: 1;
  overflow-y: auto;
  background: #f9fafb;
`;

const TicketCard = styled.div`
  background: white;
  padding: 16px;
  margin-bottom: 1px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  
  &:hover {
    background: #f3f4f6;
  }
`;

const TicketInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SeatIcon = styled.div`
  width: 40px;
  height: 40px;
  background: #e5e7eb;
  // Mock image of seat map section
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239ca3af'%3E%3Cpath d='M4 4h16v16H4z'/%3E%3C/svg%3E");
`;

const TicketPriceLarge = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #026cdf;
`;

// Modal Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  width: 500px;
  max-width: 90%;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.2);
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #1f262d;
`;

const ModalText = styled.p`
  font-size: 15px;
  line-height: 1.5;
  color: #4b5563;
  margin-bottom: 16px;
`;

const ModalButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #026cdf;
  color: white;
  border: none;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: #0052b0;
  }
`;

export function EventPageClient() {
  const router = useRouter();
  const params = useParams();
  const { addItem } = useRecentlyViewed();
  const [showModal, setShowModal] = useState(false);

  // Find event from mock data based on ID
  const eventId = params.id as string;
  const event = mockEvents.find(e => e.id === eventId) || mockEvents[0];

  useEffect(() => {
    if (event) {
      addItem({
        id: event.id,
        slug: event.slug,
        title: event.title,
        imageUrl: event.imageUrl,
        category: event.category
      });
    }

    // Show modal if event is in future and not expired
    const eventDate = new Date(event.date);
    const now = new Date();
    if (eventDate > now) {
      setShowModal(true);
    }

  }, [event]);

  // Checkout Polling State
  const [isConfirming, setIsConfirming] = useState(false);

  const handleCheckout = () => {
    setIsConfirming(true);
    // Mock API call simulation
    setTimeout(() => {
      setIsConfirming(false);
      router.push('/checkout');
    }, 3000); // 3 seconds matching the "confirming" vibe
  };

  // Render EXPIRED State
  if (isExpired) {
    return (
      <PageContainer>
        <BackLink onClick={() => router.back()}>← Back to events</BackLink>
        <ExpiredContainer>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: '#1f262d' }}>{event.title}</h1>
          <p style={{ marginBottom: '24px', color: '#666' }}>{formattedDate} • {event.venue}</p>

          <ExpiredBanner>
            This event has started or has already happened, so ticket sales have stopped.
          </ExpiredBanner>

          <div style={{ background: 'white', padding: '40px', textAlign: 'center' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'left', color: '#1f262d' }}>Seat Map</h3>
            <img src="https://maps.ticketmaster.com/maps/geometry/3/event/1E005E4C96973305/staticImage?type=png&systemId=HOST" alt="Seat Map" style={{ maxWidth: '100%', opacity: 0.5 }} />
          </div>
        </ExpiredContainer>
      </PageContainer>
    );
  }

  // Render BOOKING (Active) State
  return (
    <PageContainer>
      {/* Checkout Polling Overlay */}
      {isConfirming && (
        <PollingOverlay>
          <PollingContent>
            <SpinnerContainer>
              <OuterRing />
              <MiddleRing />
              <InnerRing />
            </SpinnerContainer>
            <PollingText>Confirming Availability</PollingText>
          </PollingContent>
        </PollingOverlay>
      )}

      {/* "What You Need To Know" Modal */}
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>What You Need To Know</ModalTitle>
            <h4 style={{ fontWeight: 'bold', marginBottom: '8px', color: '#1f262d' }}>Important Note</h4>
            <ModalText>
              By purchasing tickets to this event, you agree to abide by the health
              and safety measures in effect at the time of the event. Government
              mandates, venue protocols, and event requirements are subject to
              change.
            </ModalText>
            <ModalText>
              Availability and pricing are subject to change. Resale ticket prices
              may exceed face value.
            </ModalText>
            <ModalButton onClick={() => setShowModal(false)}>I Agree</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Header Bar */}
      <div style={{ background: '#1f262d', color: 'white', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>Home / Concerts / {event.category} / {event.title.split('|')[0]}</div>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '4px' }}>{event.title}</h1>
          <div style={{ fontSize: '14px', marginTop: '4px' }}>{formattedDate} • {formattedTime} • {event.venue}, {event.location}</div>
        </div>
        <button style={{ background: 'none', border: '1px solid white', color: 'white', padding: '8px 16px', borderRadius: '4px', fontSize: '12px' }}>More Info</button>
      </div>

      <BookingLayout>
        {/* Left Sidebar: Dates */}
        <DateSidebar>
          <SidebarHeader style={{ color: '#1f262d' }}>
            More Dates
            <div style={{ border: '1px solid #e5e7eb', padding: '4px', borderRadius: '4px' }}>
              <ChevronDownIcon />
            </div>
          </SidebarHeader>
          <DateList>
            <DateItem $active>
              <DateMonth>Jan 29</DateMonth>
              <DateDay>Thu • 7:00pm</DateDay>
            </DateItem>
            <DateItem>
              <DateMonth>Jan 30</DateMonth>
              <DateDay>Fri • 7:00pm</DateDay>
            </DateItem>
            <DateItem>
              <DateMonth>Jan 31</DateMonth>
              <DateDay>Sat • 5:00pm</DateDay>
            </DateItem>
            <DateItem>
              <DateMonth>Jan 31</DateMonth>
              <DateDay>Sat • 8:00pm</DateDay>
            </DateItem>
            <DateItem>
              <DateMonth>Feb 19</DateMonth>
              <DateDay>Thu • 7:00pm</DateDay>
            </DateItem>
          </DateList>
          <CalendarButton>
            <CalendarIcon style={{ width: '16px' }} /> Calendar
          </CalendarButton>
        </DateSidebar>

        {/* Center: Seat Map */}
        <MapSection>
          <SeatMapSVG variant={(event as any).seatMapId || 2} />
        </MapSection>

        {/* Right Sidebar: Tickets */}
        <TicketSidebar>
          <FilterBar>
            <Dropdown style={{ color: '#1f262d' }}>
              1 Ticket <ChevronDownIcon style={{ width: '12px' }} />
            </Dropdown>
            <FilterBtn style={{ color: '#1f262d' }}>
              <FilterIcon style={{ width: '12px' }} /> Filters
            </FilterBtn>
          </FilterBar>

          <PriceSliderContainer>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', fontWeight: 'bold', color: '#1f262d' }}>
              <span>$100</span>
              <span>$125</span>
            </div>
            <div style={{ height: '24px', position: 'relative', display: 'flex', alignItems: 'center' }}>
              <SliderTrack>
                <SliderRange />
                <Handle $pos="0%" />
                <Handle $pos="40%" />
              </SliderTrack>
            </div>
            <PriceLabels>
              <PriceBox style={{ color: '#1f262d' }}>Lowest Price</PriceBox>
              <PriceBox style={{ color: '#1f262d' }}>Best Seats</PriceBox>
            </PriceLabels>
          </PriceSliderContainer>

          <TabContainer>
            <Tab $active>LOWEST PRICE</Tab>
            <Tab>BEST SEATS</Tab>
          </TabContainer>

          <div style={{ padding: '12px', background: '#f0f9ff', fontSize: '12px', color: '#0369a1', borderBottom: '1px solid #e0f2fe' }}>
            We're All In: Prices include fees (before taxes).
          </div>

          <TicketList>
            {[
              { id: 1, sec: '202', row: 'B', price: 105.60 },
              { id: 2, sec: '204', row: 'B', price: 105.60 },
              { id: 3, sec: '101', row: 'E', price: 124.50 },
              { id: 4, sec: '102', row: 'M', price: 124.50 },
              { id: 5, sec: '103', row: 'A', price: 135.00 },
              { id: 6, sec: '201', row: 'C', price: 100.60 },
            ].map(t => (
              <TicketCard key={t.id}>
                <TicketInfo>
                  <SeatIcon />
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '14px', color: '#1f262d' }}>Sec {t.sec} • Row {t.row}</div>
                    <div style={{ fontSize: '13px', color: '#6b7280' }}>Standard Admission</div>
                  </div>
                </TicketInfo>
                <TicketPriceLarge>${t.price.toFixed(2)}</TicketPriceLarge>
              </TicketCard>
            ))}
          </TicketList>

          <CheckoutFooter>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#1f262d' }}>SUBTOTAL</div>
                <div style={{ fontSize: '12px', color: '#1f262d' }}>1 Ticket</div>
              </div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f262d' }}>$72.75</div>
            </div>
            <NextButton onClick={handleCheckout}>Next</NextButton>
          </CheckoutFooter>
        </TicketSidebar>
      </BookingLayout>
    </PageContainer>
  );
}

// CheckOut Footer Components
const CheckoutFooter = styled.div`
    padding: 16px 24px;
    border-top: 1px solid #e5e7eb;
    background: white;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
`;

const NextButton = styled.button`
    width: 100%;
    background: #15803d; // Green color from screenshot
    color: white;
    font-weight: 700;
    padding: 14px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    
    &:hover {
        background: #166534;
    }
`;

// Polling Overlay Components (Matching the visual vibe)
const PollingOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 280px; // Offset for sidebar
    right: 400px; // Offset for ticketbar
    // Actually, it should overlay the MAP only, which is MapSection. 
    // To do that nicely we should make MapSection relative (it is) and put this absolute inside it.
    // BUT, the user wants "modal" like appearance. The screenshot shows it overlaying the map area specifically.
    // The current PollingOverlay is inside PageContainer.
    // I prefer rendering it inside MapSection for correct z-indexing relative to sidebars? 
    // Wait, the screenshot shows it OVER the map.
    // Let's position it fixed or absolute covering the map area.
    // If I put it in PageContainer, I need to deal with layout offsets.
    // Let's use flexible positioning or just put it in MapSection but make sure it covers it.
    // Actually, easier to make it cover the whole viewport or just the map.
    // The user screenshot shows sidebars are VISIBLE and NOT covered.
    // So it should cover the MAP SECTION only.
    // I will use z-index 100 on the MapSection and absolute positioning.
    
    top: 120px; // Header height approx
    left: 280px;
    right: 400px;
    bottom: 0;
    background: rgba(31, 38, 45, 0.7); // Dark semi-transparent
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 500;
    backdrop-filter: blur(2px);
    
    @media(max-width: 1024px) {
        left: 0;
        right: 0; // Adjust for mobile hidden sidebars
    }
`;

const PollingContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const SpinnerContainer = styled.div`
    position: relative;
    width: 80px;
    height: 80px;
`;

const spin = styled.keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const OuterRing = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 4px solid transparent;
    border-top-color: #00d4ff; // Cyan
    border-radius: 50%;
    animation: ${spin} 2s linear infinite; // Slower outer rotation
`;

const MiddleRing = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border: 4px solid transparent;
    border-right-color: #3b82f6; // Blue
    border-radius: 50%;
    animation: ${spin} 1.5s linear infinite reverse; // Reverse direction
`;

const InnerRing = styled.div`
    position: absolute;
    top: 25px;
    left: 25px;
    right: 25px;
    bottom: 25px;
    background: #1f262d; 
    border-radius: 50%;
    // Center dot? Actually the screenshot shows a ring.
    // Let's make it a ring.
    background: transparent;
    border: 4px solid transparent;
    border-bottom-color: #8b5cf6; // Purple
    animation: ${spin} 1s linear infinite; // Fast inner rotation
`;

const PollingText = styled.div`
    color: white;
    font-size: 18px;
    font-weight: 600;
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    letter-spacing: 0.5px;
`;
