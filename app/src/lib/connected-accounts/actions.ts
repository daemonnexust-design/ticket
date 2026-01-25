'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getConnectedAccounts() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { accounts: [] };

    const { data: accounts } = await supabase
        .from('connected_accounts')
        .select('*')
        .eq('user_id', user.id);

    return { accounts: accounts || [] };
}

export async function toggleConnection(providerId: string, providerName: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { success: false, error: 'Unauthorized' };

    // Check current status
    const { data: existing } = await supabase
        .from('connected_accounts')
        .select('*')
        .eq('user_id', user.id)
        .eq('provider_id', providerId)
        .single();

    if (existing?.is_connected) {
        // Disconnect
        const { error } = await supabase
            .from('connected_accounts')
            .update({ is_connected: false })
            .eq('user_id', user.id)
            .eq('provider_id', providerId);

        if (error) return { success: false, error: 'Failed to disconnect' };
    } else {
        // Connect (Upsert)
        const { error } = await supabase
            .from('connected_accounts')
            .upsert({
                user_id: user.id,
                provider_id: providerId,
                provider_name: providerName,
                is_connected: true,
                connected_at: new Date().toISOString()
            }, {
                onConflict: 'user_id, provider_id'
            });

        if (error) return { success: false, error: 'Failed to connect' };
    }

    revalidatePath('/dashboard/connected-accounts');
    return { success: true };
}
