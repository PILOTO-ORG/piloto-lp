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
import { motion } from 'framer-motion';
import LuanaPromo from '../../components/LuanaPromo';
// import Parceiros from '../../components/Parceiros';

const HomePage: React.FC = () => {
  // Sempre mostrar o chat, sem comportamento de scroll
  const [showChat] = useState(true);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
        
      <main>
        <Hero />
                <NandaPromo />
        <LuanaPromo />

        <JamesPromo />
        <HowItWorks />
        <SystemIntegrations />
        {/* <FabricioPromo /> */}
        {/* <Benefits />
                <About /> */}
        {/* <Parceiros /> */}
        {/* <Pricing /> */}
        <Contact />
   
        {/* <ChatSection minimized={!showChat} /> */}

      </main>
      
      {/* Floating WhatsApp button and Chat component */}
      <FloatingChat />
      
      {/* WhatsApp button fixed at bottom right */}
      <a
        href="https://wa.me/5548998589586?text=Ol%C3%A1%21%20Estou%20entrando%20em%20contato%20atrav%C3%A9s%20do%20site."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-colors"
        >
          {/* WhatsApp icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </motion.button>
      </a>
    </div>
  );
};

export default HomePage;
