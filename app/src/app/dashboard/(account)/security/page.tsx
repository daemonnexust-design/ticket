'use client';

import styled from 'styled-components';
import { Button } from '@/components/ui/primitives';
import { Title } from '@/app/dashboard/(account)/layout';
import { getPasskeys, addPasskey, deletePasskey } from '@/lib/security/actions';
import { useState, useEffect } from 'react';

const Container = styled.div`
    background: white;
    border-radius: 8px;
    padding: 32px;
`;

const HeaderGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
    
    svg {
        width: 24px;
        height: 24px;
        color: #1f262d;
    }
`;

const SectionTitle = styled.h2`
    font-size: 18px;
    font-weight: 700;
    color: #1f262d;
    margin: 0;
`;

const PasskeyStatus = styled.div`
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 24px;
    margin-left: 36px; // Align with title text
`;

const BenefitsList = styled.div`
    margin-bottom: 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const BenefitItem = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    
    svg {
        width: 24px;
        height: 24px;
        color: #1f262d;
        flex-shrink: 0;
    }
    
    span {
        font-size: 16px;
        color: #1f262d;
    }
`;

const AddButton = styled.button`
    width: 100%;
    padding: 12px;
    background-color: #026cdf;
    color: white;
    font-weight: 700;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 16px;
    
    &:hover {
        background-color: #0241b8;
    }
    
    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

const LearnMore = styled.a`
    display: block;
    text-align: center;
    color: #026cdf;
    font-weight: 600;
    text-decoration: none;
    font-size: 16px;
    
    &:hover {
        text-decoration: underline;
    }
`;

const PasskeyList = styled.div`
    margin-bottom: 24px;
    border-top: 1px solid #e5e7eb;
    padding-top: 16px;
`;

const PasskeyItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #f3f4f6;
    
    .info {
        display: flex;
        flex-direction: column;
    }
    
    .name {
        font-weight: 500;
        color: #1f262d;
    }
    
    .date {
        font-size: 12px;
        color: #6b7280;
    }
    
    button {
        color: #dc2626;
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        font-size: 14px;
        
        &:hover { text-decoration: underline; }
    }
`;

export default function SecurityPage() {
    const [passkeys, setPasskeys] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        loadPasskeys();
    }, []);

    const loadPasskeys = async () => {
        const { passkeys } = await getPasskeys();
        setPasskeys(passkeys);
        setLoading(false);
    };

    const handleAddPasskey = async () => {
        setAdding(true);
        // Simulate passkey creation delay
        await new Promise(r => setTimeout(r, 1000));

        // Random fake credential ID
        const fakeCredId = Math.random().toString(36).substring(7);

        await addPasskey({ credential_id: fakeCredId });
        await loadPasskeys();
        setAdding(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Remove this passkey?')) return;
        await deletePasskey(id);
        await loadPasskeys();
    };

    return (
        <div style={{ maxWidth: '600px' }}>
            <Container>
                <HeaderGroup>
                    {/* Person Key Icon */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                        <path d="M16 11l2 2 4-4"></path> {/* Stylized key hint */}
                    </svg>
                    <SectionTitle>Add A Passkey</SectionTitle>
                </HeaderGroup>

                <PasskeyStatus>
                    {loading ? 'Loading...' : passkeys.length === 0 ? 'No Passkeys' : `${passkeys.length} Passkeys Active`}
                </PasskeyStatus>

                <p style={{ marginBottom: '32px', color: '#1f262d' }}>
                    Sign in quickly and securely with passkeys.
                </p>

                {passkeys.length > 0 && (
                    <PasskeyList>
                        {passkeys.map(pk => (
                            <PasskeyItem key={pk.id}>
                                <div className="info">
                                    <span className="name">{pk.name}</span>
                                    <span className="date">Added on {new Date(pk.created_at).toLocaleDateString()}</span>
                                </div>
                                <button onClick={() => handleDelete(pk.id)}>Remove</button>
                            </PasskeyItem>
                        ))}
                    </PasskeyList>
                )}

                <BenefitsList>
                    <BenefitItem>
                        {/* Smile Face Icon */}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>
                        <span>Use your face, fingerprint, or device lock</span>
                    </BenefitItem>

                    <BenefitItem>
                        {/* Skip Password Icon */}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /><line x1="3" y1="11" x2="21" y2="11" /></svg>
                        <span>Skip entering your password</span>
                    </BenefitItem>

                    <BenefitItem>
                        {/* Lock Icon */}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                        <span>Protection from password phishing</span>
                    </BenefitItem>
                </BenefitsList>

                <AddButton onClick={handleAddPasskey} disabled={adding}>
                    {adding ? 'Adding...' : 'Add Passkey'}
                </AddButton>

                <LearnMore href="#">Learn More</LearnMore>
            </Container>
        </div>
    );
}
