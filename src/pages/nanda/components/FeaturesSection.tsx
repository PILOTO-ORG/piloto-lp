import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Home, RefreshCw, Target, Clock, Calendar, MessageCircle } from 'lucide-react';
import NandaChat from './NandaChat';

// Define the Message type to match NandaChat
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'nanda';
  timestamp: Date;
}

const FeaturesSection: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  
  // Create the predefined conversation that matches the preview
  const previewMessages: Message[] = [
    {
      id: 1,
      text: "Olá! Sou Nanda, sua assistente virtual especializada no setor imobiliário. Como posso ajudar na busca pelo seu imóvel ideal?",
      sender: 'nanda',
      timestamp: new Date()
    },
    {
      id: 2,
      text: "Estou procurando um apartamento de 2 quartos com varanda na zona sul.",
      sender: 'user',
      timestamp: new Date()
    },
    {
      id: 3,
      text: "Perfeito! Encontrei 8 apartamentos com essas características. Gostaria de ver alguns dos destaques ou prefere filtrar mais a sua busca?",
      sender: 'nanda',
      timestamp: new Date()
    }
  ];
  
  const handleOpenChat = () => {
    setShowChat(true);
  };
  
  return (
    <section id="features" className="py-20 px-4 md:px-8 lg:px-16 bg-white">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Uma solução completa para imobiliárias modernas.
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Nanda combina inteligência artificial avançada com conhecimento especializado 
            do mercado imobiliário para transformar sua operação.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`p-4 rounded-full w-14 h-14 flex items-center justify-center mb-5 ${feature.bgColor}`}>
                <feature.icon className={`h-7 w-7 ${feature.iconColor}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Interactive Chat Section */}
        <motion.div 
          className="mt-20 bg-blue-50 p-8 md:p-12 rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                Veja a Nanda em ação
              </h3>
              <p className="text-gray-700 mb-6">
                Nossa assistente virtual é treinada com os dados dos seus imóveis e utiliza linguagem natural 
                para conversar com seus clientes como se fosse um membro dedicado da sua equipe.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    <span className="text-gray-800 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
              

            </div>
            
            <div className="lg:w-1/2">
              <div className="bg-white rounded-lg shadow-xl p-6 border-2 border-purple-200">
                <div className="flex items-center space-x-3 mb-5">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">NA</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Nanda - Assistente Imobiliária</h4>
                    <p className="text-sm text-gray-500">Disponível 24/7</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  {previewMessages.map((msg, index) => (
                    msg.sender === 'nanda' ? (
                      <div key={index} className="bg-purple-100 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                        <p className="text-gray-800">{msg.text}</p>
                      </div>
                    ) : (
                      <div key={index} className="flex justify-end">
                        <div className="bg-purple-600 p-3 rounded-lg rounded-tr-none max-w-[80%]">
                          <p className="text-white">{msg.text}</p>
                        </div>
                      </div>
                    )
                  ))}
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Floating Chat with predefined messages */}
      {showChat && (
        <div className="fixed bottom-6 right-6 z-50">
          <NandaChat 
            showWhatsAppButton={false}
            predefinedMessages={previewMessages}
          />
        </div>
      )}
    </section>
  );
};

const features = [
  {
    icon: Clock,
    title: "Respostas Instantâneas",
    description: "Atende seus clientes imediatamente, sem tempo de espera, mesmo fora do horário comercial.",
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600"
  },
  {
    icon: Calendar,
    title: "Agendamento Automático",
    description: "Organiza visitas aos imóveis no horário que o cliente preferir, sincronizando com seu calendário.",
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-600"
  },
  {
    icon: Smartphone,
    title: "Atendimento Omnichannel",
    description: "Funciona perfeitamente no WhatsApp, Instagram e site, proporcionando uma experiência consistente em todos os canais.",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    icon: Home,
    title: "Personalização Total",
    description: "Treinada com as informações específicas dos seus imóveis, respondendo com precisão sobre localização, características e valores.",
    bgColor: "bg-green-50",
    iconColor: "text-green-600"
  },
  {
    icon: RefreshCw,
    title: "Integração com CRM",
    description: "Envia leads qualificados diretamente para seu sistema, mantendo todas as informações organizadas e acessíveis.",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600"
  },
  {
    icon: Target,
    title: "Follow-up Automático",
    description: "Mantém contato com clientes em intervalos estratégicos, garantindo que nenhuma oportunidade seja perdida.",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600"
  },

];

const benefits = [
  "Redução de 80% no tempo de resposta",
  "Atendimento 24/7 sem custos adicionais",
  "Aumento médio de 40% na taxa de conversão",
  "Qualificação precisa de leads"
];

export default FeaturesSection;
