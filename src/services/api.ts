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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
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
    const response = await api.get<Post[]>("/posts");
    return response.data;
  },

  async getPost(id: string): Promise<Post> {
    const response = await api.get<Post>(`/posts/${id}`);
    return response.data;
  },

  async createPost(data: CreatePostRequest): Promise<Post> {
    const response = await api.post<Post>("/posts", data);
    return response.data;
  },

  async updatePost(id: string, data: UpdatePostRequest): Promise<Post> {
    const response = await api.put<Post>(`/posts/${id}`, data);
    return response.data;
  },

  async deletePost(id: string): Promise<void> {
    await api.delete(`/posts/${id}`);
  },

  async searchPosts(params: PostSearchParams): Promise<Post[]> {
    const response = await api.get<Post[]>("/posts/search", { params });
    return response.data;
  },
};

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>(
        "/auth/login",
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
        "/auth/register",
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
