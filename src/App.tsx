import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Nanda from './pages/nanda';
import James from './pages/james';
import Fabricio from './pages/fabricio';
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <RouteChangeTracker />
            <Home />
          </>
        } />
        <Route path="/nanda" element={
          <>
            <RouteChangeTracker />
            <Nanda />
          </>
        } />
        <Route path="/james" element={
          <>
            <RouteChangeTracker />
            <James />
          </>
        } />
        <Route path="/fabricio" element={
          <>
            <RouteChangeTracker />
            <Fabricio />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;