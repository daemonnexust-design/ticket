'use client';

import styled from 'styled-components';
import { useEffect, useState } from 'react';
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

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #6b7280;
  font-size: 12px;
`;

const PointsBadge = styled.span<{ $high?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  background: ${({ $high }) => $high ? '#dcfce7' : '#f3f4f6'};
  color: ${({ $high }) => $high ? '#15803d' : '#4b5563'};
  border: 1px solid ${({ $high }) => $high ? '#86efac' : '#e5e7eb'};
`;

interface Profile {
    id: string;
    email: string;
    full_name?: string;
    created_at: string;
    referral_code?: string;
    referral_points?: number;
    total_earnings?: number;
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);

    const supabase = createClient();

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            // Fetch profiles - this might fail if 'profiles' doesn't have the new columns yet
            // We'll handle gracefully
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (data) {
                    setUsers(data);
                }
            } catch (err) {
                console.error('Error fetching users:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [supabase]);

    return (
        <>
            <Header>
                <PageTitle>Users Management</PageTitle>
                <HeaderActions>
                    {/* Add user button if needed */}
                </HeaderActions>
            </Header>

            {loading ? (
                <div>Loading users...</div>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <Table>
                        <thead>
                            <tr>
                                <Th>User</Th>
                                <Th>Joined</Th>
                                <Th>Referral Code</Th>
                                <Th>Ref Points</Th>
                                <Th>Total Earned</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <Td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <Avatar>
                                                {user.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                                            </Avatar>
                                            <div>
                                                <div style={{ fontWeight: 600 }}>{user.full_name || 'Unknown User'}</div>
                                                <div style={{ fontSize: '12px', color: '#6b7280' }}>{user.email}</div>
                                            </div>
                                        </div>
                                    </Td>
                                    <Td>{new Date(user.created_at).toLocaleDateString()}</Td>
                                    <Td>
                                        <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>
                                            {user.referral_code || '-'}
                                        </code>
                                    </Td>
                                    <Td>
                                        <PointsBadge $high={(user.referral_points || 0) > 10}>
                                            {user.referral_points || 0} pts
                                        </PointsBadge>
                                    </Td>
                                    <Td style={{ fontWeight: 600, color: '#059669' }}>
                                        ${user.total_earnings || '0.00'}
                                    </Td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <Td colSpan={5} style={{ textAlign: 'center', color: '#6b7280' }}>
                                        No users found.
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
