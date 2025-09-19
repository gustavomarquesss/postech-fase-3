import React, { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { LoginModal } from '../components/LoginModal';
import { RegisterModal } from '../components/RegisterModal';
import { PostFormModal } from '../components/PostFormModal';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
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
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [deletingPost, setDeletingPost] = useState<Post | null>(null);

  const { isAuthenticated, user } = useAuth();
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
  }, [postsError, toast.error]);

  React.useEffect(() => {
    if (searchError) {
      toast.error('Erro ao buscar posts. Tente novamente.');
    }
  }, [searchError, toast.error]);

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

  const canEditPost = (post: Post): boolean => {
    return isAuthenticated && user?.username === post.autor;
  };

  const canDeletePost = (post: Post): boolean => {
    return isAuthenticated && user?.username === post.autor;
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
              <article key={post._id} className="card p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
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
                  
                  {(canEditPost(post) || canDeletePost(post)) && (
                    <div className="flex items-center gap-2 ml-4">
                      {canEditPost(post) && (
                        <button
                          onClick={() => handleEditPost(post)}
                          className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded"
                          title="Editar post"
                        >
                          ✏️
                        </button>
                      )}
                      {canDeletePost(post) && (
                        <button
                          onClick={() => handleDeletePost(post)}
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
                    <span className="text-sm text-gray-500">Clique para ler mais</span>
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
        onShowRegister={() => setShowRegisterModal(true)}
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

      {/* Toast Container */}
      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />
    </div>
  );
};
