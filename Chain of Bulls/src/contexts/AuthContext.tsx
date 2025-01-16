import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: any;
  userType: 'expert' | 'investor' | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, type: 'expert' | 'investor') => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [userType, setUserType] = useState<'expert' | 'investor' | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserType(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserType(session.user.id);
      } else {
        setUserType(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchUserType(userId: string) {
    try {
      const { data, error } = await supabase
        .from('users_metadata')
        .select('user_type')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) throw error;
      setUserType(data?.user_type as 'expert' | 'investor' | null);
    } catch (error) {
      console.error('Error fetching user type:', error);
      setUserType(null);
    }
  }

  async function signUp(email: string, password: string, type: 'expert' | 'investor') {
    const { data: { user: newUser }, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) throw signUpError;
    if (!newUser?.id) throw new Error('User creation failed');

    const { error: metadataError } = await supabase
      .from('users_metadata')
      .insert([{ id: newUser.id, user_type: type }]);

    if (metadataError) {
      // If metadata creation fails, clean up by deleting the user
      await supabase.auth.admin.deleteUser(newUser.id);
      throw metadataError;
    }

    setUserType(type);
  }

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUserType(null);
  }

  const value = {
    user,
    userType,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}