'use client';

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { CloseIcon, ChevronDownIcon, ChevronUpIcon, UserIcon, TicketIcon, SettingsIcon, HelpIcon } from '@/components/ui/icons';

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
  right: 0; // Profile menu usually comes from right or bottom? Screenshot looks like full screen or bottom sheet. Let's do Full Screen like MobileMenu.
  left: 0;
  bottom: 0;
  width: 100%;
  background: white; // Screenshot shows white background
  transform: translateY(${({ $isOpen }) => ($isOpen ? '0' : '100%')}); // Slide up
  transition: transform 0.3s ease;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  color: #1f262d;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
//   border-bottom: 1px solid #e5e7eb;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #1f262d;
  padding: 8px;
  margin-right: -8px;
`;

const UserInfo = styled.div`
  padding: 24px;
//   border-bottom: 1px solid #f3f4f6;
`;

const WelcomeText = styled.div`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 4px;
`;

const UserName = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: #1f262d;
`;

const MenuItem = styled.div`
  border-top: 1px solid #e5e7eb;
`;

const MenuButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 600;
  color: #1f262d;
  cursor: pointer;
  text-align: left;
  
  &:hover {
    background: #f9fafb;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SubMenu = styled.div<{ $isOpen: boolean }>`
  background: #f9fafb;
  overflow: hidden;
  max-height: ${({ $isOpen }) => ($isOpen ? '500px' : '0')};
  transition: max-height 0.3s ease-in-out;
`;

const SubLink = styled.button` // Changed to button for interactions like Referral
  width: 100%;
  display: block;
  padding: 16px 24px 16px 52px; // Indented
  color: #4b5563;
  text-decoration: none;
  font-size: 15px;
  border-bottom: 1px solid #e5e7eb;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    color: #026cdf;
    background: #f3f4f6;
  }
`;

const ReferralBox = styled.div`
  padding: 16px 24px 16px 52px;
  background: #f0f9ff;
`;

const PromoCard = styled.div`
  margin-top: 16px;
  background: linear-gradient(135deg, #026cdf 0%, #004494 100%);
  color: white;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  
  &:active {
    transform: scale(0.98);
  }
`;

const PromoCode = styled.div`
  background: rgba(255,255,255,0.2);
  padding: 6px 12px;
  border-radius: 4px;
  font-family: monospace;
  font-weight: 700;
  letter-spacing: 1px;
  border: 1px dashed rgba(255,255,255,0.4);
`;

const ProgressSection = styled.div`
  margin-top: 16px;
`;

const ProgressBar = styled.div`
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: #22c55e;
  border-radius: 4px;
`;

interface MobileProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

export function MobileProfileMenu({ isOpen, onClose, user }: MobileProfileMenuProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [referralData, setReferralData] = useState({
    code: '', // Start empty to show loading state or nothing
    points: 0,
    maxPoints: 100,
    count: 0,
    maxCount: 20
  });
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function fetchReferral() {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setReferralData({
          code: data.code,
          points: data.points,
          maxPoints: data.max_points,
          count: Math.floor(data.points / data.point_value),
          maxCount: Math.floor(data.max_points / data.point_value)
        });
      } else {
        // No referral record? Generate a fallback based on name or show placeholder.
        // This ensures every user sees *something* personal, not Nancy.
        const fallbackCode = user.fullName
          ? (user.fullName.split(' ')[0] + '2026').toUpperCase()
          : 'MEMBER2026';

        setReferralData({
          code: fallbackCode,
          points: 0,
          maxPoints: 100,
          count: 0,
          maxCount: 20
        });
      }
    }

    if (isOpen) {
      fetchReferral();
    }
  }, [isOpen, user, supabase]);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const copyReferral = () => {
    navigator.clipboard.writeText(`https://tm.com/r/${referralData.code}`);
    alert('Referral link copied!');
  };

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      <MenuPanel $isOpen={isOpen}>
        <Header>
          <Title>My Account</Title>
          <CloseButton onClick={onClose}>
            <CloseIcon style={{ width: 24, height: 24 }} />
          </CloseButton>
        </Header>

        <UserInfo>
          <WelcomeText>Welcome back!</WelcomeText>
          <UserName>{user?.fullName || 'User'}</UserName>

          <PromoCard onClick={copyReferral}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700' }}>Share & Earn</div>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>Get $5 for every friend you refer.</div>
            </div>
            <PromoCode>{referralData.code}</PromoCode>
          </PromoCard>

          <ProgressSection>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#4b5563' }}>
              <span>Your Progress</span>
              <span>${referralData.points} / ${referralData.maxPoints}</span>
            </div>
            <ProgressBar>
              <ProgressFill style={{ width: `${(referralData.points / referralData.maxPoints) * 100}%` }} />
            </ProgressBar>
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '6px' }}>
              {referralData.count} / {referralData.maxCount} Referrals
            </div>
          </ProgressSection>
        </UserInfo>

        <div style={{ background: '#f9fafb', height: '12px' }}></div>

        {/* My Tickets */}
        <MenuItem>
          <MenuButton onClick={() => toggleSection('tickets')}>
            <IconWrapper>
              <TicketIcon style={{ width: 20, height: 20 }} />
              My Tickets
            </IconWrapper>
            {openSection === 'tickets' ? <ChevronUpIcon style={{ width: 20, height: 20 }} /> : <ChevronDownIcon style={{ width: 20, height: 20 }} />}
          </MenuButton>
          <SubMenu $isOpen={openSection === 'tickets'}>
            <SubLink as={Link} href="/dashboard/tickets" onClick={onClose}>Upcoming Events</SubLink>
            <SubLink as={Link} href="/dashboard/past-events" onClick={onClose}>Past Events</SubLink>
          </SubMenu>
        </MenuItem>

        {/* My Profile */}
        <MenuItem>
          <MenuButton onClick={() => toggleSection('profile')}>
            <IconWrapper>
              <UserIcon style={{ width: 20, height: 20 }} />
              My Profile
            </IconWrapper>
            {openSection === 'profile' ? <ChevronUpIcon style={{ width: 20, height: 20 }} /> : <ChevronDownIcon style={{ width: 20, height: 20 }} />}
          </MenuButton>
          <SubMenu $isOpen={openSection === 'profile'}>
            <SubLink as={Link} href="/dashboard/profile" onClick={onClose}>Profile Details</SubLink>
            <SubLink as={Link} href="/dashboard/billing" onClick={onClose}>Billing Information</SubLink>
            <SubLink as={Link} href="/dashboard/security" onClick={onClose}>Sign In & Security</SubLink>
            <SubLink as={Link} href="/dashboard/seller" onClick={onClose}>Seller Details</SubLink>
            <SubLink as={Link} href="/dashboard/gift-cards" onClick={onClose}>Gift Cards</SubLink>
            <SubLink as={Link} href="/dashboard/connected-accounts" onClick={onClose}>Connected Accounts</SubLink>
            <SubLink as={Link} href="/dashboard/accessibility" onClick={onClose}>Accessibility</SubLink>
          </SubMenu>
        </MenuItem>

        {/* My Settings */}
        <MenuItem>
          <MenuButton onClick={() => toggleSection('settings')}>
            <IconWrapper>
              <SettingsIcon style={{ width: 20, height: 20 }} />
              My Settings
            </IconWrapper>
            {openSection === 'settings' ? <ChevronUpIcon style={{ width: 20, height: 20 }} /> : <ChevronDownIcon style={{ width: 20, height: 20 }} />}
          </MenuButton>
          <SubMenu $isOpen={openSection === 'settings'}>
            <SubLink as={Link} href="/dashboard/settings/alerts" onClick={onClose}>Alerts & Notifications</SubLink>
            <SubLink as={Link} href="/dashboard/settings/preferences" onClick={onClose}>Preferences</SubLink>
          </SubMenu>
        </MenuItem>

        {/* Sign Out */}
        <MenuItem>
          <MenuButton onClick={() => { router.push('/auth/signout'); onClose(); }}>
            <IconWrapper>
              {/* SignOut Icon? Using ArrowRight for now */}
              <div style={{ transform: 'rotate(180deg)' }}>➜</div>
              Sign Out
            </IconWrapper>
          </MenuButton>
        </MenuItem>

        {/* Help */}
        <MenuItem style={{ marginTop: 'auto', borderTop: 'none', borderBottom: '1px solid #e5e7eb' }}>
          <MenuButton onClick={() => router.push('/help')}>
            <IconWrapper>
              <HelpIcon style={{ width: 20, height: 20 }} />
              Need Help?
            </IconWrapper>
          </MenuButton>
        </MenuItem>

      </MenuPanel>
    </>
  );
}
