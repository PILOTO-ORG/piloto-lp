import React from 'react';
import { Bot, Zap, Command, Workflow, Settings, Brain, MessageCircle } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            Potencialize seus Processos com IA Avançada
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
            O Piloto é a evolução da automação empresarial, combinando inteligência artificial 
            com simplicidade operacional. Transforme comandos simples em fluxos de trabalho 
            complexos, sem necessidade de conhecimento técnico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <Command className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Comandos Intuitivos</h3>
            <p className="text-gray-600">
              Execute processos complexos com linguagem natural, eliminando treinamentos extensivos
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <Workflow className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Automação Inteligente</h3>
            <p className="text-gray-600">
              Reduza tempo de execução e elimine os erros operacionais
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <Brain className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-semibold mb-4 text-blue-700">IA Proativa</h3>
            <p className="text-gray-600">
              Antecipe necessidades e otimize processos com base em padrões de uso
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <Zap className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Resposta Instantânea</h3>
            <p className="text-gray-600">
              Processe solicitações em tempo real, com resposta média de 1.5 segundos
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <MessageCircle className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Multicanal</h3>
            <p className="text-gray-600">
              Acesse via WhatsApp, web ou integre aos seus sistemas existentes
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <Settings className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Integração Flexível</h3>
            <p className="text-gray-600">
              Conecte-se a qualquer sistema ou API mantendo seus processos atuais
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;