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
import { MobileProfileMenu } from '@/components/layout/MobileProfileMenu';
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

const MobileBtn = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
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
  user: any;
}

export function HeaderClient({ user }: HeaderClientProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const router = useRouter();

  const handleDateSelect = (range: string) => {
    router.push(`/search?date=${encodeURIComponent(range)}`);
    setCalendarOpen(false);
  };

  const handleSearchFocus = () => setSearchFocused(true);
  const handleSearchBlur = () => {
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
          <Flex $align="center" $justify="space-between" style={{ width: '100%' }}>
            {/* Mobile: Hamburger (Left) */}
            <MobileBtn onClick={() => setMobileMenuOpen(true)}>
              <MenuIcon style={{ width: 24, height: 24 }} />
            </MobileBtn>

            {/* Logo & Desktop Nav */}
            <Flex $align="center" style={{ flex: 1, justifyContent: 'flex-start' }}>
              <Logo href="/">ticketmaster</Logo>

              <Nav>
                <NavLink href="/discover/concerts">Concerts</NavLink>
                <NavLink href="/discover/sports">Sports</NavLink>
                <NavLink href="/discover/arts-theater">Arts & Theater</NavLink>
                <NavLink href="/discover/family">Family</NavLink>
              </Nav>
            </Flex>

            {/* Search Bar (Desktop) */}
            <SearchContainer>
              <SearchInput
                placeholder="Find millions of live experiences"
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
              />
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>

              {searchFocused && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, paddingTop: '8px' }}>
                  <TrendingSearches
                    isOpen={true}
                    onSelect={(q) => {
                      setSearchFocused(false);
                    }}
                  />
                </div>
              )}
            </SearchContainer>

            {/* Desktop User Section */}
            <UserSection>
              <DateButton onClick={() => setCalendarOpen(!calendarOpen)}>
                <CalendarIcon />
              </DateButton>

              {user ? (
                <UserButton onClick={() => setProfileMenuOpen(true)}>
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

            {/* Mobile: Profile (Right) */}
            <MobileBtn onClick={() => user ? setProfileMenuOpen(true) : router.push('/auth/signin')}>
              <UserIcon style={{ width: 24, height: 24 }} />
            </MobileBtn>
          </Flex>
        </Container>
      </MainHeader>

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

      {/* Add Profile Menu */}
      <MobileProfileMenu
        isOpen={profileMenuOpen}
        onClose={() => setProfileMenuOpen(false)}
        user={user}
      />
    </HeaderWrapper>
  );
}
