'use client';

import styled from 'styled-components';
import { Button } from '@/components/ui/primitives';
import { Title } from '@/app/dashboard/profile/layout';
import { checkBalance } from '@/lib/gift-cards/actions';
import { useState } from 'react';

const Container = styled.div`
  max-width: 600px;
  background: white;
  border-radius: 8px;
  padding: 0; // Padding handled by internal sections
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 2px solid #e5e7eb;
  margin-bottom: 32px;
`;

const Tab = styled.button<{ $active?: boolean }>`
  padding: 16px 24px;
  background: none;
  border: none;
  border-bottom: 2px solid ${({ $active }) => ($active ? '#026cdf' : 'transparent')};
  color: ${({ $active }) => ($active ? '#1f262d' : '#6b7280')};
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: -2px; // Overlap border
  
  &:hover {
    color: #026cdf;
  }
`;

const TabContent = styled.div`
  padding: 0 0 32px 0;
`;

const Header = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1f262d;
  margin-bottom: 24px;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1f262d;
  
  svg {
    width: 16px;
    height: 16px;
    color: #026cdf;
    cursor: pointer;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #026cdf;
  }
`;

const EmptyState = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 32px 0;
  color: #1f262d;
  
  svg {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
  }
  
  p {
      line-height: 1.5;
  }
`;

const ResultBox = styled.div`
  background: #f0fdf4;
  border: 1px solid #16a34a;
  color: #15803d;
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 24px;
  font-weight: 600;
`;

const ErrorBox = styled.div`
    background: #fef2f2;
    border: 1px solid #dc2626;
    color: #dc2626;
    padding: 16px;
    border-radius: 4px;
    margin-bottom: 24px;
`;

export default function GiftCardsPage() {
    const [activeTab, setActiveTab] = useState<'balance' | 'credits'>('balance');
    const [balanceResult, setBalanceResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleCheckBalance = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setBalanceResult(null);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const result = await checkBalance(
            formData.get('cardNumber') as string,
            formData.get('pin') as string
        );

        if (result.success) {
            setBalanceResult(`$${result.balance}`);
        } else {
            setError(result.error || 'Failed to check balance');
        }
        setLoading(false);
    };

    return (
        <Container>
            <Tabs>
                <Tab
                    $active={activeTab === 'balance'}
                    onClick={() => setActiveTab('balance')}
                >
                    Gift Card Balance
                </Tab>
                <Tab
                    $active={activeTab === 'credits'}
                    onClick={() => setActiveTab('credits')}
                >
                    Promo Codes and Credits
                </Tab>
            </Tabs>

            <TabContent>
                {activeTab === 'balance' ? (
                    <div style={{ maxWidth: '600px' }}>
                        <Header>Check Gift Card Balance</Header>

                        {balanceResult && <ResultBox>Your Balance: {balanceResult}</ResultBox>}
                        {error && <ErrorBox>{error}</ErrorBox>}

                        <form onSubmit={handleCheckBalance}>
                            <FormGroup>
                                <Label>Gift Card Number</Label>
                                <Input name="cardNumber" required placeholder="" />
                            </FormGroup>

                            <FormGroup>
                                <Label>
                                    Pin Number
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                                </Label>
                                <Input name="pin" required placeholder="" type="password" />
                            </FormGroup>

                            <Button type="submit" disabled={loading} style={{ width: '100%', marginTop: '8px' }}>
                                {loading ? 'Checking...' : 'Check Balance'}
                            </Button>
                        </form>
                    </div>
                ) : (
                    <EmptyState>
                        {/* Ticket/Document Icon */}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="16" rx="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                            <path d="M8 14h.01" /> {/* Little ticket dots */}
                            <path d="M12 14h.01" />
                            <path d="M16 14h.01" />
                            <path d="M8 18h.01" />
                            <path d="M12 18h.01" />
                            <path d="M16 18h.01" />
                        </svg>
                        <p>
                            You currently do not have any Promo Codes or Credits applied to your account.
                        </p>
                    </EmptyState>
                )}
            </TabContent>
        </Container>
    );
}
