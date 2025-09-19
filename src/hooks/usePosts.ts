import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postsService } from '../services/api';
import type { UpdatePostRequest } from '../types';

// Hook para listar todos os posts
export const usePostsQuery = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: postsService.listPosts,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });
};

// Hook para buscar um post específico
export const usePostQuery = (id: string) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => postsService.getPost(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Hook para buscar posts
export const useSearchPostsQuery = (searchTerm: string) => {
  return useQuery({
    queryKey: ['posts', 'search', searchTerm],
    queryFn: () => postsService.searchPosts({ q: searchTerm }),
    enabled: !!searchTerm && searchTerm.length >= 2,
    staleTime: 2 * 60 * 1000, // 2 minutos para buscas
    gcTime: 5 * 60 * 1000,
  });
};

// Hook para criar post
export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postsService.createPost,
    onSuccess: () => {
      // Invalida a cache dos posts para refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

// Hook para atualizar post
export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePostRequest }) =>
      postsService.updatePost(id, data),
    onSuccess: (updatedPost) => {
      // Atualiza o cache do post específico
      queryClient.setQueryData(['post', updatedPost._id], updatedPost);
      // Invalida a lista de posts
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

// Hook para deletar post
export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postsService.deletePost,
    onSuccess: (_, deletedId) => {
      // Remove o post específico do cache
      queryClient.removeQueries({ queryKey: ['post', deletedId] });
      // Invalida a lista de posts
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
