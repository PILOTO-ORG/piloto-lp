import React from 'react';
import NandaHeader from './components/NandaHeader';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import TransformSection from './components/TransformSection';
import FeaturesSection from './components/FeaturesSection';
import SuccessSection from './components/SuccessSection';
import FaqSection from './components/FaqSection';
import CTA from './components/CTA';
import Footer from './components/Footer';
import NandaChat from './components/NandaChat';

const NandaPage: React.FC = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <NandaHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <TransformSection />
        <FeaturesSection />
        <SuccessSection />
        <FaqSection />
        <CTA />
      </main>
      <Footer />
      
      {/* Chat flutuante da Nanda (versão roxa) */}
      <div className="fixed bottom-6 right-6 z-50">
        <NandaChat showWhatsAppButton={true} />
      </div>
    </div>
  );
};

export default NandaPage;
