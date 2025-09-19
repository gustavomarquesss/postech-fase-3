import React from 'react';
import { Modal } from './Modal';
import { Loading } from './Loading';
import { useDeletePostMutation } from '../hooks/usePosts';
import { useToast } from '../hooks/useToast';
import type { Post } from '../types';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ 
  isOpen, 
  onClose, 
  post 
}) => {
  const deletePostMutation = useDeletePostMutation();
  const { success, error } = useToast();
  const isLoading = deletePostMutation.isPending;

  const handleDelete = async () => {
    if (!post) return;

    try {
      await deletePostMutation.mutateAsync(post._id);
      success('Post excluído com sucesso!');
      onClose();
    } catch (err) {
      console.error('Erro ao excluir post:', err);
      error('Erro ao excluir post. Tente novamente.');
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Confirmar Exclusão"
      size="sm"
      closeOnOverlayClick={!isLoading}
      closeOnEsc={!isLoading}
    >
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-4xl mb-4">🗑️</div>
          <p className="text-gray-700">
            Tem certeza de que deseja excluir o post{' '}
            <strong className="text-gray-900">"{post?.titulo}"</strong>?
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-center gap-2 text-red-800">
            <span>⚠️</span>
            <strong>Atenção!</strong>
          </div>
          <p className="text-sm text-red-700 mt-1">
            Esta ação não pode ser desfeita. O post será permanentemente removido.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            className="btn-secondary flex-1"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
            className="btn-danger flex-1 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loading size="sm" />
                Excluindo...
              </>
            ) : (
              <>
                🗑️ Excluir Post
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};
