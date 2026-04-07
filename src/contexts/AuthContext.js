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
      // Mock authentication - replace with actual API call
      const mockUsers = [
        { id: '1', email: 'admin@posa.com', password: 'admin123', role: 'superadmin', name: 'Admin User' },
        { id: '2', email: 'member@posa.com', password: 'member123', role: 'member', name: 'Member User' },
        { id: '3', email: 'admin2@posa.com', password: 'admin123', role: 'admin', name: 'Event Admin' }
      ];

      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const userData = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
          role: foundUser.role,
          membershipNumber: `POS${String(foundUser.id).padStart(4, '0')}`
        };
        
        setUser(userData);
        localStorage.setItem('posa_user', JSON.stringify(userData));
        return { success: true };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // Mock registration - replace with actual API call
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        role: 'member',
        membershipNumber: `POS${String(Date.now()).slice(-4)}`
      };
      
      setUser(newUser);
      localStorage.setItem('posa_user', JSON.stringify(newUser));
      return { success: true };
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
