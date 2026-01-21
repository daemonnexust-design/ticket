'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header, PageTitle, HeaderActions, Button } from '../layout';
import { createClient } from '@/lib/supabase/client';

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
`;

const SearchBar = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;

const SearchInput = styled.input`
  flex: 1;
  height: 44px;
  padding: 0 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #026cdf;
  }
`;

const FilterSelect = styled.select`
  height: 44px;
  padding: 0 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  min-width: 150px;
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
            case 'info': return '#2563eb';
            default: return '#6b7280';
        }
    }};
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: white;
  font-size: 13px;
  color: #6b7280;
  cursor: pointer;
  margin-right: 8px;
  
  &:hover {
    border-color: #026cdf;
    color: #026cdf;
  }
`;

const DeleteButton = styled(ActionButton)`
  &:hover {
    border-color: #dc2626;
    color: #dc2626;
  }
`;

const Thumbnail = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 6px;
  object-fit: cover;
`;

interface Event {
    id: string;
    title: string;
    event_date: string;
    event_time: string;
    status: string;
    min_price: number;
    max_price: number;
    featured: boolean;
    image_url: string;
    venues?: { name: string };
    categories?: { name: string };
}

export default function EventsListPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const router = useRouter();

    const fetchEvents = async () => {
        const supabase = createClient();
        let query = supabase
            .from('events')
            .select('*, venues(name), categories(name)')
            .order('event_date', { ascending: true });

        if (search) {
            query = query.ilike('title', `%${search}%`);
        }
        if (statusFilter) {
            query = query.eq('status', statusFilter);
        }

        const { data } = await query;
        if (data) setEvents(data);
    };

    useEffect(() => {
        fetchEvents();
    }, [search, statusFilter]);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this event?')) return;

        const supabase = createClient();
        await supabase.from('events').delete().eq('id', id);
        fetchEvents();
    };

    return (
        <>
            <Header>
                <PageTitle>Events</PageTitle>
                <HeaderActions>
                    <Button as={Link} href="/admin/events/new">+ Add Event</Button>
                </HeaderActions>
            </Header>

            <Card>
                <SearchBar>
                    <SearchInput
                        placeholder="Search events..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="">All Status</option>
                        <option value="on_sale">On Sale</option>
                        <option value="sold_out">Sold Out</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="upcoming">Upcoming</option>
                    </FilterSelect>
                </SearchBar>

                <Table>
                    <thead>
                        <tr>
                            <Th></Th>
                            <Th>Event</Th>
                            <Th>Date</Th>
                            <Th>Venue</Th>
                            <Th>Category</Th>
                            <Th>Status</Th>
                            <Th>Price</Th>
                            <Th>Actions</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event.id}>
                                <Td>
                                    {event.image_url && (
                                        <Thumbnail src={event.image_url} alt={event.title} />
                                    )}
                                </Td>
                                <Td>
                                    <div style={{ fontWeight: 600 }}>{event.title}</div>
                                    {event.featured && <Badge $variant="info" style={{ marginTop: 4 }}>Featured</Badge>}
                                </Td>
                                <Td>
                                    <div>{new Date(event.event_date).toLocaleDateString()}</div>
                                    <div style={{ color: '#6b7280', fontSize: 12 }}>{event.event_time}</div>
                                </Td>
                                <Td>{event.venues?.name || '-'}</Td>
                                <Td>{event.categories?.name || '-'}</Td>
                                <Td>
                                    <Badge $variant={
                                        event.status === 'on_sale' ? 'success' :
                                            event.status === 'sold_out' ? 'error' :
                                                event.status === 'cancelled' ? 'error' : 'warning'
                                    }>
                                        {event.status?.replace('_', ' ').toUpperCase()}
                                    </Badge>
                                </Td>
                                <Td>
                                    ${event.min_price?.toFixed(2)} - ${event.max_price?.toFixed(2)}
                                </Td>
                                <Td>
                                    <ActionButton onClick={() => router.push(`/admin/events/${event.id}`)}>
                                        Edit
                                    </ActionButton>
                                    <DeleteButton onClick={() => handleDelete(event.id)}>
                                        Delete
                                    </DeleteButton>
                                </Td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        </>
    );
}
