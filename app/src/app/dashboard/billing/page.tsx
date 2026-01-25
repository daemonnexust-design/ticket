import { getBillingInfo, deletePaymentMethod, deletePayoutAccount } from '@/lib/billing/actions';
import { Button, Container, Grid } from '@/components/ui/primitives';
import { Title } from '@/app/dashboard/profile/layout'; // Reusing title style
import styled from 'styled-components';
import Link from 'next/link';

// Styled Components shared for this section
const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionHeader = styled.div`
  margin-bottom: 16px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #1f262d;
  margin-bottom: 8px;
`;

const SectionDescription = styled.p`
  font-size: 14px;
  color: #1f262d;
  line-height: 1.5;
`;

const AddButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px;
  background-color: #026cdf;
  color: white;
  font-weight: 600;
  border-radius: 4px;
  text-decoration: none;
  margin-top: 16px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #0241b8;
  }
  
  span {
    margin-right: 8px;
    font-size: 20px;
    font-weight: 400;
    line-height: 1;
  }
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CardItem = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
`;

const CardInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CardIcon = styled.div`
  width: 40px;
  height: 25px;
  background: #f3f4f6;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  color: #6b7280;
`;

const CardText = styled.div`
  font-weight: 500;
  color: #1f262d;
`;

const InfoSection = styled.div`
  margin-top: 48px;
`;

const InfoItem = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  
  svg {
    width: 24px;
    height: 24px;
    color: #4b5563;
    flex-shrink: 0;
  }
`;

const InfoContent = styled.div``;

const InfoTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
  color: #1f262d;
`;

const InfoText = styled.p`
  font-size: 14px;
  columns: #4b5563;
  line-height: 1.5;
`;

// Helper component for deleting (client-side interactive would be better but keeping simple for now)
import { DeleteButton } from './DeleteButton';

export default async function BillingPage() {
    const { paymentMethods, payoutAccounts } = await getBillingInfo();

    return (
        <div style={{ maxWidth: '600px' }}>
            {/* Payment Methods */}
            <Section>
                <SectionHeader>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <SectionTitle>Payment Methods</SectionTitle>
                        {/* Icons placeholder */}
                        <div style={{ display: 'flex', gap: '4px' }}>
                            {/* Small mock icons */}
                            <div style={{ width: 24, height: 16, backgroundColor: '#fbbf24', borderRadius: 2 }}></div>
                            <div style={{ width: 24, height: 16, backgroundColor: '#3b82f6', borderRadius: 2 }}></div>
                            <div style={{ width: 24, height: 16, backgroundColor: '#ef4444', borderRadius: 2 }}></div>
                        </div>
                    </div>
                    <SectionDescription>
                        Add, edit, and remove payment methods as needed.
                    </SectionDescription>
                </SectionHeader>

                <CardList>
                    {paymentMethods.map((pm: any) => (
                        <CardItem key={pm.id}>
                            <CardInfo>
                                <CardIcon>{pm.brand || pm.type}</CardIcon>
                                <CardText>
                                    {pm.type === 'paypal' ? 'PayPal' : `•••• ${pm.last4}`}
                                </CardText>
                            </CardInfo>
                            <DeleteButton id={pm.id} type="payment" />
                        </CardItem>
                    ))}
                </CardList>

                <AddButton href="/dashboard/billing/add-payment">
                    <span>+</span> Save New Payment Method
                </AddButton>
            </Section>

            {/* Payout Accounts */}
            <Section>
                <SectionHeader>
                    <SectionTitle>Payout Accounts</SectionTitle>
                    <SectionDescription>
                        You do not have any saved payout accounts at this moment. Add a payout account so you can receive payments when tickets you sell are purchased.
                    </SectionDescription>
                </SectionHeader>

                <CardList>
                    {payoutAccounts.map((pa: any) => (
                        <CardItem key={pa.id}>
                            <CardInfo>
                                <CardIcon>BANK</CardIcon>
                                <CardText>
                                    {pa.bank_name || 'Bank Account'} •••• {pa.account_number_last4}
                                </CardText>
                            </CardInfo>
                            <DeleteButton id={pa.id} type="payout" />
                        </CardItem>
                    ))}
                </CardList>

                <AddButton href="/dashboard/billing/add-payout">
                    <span>+</span> Add An Account
                </AddButton>
            </Section>

            {/* Info Section */}
            <InfoSection>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                    <img src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=100&h=100&fit=crop" alt="Payment Options" style={{ width: 48, height: 48, borderRadius: 4, marginRight: 16 }} />
                    <SectionTitle style={{ margin: 0 }}>Payment Options and How they work</SectionTitle>
                </div>

                <SectionDescription style={{ marginBottom: '32px' }}>
                    From buying tickets to selling tickets when you can no longer go, use your saved accounts to help manage it all.
                </SectionDescription>

                <InfoItem>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
                    <InfoContent>
                        <InfoTitle>Payment</InfoTitle>
                        <InfoText>Make checkout a breeze by adding a payment account in advance, so you can check out in just a few taps.</InfoText>
                    </InfoContent>
                </InfoItem>

                <InfoItem>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    <InfoContent>
                        <InfoTitle>Reimburse</InfoTitle>
                        <InfoText>If you're selling tickets, add an account to reimburse the buyer of your tickets if the event is cancelled, postponed, or rescheduled and you can no longer attend.</InfoText>
                    </InfoContent>
                </InfoItem>

                <InfoItem>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></svg>
                    <InfoContent>
                        <InfoTitle>Payout</InfoTitle>
                        <InfoText>Get automatically paid to your checking account or debit card within 7 business days after the event.</InfoText>
                    </InfoContent>
                </InfoItem>
            </InfoSection>
        </div>
    );
}
