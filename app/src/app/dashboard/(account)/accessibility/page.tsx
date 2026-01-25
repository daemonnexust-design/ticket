'use client';

import styled from 'styled-components';
import { Title } from '@/app/dashboard/(account)/layout';

const Container = styled.div`
  max-width: 800px;
  background: white;
  padding: 0;
`;

const ArticleTitle = styled.h2`
  font-size: 24px;
  font-weight: 800;
  color: #1f262d;
  margin-bottom: 24px;
  line-height: 1.2;
`;

const SectionHeader = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1f262d;
  margin-top: 32px;
  margin-bottom: 16px;
`;

const Text = styled.p`
  font-size: 16px;
  color: #1f262d;
  line-height: 1.6;
  margin-bottom: 16px;
`;

const Link = styled.a`
  color: #026cdf;
  text-decoration: underline;
  cursor: pointer;
  
  &:hover {
    text-decoration: none;
  }
`;

const OrderedList = styled.ol`
  margin-bottom: 24px;
  padding-left: 24px;
`;

const ListItem = styled.li`
  font-size: 16px;
  color: #1f262d;
  line-height: 1.6;
  margin-bottom: 8px;
`;

const DisclaimerBox = styled.div`
  background: white;
  border-top: 4px solid #026cdf;
  border-bottom: 1px solid #e5e7eb;
  padding: 24px;
  margin: 32px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const DisclaimerText = styled.p`
  font-size: 16px;
  color: #1f262d;
  line-height: 1.6;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 300px;
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 24px 0;
  color: #6b7280;
  font-weight: 600;
  
  img {
      max-width: 100%;
      height: auto;
      max-height: 100%;
      object-fit: contain;
  }
`;

export default function AccessibilityPage() {
  return (
    <Container>
      <div style={{ marginBottom: '40px' }}>
        <a href="#" style={{ color: '#026cdf', fontSize: '14px', marginBottom: '16px', display: 'inline-block' }}>
          Ticketmaster Help &gt; Accessibility &gt; Accessible tickets
        </a>
        <h1 style={{ color: '#026cdf', fontSize: '32px', fontWeight: 800, margin: '0 0 8px 0' }}>ACCESSIBILITY</h1>
        <p style={{ fontSize: '16px', fontWeight: 600, color: '#1f262d' }}>How to buy accessible tickets</p>
      </div>

      <ArticleTitle>Accessible Tickets: Everything you need to know</ArticleTitle>

      <Text>
        Ticketmaster, on behalf of its clients, strives to make it as easy as possible to purchase accessible seating tickets for venues across the country. Most venues offer accessible seating areas to accommodate their guests. Availability and type of accessible seating tickets will vary based on each venue's policies and/or the type of event taking place.
      </Text>

      <SectionHeader>How do I buy accessible tickets?</SectionHeader>
      <Text>
        Accessible tickets can be purchased online directly from your event's interactive seat map or by contacting us at <Link href="tel:8008777575">(800) 877-7575</Link>. Fans who are not purchasing or requiring assistance with their accessible tickets order should avoid calling this line.
      </Text>

      <DisclaimerBox>
        <DisclaimerText>
          Accessible tickets are reserved solely for fans with disabilities and their companions. Fans who abuse this policy could have their order canceled.
        </DisclaimerText>
      </DisclaimerBox>

      <SectionHeader>How do I see the types of accessible tickets available for my event?</SectionHeader>
      <Text>
        The number and types of accessible tickets available varies by event and venue. To see what accessible tickets are available for your event follow these steps:
      </Text>

      <OrderedList>
        <ListItem>Select the <strong>Filter</strong> button.</ListItem>
        <ListItem>Toggle the <strong>Show accessible tickets</strong> switch and the types of accessible tickets available for that event will appear.</ListItem>
        <ListItem>Select the <strong>Apply Filters</strong> button.</ListItem>
        <ListItem>Click or tap a section on the interactive seat map to see how many accessible tickets are available, as well as their location within the section and price.</ListItem>
      </OrderedList>

      <ImagePlaceholder>
        {/* 
                    Ideally this would be the GIF user mentioned. 
                    Since we don't have the GIF file hosted, we use a placeholder or the static image if available.
                    Using a generic accessibility seat map representation here.
                */}
        <div style={{ textAlign: 'center' }}>
          <svg style={{ width: 64, height: 64, color: '#9ca3af', marginBottom: 16 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4l3 3" />
          </svg>
          <p>Visual Guide: Selecting Accessible Seats</p>
        </div>
      </ImagePlaceholder>

      <SectionHeader>Can I buy accessible tickets for VIP packages?</SectionHeader>
      <Text>
        Accessible tickets are available to purchase for all VIP packages. After purchasing your VIP Package to the event of your choice, you'll need to submit a request for accessible tickets for your VIP Package. A Fan Support representative will assist you with your request.
      </Text>
      <Text>
        As VIP packages are unique from venue to venue, artist to artist and event to event, accessibility options may differ.
      </Text>

      <Text>For assistance, follow these steps:</Text>
      <OrderedList>
        <ListItem>Sign into your <Link href="#">Ticketmaster Account</Link>.</ListItem>
        <ListItem>Find your VIP Package order in My Tickets.</ListItem>
        <ListItem>Select the <strong>Chat</strong> icon.</ListItem>
      </OrderedList>

      <div style={{ height: 60 }}></div>
    </Container>
  );
}
