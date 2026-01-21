'use client';

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Header, PageTitle, Button } from '../layout';
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
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: white;
  font-size: 13px;
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

interface Category {
    id: string;
    name: string;
    slug: string;
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState({ name: '', slug: '' });

    const fetchCategories = async () => {
        const supabase = createClient();
        const { data } = await supabase.from('categories').select('*').order('name');
        if (data) setCategories(data);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const generateSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const supabase = createClient();

        if (editingId) {
            await supabase.from('categories').update({
                name: form.name,
                slug: form.slug,
            }).eq('id', editingId);
        } else {
            await supabase.from('categories').insert({
                name: form.name,
                slug: form.slug || generateSlug(form.name),
            });
        }

        setForm({ name: '', slug: '' });
        setEditingId(null);
        fetchCategories();
    };

    const handleEdit = (cat: Category) => {
        setEditingId(cat.id);
        setForm({ name: cat.name, slug: cat.slug });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this category?')) return;
        const supabase = createClient();
        await supabase.from('categories').delete().eq('id', id);
        fetchCategories();
    };

    return (
        <>
            <Header>
                <PageTitle>Categories</PageTitle>
            </Header>

            <Grid>
                <Card>
                    <Table>
                        <thead>
                            <tr>
                                <Th>Category Name</Th>
                                <Th>Slug</Th>
                                <Th>Actions</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat) => (
                                <tr key={cat.id}>
                                    <Td style={{ fontWeight: 600 }}>{cat.name}</Td>
                                    <Td style={{ color: '#6b7280' }}>{cat.slug}</Td>
                                    <Td>
                                        <ActionButton onClick={() => handleEdit(cat)}>Edit</ActionButton>
                                        <DeleteButton onClick={() => handleDelete(cat.id)}>Delete</DeleteButton>
                                    </Td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>

                <Card>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: 700 }}>
                        {editingId ? 'Edit Category' : 'Add Category'}
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label>Category Name *</Label>
                            <Input
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value, slug: generateSlug(e.target.value) })}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>URL Slug</Label>
                            <Input
                                value={form.slug}
                                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                            />
                        </FormGroup>
                        <Button type="submit" style={{ width: '100%' }}>
                            {editingId ? 'Update Category' : 'Add Category'}
                        </Button>
                    </form>
                </Card>
            </Grid>
        </>
    );
}
