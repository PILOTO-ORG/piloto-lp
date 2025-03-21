import AboutSection from './components/AboutSection';
import Hero from './components/Hero';
import FeaturesSection from './components/FeaturesSection';
import CTASection from './components/CTASection';
const Fabricio: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero
        title="Negociação inteligente para reduzir custos e ganhar qualidade"
        subtitle="Reduz custos identificando os melhores orçamentos e negociando automaticamente"
      />
      <AboutSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
};

export default Fabricio;
