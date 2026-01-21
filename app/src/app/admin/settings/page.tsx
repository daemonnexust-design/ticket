'use client';

import styled from 'styled-components';
import { Container } from '@/components/ui/primitives';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

const PageHeader = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 8px;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
`;

const SettingsCard = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 24px;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.blue};
  }
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.blue};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const cryptoCurrencies = [
  { id: 'btc', label: 'Bitcoin (BTC)' },
  { id: 'eth', label: 'Ethereum (ETH)' },
  { id: 'usdt', label: 'Tether (USDT - ERC20)' },
  { id: 'usdc', label: 'USD Coin (USDC - ERC20)' },
  { id: 'xrp', label: 'Ripple (XRP)' },
  { id: 'ltc', label: 'Litecoin (LTC)' },
  { id: 'sol', label: 'Solana (SOL)' },
];

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [wallets, setWallets] = useState<Record<string, string>>({});

  const supabase = createClient();

  // Load existing settings
  useEffect(() => {
    const loadSettings = async () => {
      const { data, error } = await supabase
        .from('payment_settings')
        .select('*');

      if (data) {
        const settingsMap: Record<string, string> = {};
        data.forEach(item => {
          settingsMap[item.key] = item.value;
        });
        setWallets(settingsMap);
      }
    };

    loadSettings();
  }, [supabase]);

  const handleSave = async () => {
    setLoading(true);
    setMessage('');

    try {
      // Upsert each wallet address
      const updates = Object.entries(wallets).map(([key, value]) => ({
        key,
        value,
        updated_at: new Date().toISOString()
      }));

      const { error } = await supabase
        .from('payment_settings')
        .upsert(updates, { onConflict: 'key' });

      if (error) throw error;
      setMessage('Settings saved successfully!');
    } catch (err) {
      console.error('Error saving settings:', err);
      setMessage('Error saving settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <PageHeader>
        <Title>Payment Settings</Title>
        <Description>Manage your wallet addresses for cryptocurrency payments.</Description>
      </PageHeader>

      <SettingsCard>
        <SectionTitle>Crypto Wallet Addresses</SectionTitle>

        {cryptoCurrencies.map(crypto => (
          <FormGroup key={crypto.id}>
            <Label>{crypto.label}</Label>
            <Input
              type="text"
              placeholder={`Enter your ${crypto.label} wallet address`}
              value={wallets[`${crypto.id}_address`] || ''}
              onChange={(e) => setWallets(prev => ({
                ...prev,
                [`${crypto.id}_address`]: e.target.value
              }))}
            />
          </FormGroup>
        ))}

        <div style={{ marginTop: '24px' }}>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
          {message && (
            <span style={{
              marginLeft: '16px',
              color: message.includes('Error') ? '#ef4444' : '#10b981',
              fontSize: '14px',
              fontWeight: 500
            }}>
              {message}
            </span>
          )}
        </div>
      </SettingsCard>
    </Container>
  );
}
