import { memo } from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  ctaText: string;
  onClick?: () => void;
}

const Hero = memo(({ title, subtitle, imageSrc, imageAlt, ctaText, onClick }: HeroProps) => {
  return (
    <section className="hero relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imageSrc})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
      <div className="relative container mx-auto px-4 py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              {title}
            </h1>
            <p className="text-xl sm:text-2xl text-white mb-8">
              {subtitle}
            </p>
            <button
              onClick={onClick}
              className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center hover:scale-105 active:scale-95"
            >
              {ctaText}
            </button>
          </div>
          <div className="lg:w-1/2">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
});

export default Hero;
