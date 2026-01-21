'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f5f7fa;
`;

const Sidebar = styled.aside`
  width: 260px;
  background: #1f262d;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  overflow-y: auto;
`;

const Logo = styled.div`
  padding: 24px;
  font-size: 20px;
  font-weight: 700;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  span {
    color: #026cdf;
  }
`;

const Nav = styled.nav`
  padding: 16px 0;
`;

const NavSection = styled.div`
  padding: 0 16px;
  margin-bottom: 24px;
`;

const NavSectionTitle = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 8px;
  margin-bottom: 4px;
`;

const NavLink = styled(Link) <{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  color: ${({ $active }) => ($active ? 'white' : '#9ca3af')};
  background: ${({ $active }) => ($active ? '#026cdf' : 'transparent')};
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background: ${({ $active }) => ($active ? '#026cdf' : 'rgba(255, 255, 255, 0.05)')};
    color: white;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 260px;
  padding: 32px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1f262d;
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  height: 44px;
  padding: 0 20px;
  background: ${({ $variant }) => ($variant === 'secondary' ? 'white' : '#026cdf')};
  color: ${({ $variant }) => ($variant === 'secondary' ? '#1f262d' : 'white')};
  border: ${({ $variant }) => ($variant === 'secondary' ? '1px solid #e5e7eb' : 'none')};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  
  &:hover {
    background: ${({ $variant }) => ($variant === 'secondary' ? '#f5f5f5' : '#0052b0')};
  }
`;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isVerified, setIsVerified] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const sessionKey = sessionStorage.getItem('admin_secure_key');
    if (sessionKey === 'verified') {
      setIsVerified(true);
    }
  }, []);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, verify against a secure API or proper ENV variable.
    // For this clone, we use a simple key 'admin123' or 'secure-key'
    if (keyInput === 'admin123') {
      setIsVerified(true);
      sessionStorage.setItem('admin_secure_key', 'verified');
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!isVerified) {
    return (
      <div style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1f262d'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '8px',
          width: '400px',
          textAlign: 'center'
        }}>
          <h2 style={{ marginBottom: '24px', color: '#1f262d' }}>Admin Security Gate</h2>
          <p style={{ marginBottom: '24px', color: '#6b7280' }}>Enter secure key to access dashboard</p>
          <form onSubmit={handleVerify}>
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="Secure Key"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                marginBottom: '16px',
                fontSize: '16px'
              }}
              autoFocus
            />
            {error && <p style={{ color: 'red', marginBottom: '16px', fontSize: '14px' }}>Invalid Security Key</p>}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                background: '#026cdf',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Access Dashboard
            </button>
          </form>
          <div style={{ marginTop: '20px' }}>
            <Link href="/" style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none' }}>Return to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <LayoutContainer>
      <Sidebar>
        <Logo>
          <span>TM</span> Admin
        </Logo>
        <Nav>
          <NavSection>
            <NavSectionTitle>Dashboard</NavSectionTitle>
            <NavLink href="/admin" $active={pathname === '/admin'}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="9" />
                <rect x="14" y="3" width="7" height="5" />
                <rect x="14" y="12" width="7" height="9" />
                <rect x="3" y="16" width="7" height="5" />
              </svg>
              Overview
            </NavLink>
          </NavSection>

          <NavSection>
            <NavSectionTitle>Content</NavSectionTitle>
            <NavLink href="/admin/events" $active={pathname?.startsWith('/admin/events')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Events
            </NavLink>
            <NavLink href="/admin/venues" $active={pathname?.startsWith('/admin/venues')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Venues
            </NavLink>
            <NavLink href="/admin/categories" $active={pathname?.startsWith('/admin/categories')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
              Categories
            </NavLink>
          </NavSection>

          <NavSection>
            <NavSectionTitle>Sales</NavSectionTitle>
            <NavLink href="/admin/orders" $active={pathname?.startsWith('/admin/orders')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              Orders
            </NavLink>
          </NavSection>

          <NavSection>
            <NavSectionTitle>People</NavSectionTitle>
            <NavLink href="/admin/users" $active={pathname?.startsWith('/admin/users')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Users
            </NavLink>
          </NavSection>

          <NavSection>
            <NavSectionTitle>System</NavSectionTitle>
            <NavLink href="/admin/settings" $active={pathname?.startsWith('/admin/settings')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              Settings
            </NavLink>
          </NavSection>
        </Nav>
      </Sidebar>

      <MainContent>
        {children}
      </MainContent>
    </LayoutContainer>
  );
}

export { Header, PageTitle, HeaderActions, Button };
