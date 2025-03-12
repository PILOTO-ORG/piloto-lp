import React from 'react';
import { Clock, UserCheck, ShieldCheck, HeadphonesIcon } from 'lucide-react';

const Benefits = () => {
  return (
    <section id="benefits" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            Resultados Comprovados para seu Negócio
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Aumente sua produtividade e reduza custos operacionais em até 60%
            com automação inteligente que se paga em semanas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
            <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mb-4 sm:mb-6" />
            <h3 className="text-xl font-semibold mb-4 text-blue-700">ROI Garantido</h3>
            <p className="text-gray-600 mb-4">
              Economia mensal de 120+ horas em tarefas operacionais
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                Redução de 60% em custos operacionais
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                Retorno do investimento em 8 semanas
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                Eliminação de erros manuais
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
            <UserCheck className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mb-4 sm:mb-6" />
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Produtividade Maximizada</h3>
            <p className="text-gray-600 mb-4">
              Aumente a eficiência da sua equipe
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                Automação 24/7 sem interrupções
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                Execução simultânea de tarefas
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                Resposta instantânea a demandas
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
            <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mb-4 sm:mb-6" />
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Qualidade Superior</h3>
            <p className="text-gray-600 mb-4">
              99.9% de precisão em processos automatizados
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                Validação automática em tempo real
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                Conformidade garantida
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                Auditoria completa de ações
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
            <HeadphonesIcon className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mb-4 sm:mb-6" />
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Suporte Especializado</h3>
            <p className="text-gray-600 mb-4">
              Time dedicado com resposta em até 15 minutos
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                Atendimento 24/7 multicanal
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                Implementação em até 72h
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                Treinamento personalizado
              </li>
            </ul>
          </div>
        </div>

        {/* Testimonials */}
        {/* <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">O que nossos clientes dizem</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <blockquote className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-600 mb-4">
                "Com O Piloto, reduzimos o tempo de processamento de pedidos em 70%. A automação
                transformou completamente nossa operação."
              </p>
              <footer className="font-semibold">
                CEO - E-commerce Solutions
              </footer>
            </blockquote>
            <blockquote className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-600 mb-4">
                "A facilidade de uso e a integração com WhatsApp tornaram nossos processos muito
                mais eficientes. Recomendo fortemente!"
              </p>
              <footer className="font-semibold">
                Diretor de Operações - Tech Corp
              </footer>
            </blockquote>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Benefits;