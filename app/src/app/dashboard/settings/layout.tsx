'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = styled.div`
  background-color: #026cdf;
  color: white;
  padding: 32px 24px 0 24px;
  margin-bottom: 32px;
  border-radius: 8px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 24px;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 32px;
`;

const TabLink = styled(Link) <{ $active?: boolean }>`
  color: ${({ $active }) => ($active ? 'white' : 'rgba(255, 255, 255, 0.7)')};
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  padding-bottom: 12px;
  border-bottom: 4px solid ${({ $active }) => ($active ? 'white' : 'transparent')};
  transition: all 0.2s;
  
  &:hover {
    color: white;
  }
`;

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div style={{ width: '100%' }}>
            <Header>
                <Title>My Settings</Title>
                <TabsContainer>
                    <TabLink href="/dashboard/settings/alerts" $active={pathname === '/dashboard/settings/alerts'}>
                        Manage Alerts
                    </TabLink>
                    <TabLink href="/dashboard/settings/preferences" $active={pathname === '/dashboard/settings/preferences'}>
                        Manage Preferences
                    </TabLink>
                </TabsContainer>
            </Header>
            {children}
        </div>
    );
}
