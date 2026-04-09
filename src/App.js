import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Dues from './pages/Dues';
import Welfare from './pages/Welfare';
// import Gallery from './pages/Gallery';
import Events from './pages/Events';
import MemberManagement from './pages/MemberManagement';
import MembershipId from './pages/MembershipId';

function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole && user.role !== 'superadmin') {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
      
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      
      <Route path="/dues" element={
        <ProtectedRoute>
          <Dues />
        </ProtectedRoute>
      } />
      
      <Route path="/welfare" element={
        <ProtectedRoute>
          <Welfare />
        </ProtectedRoute>
      } />
      
      {/*
      <Route path="/gallery" element={
        <ProtectedRoute>
          <Gallery />
        </ProtectedRoute>
      } />
      */}
      
      <Route path="/events" element={
        <ProtectedRoute>
          <Events />
        </ProtectedRoute>
      } />
      
      <Route path="/member-management" element={
        <ProtectedRoute requiredRole="admin">
          <MemberManagement />
        </ProtectedRoute>
      } />
      
      <Route path="/membership-id" element={
        <ProtectedRoute>
          <MembershipId />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
