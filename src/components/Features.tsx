import React from 'react';
import { Bot, Zap, Command, Workflow, Settings } from 'lucide-react';

const Features = () => {
  return (
    <section id="features" className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Potencialize seus Processos com IA Avançada
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            O Piloto é a evolução da automação empresarial, combinando inteligência artificial 
            com simplicidade operacional. Transforme comandos simples em fluxos de trabalho 
            complexos, sem necessidade de conhecimento técnico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <Command className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-semibold mb-4">Comandos Intuitivos</h3>
            <p className="text-gray-600">
              Execute processos complexos com linguagem natural, eliminando a necessidade 
              de treinamentos extensivos
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <Workflow className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-semibold mb-4">Automação Inteligente</h3>
            <p className="text-gray-600">
              Crie fluxos de trabalho automatizados que se adaptam às suas necessidades, 
              reduzindo erros em 99%
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <Bot className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-semibold mb-4">Assistente Proativo</h3>
            <p className="text-gray-600">
              Antecipe necessidades e sugira otimizações com base em padrões de uso e 
              melhores práticas
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <Zap className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-semibold mb-4">Resposta Instantânea</h3>
            <p className="text-gray-600">
              Processe solicitações em tempo real, com resposta média de 1.5 segundos, 
              24 horas por dia
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <Settings className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-semibold mb-4">Integração Flexível</h3>
            <p className="text-gray-600">
              Conecte-se a qualquer sistema ou API, mantendo seus processos atuais 
              enquanto adiciona inteligência
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
