'use client';

import styled from 'styled-components';
import { Button } from '@/components/ui/primitives';
import { Title } from '@/app/dashboard/profile/layout';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveTaxInfo } from '@/lib/seller/actions';

const Container = styled.div`
  max-width: 600px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #1f262d;
  margin-bottom: 32px;
  line-height: 1.5;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const SectionHeader = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1f262d;
  margin-top: 32px;
  margin-bottom: 16px;
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

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #1f262d;
  cursor: pointer;
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin: 32px 0;
`;

const PasswordWrapper = styled.div`
  position: relative;
  
  svg {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #026cdf;
    width: 20px;
    height: 20px;
  }
`;

const ErrorMsg = styled.div`
  color: #dc2626;
  font-size: 14px;
  margin-bottom: 16px;
`;

export default function TaxInfoPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [showTin, setShowTin] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        const formData = new FormData(e.currentTarget);

        // Simple validation check for TIN match
        if (formData.get('tin') !== formData.get('tinConfirm')) {
            setError('Tax Identification Numbers do not match');
            setIsSubmitting(false);
            return;
        }

        const result = await saveTaxInfo({
            is_us_citizen: formData.get('citizenship') === 'us',
            first_name: formData.get('firstName') as string,
            last_name: formData.get('lastName') as string,
            middle_initial: formData.get('middleInitial') as string,
            suffix: formData.get('suffix') as string,
            country_of_citizenship: formData.get('countryCitizenship') as string,
            tin_type: formData.get('tinType') as string,
            tin: formData.get('tin') as string,
            address_line1: formData.get('address') as string,
            address_line2: formData.get('address2') as string,
            city: formData.get('city') as string,
            postal_code: formData.get('zip') as string,
            country: formData.get('country') as string,
            phone_number: formData.get('phone') as string,
            paperless_1099: formData.get('paperless') === 'on'
        });

        if (result.success) {
            router.push('/dashboard/seller');
        } else {
            setError(result.error || 'Failed to save tax info');
            setIsSubmitting(false);
        }
    };

    return (
        <Container>
            <Title style={{ fontSize: '24px', marginBottom: '16px' }}>Seller Tax Details</Title>

            <Description>
                Before you receive payout for selling on Ticketmaster, you'll need to complete the form below. Please provide your Name, Address, Phone Number, and Taxpayer Identification Number (this can be a Social Security Number (SSN), Individual Taxpayer Identification Number (ITIN), or Employer Identification Number (EIN)). To avoid delays in processing your payout, it's important to make sure that the information you provide on the form matches what you use for tax purposes.
            </Description>

            <a href="#" style={{ color: '#026cdf', fontSize: '14px', display: 'block', marginBottom: '32px' }}>More Info</a>

            <form onSubmit={handleSubmit}>

                <SectionHeader>My Location</SectionHeader>
                <FormGroup>
                    <RadioGroup>
                        <RadioLabel>
                            <input type="radio" name="citizenship" value="us" defaultChecked />
                            I certify that I am a U.S. citizen or resident
                        </RadioLabel>
                        <RadioLabel>
                            <input type="radio" name="citizenship" value="non-us" />
                            I certify that I am not a U.S. citizen or resident
                        </RadioLabel>
                    </RadioGroup>
                </FormGroup>

                <SectionHeader>My Info</SectionHeader>
                <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>Name of individual who is the beneficial owner</p>

                <FormGroup>
                    <Label>First Name</Label>
                    <Input name="firstName" required />
                </FormGroup>

                <FormGroup>
                    <Label>Last Name</Label>
                    <Input name="lastName" required />
                </FormGroup>

                <FormGroup>
                    <Label>Middle Initial (Optional)</Label>
                    <Input name="middleInitial" />
                </FormGroup>

                <FormGroup>
                    <Label>Suffix (Optional)</Label>
                    <Input name="suffix" />
                </FormGroup>

                <SectionHeader>My Tax Info</SectionHeader>

                <FormGroup>
                    <Label>Country of Citizenship</Label>
                    <Select name="countryCitizenship">
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        {/* Add more countries */}
                    </Select>
                </FormGroup>

                <FormGroup>
                    <Label>TIN Type</Label>
                    <Select name="tinType">
                        <option value="SSN">Social Security Number (SSN)</option>
                        <option value="EIN">Employer Identification Number (EIN)</option>
                        <option value="ITIN">Individual Taxpayer Identification Number (ITIN)</option>
                    </Select>
                </FormGroup>

                <FormGroup>
                    <Label>Tax Identification Number (TIN)</Label>
                    <PasswordWrapper>
                        <Input type={showTin ? "text" : "password"} name="tin" required />
                        <svg onClick={() => setShowTin(!showTin)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    </PasswordWrapper>
                </FormGroup>

                <FormGroup>
                    <Label>Re-Enter Tax Identification Number (TIN)</Label>
                    <PasswordWrapper>
                        <Input type={showTin ? "text" : "password"} name="tinConfirm" required />
                        <svg onClick={() => setShowTin(!showTin)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    </PasswordWrapper>
                </FormGroup>

                <SectionHeader>My Address</SectionHeader>
                <Description>Permanent residence address (street, apt. or suite no., or rural route). Do not use a P.O. box or in-care-of address.</Description>

                <FormGroup>
                    <Label>Address</Label>
                    <Input name="address" required />
                </FormGroup>

                <FormGroup>
                    <Label>Address 2 (Optional)</Label>
                    <Input name="address2" />
                </FormGroup>

                <FormGroup>
                    <Label>City</Label>
                    <Input name="city" required />
                </FormGroup>

                <FormGroup>
                    <Label>Postal Code</Label>
                    <Input name="zip" required />
                </FormGroup>

                <FormGroup>
                    <Label>Country</Label>
                    <Select name="country">
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                    </Select>
                </FormGroup>

                <FormGroup>
                    <Label>Phone Number</Label>
                    <Input name="phone" required />
                </FormGroup>

                <CheckboxGroup>
                    <input type="checkbox" id="paperless" name="paperless" style={{ width: 20, height: 20 }} />
                    <label htmlFor="paperless" style={{ fontSize: '14px', lineHeight: '1.4' }}>
                        Check this box to opt-in to paperless delivery of your 1099-K form.
                    </label>
                </CheckboxGroup>

                {error && <ErrorMsg>{error}</ErrorMsg>}

                <Button type="submit" disabled={isSubmitting} style={{ maxWidth: '200px' }}>
                    {isSubmitting ? 'Saving...' : 'Submit'}
                </Button>

                <div style={{ height: 40 }}></div>
            </form>
        </Container>
    );
}
