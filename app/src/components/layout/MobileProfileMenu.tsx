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
  z-index: 10000;
`;

const MenuPanel = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 360px;
  background: white;
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')}); 
  transition: transform 0.3s ease-out;
  z-index: 10001;
  display: flex;
  flex-direction: column;
  color: #1f262d;
  box-shadow: -4px 0 20px rgba(0,0,0,0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f3f4f6;
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
  padding: 14px 20px;
  background: none;
  border: none;
  font-size: 15px;
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

const SubLink = styled(Link)`
  display: block;
  padding: 12px 24px 12px 56px;
  color: #4b5563;
  text-decoration: none;
  font-size: 14px;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    color: #026cdf;
    background: #f3f4f6;
  }
`;

const PromoCard = styled.div`
  margin-top: 16px;
  background: linear-gradient(135deg, #026cdf 0%, #004494 100%);
  color: white;
  padding: 16px;
  border-radius: 8px;
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
  text-align: center;
  margin-top: 8px;
`;

const ProgressSection = styled.div`
  margin-top: 12px;
`;

const ProgressBar = styled.div`
  height: 6px;
  background: rgba(255,255,255,0.2);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 4px;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: #4ade80;
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
    code: '',
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

      const { data } = await supabase
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
    if (!referralData.code) return;
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
          <UserName>
            {user?.user_metadata?.full_name ||
              user?.user_metadata?.name ||
              user?.identities?.[0]?.identity_data?.full_name ||
              user?.email?.split('@')[0] ||
              'User'}
          </UserName>

          <PromoCard onClick={copyReferral}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: '14px' }}>Share & Earn</span>
              <span style={{ fontWeight: 600, fontSize: '13px' }}>$5 / friend</span>
            </div>
            <PromoCode>{referralData.code || 'Loading...'}</PromoCode>

            <ProgressSection>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, marginBottom: '2px' }}>
                <span>${referralData.points}</span>
                <span>${referralData.maxPoints} limit</span>
              </div>
              <ProgressBar>
                <ProgressFill style={{ width: `${(referralData.points / referralData.maxPoints) * 100}%` }} />
              </ProgressBar>
            </ProgressSection>
          </PromoCard>
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
            <SubLink href="/dashboard/tickets" onClick={onClose}>Upcoming Events</SubLink>
            <SubLink href="/dashboard/past-events" onClick={onClose}>Past Events</SubLink>
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
            <SubLink href="/dashboard/profile" onClick={onClose}>Profile Details</SubLink>
            <SubLink href="/dashboard/billing" onClick={onClose}>Billing Information</SubLink>
            <SubLink href="/dashboard/security" onClick={onClose}>Sign In & Security</SubLink>
            <SubLink href="/dashboard/seller" onClick={onClose}>Seller Details</SubLink>
            <SubLink href="/dashboard/gift-cards" onClick={onClose}>Gift Cards</SubLink>
            <SubLink href="/dashboard/connected-accounts" onClick={onClose}>Connected Accounts</SubLink>
            <SubLink href="/dashboard/accessibility" onClick={onClose}>Accessibility</SubLink>
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
            <SubLink href="/dashboard/settings/alerts" onClick={onClose}>Alerts & Notifications</SubLink>
            <SubLink href="/dashboard/settings/preferences" onClick={onClose}>Preferences</SubLink>
          </SubMenu>
        </MenuItem>

        {/* Sign Out */}
        <MenuItem>
          <MenuButton onClick={() => { router.push('/auth/signout'); onClose(); }}>
            <IconWrapper>
              <div style={{ transform: 'rotate(180deg)', color: '#dc2626' }}>➜</div>
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
