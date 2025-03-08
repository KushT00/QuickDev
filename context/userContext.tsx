/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Supabase client setup
const supabaseUrl = "https://immnnggjwqeidcamkgty.supabase.co";
const supabaseAnonKey = "YOUR_SUPABASE_ANON_KEY"; // Replace with your actual anon key
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type UserMetadata = {
  avatar_url?: string;
  email?: string;
  email_verified?: boolean;
  full_name?: string;
  name?: string;
  picture?: string;
  provider_id?: string;
};

type UserContextType = {
  user: {
    id: string | null;
    email: string | null;
    name: string | null;
    avatarUrl: string | null;
    isAuthenticated: boolean;
    provider: string | null;
  };
  supabase: SupabaseClient;
  loading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | null>(null);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    email: null,
    name: null,
    avatarUrl: null,
    isAuthenticated: false,
    provider: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshUser = async () => {
    try {
      setLoading(true);
      
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        throw sessionError;
      }

      if (session) {
        const userData = session.user;
        const metadata = userData.user_metadata as UserMetadata;
        
        setUser({
          id: userData.id,
          email: userData.email,
          name: metadata.name || metadata.full_name || "User",
          avatarUrl: metadata.avatar_url || metadata.picture || null,
          isAuthenticated: true,
          provider: userData.app_metadata?.provider || null
        });
      } else {
        setUser({
          id: null,
          email: null,
          name: null,
          avatarUrl: null,
          isAuthenticated: false,
          provider: null,
        });
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching user data");
      console.error("Auth error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          const userData = session.user;
          const metadata = userData.user_metadata as UserMetadata;
          
          setUser({
            id: userData.id,
            email: userData.email,
            name: metadata.name || metadata.full_name || "User",
            avatarUrl: metadata.avatar_url || metadata.picture || null,
            isAuthenticated: true,
            provider: userData.app_metadata?.provider || null
          });
        } else {
          setUser({
            id: null,
            email: null,
            name: null,
            avatarUrl: null,
            isAuthenticated: false,
            provider: null,
          });
        }
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ 
      user, 
      supabase, 
      loading, 
      error,
      refreshUser 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    console.warn("useUser must be used within a UserProvider");
    return {
      user: {
        id: null,
        email: null,
        name: null,
        avatarUrl: null,
        isAuthenticated: false,
        provider: null,
      },
      supabase,
      loading: false,
      error: null,
      refreshUser: async () => {},
    };
  }
  return context;
};