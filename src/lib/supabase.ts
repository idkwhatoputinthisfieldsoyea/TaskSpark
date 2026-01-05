import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

declare global {
  // allow caching the server client across module reloads in development
  // eslint-disable-next-line no-var
  var __supabaseServiceClient: SupabaseClient | undefined;
}

// Server-side client with service role key (for admin operations)
export function createServerClient(): SupabaseClient {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  // Reuse the service-role client across invocations to reduce cold-start
  if (typeof globalThis.__supabaseServiceClient === 'undefined') {
    globalThis.__supabaseServiceClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      // consider smaller fetch/execution timeouts in production if needed
    });
  }

  return globalThis.__supabaseServiceClient as SupabaseClient;
}

