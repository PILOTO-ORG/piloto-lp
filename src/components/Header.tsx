import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(17, 24, 39, 0.5)', 'rgba(17, 24, 39, 0.95)']
  );

  const openPurchase = () => {
    window.open('https://buy.stripe.com/14k7t074j5YJbT23cc', '_blank');
  };
  const openChat = () => {
    window.open('https://wa.me/554899230055?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais!', '_blank');
  };

  return (
    <motion.header 
      className="fixed w-full backdrop-blur-sm z-40 border-b border-gray-800"
      style={{ backgroundColor }}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/Prancheta4.png" alt="O Piloto" className="h-8" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">

            <button onClick={openPurchase} className="bg-blue-600 text-blue-200 px-4 py-2 rounded-full hover:bg-blue-700 transition-colors">Teste Agora</button>
            <button onClick={openChat} className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors">Fale com a gente</button>
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
              <a href="/afiliados-piloto" className="text-gray-300 hover:text-blue-400 transition-colors">Afiliados</a>
              <Link to="/parceiros" className="text-gray-300 hover:text-blue-400 transition-colors">Parceiros</Link>
              <button onClick={openPurchase} className="bg-blue-600 text-blue-200 px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">Teste Agora</button>
              <button onClick={openChat} className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors">Fale com a gente</button>
             </div>
           </motion.div>
         )}
      </nav>
    </motion.header>
  );
};

export default Header;