import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Bot, Building, ChevronRight, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

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
              <h3 className="text-xl font-semibold">Descubra a Nanda</h3>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Nanda: Sua Equipe Imobiliária Virtual 24/7
            </h2>
            
            <p className="text-lg opacity-90 mb-6">
              Imagine nunca mais perder um lead! Com Nanda, sua imobiliária conquista atendimento instantâneo que <span className="underline">aumenta conversões em até 70%</span>. 
              Enquanto sua concorrência dorme, a Nanda qualifica leads, organiza visitas e fecha negócios automaticamente.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="bg-purple-500/30 p-2 rounded-full mt-1">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium">Domine Todos os Canais de Venda</h4>
                  <p className="opacity-80">Conquiste clientes no WhatsApp, Instagram e seu site com atendimento personalizado 24 horas por dia.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-purple-500/30 p-2 rounded-full mt-1">
                  <Building className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium">Especialista que Vende por Você</h4>
                  <p className="opacity-80">Treinada com seu portfólio completo para oferecer os imóveis perfeitos e agendar visitas no momento certo.</p>
                </div>
              </div>
            </div>
            
            <Link 
              to="/nanda" 
              className="inline-flex items-center space-x-2 bg-white text-purple-700 hover:bg-purple-50 py-3 px-6 rounded-lg font-medium transition-colors shadow-lg"
            >
              <span>Ver Como a Nanda Transforma Negócios</span>
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
            <div className="relative w-full max-w-md">
              {/* Moldura estilizada para mostrar a Nanda */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Cabeçalho da "janela" */}
                <div className="bg-purple-800 p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">NA</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Nanda - Assistente Imobiliária</h4>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  </div>
                </div>
                
                {/* Área das mensagens */}
                <div className="p-6 bg-gray-50">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-start max-w-[80%]">
                      <div className="bg-purple-100 p-3 rounded-lg rounded-tl-none">
                        <p className="text-purple-800">Olá! Sou Nanda, sua assistente virtual especializada no setor imobiliário. Como posso ajudar na busca pelo seu imóvel ideal?</p>
                      </div>
                    </div>
                    <div className="flex items-start self-end max-w-[80%]">
                      <div className="bg-purple-600 p-3 rounded-lg rounded-tr-none">
                        <p className="text-white">Estou procurando um apartamento de 2 quartos com varanda.</p>
                      </div>
                    </div>
                    <div className="flex items-start max-w-[80%]">
                      <div className="bg-purple-100 p-3 rounded-lg rounded-tl-none">
                        <p className="text-purple-800">Perfeito! Tenho ótimas opções para você. Posso te mostrar imóveis nessa categoria e agendar visitas nos horários que preferir.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Barra de entrada de texto */}
                <div className="p-4 border-t border-gray-200 flex items-center">
                  <input 
                    type="text"
                    className="flex-1 py-2 px-4 bg-gray-100 rounded-full text-gray-700 placeholder-gray-500 text-sm"
                    placeholder="Digite sua mensagem..."
                    disabled
                  />
                  <button className="ml-3 p-2 rounded-full bg-purple-600 text-white">
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {/* Elementos decorativos */}
              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-purple-500 rounded-full"></div>
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-purple-500 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NandaPromo;
