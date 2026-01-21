'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

// NFL Team data with real Ticketmaster assets
const afcTeams = [
    { name: 'Baltimore Ravens', slug: 'baltimore-ravens', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_BaltimoreRavens.jpg' },
    { name: 'Buffalo Bills', slug: 'buffalo-bills', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_BuffaloBills.jpg' },
    { name: 'Cincinnati Bengals', slug: 'cincinnati-bengals', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_CincinnatiBengals.jpg' },
    { name: 'Cleveland Browns', slug: 'cleveland-browns', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_ClevelandBrowns.jpg' },
    { name: 'Denver Broncos', slug: 'denver-broncos', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_DenverBroncos.jpg' },
    { name: 'Houston Texans', slug: 'houston-texans', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_HoustonTexans.jpg' },
    { name: 'Indianapolis Colts', slug: 'indianapolis-colts', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_IndianapolisColts.jpg' },
    { name: 'Jacksonville Jaguars', slug: 'jacksonville-jaguars', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_JacksonvilleJaguars.jpg' },
    { name: 'Kansas City Chiefs', slug: 'kansas-city-chiefs', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_KansasCityChiefs.jpg' },
    { name: 'Las Vegas Raiders', slug: 'las-vegas-raiders', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_LasVegasRaiders.jpg' },
    { name: 'Los Angeles Chargers', slug: 'los-angeles-chargers', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_LosAngelesChargers.jpg' },
    { name: 'Miami Dolphins', slug: 'miami-dolphins', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_MiamiDolphins.jpg' },
    { name: 'New England Patriots', slug: 'new-england-patriots', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_NewEnglandPatriots.jpg' },
    { name: 'New York Jets', slug: 'new-york-jets', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/24/new-york-jets-blackbackground-2024.jpg' },
    { name: 'Pittsburgh Steelers', slug: 'pittsburgh-steelers', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_PittsburghSteelers.jpg' },
    { name: 'Tennessee Titans', slug: 'tennessee-titans', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_TennesseeTitans.jpg' },
];

const nfcTeams = [
    { name: 'Arizona Cardinals', slug: 'arizona-cardinals', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_ArizonaCardinals.jpg' },
    { name: 'Atlanta Falcons', slug: 'atlanta-falcons', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_AtlantaFalcons.jpg' },
    { name: 'Carolina Panthers', slug: 'carolina-panthers', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_CarolinaPanthers.jpg' },
    { name: 'Chicago Bears', slug: 'chicago-bears', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_ChicagoBears.jpg' },
    { name: 'Dallas Cowboys', slug: 'dallas-cowboys', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_DallasCowboys.jpg' },
    { name: 'Detroit Lions', slug: 'detroit-lions', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_DetroitLions.jpg' },
    { name: 'Green Bay Packers', slug: 'green-bay-packers', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_GreenBayPackers.jpg' },
    { name: 'Los Angeles Rams', slug: 'los-angeles-rams', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_LosAngelesRams.jpg' },
    { name: 'Minnesota Vikings', slug: 'minnesota-vikings', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_MinnesotaVikings.jpg' },
    { name: 'New Orleans Saints', slug: 'new-orleans-saints', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_NewOrleansSaints.jpg' },
    { name: 'New York Giants', slug: 'new-york-giants', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_NewYorkGiants.jpg' },
    { name: 'Philadelphia Eagles', slug: 'philadelphia-eagles', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_PhiladelphiaEagles.jpg' },
    { name: 'San Francisco 49ers', slug: 'san-francisco-49ers', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_SanFrancisco49ers.jpg' },
    { name: 'Seattle Seahawks', slug: 'seattle-seahawks', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_SeattleSeahawks.jpg' },
    { name: 'Tampa Bay Buccaneers', slug: 'tampa-bay-buccaneers', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/20/DiscoverySports_NFL_232x170_TampaBayBuccaneers.jpg' },
    { name: 'Washington Commanders', slug: 'washington-commanders', image: 'https://s1.ticketm.net/tm/en-us/img/static/nfl/22/DiscoverySports_NFL_232x170_Commanders.jpg' },
];

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
`;

const HeroSection = styled.section`
  background: url('https://s1.ticketm.net/tm/en-us/img/static/nfl/25/NFL-Header-Desktop.jpg') center/cover no-repeat;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
  }
`;

const HeroContent = styled.div`
  position: relative;
  text-align: center;
  color: white;
  
  h1 {
    font-size: 48px;
    font-weight: 700;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
    margin: 0;
  }
  
  p {
    font-size: 18px;
    margin-top: 12px;
    opacity: 0.9;
  }
`;

const SubNav = styled.nav`
  background: #002244;
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
    
    &.active {
      background: #1976d2;
    }
  }
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
`;

const ConferenceHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  
  img {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }
  
  h2 {
    font-size: 28px;
    font-weight: 700;
    color: #333;
    margin: 0;
  }
`;

const TeamsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
`;

const TeamCard = styled.a`
  display: block;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: #1a1a2e;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  }
`;

const TeamImage = styled.div<{ $bg: string }>`
  height: 160px;
  background: url(${props => props.$bg}) center/cover no-repeat;
`;

const TeamInfo = styled.div`
  padding: 16px;
  background: linear-gradient(180deg, #1a1a2e 0%, #0d0d1a 100%);
  
  h3 {
    color: white;
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 12px 0;
  }
`;

const TeamLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  span {
    color: #4dabf7;
    font-size: 13px;
  }
`;

const FindTicketsBtn = styled.button`
  background: #02a1ff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  margin-top: 12px;
  transition: background 0.2s;
  
  &:hover {
    background: #0286d6;
  }
`;

const SuperBowlBanner = styled.section`
  background: linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%);
  padding: 48px 24px;
  text-align: center;
  color: white;
  margin-bottom: 40px;
`;

const SuperBowlContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SuperBowlLogo = styled.img`
  width: 200px;
  height: auto;
  border-radius: 12px;
`;

const SuperBowlInfo = styled.div`
  text-align: left;
  
  h2 {
    font-size: 32px;
    margin: 0 0 16px 0;
  }
  
  p {
    font-size: 16px;
    opacity: 0.9;
    line-height: 1.6;
    margin: 0 0 20px 0;
  }
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const VideoGallery = styled.section`
  background: #1a1a2e;
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

export default function NFLPageClient() {
    const [activeConference, setActiveConference] = useState<'afc' | 'nfc'>('afc');

    return (
        <PageWrapper>
            <HeroSection>
                <HeroContent>
                    <h1>2025 NFL TICKETS</h1>
                    <p>The Official Ticket Marketplace of the NFL</p>
                </HeroContent>
            </HeroSection>

            <SubNav>
                <a href="#tickets" className="active">Ticket Exchange Tickets</a>
                <a href="#experience">The Experience</a>
                <a href="#afc" onClick={(e) => { e.preventDefault(); setActiveConference('afc'); }}>AFC</a>
                <a href="#nfc" onClick={(e) => { e.preventDefault(); setActiveConference('nfc'); }}>NFC</a>
                <a href="#faqs">FAQs</a>
                <a href="#blog">Blog</a>
                <a href="#about">About The NFL</a>
            </SubNav>

            <SuperBowlBanner>
                <SuperBowlContent>
                    <SuperBowlLogo
                        src="https://s1.ticketm.net/tm/en-us/img/static/nfl/25/Super-Bowl-LX-Logo.jpg"
                        alt="Super Bowl LX"
                    />
                    <SuperBowlInfo>
                        <h2>Super Bowl LX</h2>
                        <p>
                            Don&apos;t miss the biggest game of the year! Super Bowl LX will take place at Levi&apos;s Stadium
                            in Santa Clara, California. Get your tickets now for the ultimate NFL experience.
                        </p>
                        <FindTicketsBtn>Learn More</FindTicketsBtn>
                    </SuperBowlInfo>
                </SuperBowlContent>
            </SuperBowlBanner>

            <ContentSection>
                {activeConference === 'afc' && (
                    <>
                        <ConferenceHeader>
                            <img src="https://s1.ticketm.net/tm/en-us/img/static/nfl/24/AFC-Logo.png" alt="AFC" />
                            <h2>AFC Teams</h2>
                        </ConferenceHeader>
                        <TeamsGrid>
                            {afcTeams.map((team) => (
                                <TeamCard key={team.slug} href={`/nfl/${team.slug}`}>
                                    <TeamImage $bg={team.image} />
                                    <TeamInfo>
                                        <h3>{team.name}</h3>
                                        <TeamLinks>
                                            <span>See Home Schedule</span>
                                            <span>Manage Season Tickets</span>
                                        </TeamLinks>
                                        <FindTicketsBtn>Find Tickets</FindTicketsBtn>
                                    </TeamInfo>
                                </TeamCard>
                            ))}
                        </TeamsGrid>
                    </>
                )}

                {activeConference === 'nfc' && (
                    <>
                        <ConferenceHeader>
                            <img src="https://s1.ticketm.net/tm/en-us/img/static/nfl/24/NFC-Logo-white-stars.png" alt="NFC" />
                            <h2>NFC Teams</h2>
                        </ConferenceHeader>
                        <TeamsGrid>
                            {nfcTeams.map((team) => (
                                <TeamCard key={team.slug} href={`/nfl/${team.slug}`}>
                                    <TeamImage $bg={team.image} />
                                    <TeamInfo>
                                        <h3>{team.name}</h3>
                                        <TeamLinks>
                                            <span>See Home Schedule</span>
                                            <span>Manage Season Tickets</span>
                                        </TeamLinks>
                                        <FindTicketsBtn>Find Tickets</FindTicketsBtn>
                                    </TeamInfo>
                                </TeamCard>
                            ))}
                        </TeamsGrid>
                    </>
                )}
            </ContentSection>

            <VideoGallery id="gallery">
                <h2>NFL Highlights</h2>
                <VideoGrid>
                    <VideoCard>
                        <iframe
                            src="https://www.youtube.com/embed/videoseries?list=PLRdw3IjKY2gnKbKGDPLHOqG0Jc_RYPvLS"
                            title="NFL Highlights"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </VideoCard>
                    <VideoCard>
                        <iframe
                            src="https://www.youtube.com/embed/videoseries?list=PLRdw3IjKY2gn7jMSNqsHBvJUzrY1NvMBq"
                            title="NFL Best Plays"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </VideoCard>
                </VideoGrid>
            </VideoGallery>
        </PageWrapper>
    );
}
