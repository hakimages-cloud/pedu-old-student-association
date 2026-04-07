import React, { createContext, useContext, useState, useEffect } from 'react';

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
    // For demo purposes, we'll use localStorage instead of Firebase
    // In production, you'd use Firebase Auth or another authentication service
    
    const storedUser = localStorage.getItem('posa_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);

    // Uncomment this for Firebase Auth
    // const unsubscribe = onAuthStateChanged(auth, (user) => {
    //   setUser(user);
    //   setLoading(false);
    // });
    // return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      // Real authentication - check localStorage for registered users
      const users = JSON.parse(localStorage.getItem('posa_users') || '[]');
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const userData = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
          role: foundUser.role,
          membershipNumber: foundUser.membershipNumber,
          phone: foundUser.phone,
          yearOfCompletion: foundUser.yearOfCompletion,
          program: foundUser.program,
          address: foundUser.address,
          occupation: foundUser.occupation,
          bio: foundUser.bio,
          dependants: foundUser.dependants || []
        };
        
        setUser(userData);
        localStorage.setItem('posa_user', JSON.stringify(userData));
        return { success: true };
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('posa_users') || '[]');
      const existingUser = users.find(u => u.email === userData.email);
      
      if (existingUser) {
        throw new Error('An account with this email already exists');
      }

      // Generate membership number
      const membershipNumber = `POS${String(users.length + 1).padStart(4, '0')}`;
      
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        membershipNumber,
        role: 'member', // All new registrations start as members
        status: 'pending', // Pending approval from admin
        joinDate: new Date().toISOString().split('T')[0],
        duesStatus: 'pending',
        dependants: []
      };
      
      // Save to users list
      users.push(newUser);
      localStorage.setItem('posa_users', JSON.stringify(users));
      
      // Auto-login after registration
      setUser(newUser);
      localStorage.setItem('posa_user', JSON.stringify(newUser));
      
      return { success: true, membershipNumber };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('posa_user');
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('posa_user', JSON.stringify(updatedUser));
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
      {children}
    </AuthContext.Provider>
  );
};
