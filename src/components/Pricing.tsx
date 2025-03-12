import React from 'react';
import { Check } from 'lucide-react';

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Encontre o plano perfeito para transformar o atendimento da sua empresa
          </h2>
          <p className="text-xl text-gray-700">
            Planos sob medida para empresas que querem elevar seu atendimento com inteligência artificial
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 transition-all duration-300 hover:shadow-xl flex flex-col h-full">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">James</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">R$ 100</span>
              <span className="text-gray-600">/mês</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow text-gray-700">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                <span>Chat personalizado com a identidade da sua empresa</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                <span>Inteligência artificial pronta para atender seus clientes 24/7</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                <span>Fácil integração no seu site em poucos minutos</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                <span>Interface intuitiva e amigável</span>
              </li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-colors font-medium">
              Quero esse plano!
            </button>
          </div>

          {/* Professional Plan */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 relative flex flex-col h-full transform translate-y-[-8px]">
            <div className="absolute top-[-16px] left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span className="bg-yellow-100 text-yellow-800 text-sm font-bold px-4 py-1 rounded-full shadow-sm">
                Mais Popular
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">James Plus</h3>
            <div className="mb-6 text-white">
              <span className="text-4xl font-bold">R$ 500</span>
              <span className="opacity-90">/mês</span>
            </div>
            <ul className="space-y-4 mb-8 text-white flex-grow">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-white mr-2 flex-shrink-0 mt-1" />
                <span>Leve o James para o WhatsApp e conecte-se com seus clientes onde eles estão</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-white mr-2 flex-shrink-0 mt-1" />
                <span>Personalize o atendimento e ofereça uma experiência única</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-white mr-2 flex-shrink-0 mt-1" />
                <span>Automatize tarefas e execute ações com um simples comando</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-white mr-2 flex-shrink-0 mt-1" />
                <span>Integrações avançadas para otimizar sua operação</span>
              </li>
            </ul>
            <button className="w-full bg-white text-blue-600 py-3 rounded-full hover:bg-blue-50 transition-colors font-semibold">
              Quero esse plano!
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 transition-all duration-300 hover:shadow-xl flex flex-col h-full">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Enterprise</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">Sob consulta</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow text-gray-700">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <span>Solução totalmente customizada para sua empresa</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <span>Escalabilidade ilimitada: usuários sem restrição</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <span>Suporte premium 24/7 para garantir alto desempenho</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <span>Consultoria especializada para implementar IA com eficiência</span>
              </li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-colors font-medium">
              Converse com um especialista
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;