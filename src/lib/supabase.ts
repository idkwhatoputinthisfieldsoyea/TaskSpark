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

// Lazy server client - only creates the actual client when a method is called
// This prevents build-time errors when env vars aren't available
let _lazyServerClient: SupabaseClient | null = null;

function getActualServerClient(): SupabaseClient {
  if (_lazyServerClient) return _lazyServerClient;
  
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

  _lazyServerClient = globalThis.__supabaseServiceClient as SupabaseClient;
  return _lazyServerClient;
}

// Server-side client with service role key (for admin operations)
// Returns a proxy that lazily initializes the client only when actually used
export function createServerClient(): SupabaseClient {
  // Return a proxy that forwards all calls to the actual client
  // This allows the function to be called during build without throwing
  return new Proxy({} as SupabaseClient, {
    get(_target, prop) {
      const client = getActualServerClient();
      const value = (client as any)[prop];
      if (typeof value === 'function') {
        return value.bind(client);
      }
      return value;
    },
  });
}

