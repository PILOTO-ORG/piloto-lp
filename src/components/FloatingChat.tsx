import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, X, MessageCircle, Minimize2, ChevronDown } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import '../components/chatScrollbar.css';

// OpenAI configuration
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
const OPENAI_ASSISTANT_ID = import.meta.env.VITE_OPENAI_ASSISTANT_ID || '';

// Headers configuration for OpenAI API
const openAIHeaders = OPENAI_API_KEY ? {
  'Authorization': `Bearer ${OPENAI_API_KEY}`,
  'Content-Type': 'application/json',
  'OpenAI-Beta': 'assistants=v2'
} : {};

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'james';
  timestamp: Date;
}

interface FloatingChatProps {
  showWhatsAppButton?: boolean;
  onClose?: () => void;
}

const FloatingChat = ({ showWhatsAppButton = true, onClose }: FloatingChatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! Eu sou o JAMES, assistente virtual da PILOTO. Estou aqui para ajudá-lo a transformar suas ideias em realidade com nossos serviços especializados. Quer saber como podemos facilitar sua vida? Vamos conversar!",
      sender: 'james',
      timestamp: new Date()
    }
  ]);
  const [isMinimized, setIsMinimized] = useState(true); // Inicializa minimizado
  const [isRecording, setIsRecording] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages, isAtBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, isMinimized]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640 && !isMinimized) {
        setIsMinimized(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMinimized]);

  // Set up scroll event listener
  useEffect(() => {
    const container = messagesContainerRef.current;
    
    const handleScroll = () => {
      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        const isBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 10;
        setIsAtBottom(isBottom);
        setShowScrollIndicator(!isBottom && messages.length > 1);
      }
    };

    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToBottom = () => {
    scrollToBottom();
  };

  const toggleMinimize = () => {
    const newState = !isMinimized;
    setIsMinimized(newState);
    if (!newState) {
      setIsOpen(true);
      setTimeout(() => {
        scrollToBottom();
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    console.log('Enviando mensagem do usuário:', userMessage);
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    try {
      // Se não tiver as chaves de API, usa mensagem simulada
      if (!OPENAI_API_KEY || !OPENAI_ASSISTANT_ID) {
        setTimeout(() => {
          const simulatedResponse: Message = {
            id: Date.now(),
            text: "Obrigado pela sua mensagem! Estamos processando sua solicitação e retornaremos em breve. (Resposta simulada - API OpenAI não configurada)",
            sender: 'james',
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, simulatedResponse]);
        }, 1000);
        return;
      }

      console.log('Iniciando nova thread com OpenAI...');
      // Criar um novo thread
      const threadResponse = await axios.post('https://api.openai.com/v1/threads', {}, {
        headers: openAIHeaders
      });

      const threadId = threadResponse.data.id;
      console.log('Thread criada com sucesso. ID:', threadId);

      // Adicionar mensagem à thread
      await axios.post(`https://api.openai.com/v1/threads/${threadId}/messages`, {
        role: 'user',
        content: inputValue
      }, {
        headers: openAIHeaders
      });

      console.log('Executando assistente...');
      // Executar o assistente
      const runResponse = await axios.post(`https://api.openai.com/v1/threads/${threadId}/runs`, {
        assistant_id: OPENAI_ASSISTANT_ID
      }, {
        headers: openAIHeaders
      });

      const runId = runResponse.data.id;
      console.log('Assistente iniciado. Run ID:', runId);

      // Aguardar a conclusão do run
      let run;
      let attempts = 0;
      const maxAttempts = 30; // 30 segundos de timeout
      console.log('Aguardando resposta do assistente...');
      
      do {
        if (attempts >= maxAttempts) {
          throw new Error('Timeout aguardando resposta do assistente');
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        const runStatusResponse = await axios.get(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
          headers: openAIHeaders
        });
        
        run = runStatusResponse.data;
        console.log('Status atual:', run.status);
        attempts++;
      } while (run.status === 'in_progress' || run.status === 'queued');

      if (run.status === 'completed') {
        console.log('Assistente concluiu a resposta');
        // Obter a resposta do assistente
        console.log('Buscando mensagens da thread...');
        const messagesResponse = await axios.get(`https://api.openai.com/v1/threads/${threadId}/messages`, {
          headers: openAIHeaders
        });

        const assistantMessage = messagesResponse.data.data[0];
        console.log('Resposta completa do assistente:', assistantMessage);
        
        if (assistantMessage?.content?.[0]?.text?.value) {
          const jamesResponse: Message = {
            id: Date.now(),
            text: assistantMessage.content[0].text.value,
            sender: 'james',
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, jamesResponse]);
        } else {
          throw new Error('Resposta do assistente em formato inválido');
        }
      } else {
        console.error('Run falhou com status:', run.status);
        throw new Error(`Run failed with status: ${run.status}`);
      }
    } catch (error) {
      console.error('Erro na interação do chat:', error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error('Detalhes do erro da API:', {
          status: axiosError.response?.status,
          data: axiosError.response?.data
        });
      }
      
      const errorMessage: Message = {
        id: Date.now(),
        text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.',
        sender: 'james',
        timestamp: new Date()
      };
      console.log('Enviando mensagem de erro ao usuário');
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const toggleRecording = () => {
    const newRecordingState = !isRecording;
    console.log(` ${newRecordingState ? 'Iniciando' : 'Parando'} gravação de voz`);
    setIsRecording(newRecordingState);
    
    // Simulate voice recognition (in a real app, you would use the Web Speech API)
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        // Simulate recognized text
        console.log(' Texto reconhecido da fala');
        setInputValue("Gostaria de saber mais sobre os serviços");
      }, 3000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const openWhatsApp = () => {
    window.open('https://api.whatsapp.com/send?phone=+5511989225782&text=Olá!%20Estou%20entrando%20em%20contato%20através%20do%20site.', '_blank');
  };

  return (
    <>
      {/* WhatsApp Button */}
      {showWhatsAppButton && (
        <motion.div 
          onClick={openWhatsApp}
          className="fixed bottom-6 left-6 z-50 bg-green-500 text-blue-100 rounded-full shadow-lg p-4 cursor-pointer"
          whileHover={{ scale: 1.05, backgroundColor: '#25D366' }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <MessageCircle className="h-6 w-6" />
        </motion.div>
      )}

      {/* Chat Button */}
      {isMinimized && (
        <motion.div 
          onClick={toggleMinimize}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-blue-200 rounded-2xl shadow-lg px-4 py-2 cursor-pointer flex items-center"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          <p className="text-sm font-medium">Precisa de ajuda?</p>
        </motion.div>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20 
            }}
          >
            <motion.div 
              className="bg-white shadow-xl overflow-hidden flex flex-col w-full sm:w-96 h-[85vh] sm:h-[600px] rounded-lg"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="text-blue-200">
                    <h3 className="font-semibold">JAMES PRO</h3>
                    <p className="text-xs text-blue-100">Assistente Virtual</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setIsMinimized(true);
                      onClose?.();
                    }}
                    className="text-blue-200 hover:text-blue-100 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div 
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-blue-100 rounded-br-none'
                          : 'bg-white text-gray-800 shadow-md rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Scroll Indicator */}
              {showScrollIndicator && (
                <div className="absolute bottom-20 right-6">
                  <motion.button
                    onClick={handleScrollToBottom}
                    className="bg-blue-600 text-blue-200 rounded-full p-2 shadow-md"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.button>
                </div>
              )}

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
                <div className="flex items-center space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={toggleRecording}
                    className={`p-2 rounded-lg transition-colors ${
                      isRecording
                        ? 'bg-red-500 text-blue-100'
                        : 'text-gray-500 hover:text-blue-500'
                    }`}
                  >
                    <Mic className="h-5 w-5" />
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-blue-200 p-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChat;
