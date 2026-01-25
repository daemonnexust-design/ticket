'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { useState } from 'react';
import { CloseIcon, ChevronDownIcon, HotelIcon, GiftIcon, HelpIcon } from '@/components/ui/icons';

// --- Styled Components ---

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
  width: 100%;
  background: #111111;
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '-100%')});
  transition: transform 0.3s ease;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  color: white;
  overflow: hidden;
`;

const ViewContainer = styled.div<{ $active: boolean; $isSubMenu?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #111111;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  transform: translateX(${({ $active, $isSubMenu }) => {
    if ($active) return '0';
    return $isSubMenu ? '100%' : '-30%';
  }});
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  pointer-events: ${({ $active }) => ($active ? 'auto' : 'none')};
  z-index: ${({ $active }) => ($active ? 2 : 1)};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  height: 60px;
`;

const Logo = styled.span`
  color: white;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;
    span {
      font-size: 0.5em;
      vertical-align: super;
      font-weight: 400;
  }
`;

const SubMenuHeaderTitle = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px; 
  font-weight: 700;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0;
  text-align: left;
  
  svg {
    width: 24px;
    height: 24px;
    transform: rotate(90deg);
    margin-right: 8px;
    flex-shrink: 0;
  }
`;

const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px 0;
`;

const NavButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  color: white;
  background: none;
  border: none;
  text-decoration: none;
  font-size: 18px;
  font-weight: 800;
  text-transform: uppercase;
  cursor: pointer;
  text-align: left;
  
  &:hover {
    color: #ddd;
  }

  svg {
      transform: rotate(-90deg);
      width: 20px;
      height: 20px;
      color: white;
  }
`;

const NavLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: 800;
  text-transform: uppercase;
  
  &:hover {
    color: #ddd;
  }

  svg {
      transform: rotate(-90deg);
      width: 20px;
      height: 20px;
      color: white;
  }
`;

const Footer = styled.div`
  padding: 0 24px 24px 24px;
  border-top: 1px solid #333;
`;

const FooterLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 0;
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: 400;
  border-bottom: 1px solid #333;
  
  &:last-child {
      border-bottom: none;
  }

  svg {
      width: 20px;
      height: 20px;
      color: white;
  }
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 800;
  text-transform: uppercase;
  margin: 24px 24px 16px;
  color: white;
`;

const SubLink = styled(Link)`
  display: block;
  padding: 16px 24px; /* Increased from 12px for larger touch target */
  min-height: 48px;   /* Ensure minimum 48px height */
  color: #ccc;
  font-size: 16px;
  text-decoration: none;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  
  &:hover {
      color: white;
      background: rgba(255,255,255,0.05);
  }
`;

const DiscoverLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  color: #026cdf;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  margin-bottom: 8px;

  svg {
      width: 16px;
      height: 16px;
      transform: rotate(-90deg);
  }
`;

const Divider = styled.div`
    height: 1px;
    background: #333;
    margin: 16px 24px;
`;


// --- Data ---

const CONCERTS_DATA = {
  title: 'Concerts',
  allLink: '/events/concerts',
  popular: ['Rock', 'Hip-Hop/Rap', 'Country', 'Latin', 'Alternative'],
  discover: [
    'Alternative', 'Ballads/Romantic', 'Blues', "Children's Music",
    'Classical', 'Country', 'Dance/Electronic', 'Folk', 'Hip-Hop/Rap',
    'Holiday', 'Jazz', 'Latin', 'Medieval/Renaissance', 'Metal',
    'New Age', 'Other', 'Pop', 'R&B', 'Reggae', 'Religious', 'Rock', 'World'
  ]
};

const SPORTS_DATA = {
  title: 'Sports',
  allLink: '/events/sports',
  popular: ['MLB', 'NFL', 'NBA', 'NHL', 'MLS'],
  discover: [
    'Baseball', 'Basketball', 'Boxing', 'Equestrian', 'eSports',
    'Football', 'Golf', 'Gymnastics', 'Hockey', 'Ice Skating',
    'Indoor Soccer', 'Lacrosse', 'Martial Arts', 'Motorsports/Racing',
    'Rodeo', 'Rugby', 'Soccer', 'Softball', 'Swimming', 'Tennis', 'Track & Field'
  ]
};

const ARTS_DATA = {
  title: 'Arts, Theater & Comedy',
  allLink: '/events/arts-theater',
  popular: ['Comedy', 'Broadway', 'Spectacular'],
  discover: [
    'Broadway', "Children's Theater", 'Circus & Specialty Acts', 'Classical', 'Comedy',
    'Cultural', 'Dance', 'Espectaculo', 'Fashion', 'Fine Art',
    'Magic & Illusion', 'Miscellaneous', 'Multimedia', 'Music', 'Opera',
    'Performance Art', 'Puppetry', 'Spectacular', 'Theater', 'Variety'
  ]
};

const FAMILY_DATA = {
  title: 'Family',
  allLink: '/events/family',
  popular: ['Ice Shows', 'Circus/Specialty Acts', "Children's Theater"],
  discover: [
    "Children's Music", "Children's Theater", 'Circus/Specialty Acts',
    'Fairs/Festivals', 'Film/Family', 'Ice Shows', "Latin Children's",
    'Magic/Illusion'
  ]
};

const CITIES_DATA = {
  title: 'Cities',
  allLink: '/events/local',
  popular: ['New York City', 'Los Angeles', 'Las Vegas', 'Chicago', 'Atlanta'],
  discover: [
    'Albuquerque', 'Austin', 'Baltimore', 'Birmingham', 'Boston', 'Charlotte'
  ]
};

// --- Component ---

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
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  if (typeof window !== 'undefined') {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }

  const handleClose = () => {
    setActiveSubmenu(null);
    onClose();
  };

  const getSubMenuData = (key: string | null) => {
    switch (key) {
      case 'concerts': return CONCERTS_DATA;
      case 'sports': return SPORTS_DATA;
      case 'arts': return ARTS_DATA;
      case 'family': return FAMILY_DATA;
      case 'cities': return CITIES_DATA;
      default: return null;
    }
  };

  const subData = getSubMenuData(activeSubmenu);

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={handleClose} />
      <MenuPanel $isOpen={isOpen}>

        {/* Main View */}
        <ViewContainer $active={!activeSubmenu}>
          <Header>
            <Logo>ticketmaster<span>®</span></Logo>
            <CloseButton onClick={handleClose}>
              <CloseIcon />
            </CloseButton>
          </Header>

          <ScrollArea>
            <NavButton onClick={() => setActiveSubmenu('concerts')}>
              Concerts <ChevronDownIcon />
            </NavButton>
            <NavButton onClick={() => setActiveSubmenu('sports')}>
              Sports <ChevronDownIcon />
            </NavButton>
            <NavButton onClick={() => setActiveSubmenu('arts')}>
              Arts, Theater & Comedy <ChevronDownIcon />
            </NavButton>
            <NavButton onClick={() => setActiveSubmenu('family')}>
              Family <ChevronDownIcon />
            </NavButton>
            <NavButton onClick={() => setActiveSubmenu('cities')}>
              Cities <ChevronDownIcon />
            </NavButton>
          </ScrollArea>

          <Footer>
            <FooterLink href="#" onClick={handleClose}>
              <HotelIcon /> Hotels
            </FooterLink>
            <FooterLink href="/sell" onClick={handleClose}>
              Sell
            </FooterLink>
            <FooterLink href="#" onClick={handleClose}>
              <GiftIcon /> Gift Cards
            </FooterLink>
            <FooterLink href="/help" onClick={handleClose}>
              Help
            </FooterLink>
            <FooterLink href="/vip" onClick={handleClose}>
              VIP
            </FooterLink>
          </Footer>
        </ViewContainer>

        {/* Generic Sub Menu */}
        <ViewContainer $active={!!activeSubmenu} $isSubMenu>
          {subData && (
            <>
              <Header>
                <SubMenuHeaderTitle onClick={() => setActiveSubmenu(null)}>
                  <ChevronDownIcon /> {subData.title}
                </SubMenuHeaderTitle>
                <CloseButton onClick={handleClose}>
                  <CloseIcon />
                </CloseButton>
              </Header>

              <ScrollArea>
                <SectionTitle>Popular</SectionTitle>
                {subData.popular.map(item => (
                  <SubLink key={item} href={`${subData.allLink}/${item.toLowerCase().replace('/', '-').replace(' ', '-')}`} onClick={handleClose}>
                    {item}
                  </SubLink>
                ))}

                <Divider />

                <SectionTitle>Discover More</SectionTitle>
                <DiscoverLink href={subData.allLink} onClick={handleClose}>
                  All {subData.title} <ChevronDownIcon />
                </DiscoverLink>

                {subData.discover.map(item => (
                  <SubLink key={item} href={`${subData.allLink}/${item.toLowerCase().replace('/', '-').replace(' ', '-')}`} onClick={handleClose}>
                    {item}
                  </SubLink>
                ))}

              </ScrollArea>
            </>
          )}
        </ViewContainer>

      </MenuPanel>
    </>
  );
}

// Mobile Search Overlay (Unchanged)
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
          aria-label="Search events, artists, venues"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <CancelButton onClick={onClose}>Cancel</CancelButton>
      </SearchHeader>
    </SearchOverlay>
  );
}
