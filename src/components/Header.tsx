import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(17, 24, 39, 0.5)', 'rgba(17, 24, 39, 0.95)']
  );

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
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
    setIsMenuOpen(false);
  };

  const openCalendly = () => {
    window.open('http://calendly.com/luan-piloto', '_blank');
  };

  const openStripeCheckout = () => {
    window.open('https://buy.stripe.com/14k7t074j5YJbT23cc', '_blank');
  };

  return (
    <motion.header 
      className="fixed w-full backdrop-blur-sm z-40 border-b border-gray-800"
      style={{ backgroundColor }}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="flex items-center">
              <img src="/Prancheta5.png" alt="O Piloto" className="h-8" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">

          <motion.button 
              onClick={scrollToTop} 
              className="text-gray-300 hover:text-blue-400 transition-colors"
              whileHover={{ y: -2 }}
            >
              Início
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection('about')} 
              className="text-gray-300 hover:text-blue-400 transition-colors"
              whileHover={{ y: -2 }}
            >
              Sobre
            </motion.button>
            
            <motion.button 
              onClick={() => scrollToSection('how-it-works')} 
              className="text-gray-300 hover:text-blue-400 transition-colors"
              whileHover={{ y: -2 }}
            >
              Como Funciona
            </motion.button>

            <motion.button 
              onClick={() => scrollToSection('pricing')} 
              className="text-gray-300 hover:text-blue-400 transition-colors"
              whileHover={{ y: -2 }}
            >
              Planos
            </motion.button>
            <motion.button 
              onClick={openCalendly}
              className="bg-blue-600 text-blue-200 px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Demonstração
            </motion.button>
            <motion.button 
              onClick={openStripeCheckout}
              className="bg-blue-600 text-blue-200 px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Assinar Agora
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-blue-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden mt-4 pb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-300 hover:text-blue-400 transition-colors text-left"
              >
                Sobre
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-gray-300 hover:text-blue-400 transition-colors text-left"
              >
                Como Funciona
              </button>
              <button 
                onClick={() => scrollToSection('benefits')}
                className="text-gray-300 hover:text-blue-400 transition-colors text-left"
              >
                Benefícios
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-gray-300 hover:text-blue-400 transition-colors text-left"
              >
                Planos
              </button>
              <button 
                onClick={openCalendly}
                className="bg-blue-600 text-blue-200 px-6 py-2 rounded-full hover:bg-blue-700 transition-colors text-left"
              >
                Demonstração
              </button>
              <button 
                onClick={openStripeCheckout}
                className="bg-blue-600 text-blue-200 px-6 py-2 rounded-full hover:bg-blue-700 transition-colors text-left"
              >
                Assinar Agora
              </button>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;