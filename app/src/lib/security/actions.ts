'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addPasskey(data: {
    credential_id: string;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, error: 'Unauthorized' };
    }

    // In a real implementation with WebAuthn, we would verify the registration response here.
    // For this prototype, we simulate storing the credential ID.

    const { error } = await supabase
        .from('user_passkeys')
        .insert({
            user_id: user.id,
            credential_id: data.credential_id,
            name: `Passkey (Simulated) - ${new Date().toLocaleDateString()}`
        });

    if (error) {
        console.error('Error adding passkey:', error);
        return { success: false, error: 'Failed to add passkey' };
    }

    revalidatePath('/dashboard/security');
    return { success: true };
}

export async function getPasskeys() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { passkeys: [] };

    const { data: passkeys } = await supabase
        .from('user_passkeys')
        .select('*')
        .order('created_at', { ascending: false });

    return { passkeys: passkeys || [] };
}

export async function deletePasskey(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from('user_passkeys').delete().eq('id', id);

    if (error) {
        return { success: false, error: 'Failed to delete passkey' };
    }

    revalidatePath('/dashboard/security');
    return { success: true };
}
