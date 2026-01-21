'use client';

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Header, PageTitle, HeaderActions, Button } from '../layout';
import { createClient } from '@/lib/supabase/client';

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 24px;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
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

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #1f262d;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 14px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  font-size: 15px;
  
  &:focus {
    outline: none;
    border-color: #026cdf;
  }
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

interface Venue {
    id: string;
    name: string;
    city: string;
    state: string;
    capacity: number;
}

export default function VenuesPage() {
    const [venues, setVenues] = useState<Venue[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState({
        name: '',
        city: '',
        state: '',
        address: '',
        capacity: '',
    });

    const fetchVenues = async () => {
        const supabase = createClient();
        const { data } = await supabase.from('venues').select('*').order('name');
        if (data) setVenues(data);
    };

    useEffect(() => {
        fetchVenues();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const supabase = createClient();

        if (editingId) {
            await supabase.from('venues').update({
                name: form.name,
                city: form.city,
                state: form.state,
                address: form.address,
                capacity: parseInt(form.capacity) || null,
            }).eq('id', editingId);
        } else {
            await supabase.from('venues').insert({
                name: form.name,
                city: form.city,
                state: form.state,
                address: form.address,
                capacity: parseInt(form.capacity) || null,
            });
        }

        setForm({ name: '', city: '', state: '', address: '', capacity: '' });
        setEditingId(null);
        fetchVenues();
    };

    const handleEdit = (venue: Venue) => {
        setEditingId(venue.id);
        setForm({
            name: venue.name,
            city: venue.city,
            state: venue.state || '',
            address: '',
            capacity: venue.capacity?.toString() || '',
        });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this venue?')) return;
        const supabase = createClient();
        await supabase.from('venues').delete().eq('id', id);
        fetchVenues();
    };

    return (
        <>
            <Header>
                <PageTitle>Venues</PageTitle>
            </Header>

            <Grid>
                <Card>
                    <Table>
                        <thead>
                            <tr>
                                <Th>Venue Name</Th>
                                <Th>Location</Th>
                                <Th>Capacity</Th>
                                <Th>Actions</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {venues.map((venue) => (
                                <tr key={venue.id}>
                                    <Td style={{ fontWeight: 600 }}>{venue.name}</Td>
                                    <Td>{venue.city}, {venue.state}</Td>
                                    <Td>{venue.capacity?.toLocaleString() || '-'}</Td>
                                    <Td>
                                        <ActionButton onClick={() => handleEdit(venue)}>Edit</ActionButton>
                                        <DeleteButton onClick={() => handleDelete(venue.id)}>Delete</DeleteButton>
                                    </Td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>

                <Card>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: 700 }}>
                        {editingId ? 'Edit Venue' : 'Add Venue'}
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label>Venue Name *</Label>
                            <Input
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>City *</Label>
                            <Input
                                value={form.city}
                                onChange={(e) => setForm({ ...form, city: e.target.value })}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>State</Label>
                            <Input
                                value={form.state}
                                onChange={(e) => setForm({ ...form, state: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Address</Label>
                            <Input
                                value={form.address}
                                onChange={(e) => setForm({ ...form, address: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Capacity</Label>
                            <Input
                                type="number"
                                value={form.capacity}
                                onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                            />
                        </FormGroup>
                        <Button type="submit" style={{ width: '100%' }}>
                            {editingId ? 'Update Venue' : 'Add Venue'}
                        </Button>
                    </form>
                </Card>
            </Grid>
        </>
    );
}
