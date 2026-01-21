'use client';

import styled from 'styled-components';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const PageContainer = styled.div`
  background: #f5f7fa;
  min-height: 100vh;
  padding-bottom: 40px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
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
  margin-bottom: 24px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 32px;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const MainSection = styled.div``;

const EventHeader = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const EventTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1f262d;
  margin: 0 0 12px 0;
`;

const EventMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  color: #6b7280;
  font-size: 15px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const TicketSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #1f262d;
  margin: 0 0 24px 0;
`;

const TicketOption = styled.div<{ $selected?: boolean }>`
  border: 2px solid ${({ $selected }) => ($selected ? '#026cdf' : '#e5e7eb')};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${({ $selected }) => ($selected ? '#f5f9ff' : 'white')};
  
  &:hover {
    border-color: #026cdf;
  }
`;

const TicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 12px;
`;

const TicketName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #1f262d;
`;

const TicketPrice = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #026cdf;
`;

const TicketDetails = styled.div`
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 16px;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const QuantityButton = styled.button`
  width: 36px;
  height: 36px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  background: white;
  color: #1f262d;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    border-color: #026cdf;
    color: #026cdf;
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1f262d;
  min-width: 30px;
  text-align: center;
`;

const Sidebar = styled.div`
  @media (max-width: 900px) {
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    padding: 20px;
    box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.1);
    border-radius: 12px 12px 0 0;
  }
`;

const OrderSummary = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 24px;
`;

const SummaryTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1f262d;
  margin: 0 0 20px 0;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 15px;
  color: #6b7280;
`;

const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 2px solid #e5e7eb;
  font-size: 20px;
  font-weight: 700;
  color: #1f262d;
`;

const CheckoutButton = styled.button`
  width: 100%;
  height: 54px;
  background: #026cdf;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background: #0052b0;
    box-shadow: 0 4px 16px rgba(2, 108, 223, 0.3);
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

const SecureText = styled.div`
  text-align: center;
  font-size: 12px;
  color: #6b7280;
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

interface Ticket {
    id: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
}

export function EventPageClient() {
    const router = useRouter();
    const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
    const [tickets, setTickets] = useState<Ticket[]>([
        {
            id: '1',
            name: 'General Admission',
            price: 89.50,
            description: 'Standing room only • Ages 18+ • No re-entry',
            quantity: 0,
        },
        {
            id: '2',
            name: 'Reserved Seating',
            price: 149.50,
            description: 'Assigned seats • Section 104-108 • Ages 18+ • No re-entry',
            quantity: 0,
        },
        {
            id: '3',
            name: 'VIP Package',
            price: 299.50,
            description: 'Premium seating • Early entry • Exclusive merchandise • Meet & greet opportunity',
            quantity: 0,
        },
    ]);

    const updateQuantity = (ticketId: string, delta: number) => {
        setTickets(prev => prev.map(t =>
            t.id === ticketId
                ? { ...t, quantity: Math.max(0, Math.min(8, t.quantity + delta)) }
                : t
        ));
        if (delta > 0) setSelectedTicket(ticketId);
    };

    const subtotal = tickets.reduce((sum, t) => sum + (t.price * t.quantity), 0);
    const fees = subtotal * 0.15; // 15% service fee
    const total = subtotal + fees;
    const totalTickets = tickets.reduce((sum, t) => sum + t.quantity, 0);

    return (
        <PageContainer>
            <Container>
                <BackLink onClick={() => router.back()}>
                    ← Back to events
                </BackLink>

                <Grid>
                    <MainSection>
                        <EventHeader>
                            <EventTitle>Taylor Swift | The Eras Tour</EventTitle>
                            <EventMeta>
                                <MetaItem>📅 Saturday, June 14, 2026 at 7:00 PM</MetaItem>
                                <MetaItem>📍 MetLife Stadium - East Rutherford, NJ</MetaItem>
                            </EventMeta>
                        </EventHeader>

                        <TicketSection>
                            <SectionTitle>Select Tickets</SectionTitle>
                            {tickets.map(ticket => (
                                <TicketOption
                                    key={ticket.id}
                                    $selected={selectedTicket === ticket.id}
                                    onClick={() => setSelectedTicket(ticket.id)}
                                >
                                    <TicketHeader>
                                        <TicketName>{ticket.name}</TicketName>
                                        <TicketPrice>${ticket.price.toFixed(2)}</TicketPrice>
                                    </TicketHeader>
                                    <TicketDetails>{ticket.description}</TicketDetails>
                                    <QuantitySelector onClick={(e) => e.stopPropagation()}>
                                        <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: 500 }}>Quantity:</span>
                                        <QuantityButton
                                            onClick={() => updateQuantity(ticket.id, -1)}
                                            disabled={ticket.quantity === 0}
                                        >
                                            −
                                        </QuantityButton>
                                        <QuantityDisplay>{ticket.quantity}</QuantityDisplay>
                                        <QuantityButton
                                            onClick={() => updateQuantity(ticket.id, 1)}
                                            disabled={ticket.quantity >= 8}
                                        >
                                            +
                                        </QuantityButton>
                                    </QuantitySelector>
                                </TicketOption>
                            ))}
                        </TicketSection>
                    </MainSection>

                    <Sidebar>
                        <OrderSummary>
                            <SummaryTitle>Order Summary</SummaryTitle>
                            {tickets.filter(t => t.quantity > 0).map(ticket => (
                                <SummaryRow key={ticket.id}>
                                    <span>{ticket.quantity}x {ticket.name}</span>
                                    <span>${(ticket.price * ticket.quantity).toFixed(2)}</span>
                                </SummaryRow>
                            ))}
                            {totalTickets > 0 && (
                                <>
                                    <SummaryRow>
                                        <span>Service Fee</span>
                                        <span>${fees.toFixed(2)}</span>
                                    </SummaryRow>
                                    <SummaryTotal>
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </SummaryTotal>
                                </>
                            )}
                            <CheckoutButton
                                disabled={totalTickets === 0}
                                onClick={() => router.push('/checkout/payment')}
                            >
                                {totalTickets === 0 ? 'Select Tickets' : `Checkout (${totalTickets} ticket${totalTickets > 1 ? 's' : ''})`}
                            </CheckoutButton>
                            <SecureText>
                                🔒 Secure checkout powered by Ticketmaster
                            </SecureText>
                        </OrderSummary>
                    </Sidebar>
                </Grid>
            </Container>
        </PageContainer>
    );
}
