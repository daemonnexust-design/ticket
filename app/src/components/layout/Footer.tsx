'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { Container, Flex, Grid } from '@/components/ui/primitives';
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  YoutubeIcon,
  HelpIcon,
  BlogIcon,
  ChevronDownIcon
} from '@/components/ui/icons';
import { useState } from 'react';

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.footerBg};
  color: ${({ theme }) => theme.colors.textInverse};
  padding: 48px 0 24px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  position: relative; // Ensure stacking context
  z-index: 10;
`;

const TopSection = styled(Flex)`
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 48px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative; // Reset context
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: 32px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.textInverse};
`;

const SocialLinks = styled(Flex)`
gap: 12px;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #2f3237; // Specific dark grey for social bubbles
  border-radius: 50%; // Circular
  color: ${({ theme }) => theme.colors.textInverse};
  transition: background-color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: #026cdf; // Brand blue on hover
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const AppButtons = styled(Flex)`
  gap: 12px;
  margin-bottom: 16px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const AppButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  padding: 0 20px;
  border: 1.5px solid rgba(255, 255, 255, 0.5);
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: 12px;
  font-weight: 500;
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.textInverse};
    background-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
  
  svg {
    flex-shrink: 0;
  }
  
  span {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

const TermsText = styled.p`
  color: #adb1b8;
  font-size: 11px;
  line-height: 1.5;
  margin-top: 8px;
`;

const TermsLink = styled.a`
  color: #adb1b8;
  text-decoration: underline;
  
  &:hover {
    color: ${({ theme }) => theme.colors.textInverse};
  }
`;

const LinksGrid = styled(Grid)`
  margin-bottom: 48px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const LinkColumn = styled.div``;

const LinkList = styled.ul<{ $isOpen: boolean }>`
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-height: ${({ $isOpen }) => ($isOpen ? '500px' : '0')};
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
    padding-bottom: ${({ $isOpen }) => ($isOpen ? '16px' : '0')};
  }
`;

const LinkColumnTitle = styled.h4`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.textInverse};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: default;

  svg {
    display: none;
    width: 16px;
    height: 16px;
    transition: transform 0.3s ease;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    cursor: pointer;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    padding: 12px 0;
    margin: 0;
    
    svg {
      display: block;
    }

    &.open svg {
      transform: rotate(180deg);
    }
  }
`;

const FooterLink = styled.a`
  display: block;
  color: #adb1b8; // Specific light grey text
  font-size: 12px;
  padding: 6px 0;
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.textInverse};
    text-decoration: underline;
  }
`;

const InternalFooterLink = styled(Link)`
  display: block;
  color: #adb1b8;
  font-size: 12px;
  padding: 6px 0;
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.textInverse};
    text-decoration: underline;
  }
`;

const BottomSection = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }
`;

const LogoWrapper = styled.div`
  margin-right: 48px;
`;

const Logo = styled(Link)`
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  display: block;
  margin-bottom: 12px;
  text-decoration: none;
  
  span {
    font-weight: ${({ theme }) => theme.typography.weights.regular};
    font-size: 0.5em;
    vertical-align: super;
  }
`;

const LegalLinks = styled(Flex)`
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 16px;
  }
`;

const LegalLink = styled.a`
  color: #adb1b8;
  font-size: 10px;
  text-decoration: none;
  
  &:hover {
    color: ${({ theme }) => theme.colors.textInverse};
    text-decoration: underline;
  }
`;

const Copyright = styled.p`
  color: #adb1b8;
  font-size: 10px;
  margin-top: 12px;
`;

// Footer link data - 100% matching Ticketmaster.com
const footerLinks = {
  'Helpful Links': [
    { label: 'Help/FAQ', href: 'https://help.ticketmaster.com/', external: true },
    { label: 'Sell', href: '/sell', external: false },
    { label: 'My Account', href: '/account', external: false },
    { label: 'Gift Cards', href: 'https://www.ticketmaster.com/giftcards', external: true },
  ],
  'Our Network': [
    { label: 'Live Nation', href: 'https://www.livenation.com/', external: true },
    { label: 'House of Blues', href: 'https://www.houseofblues.com/', external: true },
    { label: 'Front Gate Tickets', href: 'https://www.frontgatetickets.com/', external: true },
    { label: 'TicketWeb', href: 'https://www.ticketweb.com/', external: true },
    { label: 'universe', href: 'https://www.universe.com/', external: true },
    { label: 'NFL', href: '/nfl', external: false },
    { label: 'NBA', href: '/nba', external: false },
    { label: 'NHL', href: '/nhl', external: false },
  ],
  'About Us': [
    { label: 'Ticketmaster Blog', href: 'https://blog.ticketmaster.com/', external: true },
    { label: 'Ticketing Truths', href: 'https://www.ticketmaster.com/ticketingtruths', external: true },
    { label: 'Ad Choices', href: 'https://help.ticketmaster.com/s/article/AdChoices?language=en_US', external: true },
    { label: 'Careers', href: 'https://livenation.wd503.myworkdayjobs.com/en/TMExternalSite', external: true },
    { label: 'Ticket Your Event', href: 'https://business.ticketmaster.com/contact', external: true },
    { label: 'Innovation', href: 'https://business.ticketmaster.com/business-solutions/future-focused/', external: true },
  ],
  'Friends & Partners': [
    { label: 'PayPal', href: 'https://www.paypal.com/', external: true },
    { label: 'Allianz', href: 'https://www.eventticketprotection.com/tm/', external: true },
    { label: 'AWS', href: 'https://aws.amazon.com/', external: true },
    { label: 'Affiliates', href: 'https://developer.ticketmaster.com/partners/', external: true },
  ],
};

// Social links
const socialLinks = [
  { icon: FacebookIcon, href: 'http://facebook.com/Ticketmaster', label: 'Facebook' },
  { icon: TwitterIcon, href: 'http://twitter.com/ticketmaster', label: 'X' },
  { icon: BlogIcon, href: 'https://blog.ticketmaster.com/', label: 'Blog' },
  { icon: YoutubeIcon, href: 'https://www.youtube.com/Ticketmaster', label: 'YouTube' },
  { icon: InstagramIcon, href: 'http://instagram.com/ticketmaster', label: 'Instagram' },
];

// Legal links
const legalLinks = [
  { label: 'Our Policies', href: 'https://legal.ticketmaster.com/' },
  { label: 'Privacy Policy', href: 'https://privacy.ticketmaster.com/privacy-policy' },
  { label: 'Cookie Policy', href: 'https://privacy.ticketmaster.com/cookie-policy' },
  { label: 'Manage my cookies and ad choices', href: '#' },
];

// Footer link data, state management and render logic
export function Footer() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (title: string) => {
    setOpenSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <FooterWrapper>
      <Container>
        <TopSection>
          <div>
            <SectionTitle>Let&apos;s Connect</SectionTitle>
            <SocialLinks>
              {socialLinks.map((social) => (
                <SocialLink
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <social.icon />
                </SocialLink>
              ))}
            </SocialLinks>
          </div>

          <div>
            <SectionTitle>Download Our Apps</SectionTitle>
            <AppButtons>
              <AppButton href="https://apps.apple.com/us/app/ticketmaster/id500003565" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <span>Download on the <strong>App Store</strong></span>
              </AppButton>
              <AppButton href="https://play.google.com/store/apps/details?id=com.ticketmaster.mobile.android.na" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <span>Get it on <strong>Google Play</strong></span>
              </AppButton>
            </AppButtons>
            <TermsText>
              By continuing past this page, you agree to our{' '}
              <TermsLink href="/terms" target="_blank" rel="noopener noreferrer">
                terms of use
              </TermsLink>
            </TermsText>
          </div>
        </TopSection>

        <LinksGrid $columns={4} $gap="32px">
          {Object.entries(footerLinks).map(([title, links]) => (
            <LinkColumn key={title}>
              <LinkColumnTitle
                onClick={() => toggleSection(title)}
                className={openSections[title] ? 'open' : ''}
              >
                {title}
                <ChevronDownIcon />
              </LinkColumnTitle>
              <LinkList $isOpen={!!openSections[title]}>
                {links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <FooterLink
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </FooterLink>
                    ) : (
                      <InternalFooterLink href={link.href}>
                        {link.label}
                      </InternalFooterLink>
                    )}
                  </li>
                ))}
              </LinkList>
            </LinkColumn>
          ))}
        </LinksGrid>

        <BottomSection>
          <div>
            <LogoWrapper>
              <Logo href="/">
                ticketmaster<span>®</span>
              </Logo>
            </LogoWrapper>
            <LegalLinks>
              {legalLinks.map((link) => (
                <LegalLink
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </LegalLink>
              ))}
            </LegalLinks>
            <Copyright>
              © 1999-{new Date().getFullYear()} Ticketmaster. All rights reserved.
            </Copyright>
          </div>

          <div style={{ color: '#ADB1B8', fontSize: '10px' }}>
          </div>
        </BottomSection>
      </Container>
    </FooterWrapper>
  );
}
