// Imports
import { FullCalendarDropdown } from '@/components/header/FullCalendarDropdown';

// Styled Components Updates
const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  box-shadow: ${({ theme }) => theme.shadows.header};
  background-color: #026cdf; // Force Brand Blue
`;

const UtilityBar = styled.div`
  background-color: transparent; // Blend with header
  padding: 4px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const MainHeader = styled.div`
  background-color: #026cdf; // Brand Blue
  padding: 20px 0 0; // Increased padding slightly
  color: white;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  color: white; // Explicit white
  font-size: 2.0rem; // Bigger
  font-weight: 800; // Bolder
  letter-spacing: -0.5px;
  margin-right: 24px;
  white-space: nowrap;
  
  span {
    font-weight: 400;
    font-size: 0.5em;
    vertical-align: super;
  }
`;

const NavLink = styled(Link)`
  color: white;
  font-size: 16px;
  font-weight: 600;
  padding: 0 8px;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  text-decoration: none;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px; // Align with border
    left: 0;
    right: 0;
    height: 4px;
    background-color: white;
    transform: scaleX(0);
    transition: transform 0.2s;
  }
  
  &:hover {
    color: white;
    opacity: 1;
    &::after {
      transform: scaleX(1);
    }
  }
`;

// In Component: Replace CalendarDropdown
// ...
                  <FullCalendarDropdown
                    isOpen={calendarOpen}
                    onClose={() => setCalendarOpen(false)}
                    onSelect={handleDateSelect}
                  />
// ...


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
