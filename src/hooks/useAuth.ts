import React, { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/api';
import type { User, LoginRequest, RegisterRequest } from '../types';
import { jwtDecode } from 'jwt-decode';

interface JWTPayload {
  id?: string;
  _id?: string;
  username: string;
  exp: number;
  iat?: number;
  [key: string]: any; // Para permitir outros campos
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
    console.log('🚀 useAuth inicializando...');
    const token = localStorage.getItem('authToken');
    console.log('🔍 Token no localStorage:', token);

    if (token) {
      try {
        const decoded = jwtDecode<JWTPayload>(token);
        console.log('🔍 Token decodificado na inicialização:', decoded);
        
        // Verifica se o token não expirou
        if (decoded.exp * 1000 > Date.now()) {
          const user: User = {
            _id: decoded.id || decoded._id || decoded.userId || decoded.sub || 'unknown',
            username: decoded.username || decoded.user || decoded.name || 'unknown',
          };
          
          console.log('✅ Token válido, usuário logado:', user);
          setState({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          // Token expirado
          console.log('⏰ Token expirado');
          localStorage.removeItem('authToken');
          setState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('❌ Erro ao decodificar token:', error);
        localStorage.removeItem('authToken');
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      console.log('❌ Nenhum token encontrado');
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
      console.log('🔄 Iniciando login...');
      const { token } = await authService.login(credentials);
      console.log('✅ Token recebido:', token);
      
      // Decodifica o token para extrair informações do usuário
      const decoded = jwtDecode<JWTPayload>(token);
      console.log('🔍 Token decodificado:', decoded);
      
      const user: User = {
        _id: decoded.id || decoded._id || decoded.userId || decoded.sub || 'unknown',
        username: decoded.username || decoded.user || decoded.name || 'unknown',
      };
      console.log('👤 Usuário criado:', user);

      localStorage.setItem('authToken', token);
      console.log('💾 Token salvo no localStorage');

      const newState = {
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      };

      console.log('🔄 Atualizando estado:', newState);
      setState(newState);

      // Dispara evento customizado para forçar re-renderização
      console.log('📡 Disparando evento auth:login');
      window.dispatchEvent(new CustomEvent('auth:login', { detail: newState }));

      // Força re-render com um pequeno delay para garantir que o estado foi atualizado
      setTimeout(() => {
        console.log('📡 Disparando evento auth:stateChanged');
        window.dispatchEvent(new CustomEvent('auth:stateChanged', { detail: newState }));
      }, 100);
      
    } catch (error) {
      console.error('❌ Erro no login:', error);
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

  // Log do estado atual sempre que mudar
  React.useEffect(() => {
    console.log('🔄 useAuth - Estado atual:', state);
  }, [state]);

  return {
    ...state,
    login,
    logout,
    register,
  };
};
