'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { Badge } from '@/components/ui/primitives';

const CardWrapper = styled(Link)`
  display: block;
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
`;

const EventImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BadgeContainer = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const DateBlock = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const DateBox = styled.div`
  text-align: center;
  min-width: 48px;
`;

const DateMonth = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.caption};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.blue};
  text-transform: uppercase;
`;

const DateDay = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.h2};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1;
`;

const EventDetails = styled.div`
  flex: 1;
`;

const EventTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.body};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 4px;
  line-height: 1.3;
  
  /* Truncate long titles */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const EventVenue = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.small};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const EventTime = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 4px;
`;

interface EventCardProps {
    id: string;
    slug: string;
    title: string;
    venue: string;
    city: string;
    date: string;
    time: string;
    imageUrl: string;
    status?: 'presale' | 'onsale' | 'cancelled';
}

export function EventCard({
    id,
    slug,
    title,
    venue,
    city,
    date,
    time,
    imageUrl,
    status,
}: EventCardProps) {
    // Parse date
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const day = dateObj.getDate();

    return (
        <CardWrapper href={`/${slug}/event/${id}`}>
            <ImageContainer>
                <EventImage src={imageUrl} alt={title} />
                {status && (
                    <BadgeContainer>
                        <Badge $variant={status}>{status}</Badge>
                    </BadgeContainer>
                )}
            </ImageContainer>
            <CardContent>
                <DateBlock>
                    <DateBox>
                        <DateMonth>{month}</DateMonth>
                        <DateDay>{day}</DateDay>
                    </DateBox>
                    <EventDetails>
                        <EventTitle>{title}</EventTitle>
                        <EventVenue>{venue} • {city}</EventVenue>
                        <EventTime>{time}</EventTime>
                    </EventDetails>
                </DateBlock>
            </CardContent>
        </CardWrapper>
    );
}

// Horizontal Card variant for carousels
const HorizontalCardWrapper = styled(Link)`
  display: block;
  flex-shrink: 0;
  width: 280px;
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
  }
`;

export function EventCardHorizontal({
    id,
    slug,
    title,
    venue,
    city,
    date,
    time,
    imageUrl,
    status,
}: EventCardProps) {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const day = dateObj.getDate();

    return (
        <HorizontalCardWrapper href={`/${slug}/event/${id}`}>
            <ImageContainer>
                <EventImage src={imageUrl} alt={title} />
                {status && (
                    <BadgeContainer>
                        <Badge $variant={status}>{status}</Badge>
                    </BadgeContainer>
                )}
            </ImageContainer>
            <CardContent>
                <DateBlock>
                    <DateBox>
                        <DateMonth>{month}</DateMonth>
                        <DateDay>{day}</DateDay>
                    </DateBox>
                    <EventDetails>
                        <EventTitle>{title}</EventTitle>
                        <EventVenue>{venue} • {city}</EventVenue>
                        <EventTime>{time}</EventTime>
                    </EventDetails>
                </DateBlock>
            </CardContent>
        </HorizontalCardWrapper>
    );
}
