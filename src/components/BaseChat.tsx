import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';
import axios from 'axios';

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
    } else {
      // Ensure the API key is actually included in the Authorization header
      config.headers.Authorization = `Bearer ${OPENAI_API_KEY}`;
      console.log('Axios interceptor: Added API key to OpenAI request');
    }
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
      {/* Chat button removed */}

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
          href="https://wa.me/554899230055?text=Ol%C3%A1%21%20Estou%20entrando%20em%20contato%20atrav%C3%A9s%20do%20site."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 z-50"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-colors"
          >
            {/* WhatsApp icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </motion.button>
        </a>
      )}
    </div>
  );
};

export default BaseChat;
