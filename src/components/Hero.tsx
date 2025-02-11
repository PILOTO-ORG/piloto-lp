import React from 'react';
import { ArrowRight, Bot, Zap, DollarSign } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const openCalendly = () => {
    window.open('http://calendly.com/luan-piloto', '_blank');
  };

  return (
    <div className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-white" id="home">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Revolucione sua Empresa
              <span className="text-blue-600 block mt-2">
                com Automação Inteligente
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Reduza custos em 60%, aumente a produtividade em 80% e elimine erros operacionais.
              O Piloto automatiza seus sistemas com IA avançada, transformando comandos simples em ações poderosas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={openCalendly}
                className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                Solicitar Demonstração
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-50 transition-colors"
              >
                Veja Como Funciona
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="AI Automation"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-4">
                <Bot className="text-blue-600 h-8 w-8" />
                <div>
                  <p className="font-semibold">Automação Inteligente</p>
                  <p className="text-sm text-gray-500">24/7 em operação</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Benefits */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8" id="benefits">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <Zap className="text-blue-600 h-8 w-8 mb-4" />
            <h3 className="font-semibold mb-2">80% mais produtividade</h3>
            <p className="text-gray-600">Automatize tarefas repetitivas e libere sua equipe para o que importa</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <Bot className="text-blue-600 h-8 w-8 mb-4" />
            <h3 className="font-semibold mb-2">Zero código necessário</h3>
            <p className="text-gray-600">Configure automações complexas com comandos simples em português</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <DollarSign className="text-blue-600 h-8 w-8 mb-4" />
            <h3 className="font-semibold mb-2">60% de economia</h3>
            <p className="text-gray-600">ROI comprovado em 8 semanas com redução de custos operacionais</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;