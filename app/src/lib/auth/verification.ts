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

    // --- Rate Limiting: Check if a code was sent in the last 60 seconds ---
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000).toISOString();

    const { data: recentCode, error: rateCheckError } = await supabase
        .from('verifications')
        .select('id')
        .eq('contact', contact)
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
    const code = generateSecureOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // Expires in 10 minutes

    // --- Insert the new code into the verifications table ---
    const { error: insertError } = await supabase
        .from('verifications')
        .insert({
            contact,
            code,
            type,
            expires_at: expiresAt.toISOString(),
            verified: false
        });

    if (insertError) {
        console.error('Error saving verification code:', insertError);
        return { success: false, error: 'Failed to create verification code.' };
    }

    // --- Send the code via Resend (email) or Twilio (SMS) ---
    try {
        if (type === 'email') {
            await resend.emails.send({
                from: 'Ticketmaster <no-reply@ticketmaster.com>',
                to: contact,
                subject: 'Your Ticketmaster Verification Code',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
                        <h1 style="color: #026cdf; font-size: 24px;">Verify Your Email</h1>
                        <p style="font-size: 16px; color: #333;">Your verification code is:</p>
                        <div style="background: #f5f5f5; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
                            <span style="font-size: 32px; font-weight: 700; letter-spacing: 6px; color: #121212;">${code}</span>
                        </div>
                        <p style="font-size: 14px; color: #666;">This code will expire in 10 minutes.</p>
                        <p style="font-size: 12px; color: #999;">If you didn't request this code, you can safely ignore this email.</p>
                    </div>
                `
            });
            console.log(`[VERIFICATION] Email sent to ${contact}`);
        } else if (type === 'phone') {
            if (!twilioPhoneNumber) {
                throw new Error('TWILIO_PHONE_NUMBER is not configured.');
            }
            await twilioClient.messages.create({
                body: `Your Ticketmaster verification code is: ${code}. This code expires in 10 minutes.`,
                from: twilioPhoneNumber,
                to: contact
            });
            console.log(`[VERIFICATION] SMS sent to ${contact}`);
        }
    } catch (sendError: any) {
        console.error(`Error sending ${type} verification:`, sendError);
        // Even if sending fails, the code is in the DB, but we report the failure.
        // Consider deleting the DB record here for a cleaner state, but logging is key.
        return { success: false, error: `Failed to send verification ${type}. Please try again.` };
    }

    return { success: true };
}

/**
 * Verifies a code entered by the user against the database.
 * If valid, marks the code as used (verified).
 */
export async function verifyCode(contact: string, code: string) {
    const supabase = await createClient();

    // Find the non-verified, non-expired record matching contact and code
    const { data, error } = await supabase
        .from('verifications')
        .select('id')
        .eq('contact', contact)
        .eq('code', code)
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
