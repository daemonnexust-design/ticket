'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Container, Flex } from '@/components/ui/primitives';
import {
  SearchIcon,
  UserIcon,
  MenuIcon,
  TicketIcon,
  HelpIcon,
  GiftIcon,
  CalendarIcon
} from '@/components/ui/icons';
import { FullCalendarDropdown } from '@/components/header/FullCalendarDropdown';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { TrendingSearches } from '@/components/header/TrendingSearches';

// --- Styled Components ---

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  box-shadow: ${({ theme }) => theme.shadows.header};
  background-color: #026cdf; 
`;

const MainHeader = styled.div`
  background-color: #026cdf;
  padding: 12px 0;
  color: white;
`;

const UtilityBar = styled.div`
  background-color: transparent;
  padding: 6px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 12px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const UtilityLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-left: 20px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0.9;
  
  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  color: white;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin-right: 32px;
  text-decoration: none;
  
  &:hover {
    opacity: 0.9;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-right: auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: white;
  font-size: 15px;
  font-weight: 600;
  padding: 8px 12px;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1; // Take available space
  max-width: 400px;
  margin: 0 24px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    // On mobile, maybe just an icon or smaller
    display: none; // Using mobile specific search usually
  }
`;

const SearchInput = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.15); // Glassy
  border: none;
  border-radius: 4px;
  padding: 10px 16px 10px 40px;
  color: white;
  font-size: 15px;
  transition: all 0.2s;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    background: white;
    color: #1f262d;
    outline: none;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  pointer-events: none;
  
  ${SearchInput}:focus ~ & {
    color: #1f262d;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const UserButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const MobileControls = styled.div`
  display: none;
  align-items: center;
  gap: 16px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;

const DateButton = styled.button`
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 8px;
    
    &:hover {
        background: rgba(255,255,255,0.1);
        border-radius: 50%;
    }
`;


interface HeaderClientProps {
  user: any; // Using any to be safe with the ad-hoc object passed from Header.tsx, or define specific shape
}

export function HeaderClient({ user }: HeaderClientProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const router = useRouter();

  const handleDateSelect = (range: string) => {
    // Navigate to search with date param
    router.push(`/search?date=${encodeURIComponent(range)}`);
    setCalendarOpen(false);
  };

  const handleSearchFocus = () => setSearchFocused(true);
  const handleSearchBlur = () => {
    // Delay to allow click on trending items
    setTimeout(() => setSearchFocused(false), 200);
  };

  return (
    <HeaderWrapper>
      {/* Top Utility Bar */}
      <Container>
        <Flex $justify="flex-end">
          <UtilityBar>
            <Flex>
              <UtilityLink href="/gift-cards"><GiftIcon /> Gift Cards</UtilityLink>
              <UtilityLink href="/help"><HelpIcon /> Help</UtilityLink>
              <UtilityLink href="/sell"><TicketIcon /> Sell</UtilityLink>
            </Flex>
          </UtilityBar>
        </Flex>
      </Container>

      <MainHeader>
        <Container>
          <Flex $align="center" $justify="space-between">
            {/* Logo & Desktop Nav */}
            <Flex $align="center" style={{ flex: 1 }}>
              <Logo href="/">ticketmaster</Logo>

              <Nav>
                <NavLink href="/discover/concerts">Concerts</NavLink>
                <NavLink href="/discover/sports">Sports</NavLink>
                <NavLink href="/discover/arts-theater">Arts & Theater</NavLink>
                <NavLink href="/discover/family">Family</NavLink>
              </Nav>
            </Flex>

            {/* Search Bar */}
            <SearchContainer>
              <SearchInput
                placeholder="Find millions of live experiences"
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
              />
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>

              {/* Trending Drops when focused */}
              {searchFocused && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, paddingTop: '8px' }}>
                  <TrendingSearches
                    isOpen={true}
                    onSelect={(q) => {
                      setSearchFocused(false);
                      // Router push handled inside component? 
                      // Actually TrendingSearches does router.push but also calls onSelect.
                      // Just update UI state here.
                    }}
                  />
                </div>
              )}
            </SearchContainer>

            {/* User & Calendar */}
            <UserSection>
              <DateButton onClick={() => setCalendarOpen(!calendarOpen)}>
                <CalendarIcon />
              </DateButton>

              {user ? (
                <UserButton onClick={() => router.push('/dashboard')}>
                  <UserIcon />
                  <span style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.fullName || user.email}
                  </span>
                </UserButton>
              ) : (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <NavLink href="/auth/signin">Sign In</NavLink>
                </div>
              )}
            </UserSection>

            {/* Mobile Controls */}
            <MobileControls>
              <DateButton onClick={() => setCalendarOpen(!calendarOpen)}>
                <CalendarIcon />
              </DateButton>
              <button onClick={() => setMobileMenuOpen(true)} style={{ background: 'none', border: 'none', color: 'white' }}>
                <MenuIcon />
              </button>
            </MobileControls>
          </Flex>
        </Container>
      </MainHeader>

      {/* Dropdowns / Modals */}
      <FullCalendarDropdown
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        onSelect={handleDateSelect}
      />

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        user={user}
      />
    </HeaderWrapper>
  );
}
