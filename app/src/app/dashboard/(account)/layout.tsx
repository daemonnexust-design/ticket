'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const Breadcrumb = styled.div`
  font-size: 12px;
  margin-bottom: 16px;
  opacity: 0.9;
  
  a {
    color: white;
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
  
  span {
    margin: 0 4px;
  }
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  padding-top: 0.05px; 
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 32px;
  overflow-x: auto;
  padding-bottom: 4px;
  -webkit-overflow-scrolling: touch;
  
  /* Hide scrollbar for cleaner look if desired, but user wants to know it's scrollable. 
     Keeping default behavior is safer for "scrollable to right and left" request. */
  &::-webkit-scrollbar {
    height: 0px;
    background: transparent; 
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 16px;
  }
`;

const TabLink = styled(Link) <{ $active?: boolean }>`
  color: ${({ $active }) => ($active ? 'white' : 'rgba(255, 255, 255, 0.7)')};
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  padding-bottom: 12px;
  border-bottom: 4px solid ${({ $active }) => ($active ? 'white' : 'transparent')};
  transition: all 0.2s;
  white-space: nowrap;
  flex-shrink: 0; 
  
  &:hover {
    color: white;
  }
`;

// Helper to check active state
const isTabActive = (pathname: string, href: string) => {
  if (href === '/dashboard/profile') {
    return pathname === href;
  }
  return pathname.startsWith(href);
};

const HeaderTop = styled.div`
  background-color: #026cdf;
  color: white;
  padding: 24px 24px 0 24px; // Removed bottom padding
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const StickyTabs = styled.div`
  position: sticky;
  top: 72px; // Approximate header height + cushion
  z-index: 90;
  background-color: #026cdf;
  padding: 12px 24px 0 24px;
  margin-bottom: 24px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); 
  
  // Ensure no gap with HeaderTop initially
  margin-top: -1px;
`;

const ContentCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 32px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 10px 3px; // Matching left card shadow
  min-height: 400px;
`;

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Find the active tab link key logic
    // We can rely on DOM query for simplicity or data attributes
    if (containerRef.current) {
      const activeTab = containerRef.current.querySelector('[data-active="true"]');
      if (activeTab) {
        activeTab.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [pathname]);

  return (
    <div style={{ width: '100%' }}>
      <HeaderTop>
        <Breadcrumb>
          <Link href="/">Home</Link>
          <span>/</span>
          <span>My Profile</span>
        </Breadcrumb>

        <Title>My Profile</Title>
      </HeaderTop>

      <StickyTabs>
        <TabsContainer ref={containerRef}>
          <TabLink
            href="/dashboard/profile"
            $active={pathname === '/dashboard/profile'}
            data-active={pathname === '/dashboard/profile'}
          >
            Profile Details
          </TabLink>
          <TabLink
            href="/dashboard/billing"
            $active={pathname.startsWith('/dashboard/billing')}
            data-active={pathname.startsWith('/dashboard/billing')}
          >
            Billing Information
          </TabLink>
          <TabLink
            href="/dashboard/security"
            $active={pathname.startsWith('/dashboard/security')}
            data-active={pathname.startsWith('/dashboard/security')}
          >
            Sign In & Security
          </TabLink>
          <TabLink
            href="/dashboard/seller"
            $active={pathname.startsWith('/dashboard/seller')}
            data-active={pathname.startsWith('/dashboard/seller')}
          >
            Seller Details
          </TabLink>
          <TabLink
            href="/dashboard/connected-accounts"
            $active={pathname.startsWith('/dashboard/connected-accounts')}
            data-active={pathname.startsWith('/dashboard/connected-accounts')}
          >
            Connected Accounts
          </TabLink>
          <TabLink
            href="/dashboard/gift-cards"
            $active={pathname.startsWith('/dashboard/gift-cards')}
            data-active={pathname.startsWith('/dashboard/gift-cards')}
          >
            Gift Cards
          </TabLink>
          <TabLink
            href="/dashboard/accessibility"
            $active={pathname.startsWith('/dashboard/accessibility')}
            data-active={pathname.startsWith('/dashboard/accessibility')}
          >
            Accessibility
          </TabLink>
        </TabsContainer>
      </StickyTabs>

      <ContentCard>
        {children}
      </ContentCard>
    </div>
  );
}
