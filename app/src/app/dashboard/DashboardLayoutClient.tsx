'use client';

import styled from 'styled-components';
import { Container } from '@/components/ui/primitives';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';

const DashboardWrapper = styled.div`
  background: #f8f9fa;
  min-height: 100vh;
  padding-top: 0; // Header removed
`;

const ContentGrid = styled(Container)`
  padding-top: 40px;
  padding-bottom: 60px;
  display: flex;
  gap: 32px;
  align-items: flex-start;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    padding-top: 24px;
    gap: 0;
  }
`;

const MainContent = styled.div`
  flex: 1;
  width: 100%; // Ensure full width on mobile
  min-width: 0; // Prevent flex overflow
`;

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardWrapper>
      <ContentGrid>
        <DashboardSidebar />
        <MainContent>
          {children}
        </MainContent>
      </ContentGrid>
    </DashboardWrapper>
  );
}
