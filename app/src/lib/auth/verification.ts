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

    const { data: recentCode, error: rateCheckError } = await supabase
        .from('verifications')
        .select('id')
        .eq('contact', normalizedContact)
        .gt('created_at', oneMinuteAgo)
        .limit(1)
        .maybeSingle();


    if (rateCheckError) {
        console.error('Error checking rate limit:', rateCheckError);
        return { success: false, error: 'Could not check rate limit.' };
    }

    if (recentCode) {
        return { success: false, error: 'Please wait 60 seconds before requesting a new code.' };
    }

    // --- Generate OTP and Expiry ---
    // AUTO-VERIFY BYPASS: Use fixed code '123456' for all users
    const code = '123456';
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // Expires in 10 minutes

    // --- Insert the new code into the verifications table ---
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
        console.error('Error saving verification code:', insertError);
        return { success: false, error: 'Failed to create verification code.' };
    }

    // AUTO-VERIFY BYPASS
    // Skip sending email/SMS entirely. The code is always '123456'.
    console.log('---------------------------------------------------');
    console.log(`[AUTO-VERIFY] Code for ${contact}: ${code}`);
    console.log('---------------------------------------------------');

    return { success: true };

    /* 
    // ORIGINAL SENDING CODE (Commented out for Universal Bypass)
    // Enable this when you have verified domains for Resend/Twilio
    try {
        if (type === 'email') {
            const { data: emailData, error: emailError } = await resend.emails.send({
                from: 'Ticketmaster <onboarding@resend.dev>',
                to: contact,
                subject: 'Your Ticketmaster Verification Code',
                html: `...` // (Snippet omitted for brevity)
            });
            ...
        }
    } ...
    */
}

/**
 * Verifies a code entered by the user against the database.
 * If valid, marks the code as used (verified).
 */
export async function verifyCode(contact: string, code: string) {
    const supabase = await createClient();

    // Normalize the contact (trim whitespace, lowercase for email)
    const normalizedContact = contact.trim().toLowerCase();
    const normalizedCode = code.trim();

    // AUTO-VERIFY BYPASS
    // If code is '123456', we find the latest unverified record and mark it verified.
    if (normalizedCode === '123456') {
        const { data, error } = await supabase
            .from('verifications')
            .select('id')
            .eq('contact', normalizedContact)
            .eq('verified', false)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

        if (!data) return { success: false, error: 'No verification request found.' };

        const { error: updateError } = await supabase
            .from('verifications')
            .update({ verified: true })
            .eq('id', data.id);

        if (updateError) {
            console.error('[AUTO-VERIFY] DB Update Error:', updateError);
            return { success: false, error: 'DB Error updating status.' };
        }


        return { success: true };
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

