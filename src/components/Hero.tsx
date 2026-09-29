import { memo, useState, useEffect, useRef, TouchEvent } from 'react';

interface HeroProps {
  backgroundImage?: string;
}

// Os slides são WebP em duas larguras (800/1600). Os PNG originais de 2400px
// continuam em public/ mas não são mais servidos: os quatro somavam 3,1 MB e
// eram o LCP da home no celular.
//
// O alt descreve o conteúdo de cada slide, não a posição dele. O texto está
// dentro da imagem — sem alt descritivo, leitor de tela não tem nada para ler.
const images = [
  {
    slug: 'whatsapp',
    alt: 'Um clique no WhatsApp: receber mensagens de clientes, processar o conteúdo com IA e responder em atendimento automático.',
  },
  {
    slug: 'objetivo',
    alt: 'Objetivo: somar inteligência humana (emoções e criatividade), inteligência artificial (automação e eficiência) e conexão (desenvolvimento social).',
  },
  {
    slug: 'missao',
    alt: 'Missão: democratizar acesso com novas oportunidades, reconhecer genialidade em novos talentos e transformar vidas com novas histórias.',
  },
  {
    slug: 'legado',
    alt: 'Legado: um gráfico circular dividido em três partes iguais — tempo, dinheiro e liberdade.',
  },
];

const AUTO_PLAY_INTERVAL = 5000;

const Hero = memo(({ backgroundImage }: HeroProps) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const prev = () => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const next = () => setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  // Auto play
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [current, paused]);

  // Touch handlers for swipe
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 50) prev();
    else if (deltaX < -50) next();
    touchStartX.current = null;
  };

  return (
    <section
      className="hero relative overflow-hidden min-h-[60vh] flex items-center justify-center pt-20 w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
      )}
      <div className="relative w-full mx-auto z-10">
        <div
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-400 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((image) => (
              <div key={image.slug} className="w-full flex-shrink-0">
                <img
                  src={`/images/hero/${image.slug}-1600.webp`}
                  srcSet={`/images/hero/${image.slug}-800.webp 800w, /images/hero/${image.slug}-1600.webp 1600w`}
                  sizes="100vw"
                  alt={image.alt}
                  width={1600}
                  height={900}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </div>
          {/* Full-height edge click zones for navigation */}
          <button
            onClick={prev}
            className="hidden md:flex absolute left-0 top-0 h-full w-32 items-center justify-center bg-white/20 hover:bg-white/30 transition z-20"
            aria-label="Anterior"
          >
            <span className="text-3xl text-white">‹</span>
          </button>
          <button
            onClick={next}
            className="hidden md:flex absolute right-0 top-0 h-full w-32 items-center justify-center bg-white/20 hover:bg-white/30 transition z-20"
            aria-label="Próximo"
          >
            <span className="text-3xl text-white">›</span>
          </button>
        </div>
        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full ${current === idx ? 'bg-blue-600' : 'bg-gray-300'} transition-colors`}
              aria-label={`Ir para slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;