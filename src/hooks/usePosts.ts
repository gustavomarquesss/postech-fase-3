import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postsService } from "../services/api";
import type { UpdatePostRequest } from "../types";

export const usePostsQuery = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: postsService.listPosts,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: (failureCount, error) => {
      console.log('Posts query retry attempt:', failureCount, error);
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const usePostQuery = (id: string) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => postsService.getPost(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useSearchPostsQuery = (searchTerm: string) => {
  return useQuery({
    queryKey: ["posts", "search", searchTerm],
    queryFn: () => postsService.searchPosts({ q: searchTerm }),
    enabled: !!searchTerm && searchTerm.length >= 2,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: (failureCount, error) => {
      console.log('Search query retry attempt:', failureCount, error);
      return failureCount < 1;
    },
    retryDelay: 1000,
  });
};

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postsService.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePostRequest }) =>
      postsService.updatePost(id, data),
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(["post", updatedPost._id], updatedPost);

      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postsService.deletePost,
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: ["post", deletedId] });

      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
