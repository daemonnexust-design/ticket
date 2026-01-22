'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function signUp(formData: FormData) {
    const supabase = await createClient();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
            },
        },
    });

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/', 'layout');
    redirect('/');
}

export async function signIn(formData: FormData) {
    const supabase = await createClient();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/', 'layout');
    redirect('/');
}

export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath('/', 'layout');
    redirect('/');
}

export async function getUser() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    return user;
}

export async function completeSignup(email: string, password: string, fullName: string) {
    const supabase = await createClient();

    // 1. Try to sign up with user-provided data
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
            },
        },
    });

    // 2. If user already exists (or signUp successful), try to sign in to set the session
    const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (signInError) {
        console.error('Sign in error during completion:', signInError);
        return { success: false, error: signInError.message };
    }

    return { success: true };
}

/**
 * Checks if an email exists in the auth.users table.
 * Returns true if user exists (show password field), false if new user (redirect to signup).
 */
/**
 * Checks if an email exists in the database.
 * Returns true if user exists (show password field), false if new user (redirect to signup).
 */
export async function checkEmailExists(email: string) {
    const supabase = await createClient();
    const normalizedEmail = email.trim().toLowerCase();

    // Query the profiles table to check if user exists
    // We can trust this because we backfilled profiles and added a trigger
    const { count, error } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('email', normalizedEmail);

    console.log('[checkEmailExists] Email:', normalizedEmail, 'Count:', count, 'Error:', error?.message);

    if (error) {
        console.error('[checkEmailExists] Database error:', error);
        // On error, safest default is to assume new user so they can try to sign up
        // (If they actually exist, signup will fail gracefully)
        return { exists: false };
    }

    return { exists: (count ?? 0) > 0 };
}

/**
 * Signs in an existing user with email and password.
 */
export async function signInExistingUser(email: string, password: string) {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
    });

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true };
}

/**
 * Validates if a referral code exists in the database.
 */
export async function validateReferralCode(code: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('referrals')
        .select('id, user_id')
        .eq('code', code.trim().toUpperCase())
        .single();

    if (error || !data) {
        return { valid: false };
    }

    return { valid: true, referralId: data.id, referrerUserId: data.user_id };
}

/**
 * Credits a referral point to the referrer when a new user signs up with their code.
 */
export async function creditReferral(referralCode: string) {
    if (!referralCode) return { success: true }; // No code provided, skip

    const supabase = await createClient();

    // Find the referral record
    const { data: referral, error: findError } = await supabase
        .from('referrals')
        .select('id, points, max_points')
        .eq('code', referralCode.trim().toUpperCase())
        .single();

    if (findError || !referral) {
        console.error('Referral not found:', referralCode);
        return { success: false, error: 'Invalid referral code' };
    }

    // Check if max points reached
    if (referral.points >= referral.max_points) {
        return { success: true, message: 'Referrer has reached max points' };
    }

    // Increment points
    const { error: updateError } = await supabase
        .from('referrals')
        .update({ points: referral.points + 1 })
        .eq('id', referral.id);

    if (updateError) {
        console.error('Error crediting referral:', updateError);
        return { success: false, error: 'Failed to credit referral' };
    }

    return { success: true };
}
