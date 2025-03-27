import { memo } from 'react';

interface HeroProps {
  backgroundImage?: string;
}

const Hero = memo(({ backgroundImage }: HeroProps) => {
  return (
    <section className="hero relative overflow-hidden">
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
      )}
      <div className="relative container mx-auto px-4 py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Diga Adeus à Complexidade. O Piloto Faz Por Você.
            </h1>
            <p className="text-xl sm:text-2xl text-white mb-8">
              Revolucione sua operação em minutos com tecnologia AI que entrega resultados reais. Já utilizado por +200 empresas de sucesso.
            </p>
            <button
              onClick={() => window.open('https://calendly.com/luan-piloto', '_blank')}
              className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center hover:scale-105 active:scale-95"
            >
              Garantir Minha Demonstração Exclusiva
            </button>
          </div>
          
          {/* Image container - right side */}
          <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center lg:justify-end">
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Piloto AI Interface" 
              className="w-full max-w-lg h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;