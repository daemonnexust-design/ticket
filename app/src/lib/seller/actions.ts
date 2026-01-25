'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function saveTaxInfo(data: {
    is_us_citizen: boolean;
    first_name: string;
    last_name: string;
    middle_initial?: string;
    suffix?: string;
    country_of_citizenship: string;
    tin_type: string;
    tin: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    postal_code: string;
    country: string;
    phone_number: string;
    paperless_1099: boolean;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, error: 'Unauthorized' };
    }

    const { error } = await supabase
        .from('seller_tax_infos')
        .upsert({
            user_id: user.id,
            ...data,
            updated_at: new Date().toISOString()
        }, {
            onConflict: 'user_id'
        });

    if (error) {
        console.error('Error saving tax info:', error);
        return { success: false, error: 'Failed to save tax information' };
    }

    revalidatePath('/dashboard/seller');
    return { success: true };
}

export async function getSellerInfo() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { taxInfo: null };

    const { data: taxInfo } = await supabase
        .from('seller_tax_infos')
        .select('*')
        .eq('user_id', user.id)
        .single();

    return { taxInfo };
}
