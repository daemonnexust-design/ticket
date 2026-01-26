'use client';

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  TicketIcon,
  UserIcon,
  SettingsIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  HelpIcon
} from '@/components/ui/icons';

const SidebarContainer = styled.div`
  width: 280px;
  background: white;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 10px 3px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 1000px; /* User requested specific height */
  scroll-behavior: smooth;
  padding-bottom: 88px;
  position: sticky;
  top: 20px;
  margin-right: 24px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const SidebarHeader = styled.div`
  background: #026cdf;
  color: white;
  padding: 24px;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  color: white;
  display: block;
  width: fit-content;
  
  &:hover { opacity: 0.9; }
`;

const LogoT = styled.div`
  font-family: 'Ticketmaster', sans-serif;
  font-style: italic;
  font-weight: 900;
  font-size: 32px;
  margin-bottom: 24px;
`;

const WelcomeLabel = styled.div`
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 4px;
`;

const UserName = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.div`
  border-bottom: 1px solid #f3f4f6;
  &:last-child { border-bottom: none; }
`;

const MenuButton = styled.button<{ $active?: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px; // Reduced padding
  background: none;
  border: none;
  font-size: 14px; // Reduced font size
  font-weight: 600;
  color: ${({ $active }) => $active ? '#026cdf' : '#1f262d'};
  cursor: pointer;
  text-align: left;
  transition: background 0.2s;
  
  &:hover {
    background: #f9fafb;
    color: #026cdf;
  }
`;

const IconParams = { width: 20, height: 20 };

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
  
  &:hover {
    color: #026cdf;
    background: #f3f4f6;
  }
`;

const PromoCard = styled.div`
  margin: 16px 16px 16px 16px; // Some margin
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

import { ConfirmationModal } from '@/components/ui/ConfirmationModal';

// ... imports

export function DashboardSidebar() {
  const [user, setUser] = useState<any>(null);
  const [showSignOut, setShowSignOut] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    tickets: false,
    profile: true,
    settings: false
  });
  const [referralData, setReferralData] = useState({
    code: '',
    points: 0,
    maxPoints: 100,
    count: 0,
    maxCount: 20
  });

  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    async function getUserData() {
      const { data: { user } } = await supabase.auth.getUser();
      console.log('DashboardSidebar User:', user);
      setUser(user);

      if (user) {
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
          const fallbackCode = user.user_metadata?.full_name
            ? (user.user_metadata.full_name.split(' ')[0] + '2026').toUpperCase()
            : 'MEMBER2026';

          setReferralData(prev => ({ ...prev, code: fallbackCode }));
        }
      }
    }
    getUserData();
  }, [supabase]);

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/auth/signin';
  };

  const copyReferral = () => {
    if (!referralData.code) return;
    navigator.clipboard.writeText(`https://tm.com/r/${referralData.code}`);
    alert('Referral link copied!');
  };

  return (
    <SidebarContainer>
      <SidebarHeader>
        <LogoLink href="/">
          <LogoT>t</LogoT>
        </LogoLink>
        <WelcomeLabel>Welcome back!</WelcomeLabel>
        <UserName>
          {user?.user_metadata?.full_name ||
            user?.user_metadata?.name ||
            user?.identities?.[0]?.identity_data?.full_name ||
            user?.email?.split('@')[0] ||
            'User'}
        </UserName>
      </SidebarHeader>

      <MenuList>
        {/* My Tickets */}
        <MenuItem>
          <MenuButton onClick={() => toggleSection('tickets')} $active={pathname.includes('/tickets')}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <TicketIcon style={IconParams} />
              My Tickets
            </div>
            {openSections.tickets ? <ChevronUpIcon style={{ width: 16, height: 16 }} /> : <ChevronDownIcon style={{ width: 16, height: 16 }} />}
          </MenuButton>
          <SubMenu $isOpen={openSections.tickets}>
            <SubLink href="/dashboard/tickets">Upcoming Events</SubLink>
            <SubLink href="/dashboard/past-events">Past Events</SubLink>
          </SubMenu>
        </MenuItem>

        {/* My Profile */}
        <MenuItem>
          <MenuButton onClick={() => toggleSection('profile')} $active={pathname.includes('/profile') || pathname.includes('/billing')}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <UserIcon style={IconParams} />
              My Profile
            </div>
            {openSections.profile ? <ChevronUpIcon style={{ width: 16, height: 16 }} /> : <ChevronDownIcon style={{ width: 16, height: 16 }} />}
          </MenuButton>
          <SubMenu $isOpen={openSections.profile}>
            <SubLink href="/dashboard/profile">Profile Details</SubLink>
            <SubLink href="/dashboard/billing">Billing Information</SubLink>
            <SubLink href="/dashboard/security">Sign In & Security</SubLink>
            <SubLink href="/dashboard/seller">Seller Details</SubLink>
            <SubLink href="/dashboard/connected-accounts">Connected Accounts</SubLink>
            <SubLink href="/dashboard/accessibility">Accessibility</SubLink>
          </SubMenu>
        </MenuItem>

        {/* My Settings */}
        <MenuItem>
          <MenuButton onClick={() => toggleSection('settings')} $active={pathname.includes('/settings')}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <SettingsIcon style={IconParams} />
              My Settings
            </div>
            {openSections.settings ? <ChevronUpIcon style={{ width: 16, height: 16 }} /> : <ChevronDownIcon style={{ width: 16, height: 16 }} />}
          </MenuButton>
          <SubMenu $isOpen={openSections.settings}>
            <SubLink href="/dashboard/settings/alerts">Alerts</SubLink>
            <SubLink href="/dashboard/settings/preferences">Preferences</SubLink>
          </SubMenu>
        </MenuItem>

        {/* Sign Out */}
        <MenuItem>
          <MenuButton onClick={() => setShowSignOut(true)}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', color: '#dc2626' }}>
              <div style={{ transform: 'rotate(180deg)' }}>➜</div>
              Sign Out
            </div>
          </MenuButton>
        </MenuItem>
      </MenuList>

      {/* Referral Feature inside Sidebar */}
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



      <ConfirmationModal
        isOpen={showSignOut}
        onCancel={() => setShowSignOut(false)}
        onConfirm={handleSignOut}
        title="Sign Out"
        message="Are you sure you want to sign out?"
        confirmJson="Yes, Sign Out"
      />
    </SidebarContainer >
  );
}
