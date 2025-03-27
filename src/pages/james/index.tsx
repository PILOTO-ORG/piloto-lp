import React from 'react';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';
import JamesChat from '../../components/JamesChat';

const James: React.FC = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <main>
        <Hero
          title="Automatize seus sistemas fazendo TUDO pelo WhatsApp"
          subtitle="Integração de processos e geração de relatórios automáticos, otimizando o tempo e a gestão"
          imageSrc="/images/whatsapp-automation.jpg"
          imageAlt="Automação via WhatsApp"
          ctaText="Solicitar Demonstração"
          onClick={() => window.open('https://calendly.com/luan-piloto', '_blank')}
        />
        <AboutSection />
        <FeaturesSection />
      </main>
      
      {/* Chat flutuante do James (versão azul) */}
      <div className="fixed bottom-6 right-6 z-50">
        <JamesChat showWhatsAppButton={true} />
      </div>
    </div>
  );
};

export default James;