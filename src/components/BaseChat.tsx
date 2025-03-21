import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, X, MessageCircle, ChevronDown } from 'lucide-react';
import axios, { AxiosError } from 'axios';

// OpenAI configuration
const OPENAI_API_KEY = import.meta.env.VITE_APP_OPENAI_API_KEY || 'sk-exemplo-temporario123456789';

// Configurando interceptor do Axios para garantir que a chave API seja incluída em todas as chamadas
axios.interceptors.request.use(config => {
  if (config.url?.includes('api.openai.com')) {
    config.headers = config.headers || {};
    
    if (!OPENAI_API_KEY || OPENAI_API_KEY === 'sk-exemplo-temporario123456789') {
      console.error('OpenAI API key is missing or using a placeholder. Please check your .env file.');
      if (import.meta.env.DEV) {
        console.log('Development mode - mocking OpenAI API call');
        config.url = 'https://mock-api.local/v1/chat/completions';
      }
    }
    
    config.headers.Authorization = `Bearer ${OPENAI_API_KEY}`;
    console.log('Axios interceptor: Added API key to OpenAI request');
  }
  return config;
});

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface BaseChatProps {
  showWhatsAppButton?: boolean;
  onClose?: () => void;
  openOnHover?: boolean;
  customProps?: {
    initialMessages?: Message[];
    avatarText?: string;
    chatTitle?: string;
    inputPlaceholder?: string;
  };
}

const BaseChat: React.FC<BaseChatProps> = ({ 
  showWhatsAppButton = true, 
  onClose, 
  openOnHover = false, 
  customProps 
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(customProps?.initialMessages || []);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    setIsSending(true);
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    try {
      // Simula uma resposta da API
      const assistantMessage: Message = {
        id: Date.now() + 1,
        text: 'Olá! Como posso ajudar você hoje?',
        sender: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (openOnHover && chatRef.current) {
      const handleMouseEnter = () => setIsChatOpen(true);
      const handleMouseLeave = () => setIsChatOpen(false);

      chatRef.current.addEventListener('mouseenter', handleMouseEnter);
      chatRef.current.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        chatRef.current?.removeEventListener('mouseenter', handleMouseEnter);
        chatRef.current?.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [openOnHover]);

  return (
    <div ref={chatRef} className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {!isChatOpen && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsChatOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl w-96 h-[600px] fixed bottom-16 right-4 z-50"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">{customProps?.chatTitle || 'Chat'}</h3>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-[500px] overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 ${
                    message.sender === 'user' ? 'ml-auto' : 'mr-auto'
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-[80%] ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={customProps?.inputPlaceholder || 'Digite sua mensagem...'}
                  className="flex-1 p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSending}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isSending || !inputValue.trim()}
                  className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showWhatsAppButton && (
        <a
          href="https://wa.me/5511999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 left-4 z-50"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </motion.button>
        </a>
      )}
    </div>
  );
};

export default BaseChat;
