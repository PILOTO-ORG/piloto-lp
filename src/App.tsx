import React from 'react';
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';
import Nanda from './pages/nanda';
import Home from './pages/home';
import { trackPageView } from './utils/analytics';

// Componente de rastreamento analytics
const RouteChangeTracker: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    // Rastrear pageview quando a localização muda
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

// Configuração de rotas
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <RouteChangeTracker />
        <Home />
      </>
    ),
  },
  {
    path: '/nanda',
    element: (
      <>
        <RouteChangeTracker />
        <Nanda />
      </>
    ),
  },
  // Adicione outras rotas conforme necessário
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;