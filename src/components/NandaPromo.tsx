import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Bot, Building, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import BaseChat from './BaseChat';

const NandaPromo: React.FC = () => {
  useEffect(() => {
    console.log("NandaPromo component mounted");
  }, []);

  return (
    <section id="nanda" className="py-20 bg-gradient-to-br from-purple-900 to-purple-700 text-white relative overflow-hidden">
      {/* Overlay com padrões decorativos */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full border-4 border-white"></div>
        <div className="absolute bottom-20 right-40 w-48 h-48 rounded-full border-4 border-white"></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full border-4 border-white"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold">Conheça a Nanda</h3>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Nanda: Assistente Virtual Imobiliária
            </h2>
            
            <p className="text-lg opacity-90 mb-6">
              Transforme o atendimento da sua imobiliária com a Nanda, nossa assistente virtual especializada no mercado imobiliário. 
              Disponível 24/7, ela atende seus clientes instantaneamente, qualifica leads e organiza visitas automaticamente.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="bg-purple-500/30 p-2 rounded-full mt-1">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium">Atendimento Omnichannel</h4>
                  <p className="opacity-80">Funciona no WhatsApp, Instagram e no seu site, oferecendo uma experiência consistente.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-purple-500/30 p-2 rounded-full mt-1">
                  <Building className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium">Especialista em Imóveis</h4>
                  <p className="opacity-80">Treinada com informações específicas dos seus imóveis para respostas precisas.</p>
                </div>
              </div>
            </div>
            
            <Link 
              to="/nanda" 
              className="inline-flex items-center space-x-2 bg-white text-purple-700 hover:bg-purple-50 py-3 px-6 rounded-lg font-medium transition-colors shadow-lg"
            >
              <span>Conheça a Nanda</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <BaseChat
              customProps={{
                chatTitle: 'Nanda - Assistente Imobiliária',
                inputPlaceholder: 'Digite sua mensagem...',
                avatarText: 'NA'
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NandaPromo;
