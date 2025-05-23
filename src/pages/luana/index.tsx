import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './animations.css';
import './styles.css';
import './testimonial-slider.css';

const LuanaPage: React.FC = () => {
  useEffect(() => {
    const header = document.querySelector('.header');
    const headerHeight = header?.clientHeight || 0;

    // Sticky header shadow
    const onScroll = () => {
      if (window.scrollY > 50 && header) header.classList.add('shadow-lg');
      else if (header) header.classList.remove('shadow-lg');
    };
    window.addEventListener('scroll', onScroll);

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const targetAnchor = e.currentTarget as HTMLAnchorElement;
        const targetId = targetAnchor.getAttribute('href');
        const targetEl = targetId ? document.querySelector(targetId) : null;
        if (targetEl) {
          window.scrollTo({ top: targetEl.getBoundingClientRect().top + window.scrollY - headerHeight, behavior: 'smooth' });
        }
      });
    });

    // FAQ accordion
    document.querySelectorAll('.faq-item').forEach(item => {
      item.querySelector('h3')?.addEventListener('click', () => {
        item.classList.toggle('active');
      });
    });

    // Testimonial slider mobile
    const cards = Array.from(document.querySelectorAll('.testimonial-card')) as HTMLElement[];
    let current = 0;
    const updateTestimonials = () => {
      const isMobile = window.innerWidth < 768;
      cards.forEach((card, i) => card.style.display = (!isMobile || i === current) ? 'block' : 'none');
    };
    const interval = setInterval(() => { current = (current + 1) % cards.length; updateTestimonials(); }, 5000);
    window.addEventListener('resize', updateTestimonials);
    updateTestimonials();

    // Animations on scroll
    const animateEls = document.querySelectorAll('.benefit-card, .testimonial-card, .faq-item');
    const onCheck = () => {
      animateEls.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 150) el.classList.add('animate');
      });
    };
    window.addEventListener('scroll', onCheck);
    onCheck();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', onCheck);
      window.removeEventListener('resize', updateTestimonials);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="luana-landing">
      {/* Header Section */}
      <header className="header bg-indigo-900 text-white fixed w-full z-50">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/">
            <img src="/images/piloto-logo-new.png" alt="Piloto IA" className="h-8" />
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#sobre" className="hover:text-gray-300">Sobre</a></li>
              <li><a href="#beneficios" className="hover:text-gray-300">Benefícios</a></li>
              <li><a href="#comparativo" className="hover:text-gray-300">Comparativo</a></li>
              <li><a href="#depoimentos" className="hover:text-gray-300">Depoimentos</a></li>
              <li><a href="#faq" className="hover:text-gray-300">FAQ</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="sobre" className="hero bg-indigo-800 text-white pt-32 pb-20 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Transforme seu Instagram com <span className="text-pink-500">Luana IA</span>
          </h1>
          <p className="text-lg md:text-xl mb-8">
            A IA que gera posts automáticos e responde directs no seu tom de voz
          </p>
          <Link to="#beneficios" className="inline-block bg-pink-500 hover:bg-pink-600 text-white py-3 px-8 rounded-full font-medium transition">
            Saiba Mais
          </Link>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section id="beneficios" className="benefits py-20 bg-white text-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="section-title text-3xl font-bold text-center mb-8">Por que se tornar um Afiliado Piloto IA?</h2>
          <div className="benefits-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="benefit-card p-6 text-center border rounded-lg">
              <div className="benefit-icon text-4xl mb-4"><i className="fas fa-money-bill-wave"></i></div>
              <h3 className="font-semibold text-xl mb-2">Comissões Atrativas</h3>
              <p>Ganhe em média R$250 por venda, com possibilidade de ganhos recorrentes e crescimento mensal.</p>
            </div>
            <div className="benefit-card p-6 text-center border rounded-lg">
              <div className="benefit-icon text-4xl mb-4"><i className="fas fa-users"></i></div>
              <h3 className="font-semibold text-xl mb-2">Suporte Completo</h3>
              <p>Equipe de designers, programadores e especialistas prontos para te ajudar a vender mais.</p>
            </div>
            <div className="benefit-card p-6 text-center border rounded-lg">
              <div className="benefit-icon text-4xl mb-4"><i className="fas fa-rocket"></i></div>
              <h3 className="font-semibold text-xl mb-2">Produto Validado</h3>
              <p>A Piloto IA já é um sucesso no mercado, facilitando suas vendas com um produto que realmente funciona.</p>
            </div>
            <div className="benefit-card p-6 text-center border rounded-lg">
              <div className="benefit-icon text-4xl mb-4"><i className="fas fa-tools"></i></div>
              <h3 className="font-semibold text-xl mb-2">Materiais Prontos</h3>
              <p>Acesso a vídeos, PDFs, scripts e materiais de marketing que vendem por você.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparativo" className="comparison py-20 bg-gray-50 text-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="section-title text-3xl font-bold text-center mb-8">Benefícios Extraordinários da Piloto IA</h2>
          <div className="benefits-showcase grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="benefit-showcase-item p-6 text-center border rounded-lg">
              <div className="benefit-icon-large text-4xl mb-4"><i className="fas fa-money-bill-wave"></i></div>
              <h3 className="font-semibold text-xl mb-2">Comissões Extraordinárias</h3>
              <p>Ganhe <span className="font-bold">ATÉ R$250 POR VENDA</span> com a Piloto IA!...</p>
            </div>
            <div className="benefit-showcase-item p-6 text-center border rounded-lg">
              <div className="benefit-icon-large text-4xl mb-4"><i className="fas fa-users-cog"></i></div>
              <h3 className="font-semibold text-xl mb-2">Suporte Dedicado</h3>
              <p>Tenha acesso a um gerente de afiliados exclusivo para te ajudar a maximizar seus resultados.</p>
            </div>
            <div className="benefit-showcase-item p-6 text-center border rounded-lg">
              <div className="benefit-icon-large text-4xl mb-4"><i className="fas fa-chart-line"></i></div>
              <h3 className="font-semibold text-xl mb-2">Crescimento Acelerado</h3>
              <p>Comprove um aumento significativo nas suas vendas com nossas estratégias comprovadas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="testimonials py-20 bg-white text-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="section-title text-3xl font-bold text-center mb-8">O que dizem nossos afiliados</h2>
          <div className="testimonials-slider grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="testimonial-card p-6 border rounded-lg">
              <div className="testimonial-image mb-4">
                <img src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f" alt="Carlos Silva" className="w-full h-48 object-cover rounded" />
              </div>
              <div className="testimonial-content">
                <p className="testimonial-text italic mb-2">"Hoje faturei R$1.200..."</p>
                <p className="font-semibold">Carlos Silva</p>
                <p className="text-sm text-gray-500">Afiliado há 3 meses</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq py-20 bg-gray-50 text-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="section-title text-3xl font-bold text-center mb-8">Perguntas Frequentes</h2>
          <div className="faq-container space-y-6">
            <div className="faq-item border-b pb-4">
              <h3 className="font-semibold mb-2">O que é a Piloto IA?</h3>
              <p>A Piloto IA é uma inteligência artificial que automatiza processos empresariais...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta py-20 bg-indigo-800 text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Pronto para transformar sua vida financeira?</h2>
          <p className="mb-6">Junte-se a centenas de afiliados que estão mudando suas vidas com a Piloto IA.</p>
          <a href="https://wa.me/5519983165763?text=Quero%20ser%20afiliado%20da%20Piloto%20IA" className="btn btn-primary btn-large animated-btn inline-block bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-full transition">
            <i className="fab fa-whatsapp mr-2"></i> Quero ser afiliado agora
          </a>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-6">
          <div className="footer-content grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="footer-logo">
              <img src="/images/piloto-logo-new.png" alt="Piloto IA Logo" className="h-10 mb-4" />
              <p>Transformando o futuro dos negócios com inteligência artificial</p>
            </div>
            <div className="footer-links">
              <h3 className="font-semibold mb-2">Links Rápidos</h3>
              <ul className="space-y-2">
                <li><a href="#sobre" className="hover:text-white">Sobre a Piloto</a></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h3 className="font-semibold mb-2">Contato</h3>
              <p>Rua Dona Francisca, 8300, Joinville/SC</p>
              <p>CNPJ 59.537.121/0001-10</p>
            </div>
          </div>
          <div className="footer-bottom text-center mt-8 text-sm">
            &copy; {new Date().getFullYear()} Piloto IA. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* Fixed WhatsApp Button */}
      <div className="whatsapp-fixed fixed bottom-6 right-6">
        <a href="https://wa.me/5519983165763?text=Quero%20ser%20afiliado%20da%20Piloto%20IA" className="whatsapp-btn inline-flex items-center bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-full shadow-lg">
          <i className="fab fa-whatsapp mr-2"></i> Quero ser afiliado agora
        </a>
      </div>
    </div>
  );
};

export default LuanaPage;
