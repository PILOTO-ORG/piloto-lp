import React from 'react';
import {
  Target,
  Workflow,
  Puzzle,
  Sparkles,
  Building2,
  Users,
} from 'lucide-react';

const objetivos = [
  {
    icon: Workflow,
    title: 'Eliminar gargalos operacionais',
    desc: 'Substituímos planilhas, controles em papel e processos manuais por automações inteligentes que rodam sozinhas.',
  },
  {
    icon: Sparkles,
    title: 'Libertar gestores do operacional',
    desc: 'Tiramos das suas mãos as tarefas repetitivas para que o time foque no que realmente move o negócio.',
  },
  {
    icon: Puzzle,
    title: 'Integrar seus sistemas',
    desc: 'Conectamos WhatsApp, ERP, PDV, CRM e financeiro em um único fluxo orquestrado por agentes de IA.',
  },
  {
    icon: Target,
    title: 'Soluções sob medida',
    desc: 'Nada de software de prateleira: entendemos a dor específica da sua empresa e entregamos algo feito para ela.',
  },
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Intro */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            Sobre a Piloto
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6">
            A Piloto nasce para transformar a rotina de médias empresas, eliminando
            gargalos operacionais e libertando gestores de processos manuais. Unimos
            inteligência artificial e desenvolvimento sob medida para trocar planilhas
            e controles em papel por automações que realmente entendem o seu negócio.
          </p>
          <p className="text-base sm:text-lg text-gray-500">
            Nossa expertise vem de anos construindo ecossistemas de agentes de IA
            integrados ao WhatsApp — com orquestração de múltiplos agentes, processos
            em fila, assincronicidade e bases vetoriais — para atender leads e
            automatizar operações de ponta a ponta.
          </p>
        </div>

        {/* Objetivos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {objetivos.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <Icon className="w-12 h-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-semibold mb-4 text-blue-700">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>

        {/* Para quem é */}
        <div className="max-w-4xl mx-auto bg-gray-900 text-white rounded-2xl p-8 md:p-12 mb-12">
          <div className="flex items-center mb-4">
            <Users className="w-8 h-8 text-blue-400 mr-3" />
            <h3 className="text-2xl font-bold">Para quem é a Piloto</h3>
          </div>
          <p className="text-gray-300 text-lg">
            Trabalhamos com médias empresas — geralmente com mais de 10 colaboradores
            e faturamento acima de R$ 1 milhão por ano — que já sentem o peso dos
            processos manuais e querem escalar sem inflar a operação.
          </p>
        </div>

        {/* Dados da empresa */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Building2 className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Dados da empresa</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <p className="text-gray-500">Razão Social</p>
              <p className="font-medium text-gray-900">PILOTO LTDA - ME</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <p className="text-gray-500">CNPJ</p>
              <p className="font-medium text-gray-900">59.537.121/0001-10</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <p className="text-gray-500">Atividade</p>
              <p className="font-medium text-gray-900">
                Desenvolvimento e licenciamento de programas de computador customizáveis
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <p className="text-gray-500">Sede</p>
              <p className="font-medium text-gray-900">
                Rodovia Municipal Francisco Wollinger, 2037 - Areias do Meio,
                Governador Celso Ramos - SC, 88196-192
              </p>
            </div>
          </div>
        </div>

        {/*
          ============================================================
          CASES DE SUCESSO — PENDENTE DE AUTORIZAÇÃO ANTES DE PUBLICAR
          ------------------------------------------------------------
          Os nomes abaixo vêm do histórico do fundador. Só tornar
          público após confirmar autorização de cada cliente/parceiro.

          - Zucchetti Brasil (Laboratório de IA): ecossistema de agentes
            integrado ao WhatsApp para leads do PDV "Pronto Deu Venda"
            (parceria com a maquininha do Itaú).
          - Lux Capital: agente de IA como SDR para venda de planos de
            investimento.
          - Projeto Cunha: gestão de logística e produtos para locação de
            materiais para festas e eventos.
          - Projeto Itaê (Ecoturismo): plataforma integrada a sistemas de
            reserva globais (Airbnb, GetYourGuide) para gestão de veículos.
          ============================================================
        */}
      </div>
    </section>
  );
};

export default About;
