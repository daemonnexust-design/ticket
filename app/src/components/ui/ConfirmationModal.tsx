'use client';

import styled from 'styled-components';
import { useEffect, useState } from 'react';

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20000;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: all 0.2s ease-in-out;
`;

const ModalCard = styled.div`
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  padding: 24px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  transform: scale(0.95);
  transition: transform 0.2s;
  
  ${Overlay}[data-visible="true"] & {
    transform: scale(1);
  }
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1f262d;
  margin-bottom: 8px;
`;

const Message = styled.p`
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 24px;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Button = styled.button`
  padding: 10px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  border: none;
`;

const CancelButton = styled(Button)`
  background: #f3f4f6;
  color: #374151;
  
  &:hover {
    background: #e5e7eb;
  }
`;

const ConfirmButton = styled(Button)`
  background: #dc2626; // Red for destructive action like sign out
  color: white;
  
  &:hover {
    background: #b91c1c;
  }
`;

interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmJson?: string; // Label
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmationModal({
    isOpen,
    title,
    message,
    confirmJson = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm,
    onCancel
}: ConfirmationModalProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
        } else {
            setTimeout(() => setVisible(false), 200);
        }
    }, [isOpen]);

    if (!visible && !isOpen) return null;

    return (
        <Overlay $isOpen={isOpen} data-visible={isOpen} onClick={(e) => {
            if (e.target === e.currentTarget) onCancel();
        }}>
            <ModalCard>
                <Title>{title}</Title>
                <Message>{message}</Message>
                <ButtonGroup>
                    <CancelButton onClick={onCancel}>{cancelLabel}</CancelButton>
                    <ConfirmButton onClick={onConfirm}>{confirmJson}</ConfirmButton>
                </ButtonGroup>
            </ModalCard>
        </Overlay>
    );
}
