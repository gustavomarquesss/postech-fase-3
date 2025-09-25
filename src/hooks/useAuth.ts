import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/api';
import type { User, LoginRequest, RegisterRequest } from '../types';
import { jwtDecode } from 'jwt-decode';

interface JWTPayload {
  id?: string;
  _id?: string;
  username: string;
  exp: number;
  iat?: number;
  [key: string]: string | number | undefined;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      try {
        const decoded = jwtDecode<JWTPayload>(token);
        
        if (decoded.exp * 1000 > Date.now()) {
          const user: User = {
            _id: String(decoded.id || decoded._id || decoded.userId || decoded.sub || 'unknown'),
            username: String(decoded.username || decoded.user || decoded.name || 'unknown'),
          };
          
          setState({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          localStorage.removeItem('authToken');
          setState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Erro ao decodificar token:', error);
        localStorage.removeItem('authToken');
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  useEffect(() => {
    const handleLogout = () => {
      setState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    };

    window.addEventListener('auth:logout', handleLogout);
    return () => window.removeEventListener('auth:logout', handleLogout);
  }, []);

  const login = useCallback(async (credentials: LoginRequest): Promise<void> => {
    try {
      const { token } = await authService.login(credentials);
      
      const decoded = jwtDecode<JWTPayload>(token);
      
      const user: User = {
        _id: String(decoded.id || decoded._id || decoded.userId || decoded.sub || 'unknown'),
        username: String(decoded.username || decoded.user || decoded.name || 'unknown'),
      };

      localStorage.setItem('authToken', token);

      const newState = {
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      };

      setState(newState);
      
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }, []);

  const logout = useCallback((): void => {
    localStorage.removeItem('authToken');
    
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  const register = useCallback(async (userData: RegisterRequest): Promise<void> => {
    try {
      await authService.register(userData);
      await login({ username: userData.username, password: userData.password });
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    }
  }, [login]);


  return {
    ...state,
    login,
    logout,
    register,
  };
};
