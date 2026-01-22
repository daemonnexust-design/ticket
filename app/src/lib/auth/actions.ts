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
export async function checkEmailExists(email: string) {
    const supabase = await createClient();

    // Try to sign in with a wrong password to check if user exists
    // If error is "Invalid login credentials" - user exists
    // If error is "Email not confirmed" - user exists but needs verification
    const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: 'CHECK_IF_EXISTS_DUMMY_PASSWORD_12345!',
    });

    if (error) {
        // "Invalid login credentials" means user exists but password is wrong
        if (error.message.includes('Invalid login credentials')) {
            return { exists: true };
        }
        // "Email not confirmed" means user exists
        if (error.message.includes('Email not confirmed')) {
            return { exists: true };
        }
    }

    // User doesn't exist
    return { exists: false };
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
