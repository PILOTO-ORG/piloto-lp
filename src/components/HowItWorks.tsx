import React from 'react';
import { MessageCircle, ArrowRight, Database, Check } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            Automação sem esforço: Fale, que o Piloto executa!
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Nosso agente de IA se conecta à API do seu sistema e permite que você execute
            tarefas apenas enviando mensagens de texto ou áudio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          <div className="bg-blue-50 p-6 sm:p-8 rounded-xl relative">
            <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
              1
            </div>
            <MessageCircle className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mb-4 sm:mb-6" />
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Envie um Comando</h3>
            <p className="text-gray-600">
              "Atualize o estoque do produto X para 50 unidades"
            </p>
          </div>

          <div className="bg-blue-50 p-6 sm:p-8 rounded-xl relative">
            <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
              2
            </div>
            <Database className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mb-4 sm:mb-6" />
            <h3 className="text-xl font-semibold mb-4 text-blue-700">IA Processa</h3>
            <p className="text-gray-600">
              O Piloto interpreta o comando e acessa a API do sistema
            </p>
          </div>

          <div className="bg-blue-50 p-6 sm:p-8 rounded-xl relative">
            <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
              3
            </div>
            <Check className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mb-4 sm:mb-6" />
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Tarefa Executada</h3>
            <p className="text-gray-600">
              A ação é realizada e você recebe a confirmação
            </p>
          </div>
        </div>

        <div className="bg-gray-900 text-white rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Exemplos de Uso</h3>
              <div className="space-y-8">
                <div>
                  <h4 className="text-blue-400 font-semibold mb-3">CRM (Pipedrive, HubSpot, RD Station)</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ArrowRight className="w-5 h-5 mr-2 mt-1 text-blue-400 flex-shrink-0" />
                      <span>"Atualize o status do lead João para 'Qualificado'"</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="w-5 h-5 mr-2 mt-1 text-blue-400 flex-shrink-0" />
                      <span>"Agende follow-up para próxima semana"</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-blue-400 font-semibold mb-3">ERP (TOTVS, SAP, Omie)</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ArrowRight className="w-5 h-5 mr-2 mt-1 text-blue-400 flex-shrink-0" />
                      <span>"Emita nota fiscal para o pedido #1234"</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="w-5 h-5 mr-2 mt-1 text-blue-400 flex-shrink-0" />
                      <span>"Atualize o estoque do produto XYZ"</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-blue-400 font-semibold mb-3">Financeiro (Conta Azul, Nibo)</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ArrowRight className="w-5 h-5 mr-2 mt-1 text-blue-400 flex-shrink-0" />
                      <span>"Gere relatório de faturamento mensal"</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="w-5 h-5 mr-2 mt-1 text-blue-400 flex-shrink-0" />
                      <span>"Faça conciliação bancária de hoje"</span>
                    </li>
                  </ul>
                </div>
              </div>
              <button 
                onClick={() => document.getElementById('integrations')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                Ver Mais Integrações
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="text-blue-400 font-semibold mb-3">E-commerce (VTEX, Shopify)</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="w-5 h-5 mr-2 mt-1 text-blue-400 flex-shrink-0" />
                    <span>"Atualize o status do pedido para 'Enviado'"</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-5 h-5 mr-2 mt-1 text-blue-400 flex-shrink-0" />
                    <span>"Ajuste o preço do produto ABC"</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-blue-400 font-semibold mb-3">RH (Gupy, Senior Sistemas)</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="w-5 h-5 mr-2 mt-1 text-blue-400 flex-shrink-0" />
                    <span>"Inicie processo de onboarding para Maria"</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-5 h-5 mr-2 mt-1 text-blue-400 flex-shrink-0" />
                    <span>"Agende férias do colaborador José"</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-blue-400 font-semibold mb-3">Suporte (Zendesk, Freshdesk)</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="w-5 h-5 mr-2 mt-1 text-blue-400 flex-shrink-0" />
                    <span>"Abra ticket para cliente com prioridade alta"</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-5 h-5 mr-2 mt-1 text-blue-400 flex-shrink-0" />
                    <span>"Encaminhe chamado #5678 para equipe técnica"</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;