'use client';

import styled from 'styled-components';
import { SearchIcon } from '@/components/ui/icons';
import { useRouter } from 'next/navigation';

const DropdownContainer = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 16px;
  z-index: 1000;
`;

const Section = styled.div`
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  margin-bottom: 10px;
  letter-spacing: 0.5px;
`;

const TrendingItem = styled.button`
  width: 100%;
  padding: 10px 12px;
  border: none;
  background: none;
  color: #1f262d;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: background 0.2s;
  
  &:hover {
    background: #f5f9ff;
    
    .search-icon {
      color: #026cdf;
    }
  }
  
  svg {
    width: 16px;
    height: 16px;
    color: #9ca3af;
    flex-shrink: 0;
  }
`;

interface TrendingSearchesProps {
  isOpen: boolean;
  onSelect: (query: string) => void;
}

const trendingSearches = {
  'Popular Artists': [
    'Taylor Swift',
    'Bad Bunny',
    'Drake',
    'The Weeknd',
  ],
  'Upcoming Events': [
    'NBA Playoffs',
    'Coachella 2026',
    'Super Bowl LXI',
    'US Open Tennis',
  ],
};

export function TrendingSearches({ isOpen, onSelect }: TrendingSearchesProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleClick = (item: string) => {
    onSelect(item);
    router.push(`/search?q=${encodeURIComponent(item)}`);
  };

  return (
    <DropdownContainer>
      {Object.entries(trendingSearches).map(([category, items]) => (
        <Section key={category}>
          <SectionTitle>{category}</SectionTitle>
          {items.map((item) => (
            <TrendingItem
              key={item}
              onClick={() => handleClick(item)}
              onMouseDown={(e) => e.preventDefault()} // Prevent blur
            >
              <SearchIcon />
              <span>{item}</span>
            </TrendingItem>
          ))}
        </Section>
      ))}
    </DropdownContainer>
  );
}
