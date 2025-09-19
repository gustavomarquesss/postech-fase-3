import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from './Modal';
import { Loading } from './Loading';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { useCreatePostMutation, useUpdatePostMutation } from '../hooks/usePosts';
import type { Post } from '../types';

const postSchema = z.object({
  titulo: z
    .string()
    .min(1, 'Título é obrigatório')
    .min(5, 'Título deve ter pelo menos 5 caracteres')
    .max(200, 'Título deve ter no máximo 200 caracteres'),
  conteudo: z
    .string()
    .min(1, 'Conteúdo é obrigatório')
    .min(20, 'Conteúdo deve ter pelo menos 20 caracteres')
    .max(10000, 'Conteúdo deve ter no máximo 10.000 caracteres'),
  autor: z
    .string()
    .min(1, 'Autor é obrigatório')
    .min(2, 'Nome do autor deve ter pelo menos 2 caracteres')
    .max(100, 'Nome do autor deve ter no máximo 100 caracteres'),
});

type PostFormData = z.infer<typeof postSchema>;

interface PostFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  post?: Post | null; // Se fornecido, está editando
}

export const PostFormModal: React.FC<PostFormModalProps> = ({ isOpen, onClose, post }) => {
  const { user } = useAuth();
  const { success, error } = useToast();
  const createPostMutation = useCreatePostMutation();
  const updatePostMutation = useUpdatePostMutation();

  const isEditing = Boolean(post);
  const isLoading = createPostMutation.isPending || updatePostMutation.isPending;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      titulo: '',
      conteudo: '',
      autor: user?.username || '',
    },
  });

  // Preenche o formulário quando está editando
  useEffect(() => {
    if (isEditing && post) {
      reset({
        titulo: post.titulo,
        conteudo: post.conteudo,
        autor: post.autor,
      });
    } else if (!isEditing) {
      reset({
        titulo: '',
        conteudo: '',
        autor: user?.username || '',
      });
    }
  }, [isEditing, post, reset, user?.username]);

  const watchedTitulo = watch('titulo');
  const watchedConteudo = watch('conteudo');

  const onSubmit = async (data: PostFormData) => {
    try {
      if (isEditing && post) {
        await updatePostMutation.mutateAsync({ id: post._id, data });
        success('Post atualizado com sucesso!');
      } else {
        await createPostMutation.mutateAsync(data);
        success('Post criado com sucesso!');
      }
      onClose();
      reset();
    } catch (err) {
      console.error('Erro ao salvar post:', err);
      error(
        err instanceof Error 
          ? err.message 
          : 'Erro ao salvar o post. Tente novamente.'
      );
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
      reset();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? 'Editar Post' : 'Novo Post'}
      size="lg"
      closeOnOverlayClick={!isLoading}
      closeOnEsc={!isLoading}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
            Título do Post
          </label>
          <input
            {...register('titulo')}
            type="text"
            id="titulo"
            className={`input-field ${errors.titulo ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Digite um título atrativo para seu post"
            disabled={isLoading}
          />
          {errors.titulo && (
            <p className="mt-1 text-sm text-red-600">{errors.titulo.message}</p>
          )}
          <p className={`text-xs mt-1 ${(watchedTitulo?.length || 0) > 200 ? 'text-red-600' : 'text-gray-500'}`}>
            {watchedTitulo?.length || 0}/200 caracteres
          </p>
        </div>

        <div>
          <label htmlFor="conteudo" className="block text-sm font-medium text-gray-700 mb-1">
            Conteúdo
          </label>
          <textarea
            {...register('conteudo')}
            id="conteudo"
            rows={8}
            className={`input-field resize-none ${errors.conteudo ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Escreva o conteúdo completo do seu post aqui..."
            disabled={isLoading}
          />
          {errors.conteudo && (
            <p className="mt-1 text-sm text-red-600">{errors.conteudo.message}</p>
          )}
          <p className={`text-xs mt-1 ${(watchedConteudo?.length || 0) > 10000 ? 'text-red-600' : 'text-gray-500'}`}>
            {watchedConteudo?.length || 0}/10.000 caracteres
          </p>
        </div>

        <div>
          <label htmlFor="autor" className="block text-sm font-medium text-gray-700 mb-1">
            Autor
          </label>
          <input
            {...register('autor')}
            type="text"
            id="autor"
            className={`input-field ${errors.autor ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Seu nome como aparecerá no post"
            disabled={isLoading}
          />
          {errors.autor && (
            <p className="mt-1 text-sm text-red-600">{errors.autor.message}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Este será o nome exibido como autor do post
          </p>
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            className="btn-secondary flex-1"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary flex-1 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loading size="sm" />
                {isEditing ? 'Salvando...' : 'Publicando...'}
              </>
            ) : (
              isEditing ? 'Salvar Alterações' : 'Publicar Post'
            )}
          </button>
        </div>
      </form>

      {isEditing && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-800">
            <span>⚠️</span>
            <strong>Editando post existente</strong>
          </div>
          <p className="text-sm text-yellow-700 mt-1">
            As alterações serão salvas imediatamente após confirmar.
          </p>
        </div>
      )}
    </Modal>
  );
};
