import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Calendar, Users, LineChart, Share2, BarChart3 } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 md:px-8 lg:px-16 bg-white">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Uma assistente virtual que realmente entende seus clientes.
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            A Nanda não é apenas um chatbot. Ela conversa de forma natural, entende necessidades e 
            vende imóveis para você 24/7, trazendo resultados reais para sua imobiliária.
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
    title: "Respostas Instantâneas",
    description: "Atende seus clientes imediatamente, sem tempo de espera, mesmo fora do horário comercial."
  },
  {
    icon: Calendar,
    title: "Agendamento Automático",
    description: "Organiza visitas aos imóveis no horário que o cliente preferir, sincronizando com seu calendário."
  },
  {
    icon: Users,
    title: "Qualificação de Leads",
    description: "Identifica clientes potenciais e envia para seu CRM com todas as informações relevantes."
  },
  {
    icon: LineChart,
    title: "Acompanhamento Contínuo",
    description: "Mantém contato com clientes em todas as etapas do processo de compra ou aluguel."
  },
  {
    icon: Share2,
    title: "Integração Multicanal",
    description: "Funciona perfeitamente no WhatsApp, Instagram e no seu próprio site, criando uma experiência unificada."
  },
  {
    icon: BarChart3,
    title: "Relatórios Inteligentes",
    description: "Acesse métricas detalhadas sobre conversas, interesses dos clientes e efetividade das suas estratégias de venda.",
  }
];

export default AboutSection;
