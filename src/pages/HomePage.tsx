import React, { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { LoginModal } from '../components/LoginModal';
import { RegisterModal } from '../components/RegisterModal';
import { PostFormModal } from '../components/PostFormModal';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { PostViewModal } from '../components/PostViewModal';
import { Loading, LoadingSkeleton } from '../components/Loading';
import { ToastContainer } from '../components/Toast';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { usePostsQuery, useSearchPostsQuery } from '../hooks/usePosts';
import type { Post } from '../types';

export const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showPostFormModal, setShowPostFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPostViewModal, setShowPostViewModal] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [deletingPost, setDeletingPost] = useState<Post | null>(null);
  const [viewingPost, setViewingPost] = useState<Post | null>(null);
  const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);
  const { isAuthenticated } = useAuth();
  const toast = useToast();

  const { data: allPosts, isLoading: isLoadingPosts, error: postsError } = usePostsQuery();
  const { 
    data: searchResults, 
    isLoading: isLoadingSearch, 
    error: searchError 
  } = useSearchPostsQuery(searchTerm);

  // Determina quais posts exibir
  const posts = useMemo(() => {
    if (searchTerm && searchTerm.length >= 2) {
      return searchResults || [];
    }
    return allPosts || [];
  }, [searchTerm, searchResults, allPosts]);

  const isLoading = isLoadingPosts || (isSearching && isLoadingSearch);

  // Mostra erro se houver
  React.useEffect(() => {
    if (postsError) {
      toast.error('Erro ao carregar posts. Tente novamente.');
    }
  }, [postsError, toast]);

  React.useEffect(() => {
    if (searchError) {
      toast.error('Erro ao buscar posts. Tente novamente.');
    }
  }, [searchError, toast]);

  const handleSearch = () => {
    if (searchTerm.length < 2) {
      toast.error('Digite pelo menos 2 caracteres para buscar');
      return;
    }
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 500);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setIsSearching(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const canEditPost = (): boolean => {
    // Usuário autenticado pode editar qualquer post
    return isAuthenticated;
  };

  const canDeletePost = (): boolean => {
    // Usuário autenticado pode excluir qualquer post
    return isAuthenticated;
  };


  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setShowPostFormModal(true);
  };

  const handleDeletePost = (post: Post) => {
    setDeletingPost(post);
    setShowDeleteModal(true);
  };

  const handleClosePostForm = () => {
    setShowPostFormModal(false);
    setEditingPost(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingPost(null);
  };

  const handleViewPost = (post: Post) => {
    const postIndex = posts.findIndex(p => p._id === post._id);
    setViewingPost(post);
    setCurrentPostIndex(postIndex);
    setShowPostViewModal(true);
  };

  const handleClosePostView = () => {
    setShowPostViewModal(false);
    setViewingPost(null);
  };

  const handleNextPost = React.useCallback(() => {
    if (currentPostIndex < posts.length - 1) {
      const nextIndex = currentPostIndex + 1;
      setCurrentPostIndex(nextIndex);
      setViewingPost(posts[nextIndex]);
    }
  }, [currentPostIndex, posts]);

  const handlePrevPost = React.useCallback(() => {
    if (currentPostIndex > 0) {
      const prevIndex = currentPostIndex - 1;
      setCurrentPostIndex(prevIndex);
      setViewingPost(posts[prevIndex]);
    }
  }, [currentPostIndex, posts]);

  const handleEditFromModal = (post: Post) => {
    setEditingPost(post);
    setShowPostFormModal(true);
  };

  const handleDeleteFromModal = (post: Post) => {
    setDeletingPost(post);
    setShowDeleteModal(true);
  };

  // Navegação por teclado no modal
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (showPostViewModal) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          handlePrevPost();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          handleNextPost();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          handleClosePostView();
        }
      }
    };

    if (showPostViewModal) {
      document.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [showPostViewModal, handleNextPost, handlePrevPost]);

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10 opacity-70">
        <img 
          src="/wallpaper-education.png" 
          alt="Educational background" 
          className="w-full h-full object-cover"
          style={{ minHeight: '100vh' }}
        />
      </div>
      
      <Header 
        onLoginClick={() => setShowLoginModal(true)}
        onCreatePostClick={() => setShowPostFormModal(true)}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">📚 Posts dos Professores</h1>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="input-field bg-white/70 backdrop-blur-md w-full"
              />
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleSearch}
                disabled={searchTerm.length < 2 || isSearching}
                className="btn-primary flex items-center gap-2"
              >
                {isSearching ? <Loading size="sm" /> : '🔍'}
                Buscar
              </button>
              {searchTerm && (
                <button 
                  onClick={clearSearch}
                  className="btn-secondary"
                >
                  Limpar
                </button>
              )}
            </div>
          </div>

          {searchTerm && (
            <p className="text-sm text-gray-600 mt-2">
              {isLoading ? 'Buscando...' : `${posts.length} resultado(s) para "${searchTerm}"`}
            </p>
          )}
        </div>

        {/* Posts Section */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm 
                ? 'Nenhum post encontrado' 
                : 'Ainda não há posts publicados'
              }
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? 'Tente buscar com outros termos ou limpe a busca para ver todos os posts.'
                : 'Seja o primeiro a compartilhar conhecimento com a comunidade!'
              }
            </p>
            {!searchTerm && isAuthenticated && (
              <button
                onClick={() => setShowPostFormModal(true)}
                className="btn-primary"
              >
                ✏️ Criar Primeiro Post
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post._id} className="card p-6 hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => handleViewPost(post)}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {post.titulo}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        👤 {post.autor}
                      </span>
                      <span className="flex items-center gap-1">
                        📅 {formatDate(post.createdAt)}
                      </span>
                    </div>
                  </div>
                  
                  {(canEditPost() || canDeletePost()) && (
                    <div className="flex items-center gap-2 ml-4">
                      {canEditPost() && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditPost(post);
                          }}
                          className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded"
                          title="Editar post"
                        >
                          ✏️
                        </button>
                      )}
                      {canDeletePost() && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePost(post);
                          }}
                          className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded"
                          title="Excluir post"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {post.conteudo.length > 300 
                      ? `${post.conteudo.substring(0, 300)}...` 
                      : post.conteudo
                    }
                  </p>
                </div>
                
                {post.conteudo.length > 300 && (
                  <div className="mt-4 text-right">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewPost(post);
                      }}
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      Clique para ler mais
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
      />
      
      <RegisterModal 
        isOpen={showRegisterModal} 
        onClose={() => setShowRegisterModal(false)} 
      />
      
      <PostFormModal 
        isOpen={showPostFormModal} 
        onClose={handleClosePostForm}
        post={editingPost}
      />
      
      <DeleteConfirmModal 
        isOpen={showDeleteModal} 
        onClose={handleCloseDeleteModal}
        post={deletingPost}
      />

      <PostViewModal 
        isOpen={showPostViewModal} 
        onClose={handleClosePostView}
        post={viewingPost}
        onEditPost={handleEditFromModal}
        onDeletePost={handleDeleteFromModal}
        onNextPost={handleNextPost}
        onPrevPost={handlePrevPost}
        hasNextPost={currentPostIndex < posts.length - 1}
        hasPrevPost={currentPostIndex > 0}
      />

      {/* Toast Container */}
      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />
    </div>
  );
};
