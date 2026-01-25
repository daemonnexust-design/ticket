'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getAlertPreferences() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { preferences: null };

    const { data: preferences } = await supabase
        .from('user_alert_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

    return { preferences };
}

export async function updateAlertPreferences(data: any) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { success: false, error: 'Unauthorized' };

    const { error } = await supabase
        .from('user_alert_preferences')
        .upsert({
            user_id: user.id,
            ...data,
            updated_at: new Date().toISOString()
        });

    if (error) {
        console.error(error);
        return { success: false, error: 'Failed to update preferences' };
    }

    revalidatePath('/dashboard/settings/alerts');
    revalidatePath('/dashboard/settings/preferences');
    return { success: true };
}
