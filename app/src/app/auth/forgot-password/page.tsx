'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { resetPassword } from '@/lib/auth/actions';

// Styles reused from signin page for consistency
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
  padding: 0px 32px;
  
  @media (max-width: 900px) {
    display: none;
  }
`;

const LogoBottomImage = styled.div`
  color: white;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  margin-top: auto; 
  padding-bottom: 32px;
  
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
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  overflow-y: auto;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1f1f1f;
  margin-bottom: 16px;
  text-transform: uppercase;
`;

const Description = styled.p`
  font-size: 14px;
  color: #6b6b6b;
  margin-bottom: 24px;
  line-height: 1.5;
`;

const InputGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 400;
  color: rgb(18, 18, 18);
  margin-bottom: 8px;
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

const Button = styled.button`
  width: 100%;
  padding: 16px;
  background: #024ddf;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #0241b8;
  }
  
  &:disabled {
    background: #e0e0e0;
    cursor: not-allowed;
  }
`;

const BackLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 16px;
  color: #024ddf;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SuccessMessage = styled.div`
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #166534;
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 24px;
  font-size: 14px;
`;

const ErrorMessage = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 24px;
  font-size: 14px;
`;

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await resetPassword(email);
        setLoading(false);

        if (result.success) {
            setSuccess(true);
        } else {
            setError(result.error || 'Failed to send reset link.');
        }
    };

    return (
        <PageWrapper>
            <AuthCard>
                <LeftPanel>
                    <div style={{ paddingTop: '32px' }}>
                        <Title style={{ color: 'white' }}>Welcome</Title>
                        <div style={{ height: '4px', background: '#024ddf', width: '60px', borderRadius: '2px', marginTop: '8px' }}></div>
                    </div>
                    <LogoBottomImage>
                        ticketmaster<span>®</span>
                    </LogoBottomImage>
                </LeftPanel>

                <RightPanel>
                    <FormContainer>
                        <Title>Forgot Password</Title>

                        {success ? (
                            <>
                                <SuccessMessage>
                                    If an account exists for <strong>{email}</strong>, we have sent a password reset link to it. Please check your inbox.
                                </SuccessMessage>
                                <Button as={Link} href="/auth/signin" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                                    Return to Sign In
                                </Button>
                            </>
                        ) : (
                            <>
                                <Description>
                                    Enter the email address associated with your account and we'll send you a link to reset your password.
                                </Description>

                                {error && <ErrorMessage>{error}</ErrorMessage>}

                                <form onSubmit={handleSubmit}>
                                    <InputGroup>
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </InputGroup>

                                    <Button type="submit" disabled={loading}>
                                        {loading ? 'Sending...' : 'Send Reset Link'}
                                    </Button>
                                </form>

                                <BackLink href="/auth/signin">Back to Sign In</BackLink>
                            </>
                        )}
                    </FormContainer>
                </RightPanel>
            </AuthCard>
        </PageWrapper>
    );
}
