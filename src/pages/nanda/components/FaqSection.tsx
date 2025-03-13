import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
  index: number;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer, isOpen, toggleOpen, index }) => {
  return (
    <motion.div 
      className="border-b border-gray-200 py-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <button 
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={toggleOpen}
      >
        <span className="text-lg font-semibold text-gray-900">{question}</span>
        {isOpen ? 
          <ChevronUp className="h-5 w-5 text-blue-600" /> : 
          <ChevronDown className="h-5 w-5 text-blue-600" />
        }
      </button>
      <div 
        className={`mt-2 text-gray-700 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="pb-2">{answer}</p>
      </div>
    </motion.div>
  );
};

const FaqSection: React.FC = () => {
  // State to track which FAQ item is open
  const [openItem, setOpenItem] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 md:px-8 lg:px-16 bg-white">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Dúvidas? Temos as respostas.
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Saiba mais sobre como a Nanda pode transformar o atendimento da sua imobiliária.
          </p>
        </motion.div>

        <div className="space-y-2">
          {faqItems.map((item, index) => (
            <FaqItem 
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openItem === index}
              toggleOpen={() => toggleItem(index)}
              index={index}
            />
          ))}
        </div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
        </motion.div>
      </div>
    </section>
  );
};

const faqItems = [
  {
    question: "Como a Nanda aprende sobre meus imóveis?",
    answer: "A Nanda se integra diretamente ao seu CRM, base de dados ou planilhas. Nosso time de implementação configura a base de conhecimento inicial com os detalhes dos seus imóveis, processos e valores da sua empresa. Após a implementação, a Nanda aprende e se aperfeiçoa com cada interação."
  },
  {
    question: "Preciso de equipe técnica para instalar?",
    answer: "Não, nossa equipe cuida de todo o processo de implementação. A Nanda é projetada para ser fácil de configurar, e fornecemos suporte técnico completo durante a integração com seus sistemas existentes."
  },
  {
    question: "Em quais canais a Nanda pode responder clientes?",
    answer: "A Nanda pode atuar em múltiplos canais simultaneamente: WhatsApp, Instagram, chat do site, e até e-mail. Isso proporciona uma experiência de atendimento consistente independente do canal que seu cliente preferir."
  },
  {
    question: "Como é garantida a qualidade das respostas da Nanda?",
    answer: "A Nanda é treinada com dados do mercado imobiliário e adaptada para usar linguagem apropriada para o setor. Ela passa por um rigoroso controle de qualidade antes da implantação e conta com mecanismos de segurança que garantem respostas adequadas e profissionais."
  },
  {
    question: "Quanto tempo leva para implementar a Nanda na minha imobiliária?",
    answer: "O processo de implementação geralmente leva de 1 a 2 semanas, dependendo da complexidade da sua operação e da quantidade de dados a serem integrados. Nosso objetivo é garantir que a Nanda esteja perfeitamente adaptada às necessidades da sua imobiliária antes de entrar em operação."
  },
  {
    question: "A Nanda substitui corretores humanos?",
    answer: "Não. A Nanda funciona como uma assistente, liberando sua equipe de tarefas repetitivas e de baixo valor. Seus corretores continuarão realizando o trabalho estratégico e de relacionamento, enquanto a Nanda cuida da qualificação inicial, agendamentos e follow-ups automatizados."
  }
];

export default FaqSection;
