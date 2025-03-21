import { ArrowRight, Bot, Zap, DollarSign, Sparkles, Globe } from 'lucide-react';
import { memo } from 'react';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaText?: string;
  onClick?: () => void;
}

const Hero = memo(({ title, subtitle, backgroundImage, ctaText, onClick }: HeroProps) => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // 80px de offset para compensar o header
        behavior: 'smooth'
      });
    }
  };

  const openCalendly = () => {
    window.open('http://calendly.com/luan-piloto', '_blank');
  };

  return (
    <section className="hero relative overflow-hidden">
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
      )}
      <div className="relative container mx-auto px-4 py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Revolucione sua Empresa
            </h1>
            <p className="text-xl sm:text-2xl text-white mb-8">
              com Automação Inteligente
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={openCalendly}
                className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center hover:scale-105 active:scale-95"
              >
                Solicitar Demonstração
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="border-2 border-blue-500 text-white px-8 py-4 rounded-full hover:bg-blue-600 hover:border-blue-600 transition-colors hover:scale-105 active:scale-95"
              >
                Veja Como Funciona
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 relative mt-6 lg:mt-0">
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="AI Automation"
              width="800"
              height="600"
              className="rounded-2xl shadow-2xl w-full h-auto"
              loading="eager"
            />
            <div 
              className="absolute -bottom-6 -left-6 bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200 hidden sm:block"
            >
              <div className="flex items-center gap-4">
                <Bot className="text-blue-600 h-8 w-8" />
                <div>
                  <p className="font-semibold text-blue-700">Automação Inteligente</p>
                  <p className="text-sm text-gray-700">24/7 em operação</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Benefits */}
        <div 
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8" 
          id="benefits"
        >
          <BenefitCard 
            icon={<Zap className="text-blue-600 h-8 w-8 mb-4" />}
            title="mais produtividade"
            description="Automatize tarefas repetitivas e libere sua equipe para o que importa"
          />
          <BenefitCard 
            icon={<Bot className="text-blue-600 h-8 w-8 mb-4" />}
            title="Comandos Intuitivos"
            description="Configure automações complexas com comandos simples em português"
          />
          <BenefitCard 
            icon={<DollarSign className="text-blue-600 h-8 w-8 mb-4" />}
            title="ROI Garantido"
            description="ROI comprovado em 8 semanas com redução de custos operacionais"
          />
        </div>

        {/* Additional Piloto Features */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FeatureCard 
            icon={<Sparkles className="text-blue-600 h-10 w-10 mb-6" />}
            title="Inteligência Artificial Avançada"
            description="O Piloto utiliza algoritmos de última geração para entender seus processos de negócio e automatizar fluxos de trabalho complexos sem necessidade de programação."
            features={[
              "Envie um Comando",
              "Aprendizado contínuo com seus processos",
              "Tomada de decisões baseada em dados"
            ]}
          />
          <FeatureCard 
            icon={<Globe className="text-blue-600 h-10 w-10 mb-6" />}
            title="Integrações Simplificadas"
            description="Conecte todos os seus sistemas e aplicativos sem complicações. O Piloto se integra facilmente com as ferramentas que você já utiliza, criando automações entre elas."
            features={[
              "Sistemas Populares:",
              "API aberta para sistemas proprietários",
              "Sincronização de dados em tempo real"
            ]}
          />
        </div>
      </div>
    </section>
  );
});

// Componentes menores para melhorar a performance
const BenefitCard = memo(({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:-translate-y-1 transition-transform">
    {icon}
    <h3 className={`font-semibold mb-2 text-blue-700`}>{title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
));

const FeatureCard = memo(({ icon, title, description, features }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
    {icon}
    <h3 className="text-2xl font-semibold mb-4 text-blue-700">{title}</h3>
    <p className="text-gray-700 mb-6">{description}</p>
    <ul className="space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
            <svg className="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className={`${feature === "Envie um Comando" || feature === "Sistemas Populares:" ? "text-black font-medium" : "text-gray-700"}`}>{feature}</span>
        </li>
      ))}
    </ul>
  </div>
));

Hero.displayName = 'Hero';
BenefitCard.displayName = 'BenefitCard';
FeatureCard.displayName = 'FeatureCard';

export default Hero;