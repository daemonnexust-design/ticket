'use server';

import { createClient } from '@/lib/supabase/server';

export async function checkBalance(cardNumber: string, pin: string) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (!cardNumber || !pin) {
        return { success: false, error: 'Please enter both card number and PIN.' };
    }

    const supabase = await createClient();

    // In a real production app, PINs should be hashed. 
    // For this demo, we compare plain text as per the seeded data.
    const { data: card, error } = await supabase
        .from('gift_cards')
        .select('current_balance, currency, status')
        .eq('card_number', cardNumber)
        .eq('pin', pin)
        .single();

    if (error || !card) {
        return { success: false, error: 'Invalid card number or PIN.' };
    }

    if (card.status !== 'active') {
        return { success: false, error: `This card is ${card.status}.` };
    }

    return {
        success: true,
        balance: card.current_balance,
        currency: card.currency
    };
}

export async function getPromoCodes() {
    // Still mocking empty state for promo codes as per current scope
    return { codes: [] };
}
