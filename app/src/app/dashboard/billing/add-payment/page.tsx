'use client';

import styled from 'styled-components';
import { Button } from '@/components/ui/primitives';
import { Title } from '@/app/dashboard/profile/layout';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addPaymentMethod } from '@/lib/billing/actions';

const Container = styled.div`
  max-width: 500px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 24px;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1f262d;
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

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 24px;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  color: #1f262d;
  cursor: pointer;
  
  div {
      font-weight: 600;
      margin-bottom: 4px;
  }
  
  span {
      color: #6b7280;
  }
`;

const PayPalButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #fbbf24;
  border: none;
  border-radius: 4px;
  font-weight: 700;
  font-size: 16px;
  font-style: italic;
  color: #003087;
  cursor: pointer;
  margin-bottom: 32px;
  
  &:hover {
    background-color: #f59e0b;
  }
`;

const CardIcons = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const ErrorMsg = styled.div`
  color: #dc2626;
  font-size: 14px;
  margin-bottom: 16px;
`;

export default function AddPaymentPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        const formData = new FormData(e.currentTarget);

        // Simulate adding a card
        const result = await addPaymentMethod({
            type: 'card',
            brand: 'visa', // Simulated detection
            last4: (formData.get('cardNumber') as string)?.slice(-4),
            expiry: (formData.get('expiry') as string)
        });

        if (result.success) {
            router.push('/dashboard/billing');
        } else {
            setError(result.error || 'Failed to add card');
            setIsSubmitting(false);
        }
    };

    const handlePayPal = async () => {
        setIsSubmitting(true);
        // Simulate PayPal flow
        await new Promise(r => setTimeout(r, 1000));
        const result = await addPaymentMethod({ type: 'paypal' });

        if (result.success) {
            router.push('/dashboard/billing');
        } else {
            setError(result.error || 'Failed to link PayPal');
            setIsSubmitting(false);
        }
    };

    return (
        <Container>
            <Title style={{ fontSize: '24px', marginBottom: '32px' }}>Save New Payment Method</Title>

            <SectionTitle>PayPal</SectionTitle>
            <p style={{ fontSize: '14px', marginBottom: '16px', color: '#1f262d' }}>
                Add your PayPal account for a fast and easy checkout.
            </p>
            <PayPalButton onClick={handlePayPal} disabled={isSubmitting}>
                PayPal
            </PayPalButton>

            <SectionTitle>Card</SectionTitle>
            <p style={{ fontSize: '14px', marginBottom: '16px', color: '#1f262d' }}>
                Add a credit or debit card for a fast and easy checkout on your purchases and refunding buyers when selling your tickets.
            </p>

            <CardIcons>
                <div style={{ width: 32, height: 20, background: '#003087', borderRadius: 2 }}></div>
                <div style={{ width: 32, height: 20, background: '#eb001b', borderRadius: 2 }}></div>
                <div style={{ width: 32, height: 20, background: '#f79e1b', borderRadius: 2 }}></div>
            </CardIcons>

            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Name on Card</Label>
                    <Input name="cardName" required placeholder="" />
                </FormGroup>

                <FormGroup>
                    <Label>Card Number</Label>
                    <Input name="cardNumber" required placeholder="" maxLength={19} />
                </FormGroup>

                <FormGroup>
                    <Label>Expiration Date</Label>
                    <Input name="expiry" required placeholder="MM/YY" maxLength={5} />
                </FormGroup>

                <FormGroup>
                    <Label>Country</Label>
                    <Select name="country">
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                    </Select>
                </FormGroup>

                <div style={{ marginBottom: '24px', marginTop: '32px' }}>
                    <Label style={{ fontWeight: 400 }}>Set as a primary card for:</Label>
                </div>

                <CheckboxGroup>
                    <Checkbox type="checkbox" id="primary-payment" name="isPrimary" />
                    <CheckboxLabel htmlFor="primary-payment">
                        <div>Payment</div>
                        <span>For when you are purchasing tickets</span>
                    </CheckboxLabel>
                </CheckboxGroup>

                {error && <ErrorMsg>{error}</ErrorMsg>}

                <div style={{ display: 'flex', gap: '16px', marginTop: '40px' }}>
                    <Button type="button" $variant="ghost" onClick={() => router.back()} disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Save Card'}
                    </Button>
                </div>
            </form>
        </Container>
    );
}
