import { motion } from 'framer-motion';
import {
  Users,
  FileText,
  Gavel,
  MapPin,
  Linkedin,
  Phone,
  Bot,
  MessageSquare,
  ScanText,
  MessageCircle,
  Package,
  Calendar,
  ClipboardList,
  CalendarCheck,
  Boxes,
  LayoutDashboard,
  DollarSign,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Os módulos abaixo espelham o registro de app.piloto.life
// (piloto-frontend, src/modules/registry.tsx): mesmos rótulos, mesmos grupos,
// mesmo status. Quando um módulo mudar lá, mudar aqui — senão a landing promete
// o que o app não entrega.
//
// Ficaram de fora, de propósito: Restaurante (é o cardápio da Toca da Onça,
// cliente específico), Freelas (prospecção da própria Piloto, não do cliente),
// Base da navegação (só faz sentido com a extensão instalada) e Configurações
// (conta e senha, não é recurso). "Importar planilha" virou a linha de apoio do
// cabeçalho, onde ela vende melhor do que como cartão.
//
// Os ícones seguem o registro do app, com duas exceções: lá 'emails' e
// 'extracao' usam MessageSquare, e 'canais' e 'recursos' usam CalendarCheck.
// Dois ícones iguais lado a lado numa grade parecem defeito, então a leitura de
// mensagens ganhou ScanText e a capacidade ganhou Boxes.

interface Recurso {
  label: string;
  icon: LucideIcon;
  descricao: string;
  emEvolucao?: boolean;
}

interface Grupo {
  titulo: string;
  resumo: string;
  recursos: Recurso[];
}

const GRUPOS: Grupo[] = [
  {
    titulo: 'Comercial',
    resumo: 'Achar e conquistar cliente',
    recursos: [
      {
        label: 'Aquisição & CRM',
        icon: Users,
        descricao:
          'Do lead descoberto ao cliente na carteira: fila única vinda do LinkedIn, do Google Maps e da Receita Federal, com campanhas e funil.',
      },
      {
        label: 'Orçamentos',
        icon: FileText,
        descricao:
          'Propostas com modelos por ramo, PDF e assinatura digital pelo gov.br.',
      },
      {
        label: 'Licitações',
        icon: Gavel,
        descricao:
          'Contratos públicos do PNCP filtrados pelo que a sua empresa vende, com o prazo em destaque e a proposta montada até a assinatura.',
      },
      {
        label: 'Mapa',
        icon: MapPin,
        descricao:
          'Prospecção pelo Google Places com rota real de visita — e, na mesma tela, as camadas públicas do terreno.',
      },
      {
        label: 'LinkedIn',
        icon: Linkedin,
        descricao:
          'Qualifica as pessoas e os posts que você vê no LinkedIn e redige a abordagem.',
      },
    ],
  },
  {
    titulo: 'Atendimento',
    resumo: 'Falar com quem já chegou',
    recursos: [
      {
        label: 'WhatsApp',
        icon: Phone,
        descricao:
          'Caixa de entrada em tempo real, com etiquetas, respostas rápidas, transcrição de áudio e Kanban.',
        emEvolucao: true,
      },
      {
        label: 'Agentes',
        icon: Bot,
        descricao:
          'Agentes de IA e regras por evento, com interação em tempo real.',
        emEvolucao: true,
      },
      {
        label: 'E-mail',
        icon: MessageSquare,
        descricao:
          'A caixa de e-mail dentro do app, com a IA classificando o que chega.',
      },
      {
        label: 'Leitura das mensagens',
        icon: ScanText,
        descricao:
          'A IA lê a mensagem do cliente e diz o que entendeu: o que quer, para quando, quantos, onde. Nada vira pedido sem você aprovar.',
      },
      {
        label: 'Chat',
        icon: MessageCircle,
        descricao:
          'Converse com a IA da Piloto: escolha o modelo, o contexto e acione vários agentes por @menção.',
      },
    ],
  },
  {
    titulo: 'Operação',
    resumo: 'Entregar o combinado',
    recursos: [
      {
        label: 'Marketplace & Estoque',
        icon: Package,
        descricao:
          'Produtos, preços e estoque num lugar só, com vitrine pública e link compartilhável.',
      },
      {
        label: 'Agenda & Reuniões',
        icon: Calendar,
        descricao:
          'Compromissos sincronizados com a Google Agenda e, no mesmo lugar, a gravação com transcrição, resumo e perguntas sobre o que foi dito.',
      },
      {
        label: 'Tarefas & Kanban',
        icon: ClipboardList,
        descricao:
          'Quadros com colunas, prioridades, prazos, comentários, anexos e etiquetas.',
      },
      {
        label: 'Reservas por canal',
        icon: CalendarCheck,
        descricao:
          'Reserva de qualquer origem numa lista só, com o histórico do que mudou em cada uma.',
      },
      {
        label: 'Recursos e capacidade',
        icon: Boxes,
        descricao:
          'O que pode ser reservado e quanto cabe. O mesmo cadastro serve mesa por turno, van por horário, tenda por data e box por dia.',
      },
    ],
  },
  {
    titulo: 'Gestão',
    resumo: 'Ver o todo e o dinheiro',
    recursos: [
      {
        label: 'Dashboard & Relatórios',
        icon: LayoutDashboard,
        descricao:
          'KPIs, faturamento, ocupação e alertas consolidados, com gráficos e ações rápidas.',
      },
      {
        label: 'Financeiro',
        icon: DollarSign,
        descricao:
          'Faturamento, caução, pagamentos, conversão de moeda e repasses das plataformas.',
      },
    ],
  },
];

const AppRecursos = () => {
  return (
    <section className="py-20 bg-gray-900 text-white" id="recursos">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-semibold tracking-wide uppercase text-blue-400 mb-3">
            app.piloto.life
          </span>
          <h2 className="text-4xl font-bold mb-6">O que já está no app</h2>
          <p className="text-xl text-gray-300">
            Não é uma lista de promessas: são os módulos que estão no ar hoje,
            agrupados pelo momento do trabalho em que cada um entra. Começa
            importando a sua planilha — ela vira cadastro, e você vê o que entra
            antes de gravar.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-14">
          {GRUPOS.map((grupo) => (
            <div key={grupo.titulo}>
              <div className="flex items-baseline gap-3 mb-6 border-b border-gray-700 pb-3">
                <h3 className="text-2xl font-bold">{grupo.titulo}</h3>
                <span className="text-gray-400">{grupo.resumo}</span>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {grupo.recursos.map((recurso) => {
                  const Icone = recurso.icon;
                  return (
                    <motion.div
                      key={recurso.label}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.35 }}
                      className="h-full bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-blue-600/20 text-blue-400 rounded-lg p-2 flex-shrink-0">
                          <Icone className="w-5 h-5" aria-hidden="true" />
                        </span>
                        <h4 className="font-semibold leading-tight">
                          {recurso.label}
                        </h4>
                      </div>
                      {recurso.emEvolucao && (
                        <span className="inline-block text-xs font-medium text-amber-300 bg-amber-400/10 border border-amber-400/30 rounded-full px-2 py-0.5 mb-3">
                          em evolução
                        </span>
                      )}
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {recurso.descricao}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="https://app.piloto.life/register"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-medium transition-colors"
          >
            Criar conta e testar grátis
          </a>
        </div>
      </div>
    </section>
  );
};

export default AppRecursos;
