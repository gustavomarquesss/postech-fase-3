// Configuração da API baseada no ambiente
const isDevelopment = import.meta.env.DEV;

export const apiConfig = {
  baseURL: isDevelopment 
    ? '/api'  // Em desenvolvimento usa proxy
    : 'https://fiap-fsdt-techchallenge-ii-posts.onrender.com', // Em produção usa URL direta
  timeout: 15000,
};

// Log para debug
console.log('🔧 API Config:', {
  environment: isDevelopment ? 'development' : 'production',
  baseURL: apiConfig.baseURL,
  usingProxy: isDevelopment
});

export const API_BASE_URL = apiConfig.baseURL;
export const API_TIMEOUT = apiConfig.timeout;

export const ENDPOINTS = {
  posts: '/posts',
  search: '/posts/search',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  }
} as const;