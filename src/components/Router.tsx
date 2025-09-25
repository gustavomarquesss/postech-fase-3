import React, { useEffect, useState } from 'react';
import { HomePage } from '../pages/HomePage';

type Route = '/' | '/home';

export const Router: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>('/');

  useEffect(() => {
    const updateRoute = () => {
      const path = window.location.pathname as Route;
      
      if (path === '/') {
        window.history.pushState({}, '', '/home');
        setCurrentRoute('/home');
      } else {
        setCurrentRoute(path);
      }
    };

    updateRoute();

    const handlePopState = () => {
      updateRoute();
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigateTo = (route: Route) => {
    window.history.pushState({}, '', route);
    setCurrentRoute(route);
  };

  const renderRoute = () => {
    switch (currentRoute) {
      case '/home':
        return <HomePage />;
      case '/':
      default:
        navigateTo('/home');
        return <HomePage />;
    }
  };

  return <>{renderRoute()}</>;
};
