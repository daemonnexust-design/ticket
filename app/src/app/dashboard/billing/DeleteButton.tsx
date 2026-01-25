'use client';

import { deletePaymentMethod, deletePayoutAccount } from '@/lib/billing/actions';
import styled from 'styled-components';
import { useTransition } from 'react';

const Button = styled.button`
  background: none;
  border: none;
  color: #dc2626;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 8px;
  
  &:hover {
    text-decoration: underline;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export function DeleteButton({ id, type }: { id: string, type: 'payment' | 'payout' }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (!confirm('Are you sure you want to remove this method?')) return;

        startTransition(async () => {
            if (type === 'payment') {
                await deletePaymentMethod(id);
            } else {
                await deletePayoutAccount(id);
            }
        });
    };

    return (
        <Button onClick={handleDelete} disabled={isPending}>
            {isPending ? 'Removing...' : 'Remove'}
        </Button>
    );
}
