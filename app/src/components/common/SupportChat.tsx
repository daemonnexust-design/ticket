'use client';

import styled from 'styled-components';
import { WhatsAppIcon } from '@/components/ui/icons';

const ChatButton = styled.a`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 60px;
  height: 60px;
  background-color: #25D366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  color: white;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  svg {
    width: 32px;
    height: 32px;
  }
`;

export function SupportChat() {
    // Replace with actual WhatsApp number
    const phoneNumber = '15551234567';
    const message = encodeURIComponent('Hi! I need help with my ticket order.');

    return (
        <ChatButton
            href={`https://wa.me/${phoneNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact Support on WhatsApp"
        >
            <WhatsAppIcon />
        </ChatButton>
    );
}
