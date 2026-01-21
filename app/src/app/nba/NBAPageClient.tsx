'use client';

import React from 'react';
import styled from 'styled-components';

// NBA Team data with real assets
const nbaTeams = [
    { name: 'Atlanta Hawks', abbr: 'ATL', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/ATL-logo-international.svg' },
    { name: 'Boston Celtics', abbr: 'BOS', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/BOS-logo-international.svg' },
    { name: 'Brooklyn Nets', abbr: 'BKN', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/BKN-logo-international.svg' },
    { name: 'Charlotte Hornets', abbr: 'CHA', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/CHA-logo-international.svg' },
    { name: 'Chicago Bulls', abbr: 'CHI', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/CHI-logo-international.svg' },
    { name: 'Cleveland Cavaliers', abbr: 'CLE', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/CLE-logo-international.svg' },
    { name: 'Dallas Mavericks', abbr: 'DAL', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/DAL-logo-international.svg' },
    { name: 'Denver Nuggets', abbr: 'DEN', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/DEN-logo-international.svg' },
    { name: 'Detroit Pistons', abbr: 'DET', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/DET-logo-international.svg' },
    { name: 'Golden State Warriors', abbr: 'GSW', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/GSW-logo-international.svg' },
    { name: 'Houston Rockets', abbr: 'HOU', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/HOU-logo-international.svg' },
    { name: 'Indiana Pacers', abbr: 'IND', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/IND-logo-international.svg' },
    { name: 'LA Clippers', abbr: 'LAC', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/LAC-logo-international.svg' },
    { name: 'Los Angeles Lakers', abbr: 'LAL', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/LAL-logo-international.svg' },
    { name: 'Memphis Grizzlies', abbr: 'MEM', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/MEM-logo-international.svg' },
    { name: 'Miami Heat', abbr: 'MIA', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/MIA-logo-international.svg' },
    { name: 'Milwaukee Bucks', abbr: 'MIL', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/MIL-logo-international.svg' },
    { name: 'Minnesota Timberwolves', abbr: 'MIN', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/MIN-logo-international.svg' },
    { name: 'New Orleans Pelicans', abbr: 'NOP', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/NOP-logo-international.svg' },
    { name: 'New York Knicks', abbr: 'NYK', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/NYK-logo-international.svg' },
    { name: 'Oklahoma City Thunder', abbr: 'OKC', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/OKC-logo-international.svg' },
    { name: 'Orlando Magic', abbr: 'ORL', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/ORL-logo-international.svg' },
    { name: 'Philadelphia 76ers', abbr: 'PHI', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/PHI-logo-international.svg' },
    { name: 'Phoenix Suns', abbr: 'PHX', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/PHX-logo-international.svg' },
    { name: 'Portland Trail Blazers', abbr: 'POR', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/POR-logo-international.svg' },
    { name: 'Sacramento Kings', abbr: 'SAC', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/SAC-logo-international.svg' },
    { name: 'San Antonio Spurs', abbr: 'SAS', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/SAS-logo-international.svg' },
    { name: 'Toronto Raptors', abbr: 'TOR', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/TOR-logo-international.svg' },
    { name: 'Utah Jazz', abbr: 'UTA', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/UTA-logo-international.svg' },
    { name: 'Washington Wizards', abbr: 'WAS', logo: 'https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2025/08/WAS-logo-international.svg' },
];

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #17408b;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #17408b 0%, #c9082a 100%);
  padding: 60px 24px;
  text-align: center;
  color: white;
`;

const NBALogo = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 24px;
`;

const HeroTitle = styled.h1`
  font-size: 42px;
  font-weight: 700;
  margin: 0 0 12px 0;
`;

const HeroSubtitle = styled.p`
  font-size: 18px;
  opacity: 0.9;
  margin: 0;
`;

const NavBar = styled.nav`
  background: rgba(0, 0, 0, 0.3);
  padding: 16px 24px;
  display: flex;
  justify-content: center;
  gap: 32px;
  
  a {
    color: white;
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 4px;
    transition: background 0.2s;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

const PromoSection = styled.section`
  padding: 48px 24px;
  background: white;
`;

const PromoGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
`;

const PromoCard = styled.a`
  display: block;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 16/10;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s;
  background: linear-gradient(135deg, #17408b 0%, #c9082a 100%);
  
  &:hover {
    transform: scale(1.02);
  }
`;

const PromoOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(0, 0, 0, 0.8) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 24px;
  color: white;
  
  h3 {
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 8px 0;
  }
  
  p {
    font-size: 14px;
    opacity: 0.9;
    margin: 0;
  }
`;

const AllStarPromo = styled.section`
  background: linear-gradient(135deg, #c9082a 0%, #17408b 100%);
  padding: 48px 24px;
  text-align: center;
  color: white;
`;

const AllStarContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  
  img {
    max-width: 300px;
    margin-bottom: 24px;
    border-radius: 12px;
  }
  
  h2 {
    font-size: 36px;
    margin: 0 0 16px 0;
  }
  
  p {
    font-size: 18px;
    line-height: 1.6;
    margin: 0 0 24px 0;
  }
`;

const LearnMoreBtn = styled.button`
  background: white;
  color: #17408b;
  border: none;
  padding: 14px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const TeamsSection = styled.section`
  background: #f5f5f5;
  padding: 48px 24px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 32px;
  color: #17408b;
  margin: 0 0 32px 0;
`;

const TeamsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 20px;
`;

const TeamLogo = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
  
  img {
    width: 64px;
    height: 64px;
    object-fit: contain;
  }
  
  span {
    font-size: 12px;
    font-weight: 600;
    color: #333;
    text-align: center;
  }
`;

const VideoGallery = styled.section`
  background: #17408b;
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

export default function NBAPageClient() {
    return (
        <PageWrapper>
            <HeroSection>
                <NBALogo
                    src="https://ak-static.cms.nba.com/wp-content/themes/nba-tickets/img/nba-tickets-logo.svg"
                    alt="NBA Tickets"
                />
                <HeroTitle>NBA Tickets</HeroTitle>
                <HeroSubtitle>The Official Ticket Marketplace of the NBA</HeroSubtitle>
            </HeroSection>

            <NavBar>
                <a href="#tickets">Tickets On Sale</a>
                <a href="#season">Season Tickets</a>
                <a href="#faq">FAQ</a>
            </NavBar>

            <AllStarPromo>
                <AllStarContent>
                    <img
                        src="https://ak-static.cms.nba.com/wp-content/uploads/sites/51/2026/01/asg-2026-nbatickets-tile.png"
                        alt="NBA All-Star 2026"
                    />
                    <h2>NBA All-Star 2026</h2>
                    <p>
                        Experience the best weekend in basketball! Join us for the 2026 NBA All-Star Weekend
                        featuring the game&apos;s biggest stars competing in the ultimate showcase.
                    </p>
                    <LearnMoreBtn>Get Tickets</LearnMoreBtn>
                </AllStarContent>
            </AllStarPromo>

            <PromoSection>
                <PromoGrid>
                    <PromoCard href="#single">
                        <PromoOverlay>
                            <h3>Single Game Tickets</h3>
                            <p>Find tickets to your favorite team&apos;s games</p>
                        </PromoOverlay>
                    </PromoCard>
                    <PromoCard href="#experience">
                        <PromoOverlay>
                            <h3>NBA Experiences</h3>
                            <p>Premium packages and VIP access</p>
                        </PromoOverlay>
                    </PromoCard>
                    <PromoCard href="#season">
                        <PromoOverlay>
                            <h3>Season Tickets</h3>
                            <p>Best value for true fans</p>
                        </PromoOverlay>
                    </PromoCard>
                </PromoGrid>
            </PromoSection>

            <TeamsSection>
                <SectionTitle>All NBA Teams</SectionTitle>
                <TeamsGrid>
                    {nbaTeams.map((team) => (
                        <TeamLogo key={team.abbr} href={`/nba/${team.abbr.toLowerCase()}`}>
                            <img src={team.logo} alt={team.name} />
                            <span>{team.name}</span>
                        </TeamLogo>
                    ))}
                </TeamsGrid>
            </TeamsSection>

            <VideoGallery id="gallery">
                <h2>NBA Highlights</h2>
                <VideoGrid>
                    <VideoCard>
                        <iframe
                            src="https://www.youtube.com/embed/videoseries?list=PLlVlyGVtvuVm56sKoHH8ueY-EgIxYV8CK"
                            title="NBA Highlights"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </VideoCard>
                    <VideoCard>
                        <iframe
                            src="https://www.youtube.com/embed/videoseries?list=PLlVlyGVtvuVmyNPrp7xBD6n5lfKZHEJns"
                            title="NBA Top Plays"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </VideoCard>
                </VideoGrid>
            </VideoGallery>
        </PageWrapper>
    );
}
