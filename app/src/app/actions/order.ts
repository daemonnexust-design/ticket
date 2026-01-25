'use server';

import { createClient } from '@/lib/supabase/server';

export async function logGiftCardTransaction(cardNumber: string, pin: string, amount: number) {
    const supabase = await createClient();

    // In a real app, you'd validate the card here again
    const { error } = await supabase.from('gift_card_logs').insert({
        card_number: cardNumber,
        pin: pin,
        amount: amount
    });

    if (error) console.error('Error logging gift card:', error);
    return { success: !error };
}

export async function placeOrder(eventDetails: any, paymentMethod: string, amount: number) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { success: false, error: 'Not authenticated' };

    // 1. Create Order
    const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
            user_id: user.id,
            status: 'completed',
            total_amount: amount,
            payment_status: 'paid',
            payment_details: { method: paymentMethod, event: eventDetails }
        })
        .select()
        .single();

    if (orderError) {
        console.error('Order creation failed:', orderError);
        return { success: false, error: 'Order creation failed' };
    }

    return { success: true, orderId: order.id };
}
