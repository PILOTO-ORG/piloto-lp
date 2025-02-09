import React from 'react';
import { MessageCircle, ArrowRight, Database, Check } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Automação sem esforço: Fale, que o Piloto executa!
          </h2>
          <p className="text-xl text-gray-600">
            Nosso agente de IA se conecta à API do seu sistema e permite que você execute
            tarefas apenas enviando mensagens de texto ou áudio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-blue-50 p-8 rounded-xl relative">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <MessageCircle className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-semibold mb-4">Envie um Comando</h3>
            <p className="text-gray-600">
              "Atualize o estoque do produto X para 50 unidades"
            </p>
          </div>

          <div className="bg-blue-50 p-8 rounded-xl relative">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <Database className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-semibold mb-4">IA Processa</h3>
            <p className="text-gray-600">
              O Piloto interpreta o comando e acessa a API do sistema
            </p>
          </div>

          <div className="bg-blue-50 p-8 rounded-xl relative">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <Check className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-semibold mb-4">Tarefa Executada</h3>
            <p className="text-gray-600">
              A ação é realizada e você recebe a confirmação
            </p>
          </div>
        </div>

        <div className="bg-gray-900 text-white rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Exemplos de Uso</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 mr-2 mt-1 text-blue-400" />
                  <span>"Me envie um relatório de faturamento do mês"</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 mr-2 mt-1 text-blue-400" />
                  <span>"Marque uma reunião com o cliente João para sexta às 14h"</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 mr-2 mt-1 text-blue-400" />
                  <span>"Atualize o status do pedido #1234 para 'Entregue'"</span>
                </li>
              </ul>
              <button className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors inline-flex items-center">
                Ver Demonstração
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Dashboard Interface"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;