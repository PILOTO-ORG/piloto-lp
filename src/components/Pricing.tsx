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
          {/* Plano Nanda */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 transition-all duration-300 hover:shadow-xl flex flex-col h-full">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Nanda</h3>
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
                <span>Atendimento 24/7 com inteligência artificial</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                <span>Fácil integração no seu site e WhatsApp</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                <span>Interface intuitiva e amigável</span>
              </li>
            </ul>
            <a
              href="https://buy.stripe.com/14k7t074j5YJbT23cc"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-colors font-medium text-center"
            >
              Assinar agora
            </a>
          </div>

          {/* Plano James */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 relative flex flex-col h-full transform translate-y-[-8px]">
            <div className="absolute top-[-16px] left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span className="bg-yellow-100 text-yellow-800 text-sm font-bold px-4 py-1 rounded-full shadow-sm">
                Mais Popular
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">James</h3>
            <div className="mb-6 text-white">
              <span className="text-4xl font-bold">R$ 500</span>
              <span className="opacity-90">/mês</span>
            </div>
            <ul className="space-y-4 mb-8 text-white flex-grow">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-white mr-2 flex-shrink-0 mt-1" />
                <span>Conecte o James ao WhatsApp e atenda seus clientes onde eles estiverem</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-white mr-2 flex-shrink-0 mt-1" />
                <span>Personalize o atendimento para uma experiência única</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-white mr-2 flex-shrink-0 mt-1" />
                <span>Automatize tarefas e execute ações com comandos simples</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-white mr-2 flex-shrink-0 mt-1" />
                <span>Integração via API com seus sistemas de gestão</span>
              </li>
            </ul>
            <a
              href="https://buy.stripe.com/9AQ3cKewL2Mx0ak289"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white text-blue-600 py-3 rounded-full hover:bg-blue-50 transition-colors font-semibold text-center"
            >
              Assinar agora
            </a>
          </div>

          {/* Plano Fabricio */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 transition-all duration-300 hover:shadow-xl flex flex-col h-full">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Fabricio</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">R$ 2000</span>
              <span className="text-gray-600">/mês</span>
            </div>

          <ul className="space-y-4 mb-8 flex-grow text-gray-700">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <span>Conecta ao ERP para comparar preços e negociar automaticamente</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <span>Personalize os filtros para encontrar os melhores orçamentos</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <span>Comparador inteligente que seleciona os melhores fornecedores</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <span>Consultoria especializada para otimizar suas compras</span>
              </li>
            </ul>
            <a
              href="https://buy.stripe.com/14k7t074j5YJbT23cc"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-colors font-medium text-center"
            >
              Assinar agora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
