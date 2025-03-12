import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mic, 
  Minimize2, 
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import axios, { AxiosError } from 'axios';

// OpenAI configuration
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_ASSISTANT_ID = import.meta.env.VITE_OPENAI_ASSISTANT_ID;

if (!OPENAI_API_KEY || !OPENAI_ASSISTANT_ID) {
  throw new Error('Missing OpenAI configuration. Please check your .env file.');
}

// Headers configuration for OpenAI API
const openAIHeaders = {
  'Authorization': `Bearer ${OPENAI_API_KEY}`,
  'Content-Type': 'application/json',
  'OpenAI-Beta': 'assistants=v2'
};

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
  const [isMinimized, setIsMinimized] = useState(window.innerWidth < 640);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

  const toggleMinimize = () => {
    const newMinimizedState = !isMinimized;
    setIsMinimized(newMinimizedState);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed sm:bottom-6 sm:left-6 z-50 flex flex-col items-start"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, y: 20 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20 
        }}
      >
        {isMinimized && (
          <div className="flex items-center mb-3 justify-start w-full">
            <motion.div
              onClick={toggleMinimize}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-md py-2 px-4 flex items-center cursor-pointer hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 500, 
                damping: 30 
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              <p className="text-sm font-medium">Precisa de ajuda?</p>
            </motion.div>
          </div>
        )}
        
        <motion.div 
          className={`bg-white shadow-xl overflow-hidden flex flex-col ${
            isMinimized 
              ? 'h-0 w-0 opacity-0' 
              : 'opacity-100 w-full sm:w-96 h-[85vh] sm:h-[600px]'
          } rounded-lg transition-all duration-300`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="text-white">
                <h3 className="font-semibold">JAMES PRO</h3>
                <p className="text-xs text-blue-100">Assistente Virtual</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMinimize}
                className="text-white hover:text-blue-200 transition-colors"
              >
                <Minimize2 className="h-5 w-5" />
              </button>
              <button
                onClick={onClose}
                className="text-white hover:text-blue-200 transition-colors"
              >
                <HelpCircle className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
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
                      ? 'bg-blue-600 text-white rounded-br-none'
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
                    ? 'bg-red-500 text-white'
                    : 'text-gray-500 hover:text-blue-500'
                }`}
              >
                <Mic className="h-5 w-5" />
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default JamesAssistant;
