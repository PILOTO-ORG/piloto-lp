import { ArrowRight, Bot, Zap, DollarSign, Sparkles, Globe } from 'lucide-react';
import { memo } from 'react';

const Hero = memo(() => {
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
    <div className="pt-24 pb-16 bg-gradient-to-br from-gray-900 to-gray-800" id="home">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-200 leading-tight mb-6">
              Revolucione sua Empresa
              <span className="text-blue-400 block mt-2">
                com Automação Inteligente
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Reduza custos e aumente a produtividade, substituindo processos manuais por robôs inteligente. Elimine erros operacionais.
              O Piloto automatiza seus sistemas com as melhores tecnologias mais avançadas do mercado, transformando comandos simples em ações poderosas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={openCalendly}
                className="bg-blue-600 text-blue-200 px-8 py-3 rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center hover:scale-105 active:scale-95"
              >
                Solicitar Demonstração
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="border-2 border-blue-500 text-blue-400 px-8 py-3 rounded-full hover:bg-blue-900/30 transition-colors hover:scale-105 active:scale-95"
              >
                Veja Como Funciona
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="AI Automation"
              width="800"
              height="600"
              className="rounded-2xl shadow-2xl w-full h-auto"
              loading="eager"
            />
            <div 
              className="absolute -bottom-6 -left-6 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700"
            >
              <div className="flex items-center gap-4">
                <Bot className="text-blue-400 h-8 w-8" />
                <div>
                  <p className="font-semibold text-blue-200">Automação Inteligente</p>
                  <p className="text-sm text-gray-300">24/7 em operação</p>
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
            icon={<Zap className="text-blue-400 h-8 w-8 mb-4" />}
            title="80% mais produtividade"
            description="Automatize tarefas repetitivas e libere sua equipe para o que importa"
          />
          <BenefitCard 
            icon={<Bot className="text-blue-400 h-8 w-8 mb-4" />}
            title="Zero código necessário"
            description="Configure automações complexas com comandos simples em português"
          />
          <BenefitCard 
            icon={<DollarSign className="text-blue-400 h-8 w-8 mb-4" />}
            title="60% de economia"
            description="ROI comprovado em 8 semanas com redução de custos operacionais"
          />
        </div>

        {/* Additional Piloto Features */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FeatureCard 
            icon={<Sparkles className="text-blue-400 h-10 w-10 mb-6" />}
            title="Inteligência Artificial Avançada"
            description="O Piloto utiliza algoritmos de última geração para entender seus processos de negócio e automatizar fluxos de trabalho complexos sem necessidade de programação."
            features={[
              "Compreensão de linguagem natural em português",
              "Aprendizado contínuo com seus processos",
              "Tomada de decisões baseada em dados"
            ]}
          />
          <FeatureCard 
            icon={<Globe className="text-blue-400 h-10 w-10 mb-6" />}
            title="Integrações Simplificadas"
            description="Conecte todos os seus sistemas e aplicativos sem complicações. O Piloto se integra facilmente com as ferramentas que você já utiliza, criando automações entre elas."
            features={[
              "+200 integrações com sistemas populares",
              "API aberta para sistemas proprietários",
              "Sincronização de dados em tempo real"
            ]}
          />
        </div>
      </div>
    </div>
  );
});

// Componentes menores para melhorar a performance
const BenefitCard = memo(({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700 hover:-translate-y-1 transition-transform">
    {icon}
    <h3 className="font-semibold mb-2 text-blue-200">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
));

const FeatureCard = memo(({ icon, title, description, features }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}) => (
  <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-8 rounded-2xl shadow-lg border border-gray-700">
    {icon}
    <h3 className="text-2xl font-semibold mb-4 text-blue-200">{title}</h3>
    <p className="text-gray-300 mb-6">{description}</p>
    <ul className="space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <div className="bg-blue-500/20 p-1 rounded-full mr-3 mt-1">
            <svg className="h-3 w-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-gray-300">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
));

Hero.displayName = 'Hero';
BenefitCard.displayName = 'BenefitCard';
FeatureCard.displayName = 'FeatureCard';

export default Hero;