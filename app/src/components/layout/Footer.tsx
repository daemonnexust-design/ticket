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
    gap: 24px; // Reduced from 32px to match screenshot tightness
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
  
  flex-wrap: wrap;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row; // Changed from column to row to match screenshot
    justify-content: flex-start;
  }
`;

const AppButton = styled.a`
  display: block;
  height: 44px;
  width: auto;
  border-radius: 6px;
  overflow: hidden;
  transition: transform ${({ theme }) => theme.transitions.fast}, opacity ${({ theme }) => theme.transitions.fast};
  
  img {
    height: 100%;
    width: auto;
    display: block;
  }
  
  &:hover {
    transform: translateY(-2px);
    opacity: 0.9;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 0 0 auto;
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
    gap: 0; // Remove gap to let borders touch
  }
`;

const LinkColumn = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    
    &:last-child {
      border-bottom: none;
    }
  }
`;

const LinkList = styled.ul<{ $isOpen: boolean }>`
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
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
    margin: 0;
    padding: 16px 0; // Increased padding for better touch target
    
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-items: center;
  }
`;

const LogoWrapper = styled.div`
  margin-right: 48px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-right: 0;
  }
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
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    justify-content: center;
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
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    text-align: center;
  }
`;

// Footer link data - 100% matching Ticketmaster.com
const footerLinks = {
  'Helpful Links': [
    { label: 'Help/FAQ', href: 'https://help.ticketmaster.com/', external: true },
    { label: 'Sell', href: '/sell', external: false },
    { label: 'My Account', href: '/dashboard', external: false },
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" />
              </AppButton>

              <AppButton href="https://play.google.com/store/apps/details?id=com.ticketmaster.mobile.android.na" target="_blank" rel="noopener noreferrer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" />
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
