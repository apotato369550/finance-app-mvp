import { createClient } from '@supabase/supabase-js';

// Test mode types
export type TestMode = 'MOCK' | 'DEV' | 'LIVE';

// Get current test mode from environment
export const getTestMode = (): TestMode => {
  const mode = process.env.NEXT_PUBLIC_TEST_MODE?.toUpperCase() as TestMode;
  if (mode === 'MOCK' || mode === 'DEV' || mode === 'LIVE') {
    return mode;
  }
  // Default to MOCK if not set or invalid
  console.warn(`Invalid TEST_MODE: ${process.env.NEXT_PUBLIC_TEST_MODE}. Defaulting to MOCK.`);
  return 'MOCK';
};

// Get Supabase URL and key based on test mode
const getSupabaseConfig = () => {
  const mode = getTestMode();

  if (mode === 'MOCK') {
    // Return dummy values for mock mode (won't be used)
    return { url: '', key: '' };
  }

  if (mode === 'DEV') {
    return {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL_DEV || '',
      key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_DEV || ''
    };
  }

  // LIVE mode
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL_LIVE || '',
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_LIVE || ''
  };
};

const { url: supabaseUrl, key: supabaseAnonKey } = getSupabaseConfig();

// Create Supabase client (will be dummy in MOCK mode)
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any; // In MOCK mode, this won't be used

// Helper functions for mode checking
export const isMockMode = () => getTestMode() === 'MOCK';
export const isDevMode = () => getTestMode() === 'DEV';
export const isLiveMode = () => getTestMode() === 'LIVE';

// Log current mode on initialization
if (typeof window !== 'undefined') {
  const mode = getTestMode();
  console.log(`🔧 Running in ${mode} mode`);
  if (mode === 'DEV') {
    console.log(`📡 Connected to local Supabase: ${supabaseUrl}`);
  } else if (mode === 'LIVE') {
    console.log(`🌐 Connected to remote Supabase: ${supabaseUrl}`);
  } else {
    console.log(`🎭 Using mock data (no database connection)`);
  }
}
