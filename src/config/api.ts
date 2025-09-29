// Configuração da API baseada no ambiente
const isDevelopment = import.meta.env.DEV;
const isLocalhost = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

export const apiConfig = {
  // Se for localhost (dev ou docker), usa proxy. Senão, URL direta
  baseURL: isLocalhost 
    ? '/api'  // Localhost sempre usa proxy
    : 'https://fiap-fsdt-techchallenge-ii-posts.onrender.com', // Deploy remoto usa URL direta
  timeout: 15000,
};

// Log para debug
console.log('🔧 API Config:', {
  environment: isDevelopment ? 'development' : 'production',
  hostname: typeof window !== 'undefined' ? window.location.hostname : 'server',
  isLocalhost,
  baseURL: apiConfig.baseURL,
  usingProxy: isLocalhost
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