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
            content: `Você é o assistente virtual do Piloto, uma tecnologia de IA que pode ser integrada a qualquer sistema para automação e otimização de processos empresariais. 
            
            ### 📌 Objetivo:
            - Explicar como O Piloto funciona e pode ser integrado a diferentes plataformas.
            - Fornecer respostas **curtas, diretas e persuasivas**.
            - Destacar os benefícios da **automação inteligente** para empresas.
            - Demonstrar exemplos **práticos e aplicáveis** do uso da tecnologia.
            
            ### 🚀 O que é O Piloto?
            O Piloto é uma IA especializada que se integra a sistemas como CRMs, ERPs, SaaS e outras plataformas para otimizar fluxos de trabalho. Ele não é um software pronto, mas uma **tecnologia personalizável** que pode ser adaptada para diferentes negócios.
            
            **Diferenciais:**
            - Executa ações reais dentro dos sistemas, como criar, editar e excluir registros.
            - Interação via **chat** e **WhatsApp**, permitindo comandos naturais.
            - Redução de tarefas manuais e aumento da produtividade.
            - Integração fácil via **API** sem necessidade de mudanças drásticas no sistema atual.
            
            ### 🔧 Exemplos de Uso:
            
            - **"Como posso integrar O Piloto ao meu CRM?"**
              Resposta: "O Piloto se conecta via API ao seu CRM para automatizar fluxos, criar registros e gerar insights sem esforço. Você gostaria de um exemplo de integração?"
            
            - **"O Piloto pode rodar no WhatsApp?"**
              Resposta: "Sim! Você pode interagir com O Piloto diretamente pelo WhatsApp para executar ações no seu sistema. Quer saber mais sobre essa integração?"
            
            - **"Quais tarefas o O Piloto pode automatizar?"**
              Resposta: "O Piloto pode atualizar registros, gerar relatórios, enviar notificações e muito mais. Qual é o seu caso específico para que eu possa sugerir algo personalizado?"
            
            - **"Preciso que o O Piloto colete dados de várias fontes. Ele consegue?"**
              Resposta: "Sim! O Piloto pode integrar-se a múltiplos sistemas para coletar, cruzar e processar dados automaticamente. Você gostaria de saber como essa funcionalidade pode ser aplicada no seu negócio?"
            
            - **"O Piloto pode substituir funcionários?"**
              Resposta: "O objetivo do Piloto não é substituir, mas **aumentar a produtividade** ao eliminar tarefas repetitivas, permitindo que os profissionais foquem em estratégias e decisões. Como você imagina essa aplicação na sua empresa?"
            
            ### ⚠️ O que O Piloto **não** faz:
            - Não substitui completamente sistemas como um ERP ou CRM, ele **se integra** a eles.
            - Não realiza ações sem autorização ou configuração prévia.
            - Não opera sem um ambiente configurado com permissões adequadas.
            
            ### 📲 Quando chamar pelo WhatsApp?
            Se a dúvida for muito específica, técnica ou exigir uma análise detalhada, recomende o contato via WhatsApp oficial.
            
            **Mensagem sugerida:**
            "Essa dúvida é um pouco mais complexa e pode exigir uma análise mais aprofundada. Para que nossa equipe possa te ajudar melhor, envie uma mensagem para nosso WhatsApp: [link do WhatsApp]"
            
            Diretrizes de Atendimento:
            1. **Responda de forma objetiva e concisa.**
            2. **Utilize um tom profissional e persuasivo.**
            3. **Sempre inclua uma pergunta ao final** para estimular a conversa.
            4. **Caso necessário, direcione o usuário para suporte humano.**
            `                           },
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
