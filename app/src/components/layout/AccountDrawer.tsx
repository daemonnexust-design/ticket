'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    CloseIcon,
    TicketIcon,
    UserIcon,
    SettingsIcon,
    ChevronDownIcon,
    HelpIcon
} from '@/components/ui/icons';
import { signOut } from '@/lib/auth/actions';

// Styled Components
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

const DrawerPanel = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 360px;
  max-width: 90vw;
  background: white;
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
  transition: transform 0.3s ease;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 24px rgba(0,0,0,0.15);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    max-width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: #1f262d;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 4px;
  display: flex;
  align-items: center;
  transition: color 0.2s;
  
  &:hover {
    color: #1f262d;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  padding-bottom: calc(24px + env(safe-area-inset-bottom));
`;

const Greeting = styled.div`
  margin-bottom: 24px;
`;

const WelcomeText = styled.div`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 4px;
`;

const UserName = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #1f262d;
`;

// Accordion Styles
const Section = styled.div`
  border-top: 1px solid #e5e7eb;
  &:last-child {
    border-bottom: 1px solid #e5e7eb;
  }
`;

const SectionHeader = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  background: none;
  border: none;
  cursor: pointer;
  
  &:hover {
    span {
        color: #026cdf;
    }
  }
`;

const SectionTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SectionIcon = styled.div`
  color: #6b7280;
  svg {
    width: 20px;
    height: 20px;
  }
`;

const SectionLabel = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #1f262d;
  transition: color 0.2s;
`;

const ChevronWrapper = styled.div<{ $isOpen: boolean }>`
  transform: rotate(${({ $isOpen }) => ($isOpen ? '180deg' : '0')});
  transition: transform 0.2s ease;
  color: ${({ $isOpen }) => ($isOpen ? '#026cdf' : '#6b7280')};
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const SectionContent = styled.div<{ $isOpen: boolean }>`
  max-height: ${({ $isOpen }) => ($isOpen ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  padding-bottom: ${({ $isOpen }) => ($isOpen ? '16px' : '0')};
`;

const SubLink = styled(Link)`
  display: block;
  padding: 12px 0 12px 32px;
  color: #4b5563;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.2s;
  
  &:hover {
    color: #026cdf;
    background-color: #f9fafb;
    border-radius: 4px;
    padding-left: 36px;
  }
`;

const StaticLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  color: #1f262d;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  border-top: 1px solid #e5e7eb;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #026cdf;
  }

  svg {
    width: 20px;
    height: 20px;
    color: #6b7280;
  }
`;

const SignOutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  color: #1f262d;
  font-weight: 600;
  font-size: 16px;
  background: none;
  border: none;
  border-top: 1px solid #e5e7eb;
  cursor: pointer;
  text-align: left;
  transition: color 0.2s;

  &:hover {
    color: #026cdf;
  }

  svg {
    width: 20px;
    height: 20px;
    color: #6b7280;
  }
`;

interface AccountDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    user: {
        id: string;
        email: string;
        fullName: string;
    } | null;
}

export function AccountDrawer({ isOpen, onClose, user }: AccountDrawerProps) {
    const [expandedSection, setExpandedSection] = useState<string | null>('profile');
    const router = useRouter();

    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const handleSignOut = async () => {
        await signOut();
        onClose();
        router.refresh();
    };

    if (!user) return null;

    return (
        <>
            <Overlay $isOpen={isOpen} onClick={onClose} />
            <DrawerPanel $isOpen={isOpen}>
                <Header>
                    <Title>My Account</Title>
                    <CloseButton onClick={onClose} aria-label="Close menu">
                        <CloseIcon />
                    </CloseButton>
                </Header>

                <Content>
                    <Greeting>
                        <WelcomeText>Welcome back!</WelcomeText>
                        <UserName>{user.fullName}</UserName>
                    </Greeting>

                    {/* My Tickets */}
                    <Section>
                        <SectionHeader $isOpen={expandedSection === 'tickets'} onClick={() => toggleSection('tickets')}>
                            <SectionTitleGroup>
                                <SectionIcon><TicketIcon /></SectionIcon>
                                <SectionLabel>My Tickets</SectionLabel>
                            </SectionTitleGroup>
                            <ChevronWrapper $isOpen={expandedSection === 'tickets'}>
                                <ChevronDownIcon />
                            </ChevronWrapper>
                        </SectionHeader>
                        <SectionContent $isOpen={expandedSection === 'tickets'}>
                            <SubLink href="/orders" onClick={onClose}>Upcoming Events</SubLink>
                            <SubLink href="/orders/past" onClick={onClose}>Past Events</SubLink>
                        </SectionContent>
                    </Section>

                    {/* My Profile */}
                    <Section>
                        <SectionHeader $isOpen={expandedSection === 'profile'} onClick={() => toggleSection('profile')}>
                            <SectionTitleGroup>
                                <SectionIcon><UserIcon /></SectionIcon>
                                <SectionLabel>My Profile</SectionLabel>
                            </SectionTitleGroup>
                            <ChevronWrapper $isOpen={expandedSection === 'profile'}>
                                <ChevronDownIcon />
                            </ChevronWrapper>
                        </SectionHeader>
                        <SectionContent $isOpen={expandedSection === 'profile'}>
                            <SubLink href="/dashboard/profile" onClick={onClose}>Profile Details</SubLink>
                            <SubLink href="/dashboard/billing" onClick={onClose}>Billing Information</SubLink>
                            <SubLink href="/dashboard/security" onClick={onClose}>Sign In & Security</SubLink>
                            <SubLink href="/dashboard/connected-accounts" onClick={onClose}>Connected Accounts</SubLink>
                            <SubLink href="/dashboard/seller" onClick={onClose}>Seller Details</SubLink>
                            <SubLink href="/dashboard/accessibility" onClick={onClose}>Accessibility Requirements</SubLink>
                            <SubLink href="/dashboard/gift-cards" onClick={onClose}>Gift Cards and Promo Codes</SubLink>
                        </SectionContent>
                    </Section>

                    {/* My Settings */}
                    <Section>
                        <SectionHeader $isOpen={expandedSection === 'settings'} onClick={() => toggleSection('settings')}>
                            <SectionTitleGroup>
                                <SectionIcon><SettingsIcon /></SectionIcon>
                                <SectionLabel>My Settings</SectionLabel>
                            </SectionTitleGroup>
                            <ChevronWrapper $isOpen={expandedSection === 'settings'}>
                                <ChevronDownIcon />
                            </ChevronWrapper>
                        </SectionHeader>
                        <SectionContent $isOpen={expandedSection === 'settings'}>
                            <SubLink href="/dashboard/settings" onClick={onClose}>Account Settings</SubLink>
                        </SectionContent>
                    </Section>

                    <SignOutButton onClick={handleSignOut}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" x2="9" y1="12" y2="12" />
                        </svg>
                        Sign Out
                    </SignOutButton>

                    <StaticLink href="/help" onClick={onClose}>
                        <HelpIcon />
                        Need Help?
                    </StaticLink>

                </Content>
            </DrawerPanel>
        </>
    );
}
