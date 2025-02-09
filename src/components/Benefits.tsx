import React from 'react';
import { Clock, UserCheck, ShieldCheck, HeadphonesIcon } from 'lucide-react';

const Benefits = () => {
  return (
    <section id="benefits" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Transforme produtividade em realidade com O Piloto
          </h2>
          <p className="text-xl text-gray-600">
            Empresas perdem tempo e dinheiro lidando com sistemas complexos.
            O Piloto simplifica tudo com comandos inteligentes e automação total.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <Clock className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-semibold mb-4">Economia de Tempo</h3>
            <p className="text-gray-600 mb-4">
              Reduz em até 80% o tempo gasto em tarefas manuais
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                Automação de processos repetitivos
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                Execução rápida de comandos
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                Respostas instantâneas
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <UserCheck className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-semibold mb-4">Experiência do Usuário Melhorada</h3>
            <p className="text-gray-600 mb-4">
              Interaja sem precisar estudar os sistemas
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                Interface conversacional intuitiva
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                Comandos em linguagem natural
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                Aprendizado rápido
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <ShieldCheck className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-semibold mb-4">Mais Eficiência e Menos Erros</h3>
            <p className="text-gray-600 mb-4">
              Automação elimina processos manuais repetitivos
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                Validação automática de dados
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                Processos padronizados
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                Rastreamento de ações
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <HeadphonesIcon className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-semibold mb-4">Suporte 24/7</h3>
            <p className="text-gray-600 mb-4">
              Atendimento contínuo via WhatsApp e Web
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                Respostas instantâneas
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                Múltiplos canais de contato
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                Equipe especializada
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