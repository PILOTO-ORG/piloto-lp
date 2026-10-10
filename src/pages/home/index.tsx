import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import HeroIntro from '../../components/HeroIntro';
import AppRecursos from '../../components/AppRecursos';
import Cases from '../../components/Cases';
import HowItWorks from '../../components/HowItWorks';
import SystemIntegrations from '../../components/SystemIntegrations';
import NandaPromo from '../../components/NandaPromo';
import LuanaPromo from '../../components/LuanaPromo';
import JamesPromo from '../../components/JamesPromo';
import About from '../../components/About';
import Hero from '../../components/Hero';
import Contact from '../../components/Contact';
import CompanyData from '../../components/CompanyData';
import FuturisticBg from '../../components/FuturisticBg';
import Reveal from '../../components/Reveal';

// Ordem da home, reconstruída em 09/10/2026. O funil é: o que é → quem já usa →
// como funciona → o que dá para ligar → os agentes → quem somos → falar.
//
// O que mudou e por quê:
//
// - O herói virou TEXTO (HeroIntro). O carrossel de quatro WebP continua, mas
//   desceu para junto do "Sobre a Piloto": objetivo, missão e legado são
//   conteúdo institucional, não proposta de valor para quem chega de busca.
// - "O que já está no app" subiu para logo depois do herói. É a oferta real;
//   estava em sétimo lugar, depois de três telas de agente.
// - Os agentes (Nanda, Luana, James) desceram para depois da prova e da
//   explicação. Continuam valendo como demonstração, mas não são mais a
//   primeira coisa que a página diz.
// - A página tinha uma contradição: prometia integração com 27 sistemas de
//   terceiros e, na seção seguinte, abria dizendo "não é uma lista de
//   promessas". Resolvido rotulando a grade como SOB MEDIDA (ver
//   SystemIntegrations.tsx) e deixando o presente do indicativo só para o que
//   está no ar.
//
// FloatingChat saiu daqui: os três blocos que ele renderiza estão atrás de
// `{false && ...}`, ou seja, ele montava 645 linhas e o cliente de IA junto
// para desenhar NADA na tela. O arquivo continua no repositório.
//
// O botão flutuante de WhatsApp continua, agora como único elemento fixo do
// canto — antes disputava o lugar com o lançador do FloatingChat.

// overflow-x-CLIP no contêiner, não -hidden.
//
// Com `overflow-x: hidden`, o CSS obriga o outro eixo a sair de `visible` para
// `auto` — um elemento não pode rolar num eixo e vazar no outro. Essa div
// virava então um container de rolagem vertical PRÓPRIO, aninhado na rolagem da
// página: duas barras de rolagem, e a roda do mouse movendo a de dentro. Medido
// em 09/10 antes da correção: scrollHeight 12978 contra clientHeight 12946.
//
// `clip` corta igual mas NÃO cria container de rolagem, então o overflow-y
// continua `visible` e só a página rola.
const HomePage: React.FC = () => {
  return (
    <div className="relative bg-gray-900 text-white min-h-screen overflow-x-clip">
      {/* Fundo SVG animado futurista */}
      <FuturisticBg />

      <div className="relative z-10">
        <Header />

        <main>
          <HeroIntro />

          {/* O produto */}
          <AppRecursos />

          {/* A prova */}
          <Reveal><Cases /></Reveal>

          {/* A explicação */}
          <Reveal><HowItWorks /></Reveal>
          <Reveal><SystemIntegrations /></Reveal>

          {/* As demonstrações */}
          <NandaPromo />
          <LuanaPromo />
          <JamesPromo />

          {/* Quem somos — o carrossel institucional vem logo depois do texto */}
          <Reveal><About /></Reveal>
          <Hero />

          <Reveal><Contact /></Reveal>

          {/* Dados oficiais da empresa — no FIM da página */}
          <Reveal><CompanyData /></Reveal>
        </main>
      </div>

      {/* WhatsApp fixo no canto inferior direito */}
      <a
        href="https://wa.me/5548998589586?text=Ol%C3%A1%21%20Estou%20entrando%20em%20contato%20atrav%C3%A9s%20do%20site."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50"
        aria-label="Falar com a Piloto no WhatsApp"
      >
        <motion.span
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="block bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-colors"
        >
          {/* WhatsApp icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </motion.span>
      </a>
    </div>
  );
};

export default HomePage;
