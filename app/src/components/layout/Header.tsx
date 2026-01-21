import { createClient } from '@/lib/supabase/server';
import { HeaderClient } from './HeaderClient';

export async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <HeaderClient
      user={
        user
          ? {
            id: user.id,
            email: user.email || '',
            fullName: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
          }
          : null
      }
    />
  );
}
