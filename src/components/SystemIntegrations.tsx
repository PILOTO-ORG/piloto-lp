import { Check, Wrench } from 'lucide-react';

// ⚠️ ESTA SEÇÃO NÃO É CATÁLOGO DE CONECTOR PRONTO.
//
// A lista abaixo são os setores e sistemas para os quais se constrói integração
// SOB ENCOMENDA, dentro do escopo de um projeto. Não existe botão "conectar ao
// SAP" dentro do app, e a página não pode dar a entender que existe — o visitante
// que acreditasse nisso chegaria na reunião com a expectativa errada.
//
// Por isso: o título diz "sob medida", cada cartão carrega o selo, e o rodapé da
// seção manda falar com a gente em vez de mandar clicar. O que JÁ está ligado e
// funcionando (WhatsApp pela Cloud API, Receita Federal, Google Places, PNCP,
// gov.br, Google Agenda) está na seção "O que já está no app" e no herói, que é
// onde cabe afirmação no presente.
//
// Se um destes virar conector de verdade dentro do app, ele sai daqui e entra lá.

const SystemIntegrations = () => {
  const integrations = [
    {
      category: "CRM",
      systems: ["Pipedrive", "HubSpot", "RD Station"],
      examples: ["Automação de follow-ups", "Qualificação de leads", "Atualização de status"]
    },
    {
      category: "ERP",
      systems: ["TOTVS", "SAP", "Omie"],
      examples: ["Atualização de estoques", "Emissão de notas fiscais", "Gerenciamento de pedidos"]
    },
    {
      category: "E-commerce",
      systems: ["VTEX", "Shopify", "WooCommerce"],
      examples: ["Processamento de pedidos", "Atualização de preços", "Rastreamento de entregas"]
    },
    {
      category: "Suporte",
      systems: ["Zendesk", "Freshdesk", "Intercom"],
      examples: ["Respostas automáticas", "Abertura de tickets", "Priorização de atendimentos"]
    },
    {
      category: "Financeiro",
      systems: ["Conta Azul", "Nibo", "QuickBooks"],
      examples: ["Conciliação bancária", "Emissão de cobranças", "Relatórios automáticos"]
    },
    {
      category: "RH",
      systems: ["Gupy", "Senior Sistemas", "Kenoby"],
      examples: ["Automação de onboarding", "Gestão de férias", "Folha de pagamento"]
    },
    {
      category: "Saúde",
      systems: ["Doctoralia", "Tasy", "MV"],
      examples: ["Agendamento automático", "Gestão de prontuários", "Lembretes de consulta"]
    },
    {
      category: "Logística",
      systems: ["Rappi", "Loggi", "Fretebras"],
      examples: ["Criação de fretes", "Rastreamento em tempo real", "Otimização de rotas"]
    },
    {
      category: "Educação",
      systems: ["Moodle", "Google Classroom", "Canvas"],
      examples: ["Correção automática", "Gestão de presença", "Envio de materiais"]
    }
  ];

  return (
    <section className="py-20 bg-white" id="integrations">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Integração com o seu sistema, sob medida
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            Estes são os setores e sistemas para os quais já construímos
            integração <strong>sob encomenda</strong>, pela API do cliente e
            dentro do escopo do projeto.
          </p>
          <p className="text-base text-gray-500">
            Não é conector de prateleira: não existe um botão no app que liga no
            TOTVS sozinho. É trabalho de desenvolvimento, com prazo e escopo
            combinados antes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {integrations.map((integration, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-2 mb-4">
                <h3 className="text-xl font-semibold text-blue-600">
                  {integration.category}
                </h3>
                <span className="inline-flex items-center text-xs font-medium text-gray-500 bg-gray-100 border border-gray-200 rounded-full px-2 py-0.5 flex-shrink-0">
                  <Wrench className="w-3 h-3 mr-1" aria-hidden="true" />
                  sob medida
                </span>
              </div>
              <div className="mb-4">
                {/* <p className="font-medium mb-2 text-black">Sistemas Populares:</p> */}
                <p className="text-gray-600">{integration.systems.join(", ")}</p>
              </div>
              <div>
                {/* <p className="font-medium mb-2">Automações Possíveis:</p> */}
                <ul className="space-y-2">
                  {integration.examples.map((example, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-14 text-center">
          <p className="text-gray-600 mb-6">
            Seu sistema não está na lista? Se ele tem API, dá para ligar. Conte
            qual é e o que precisa acontecer entre ele e o seu WhatsApp — a
            resposta vem com prazo e escopo, não com promessa.
          </p>
          <a
            href="https://wa.me/5548998589586?text=Ol%C3%A1%21%20Quero%20integrar%20um%20sistema%20ao%20app%20da%20Piloto."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
          >
            Falar sobre a minha integração
          </a>
        </div>
      </div>
    </section>
  );
};

export default SystemIntegrations;
