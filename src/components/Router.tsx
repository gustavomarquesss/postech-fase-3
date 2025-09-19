import React, { useEffect, useState } from 'react';
import { HomePage } from '../pages/HomePage';

type Route = '/' | '/home';

export const Router: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>('/');

  useEffect(() => {
    // Função para atualizar a rota baseada na URL atual
    const updateRoute = () => {
      const path = window.location.pathname as Route;
      
      // Redirecionar raiz para /home
      if (path === '/') {
        window.history.pushState({}, '', '/home');
        setCurrentRoute('/home');
      } else {
        setCurrentRoute(path);
      }
    };

    // Atualizar rota inicial
    updateRoute();

    // Escutar mudanças na URL (botão voltar/avançar do browser)
    const handlePopState = () => {
      updateRoute();
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Função para navegar programaticamente
  const navigateTo = (route: Route) => {
    window.history.pushState({}, '', route);
    setCurrentRoute(route);
  };

  // Renderizar componente baseado na rota
  const renderRoute = () => {
    switch (currentRoute) {
      case '/home':
        return <HomePage />;
      case '/':
      default:
        // Fallback - redirecionar para home se não encontrar rota
        navigateTo('/home');
        return <HomePage />;
    }
  };

  return <>{renderRoute()}</>;
};
