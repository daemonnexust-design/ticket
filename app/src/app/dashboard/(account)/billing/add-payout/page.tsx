'use client';

import styled from 'styled-components';
import { Button } from '@/components/ui/primitives';
import { Title } from '@/app/dashboard/(account)/layout';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addPayoutAccount } from '@/lib/billing/actions';

const Container = styled.div`
  max-width: 500px;
`;

const SectionDescription = styled.p`
  font-size: 14px;
  color: #1f262d;
  margin-bottom: 32px;
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

const Row = styled.div`
  display: flex;
  gap: 16px;
  
  > div {
    flex: 1;
  }
`;

const CheckImage = styled.div`
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  margin: 32px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  div {
      height: 12px;
      background: #e5e7eb;
      border-radius: 2px;
  }
  
  .numbers {
      display: flex;
      gap: 12px;
      margin-top: 12px;
      
      span {
          background: white;
          border: 1px solid #9ca3af;
          padding: 4px;
          flex: 1;
          font-family: monospace;
          font-size: 12px;
          text-align: center;
          position: relative;
          
          &::after {
              content: attr(data-label);
              position: absolute;
              bottom: -20px;
              left: 0;
              right: 0;
              font-family: sans-serif;
              font-size: 10px;
              color: #4b5563;
          }
      }
  }
`;

const ErrorMsg = styled.div`
  color: #dc2626;
  font-size: 14px;
  margin-bottom: 16px;
`;

export default function AddPayoutPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        const formData = new FormData(e.currentTarget);

        const result = await addPayoutAccount({
            country: formData.get('country') as string,
            type: formData.get('type') as string,
            first_name: formData.get('firstName') as string,
            last_name: formData.get('lastName') as string,
            routing_number: formData.get('routingNumber') as string,
            account_number: formData.get('accountNumber') as string
        });

        if (result.success) {
            router.push('/dashboard/billing');
        } else {
            setError(result.error || 'Failed to add payout account');
            setIsSubmitting(false);
        }
    };

    return (
        <Container>
            <Title style={{ fontSize: '24px', marginBottom: '16px' }}>Add Payout Account</Title>
            <SectionDescription>
                Add a payout account so you can receive payments when tickets you sell are purchased.
            </SectionDescription>

            <form onSubmit={handleSubmit}>
                <Row>
                    <FormGroup>
                        <Label>Country</Label>
                        <Select name="country">
                            <option value="United States">United States</option>
                            <option value="UK">United Kingdom</option>
                        </Select>
                    </FormGroup>

                    <FormGroup>
                        <Label>Payout Type</Label>
                        <Select name="type">
                            <option value="Checking">Checking</option>
                            <option value="Savings">Savings</option>
                        </Select>
                    </FormGroup>
                </Row>

                <FormGroup>
                    <Label>First Name</Label>
                    <Input name="firstName" required />
                </FormGroup>

                <FormGroup>
                    <Label>Last Name</Label>
                    <Input name="lastName" required />
                </FormGroup>

                <FormGroup>
                    <Label>Routing Number</Label>
                    <Input name="routingNumber" required pattern="[0-9]*" />
                </FormGroup>

                <FormGroup>
                    <Label>Account Number</Label>
                    <Input name="accountNumber" required pattern="[0-9]*" />
                </FormGroup>

                {/* Visual Aid for Check numbers */}
                <CheckImage>
                    <div style={{ width: '40%' }}></div>
                    <div style={{ width: '80%' }}></div>
                    <div className="numbers">
                        <span data-label="Routing">123456789</span>
                        <span data-label="Account">987654321</span>
                    </div>
                    <div style={{ height: 20, background: 'transparent' }}></div>
                </CheckImage>

                {error && <ErrorMsg>{error}</ErrorMsg>}

                <div style={{ display: 'flex', gap: '16px', marginTop: '40px', justifyContent: 'center' }}>
                    <Button type="button" $variant="ghost" onClick={() => router.back()} disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Save Account'}
                    </Button>
                </div>
            </form>
        </Container>
    );
}
