import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';

// O herói da home era o carrossel de quatro WebP, com o texto DENTRO da imagem.
// Três consequências: o buscador não lia a proposta de valor (a home não tinha
// um único <h1> em texto), leitor de tela dependia inteiramente do alt, e o LCP
// era um arquivo de imagem de 1600px.
//
// Aqui o texto é texto. O carrossel institucional (objetivo, missão, legado)
// continua existindo e desceu para junto do "Sobre a Piloto", que é onde ele
// fala — ver pages/home/index.tsx.
//
// A primeira tela termina nos BOTÕES, e nada mais. Duas coisas já moraram
// abaixo deles e saíram, as duas a pedido do luan:
//
// 1. Uma lista de recursos (WhatsApp pela Meta, base CNPJ, PNCP, gov.br) — dava
//    destaque demais a coisas que não são o argumento principal.
// 2. A faixa "Em operação em" com as logos de Toca, Cunha e Itaway (09/10).
//
// As logos dos clientes continuam na seção "Quem já roda na Piloto", que é onde
// elas vêm acompanhadas do que cada operação ganhou. Se um dia voltarem para cá,
// atenção: o herói é bg-gray-900 e as três marcas somem nele — a da Toca é
// marrom quase preto (#2B1A0E), a da Itaway é cinza médio (#898989) e a da
// Cunha é JPEG de fundo preto. Nenhuma tem versão clara, então precisariam de
// plaqueta branca atrás.

const HeroIntro = () => {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24" id="inicio">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-sm font-semibold tracking-wide uppercase text-blue-400 mb-5">
            Automação com IA para médias empresas
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
            Sua empresa já não cabe{' '}
            <span className="text-blue-400">na planilha.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-4 max-w-3xl">
            A Piloto reúne num sistema só o que hoje está espalhado entre
            planilha, caderno e conversa solta — e põe agentes de IA para cuidar
            do repetitivo, do primeiro contato ao fechamento do mês.
          </p>

          <p className="text-base text-gray-400 mb-10 max-w-3xl">
            Começa importando a sua planilha: ela vira cadastro, e você confere o
            que entra antes de gravar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://app.piloto.life/register"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-medium transition-colors"
            >
              Criar conta e testar grátis
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="https://wa.me/5548998589586?text=Ol%C3%A1%21%20Estou%20entrando%20em%20contato%20atrav%C3%A9s%20do%20site."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-gray-600 hover:border-gray-400 hover:bg-white/5 text-white px-8 py-4 rounded-full font-medium transition-colors"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Falar no WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroIntro;
