import { createClient as createSBClient } from '@supabase/supabase-js';

export function createServiceRoleClient() {
    return createSBClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
}
