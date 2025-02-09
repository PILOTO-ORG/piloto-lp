import React from 'react';
import { Check } from 'lucide-react';

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Escolha o plano ideal para sua empresa
          </h2>
          <p className="text-xl text-gray-600">
            Nossos planos são feitos sob medida para empresas de diferentes portes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-2xl font-bold mb-4">Básico</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">R$ 1.500</span>
              <span className="text-gray-600">/mês</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-2" />
                <span>Automação para 1 sistema</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-2" />
                <span>5 usuários inclusos</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-2" />
                <span>Suporte por email</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-2" />
                <span>Integrações básicas</span>
              </li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-colors">
              Começar Agora
            </button>
          </div>

          {/* Professional Plan */}
          <div className="bg-blue-600 rounded-2xl shadow-lg p-8 transform scale-105">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-100 text-blue-600 text-sm font-semibold px-4 py-1 rounded-full">
                Mais Popular
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Profissional</h3>
            <div className="mb-6 text-white">
              <span className="text-4xl font-bold">R$ 5.000</span>
              <span>/mês</span>
            </div>
            <ul className="space-y-4 mb-8 text-white">
              <li className="flex items-center">
                <Check className="w-5 h-5 mr-2" />
                <span>Automação para múltiplos sistemas</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 mr-2" />
                <span>100 usuários inclusos</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 mr-2" />
                <span>Suporte prioritário</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 mr-2" />
                <span>Integrações avançadas</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 mr-2" />
                <span>API personalizada</span>
              </li>
            </ul>
            <button className="w-full bg-white text-blue-600 py-3 rounded-full hover:bg-blue-50 transition-colors">
              Começar Agora
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">Sob consulta</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-2" />
                <span>Solução personalizada</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-2" />
                <span>Usuários ilimitados</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-2" />
                <span>Suporte 24/7</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-2" />
                <span>Consultoria dedicada</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-2" />
                <span>SLA garantido</span>
              </li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-colors">
              Falar com Consultor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;