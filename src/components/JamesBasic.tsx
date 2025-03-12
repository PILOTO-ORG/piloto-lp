import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Mic, 
  Minimize2, 
  MessageCircle,
  X
} from 'lucide-react';

// OpenAI configuration
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API key. Please check your .env file.');
}

// Headers configuration for OpenAI API
const openAIHeaders = {
  'Authorization': `Bearer ${OPENAI_API_KEY}`,
  'Content-Type': 'application/json'
};

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'james';
  timestamp: Date;
}

const JamesBasic: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! Eu sou o JAMES BASIC, assistente virtual da PILOTO. Estou aqui para ajudá-lo com informações básicas sobre nossos serviços. Como posso ajudar?",
      sender: 'james',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

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
        setInputValue("Gostaria de saber mais sobre os serviços básicos");
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

    try {
      // Adicionar uma mensagem de carregamento enquanto espera a resposta
      const loadingId = Date.now();
      setMessages(prev => [
        ...prev, 
        { 
          id: loadingId, 
          text: "Processando sua pergunta...", 
          sender: 'james', 
          timestamp: new Date() 
        }
      ]);

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: openAIHeaders,
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'Você é o JAMES BASIC, um assistente virtual simples da PILOTO. Você fornece informações básicas sobre os serviços da empresa de maneira amigável e direta. Mantenha suas respostas curtas e objetivas.'
            },
            ...messages.map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text
            })),
            {
              role: 'user',
              content: inputValue
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      // Remover a mensagem de carregamento antes de adicionar a resposta
      setMessages(prev => prev.filter(msg => msg.id !== loadingId));

      const data = await response.json();
      const assistantResponse = data.choices[0].message.content;
      
      const jamesResponse: Message = {
        id: Date.now(),
        text: assistantResponse,
        sender: 'james',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, jamesResponse]);
    } catch (error) {
      console.error('Erro na interação do chat:', error);
      
      const errorMessage: Message = {
        id: Date.now(),
        text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.',
        sender: 'james',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isMinimized) {
    return (
      <div 
        onClick={toggleMinimize}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow"
      >
        <MessageCircle className="h-6 w-6" />
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-white rounded-lg shadow-xl overflow-hidden" style={{ width: '350px' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-white">
            <h3 className="font-semibold text-sm">JAMES BASIC</h3>
            <p className="text-xs text-blue-100">Assistente Virtual</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleMinimize}
            className="text-white transition-colors hover:text-blue-200"
          >
            <Minimize2 className="h-4 w-4" />
          </button>
          <button
            onClick={onClose}
            className="text-white transition-colors hover:text-blue-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="overflow-y-auto p-3 space-y-3 bg-gray-50" style={{ height: '300px' }}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-2 rounded-lg text-sm ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-white text-gray-800 shadow border border-gray-100 rounded-bl-none'
              }`}
            >
              <p className="text-xs">{message.text}</p>
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
      <form onSubmit={handleSubmit} className="p-2 bg-white border-t">
        <div className="flex items-center space-x-1">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            className="flex-1 p-2 text-sm border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={toggleRecording}
            className={`p-1.5 rounded-lg transition-colors ${
              isRecording
                ? 'bg-red-500 text-white'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Mic className="h-4 w-4" />
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white p-1.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default JamesBasic;
