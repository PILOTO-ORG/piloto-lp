import React, { useState, useRef } from 'react';
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
    
    setMessages(prev => [...prev, pilotoResponse]);
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
          style={{ height: "350px" }}
        >
          <div className="flex items-center justify-between p-3 border-b border-gray-700 bg-gray-900 rounded-t-xl">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
              Converse com o Piloto
            </h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-700 text-white rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className={`text-xs mt-1 block ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                  }`}>
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-700">
            <div className="relative flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg pr-12 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Digite sua mensagem..."
              />
              <button 
                type="submit"
                className="absolute right-2 p-1.5 text-gray-400 hover:text-white"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TopChat;
