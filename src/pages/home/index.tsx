import React, { useState } from 'react';
import Header from '../../components/Header';
import ChatSection from '../../components/ChatSection';
import Hero from '../../components/Hero';
import About from '../../components/About';
import HowItWorks from '../../components/HowItWorks';
import SystemIntegrations from '../../components/SystemIntegrations';
import NandaPromo from '../../components/NandaPromo';
import JamesPromo from '../../components/JamesPromo';
import FabricioPromo from '../../components/FabricioPromo';
import Benefits from '../../components/Benefits';
import Pricing from '../../components/Pricing';
import Contact from '../../components/Contact';
import FloatingChat from '../../components/FloatingChat';

const HomePage: React.FC = () => {
  // Sempre mostrar o chat, sem comportamento de scroll
  const [showChat] = useState(true);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
        
      <main>
        <ChatSection minimized={!showChat} />
        <Hero title={''} />
        <About />
        <HowItWorks />
        <SystemIntegrations />
        <NandaPromo />
        <JamesPromo />
        <FabricioPromo />
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
