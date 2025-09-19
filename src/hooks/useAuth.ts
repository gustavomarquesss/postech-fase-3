import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/api';
import type { User, LoginRequest, RegisterRequest } from '../types';
import { jwtDecode } from 'jwt-decode';

interface JWTPayload {
  id: string;
  username: string;
  exp: number;
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

  // Carrega dados do localStorage na inicialização
  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      try {
        const decoded = jwtDecode<JWTPayload>(token);
        
        // Verifica se o token não expirou
        if (decoded.exp * 1000 > Date.now()) {
          const user: User = {
            _id: decoded.id,
            username: decoded.username,
          };
          
          setState({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          // Token expirado
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

  // Escuta eventos de logout do interceptor do axios
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
      
      // Decodifica o token para extrair informações do usuário
      const decoded = jwtDecode<JWTPayload>(token);
      const user: User = {
        _id: decoded.id,
        username: decoded.username,
      };

      localStorage.setItem('authToken', token);

      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
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
      // Após registro bem-sucedido, fazer login automaticamente
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
