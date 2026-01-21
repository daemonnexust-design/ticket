'use client';

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header, PageTitle, HeaderActions } from '../layout';
import { createClient } from '@/lib/supabase/client';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
`;

const Th = styled.th`
  text-align: left;
  padding: 16px;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`;

const Td = styled.td`
  padding: 16px;
  font-size: 14px;
  color: #1f262d;
  border-bottom: 1px solid #f3f4f6;
  vertical-align: middle;
`;

const Badge = styled.span<{ $variant?: 'success' | 'warning' | 'error' | 'info' }>`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${({ $variant }) => {
        switch ($variant) {
            case 'success': return '#d1fae5';
            case 'warning': return '#fef3c7';
            case 'error': return '#fee2e2';
            case 'info': return '#dbeafe';
            default: return '#e5e7eb';
        }
    }};
  color: ${({ $variant }) => {
        switch ($variant) {
            case 'success': return '#059669';
            case 'warning': return '#d97706';
            case 'error': return '#dc2626';
            case 'info': return '#1e40af';
            default: return '#6b7280';
        }
    }};
`;

const ActionButton = styled.button<{ $variant?: 'primary' | 'danger' }>`
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  margin-right: 8px;
  color: white;
  background: ${({ $variant }) => $variant === 'danger' ? '#ef4444' : '#10b981'};
  opacity: 0.9;
  
  &:hover {
    opacity: 1;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DetailText = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface Order {
    id: string;
    created_at: string;
    total_amount: number;
    status: string;
    payment_method: string;
    payment_status: string;
    payment_details: any;
    user_id: string;
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    const supabase = createClient();

    const fetchOrders = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) {
            setOrders(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, [supabase]);

    const handleVerifyPayment = async (orderId: string, approved: boolean) => {
        const status = approved ? 'paid' : 'failed';
        const orderStatus = approved ? 'completed' : 'cancelled';

        const { error } = await supabase
            .from('orders')
            .update({
                payment_status: status,
                status: orderStatus
            })
            .eq('id', orderId);

        if (!error) {
            // Refresh local state
            setOrders(prev => prev.map(o =>
                o.id === orderId
                    ? { ...o, payment_status: status, status: orderStatus }
                    : o
            ));
        } else {
            alert('Error updating order');
        }
    };

    return (
        <>
            <Header>
                <PageTitle>Orders Management</PageTitle>
                <HeaderActions>
                    {/* Filter buttons could go here */}
                </HeaderActions>
            </Header>

            {loading ? (
                <div>Loading orders...</div>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <Table>
                        <thead>
                            <tr>
                                <Th>Order ID</Th>
                                <Th>Date</Th>
                                <Th>Amount</Th>
                                <Th>Payment Method</Th>
                                <Th>Payment Status</Th>
                                <Th>Actions</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <Td>
                                        <span style={{ fontFamily: 'monospace' }}>{order.id.slice(0, 8)}...</span>
                                    </Td>
                                    <Td>{new Date(order.created_at).toLocaleDateString()}</Td>
                                    <Td>${order.total_amount?.toFixed(2)}</Td>
                                    <Td>
                                        <div style={{ textTransform: 'capitalize', fontWeight: 500 }}>
                                            {order.payment_method || 'Card'}
                                        </div>
                                        {order.payment_details?.currency && (
                                            <DetailText>
                                                {order.payment_details.currency.toUpperCase()}
                                            </DetailText>
                                        )}
                                        {order.payment_details?.value && ( // Gift card code or similar
                                            <DetailText>
                                                Code: {order.payment_details.value}
                                            </DetailText>
                                        )}
                                    </Td>
                                    <Td>
                                        <Badge $variant={
                                            order.payment_status === 'paid' ? 'success' :
                                                order.payment_status === 'failed' ? 'error' : 'warning'
                                        }>
                                            {order.payment_status?.toUpperCase() || 'PENDING'}
                                        </Badge>
                                    </Td>
                                    <Td>
                                        {order.payment_status === 'pending' && (order.payment_method === 'crypto' || order.payment_method === 'gift') && (
                                            <div style={{ display: 'flex' }}>
                                                <ActionButton
                                                    onClick={() => handleVerifyPayment(order.id, true)}
                                                    title="Confirm Payment Received"
                                                >
                                                    Verify
                                                </ActionButton>
                                                <ActionButton
                                                    $variant="danger"
                                                    onClick={() => handleVerifyPayment(order.id, false)}
                                                    title="Reject Payment"
                                                >
                                                    Reject
                                                </ActionButton>
                                            </div>
                                        )}
                                    </Td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <Td colSpan={6} style={{ textAlign: 'center', color: '#6b7280' }}>
                                        No orders found.
                                    </Td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            )}
        </>
    );
}
