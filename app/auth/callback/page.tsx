'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

// Create a supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Handle the OAuth callback
    const handleAuthCallback = async () => {
      try {
        // Supabase will automatically process the OAuth callback here
        const { data, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (data?.session) {
          // Authentication successful, redirect to home or dashboard
          router.push('/');
        } else {
          // No session found, redirect to login
          router.push('/login');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        router.push('/login?error=auth_callback_failed');
      }
    };

    handleAuthCallback();
  }, [router]);

  // Show a loading state while processing
  return (
    <div className="h-screen flex items-center justify-center">
      <p>Processing authentication, please wait...</p>
    </div>
  );
}