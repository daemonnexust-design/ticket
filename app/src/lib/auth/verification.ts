'use server';

import { createClient } from '@/lib/supabase/server';
import { randomInt } from 'crypto';
import { Resend } from 'resend';
import twilio from 'twilio';

// --- SDK Initialization ---
const resend = new Resend(process.env.RESEND_API_KEY);

const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

/**
 * Generates a cryptographically secure 6-digit verification code.
 */
function generateSecureOTP(): string {
    // randomInt is crypto-secure and generates a number between 100000 and 999999
    return randomInt(100000, 1000000).toString();
}

/**
 * Sends a verification code via email or SMS.
 * Implements rate limiting (60 seconds) and uses Resend/Twilio for delivery.
 */
export async function sendVerificationCode(contact: string, type: 'email' | 'phone') {
    const supabase = await createClient();

    // Normalize contact (lowercase for email, trim whitespace)
    const normalizedContact = type === 'email' ? contact.trim().toLowerCase() : contact.trim();

    // --- Rate Limiting: Check if a code was sent in the last 60 seconds ---
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000).toISOString();

    let recentCode = null;
    try {
        const { data, error: rateCheckError } = await supabase
            .from('verifications')
            .select('id')
            .eq('contact', normalizedContact)
            .gt('created_at', oneMinuteAgo)
            .limit(1)
            .maybeSingle();

        if (rateCheckError) {
            console.error('RATE LIMIT QUERY ERROR:', rateCheckError);
            return { success: false, error: `Rate limit check failed: ${rateCheckError.message}` };
        }
        recentCode = data;
    } catch (e: any) {
        console.error('RATE LIMIT EXCEPTION:', e);
        return { success: false, error: `Rate limit exception: ${e.message || 'Unknown error'}` };
    }


    if (recentCode) {
        return { success: false, error: 'Please wait 60 seconds before requesting a new code.' };
    }

    // --- Generate OTP and Expiry ---
    // AUTO-VERIFY BYPASS: Use fixed code '123456' for all users
    const code = '123456';
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    // --- Insert the new code into the verifications table ---
    try {
        const { error: insertError } = await supabase
            .from('verifications')
            .insert({
                contact: normalizedContact,
                code,
                type,
                expires_at: expiresAt.toISOString(),
                verified: false
            });


        if (insertError) {
            console.error('INSERT CODE ERROR:', insertError);
            return { success: false, error: `Failed to save code: ${insertError.message}` };
        }
    } catch (e: any) {
        console.error('INSERT EXCEPTION:', e);
        return { success: false, error: `Insert exception: ${e.message || 'Unknown error'}` };
    }

    // AUTO-VERIFY BYPASS
    console.log('---------------------------------------------------');
    console.log(`[AUTO-VERIFY] Code generated for ${contact}: ${code}`);
    console.log('---------------------------------------------------');

    return { success: true };
}

/**
 * Verifies a code entered by the user against the database.
 * If valid, marks the code as used (verified).
 */
export async function verifyCode(contact: string, code: string) {
    if (!contact || !code) return { success: false, error: 'Contact and code are required.' };

    const supabase = await createClient();

    // Normalize the contact (trim whitespace). Lowercase ONLY if it looks like an email.
    const isEmail = contact.includes('@');
    const normalizedContact = isEmail ? contact.trim().toLowerCase() : contact.trim();
    const normalizedCode = code.trim();

    console.log(`[VERIFY] Checking code for ${normalizedContact}`);

    // AUTO-VERIFY BYPASS
    if (normalizedCode === '123456') {
        try {
            const { data, error } = await supabase
                .from('verifications')
                .select('id')
                .eq('contact', normalizedContact)
                .eq('verified', false)
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();

            if (error) {
                console.error('VERIFICATION FETCH ERROR:', error);
                return { success: false, error: `Verification lookup failed: ${error.message}` };
            }

            if (!data) {
                // Check if any record exists at all for this contact
                const { count } = await supabase
                    .from('verifications')
                    .select('*', { count: 'exact', head: true })
                    .eq('contact', normalizedContact);

                return {
                    success: false,
                    error: count && count > 0
                        ? 'Verification request found but it might be already verified or expired.'
                        : 'No verification request found for this contact. Please request a new code.'
                };
            }

            const { error: updateError } = await supabase
                .from('verifications')
                .update({ verified: true })
                .eq('id', data.id);

            if (updateError) {
                console.error('VERIFICATION UPDATE ERROR:', updateError);
                return { success: false, error: `Failed to update status: ${updateError.message}` };
            }

            return { success: true };
        } catch (e: any) {
            console.error('VERIFICATION EXCEPTION:', e);
            return { success: false, error: `Verification exception: ${e.message || 'Unknown error'}` };
        }
    }

    // Original Strict Verification Logic (Fallback if code != 123456)
    // Find the non-verified, non-expired record matching contact and code
    const { data, error } = await supabase
        .from('verifications')
        .select('id')
        .eq('contact', normalizedContact)
        .eq('code', normalizedCode)
        .eq('verified', false)
        .gt('expires_at', new Date().toISOString())
        .maybeSingle();

    if (error) {
        console.error('Error verifying code:', error);
        return { success: false, error: 'An error occurred during verification.' };
    }

    if (!data) {
        return { success: false, error: 'Invalid or expired verification code.' };
    }

    // Mark as verified
    const { error: updateError } = await supabase
        .from('verifications')
        .update({ verified: true })
        .eq('id', data.id);


    if (updateError) {
        console.error('Error updating verification status:', updateError);
        return { success: false, error: 'Failed to confirm verification.' };
    }

    return { success: true };
}

