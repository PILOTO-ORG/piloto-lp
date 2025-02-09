import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import axios from 'axios';
import styles from './ChatBot.module.css';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Olá! Sou o assistente d\'O Piloto, especializado em ajudar você a descobrir e aproveitar ao máximo nossos serviços de marketing digital. Como posso te ajudar hoje?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' as const };
    console.log('📤 User Message:', userMessage.text);
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      console.log('🔄 Sending request to OpenAI API...');
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
          { 
            role: 'system', 
            content: `Você é o assistente virtual d'O Piloto, um sistema de IA avançado especializado na automação de processos em CRMs, ERPs e outras plataformas empresariais.
            
            Objetivo:
            - Ajudar empresas a otimizarem suas operações por meio da IA.
            - Responder dúvidas sobre o funcionamento do O Piloto.
            - Explicar como integrar a solução aos sistemas do cliente.
            - Demonstrar com exemplos práticos como a IA pode melhorar a produtividade.
            
            Principais funcionalidades:
            - Automação de tarefas repetitivas.
            - Geração de insights estratégicos e relatórios.
            - Integração simplificada com APIs de terceiros.
            - Interação via chat para execução de comandos diretos.
            - Suporte técnico baseado em IA.
            
            Diretrizes de atendimento:
            1. Responda com clareza e objetividade.
            2. Evite termos técnicos excessivos, a menos que o usuário seja um desenvolvedor.
            3. Seja amigável e eficiente, mantendo um tom profissional.
            4. Sempre direcione o usuário para a melhor solução baseada no O Piloto.`
                 },
          ...messages.map(msg => ({ role: msg.sender === 'user' ? 'user' : 'assistant', content: msg.text })),
          { role: 'user', content: input }
        ]
      }, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      const botMessage = {
        text: response.data.choices[0].message.content,
        sender: 'bot' as const
      };
      console.log('📥 Bot Response:', botMessage.text);
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('❌ Error in chat interaction:', error);
      if (axios.isAxiosError(error)) {
        console.error('API Error Details:', {
          status: error.response?.status,
          data: error.response?.data
        });
      }
      const errorMessage = {
        text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.',
        sender: 'bot' as const
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <>
      {/* Chat Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-5 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 z-50"
        aria-label="Abrir chat"
      >
        <MessageCircle className="w-8 h-8 text-white" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-5 w-[350px] h-[500px] bg-white rounded-lg shadow-xl z-50 flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-blue-600 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-6 h-6 text-white" />
              <h3 className="text-white font-semibold">Piloto - Chat</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-blue-700 rounded-lg p-2 transition-colors"
              aria-label="Fechar chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className={`flex-1 overflow-y-auto p-4 bg-gray-50 ${styles['custom-scrollbar']}`}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 shadow-sm rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t">
            <form onSubmit={sendMessage} className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                aria-label="Enviar mensagem"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
