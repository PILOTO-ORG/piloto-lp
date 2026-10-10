import { MessageCircle, Database, Check, Mic } from 'lucide-react';

// Esta seção tinha, depois dos três passos, um bloco escuro "Exemplos de Uso"
// com seis categorias (CRM, ERP, Financeiro, E-commerce, RH, Suporte) e os
// mesmos nomes de sistema que a seção SystemIntegrations lista logo abaixo —
// duplicata quase literal. Fechava com um botão "Ver Mais Integrações" que só
// rolava a página até a própria duplicata.
//
// O bloco saiu. O que valia nele eram os COMANDOS, que não se repetem em lugar
// nenhum: viraram a tira compacta abaixo dos passos, sem repetir nome de
// fornecedor (isso é assunto da seção de integrações, e lá está rotulado como
// sob medida).

const COMANDOS = [
  'Atualize o estoque do produto X para 50 unidades',
  'Agende follow-up com o João para a próxima semana',
  'Gere o relatório de faturamento do mês',
  'Abra um chamado para esse cliente com prioridade alta',
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            Você fala, a Piloto executa
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            O agente de IA se conecta à API do seu sistema e executa a tarefa a
            partir de uma mensagem de texto ou de áudio — sem você abrir outra
            tela.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          <div className="bg-blue-50 p-6 sm:p-8 rounded-xl relative">
            <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
              1
            </div>
            <MessageCircle className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mb-4 sm:mb-6" />
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Envie um comando</h3>
            <p className="text-gray-600">
              Escreva em português, do jeito que você falaria com alguém da
              equipe. Áudio também serve: a mensagem é transcrita.
            </p>
          </div>

          <div className="bg-blue-50 p-6 sm:p-8 rounded-xl relative">
            <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
              2
            </div>
            <Database className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mb-4 sm:mb-6" />
            <h3 className="text-xl font-semibold mb-4 text-blue-700">A IA interpreta</h3>
            <p className="text-gray-600">
              O agente diz o que entendeu — o quê, para quando, quantos, onde —
              e chama a API do sistema com esses dados.
            </p>
          </div>

          <div className="bg-blue-50 p-6 sm:p-8 rounded-xl relative">
            <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
              3
            </div>
            <Check className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mb-4 sm:mb-6" />
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Você aprova</h3>
            <p className="text-gray-600">
              Nada vira pedido, orçamento ou resposta ao cliente sem o seu aval.
              Depois de aprovado, a ação é executada e confirmada.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-gray-900 text-white rounded-2xl p-8 md:p-10">
          <div className="flex items-center mb-6">
            <Mic className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0" aria-hidden="true" />
            <h3 className="text-xl font-bold">Comandos que já funcionam assim</h3>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {COMANDOS.map((comando) => (
              <li
                key={comando}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-200"
              >
                <span className="text-gray-500 mr-1" aria-hidden="true">
                  “
                </span>
                {comando}
                <span className="text-gray-500 ml-1" aria-hidden="true">
                  ”
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
