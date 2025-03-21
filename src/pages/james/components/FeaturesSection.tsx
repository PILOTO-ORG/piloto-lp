import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Calendar, Users, LineChart, Share2, BarChart3 } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Principais Funcionalidades
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Conheça as principais capacidades do James que transformarão sua gestão empresarial.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-50 p-3 inline-block rounded-lg mb-4">
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    icon: MessageSquare,
    title: "Conexão via API",
    description: "Integra-se com seus sistemas de gestão através de APIs seguras e eficientes."
  },
  {
    icon: Calendar,
    title: "Automação de Tarefas",
    description: "Automatiza processos administrativos, liberando seu tempo para focar no que realmente importa."
  },
  {
    icon: Users,
    title: "Relatórios Automáticos",
    description: "Gera relatórios detalhados e personalizados sobre o desempenho de sua empresa."
  },
  {
    icon: LineChart,
    title: "Integração com WhatsApp",
    description: "Gerencia suas operações através do WhatsApp, mantendo a comunicação organizada e profissional."
  },
  {
    icon: Share2,
    title: "Sincronização em Tempo Real",
    description: "Atualiza seus sistemas em tempo real, garantindo que suas informações estejam sempre atualizadas."
  },
  {
    icon: BarChart3,
    title: "Dashboard Inteligente",
    description: "Acesse métricas e KPIs importantes em um dashboard intuitivo e personalizável.",
  }
];

export default FeaturesSection;
