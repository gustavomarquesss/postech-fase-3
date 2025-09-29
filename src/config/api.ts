export const apiConfig = {
  baseURL: 'https://fiap-fsdt-techchallenge-ii-posts.onrender.com',
  timeout: 15000,
};

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