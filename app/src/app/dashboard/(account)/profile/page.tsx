'use client';

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #1f262d;
  margin-bottom: 16px;
`;

const SectionDescription = styled.p`
  font-size: 14px;
  color: #1f262d;
  margin-bottom: 24px;
  line-height: 1.5;
`;

const FormGroup = styled.div`
  background: white;
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #1f262d;
  margin-bottom: 8px;
`;

// Converted to Input
const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  font-size: 16px;
  color: #1f262d;
  background: white;
  min-height: 48px;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #026cdf;
    box-shadow: 0 0 0 2px rgba(2, 108, 223, 0.2);
  }
`;

const Button = styled.button`
  width: auto;
  min-width: 160px;
  padding: 14px 24px;
  background: #024ddf;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #0241b8;
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 32px 0;
`;

const InputIcon = styled.div`
  margin-right: 12px;
  color: #026cdf;
  display: flex;
  align-items: center;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  
  ${StyledInput} {
    padding-left: 48px; // Make room for icon
  }
  
  ${InputIcon} {
    position: absolute;
    left: 16px;
    margin: 0;
    pointer-events: none;
  }
`;

export default function ProfileDetailsPage() {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [zip, setZip] = useState('');

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      console.log('ProfilePage User:', user); // Debug

      if (user) {
        const meta = user.user_metadata || {};

        // Robust Name Parsing
        const rawName = meta.full_name || meta.name || '';
        const nameParts = rawName.split(' ');
        const fName = meta.first_name || nameParts[0] || '';
        const lName = meta.last_name || nameParts.slice(1).join(' ') || '';

        setFirstName(fName);
        setLastName(lName);
        setEmail(user.email || '');
        setPhone(meta.phone || user.phone || '');
        setCountry(meta.country || 'United States');
        setZip(meta.zip || meta.postal_code || '');
      }
      setLoading(false);
    }
    loadUser();
  }, [supabase]);

  const handleUpdate = async (type: 'details' | 'email' | 'number' | 'location') => {
    setUpdating(true);
    try {
      let updates: any = { data: {} };

      if (type === 'details') {
        const fullName = `${firstName} ${lastName}`.trim();
        updates.data = { full_name: fullName, first_name: firstName, last_name: lastName };
      }

      if (type === 'email') {
        updates.email = email;
        // Note: Changing email usually triggers re-verification flow in Supabase
      }

      if (type === 'number') {
        updates.phone = phone;
        // updates.data.phone = phone; // Store in metadata too just in case
      }

      if (type === 'location') {
        updates.data = { ...updates.data, country, zip };
      }

      const { error } = await supabase.auth.updateUser(updates);

      if (error) throw error;

      alert(`Successfully updated ${type}!`);
      router.refresh(); // Refresh to update Sidebar/Header names
    } catch (error: any) {
      alert(`Error updating profile: ${error.message}`);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div>Loading profile...</div>;

  return (
    <div style={{ maxWidth: '600px' }}>
      {/* My Info */}
      <Section>
        <SectionTitle>My Info</SectionTitle>

        <FormGroup>
          <Label>First Name</Label>
          <StyledInput
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
        </FormGroup>

        <FormGroup>
          <Label>Last Name</Label>
          <StyledInput
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </FormGroup>

        <Button onClick={() => handleUpdate('details')} disabled={updating}>
          {updating ? 'Updating...' : 'Update Details'}
        </Button>
      </Section>

      <Divider />

      {/* Email Address */}
      <Section>
        <SectionTitle>Email Address</SectionTitle>

        <FormGroup>
          <Label>Email</Label>
          <StyledInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </FormGroup>

        <Button onClick={() => handleUpdate('email')} disabled={updating}>
          Update Email
        </Button>
      </Section>

      <Divider />

      {/* Phone Number */}
      <Section>
        <SectionTitle>Phone Number</SectionTitle>

        <FormGroup>
          <Label>Phone Number</Label>
          <StyledInput
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            placeholder="***-***-****"
          />
        </FormGroup>

        <Button onClick={() => handleUpdate('number')} disabled={updating}>
          Update Number
        </Button>
      </Section>

      <Divider />

      {/* Locations */}
      <Section>
        <SectionTitle>Locations</SectionTitle>
        <SectionDescription>
          Let us know the location you're interested in and we'll send you personalised notifications about upcoming events
        </SectionDescription>

        <FormGroup>
          <Label>Country</Label>
          <StyledInput
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Postal code</Label>
          <InputWrapper>
            <InputIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </InputIcon>
            <StyledInput
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="Zip Code"
            />
          </InputWrapper>
        </FormGroup>

        <Button onClick={() => handleUpdate('location')} disabled={updating}>
          Update Location
        </Button>
      </Section>
    </div>
  );
}
