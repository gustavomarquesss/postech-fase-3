import axios from "axios";
import type {
  Post,
  CreatePostRequest,
  UpdatePostRequest,
  PostSearchParams,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../types";
import { apiConfig, ENDPOINTS } from "../config/api";

export const api = axios.create({
  baseURL: apiConfig.baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: apiConfig.timeout,
  withCredentials: false,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.dispatchEvent(new CustomEvent("auth:logout"));
    }

    return Promise.reject(error);
  }
);

export const postsService = {
  async listPosts(): Promise<Post[]> {
    try {
      console.log('Fetching posts from:', `${apiConfig.baseURL}${ENDPOINTS.posts}`);
      const response = await api.get<Post[]>(ENDPOINTS.posts);
      console.log('Posts response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  async getPost(id: string): Promise<Post> {
    const response = await api.get<Post>(`${ENDPOINTS.posts}/${id}`);
    return response.data;
  },

  async createPost(data: CreatePostRequest): Promise<Post> {
    const response = await api.post<Post>(ENDPOINTS.posts, data);
    return response.data;
  },

  async updatePost(id: string, data: UpdatePostRequest): Promise<Post> {
    const response = await api.put<Post>(`${ENDPOINTS.posts}/${id}`, data);
    return response.data;
  },

  async deletePost(id: string): Promise<void> {
    await api.delete(`${ENDPOINTS.posts}/${id}`);
  },

  async searchPosts(params: PostSearchParams): Promise<Post[]> {
    try {
      console.log('Searching posts with params:', params);
      const response = await api.get<Post[]>(ENDPOINTS.search, { params });
      console.log('Search response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error searching posts:', error);
      throw error;
    }
  },
};

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>(
        ENDPOINTS.auth.login,
        credentials
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Erro ao fazer login";
        throw new Error(message);
      }
      throw new Error("Erro de conexão com o servidor");
    }
  },

  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await api.post<RegisterResponse>(
        ENDPOINTS.auth.register,
        userData
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Erro ao registrar usuário";
        throw new Error(message);
      }
      throw new Error("Erro de conexão com o servidor");
    }
  },

  async logout(): Promise<void> {
    return Promise.resolve();
  },
};
