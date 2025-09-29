import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaEdit } from 'react-icons/fa';
import { PostFormModal } from '../components/PostFormModal';
import { Loading } from '../components/Loading';
import { useAuth } from '../hooks/useAuth';
import { usePostQuery } from '../hooks/usePosts';

export const EditPostPage: React.FC = () => {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  
  const { data: post, isLoading: isPostLoading, error } = usePostQuery(postId || '');

  React.useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isAuthLoading, navigate]);

  React.useEffect(() => {
    if (error) {
      navigate('/');
    }
  }, [error, navigate]);

  const handleClose = () => {
    navigate('/');
  };

  const handleSuccess = () => {
    navigate('/');
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (isPostLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Post não encontrado</h2>
          <button 
            onClick={handleClose}
            className="btn-primary"
          >
            Voltar para Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 -z-10 opacity-70">
        <img 
          src="/wallpaper-education.png" 
          alt="Educational background" 
          className="w-full h-full object-cover"
          style={{ minHeight: '100vh' }}
        />
      </div>
      
      <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src="/minilogo.png" alt="Logo" className="h-8 w-8" />
              <h1 className="text-xl font-bold text-gray-900">Blog Professores</h1>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
            >
              <FaArrowLeft />
              Voltar para Home
            </button>
          </div>
        </div>
      </header>

      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
              <FaEdit className="text-blue-600" />
              Editar Post
            </h2>
            <p className="text-gray-600">Atualize as informações do seu post</p>
          </div>
          
          <div className="relative">
            <PostFormModal 
              isOpen={true} 
              onClose={handleClose}
              onSuccess={handleSuccess}
              post={post}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
