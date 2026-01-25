'use client';

import styled from 'styled-components';

const SidebarContainer = styled.aside`
  width: 300px;
  flex-shrink: 0;
  margin-left: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const AdBlock = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const AdImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const AdContent = styled.div`
  padding: 16px;
`;

const AdLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
`;

const AdTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #1f262d;
  margin-bottom: 8px;
  line-height: 1.3;
`;

const AdText = styled.p`
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
`;

const AdLink = styled.a`
  display: block;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
`;

export function AdSidebar() {
    return (
        <SidebarContainer>
            <AdLabel>Advertisement</AdLabel>

            <AdLink href="#">
                <AdBlock>
                    <AdImage src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=320&fit=crop" alt="Hotel Deal" />
                    <AdContent>
                        <AdLabel>Travel</AdLabel>
                        <AdTitle>Combine your ticket with a hotel & save up to 57%</AdTitle>
                        <AdText>Exclusive deals for ticket holders.</AdText>
                    </AdContent>
                </AdBlock>
            </AdLink>

            <AdLink href="#">
                <AdBlock>
                    <AdImage src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=320&fit=crop" alt="Ticket Deals" />
                    <AdContent>
                        <AdLabel>Ticket Deals</AdLabel>
                        <AdTitle>2-for-1 Tickets</AdTitle>
                        <AdText>Limited time offer on select events.</AdText>
                    </AdContent>
                </AdBlock>
            </AdLink>

            <AdLink href="#">
                <AdBlock>
                    <AdImage src="https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?w=600&h=320&fit=crop" alt="VIP" />
                    <AdContent>
                        <AdLabel>VIP Packages</AdLabel>
                        <AdTitle>Feel the performance, live the moment as a VIP.</AdTitle>
                    </AdContent>
                </AdBlock>
            </AdLink>
        </SidebarContainer>
    );
}
