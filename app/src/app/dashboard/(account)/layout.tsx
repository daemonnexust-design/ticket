'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  margin-bottom: 3px; // Reduced from 24px to 3px as requested
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

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div style={{ width: '100%' }}>
            <ProfileHeader>
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
            </ProfileHeader>

            {children}
        </div>
    );
}
