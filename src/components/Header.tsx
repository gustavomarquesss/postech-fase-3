import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaUser, FaSignOutAlt, FaSignInAlt, FaPlus } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';

export const Header: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth();
    const { success } = useToast();

    const handleLogout = () => {
        logout();
        success('Logout realizado com sucesso!');
        
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleCreatePostClick = () => {
        navigate('/create-post');
    };

    return (
        <header className="bg-white/50 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <FaBook className="text-blue-600" />
                            Blog Professores
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        {isAuthenticated ? (
                            <>
                                <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                                    <FaUser className="text-gray-500" />
                                    <span>Olá, {user?.username}</span>
                                </div>

                                <button
                                    onClick={handleCreatePostClick}
                                    className="btn-primary text-sm flex items-center gap-2"
                                >
                                    <FaPlus />
                                    Novo Post
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="btn-secondary text-sm flex items-center gap-2"
                                >
                                    <FaSignOutAlt />
                                    Sair
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={handleLoginClick}
                                className="btn-primary text-sm flex items-center gap-2"
                            >
                                <FaSignInAlt />
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
