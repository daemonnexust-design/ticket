'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Header, PageTitle, HeaderActions, Button } from './layout';
import { createClient } from '@/lib/supabase/client';

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 32px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
  margin-bottom: 8px;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #1f262d;
`;

const StatChange = styled.span<{ $positive?: boolean }>`
  font-size: 14px;
  color: ${({ $positive }) => ($positive ? '#10b981' : '#ef4444')};
  font-weight: 500;
  margin-left: 8px;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #1f262d;
  margin: 0 0 20px 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  border-bottom: 1px solid #e5e7eb;
`;

const Td = styled.td`
  padding: 16px;
  font-size: 14px;
  color: #1f262d;
  border-bottom: 1px solid #f3f4f6;
`;

const Badge = styled.span<{ $variant?: 'success' | 'warning' | 'error' }>`
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
            default: return '#e5e7eb';
        }
    }};
  color: ${({ $variant }) => {
        switch ($variant) {
            case 'success': return '#059669';
            case 'warning': return '#d97706';
            case 'error': return '#dc2626';
            default: return '#6b7280';
        }
    }};
`;

interface Event {
    id: string;
    title: string;
    event_date: string;
    status: string;
    min_price: number;
    venues?: { name: string };
}

export default function AdminDashboard() {
    const [events, setEvents] = useState<Event[]>([]);
    const [stats, setStats] = useState({
        totalEvents: 0,
        activeEvents: 0,
        totalVenues: 0,
        totalOrders: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            const supabase = createClient();

            // Fetch recent events
            const { data: eventsData } = await supabase
                .from('events')
                .select('*, venues(name)')
                .order('created_at', { ascending: false })
                .limit(5);

            if (eventsData) setEvents(eventsData);

            // Fetch stats
            const { count: eventsCount } = await supabase.from('events').select('*', { count: 'exact', head: true });
            const { count: activeCount } = await supabase.from('events').select('*', { count: 'exact', head: true }).eq('status', 'on_sale');
            const { count: venuesCount } = await supabase.from('venues').select('*', { count: 'exact', head: true });
            const { count: ordersCount } = await supabase.from('orders').select('*', { count: 'exact', head: true });

            setStats({
                totalEvents: eventsCount || 0,
                activeEvents: activeCount || 0,
                totalVenues: venuesCount || 0,
                totalOrders: ordersCount || 0,
            });
        };

        fetchData();
    }, []);

    return (
        <>
            <Header>
                <PageTitle>Dashboard</PageTitle>
                <HeaderActions>
                    <Button as={Link} href="/admin/events/new">+ Add Event</Button>
                </HeaderActions>
            </Header>

            <StatsGrid>
                <StatCard>
                    <StatLabel>Total Events</StatLabel>
                    <StatValue>{stats.totalEvents}</StatValue>
                </StatCard>
                <StatCard>
                    <StatLabel>Active Events</StatLabel>
                    <StatValue>{stats.activeEvents}</StatValue>
                </StatCard>
                <StatCard>
                    <StatLabel>Venues</StatLabel>
                    <StatValue>{stats.totalVenues}</StatValue>
                </StatCard>
                <StatCard>
                    <StatLabel>Total Orders</StatLabel>
                    <StatValue>{stats.totalOrders}</StatValue>
                </StatCard>
            </StatsGrid>

            <Card>
                <CardTitle>Recent Events</CardTitle>
                <Table>
                    <thead>
                        <tr>
                            <Th>Event</Th>
                            <Th>Date</Th>
                            <Th>Venue</Th>
                            <Th>Status</Th>
                            <Th>Price</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event.id}>
                                <Td>
                                    <Link href={`/admin/events/${event.id}`} style={{ color: '#026cdf', textDecoration: 'none', fontWeight: 500 }}>
                                        {event.title}
                                    </Link>
                                </Td>
                                <Td>{new Date(event.event_date).toLocaleDateString()}</Td>
                                <Td>{event.venues?.name || '-'}</Td>
                                <Td>
                                    <Badge $variant={event.status === 'on_sale' ? 'success' : event.status === 'sold_out' ? 'error' : 'warning'}>
                                        {event.status?.replace('_', ' ').toUpperCase()}
                                    </Badge>
                                </Td>
                                <Td>${event.min_price?.toFixed(2) || '0.00'}</Td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        </>
    );
}
