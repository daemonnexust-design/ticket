'use client';

import styled from 'styled-components';
import { useState } from 'react';

// Static data for now, ideally fetched from server/context
const mockUser = {
    firstName: 'Nancy',
    lastName: 'Clopper',
    email: 'nancyclopper3@gmail.com',
    phone: '***-***-6551',
    country: 'United States',
    zip: '33127'
};

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

const ReadOnlyInput = styled.div`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  font-size: 16px;
  color: #1f262d;
  background: white;
  display: flex;
  align-items: center;
  min-height: 48px;
  
  /* Use input styling if it's meant to be editable eventually, 
     but screenshot shows them as filled boxes. 
     Let's allow them to look like inputs. */
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
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
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 32px 0;
`;

const SelectDisplay = styled(ReadOnlyInput)`
  justify-content: space-between;
  
  &::after {
    content: '';
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #1f262d;
  }
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

export default function ProfileDetailsPage() {
    return (
        <div style={{ maxWidth: '600px' }}>
            {/* My Info */}
            <Section>
                <SectionTitle>My Info</SectionTitle>

                <FormGroup>
                    <Label>First Name</Label>
                    <ReadOnlyInput>{mockUser.firstName}</ReadOnlyInput>
                </FormGroup>

                <FormGroup>
                    <Label>Last Name</Label>
                    <ReadOnlyInput>{mockUser.lastName}</ReadOnlyInput>
                </FormGroup>

                <Button>Update Details</Button>
            </Section>

            <Divider />

            {/* Email Address */}
            <Section>
                <SectionTitle>Email Address</SectionTitle>

                <FormGroup>
                    <Label>Email</Label>
                    <ReadOnlyInput>{mockUser.email}</ReadOnlyInput>
                </FormGroup>

                <Button>Update Email</Button>
            </Section>

            <Divider />

            {/* Phone Number */}
            <Section>
                <SectionTitle>Phone Number</SectionTitle>

                <FormGroup>
                    <Label>Phone Number</Label>
                    <ReadOnlyInput>{mockUser.phone}</ReadOnlyInput>
                </FormGroup>

                <Button>Update Number</Button>
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
                    <SelectDisplay>{mockUser.country}</SelectDisplay>
                </FormGroup>

                <FormGroup>
                    <Label>Postal code</Label>
                    <ReadOnlyInput>
                        <InputIcon>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                        </InputIcon>
                        {mockUser.zip}
                    </ReadOnlyInput>
                </FormGroup>

                <Button>Update Location</Button>
            </Section>
        </div>
    );
}
