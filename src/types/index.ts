// Tipos principais da aplicação
export interface Post {
  _id: string;
  titulo: string;
  conteudo: string;
  autor: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface CreatePostRequest {
  titulo: string;
  conteudo: string;
  autor: string;
}

export interface UpdatePostRequest {
  titulo?: string;
  conteudo?: string;
  autor?: string;
}

export interface User {
  _id: string;
  username: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface RegisterResponse {
  id: string;
  username: string;
}

export interface ErrorResponse {
  message: string;
  error?: string;
  statusCode?: number;
}

export interface PostSearchParams {
  q: string;
}
