'use client';

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container, Flex } from '@/components/ui/primitives';
import { createClient } from '@/lib/supabase/client';
import { QRCodeSVG } from 'qrcode.react';

const PageWrapper = styled.div`
  background: #f8f9fa;
  min-height: 100vh;
  padding: 40px 0;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const PaymentCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  overflow: hidden;
`;

const PaymentHeader = styled.div`
  background: ${({ theme }) => theme.colors.blue};
  color: white;
  padding: 20px 24px;
  font-weight: 600;
  font-size: 18px;
`;

const PaymentBody = styled.div`
  padding: 32px;
`;

const MethodSelector = styled(Flex)`
  gap: 16px;
  margin-bottom: 32px;
`;

const MethodButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 16px;
  border: 2px solid ${({ $active, theme }) => $active ? theme.colors.blue : '#e5e7eb'};
  border-radius: 8px;
  background: ${({ $active }) => $active ? '#f0f7ff' : 'white'};
  color: ${({ $active, theme }) => $active ? theme.colors.blue : theme.colors.textPrimary};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.blue};
  }
`;

const CryptoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
`;

const CryptoOption = styled.button<{ $selected: boolean }>`
  padding: 12px;
  border: 1px solid ${({ $selected, theme }) => $selected ? theme.colors.blue : '#e5e7eb'};
  background: ${({ $selected }) => $selected ? '#f0f7ff' : 'white'};
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.blue};
  }
`;

const WalletDisplay = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  margin-top: 24px;
`;

const AddressBox = styled.div`
  background: white;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  margin: 16px 0;
  font-family: monospace;
  word-break: break-all;
  font-size: 14px;
  color: #374151;
`;

const OrderSummary = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  height: fit-content;
`;

const SummaryRow = styled(Flex)`
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
  color: #4b5563;
  
  &.total {
    border-top: 1px solid #e5e7eb;
    padding-top: 12px;
    margin-top: 12px;
    font-weight: 700;
    color: #111827;
    font-size: 18px;
  }
`;

const ActionButton = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.blue};
  color: white;
  padding: 16px;
  border-radius: 8px;
  border: none;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  margin-top: 24px;
  
  &:hover {
    background: ${({ theme }) => theme.colors.blueDark};
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const currencies = [
    { id: 'btc', label: 'Bitcoin', symbol: 'BTC' },
    { id: 'eth', label: 'Ethereum', symbol: 'ETH' },
    { id: 'usdt', label: 'Tether', symbol: 'USDT' },
    { id: 'usdc', label: 'USD Coin', symbol: 'USDC' },
    { id: 'sol', label: 'Solana', symbol: 'SOL' },
];

export function PaymentPageClient() {
    const [method, setMethod] = useState<'crypto' | 'gift'>('crypto');
    const [selectedCrypto, setSelectedCrypto] = useState('btc');
    const [walletAddress, setWalletAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const searchParams = useSearchParams();
    const amount = searchParams.get('amount') || '0.00';
    const orderId = searchParams.get('orderId');

    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        // Fetch wallet address for selected crypto
        const fetchAddress = async () => {
            const { data } = await supabase
                .from('payment_settings')
                .select('value')
                .eq('key', `${selectedCrypto}_address`)
                .single();

            if (data) {
                setWalletAddress(data.value);
            } else {
                setWalletAddress('');
            }
        };

        fetchAddress();
    }, [selectedCrypto, supabase]);

    const handleConfirmPayment = async () => {
        setLoading(true);

        // Update order status
        const { error } = await supabase
            .from('orders')
            .update({
                payment_method: method,
                payment_status: 'pending',
                payment_details: {
                    currency: selectedCrypto,
                    address: walletAddress,
                    amount_expected: amount
                }
            })
            .eq('id', orderId);

        if (!error) {
            router.push(`/checkout/confirmation?orderId=${orderId}`);
        }

        setLoading(false);
    };

    return (
        <PageWrapper>
            <Container>
                <ContentGrid>
                    <PaymentCard>
                        <PaymentHeader>Secure Payment</PaymentHeader>
                        <PaymentBody>
                            <MethodSelector>
                                <MethodButton
                                    $active={method === 'crypto'}
                                    onClick={() => setMethod('crypto')}
                                >
                                    <span>₿</span>
                                    Crypto
                                </MethodButton>
                                <MethodButton
                                    $active={method === 'gift'}
                                    onClick={() => setMethod('gift')}
                                >
                                    <span>🎁</span>
                                    Gift Card
                                </MethodButton>
                            </MethodSelector>

                            {method === 'crypto' && (
                                <>
                                    <h3 style={{ marginBottom: '16px' }}>Select Cryptocurrency</h3>
                                    <CryptoGrid>
                                        {currencies.map(c => (
                                            <CryptoOption
                                                key={c.id}
                                                $selected={selectedCrypto === c.id}
                                                onClick={() => setSelectedCrypto(c.id)}
                                            >
                                                {c.symbol}
                                            </CryptoOption>
                                        ))}
                                    </CryptoGrid>

                                    {walletAddress ? (
                                        <WalletDisplay>
                                            <p style={{ marginBottom: '16px', fontWeight: 600 }}>Scan QR to Pay</p>
                                            <div style={{ background: 'white', padding: '16px', display: 'inline-block', borderRadius: '8px' }}>
                                                <QRCodeSVG value={walletAddress} size={180} />
                                            </div>

                                            <div style={{ marginTop: '24px' }}>
                                                <p style={{ fontSize: '12px', color: '#6b7280' }}>Send only {selectedCrypto.toUpperCase()} to this address</p>
                                                <AddressBox>{walletAddress}</AddressBox>
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(walletAddress)}
                                                    style={{ color: '#026cdf', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                                                >
                                                    Copy Address
                                                </button>
                                            </div>
                                        </WalletDisplay>
                                    ) : (
                                        <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
                                            PLease configure wallet address in Admin Dashboard
                                        </div>
                                    )}
                                </>
                            )}

                            {method === 'gift' && (
                                <div>
                                    <h3 style={{ marginBottom: '16px' }}>Enter Gift Card Details</h3>
                                    <div style={{ marginBottom: '16px' }}>
                                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Card Type</label>
                                        <select
                                            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #e5e7eb' }}
                                            defaultValue="ticketmaster"
                                        >
                                            <option value="ticketmaster">Ticketmaster Gift Card</option>
                                            <option value="visa">Visa Prepaid</option>
                                            <option value="amex">Amex Prepaid</option>
                                        </select>
                                    </div>

                                    <div style={{ marginBottom: '16px' }}>
                                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Region</label>
                                        <select
                                            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #e5e7eb' }}
                                            defaultValue="us"
                                        >
                                            <option value="us">United States (USD)</option>
                                            <option value="ca">Canada (CAD)</option>
                                            <option value="uk">United Kingdom (GBP)</option>
                                            <option value="eu">Europe (EUR)</option>
                                        </select>
                                    </div>

                                    <div style={{ marginBottom: '16px' }}>
                                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Gift Card Number / Key</label>
                                        <input
                                            type="text"
                                            placeholder="XXXX-XXXX-XXXX-XXXX"
                                            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #e5e7eb' }}
                                        />
                                    </div>
                                </div>
                            )}

                            <ActionButton onClick={handleConfirmPayment} disabled={loading || (method === 'crypto' && !walletAddress)}>
                                {loading ? 'Processing...' : (method === 'crypto' ? 'I Have Sent Payment' : 'Redeem Gift Card')}
                            </ActionButton>

                        </PaymentBody>
                    </PaymentCard>

                    <OrderSummary>
                        <h3 style={{ marginBottom: '20px' }}>Order Summary</h3>
                        <SummaryRow>
                            <span>Tickets (2x)</span>
                            <span>${amount}</span>
                        </SummaryRow>
                        <SummaryRow>
                            <span>Service Fees</span>
                            <span>$45.00</span>
                        </SummaryRow>
                        <SummaryRow className="total">
                            <span>Total</span>
                            <span>${(parseFloat(amount) + 45).toFixed(2)}</span>
                        </SummaryRow>
                    </OrderSummary>
                </ContentGrid>
            </Container>
        </PageWrapper>
    );
}
