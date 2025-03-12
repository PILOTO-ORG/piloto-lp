import { useState, useEffect, lazy } from 'react';
import debounce from 'lodash.debounce';
import Header from './components/Header';
import Hero from './components/Hero';
import FloatingChat from './components/FloatingChat';
// Lazy load secondary components for better initial load times
const About = lazy(() => import('./components/About'));
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const SystemIntegrations = lazy(() => import('./components/SystemIntegrations'));
const Benefits = lazy(() => import('./components/Benefits'));
const Pricing = lazy(() => import('./components/Pricing'));
const Contact = lazy(() => import('./components/Contact'));
const ChatSection = lazy(() => import('./components/ChatSection'));

function App() {
  const [showChat, setShowChat] = useState(true);

  useEffect(() => {
    // Usar uma função debounce para melhorar a performance durante a rolagem
    const handleScroll = debounce(() => {
      // Usando um valor fixo de pixels para melhorar a confiabilidade
      if (window.scrollY > 300) {
        setShowChat(false);
      } else {
        setShowChat(true);
      }
    }, 100); // 100ms de debounce para evitar cálculos excessivos

    window.addEventListener('scroll', handleScroll);
    
    // Limpar o event listener quando o componente for desmontado
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
        
      <main>
        <ChatSection minimized={!showChat} />
        <Hero />
        <About />
        <HowItWorks />
        <SystemIntegrations />
        <Benefits />
        <Pricing />
        <Contact />
      </main>
      
      {/* Floating WhatsApp button and Chat component */}
      <FloatingChat />
    </div>
  );
}

export default App;