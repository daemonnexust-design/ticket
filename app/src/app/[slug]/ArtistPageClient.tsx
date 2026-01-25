'use client';

import styled from 'styled-components';
import { useState } from 'react';
import { Container, Flex, Badge, Button } from '@/components/ui/primitives';
import { AdSidebar } from '@/components/home/AdSidebar';
import { EventCardHorizontal } from '@/components/cards/EventCard';
import { mockEvents } from '@/lib/mockData';
import Link from 'next/link';
import { ChevronDownIcon, ChevronUpIcon } from '@/components/ui/icons';

// Styled Components
const PageHeader = styled.div<{ $imageUrl: string }>`
  position: relative;
  height: 380px;
  background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${props => props.$imageUrl});
  background-size: cover;
  background-position: center;
  color: white;
  display: flex;
  align-items: flex-end;
  padding-bottom: 40px;
`;

const HeaderContent = styled(Container)`
  z-index: 10;
`;

const ArtistTitle = styled.h1`
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 8px;
  letter-spacing: -1px;
`;

const HeaderGenre = styled.div`
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 24px;
`;

const TabNav = styled.div`
  background: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const TabList = styled(Container)`
  display: flex;
  gap: 32px;
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: 20px 0;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 700;
  color: ${({ $active }) => ($active ? '#026cdf' : '#6b7280')};
  border-bottom: 3px solid ${({ $active }) => ($active ? '#026cdf' : 'transparent')};
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &:hover {
    color: #026cdf;
  }
`;

const ContentSection = styled.div`
  padding: 40px 0;
  background: #f9fafb;
  min-height: 600px;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 32px;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const MainColumn = styled.div``;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1f262d;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-top: 4px solid #1f262d;
  padding-top: 16px;
  width: fit-content;
`;

// Shows Components
const ShowRow = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px; 
  padding: 24px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    border-color: #026cdf;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const DateBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70px;
  flex-shrink: 0;
  margin-right: 24px;
  border-right: 1px solid #e5e7eb;
  padding-right: 24px;

  @media (max-width: 600px) {
     flex-direction: row;
     width: auto;
     border-right: none;
     border-bottom: 1px solid #e5e7eb;
     padding-right: 0;
     padding-bottom: 12px;
     margin-right: 0;
     margin-bottom: 12px;
     gap: 8px;
  }
`;

const Month = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
`;

const Day = styled.span`
  font-size: 24px;
  font-weight: 400;
  color: #1f262d;
`;

const ShowInfo = styled.div`
  flex: 1;
`;

const ShowTime = styled.div`
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 4px;
  font-weight: 500;
`;

const ShowVenue = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #1f262d;
  margin-bottom: 4px;
`;

const ShowLocation = styled.div`
  font-size: 14px;
  color: #6b7280;
`;

const FindTicketsButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 32px;
  background: #026cdf;
  color: white;
  font-weight: 600;
  font-size: 14px;
  border-radius: 4px;
  text-decoration: none;
  transition: background 0.2s;
  white-space: nowrap;
  
  &:hover {
    background: #0052b0;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

// About Components
const AboutContainer = styled.div`
  max-width: 800px;
`;

const AboutText = styled.div<{ $expanded: boolean }>`
  font-size: 16px;
  line-height: 1.6;
  color: #1f262d;
  margin-bottom: 24px;
  
  ${({ $expanded }) => !$expanded && `
    display: -webkit-box;
    -webkit-line-clamp: 6; 
    -webkit-box-orient: vertical;
    overflow: hidden;
    mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  `}
`;

const ShowMoreButton = styled.button`
  background: white;
  border: 1px solid #026cdf;
  color: #026cdf;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #026cdf10;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

// Review Components
const ReviewsHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const RatingBadge = styled.span`
  background: #1f262d;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: 8px;
  
  svg {
    width: 12px;
    height: 12px;
    fill: #fbbf24;
  }
`;

const WriteReviewButton = styled.button`
  background: #026cdf;
  color: white;
  border: none;
  padding: 12px 24px;
  font-weight: 600;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: #0052b0;
  }
`;

const ReviewCard = styled.div`
  background: white;
  padding: 24px 0;
  border-bottom: 1px solid #e5e7eb;
  
  &:last-child {
    border-bottom: none;
  }
`;

const StarRow = styled.div`
  display: flex;
  gap: 2px;
  margin-bottom: 8px;
  
  svg {
    width: 16px;
    height: 16px;
    fill: #1f262d; // Black stars like the screenshot
  }
`;

const ReviewTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #1f262d;
  margin-bottom: 4px;
`;

const ReviewMeta = styled.div`
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 12px;
`;

const ReviewBody = styled.p`
  font-size: 15px;
  line-height: 1.5;
  color: #1f262d;
`;

const Star = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

interface ArtistPageProps {
  slug: string;
}

const TABS = ['Shows', 'About', 'Reviews', 'Fans Also Viewed'];

export function ArtistPageClient({ slug }: ArtistPageProps) {
  const [activeTab, setActiveTab] = useState('Shows');
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  // Get events for this artist
  const events = mockEvents.filter(e => e.slug === slug);
  const mainEvent = events[0] || mockEvents[0]; // Fallback

  // Check for reviews (assuming reviews are on the main event object for now)
  // In strict sense, we should aggregate or pull from a Reviews service. 
  // We'll use the reviews from the first event object as the Artist Reviews.
  const reviews = mainEvent.reviews || [];

  // Calculate average rating
  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Related events (Mock logic: same category)
  const relatedEvents = mockEvents
    .filter(e => e.category === mainEvent.category && e.slug !== slug)
    // Deduplicate by slug
    .filter((e, index, self) => index === self.findIndex((t) => t.slug === e.slug))
    .slice(0, 4);

  return (
    <div>
      <PageHeader $imageUrl={mainEvent.imageUrl}>
        <HeaderContent>
          <HeaderGenre>{mainEvent.category} / {mainEvent.venue}</HeaderGenre>
          <ArtistTitle>{mainEvent.title.split('|')[0]}</ArtistTitle>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Button style={{ background: 'transparent', border: '1px solid white' }}>♡</Button>
            <Badge $variant="default" style={{ background: '#374151' }}>
              ★ {avgRating} ({reviews.length * 105})
            </Badge>
          </div>
        </HeaderContent>
      </PageHeader>

      <TabNav>
        <TabList>
          {TABS.map(tab => (
            <TabButton
              key={tab}
              $active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </TabButton>
          ))}
        </TabList>
      </TabNav>

      <ContentSection>
        <Container>
          <ContentGrid>
            <MainColumn>
              {activeTab === 'Shows' && (
                <>
                  <SectionTitle>SHOWS • {sortedEvents.length} RESULTS</SectionTitle>
                  <div style={{ marginBottom: '24px' }}>
                    {/* Mock Filters */}
                  </div>

                  <ShowsHeader>Shows in United States</ShowsHeader>
                  {sortedEvents.map((event) => {
                    const date = new Date(event.date);
                    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
                    const day = date.getDate();
                    const weekday = date.toLocaleString('en-US', { weekday: 'short' });

                    return (
                      <ShowRow key={event.id}>
                        <DateBox>
                          <Month>{month}</Month>
                          <Day>{day}</Day>
                        </DateBox>
                        <ShowInfo>
                          <ShowTime>{weekday} • {event.time}</ShowTime>
                          <ShowVenue>{event.location} • {event.venue}</ShowVenue>
                          <ShowLocation>{event.title}</ShowLocation>
                        </ShowInfo>
                        <FindTicketsButton href={`/event/${event.id}`}>
                          Find Tickets
                        </FindTicketsButton>
                      </ShowRow>
                    );
                  })}

                  {/* Promoted Ad Insert */}
                  <ShowRow style={{ background: '#f5f9ff', borderColor: '#dbeafe' }}>
                    <div style={{ padding: '0 12px' }}>
                      <Badge $variant="default" style={{ background: '#1e3a8a' }}>PROMOTED</Badge>
                    </div>
                    <ShowInfo>
                      <ShowVenue>EXCLUSIVE | Ticketmaster Hotel Deals</ShowVenue>
                      <ShowLocation>Save up to 57% off your stay when you bundle.</ShowLocation>
                    </ShowInfo>
                    <FindTicketsButton href="#" style={{ background: 'white', color: '#026cdf', border: '1px solid #026cdf' }}>
                      Find My Hotel
                    </FindTicketsButton>
                  </ShowRow>
                </>
              )}

              {activeTab === 'About' && (
                <AboutContainer>
                  <SectionTitle>ABOUT</SectionTitle>
                  <AboutText $expanded={isAboutExpanded}>
                    {(mainEvent.description || "No description available for this artist.")
                      .split('\n\n').map((paragraph, i) => (
                        <p key={i} style={{ marginBottom: '16px' }}>{paragraph}</p>
                      ))}
                  </AboutText>
                  <ShowMoreButton onClick={() => setIsAboutExpanded(!isAboutExpanded)}>
                    {isAboutExpanded ? (
                      <>Show less <ChevronUpIcon /></>
                    ) : (
                      <>Show more <ChevronDownIcon /></>
                    )}
                  </ShowMoreButton>
                </AboutContainer>
              )}

              {activeTab === 'Reviews' && (
                <div>
                  <ReviewsHeaderRow>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <SectionTitle style={{ marginBottom: 0, padding: 0, border: 'none' }}>
                        REVIEWS • {(reviews.length * 105) + reviews.length}
                      </SectionTitle>
                      <RatingBadge>★ {avgRating}</RatingBadge>
                    </div>
                    <WriteReviewButton>Write a review</WriteReviewButton>
                  </ReviewsHeaderRow>

                  {(reviews.length > 0) ? (
                    reviews.map(review => (
                      <ReviewCard key={review.id}>
                        <StarRow>
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} style={{ fill: i < review.rating ? '#1f262d' : '#e5e7eb' }} />
                          ))}
                        </StarRow>
                        <ReviewTitle>{review.title || 'Review'}</ReviewTitle>
                        <ReviewMeta>
                          by {review.author} on {review.date} • {review.location || 'Verified Fan'}
                        </ReviewMeta>
                        <ReviewBody>{review.content}</ReviewBody>
                      </ReviewCard>
                    ))
                  ) : (
                    <p>No reviews yet.</p>
                  )}

                  {reviews.length > 0 && (
                    <div style={{ marginTop: '32px', textAlign: 'center' }}>
                      <ShowMoreButton style={{ margin: '0 auto' }}>
                        More Reviews <ChevronDownIcon />
                      </ShowMoreButton>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'Fans Also Viewed' && (
                <div>
                  <SectionTitle>FANS ALSO VIEWED</SectionTitle>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                    {relatedEvents.map(event => (
                      <EventCardHorizontal key={event.id} {...event} />
                    ))}
                  </div>
                </div>
              )}
            </MainColumn>

            <AdSidebar />
          </ContentGrid>
        </Container>
      </ContentSection>
    </div>
  );
}
