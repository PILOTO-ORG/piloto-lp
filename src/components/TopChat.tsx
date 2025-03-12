import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  X,
  ChevronDown
} from 'lucide-react';
import './chatScrollbar.css';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'piloto';
  timestamp: Date;
}

const TopChat: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! Eu sou o Piloto, seu assistente virtual. Como posso te ajudar?",
      sender: 'piloto',
      timestamp: new Date()
    },
    {
      id: 2,
      text: "Posso automatizar tarefas, integrar sistemas e aumentar sua produtividade.",
      sender: 'piloto',
      timestamp: new Date()
    }
  ]);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  // Função para forçar a rolagem para a última mensagem
  const forceScrollToBottom = () => {
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;

        // Usar scrollIntoView como método adicional para garantir a rolagem
        const lastMessageElement = messagesContainerRef.current.querySelector('.last-message');
        if (lastMessageElement) {
          lastMessageElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }
    }, 10);
  };

  // Função para verificar se é necessário mostrar o indicador de scroll
  const checkScrollPosition = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isScrolledToBottom = scrollHeight - scrollTop - clientHeight < 30;
      setShowScrollIndicator(!isScrolledToBottom && messages.length > 2);
    }
  };

  // Função para rolar para o final quando o indicador é clicado
  const handleScrollToBottom = () => {
    forceScrollToBottom();
    setShowScrollIndicator(false);
  };

  // Auto-scroll para o final das mensagens sempre que novas mensagens são adicionadas
  useEffect(() => {
    forceScrollToBottom();
    // Verifica a posição do scroll após a adição de mensagem
    setTimeout(() => {
      checkScrollPosition();
    }, 500);
  }, [messages]);

  // Garantir que o scroll ocorra quando o componente for montado
  useEffect(() => {
    forceScrollToBottom();
  }, []);

  // Adicionar listeners de scroll para o container de mensagens
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, []);

  // Adicionar um event listener para rolagem para garantir que qualquer mudança no conteúdo resulte em scroll para o fim
  useEffect(() => {
    const handleResize = () => forceScrollToBottom();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [messages]);

  const scrollToHero = () => {
    const heroSection = document.getElementById('home');
    if (heroSection) {
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === '') return;

    const userMessage: Message = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    // Simulação de resposta sem animação
    const pilotoResponse: Message = {
      id: Date.now() + 1,
      text: "Esta é uma demonstração do chat. Em uma implementação real, eu responderia com base em inteligência artificial.",
      sender: 'piloto',
      timestamp: new Date()
    };
    
    setTimeout(() => {
      setMessages(prev => [...prev, pilotoResponse]);
    }, 500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isVisible) return null;

  return (
    <div className="w-full bg-gradient-to-b from-gray-800 to-gray-900 mt-[80px]">
      <div className="w-full max-w-5xl mx-auto px-4 py-4">
        <div 
          ref={chatContainerRef}
          className="w-full mx-auto bg-gray-800 rounded-xl shadow-xl flex flex-col"
          style={{ height: "450px" }}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900 rounded-t-xl">
            <h2 className="text-xl font-semibold text-blue-300 flex items-center">
              <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
              Converse com o Piloto
            </h2>
          </div>
          
          <div 
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar"
          >
            {/* Indicador de scroll para baixo */}
            <AnimatePresence>
              {showScrollIndicator && (
                <motion.div 
                  className="scroll-indicator"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={handleScrollToBottom}
                >
                  <ChevronDown size={24} />
                </motion.div>
              )}
            </AnimatePresence>
            
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} ${index === messages.length - 1 ? 'last-message' : ''}`}
                data-last={index === messages.length - 1 ? 'true' : 'false'}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-blue-100 rounded-br-none'
                      : 'bg-gray-700 text-blue-200 rounded-bl-none'
                  }`}
                >
                  <p className="text-base">{message.text}</p>
                  <span className={`text-sm mt-2 block ${
                    message.sender === 'user' ? 'text-blue-200' : 'text-blue-300'
                  }`}>
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}
            {/* Elemento de referência para scroll */}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
            <div className="relative flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-5 py-3 bg-gray-700 text-white rounded-lg pr-14 focus:outline-none focus:ring-1 focus:ring-blue-500 text-base"
                placeholder="Digite sua mensagem..."
              />
              <button 
                type="submit"
                className="absolute right-3 p-2 text-gray-400 hover:text-white"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TopChat;
