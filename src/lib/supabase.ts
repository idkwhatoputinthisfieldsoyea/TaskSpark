import { createClient, SupabaseClient } from '@supabase/supabase-js';

declare global {
  // allow caching the server client across module reloads in development
  // eslint-disable-next-line no-var
  var __supabaseServiceClient: SupabaseClient | undefined;
  // cache a browser/client client as well
  var __supabaseBrowserClient: SupabaseClient | undefined;
}

// Browser/client-side Supabase client factory. Reads NEXT_PUBLIC env vars at runtime
export function getBrowserClient(): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }

  if (!globalThis.__supabaseBrowserClient) {
    globalThis.__supabaseBrowserClient = createClient(supabaseUrl, supabaseAnonKey);
  }

  return globalThis.__supabaseBrowserClient as SupabaseClient;
}

// Server-side client with service role key (for admin operations)
export function createServerClient(): SupabaseClient {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables for server Supabase client');
  }

  // Reuse the service-role client across invocations to reduce cold-start
  if (typeof globalThis.__supabaseServiceClient === 'undefined') {
    globalThis.__supabaseServiceClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return globalThis.__supabaseServiceClient as SupabaseClient;
}

