import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        setUser({
          id: session.user.id,
          email: session.user.email,
          name: userData?.name,
          phone: userData?.phone,
          year_of_completion: userData?.year_of_completion,
          program: userData?.program,
          membership_number: userData?.membership_number,
          role: userData?.role,
          status: userData?.status,
          join_date: userData?.join_date,
          dues_status: userData?.dues_status,
          dependants: userData?.dependants,
          address: userData?.address,
          occupation: userData?.occupation,
          bio: userData?.bio,
          created_at: userData?.created_at,
          updated_at: userData?.updated_at
        });
      }
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          setUser({
            id: session.user.id,
            email: session.user.email,
            name: userData?.name,
            phone: userData?.phone,
            year_of_completion: userData?.year_of_completion,
            program: userData?.program,
            membership_number: userData?.membership_number,
            role: userData?.role,
            status: userData?.status,
            join_date: userData?.join_date,
            dues_status: userData?.dues_status,
            dependants: userData?.dependants,
            address: userData?.address,
            occupation: userData?.occupation,
            bio: userData?.bio,
            created_at: userData?.created_at,
            updated_at: userData?.updated_at
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // Create Supabase user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          emailRedirectTo: window.location.origin
        }
      });
      
      if (authError) throw authError;
      
      // Generate membership number
      const { data: users } = await supabase
        .from('users')
        .select('id');
      
      const userCount = users?.length || 0;
      const membershipNumber = `POS${String(userCount + 1).padStart(4, '0')}`;
      
      // Save user data to database
      const { error: dbError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          year_of_completion: userData.yearOfCompletion,
          program: userData.program,
          membership_number: membershipNumber,
          role: 'member',
          status: 'active',
          join_date: new Date().toISOString().split('T')[0],
          dues_status: 'pending',
          dependants: '[]',
          address: '',
          occupation: '',
          bio: ''
        });
      
      if (dbError) throw dbError;
      
      return { success: true, membershipNumber };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const updateUser = async (updates) => {
    if (!user) return { success: false, error: 'No user logged in' };
    
    try {
      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Refresh user data after update
      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      
      setUser(prev => ({ 
        ...prev, 
        ...userData 
      }));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
