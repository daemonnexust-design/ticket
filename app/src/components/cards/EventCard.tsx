'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { Badge } from '@/components/ui/primitives';

const CardWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  border-radius: 0;
  overflow: hidden;
  transition: all 0.2s;
  height: 100%;
  
  &:hover {
    box-shadow: 0 2px 10px rgba(0,0,0,0.15);
    transform: translateY(-2px);
    background: white;
    z-index: 1;
    border-radius: 8px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
`;

const EventImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${CardWrapper}:hover & {
    transform: scale(1.05);
  }
`;

const BadgeContainer = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
`;

const CardContent = styled.div`
  padding: 0 4px;
`;

const EventDateLine = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #262626;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  /* Make the first part (Day) distinct if needed, but standard text is fine */
`;

const EventTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #262626;
  margin-bottom: 4px;
  line-height: 1.4;
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${CardWrapper}:hover & {
    color: #026cdf;
    text-decoration: underline;
  }
`;

const EventVenue = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.4;
`;

const EventCategory = styled.p`
  font-size: 11px;
  color: #666;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 4px;
  letter-spacing: 0.5px;
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
  category?: string;
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
  category
}: EventCardProps) {
  const dateObj = new Date(date);
  const dayName = dateObj.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
  const month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const day = dateObj.getDate();

  const formatTime = (t: string) => {
    if (!t) return '';
    const [h, m] = t.split(':');
    if (t.includes(' ') || t.length > 5) return t;
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
  };
  const formattedTime = formatTime(time);

  const dateString = `${dayName} • ${month} ${day} • ${formattedTime}`;

  return (
    <CardWrapper href={`/event/${id}`}>
      <ImageContainer>
        <EventImage src={imageUrl} alt={title} />
        {status && (
          <BadgeContainer>
            <Badge $variant={status}>{status}</Badge>
          </BadgeContainer>
        )}
      </ImageContainer>
      <CardContent>
        {category && <EventCategory>{category}</EventCategory>}
        <EventDateLine>{dateString}</EventDateLine>
        <EventTitle>{title}</EventTitle>
        <EventVenue>{venue}, {city}</EventVenue>
      </CardContent>
    </CardWrapper>
  );
}

// Horizontal Card variant
const HorizontalCardWrapper = styled(Link)`
  display: block;
  flex-shrink: 0;
  width: 280px;
  margin-right: 16px;
  text-decoration: none;
  background: transparent;
  
  &:last-child {
    margin-right: 0;
  }
`;

// Reuse the inner content for horizontal cards but wrap in its own wrapper
export function EventCardHorizontal(props: EventCardProps) {
  const dateObj = new Date(props.date);
  const dayName = dateObj.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
  const month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const day = dateObj.getDate();

  const formatTime = (t: string) => {
    if (!t) return '';
    const [h, m] = t.split(':');
    if (t.includes(' ') || t.length > 5) return t;
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
  };
  const formattedTime = formatTime(props.time);
  const dateString = `${dayName} • ${month} ${day} • ${formattedTime}`;

  return (
    <HorizontalCardWrapper href={`/event/${props.id}`}>
      <ImageContainer>
        <EventImage src={props.imageUrl} alt={props.title} />
        {props.status && (
          <BadgeContainer>
            <Badge $variant={props.status}>{props.status}</Badge>
          </BadgeContainer>
        )}
      </ImageContainer>
      <CardContent>
        {props.category && <EventCategory>{props.category}</EventCategory>}
        <EventDateLine>{dateString}</EventDateLine>
        <EventTitle>{props.title}</EventTitle>
        <EventVenue>{props.venue}, {props.city}</EventVenue>
      </CardContent>
    </HorizontalCardWrapper>
  );
}
