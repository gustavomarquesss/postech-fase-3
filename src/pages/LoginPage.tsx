import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSignInAlt } from 'react-icons/fa';
import { LoginModal } from '../components/LoginModal';
import { useAuth } from '../hooks/useAuth';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  React.useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleClose = () => {
    navigate('/');
  };

  const handleLoginSuccess = () => {
    navigate('/');
  };

  if (isLoading && isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecionando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 -z-10 opacity-70">
        <img 
          src="/book-5q6xbfxwtbme5kaj.jpg" 
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

      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
              <FaSignInAlt className="text-blue-600" />
              Entrar
            </h2>
            <p className="text-gray-600">Faça login para criar e gerenciar posts</p>
          </div>
          
          <div className="relative">
            <LoginModal 
              isOpen={true} 
              onClose={handleClose}
              onLoginSuccess={handleLoginSuccess}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
