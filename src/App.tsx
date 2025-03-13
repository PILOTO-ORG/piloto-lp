import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy load pages for better initial load time
const HomePage = lazy(() => import('./pages/home'));
const NandaPage = lazy(() => import('./pages/nanda'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="min-h-screen bg-gray-900 flex items-center justify-center"><div className="text-white">Carregando...</div></div>}>
        <Routes>
          <Route path="/nanda" element={<NandaPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;