'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Container, Flex } from '@/components/ui/primitives';
import {
  SearchIcon,
  LocationIcon,
  CalendarIcon,
  MenuIcon,
  UserIcon,
  ChevronDownIcon,
  GlobeIcon,
  HotelIcon,
  GiftIcon,
  HelpIcon,
  StarIcon
} from '@/components/ui/icons';
import { useState } from 'react';
import { CalendarDropdown } from '@/components/header/CalendarDropdown';
import { LocationDropdown } from '@/components/header/LocationDropdown';
import { TrendingSearches } from '@/components/header/TrendingSearches';
import { AccountDrawer } from '@/components/layout/AccountDrawer';
import { MobileMenu, MobileSearchOverlay } from '@/components/layout/MobileMenu';

// User type
interface UserInfo {
  id: string;
  email: string;
  fullName: string;
}

// Styled Components
const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  box-shadow: ${({ theme }) => theme.shadows.header};
`;

const UtilityBar = styled.div`
  background-color: ${({ theme }) => theme.colors.headerTopBg};
  padding: 4px 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const UtilityContent = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  height: 32px;
`;

const UtilityLink = styled.a`
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 12px;
  text-decoration: none;
  transition: opacity ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    opacity: 0.8;
    color: ${({ theme }) => theme.colors.textInverse};
  }
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

const PayPalLogo = styled.span`
  font-weight: 700;
  font-style: italic;
  font-size: 13px;
`;

const CountrySelector = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: transparent;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

const MainHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.headerBg};
  padding: 16px 0 0;
`;

const TopRow = styled(Flex)`
  align-items: center;
  gap: 24px;
  margin-bottom: 16px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-wrap: nowrap;
    gap: 16px;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: 1.7rem; // Slightly larger
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  letter-spacing: -0.5px;
  margin-right: 16px;
  white-space: nowrap;
  
  span {
    font-weight: ${({ theme }) => theme.typography.weights.regular};
    font-size: 0.5em;
    vertical-align: super;
  }
`;

// Search Bar Components
const SearchContainer = styled(Flex)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  height: 50px;
  align-items: center;
  position: relative;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none; // Hide on mobile, use mobile search overlay instead
  }
`;

const SearchSection = styled.div<{ $flex?: number; $border?: boolean; $clickable?: boolean }>`
  flex: ${({ $flex = 1 }) => $flex};
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  height: 32px; // specific height for vertical dividers
  border-right: ${({ $border, theme }) => $border ? `1px solid ${theme.colors.border}` : 'none'};
  position: relative; // For dropdown positioning
  cursor: ${({ $clickable }) => $clickable ? 'pointer' : 'default'};
  
  &:hover {
    background: ${({ $clickable }) => $clickable ? 'rgba(0, 0, 0, 0.02)' : 'transparent'};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    width: 100%;
    padding: 12px 16px;
    height: auto;
  }
`;

const SearchLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #026cdf; // Brand blue for labels
  text-transform: uppercase;
  white-space: nowrap;
  margin-bottom: 2px;
  display: block;
`;

const SearchInputContainer = styled.div`
  flex: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textPrimary};
  background: transparent;
  padding: 0;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const SearchButton = styled.button`
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: 14px;
  font-weight: 600;
  height: 100%;
  padding: 0 32px;
  border-radius: 0; // Square edges inside container? No, usually slightly rounded or full height
  border: none;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.blueDark};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    padding: 12px;
    border-radius: 0 0 8px 8px;
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textSecondary}; // Grey icons initially
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const UserActions = styled(Flex)`
  align-items: center;
  gap: 16px;
  margin-left: 16px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-left: auto;
  }
`;

const AuthButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    span {
      display: none;
    }
  }
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: 14px;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  
  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    span {
      display: none;
    }
  }
`;

const BottomRow = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }
`;

const NavLinks = styled(Flex)`
  gap: 32px;
  padding: 0;
  height: 48px;
  align-items: center;
  justify-content: center; // Centered nav links or Left? Ticketmaster is Left but constrained.
  // Actually TM has them center-ish or left aligned in the container.
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: 18px; // Correct size for TM nav
  font-weight: 500;
  padding: 0 4px;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  text-decoration: none;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background-color: ${({ theme }) => theme.colors.textInverse};
    transform: scaleX(0);
    transition: transform ${({ theme }) => theme.transitions.fast};
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.textInverse};
    
    &::after {
      transform: scaleX(1);
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  color: ${({ theme }) => theme.colors.textInverse};
  background: none;
  border: none;
  padding: 8px;
  
  svg {
    width: 24px;
    height: 24px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: flex;
  }
`;

const MobileSearchTrigger = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textInverse};
  padding: 8px;
  cursor: pointer;
  
  svg {
    width: 24px;
    height: 24px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;

// Navigation categories
const navCategories = [
  { label: 'Concerts', href: '/discover/concerts' },
  { label: 'Sports', href: '/discover/sports' },
  { label: 'Arts, Theater & Comedy', href: '/discover/arts-theater-comedy' },
  { label: 'Family', href: '/discover/family' },
  { label: 'VIP', href: '/vip' },
  { label: 'Deals', href: '/deals' },
  { label: 'Sell', href: '/sell' },
];

// Utility links
const utilityLinks = [
  { label: 'Hotels', href: 'https://www.ticketmaster.com/hotels', icon: HotelIcon, external: true },
  { label: 'Sell', href: '/sell' },
  { label: 'Gift Cards', href: 'https://www.ticketmaster.com/giftcards', icon: GiftIcon, external: true },
  { label: 'Help', href: 'https://help.ticketmaster.com/', icon: HelpIcon, external: true },
  { label: 'VIP', href: 'https://www.ticketmaster.com/vip', icon: StarIcon, external: true },
];

interface HeaderClientProps {
  user: UserInfo | null;
}

export function HeaderClient({ user }: HeaderClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [trendingOpen, setTrendingOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedDatePreset, setSelectedDatePreset] = useState('all');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [accountDrawerOpen, setAccountDrawerOpen] = useState(false);
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setLocationOpen(false);
  };

  const handleDateSelect = (preset: string) => {
    setSelectedDatePreset(preset);
    setCalendarOpen(false);
  };

  const handleTrendingSelect = (query: string) => {
    setSearchQuery(query);
    setTrendingOpen(false);
  };

  const getDateLabel = () => {
    const labels: Record<string, string> = {
      weekend: 'This Weekend',
      week: 'This Week',
      month: 'This Month',
      all: 'All Dates',
    };
    return labels[selectedDatePreset] || 'All Dates';
  };

  return (
    <HeaderWrapper>
      {/* Utility Bar */}
      <UtilityBar>
        <Container>
          <UtilityContent>
            <Flex $align="center" $gap="12px">
              <CountrySelector>
                <GlobeIcon />
                <span>US</span>
              </CountrySelector>
            </Flex>

            <Flex $gap="4px" $align="center">
              {utilityLinks.map((link) => (
                <UtilityLink
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                >
                  {link.icon && <link.icon />}
                  {link.label}
                </UtilityLink>
              ))}
              <UtilityLink href="https://www.paypal.com" target="_blank" rel="noopener noreferrer">
                <PayPalLogo>PayPal</PayPalLogo>
              </UtilityLink>
            </Flex>
          </UtilityContent>
        </Container>
      </UtilityBar>

      {/* Main Header */}
      <MainHeader>
        <Container>
          {/* Top Row: Logo, Search, User */}
          <TopRow>

            <MobileMenuButton aria-label="Open menu" onClick={() => setMobileMenuOpen(true)}>
              <MenuIcon />
            </MobileMenuButton>

            <MobileSearchTrigger aria-label="Search" onClick={() => setMobileSearchOpen(true)}>
              <SearchIcon />
            </MobileSearchTrigger>

            <Logo href="/">
              ticketmaster<span>®</span>
            </Logo>

            <SearchContainer>
              <SearchSection $border $flex={0.8} style={{ position: 'relative' }}>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, cursor: 'pointer' }}
                  onClick={() => setLocationOpen(!locationOpen)}
                >
                  <IconWrapper>
                    <LocationIcon />
                  </IconWrapper>
                  <SearchInputContainer>
                    <SearchLabel>Location</SearchLabel>
                    <SearchInput placeholder={selectedLocation} readOnly value="" style={{ color: '#1f262d', fontWeight: 500, cursor: 'pointer' }} />
                  </SearchInputContainer>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <LocationDropdown
                    isOpen={locationOpen}
                    onClose={() => setLocationOpen(false)}
                    onSelect={handleLocationSelect}
                  />
                </div>
              </SearchSection>

              <SearchSection $border $flex={0.8} style={{ position: 'relative' }}>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, cursor: 'pointer' }}
                  onClick={() => setCalendarOpen(!calendarOpen)}
                >
                  <IconWrapper>
                    <CalendarIcon />
                  </IconWrapper>
                  <SearchInputContainer>
                    <SearchLabel>Dates</SearchLabel>
                    <SearchInput placeholder={getDateLabel()} readOnly value="" style={{ color: '#1f262d', fontWeight: 500, cursor: 'pointer' }} />
                  </SearchInputContainer>
                  <IconWrapper>
                    <ChevronDownIcon />
                  </IconWrapper>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <CalendarDropdown
                    isOpen={calendarOpen}
                    onClose={() => setCalendarOpen(false)}
                    onSelect={handleDateSelect}
                    selectedPreset={selectedDatePreset}
                  />
                </div>
              </SearchSection>

              <SearchSection $flex={2} style={{ position: 'relative' }}>
                <IconWrapper>
                  <SearchIcon />
                </IconWrapper>
                <SearchInputContainer>
                  <SearchLabel>Search</SearchLabel>
                  <SearchInput
                    placeholder="Artist, Event or Venue"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={() => !searchQuery && setTrendingOpen(true)}
                    onBlur={() => setTimeout(() => setTrendingOpen(false), 200)}
                  />
                </SearchInputContainer>
                <div onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.preventDefault()}>
                  <TrendingSearches
                    isOpen={trendingOpen}
                    onSelect={handleTrendingSelect}
                  />
                </div>
              </SearchSection>

              <SearchButton onClick={handleSearch}>
                Search
              </SearchButton>
            </SearchContainer>

            <UserActions>
              {user ? (
                <>
                  <UserButton onClick={() => setAccountDrawerOpen(true)}>
                    <UserIcon />
                    <span>{user.fullName}</span>
                  </UserButton>
                  <AccountDrawer
                    isOpen={accountDrawerOpen}
                    onClose={() => setAccountDrawerOpen(false)}
                    user={user}
                  />
                </>
              ) : (
                <AuthButton href="/auth/signin">
                  <UserIcon />
                  <span>Sign In/Register</span>
                </AuthButton>
              )}
            </UserActions>
          </TopRow>

          {/* Bottom Row: Navigation Links */}
          <BottomRow>
            <NavLinks>
              {navCategories.map((category) => (
                <NavLink key={category.label} href={category.href}>
                  {category.label}
                </NavLink>
              ))}
            </NavLinks>
          </BottomRow>
        </Container>
      </MainHeader>


      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        user={user}
      />

      <MobileSearchOverlay
        isOpen={mobileSearchOpen}
        onClose={() => setMobileSearchOpen(false)}
      />
    </HeaderWrapper >
  );
}
