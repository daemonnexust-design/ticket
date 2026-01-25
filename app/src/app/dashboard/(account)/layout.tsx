'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const ProfileHeader = styled.div`
  background-color: #026cdf;
  color: white;
  padding: 24px 24px 0 24px;
  margin-bottom: 32px;
  border-radius: 8px;
`;

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
  margin-bottom: 0.5px; // Reduced to 0.5px as requested
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
      <ProfileHeader>
        <Breadcrumb>
          <Link href="/">Home</Link>
          <span>/</span>
          <span>My Profile</span>
        </Breadcrumb>

        <Title>My Profile</Title>

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
      </ProfileHeader>

      {children}
    </div>
  );
}
