import React from 'react';
import { motion } from 'framer-motion';

const TransformSection: React.FC = () => {
  return (
    <section id="transform" className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Da primeira conversa até o fechamento da venda, Nanda cuida de tudo.
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            A Nanda evolui com cada interação e se adapta para melhor atender às necessidades específicas
            de sua imobiliária e seus clientes.
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 hidden md:block"></div>
          
          {/* Timeline steps */}
          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`md:flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Number indicator */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Mobile number indicator - visible only on mobile */}
                  <div className="md:hidden flex mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg shadow-lg mr-3">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                  </div>
                  
                  {/* Content */}
                  <div className="md:w-5/12 p-6 bg-white rounded-xl shadow-md border border-gray-100 md:mx-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 hidden md:block">{step.title}</h3>
                    <p className="text-gray-700">{step.description}</p>
                    <div className="mt-4 text-sm text-blue-700 font-medium">{step.outcome}</div>
                  </div>
                  
                  {/* Empty space for alignment */}
                  <div className="md:w-5/12 hidden md:block"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-lg font-medium text-blue-800">
            A Nanda aprende com cada interação e melhora continuamente para atender melhor sua imobiliária.
          </p>
          <a 
            href="#cta" 
            className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition-all shadow-md"
          >
            Quero ver na prática
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const steps = [
  {
    title: "Primeiro Contato",
    description: "Quando um cliente potencial entra em contato, Nanda responde imediatamente. Ela coleta informações essenciais e entende as necessidades específicas sobre o tipo de imóvel desejado.",
    outcome: "Experiência de atendimento instantâneo e personalizado."
  },
  {
    title: "Engajamento",
    description: "Com base no perfil do cliente, Nanda sugere imóveis que correspondem exatamente às necessidades. Ela fornece informações detalhadas, responde a perguntas específicas e mantém o interesse do cliente.",
    outcome: "Aumento na taxa de conversão e interesse genuíno."
  },
  {
    title: "Agendamento Inteligente",
    description: "Nanda marca visitas aos imóveis de acordo com a disponibilidade do cliente e dos corretores. Ela envia lembretes e confirmações, reduzindo drasticamente as taxas de desistência.",
    outcome: "Otimização de tempo e redução de visitas canceladas."
  },
  {
    title: "Pós-venda",
    description: "Mesmo após o fechamento do negócio, Nanda mantém contato com os clientes para coletar feedback e identificar novas oportunidades, cultivando relacionamentos de longo prazo.",
    outcome: "Aumento de indicações e clientes recorrentes."
  }
];

export default TransformSection;
