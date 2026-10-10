
// As logos são as REAIS, conferidas contra o que cada site serve hoje
// (09/10/2026), não as que estavam nos repositórios:
//
// - cunha.jpg — o site serve `logo.jpg`. O `logo.svg` do repo local é um
//   PLACEHOLDER genérico (círculo verde + confete), não a marca. Não usar.
// - itaway.svg — baixada de itawayecotours.com/wp-content/uploads/2025/02/,
//   e idêntica à do repo do CRM. 203×60, wordmark deitado.
// - toca.svg — o vetor traçado em 03/10. Usada a variante LEVE (62 KB, textura
//   em JPEG embutido) e não a original de 386 KB, que traz a mesma arte com a
//   textura em PNG.
//
// As três foram testadas renderizando em <img> via canvas: todas carregam.
// Proporções muito diferentes (1,18:1, 1:1 e 3,4:1), por isso a caixa da logo
// fixa a ALTURA e deixa a largura livre com object-contain — fixar a largura
// esmagaria o wordmark da Itaway.

// Clientes em operação. Três regras para esta seção:
//
// 1. Só entra cliente autorizado a ser público (Toca da Onça, Cunha Festas e
//    Itaway — decisão do luan, 09/10/2026). O Neoprofessor ficou de fora desta
//    rodada de propósito.
// 2. Só entra afirmação verificável. O que está escrito aqui foi conferido
//    contra o que os sistemas servem hoje; o título de cada página confirma o
//    ramo. Nada de resultado inventado ("aumentou 40% as vendas").
// 2b. O link é sempre o SITE PÚBLICO do cliente, não o sistema interno. A
//    Itaway tinha o CRM (itaway.piloto.life, atrás de login) e passou a apontar
//    para pt.itawayecotours.com, que é a vitrine dela em português.
//
// 3. Volume operacional do cliente só entra AUTORIZADO. O luan autorizou os
//    três em 09/10/2026. Números medidos direto nos bancos em 28/09 (Cunha e
//    Itaway) e 09/10 (Toca) — a data fica no rodapé da seção, porque número sem
//    data de medição envelhece sem ninguém perceber.
//
//    A TOCA FICA SEM NÚMERO DE PROPÓSITO. Medido em 09/10: 21 pedidos e 4
//    comandas. Não é um número ruim, é um número NOVO — a casa abriu em 20/09 e
//    o pedido pelo site foi ligado em 07/10. Publicar "21 pedidos" faria o case
//    parecer vazio quando o que ele mostra é capacidade recém-entregue. No
//    lugar dele vão o tamanho do cardápio (que é público no site, qualquer um
//    conta) e a data de abertura. Quando o volume crescer, trocar.
//
export interface Metrica {
  valor: string;
  rotulo: string;
}

export interface Case {
  nome: string;
  ramo: string;
  logo: string;
  logoAlt: string;
  titulo: string;
  descricao: string;
  entregas: string[];
  metricas: Metrica[];
  url: string;
  urlLabel: string;
}

export const CLIENTES: Case[] = [
  {
    nome: 'Toca da Onça',
    ramo: 'Restaurante',
    logo: '/logos/toca.svg',
    logoAlt: 'Toca da Onça',
    titulo: 'Do cardápio digital à ficha técnica do prato',
    descricao:
      'Cardápio público com pedido e dados de entrega — e, atrás dele, a operação inteira da casa no mesmo sistema: a ficha técnica de cada prato puxando baixa no estoque, a comanda, o caixa e o WhatsApp.',
    entregas: [
      'Cardápio digital público, com pedido e dados de entrega',
      'Ficha técnica por prato, com baixa automática no estoque',
      'Pedidos e entregas acompanhados até a porta do cliente',
      'WhatsApp e marketing sobre a mesma base de clientes',
    ],
    metricas: [
      { valor: '51', rotulo: 'itens no cardápio público' },
      { valor: 'set/2026', rotulo: 'no ar desde a abertura da casa' },
    ],
    url: 'https://toca.piloto.life',
    urlLabel: 'toca.piloto.life',
  },
  {
    nome: 'Cunha Festas',
    ramo: 'Locação para festas e eventos',
    logo: '/logos/cunha.jpg',
    logoAlt: 'Cunha Festas',
    titulo: 'O catálogo do site passou a ser o catálogo do sistema',
    descricao:
      'O site mostrava um arquivo estático que envelhecia sozinho — ficava preso num recorte do acervo enquanto o sistema já tinha muito mais item ativo. Agora ele lê o catálogo pela API, e o que entra no sistema aparece no site.',
    entregas: [
      'Catálogo do site servido pela API, sempre igual ao sistema',
      'WhatsApp como canal de orçamento, com histórico da conversa',
      'A IA lê a conversa e monta o briefing do evento',
      'Orçamento com modelo por ramo, PDF e assinatura',
    ],
    metricas: [
      { valor: '230.768', rotulo: 'mensagens de WhatsApp processadas' },
      { valor: '689', rotulo: 'itens ativos no catálogo' },
      { valor: '546', rotulo: 'orçamentos montados' },
    ],
    url: 'https://cunhafestas.com.br',
    urlLabel: 'cunhafestas.com.br',
  },
  {
    nome: 'Itaway Ecotours',
    ramo: 'Ecoturismo',
    logo: '/logos/itaway.svg',
    logoAlt: 'Itaway Ecotours',
    titulo: 'Oito canais de venda numa fila só',
    descricao:
      'Reserva que chega por Bokun, GetYourGuide, Viator, Airbnb, Civitatis, Klook, site ou balcão entra numa lista única, com histórico do que mudou em cada uma. A caixa de e-mail virou canal: a IA classifica o que chega e extrai a reserva do corpo da mensagem.',
    entregas: [
      'Agregador de reservas multicanal com histórico imutável',
      'E-mail como canal, com classificação e extração por IA',
      'Agenda de passeios, guias e veículos',
      'Disponibilidade e bloqueios por data',
    ],
    metricas: [
      { valor: '18.614', rotulo: 'reservas agregadas de 8 canais' },
      { valor: '29.652', rotulo: 'clientes na base' },
      { valor: '7.070', rotulo: 'reservas extraídas de e-mail pela IA' },
    ],
    url: 'https://pt.itawayecotours.com/',
    urlLabel: 'itawayecotours.com',
  },
];
