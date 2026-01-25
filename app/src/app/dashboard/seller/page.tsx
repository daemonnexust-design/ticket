'use client';

import styled from 'styled-components';
import Link from 'next/link';

const Section = styled.section`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #1f262d;
`;

const SectionDescription = styled.p`
  font-size: 14px;
  color: #1f262d;
  margin-bottom: 24px;
  line-height: 1.5;
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  svg {
    width: 24px;
    height: 24px;
    color: #4b5563;
  }
`;

const AddLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #026cdf;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  
  span {
    font-size: 24px;
    font-weight: 400;
    line-height: 1;
  }
  
  &:hover {
    text-decoration: underline;
  }
`;

const CardIcon = styled.div`
  width: 40px;
  height: 26px;
  border: 1px solid #9ca3af;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::after {
    content: '';
    width: 24px;
    height: 1px;
    background: #9ca3af;
    box-shadow: 0 4px 0 #9ca3af;
  }
`;

const WarningBox = styled.div`
  background: white;
  border: 1px solid #fbbf24;
  border-radius: 4px;
  padding: 16px;
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;

const WarningIcon = styled.div`
  color: #f59e0b;
  flex-shrink: 0;
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const WarningText = styled.p`
  font-size: 14px;
  color: #1f262d;
  line-height: 1.5;
`;

const Button = styled(Link)`
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #026cdf;
  color: white;
  text-align: center;
  font-weight: 700;
  border-radius: 4px;
  text-decoration: none;
  transition: background 0.2s;
  
  &:hover {
    background-color: #0241b8;
  }
`;

export default function SellerDashboardPage() {
    return (
        <div style={{ maxWidth: '600px' }}>
            {/* Payout Method */}
            <Section>
                <SectionTitle>Payout Method</SectionTitle>
                <SectionDescription>
                    In order to receive a payment, please enter your bank account or debit card information.
                </SectionDescription>

                <ActionRow>
                    <span style={{ fontSize: '24px', color: '#026cdf', cursor: 'default' }}>+</span>
                    <CardIcon />
                    {/* Reusing Billing Add Page */}
                    <AddLink href="/dashboard/billing/add-payout">Add New Account</AddLink>
                </ActionRow>
            </Section>

            {/* Reimbursement Method */}
            <Section>
                <SectionTitle>Reimbursement Method</SectionTitle>
                <SectionDescription>
                    All sellers are required to have a credit card on file in case an event is cancelled, postponed, or rescheduled. The buyer of your ticket may request a refund (if permitted by the Event Organizer).
                </SectionDescription>

                <ActionRow>
                    <span style={{ fontSize: '24px', color: '#026cdf', cursor: 'default' }}>+</span>
                    <CardIcon />
                    <AddLink href="/dashboard/billing/add-payment">Add New Card</AddLink>
                </ActionRow>
            </Section>

            {/* Seller Tax Details */}
            <Section>
                <SectionTitle>Seller Tax Details</SectionTitle>
                <SectionDescription>
                    Before sending your payout, Ticketmaster is required to collect tax payer information or data to verify non-US status in accordance with applicable laws. See our <a href="#" style={{ color: '#026cdf' }}>FAQ</a> for more details.
                </SectionDescription>

                <WarningBox>
                    <WarningIcon>
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm1 17h-2v-2h2v2zm0-4h-2v-4h2v4z" /></svg>
                    </WarningIcon>
                    <WarningText>
                        Taxpayer information is missing or has not been verified. Click the button to provide the required taxpayer information.
                    </WarningText>
                </WarningBox>

                <Button href="/dashboard/seller/tax-info">
                    Update Taxpayer Information
                </Button>
            </Section>
        </div>
    );
}
