import React from 'react';
import { Bot, Zap, MessageSquare, Brain, Repeat } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            O Piloto - Inteligência Artificial para Automação Empresarial
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            O Piloto é um agente de IA personalizado que entende e executa tarefas dentro de qualquer sistema.
            Diferente de chatbots comuns, ele interage contextualmente com APIs, permitindo que usuários
            controlem sistemas via chat sem precisar navegar manualmente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <Bot className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-semibold mb-4">Texto em Ações</h3>
            <p className="text-gray-600">
              Converte comandos em texto para ações reais nos seus sistemas empresariais
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <Zap className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-semibold mb-4">Redução de Complexidade</h3>
            <p className="text-gray-600">
              Simplifica processos complexos em comandos simples e intuitivos
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <Repeat className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-semibold mb-4">Automação Inteligente</h3>
            <p className="text-gray-600">
              Automatiza processos repetitivos com precisão e eficiência
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <MessageSquare className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-semibold mb-4">Integração WhatsApp</h3>
            <p className="text-gray-600">
              Acesse e controle seus sistemas diretamente pelo WhatsApp
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <Brain className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-semibold mb-4">Treinamento Adaptável</h3>
            <p className="text-gray-600">
              IA que aprende e se adapta às necessidades específicas do seu negócio
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;