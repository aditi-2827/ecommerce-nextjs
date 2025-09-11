'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, AuthContextType, AuthResponse } from '@/types/app';

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: true,
  error: null,
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    // Check for stored token on initial load
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Parse token to get user info
      try {
        const base64Url = storedToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        
        setState({
          user: { id: payload.userId, email: payload.email },
          token: storedToken,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        // Token is invalid
        localStorage.removeItem('token');
        setState({ ...initialState, isLoading: false });
      }
    } else {
      setState({ ...initialState, isLoading: false });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data: AuthResponse = await response.json();
      
      if (!response.ok) {
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: data.error || 'Login failed' 
        }));
        return false;
      }
      
      if (data.token) {
        // Parse token to get user info
        const base64Url = data.token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        
        localStorage.setItem('token', data.token);
        setState({
          user: { id: payload.userId, email: payload.email },
          token: data.token,
          isLoading: false,
          error: null,
        });
        return true;
      }
      
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: 'Invalid response from server' 
      }));
      return false;
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: 'Network error occurred' 
      }));
      return false;
    }
  };

  const signup = async (email: string, password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data: AuthResponse = await response.json();
      
      if (!response.ok) {
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: data.error || 'Signup failed' 
        }));
        return false;
      }
      
      if (data.token) {
        // Parse token to get user info
        const base64Url = data.token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        
        localStorage.setItem('token', data.token);
        setState({
          user: { id: payload.userId, email: payload.email },
          token: data.token,
          isLoading: false,
          error: null,
        });
        return true;
      }
      
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: 'Invalid response from server' 
      }));
      return false;
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: 'Network error occurred' 
      }));
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setState({ ...initialState, isLoading: false });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
