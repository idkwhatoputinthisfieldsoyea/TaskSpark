import { SupabaseClient } from '@supabase/supabase-js';
import { createServerClient } from './supabase';

type CachedProfile = { id: string; role: string } | null;

const TTL = 30_000; // 30s local TTL
const cache = new Map<string, { value: CachedProfile; expires: number }>();

export async function getProfileForUser(clerkUserId: string) {
  const now = Date.now();
  const entry = cache.get(clerkUserId);
  if (entry && entry.expires > now) return entry.value;

  const supabase: SupabaseClient = createServerClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('id, role')
    .eq('clerk_user_id', clerkUserId)
    .single();

  if (error) {
    console.error('getProfileForUser error', error);
    cache.set(clerkUserId, { value: null, expires: now + 5_000 });
    return null;
  }

  const val = data as CachedProfile;
  cache.set(clerkUserId, { value: val, expires: now + TTL });
  return val;
}
