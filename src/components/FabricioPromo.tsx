import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Bot, Building, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FabricioPromo: React.FC = () => {
  useEffect(() => {
    console.log("FabricioPromo component mounted");
  }, []);

  return (
    <section id="fabricio" className="py-20 bg-gradient-to-br from-green-900 to-green-700 text-white relative overflow-hidden">
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
                <Bot className="w-5 h-5 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold">Conheça o Fabricio</h3>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Fabricio: Negociação Inteligente
            </h2>
            
            <p className="text-lg opacity-90 mb-6">
              Otimize suas compras com o Fabricio, nossa solução de negociação inteligente. 
              Conecte-se ao seu ERP, compare preços e negocie automaticamente para reduzir custos e melhorar a qualidade.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="bg-green-500/30 p-2 rounded-full mt-1">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium">Comparação Inteligente</h4>
                  <p className="opacity-80">Analise e compare preços de fornecedores automaticamente.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-green-500/30 p-2 rounded-full mt-1">
                  <Building className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium">Integração com ERP</h4>
                  <p className="opacity-80">Conecte-se ao seu sistema de gestão para automatizar processos de compra.</p>
                </div>
              </div>
            </div>
            
            <Link 
              to="/fabricio" 
              className="inline-flex items-center space-x-2 bg-white text-green-700 hover:bg-green-50 py-3 px-6 rounded-lg font-medium transition-colors shadow-lg"
            >
              <span>Conheça o Fabricio</span>
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
              {/* Moldura estilizada para mostrar o Fabricio */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Cabeçalho da "janela" */}
                <div className="bg-green-800 p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">FA</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Fabricio - Negociação Inteligente</h4>
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
                      <div className="bg-green-100 p-3 rounded-lg rounded-tl-none">
                        <p className="text-green-800">Olá! Sou o Fabricio, seu assistente de negociação inteligente. Como posso ajudar a otimizar suas compras?</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start self-end max-w-[80%]">
                      <div className="bg-green-600 p-3 rounded-lg rounded-tr-none">
                        <p className="text-white">Preciso encontrar o melhor fornecedor para matéria-prima X.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start max-w-[80%]">
                      <div className="bg-green-100 p-3 rounded-lg rounded-tl-none">
                        <p className="text-green-800">Vou analisar os fornecedores cadastrados e comparar preços, qualidade e prazos de entrega para encontrar a melhor opção.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Input area */}
                <div className="p-4 border-t border-gray-200 flex items-center">
                  <input 
                    type="text" 
                    className="flex-1 py-2 px-4 bg-gray-100 rounded-full text-gray-700 placeholder-gray-500 text-sm"
                    placeholder="Digite sua consulta..."
                    disabled
                  />
                  <button className="ml-3 p-2 rounded-full bg-green-600 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Elementos decorativos */}
              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-green-500 rounded-full"></div>
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-green-500 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FabricioPromo;
