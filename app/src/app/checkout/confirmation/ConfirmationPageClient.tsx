'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const PageContainer = styled.div`
  background: #f5f7fa;
  min-height: 100vh;
  padding-bottom: 40px;
`;

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 48px 24px;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 48px 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  text-align: center;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background: #10b981;
  border-radius: 50%;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1f262d;
  margin: 0 0 12px 0;
`;

const Subtitle = styled.p`
  font-size: 17px;
  color: #6b7280;
  margin: 0 0 32px 0;
  line-height: 1.6;
`;

const OrderNumber = styled.div`
  background: #f5f9ff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 32px;
`;

const OrderLabel = styled.div`
  font-size: 13px;
  color: #6b7280;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`;

const OrderValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #026cdf;
  font-family: monospace;
`;

const EventDetails = styled.div`
  text-align: left;
  border-top: 2px solid #e5e7eb;
  border-bottom: 2px solid #e5e7eb;
  padding: 24px 0;
  margin: 32px 0;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 15px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  color: #6b7280;
  font-weight: 500;
`;

const DetailValue = styled.span`
  color: #1f262d;
  font-weight: 600;
  text-align: right;
`;

const InfoBox = styled.div`
  background: #eff6ff;
  border-left: 4px solid #026cdf;
  border-radius: 6px;
  padding: 16px 20px;
  margin: 24px 0;
  text-align: left;
`;

const InfoTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #026cdf;
  margin-bottom: 8px;
`;

const InfoText = styled.div`
  font-size: 14px;
  color: #1e40af;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 32px;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Button = styled(Link) <{ $variant?: 'primary' | 'secondary' }>`
  height: 54px;
  background: ${({ $variant }) => $variant === 'secondary' ? 'white' : '#026cdf'};
  color: ${({ $variant }) => $variant === 'secondary' ? '#1f262d' : 'white'};
  border: ${({ $variant }) => $variant === 'secondary' ? '2px solid #e5e7eb' : 'none'};
  border-radius: 8px;
  font-size: 17px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.2s;
  
  &:hover {
    background: ${({ $variant }) => $variant === 'secondary' ? '#f5f7fa' : '#0052b0'};
    ${({ $variant }) => $variant === 'primary' && `
      box-shadow: 0 4px 16px rgba(2, 108, 223, 0.3);
      transform: translateY(-2px);
    `}
  }
`;

const EmailNotice = styled.div`
  font-size: 13px;
  color: #6b7280;
  margin-top: 24px;
  line-height: 1.6;
`;

export function ConfirmationPageClient() {
    const [orderNumber, setOrderNumber] = useState('');

    useEffect(() => {
        setOrderNumber('TM' + Math.random().toString(36).substr(2, 9).toUpperCase());
    }, []);

    return (
        <PageContainer>
            <Container>
                <Card>
                    <SuccessIcon>✓</SuccessIcon>
                    <Title>Order Confirmed!</Title>
                    <Subtitle>
                        Thank you for your purchase. Your tickets have been sent to your email address.
                    </Subtitle>

                    {orderNumber && (
                        <OrderNumber>
                            <OrderLabel>Order Number</OrderLabel>
                            <OrderValue>{orderNumber}</OrderValue>
                        </OrderNumber>
                    )}

                    <EventDetails>
                        <DetailRow>
                            <DetailLabel>Event</DetailLabel>
                            <DetailValue>Taylor Swift | The Eras Tour</DetailValue>
                        </DetailRow>
                        <DetailRow>
                            <DetailLabel>Date & Time</DetailLabel>
                            <DetailValue>Saturday, June 14, 2026 at 7:00 PM</DetailValue>
                        </DetailRow>
                        <DetailRow>
                            <DetailLabel>Venue</DetailLabel>
                            <DetailValue>MetLife Stadium - East Rutherford, NJ</DetailValue>
                        </DetailRow>
                        <DetailRow>
                            <DetailLabel>Tickets</DetailLabel>
                            <DetailValue>2x Reserved Seating</DetailValue>
                        </DetailRow>
                        <DetailRow>
                            <DetailLabel>Total Paid</DetailLabel>
                            <DetailValue>$343.85</DetailValue>
                        </DetailRow>
                    </EventDetails>

                    <InfoBox>
                        <InfoTitle>📱 Mobile Tickets</InfoTitle>
                        <InfoText>
                            Your tickets are now available in the Ticketmaster app. Download the app and sign in to access your tickets. You'll need to present your mobile tickets at the venue entrance.
                        </InfoText>
                    </InfoBox>

                    <InfoBox>
                        <InfoTitle>📧 Confirmation Email</InfoTitle>
                        <InfoText>
                            A confirmation email with your order details and tickets has been sent to your email address. Please check your spam folder if you don't see it within a few minutes.
                        </InfoText>
                    </InfoBox>

                    <ButtonGroup>
                        <Button href="/orders" $variant="secondary">
                            View My Orders
                        </Button>
                        <Button href="/">
                            Find More Events
                        </Button>
                    </ButtonGroup>

                    <EmailNotice>
                        Need help? Contact our <a href="/help" style={{ color: '#026cdf', textDecoration: 'underline' }}>Customer Support</a> team.
                    </EmailNotice>
                </Card>
            </Container>
        </PageContainer>
    );
}
