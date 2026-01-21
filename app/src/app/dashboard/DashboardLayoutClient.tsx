'use client';

import styled from 'styled-components';
import { Container } from '@/components/ui/primitives';

const DashboardWrapper = styled.div`
  background: #f8f9fa;
  min-height: 100vh;
  padding-top: 80px; // Account for fixed header
`;

const DashboardContent = styled(Container)`
  padding-top: 40px;
  padding-bottom: 60px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-top: 24px;
  }
`;

export function DashboardLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <DashboardWrapper>
            <DashboardContent>
                {children}
            </DashboardContent>
        </DashboardWrapper>
    );
}
