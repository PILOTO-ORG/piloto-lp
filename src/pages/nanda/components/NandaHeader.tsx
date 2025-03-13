import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const NandaHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(91, 33, 182, 0.5)', 'rgba(91, 33, 182, 0.95)'] // Tons de roxo (purple-700)
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

  // Função para abrir a página de assinatura
  const openSubscriptionPage = () => {
    window.open('https://buy.stripe.com/14k7t074j5YJbT23cc', '_blank');
  };

  return (
    <motion.header 
      className="fixed w-full backdrop-blur-sm z-40 border-b border-purple-800"
      style={{ backgroundColor }}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/Prancheta5.png" alt="O Piloto" className="h-8 mr-2" />
              <span className="text-white text-xl font-bold">
                <span className="text-purple-300">Nanda</span>
              </span>
            </Link>
          </div>

          {/* Navegação Desktop (visível apenas em telas > 1000px) */}
          <div className="hidden [min-width:1000px]:flex items-center space-x-8">
            <motion.button 
              onClick={() => scrollToSection('about')} 
              className="text-gray-200 hover:text-purple-300 transition-colors"
              whileHover={{ y: -2 }}
            >
              Sobre Nanda
            </motion.button>
            
            <motion.button 
              onClick={() => scrollToSection('transform')} 
              className="text-gray-200 hover:text-purple-300 transition-colors"
              whileHover={{ y: -2 }}
            >
              Como Funciona
            </motion.button>

            <motion.button 
              onClick={() => scrollToSection('features')} 
              className="text-gray-200 hover:text-purple-300 transition-colors"
              whileHover={{ y: -2 }}
            >
              Funcionalidades
            </motion.button>

            <motion.button 
              onClick={() => scrollToSection('success')} 
              className="text-gray-200 hover:text-purple-300 transition-colors"
              whileHover={{ y: -2 }}
            >
              Cases
            </motion.button>

            <motion.button 
              onClick={() => scrollToSection('faq')} 
              className="text-gray-200 hover:text-purple-300 transition-colors"
              whileHover={{ y: -2 }}
            >
              FAQ
            </motion.button>

            <motion.button 
              onClick={() => scrollToSection('cta')}
              className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Teste Agora
            </motion.button>
            
            <motion.button 
              onClick={openSubscriptionPage}
              className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-2 rounded-full hover:from-purple-700 hover:to-purple-900 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Assinar
            </motion.button>
          </div>

          {/* Mobile Menu Button (esconder em telas > 1000px) */}
          <div className="flex [min-width:1000px]:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            className="[min-width:1000px]:hidden mt-4 py-4 bg-purple-900 rounded-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex flex-col space-y-4 px-4">
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-gray-200 hover:text-purple-300 py-2 transition-colors"
              >
                Sobre Nanda
              </button>
              <button 
                onClick={() => scrollToSection('transform')} 
                className="text-gray-200 hover:text-purple-300 py-2 transition-colors"
              >
                Como Funciona
              </button>
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-gray-200 hover:text-purple-300 py-2 transition-colors"
              >
                Funcionalidades
              </button>
              <button 
                onClick={() => scrollToSection('success')} 
                className="text-gray-200 hover:text-purple-300 py-2 transition-colors"
              >
                Cases
              </button>
              <button 
                onClick={() => scrollToSection('faq')} 
                className="text-gray-200 hover:text-purple-300 py-2 transition-colors"
              >
                FAQ
              </button>
              <button 
                onClick={openSubscriptionPage}
                className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-2 rounded-full hover:from-purple-700 hover:to-purple-900 transition-colors"
              >
                Teste
              </button>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default NandaHeader;
