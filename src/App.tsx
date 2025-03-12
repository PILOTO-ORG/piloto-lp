import { useState, lazy } from 'react';
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
  // Sempre mostrar o chat, sem comportamento de scroll
  const [showChat] = useState(true);

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