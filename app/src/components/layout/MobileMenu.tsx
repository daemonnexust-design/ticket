'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { useState } from 'react';
import { CloseIcon, SearchIcon, LocationIcon, CalendarIcon, UserIcon, MenuIcon } from '@/components/ui/icons';

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s ease;
  z-index: 9998;
`;

const MenuPanel = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 320px;
  max-width: 85vw;
  background: white;
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '-100%')});
  transition: transform 0.3s ease;
  z-index: 9999;
  display: flex;
  flex-direction: column;
`;

const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
`;

const Logo = styled.span`
  color: #026cdf;
  font-size: 22px;
  font-weight: 700;
`;

const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const MenuContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 0;
`;

const MenuSection = styled.div`
  padding: 0 20px;
  margin-bottom: 24px;
`;

const MenuSectionTitle = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
`;

const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 0;
  color: #1f262d;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 1px solid #f3f4f6;
  
  svg {
    width: 20px;
    height: 20px;
    color: #6b7280;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const MenuFooter = styled.div`
  padding: 20px;
  border-top: 1px solid #e5e7eb;
`;

const SignInButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 14px;
  background: #026cdf;
  color: white;
  text-align: center;
  border-radius: 8px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  
  &:hover {
    background: #0052b0;
  }
`;

const SignUpLink = styled.div`
  text-align: center;
  font-size: 14px;
  color: #6b7280;
  
  a {
    color: #026cdf;
    font-weight: 600;
    text-decoration: none;
  }
`;

import { signOut } from '@/lib/auth/actions';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: string;
    email: string;
    fullName: string;
  } | null;
}

export function MobileMenu({ isOpen, onClose, user }: MobileMenuProps) {
  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      <MenuPanel $isOpen={isOpen}>
        <MenuHeader>
          <Logo>ticketmaster®</Logo>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </MenuHeader>

        <MenuContent>
          <MenuSection>
            <MenuSectionTitle>Browse</MenuSectionTitle>
            <MenuLink href="/events/concerts" onClick={onClose}>
              🎵 Concerts
            </MenuLink>
            <MenuLink href="/events/sports" onClick={onClose}>
              🏈 Sports
            </MenuLink>
            <MenuLink href="/events/arts-theater" onClick={onClose}>
              🎭 Arts & Theater
            </MenuLink>
            <MenuLink href="/events/family" onClick={onClose}>
              👨‍👩‍👧 Family
            </MenuLink>
          </MenuSection>

          <MenuSection>
            <MenuSectionTitle>Quick Links</MenuSectionTitle>
            {user && (
              <>
                <MenuLink href="/dashboard" onClick={onClose}>
                  <UserIcon /> My Account
                </MenuLink>
                <MenuLink href="/orders" onClick={onClose}>
                  📦 My Orders
                </MenuLink>
              </>
            )}
            <MenuLink href="/vip" onClick={onClose}>
              ⭐ VIP Experiences
            </MenuLink>
            <MenuLink href="/sell" onClick={onClose}>
              💵 Sell Tickets
            </MenuLink>
            <MenuLink href="/help" onClick={onClose}>
              ❓ Help
            </MenuLink>
          </MenuSection>
        </MenuContent>

        <MenuFooter>
          {user ? (
            <>
              <div style={{ padding: '0 0 16px', fontWeight: 600, color: '#1f262d', textAlign: 'center' }}>
                Hi, {user.fullName}
              </div>
              <SignInButton as="button" onClick={handleSignOut} href="#" style={{ background: '#f5f5f5', color: '#1f262d', border: '1px solid #e5e7eb' }}>
                Sign Out
              </SignInButton>
            </>
          ) : (
            <>
              <SignInButton href="/auth/signin" onClick={onClose}>
                Sign In
              </SignInButton>
              <SignUpLink>
                New here? <Link href="/auth/signup" onClick={onClose}>Create account</Link>
              </SignUpLink>
            </>
          )}
        </MenuFooter>
      </MenuPanel>
    </>
  );
}

// Mobile Search Overlay
const SearchOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 9999;
  transform: translateY(${({ $isOpen }) => ($isOpen ? '0' : '-100%')});
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
`;

const SearchHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
`;

const SearchInputMobile = styled.input`
  flex: 1;
  height: 44px;
  padding: 0 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #026cdf;
  }
`;

const CancelButton = styled.button`
  background: none;
  border: none;
  color: #026cdf;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

const SearchResults = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const QuickFilter = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

const FilterChip = styled.button`
  padding: 10px 16px;
  background: #f5f5f5;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background: #e6f0ff;
    color: #026cdf;
  }
`;

interface MobileSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSearchOverlay({ isOpen, onClose }: MobileSearchProps) {
  const [query, setQuery] = useState('');

  return (
    <SearchOverlay $isOpen={isOpen}>
      <SearchHeader>
        <SearchInputMobile
          placeholder="Search events, artists, venues..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <CancelButton onClick={onClose}>Cancel</CancelButton>
      </SearchHeader>

      <SearchResults>
        <QuickFilter>
          <FilterChip>🎵 Concerts</FilterChip>
          <FilterChip>🏈 Sports</FilterChip>
          <FilterChip>🎭 Theater</FilterChip>
          <FilterChip>👨‍👩‍👧 Family</FilterChip>
        </QuickFilter>

        <MenuSectionTitle>Trending Searches</MenuSectionTitle>
        <MenuLink href="/search?q=Taylor Swift" onClick={onClose}>
          Taylor Swift
        </MenuLink>
        <MenuLink href="/search?q=NBA Playoffs" onClick={onClose}>
          NBA Playoffs
        </MenuLink>
        <MenuLink href="/search?q=Bad Bunny" onClick={onClose}>
          Bad Bunny
        </MenuLink>
      </SearchResults>
    </SearchOverlay>
  );
}
