import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section className="pt-32 pb-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-6">
              Transforme seu atendimento imobiliário com Nanda, a inteligência artificial que vende para você.
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Sua assistente virtual inteligente especializada no setor imobiliário, atuando como secretária, vendedora e assistente 24 horas por dia, 7 dias por semana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#cta" 
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition-all shadow-lg hover:shadow-xl font-medium text-center"
              >
                Teste Agora
              </a>
              <a 
                href="#features" 
                className="border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-md transition-all font-medium text-center"
              >
                Ver Funcionalidades
              </a>
            </div>
            <div className="mt-6 flex items-center">
              <div className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                Usado por imobiliárias inovadoras
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="relative">
                {/* Imagem de uma mulher real no contexto de tecnologia imobiliária */}
                <img 
                  src="/nanda-real-estate-agent.jpg" 
                  alt="Nanda - Assistente Virtual Imobiliária" 
                  className="w-full object-cover"
                  style={{ minHeight: "400px" }}
                  onError={(e) => {
                    // Fallback para uma imagem de placeholder caso a imagem principal não carregue
                    e.currentTarget.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
                  }}
                />
                
                {/* Overlay com elementos de UI que representam tecnologia */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent">
                  {/* Elementos de UI flutuantes */}
                  <div className="absolute bottom-10 left-10 bg-white/90 p-3 rounded-lg shadow-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">NA</span>
                      </div>
                      <div>
                        <p className="text-purple-800 text-sm font-semibold">Nanda</p>
                        <p className="text-purple-600 text-xs">Assistente Imobiliária</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* UI da assistente */}
                  <div className="absolute top-10 right-10 bg-white/90 p-3 rounded-lg shadow-lg max-w-[180px]">
                    <p className="text-purple-700 text-sm font-medium">Como posso ajudar na busca do seu imóvel ideal?</p>
                  </div>
                  
                  {/* Ícones de tecnologia flutuantes */}
                  <div className="absolute top-1/3 left-1/4 bg-white/30 p-2 rounded-full backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  
                  <div className="absolute bottom-1/3 right-1/4 bg-white/30 p-2 rounded-full backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
