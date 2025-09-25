import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';

interface HeaderProps {
    onLoginClick: () => void;
    onCreatePostClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLoginClick, onCreatePostClick }) => {
    const { isAuthenticated, user, logout } = useAuth();
    const { success } = useToast();


    const handleLogout = () => {
        logout();
        success('Logout realizado com sucesso!');
        
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    return (
        <header className="bg-white/50 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            📚 Blog Professores
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        {isAuthenticated ? (
                            <>
                                <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                                    <span>👤</span>
                                    <span>Olá, {user?.username}</span>
                                </div>

                                <button
                                    onClick={onCreatePostClick}
                                    className="btn-primary text-sm"
                                >
                                    ✏️ Novo Post
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="btn-secondary text-sm"
                                >
                                    Sair
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={onLoginClick}
                                className="btn-primary text-sm"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
