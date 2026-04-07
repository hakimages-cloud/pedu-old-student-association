import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  database, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  ref,
  set,
  get,
  update,
  push
} from '../services/firebase';

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
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get user data from database
        const userRef = ref(database, `users/${firebaseUser.uid}`);
        const snapshot = await get(userRef);
        
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email,
            ...userData
          });
        } else {
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || 'User'
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        userData.email, 
        userData.password
      );
      
      const firebaseUser = userCredential.user;
      
      // Generate membership number
      const usersRef = ref(database, 'users');
      const usersSnapshot = await get(usersRef);
      const userCount = usersSnapshot.exists() ? Object.keys(usersSnapshot.val()).length : 0;
      const membershipNumber = `POS${String(userCount + 1).padStart(4, '0')}`;
      
      // Save user data to database
      const userRef = ref(database, `users/${firebaseUser.uid}`);
      const newUser = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        yearOfCompletion: userData.yearOfCompletion,
        program: userData.program,
        membershipNumber,
        role: 'member',
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
        duesStatus: 'pending',
        dependants: [],
        address: '',
        occupation: '',
        bio: ''
      };
      
      await set(userRef, newUser);
      
      return { success: true, membershipNumber };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateUser = async (updates) => {
    if (!user) return;
    
    try {
      const userRef = ref(database, `users/${user.id}`);
      await update(userRef, updates);
      setUser(prev => ({ ...prev, ...updates }));
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
