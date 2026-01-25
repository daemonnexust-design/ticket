
import { sendVerificationCode, verifyCode } from '../src/lib/auth/verification';

// Minimal mock if needed, but we want to test the real DB interaction if possible.
// This assumes the environment has access to Supabase via .env.local

async function stressTest() {
    console.log('Starting Auth Stress Test (50 Users)...');

    const BATCH_SIZE = 50;
    const errors: string[] = [];

    // 1. Simulate "Send Code"
    console.log(`[Step 1] Requesting codes for ${BATCH_SIZE} users...`);
    const sendPromises = Array.from({ length: BATCH_SIZE }).map(async (_, i) => {
        const email = `stress.test.${Date.now()}.${i}@example.com`;
        try {
            const res = await sendVerificationCode(email, 'email');
            if (!res.success) throw new Error(res.error);
            return { email, success: true };
        } catch (e: any) {
            return { email, success: false, error: e.message };
        }
    });

    const sendResults = await Promise.all(sendPromises);
    const successfulSends = sendResults.filter(r => r.success);
    console.log(`[Step 1] Sent: ${successfulSends.length}/${BATCH_SIZE} success.`);

    if (successfulSends.length === 0) {
        console.error('All sends failed. Aborting.');
        process.exit(1);
    }

    // 2. Simulate "Verify Code" with '123456'
    console.log(`[Step 2] Verifying 123456 for ${successfulSends.length} users...`);
    const verifyPromises = successfulSends.map(async (user) => {
        try {
            const res = await verifyCode(user.email, '123456');
            if (!res.success) throw new Error(res.error);
            return { email: user.email, success: true };
        } catch (e: any) {
            return { email: user.email, success: false, error: e.message };
        }
    });

    const verifyResults = await Promise.all(verifyPromises);
    const successfulVerifies = verifyResults.filter(r => r.success);

    console.log(`[Step 2] Verified: ${successfulVerifies.length}/${successfulSends.length} success.`);

    if (successfulVerifies.length === successfulSends.length) {
        console.log('✅ STRESS TEST PASSED: All users verified with 123456.');
        process.exit(0);
    } else {
        console.error('❌ STRESS TEST FAILED');
        verifyResults.filter(r => !r.success).forEach(r => console.error(`Failed ${r.email}: ${r.error}`));
        process.exit(1);
    }
}

stressTest();
