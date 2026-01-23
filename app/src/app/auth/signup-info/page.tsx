'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { validateReferralCode } from '@/lib/auth/actions';

// STYLED COMPONENTS
const PageWrapper = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  
  @media (max-width: 720px) {
    background: white;
    align-items: stretch;
  }
`;

const AuthCard = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
  width: 100%;
  max-width: 1000px;
  height: 100vh;
  max-height: 800px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  overflow: hidden;
  background: white;
  
  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    max-height: none;
    height: 100%;
    min-height: 100vh;
    border-radius: 0;
    box-shadow: none;
  }
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background-color: rgb(18, 18, 18);
  background-size: cover;
  padding: 0px 32px;
  hyphens: auto;
  
  @media (max-width: 900px) {
    display: none;
  }
`;

const ContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 32px;
  gap: 8px;
`;

const TextRow = styled.div``;

const WelcomeLabel = styled.span`
  font-size: 44px;
  line-height: 44px;
  text-transform: uppercase;
  color: rgb(255, 255, 255);
  font-weight: 800;
  letter-spacing: 0.05em;
  display: block;
  
  &::after {
    content: "";
    display: block;
    height: 4px;
    background: rgb(2, 77, 223);
    margin-top: 8px;
  }
`;

const WelcomeDescription = styled.span`
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.02em;
  font-weight: 600;
  color: white;
  padding-top: 32px;
`;

const LogoBottomImage = styled.div`
  color: white;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  
  span {
    font-weight: 400;
    font-size: 0.5em;
    vertical-align: super;
    margin-left: 2px;
  }
`;

const RightPanel = styled.div`
  background: #ffffff;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 0;
  overflow-y: auto;
  
  @media (max-width: 720px) {
    padding: 20px 0;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 0 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1f1f1f;
  margin-bottom: 24px;
`;

const EmailDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  font-size: 14px;
  color: #1f1f1f;
  font-weight: 500;

  svg {
    width: 20px;
    height: 20px;
    stroke: #1f1f1f;
  }
`;

const InputLabel = styled.label`
  display: block;
  font-size: 12px;
  color: #6b6b6b;
  margin-bottom: 6px;
  font-weight: 500;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #1f1f1f;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 65%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  
  svg {
    width: 20px;
    height: 20px;
    stroke: #6b6b6b;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  font-size: 16px;
  background: white;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b6b6b' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  
  &:focus {
    outline: none;
    border-color: #1f1f1f;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin: 24px 0;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  margin-top: 2px;
  cursor: pointer;
  flex-shrink: 0;
`;

const CheckboxLabel = styled.span`
  font-size: 13px;
  line-height: 1.5;
  color: #1f1f1f;
  
  a {
    color: #024ddf;
    text-decoration: underline;
  }
`;

const MarketingText = styled.p`
  font-size: 13px;
  line-height: 1.5;
  color: #6b6b6b;
  margin-bottom: 24px;
`;

const NextButton = styled.button<{ $disabled?: boolean }>`
  width: 100%;
  padding: 16px;
  background: ${props => props.$disabled ? '#e0e0e0' : '#024ddf'};
  color: ${props => props.$disabled ? '#9e9e9e' : 'white'};
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  transition: background 0.2s;
  
  &:hover:not(:disabled) {
    background: ${props => props.$disabled ? '#e0e0e0' : '#0241b8'};
  }
`;

const BackButton = styled.button`
  width: 100%;
  padding: 16px;
  background: transparent;
  color: #024ddf;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
`;

const ReferralInput = styled.input<{ $valid?: boolean }>`
  width: 100%;
  padding: 14px 40px 14px 16px;
  border: 1px solid ${props => props.$valid ? '#22c55e' : '#d0d0d0'};
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
  text-transform: uppercase;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${props => props.$valid ? '#22c55e' : '#1f1f1f'};
  }
`;

const ReferralInputWrapper = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

const ValidCheck = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #22c55e;
  font-size: 20px;
`;

// Wrapper with Suspense
export default function SignUpInfoPage() {
  return (
    <Suspense fallback={<PageWrapper><div>Loading...</div></PageWrapper>}>
      <SignUpInfoContent />
    </Suspense>
  );
}

function SignUpInfoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const refParam = searchParams.get('ref') || '';

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('US');
  const [zipCode, setZipCode] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [referralCode, setReferralCode] = useState(refParam);
  const [referralValid, setReferralValid] = useState(false);
  const [validatingReferral, setValidatingReferral] = useState(false);

  // Validate referral code on initial load if provided via URL
  useEffect(() => {
    if (refParam) {
      validateCode(refParam);
    }
  }, [refParam]);

  // Debounced referral validation
  useEffect(() => {
    if (!referralCode || referralCode.length < 5) {
      setReferralValid(false);
      return;
    }

    const timeout = setTimeout(() => {
      validateCode(referralCode);
    }, 500);

    return () => clearTimeout(timeout);
  }, [referralCode]);

  const validateCode = async (code: string) => {
    setValidatingReferral(true);
    const result = await validateReferralCode(code);
    setReferralValid(result.valid);
    setValidatingReferral(false);
  };

  const isFormValid = password.length >= 8 && firstName && lastName && zipCode && agreed;

  const handleNext = () => {
    if (!isFormValid) return;

    const params = new URLSearchParams({
      email,
      password,
      firstName,
      lastName,
      country,
      zipCode,
    });

    // Only pass valid referral code
    if (referralValid && referralCode) {
      params.set('referralCode', referralCode.toUpperCase());
    }

    router.push(`/auth/signup?${params.toString()}`);
  };

  const handleBack = () => {
    router.push('/auth/signin');
  };

  return (
    <PageWrapper>
      <AuthCard>
        <LeftPanel>
          <ContentInfo>
            <TextRow>
              <WelcomeLabel>Welcome</WelcomeLabel>
            </TextRow>
            <TextRow>
              <WelcomeDescription>
                This is it — millions of live events, up to the minute alerts for your favorite artists and teams and, of course, always safe, secure ticketing.
              </WelcomeDescription>
            </TextRow>
          </ContentInfo>
          <LogoBottomImage>
            ticketmaster<span>®</span>
          </LogoBottomImage>
        </LeftPanel>

        <RightPanel>
          <FormContainer>
            <Title>SIGN UP</Title>

            <EmailDisplay>
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {email}
            </EmailDisplay>

            <InputWrapper>
              <InputLabel>Password</InputLabel>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
              />
              <PasswordToggle onClick={() => setShowPassword(!showPassword)} type="button">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  {showPassword ? (
                    <>
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </>
                  ) : (
                    <>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </>
                  )}
                </svg>
              </PasswordToggle>
            </InputWrapper>

            <Row>
              <InputWrapper>
                <InputLabel>First Name</InputLabel>
                <Input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </InputWrapper>
              <InputWrapper>
                <InputLabel>Last Name</InputLabel>
                <Input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </InputWrapper>
            </Row>

            <Row>
              <InputWrapper>
                <InputLabel>Country of Residence</InputLabel>
                <Select value={country} onChange={(e) => setCountry(e.target.value)}>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                </Select>
              </InputWrapper>
              <InputWrapper>
                <InputLabel>Zip/Postal Code</InputLabel>
                <Input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </InputWrapper>
            </Row>

            <CheckboxWrapper>
              <Checkbox
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <CheckboxLabel>
                I acknowledge that I have read and agree to the current{' '}
                <a href="/terms" target="_blank">Terms of Use</a>, including the arbitration
                agreement and class action waiver, updated in August 2025, and understand
                that information will be used as described in our{' '}
                <a href="/privacy" target="_blank">Privacy Policy</a>.
              </CheckboxLabel>
            </CheckboxWrapper>

            <MarketingText>
              As set forth in our Privacy Policy, we may use your information for email
              marketing, including promotions and updates on our own or third-party
              products. You can opt out of our marketing emails anytime.
            </MarketingText>

            <ReferralInputWrapper>
              <InputLabel>Referral Code (Optional)</InputLabel>
              <ReferralInput
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                placeholder="Enter referral code"
                $valid={referralValid}
              />
              {referralValid && <ValidCheck>✓</ValidCheck>}
            </ReferralInputWrapper>

            <NextButton $disabled={!isFormValid} onClick={handleNext} disabled={!isFormValid}>
              Next
            </NextButton>

            <BackButton onClick={handleBack}>Back</BackButton>
          </FormContainer>
        </RightPanel>
      </AuthCard>
    </PageWrapper>
  );
}
