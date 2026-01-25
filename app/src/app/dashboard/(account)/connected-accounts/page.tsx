'use client';

import styled from 'styled-components';
import { Button } from '@/components/ui/primitives';
import { Title } from '@/app/dashboard/(account)/layout';
import { getConnectedAccounts, toggleConnection } from '@/lib/connected-accounts/actions';
import { useState, useEffect, useTransition } from 'react';

const Container = styled.div`
  max-width: 600px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #1f262d;
  margin-top: 32px;
  margin-bottom: 24px;
`;

const AccountList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const AccountItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const ItemTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: #1f262d;
  margin: 0;
`;

const ItemLogo = styled.img`
  height: 24px;
  object-fit: contain;
`;

const ItemDescription = styled.p`
  font-size: 14px;
  color: #1f262d;
  line-height: 1.5;
  margin-bottom: 16px;
`;

const ConnectButton = styled.button<{ $connected?: boolean }>`
  padding: 8px 16px;
  background: white;
  border: 1px solid #9ca3af;
  border-radius: 4px;
  font-weight: 600;
  font-size: 14px;
  color: #1f262d;
  cursor: pointer;
  align-self: flex-start;
  min-width: 100px;
  
  &:hover {
    background: #f3f4f6;
  }
  
  ${props => props.$connected && `
    background: #f0fdf4;
    border-color: #16a34a;
    color: #16a34a;
  `}
`;

type Provider = {
    id: string;
    name: string;
    description: string;
    logoUrl: string;
}

const REWARDS_PROVIDERS: Provider[] = [
    {
        id: 'penn_cash',
        name: 'PENN Cash',
        description: 'Redeem your PENN Cash for tickets to must-see experiences and events. Connect Now.',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png' // Placeholder
    },
    {
        id: 'wyndham',
        name: 'Wyndham Rewards',
        description: 'Earn Wyndham Rewards points on ticket purchases. Wyndham Rewards Insiders can also redeem points for tickets.',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png' // Placeholder
    },
    {
        id: 'audience_rewards',
        name: 'Audience Rewards',
        description: 'Earn Points to redeem exciting rewards.',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png'  // Placeholder
    }
];

const MEMBERSHIP_PROVIDERS: Provider[] = [
    {
        id: 'verizon',
        name: 'Verizon Customers',
        description: 'Get access to Presales, Select Seats, and offers with Verizon Access. Terms apply.',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png' // Placeholder
    },
    {
        id: 'citi',
        name: 'Citi Cardmembers',
        description: 'Get access to exclusive Citi ticket offers.',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png' // Placeholder
    }
];

export default function ConnectedAccountsPage() {
    const [connected, setConnected] = useState<Record<string, boolean>>({});
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        getConnectedAccounts().then(res => {
            const map: Record<string, boolean> = {};
            res.accounts.forEach((acc: any) => {
                if (acc.is_connected) map[acc.provider_id] = true;
            });
            setConnected(map);
        });
    }, []);

    const handleToggle = (provider: Provider) => {
        const newState = !connected[provider.id];

        // Optimistic update
        setConnected(prev => ({ ...prev, [provider.id]: newState }));

        startTransition(async () => {
            await toggleConnection(provider.id, provider.name);
        });
    };

    const renderItem = (p: Provider) => (
        <AccountItem key={p.id}>
            <ItemHeader>
                <ItemTitle>{p.name}</ItemTitle>
                <ItemLogo src={p.logoUrl} alt={p.name} />
            </ItemHeader>
            <ItemDescription>{p.description}</ItemDescription>
            <ConnectButton
                onClick={() => handleToggle(p)}
                $connected={connected[p.id]}
            >
                {connected[p.id] ? 'Connected' : 'Connect'}
            </ConnectButton>
        </AccountItem>
    );

    return (
        <Container>
            <SectionTitle style={{ marginTop: 0 }}>Rewards Accounts</SectionTitle>
            <AccountList>
                {REWARDS_PROVIDERS.map(renderItem)}
            </AccountList>

            <SectionTitle>Membership Accounts</SectionTitle>
            <AccountList>
                {MEMBERSHIP_PROVIDERS.map(renderItem)}
            </AccountList>
            <div style={{ height: 40 }}></div>
        </Container>
    );
}
