import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

// O cabeçalho não tinha navegação no desktop: só os dois botões. Quem caía na
// home por busca não tinha como saber que havia produto, clientes e contato
// mais abaixo — só rolando no escuro.
//
// O menu mobile, por outro lado, tinha um link para /afiliados-piloto, que NÃO
// é rota do App.tsx. Com o catch-all do vercel.json, essa URL devolve o
// index.html e o React renderiza a home de novo: o visitante clica em
// "Afiliados" e aparentemente nada acontece. O link saiu; se o programa de
// afiliados voltar, ele precisa de rota antes de voltar para cá.

const SECOES = [
  { href: '#recursos', label: 'O app' },
  { href: '#clientes', label: 'Clientes' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#contato', label: 'Contato' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(17, 24, 39, 0.5)', 'rgba(17, 24, 39, 0.95)']
  );

  const openPurchase = () => {
    window.open('https://app.piloto.life/register', '_blank');
  };
  const openChat = () => {
    window.open('https://wa.me/5548998589586?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais!', '_blank');
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
              <img src="/Prancheta4.png" alt="Piloto" className="h-8" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {SECOES.map((secao) => (
              <a
                key={secao.href}
                href={secao.href}
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                {secao.label}
              </a>
            ))}
            <button onClick={openPurchase} className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors">Teste grátis</button>
            <button onClick={openChat} className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors">Fale com a gente</button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-blue-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
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
              {SECOES.map((secao) => (
                <a
                  key={secao.href}
                  href={secao.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  {secao.label}
                </a>
              ))}
              <Link
                to="/parceiros"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                Parceiros
              </Link>
              <button onClick={openPurchase} className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">Teste grátis</button>
              <button onClick={openChat} className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors">Fale com a gente</button>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
