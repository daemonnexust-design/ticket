'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/ui/primitives';

const ProfileHeader = styled.div`
  background-color: #026cdf;
  color: white;
  padding: 24px 0 0 0;
  margin-bottom: 32px;
  /* To break out of the parent container padding if needed, but since this is inside DashboardContent which has padding,
     we might want to adjust. However, based on the screenshot, it looks like a full-width header within the main area?
     Actually, the screenshot shows "Home / My Profile" breadcrumb.
     Let's keep it simple for now and fit within the container.
  */
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
  margin-bottom: 24px;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 32px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 16px;
    overflow-x: auto;
    padding-bottom: 4px;
    -webkit-overflow-scrolling: touch;
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

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div style={{ width: '100%' }}>
      {/* We need to break out of the default container padding for the full blue background experience 
                if possible, or just style it as a block. 
                Given DashboardLayoutClient puts everything in a Container, let's just make this a block.
                The screenshot implies the blue header might be full width or at least wide.
                We'll apply negative margin to simulate full width if inside a constrained container, 
                or just accept it's within the container. 
                Let's stick to simple first.
            */}
      <div style={{ background: '#026cdf', borderRadius: '8px', padding: '24px 24px 0 24px', marginBottom: '32px' }}>
        <Breadcrumb>
          <Link href="/">Home</Link>
          <span>/</span>
          <span>My Profile</span>
        </Breadcrumb>

        <Title>My Profile</Title>

        <TabsContainer>
          <TabLink href="/dashboard/profile" $active={pathname === '/dashboard/profile'}>
            Profile Details
          </TabLink>
          <TabLink href="/dashboard/billing" $active={pathname.startsWith('/dashboard/billing')}>
            Billing Information
          </TabLink>
          <TabLink href="/dashboard/security" $active={pathname.startsWith('/dashboard/security')}>
            Sign In & Security
          </TabLink>
          <TabLink href="/dashboard/seller" $active={pathname.startsWith('/dashboard/seller')}>
            Seller Details
          </TabLink>
          <TabLink href="/dashboard/connected-accounts" $active={pathname.startsWith('/dashboard/connected-accounts')}>
            Connected Accounts
          </TabLink>
          <TabLink href="/dashboard/gift-cards" $active={pathname.startsWith('/dashboard/gift-cards')}>
            Gift Cards
          </TabLink>
          <TabLink href="/dashboard/accessibility" $active={pathname.startsWith('/dashboard/accessibility')}>
            Accessibility
          </TabLink>
        </TabsContainer>
      </div>

      {children}
    </div>
  );
}
