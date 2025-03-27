import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Bot, Building, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const JamesPromo: React.FC = () => {
  useEffect(() => {
    console.log("JamesPromo component mounted");
  }, []);

  return (
    <section id="james" className="py-20 bg-gradient-to-br from-blue-900 to-blue-700 text-white relative overflow-hidden">
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
                <Bot className="w-5 h-5 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold">Potencialize com James</h3>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              James: Reduza 80% do Trabalho Manual via WhatsApp
            </h2>
            
            <p className="text-lg opacity-90 mb-6">
              <span className="font-bold">Seu tempo vale ouro!</span> Com James, transforme seu WhatsApp em uma central de comando que automatiza 
              tarefas tediosas, integra seus sistemas e entrega relatórios precisos enquanto você foca no que realmente importa.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-500/30 p-2 rounded-full mt-1">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium">Comandos Simples, Resultados Extraordinários</h4>
                  <p className="opacity-80">Digite naturalmente em português e veja o James executar tarefas que levariam horas em apenas segundos.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-blue-500/30 p-2 rounded-full mt-1">
                  <Building className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium">Integração Sem Complicações</h4>
                  <p className="opacity-80">Conecte-se instantaneamente a seus sistemas sem precisar de conhecimento técnico ou meses de implementação.</p>
                </div>
              </div>
            </div>
            
            <Link 
              to="/james" 
              className="inline-flex items-center space-x-2 bg-white text-blue-700 hover:bg-blue-50 py-3 px-6 rounded-lg font-medium transition-colors shadow-lg"
            >
              <span>Comece a Economizar Tempo Hoje</span>
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
              {/* Moldura estilizada para mostrar o James */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Cabeçalho da "janela" */}
                <div className="bg-blue-800 p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">JA</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">James - Automação via WhatsApp</h4>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  </div>
                </div>
                
                {/* Corpo da conversa */}
                <div className="p-6 bg-gray-50">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-start max-w-[80%]">
                      <div className="bg-blue-100 p-3 rounded-lg rounded-tl-none">
                        <p className="text-blue-800">Olá! Sou o James, seu assistente de automação via WhatsApp. Como posso ajudar a automatizar seus processos?</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start self-end max-w-[80%]">
                      <div className="bg-blue-600 p-3 rounded-lg rounded-tr-none">
                        <p className="text-white">Quero automatizar o envio de relatórios diários.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start max-w-[80%]">
                      <div className="bg-blue-100 p-3 rounded-lg rounded-tl-none">
                        <p className="text-blue-800">Posso ajudar com isso! Vou configurar um comando simples para gerar e enviar seus relatórios automaticamente.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Input area */}
                <div className="p-4 border-t border-gray-200 flex items-center">
                  <input 
                    type="text" 
                    className="flex-1 py-2 px-4 bg-gray-100 rounded-full text-gray-700 placeholder-gray-500 text-sm"
                    placeholder="Digite seu comando..."
                    disabled
                  />
                  <button className="ml-3 p-2 rounded-full bg-blue-600 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Elementos decorativos */}
              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-blue-500 rounded-full"></div>
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-blue-500 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JamesPromo;
