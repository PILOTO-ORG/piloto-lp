import { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import FloatingChat from './components/FloatingChat';
import NandaPromo from './components/NandaPromo';
// Lazy load secondary components for better initial load times
const About = lazy(() => import('./components/About'));
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const SystemIntegrations = lazy(() => import('./components/SystemIntegrations'));
const Benefits = lazy(() => import('./components/Benefits'));
const Pricing = lazy(() => import('./components/Pricing'));
const Contact = lazy(() => import('./components/Contact'));
const ChatSection = lazy(() => import('./components/ChatSection'));
// Nanda page
const NandaPage = lazy(() => import('./pages/nanda'));

function App() {
  // Sempre mostrar o chat, sem comportamento de scroll
  const [showChat] = useState(true);

  return (
    <Router>
      <Suspense fallback={<div className="min-h-screen bg-gray-900 flex items-center justify-center"><div className="text-white">Carregando...</div></div>}>
        <Routes>
          <Route path="/nanda" element={<NandaPage />} />
          <Route path="/" element={
            <div className="bg-gray-900 text-white min-h-screen">
              <Header />
                
              <main>
                <ChatSection minimized={!showChat} />
                <Hero />
                <About />
                <HowItWorks />
                <SystemIntegrations />
                <NandaPromo />
                <Benefits />
                <Pricing />
                <Contact />
              </main>
              
              {/* Floating WhatsApp button and Chat component */}
              <FloatingChat />
            </div>
          } />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;