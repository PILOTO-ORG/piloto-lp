import React from 'react';
import { Check } from 'lucide-react';

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
            Integração com Seus Sistemas
          </h2>
          <p className="text-xl text-gray-600">
            O Piloto se conecta aos principais sistemas do mercado brasileiro,
            automatizando processos em diferentes setores e áreas de negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {integrations.map((integration, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">
                {integration.category}
              </h3>
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
      </div>
    </section>
  );
};

export default SystemIntegrations;
