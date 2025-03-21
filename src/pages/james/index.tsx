import AboutSection from './components/AboutSection';
import Hero from './components/Hero';
import FeaturesSection from './components/FeaturesSection';
import CTASection from './components/CTASection';
const James: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero
        title="Automatize seus sistemas fazendo TUDO pelo whatsapp"
        subtitle="Integração processos e geração de relatórios automáticos, otimizando o tempo e a gestão"
      />
      <AboutSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
};

export default James;
