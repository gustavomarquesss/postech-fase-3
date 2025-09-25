import React from 'react';
import { Modal } from './Modal';
import { useAuth } from '../hooks/useAuth';
import type { Post } from '../types';

interface PostViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
  onEditPost?: (post: Post) => void;
  onDeletePost?: (post: Post) => void;
  onNextPost?: () => void;
  onPrevPost?: () => void;
  hasNextPost?: boolean;
  hasPrevPost?: boolean;
}

export const PostViewModal: React.FC<PostViewModalProps> = ({
  isOpen,
  onClose,
  post,
  onEditPost,
  onDeletePost,
  onNextPost,
  onPrevPost,
  hasNextPost,
  hasPrevPost
}) => {
  const { isAuthenticated } = useAuth();

  if (!post) return null;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleEditClick = () => {
    if (onEditPost) {
      onEditPost(post);
      onClose();
    }
  };

  const handleDeleteClick = () => {
    if (onDeletePost) {
      onDeletePost(post);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      size="xl"
      closeOnOverlayClick={true}
      closeOnEsc={true}
    >
      <div className="max-h-[80vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-6 pb-4 border-b border-gray-200">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              {post.titulo}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                👤 <strong>{post.autor}</strong>
              </span>
              <span className="flex items-center gap-2">
                📅 {formatDate(post.createdAt)}
              </span>
            </div>
          </div>

          {isAuthenticated && (
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={handleEditClick}
                className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-full transition-colors"
                title="Editar post"
              >
                ✏️
              </button>
              <button
                onClick={handleDeleteClick}
                className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-full transition-colors"
                title="Excluir post"
              >
                🗑️
              </button>
            </div>
          )}
        </div>

        <div className="prose prose-lg max-w-none mb-6">
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-justify">
            {post.conteudo}
          </div>
        </div>

        {(hasPrevPost || hasNextPost) && (
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button
              onClick={onPrevPost}
              disabled={!hasPrevPost}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${hasPrevPost
                ? 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
                : 'text-gray-400 cursor-not-allowed'
                }`}
            >
              ← Post Anterior
            </button>

            <div className="text-sm text-gray-500">
              Use as setas do teclado para navegar
            </div>

            <button
              onClick={onNextPost}
              disabled={!hasNextPost}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${hasNextPost
                ? 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
                : 'text-gray-400 cursor-not-allowed'
                }`}
            >
              Próximo Post →
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};
