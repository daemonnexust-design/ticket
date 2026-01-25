'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addPaymentMethod(data: {
    type: 'card' | 'paypal';
    brand?: string;
    last4?: string;
    expiry?: string;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, error: 'Unauthorized' };
    }

    const { error } = await supabase
        .from('payment_methods')
        .insert({
            user_id: user.id,
            type: data.type,
            brand: data.brand || null,
            last4: data.last4 || null,
            expiry: data.expiry || null,
            is_default: false
        });

    if (error) {
        console.error('Error adding payment method:', error);
        return { success: false, error: 'Failed to add payment method' };
    }

    revalidatePath('/dashboard/billing');
    return { success: true };
}

export async function addPayoutAccount(data: {
    country: string;
    type: string;
    first_name: string;
    last_name: string;
    routing_number: string;
    account_number: string;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, error: 'Unauthorized' };
    }

    const { error } = await supabase
        .from('payout_accounts')
        .insert({
            user_id: user.id,
            country: data.country,
            type: data.type,
            first_name: data.first_name,
            last_name: data.last_name,
            // In a real app, storing raw routing/account numbers is sensitive.
            // We'll simulate by storing masked versions or just last 4 for the demo.
            routing_number: `*****${data.routing_number.slice(-4)}`,
            account_number_last4: data.account_number.slice(-4),
        });

    if (error) {
        console.error('Error adding payout account:', error);
        return { success: false, error: 'Failed to add payout account' };
    }

    revalidatePath('/dashboard/billing');
    return { success: true };
}

export async function getBillingInfo() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { paymentMethods: [], payoutAccounts: [] };

    const { data: paymentMethods } = await supabase
        .from('payment_methods')
        .select('*')
        .order('created_at', { ascending: false });

    const { data: payoutAccounts } = await supabase
        .from('payout_accounts')
        .select('*')
        .order('created_at', { ascending: false });

    return {
        paymentMethods: paymentMethods || [],
        payoutAccounts: payoutAccounts || []
    };
}

export async function deletePaymentMethod(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from('payment_methods').delete().eq('id', id);

    if (error) {
        return { success: false, error: 'Failed to delete payment method' };
    }

    revalidatePath('/dashboard/billing');
    return { success: true };
}

export async function deletePayoutAccount(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from('payout_accounts').delete().eq('id', id);

    if (error) {
        return { success: false, error: 'Failed to delete payout account' };
    }

    revalidatePath('/dashboard/billing');
    return { success: true };
}
