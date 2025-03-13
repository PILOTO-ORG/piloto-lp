import React, { useState, lazy } from 'react';
import Header from '../../components/Header';
import FloatingChat from '../../components/FloatingChat';
import Hero from '../../components/Hero';

// Lazy load components para melhor performance na carga inicial
const About = lazy(() => import('../../components/About'));
const HowItWorks = lazy(() => import('../../components/HowItWorks'));
const SystemIntegrations = lazy(() => import('../../components/SystemIntegrations'));
const NandaPromo = lazy(() => import('../../components/NandaPromo'));
const Benefits = lazy(() => import('../../components/Benefits'));
const Pricing = lazy(() => import('../../components/Pricing'));
const Contact = lazy(() => import('../../components/Contact'));
const ChatSection = lazy(() => import('../../components/ChatSection'));

const HomePage: React.FC = () => {
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
        <NandaPromo />
        <Benefits />
        <Pricing />
        <Contact />
      </main>
      
      {/* Floating WhatsApp button and Chat component */}
      <FloatingChat />
    </div>
  );
};

export default HomePage;
