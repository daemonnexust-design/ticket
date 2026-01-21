'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

// NHL Team data with real Ticketmaster assets
const easternTeams = [
    { name: 'Boston Bruins', slug: 'boston-bruins', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/24/NHL_Bruins.png' },
    { name: 'Buffalo Sabres', slug: 'buffalo-sabres', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/19/Buffalo_Sabres.png' },
    { name: 'Carolina Hurricanes', slug: 'carolina-hurricanes', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/19/Carolina_Hurricanes.png' },
    { name: 'Columbus Blue Jackets', slug: 'columbus-blue-jackets', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/19/Columbus_Blue_Jackets.png' },
    { name: 'Detroit Red Wings', slug: 'detroit-red-wings', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/19/Detroit_Red_Wings.png' },
    { name: 'Florida Panthers', slug: 'florida-panthers', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/24/Florida_Panthers.png' },
    { name: 'Montreal Canadiens', slug: 'montreal-canadiens', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/19/Montreal_Canadiens.png' },
    { name: 'New Jersey Devils', slug: 'new-jersey-devils', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/19/New_Jersey_Devils.png' },
    { name: 'New York Islanders', slug: 'new-york-islanders', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/19/New_York_Islanders.png' },
    { name: 'New York Rangers', slug: 'new-york-rangers', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/19/New_York_Rangers.png' },
    { name: 'Ottawa Senators', slug: 'ottawa-senators', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/21/Ottawa_Senators.png' },
    { name: 'Philadelphia Flyers', slug: 'philadelphia-flyers', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/19/Philadelphia_Flyers.png' },
    { name: 'Pittsburgh Penguins', slug: 'pittsburgh-penguins', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/19/Pittsburgh_Penguins.png' },
    { name: 'Tampa Bay Lightning', slug: 'tampa-bay-lightning', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/19/Tampa_Bay_Lightning.png' },
    { name: 'Toronto Maple Leafs', slug: 'toronto-maple-leafs', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/19/Toronto_Maple_Leafs.png' },
    { name: 'Washington Capitals', slug: 'washington-capitals', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/19/Washington_Capitals.png' },
];

const westernTeams = [
    { name: 'Anaheim Ducks', slug: 'anaheim-ducks', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/19/Anaheim_Ducks.png' },
    { name: 'Utah Hockey Club', slug: 'utah-hockey-club', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/22/Utah_Hockey_Club.png' },
    { name: 'Calgary Flames', slug: 'calgary-flames', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/19/Calgary_Flames.png' },
    { name: 'Chicago Blackhawks', slug: 'chicago-blackhawks', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/19/Chicago_Blackhawks.png' },
    { name: 'Colorado Avalanche', slug: 'colorado-avalanche', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/19/Colorado_Avalanche.png' },
    { name: 'Dallas Stars', slug: 'dallas-stars', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/19/Dallas_Stars.png' },
    { name: 'Edmonton Oilers', slug: 'edmonton-oilers', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/19/Edmonton_Oilers.png' },
    { name: 'Los Angeles Kings', slug: 'los-angeles-kings', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/24/Los_Angeles_Kings.png' },
    { name: 'Minnesota Wild', slug: 'minnesota-wild', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/19/Minnesota_Wild.png' },
    { name: 'Nashville Predators', slug: 'nashville-predators', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/19/Nashville_Predators.png' },
    { name: 'San Jose Sharks', slug: 'san-jose-sharks', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/19/San_Jose_Sharks.png' },
    { name: 'Seattle Kraken', slug: 'seattle-kraken', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/21/Seattle_Kraken.png' },
    { name: 'St. Louis Blues', slug: 'st-louis-blues', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/19/St_Louis_Blues.png' },
    { name: 'Vancouver Canucks', slug: 'vancouver-canucks', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/19/Vancouver_Canucks.png' },
    { name: 'Vegas Golden Knights', slug: 'vegas-golden-knights', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/19/Vegas_Golden_Knights.png' },
    { name: 'Winnipeg Jets', slug: 'winnipeg-jets', logo: 'https://s1.ticketm.net/tm/en-us/img/static/nhl/19/Winnipeg_Jets.png' },
];

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
`;

const HeroSection = styled.section`
  background: url('https://s1.ticketm.net/tm/en-us/img/static/nhl/23/nhl-header-080723.jpg') center/cover no-repeat;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const HeroContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 32px;
  color: white;
  text-align: center;
`;

const NHLLogo = styled.img`
  width: 120px;
  height: auto;
`;

const HeroText = styled.div`
  h1 {
    font-size: 42px;
    font-weight: 700;
    margin: 0 0 8px 0;
  }
  
  p {
    font-size: 18px;
    opacity: 0.9;
    margin: 0;
  }
`;

const SubNav = styled.nav`
  background: #000;
  padding: 16px 0;
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
  
  a {
    color: white;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 4px;
    transition: background 0.2s;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

const FeaturedEvent = styled.section`
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 24px;
`;

const FeaturedCard = styled.div`
  display: flex;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FeaturedImage = styled.img`
  width: 50%;
  object-fit: cover;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

const FeaturedInfo = styled.div`
  flex: 1;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  h2 {
    font-size: 28px;
    color: #333;
    margin: 0 0 16px 0;
  }
  
  p {
    font-size: 16px;
    color: #666;
    line-height: 1.6;
    margin: 0 0 24px 0;
  }
`;

const FindTicketsBtn = styled.button`
  background: #c8102e;
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
  align-self: flex-start;
  
  &:hover {
    background: #a50d25;
  }
`;

const ConferenceTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 32px 0;
`;

const TabButton = styled.button<{ $active: boolean }>`
  background: ${props => props.$active ? '#000' : 'white'};
  color: ${props => props.$active ? 'white' : '#333'};
  border: 2px solid #000;
  padding: 12px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.$active ? '#000' : '#f5f5f5'};
  }
`;

const TeamsSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 48px;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  color: #333;
  margin: 0 0 32px 0;
  text-align: center;
`;

const TeamsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
`;

const TeamCard = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: white;
  border-radius: 12px;
  text-decoration: none;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
  
  img {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }
  
  h3 {
    font-size: 16px;
    color: #333;
    margin: 0;
    text-align: center;
  }
`;

const TeamLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  
  span {
    color: #0066cc;
    font-size: 13px;
    text-align: center;
  }
`;

const VideoGallery = styled.section`
  background: #000;
  padding: 48px 24px;
  
  h2 {
    color: white;
    font-size: 28px;
    text-align: center;
    margin: 0 0 32px 0;
  }
`;

const VideoGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 24px;
`;

const VideoCard = styled.div`
  aspect-ratio: 16/9;
  border-radius: 12px;
  overflow: hidden;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

export default function NHLPageClient() {
    const [activeConference, setActiveConference] = useState<'eastern' | 'western'>('eastern');

    return (
        <PageWrapper>
            <HeroSection>
                <HeroContent>
                    <NHLLogo
                        src="https://s1.ticketm.net/tm/en-us/img/static/nhl/19/img-nhl-logo@2x.png"
                        alt="NHL"
                    />
                    <HeroText>
                        <h1>2025-2026 NHL® Tickets</h1>
                        <p>NHL Ticket Exchange™ - Official Marketplace of the NHL®</p>
                    </HeroText>
                </HeroContent>
            </HeroSection>

            <SubNav>
                <a href="#tickets">Ticket Exchange</a>
                <a href="#eastern">Eastern Conference</a>
                <a href="#western">Western Conference</a>
                <a href="#faqs">FAQs</a>
                <a href="#blog">Blog</a>
            </SubNav>

            <FeaturedEvent>
                <FeaturedCard>
                    <FeaturedImage
                        src="https://s1.ticketm.net/dam/a/9c3/e4763932-7f56-4bab-9e32-46c56a55d9c3_RETINA_PORTRAIT_16_9.jpg"
                        alt="NHL Stadium Series"
                    />
                    <FeaturedInfo>
                        <h2>2025 NHL Stadium Series</h2>
                        <p>
                            Experience hockey like never before! The 2025 NHL Stadium Series brings
                            the rink outdoors for an unforgettable game under the stars. Don&apos;t miss
                            this spectacular event featuring top NHL teams.
                        </p>
                        <FindTicketsBtn>Get Tickets</FindTicketsBtn>
                    </FeaturedInfo>
                </FeaturedCard>
            </FeaturedEvent>

            <ConferenceTabs>
                <TabButton
                    $active={activeConference === 'eastern'}
                    onClick={() => setActiveConference('eastern')}
                >
                    Eastern Conference
                </TabButton>
                <TabButton
                    $active={activeConference === 'western'}
                    onClick={() => setActiveConference('western')}
                >
                    Western Conference
                </TabButton>
            </ConferenceTabs>

            <TeamsSection>
                <SectionTitle>
                    {activeConference === 'eastern' ? 'Eastern Conference Teams' : 'Western Conference Teams'}
                </SectionTitle>
                <TeamsGrid>
                    {(activeConference === 'eastern' ? easternTeams : westernTeams).map((team) => (
                        <TeamCard key={team.slug} href={`/nhl/${team.slug}`}>
                            <img src={team.logo} alt={team.name} />
                            <h3>{team.name}</h3>
                            <TeamLinks>
                                <span>Buy Tickets</span>
                                <span>Home Schedule</span>
                            </TeamLinks>
                        </TeamCard>
                    ))}
                </TeamsGrid>
            </TeamsSection>

            <VideoGallery id="gallery">
                <h2>NHL Highlights</h2>
                <VideoGrid>
                    <VideoCard>
                        <iframe
                            src="https://www.youtube.com/embed/videoseries?list=PL1NbHSfosBuFnwGJcXwsDG-wl8SNajBLz"
                            title="NHL Highlights"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </VideoCard>
                    <VideoCard>
                        <iframe
                            src="https://www.youtube.com/embed/videoseries?list=PL1NbHSfosBuHInmjsLcBuqeSV256FqlOO"
                            title="NHL Top Plays"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </VideoCard>
                </VideoGrid>
            </VideoGallery>
        </PageWrapper>
    );
}
