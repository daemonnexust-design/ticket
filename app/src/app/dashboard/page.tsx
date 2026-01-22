'use client';

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { Flex, Grid } from '@/components/ui/primitives';

const HeaderSection = styled.div`
  margin-bottom: 32px;
`;

const Greeting = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 8px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 24px;
  }
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 16px;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.03);
`;

const ReferralCard = styled(Card)`
  background: linear-gradient(135deg, #026cdf 0%, #004494 100%);
  color: white;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }
`;

const ReferralTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ReferralDescription = styled.p`
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 24px;
  line-height: 1.5;
`;

const ProgressBarContainer = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  height: 24px;
  width: 100%;
  margin-bottom: 12px;
  position: relative;
  overflow: hidden;
`;

const ProgressBarFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  background: linear-gradient(90deg, #4ade80 0%, #22c55e 100%);
  border-radius: 12px;
  transition: width 1s ease-out;
  box-shadow: 0 0 10px rgba(74, 222, 128, 0.4);
`;

const ProgressStats = styled(Flex)`
  justify-content: space-between;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 32px;
`;

const ReferralLinkBox = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: 16px;
`;

const LinkText = styled.span`
  font-family: monospace;
  font-size: 14px;
  letter-spacing: 1px;
`;

const CopyButton = styled.button`
  background: white;
  color: #026cdf;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.1s;
  
  &:active {
    transform: scale(0.95);
  }
  
  &:hover {
    background: #f0f9ff;
  }
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin: 32px 0 16px;
  color: #1f262d;
`;

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [referralData, setReferralData] = useState({
    code: 'LOADING...',
    points: 0,
    maxPoints: 20,
    pointValue: 5,
  });

  const progressPercent = (referralData.points / referralData.maxPoints) * 100;
  const earnings = referralData.points * referralData.pointValue;
  const maxEarnings = referralData.maxPoints * referralData.pointValue;

  const supabase = createClient();

  useEffect(() => {
    const fetchUserAndReferral = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        // Fetch referral data for this user
        const { data: referral, error } = await supabase
          .from('referrals')
          .select('code, points, max_points, point_value')
          .eq('user_id', user.id)
          .single();

        if (referral && !error) {
          setReferralData({
            code: referral.code,
            points: referral.points,
            maxPoints: referral.max_points,
            pointValue: referral.point_value,
          });
        }
      }

      setLoading(false);
    };
    fetchUserAndReferral();
  }, [supabase]);


  const handleCopy = () => {
    navigator.clipboard.writeText(`https://ticketmaster-clone.com/register?ref=${referralData.code}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <HeaderSection>
        <Greeting>{loading ? 'Loading...' : `Welcome back, ${user?.user_metadata?.full_name || 'Fan'}!`}</Greeting>
        <Subtitle>Manage your tickets, orders, and rewards.</Subtitle>
      </HeaderSection>

      <DashboardGrid>
        <div>
          {/* Placeholder for future ticket/order content */}
          <Card style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
            No upcoming events. Browse events to get started!
          </Card>
        </div>

        <div>
          <ReferralCard>
            <ReferralTitle>
              <span style={{ fontSize: '24px' }}>🎁</span> Share & Earn
            </ReferralTitle>
            <ReferralDescription>
              Invite friends to join. You get $5 for every friend who registers (up to $100).
            </ReferralDescription>

            <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
              Your Progress
            </div>
            <ProgressBarContainer>
              <ProgressBarFill $percent={progressPercent} />
            </ProgressBarContainer>
            <ProgressStats>
              <span>{referralData.points} Users Referred</span>
              <span>${earnings} / ${maxEarnings} Earned</span>
            </ProgressStats>

            <div style={{ fontSize: '12px', fontWeight: 500, opacity: 0.8, marginBottom: '4px' }}>
              YOUR REFERRAL CODE
            </div>
            <ReferralLinkBox>
              <LinkText>{referralData.code}</LinkText>
              <CopyButton onClick={handleCopy}>
                {copied ? 'COPIED!' : 'COPY'}
              </CopyButton>
            </ReferralLinkBox>
          </ReferralCard>

          <Card style={{ marginTop: '24px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>Account Stats</h4>
            <Flex style={{ justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
              <span style={{ color: '#6b7280' }}>Total Orders</span>
              <span style={{ fontWeight: 600 }}>0</span>
            </Flex>
            <Flex style={{ justifyContent: 'space-between', fontSize: '14px' }}>
              <span style={{ color: '#6b7280' }}>Member Since</span>
              <span style={{ fontWeight: 600 }}>Jan 2026</span>
            </Flex>
          </Card>
        </div>
      </DashboardGrid>
    </div>
  );
}
