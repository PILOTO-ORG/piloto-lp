import React from 'react';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';
import FabricioChat from '../../components/FabricioChat';

const Fabricio: React.FC = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <main>
        <Hero
          title="Negociação inteligente para reduzir custos e ganhar qualidade"
          subtitle="Reduz custos identificando os melhores orçamentos e negociando automaticamente"
        />
        <AboutSection />
        <FeaturesSection />
      </main>
      
      {/* Chat flutuante do Fabricio (versão verde) */}
      <div className="fixed bottom-6 right-6 z-50">
        <FabricioChat showWhatsAppButton={true} />
      </div>
    </div>
  );
};

export default Fabricio;