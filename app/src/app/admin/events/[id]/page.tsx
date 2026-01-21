'use client';

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Header, PageTitle, HeaderActions, Button } from '../../layout';
import { createClient } from '@/lib/supabase/client';

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  max-width: 800px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;

const FormGroup = styled.div<{ $fullWidth?: boolean }>`
  grid-column: ${({ $fullWidth }) => ($fullWidth ? '1 / -1' : 'auto')};
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

const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px 14px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  font-size: 15px;
  font-family: inherit;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #026cdf;
  }
`;

const Select = styled.select`
  width: 100%;
  height: 44px;
  padding: 0 14px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  font-size: 15px;
  background: white;
`;

const Checkbox = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  cursor: pointer;
  
  input {
    width: 18px;
    height: 18px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
`;

const SecondaryButton = styled.button`
  height: 44px;
  padding: 0 20px;
  background: white;
  color: #1f262d;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

interface Venue { id: string; name: string; }
interface Category { id: string; name: string; }

export default function EditEventPage() {
    const router = useRouter();
    const params = useParams();
    const [venues, setVenues] = useState<Venue[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        title: '',
        slug: '',
        description: '',
        event_date: '',
        event_time: '',
        venue_id: '',
        category_id: '',
        status: 'upcoming',
        min_price: '',
        max_price: '',
        image_url: '',
        featured: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            const supabase = createClient();

            // Fetch event
            const { data: event } = await supabase
                .from('events')
                .select('*')
                .eq('id', params.id)
                .single();

            if (event) {
                setForm({
                    title: event.title || '',
                    slug: event.slug || '',
                    description: event.description || '',
                    event_date: event.event_date || '',
                    event_time: event.event_time || '',
                    venue_id: event.venue_id || '',
                    category_id: event.category_id || '',
                    status: event.status || 'upcoming',
                    min_price: event.min_price?.toString() || '',
                    max_price: event.max_price?.toString() || '',
                    image_url: event.image_url || '',
                    featured: event.featured || false,
                });
            }

            // Fetch venues and categories
            const { data: venuesData } = await supabase.from('venues').select('id, name').order('name');
            const { data: categoriesData } = await supabase.from('categories').select('id, name').order('name');

            if (venuesData) setVenues(venuesData);
            if (categoriesData) setCategories(categoriesData);
            setLoading(false);
        };

        fetchData();
    }, [params.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const supabase = createClient();
            const { error } = await supabase
                .from('events')
                .update({
                    title: form.title,
                    slug: form.slug,
                    description: form.description,
                    event_date: form.event_date,
                    event_time: form.event_time,
                    venue_id: form.venue_id || null,
                    category_id: form.category_id || null,
                    status: form.status,
                    min_price: parseFloat(form.min_price) || 0,
                    max_price: parseFloat(form.max_price) || 0,
                    image_url: form.image_url,
                    featured: form.featured,
                })
                .eq('id', params.id);

            if (error) throw error;
            router.push('/admin/events');
        } catch (error) {
            console.error('Error updating event:', error);
            alert('Failed to update event');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <Header>
                <PageTitle>Edit Event</PageTitle>
            </Header>

            <Card>
                <form onSubmit={handleSubmit}>
                    <FormGrid>
                        <FormGroup $fullWidth>
                            <Label>Event Title *</Label>
                            <Input
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                required
                            />
                        </FormGroup>

                        <FormGroup $fullWidth>
                            <Label>URL Slug</Label>
                            <Input
                                value={form.slug}
                                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Event Date *</Label>
                            <Input
                                type="date"
                                value={form.event_date}
                                onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Event Time *</Label>
                            <Input
                                type="time"
                                value={form.event_time}
                                onChange={(e) => setForm({ ...form, event_time: e.target.value })}
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Venue</Label>
                            <Select
                                value={form.venue_id}
                                onChange={(e) => setForm({ ...form, venue_id: e.target.value })}
                            >
                                <option value="">Select venue</option>
                                {venues.map((venue) => (
                                    <option key={venue.id} value={venue.id}>{venue.name}</option>
                                ))}
                            </Select>
                        </FormGroup>

                        <FormGroup>
                            <Label>Category</Label>
                            <Select
                                value={form.category_id}
                                onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                            >
                                <option value="">Select category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </Select>
                        </FormGroup>

                        <FormGroup>
                            <Label>Min Price ($)</Label>
                            <Input
                                type="number"
                                step="0.01"
                                value={form.min_price}
                                onChange={(e) => setForm({ ...form, min_price: e.target.value })}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Max Price ($)</Label>
                            <Input
                                type="number"
                                step="0.01"
                                value={form.max_price}
                                onChange={(e) => setForm({ ...form, max_price: e.target.value })}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Status</Label>
                            <Select
                                value={form.status}
                                onChange={(e) => setForm({ ...form, status: e.target.value })}
                            >
                                <option value="upcoming">Upcoming</option>
                                <option value="on_sale">On Sale</option>
                                <option value="sold_out">Sold Out</option>
                                <option value="cancelled">Cancelled</option>
                            </Select>
                        </FormGroup>

                        <FormGroup>
                            <Label>&nbsp;</Label>
                            <Checkbox>
                                <input
                                    type="checkbox"
                                    checked={form.featured}
                                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                                />
                                Featured Event
                            </Checkbox>
                        </FormGroup>

                        <FormGroup $fullWidth>
                            <Label>Image URL</Label>
                            <Input
                                value={form.image_url}
                                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                            />
                        </FormGroup>

                        <FormGroup $fullWidth>
                            <Label>Description</Label>
                            <Textarea
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                            />
                        </FormGroup>
                    </FormGrid>

                    <ButtonGroup>
                        <SecondaryButton type="button" onClick={() => router.back()}>
                            Cancel
                        </SecondaryButton>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </ButtonGroup>
                </form>
            </Card>
        </>
    );
}
