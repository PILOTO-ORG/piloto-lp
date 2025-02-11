import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  const openCalendly = () => {
    window.open('http://calendly.com/luan-piloto', '_blank');
  };

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="flex items-center">
              <img src="src/public/Prancheta5.png" alt="O Piloto" className="h-8" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-blue-600 transition-colors">
              Sobre
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-gray-600 hover:text-blue-600 transition-colors">
              Como Funciona
            </button>
            <button onClick={() => scrollToSection('benefits')} className="text-gray-600 hover:text-blue-600 transition-colors">
              Benefícios
            </button>
            <button onClick={() => scrollToSection('pricing')} className="text-gray-600 hover:text-blue-600 transition-colors">
              Planos
            </button>
            <button 
              onClick={openCalendly}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              Demonstração
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-600 hover:text-blue-600 transition-colors text-left"
              >
                Sobre
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-gray-600 hover:text-blue-600 transition-colors text-left"
              >
                Como Funciona
              </button>
              <button 
                onClick={() => scrollToSection('benefits')}
                className="text-gray-600 hover:text-blue-600 transition-colors text-left"
              >
                Benefícios
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-gray-600 hover:text-blue-600 transition-colors text-left"
              >
                Planos
              </button>
              <button 
                onClick={openCalendly}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors text-left"
              >
                Demonstração
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;