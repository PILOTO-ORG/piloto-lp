import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mic, 
  Minimize2, 
  X,
  Bot,
  User,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'james';
  timestamp: Date;
}

const JamesAssistant: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! Eu sou o JAMES, assistente virtual da PILOTO. Estou aqui para ajudá-lo a transformar suas ideias em realidade com nossos serviços especializados. Quer saber como podemos facilitar sua vida? Vamos conversar!",
      sender: 'james',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Função melhorada para garantir que o scroll sempre alcance o fundo
  const forceScrollToBottom = () => {
    // Usando setTimeout em cascata para garantir que o DOM foi totalmente atualizado
    setTimeout(() => {
      if (messagesContainerRef.current) {
        const container = messagesContainerRef.current;
        
        // Primeiro, tenta o scroll regular
        container.scrollTop = container.scrollHeight;
        
        // Em seguida, tenta encontrar e scrollar para o último elemento com classe específica
        const lastMessageElement = container.querySelector('.last-message');
        if (lastMessageElement) {
          // Se encontrarmos o elemento, usamos scrollIntoView
          lastMessageElement.scrollIntoView({ block: 'end', inline: 'nearest' });
        }
        
        // Verificação adicional após o DOM ser atualizado
        setTimeout(() => {
          // Tenta ambos os métodos novamente
          container.scrollTop = container.scrollHeight;
          
          const lastElement = container.querySelector('.last-message');
          if (lastElement) {
            lastElement.scrollIntoView({ block: 'end', inline: 'nearest' });
          }
          
          // Terceira verificação para casos de imagens ou conteúdo dinâmico
          setTimeout(() => {
            container.scrollTop = container.scrollHeight;
            
            const finalElement = container.querySelector('.last-message');
            if (finalElement) {
              finalElement.scrollIntoView({ block: 'end', inline: 'nearest' });
            }
          }, 300);
        }, 100);
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
    
    // Garantir scroll quando as imagens carregarem
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.complete) {
        forceScrollToBottom();
      } else {
        img.addEventListener('load', forceScrollToBottom);
      }
    });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      images.forEach(img => {
        img.removeEventListener('load', forceScrollToBottom);
      });
    };
  }, [messages]);

  // Quando o chat é maximizado, garantir que o scroll está na posição correta
  useEffect(() => {
    if (!isMinimized) {
      forceScrollToBottom();
      // Focar no input quando o chat é aberto/maximizado
      inputRef.current?.focus();
    }
  }, [isMinimized]);

  // Limpar listener de resize quando componente é desmontado
  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth < 640 && !isMinimized) {
        setIsMinimized(true);
      }
    };

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [isMinimized]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Simulação de gravação por 3 segundos
      setTimeout(() => {
        setIsRecording(false);
        setInputValue("Gostaria de saber mais sobre os serviços profissionais");
      }, 3000);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Forçar scroll para baixo imediatamente após a mensagem do usuário
    forceScrollToBottom();

    try {
      // Adicionar uma mensagem de carregamento enquanto espera a resposta
      const loadingId = Date.now();
      setMessages(prev => [
        ...prev, 
        { 
          id: loadingId, 
          text: "Analisando sua consulta...", 
          sender: 'james', 
          timestamp: new Date() 
        }
      ]);
      
      // Forçar scroll para a mensagem de carregamento
      forceScrollToBottom();

      // Simular uma breve latência de rede (1-2 segundos)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Resposta simulada do JAMES PRO
      const jamesResponse: Message = {
        id: Date.now(),
        text: "Nossos serviços profissionais incluem consultoria em automação, desenvolvimento de soluções personalizadas, integração de sistemas e muito mais. Temos especialistas que podem analisar suas necessidades específicas e propor as melhores soluções para seu negócio. Gostaria de agendar uma demonstração ou saber mais sobre algum serviço em particular?",
        sender: 'james',
        timestamp: new Date()
      };
      
      // Remover a mensagem de carregamento e adicionar a resposta
      setMessages(prev => prev.filter(m => m.id !== loadingId).concat(jamesResponse));
      
      // Forçar scroll para a resposta final
      forceScrollToBottom();
      
    } catch (error) {
      console.error('Erro ao processar a mensagem:', error);
      
      // Mensagem de erro para o usuário
      setMessages(prev => [
        ...prev, 
        { 
          id: Date.now(), 
          text: "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente mais tarde.", 
          sender: 'james', 
          timestamp: new Date() 
        }
      ]);
      
      // Garantir scroll mesmo após erro
      forceScrollToBottom();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <AnimatePresence>
      {isMinimized ? (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)" }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMinimize}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-indigo-700 text-blue-200 rounded-full shadow-lg p-4 cursor-pointer"
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <Bot className="h-6 w-6 text-blue-200" />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden flex flex-col"
          style={{ width: '350px', maxHeight: '80vh' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-3 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 p-2 rounded-full">
                <Bot className="text-blue-200" size={18} />
              </div>
              <div>
                <h3 className="text-blue-200 font-medium text-sm">JAMES PRO</h3>
                <p className="text-xs text-blue-300">Assistente Profissional</p>
              </div>
            </div>
            <div className="flex items-center">
              <motion.button
                onClick={toggleMinimize}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Minimize2 size={14} className="text-blue-200" />
              </motion.button>
              <motion.button
                onClick={onClose}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={14} className="text-blue-200" />
              </motion.button>
            </div>
          </div>

          {/* Messages Container */}
          <motion.div 
            animate={{ height: isMinimized ? 0 : 350 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div 
              ref={messagesContainerRef}
              className="p-4 bg-gray-50 dark:bg-gray-800 overflow-y-auto custom-scrollbar"
              style={{ height: '350px' }}
            >
              <AnimatePresence>
                {showScrollIndicator && (
                  <motion.div 
                    className="scroll-indicator"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={handleScrollToBottom}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="space-y-3 w-full">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        y: { type: "spring", stiffness: 300, damping: 20 },
                        opacity: { duration: 0.3 }
                      }
                    }}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    } ${index === messages.length - 1 ? 'last-message' : ''}`}
                    data-last={index === messages.length - 1 ? 'true' : 'false'}
                  >
                    {message.sender === 'james' && (
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-700 flex items-center justify-center mr-2 mt-1"
                      >
                        <Bot size={16} className="text-blue-200" />
                      </motion.div>
                    )}
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className={`max-w-[75%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-purple-600 text-blue-100 rounded-br-none'
                          : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-blue-200 shadow rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className={`text-xs ${
                          message.sender === 'user' ? 'text-blue-200' : 'text-blue-400'
                        }`}>
                          {formatTime(message.timestamp)}
                        </span>
                        {message.sender === 'james' && (
                          <motion.button 
                            whileHover={{ scale: 1.2 }} 
                            whileTap={{ scale: 0.9 }}
                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                          >
                            <ExternalLink size={12} />
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                    {message.sender === 'user' && (
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center ml-2 mt-1"
                      >
                        <User size={16} className="text-blue-200" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
                <div ref={messagesEndRef} className="h-0 w-full" />
              </div>
            </div>
          </motion.div>

          {/* Input */}
          {!isMinimized && (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="border-t border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-900"
            >
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Envie sua mensagem..."
                  className="w-full px-4 py-2 pr-12 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
                <div className="absolute right-2 flex space-x-1">
                  <motion.button
                    type="button"
                    onClick={toggleRecording}
                    className={`p-1.5 rounded-full ${
                      isRecording ? 'text-red-500' : 'text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Mic className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={inputValue.trim() === ''}
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.form>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JamesAssistant;
