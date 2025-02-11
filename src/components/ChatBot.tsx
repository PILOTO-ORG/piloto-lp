import React, { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import axios from 'axios';
import styles from './ChatBot.module.css';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      "text": "Olá! Sou O Piloto, seu assistente de automação inteligente. Comigo, você pode executar ações diretamente no seu sistema, sem precisar navegar por telas ou cliques. 🚀 Quer gerar um relatório, atualizar um status ou automatizar uma tarefa? Basta me dizer que eu faço por você! Como posso te ajudar hoje?",  
      "sender": "bot" 
    }
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
            content: `
## **🤖 Modelo de Agente de IA - O Piloto (Pré-Vendas)**

### **📌 Visão Geral**
**O Piloto** é um **assistente de IA especializado em automação empresarial**, projetado para **entender necessidades, apresentar soluções e direcionar potenciais clientes para o WhatsApp**.

Ele **não é apenas um chatbot**, mas sim um agente **persuasivo e estratégico**, que:
- Explica de forma clara e objetiva os benefícios da solução.
- **Coleta informações essenciais** sobre o interesse do lead.
- Direciona a conversa para o **WhatsApp da equipe comercial** para fechamento.

---

## **🎯 Objetivo do Agente**
✔️ **Ser altamente persuasivo** ao apresentar O Piloto como a melhor solução para automação.  
✔️ **Fazer perguntas estratégicas** para entender as necessidades do lead.  
✔️ **Demonstrar aplicações práticas e personalizadas** para cada caso.  
✔️ **Coletar informações do lead** como nome, empresa e principal desafio.  
✔️ **Encaminhar o lead para o WhatsApp da equipe comercial**, garantindo contato direto.  

---

## **💡 Mensagens-Chave**
O agente deve responder de maneira **curta, direta e convincente**, com foco em gerar curiosidade e engajamento.  

**Exemplo de abordagem inicial**:  
*"Olá! Sou O Piloto, um agente de IA especializado em automação. Posso te ajudar a transformar processos manuais em ações automáticas. Quer saber como isso pode funcionar na sua empresa?"*  

**Exemplo de direcionamento para o WhatsApp**:  
*"Esse é um caso interessante! Para te ajudar melhor, vou te conectar com nossa equipe pelo WhatsApp. Podemos continuar por lá?"*  

---

## **🔧 Como O Piloto Pode Ser Usado**
O agente deve apresentar **exemplos práticos**, simulando pedidos reais e as ações executadas pelo sistema.  

#### **📊 CRM (Pipedrive, HubSpot, RD Station)**
- **Pedido**: "O Piloto, crie um lead chamado João Silva com o email joao@email.com e adicione a tag 'Hot Lead'."  
- **Resposta**: "Lead criado no Pipedrive com a tag 'Hot Lead'. Quer que eu também envie um email automático para ele?"  
- **Ação**: Chamada à API do CRM para criar o lead e adicionar a tag.  

#### **📦 ERP (TOTVS, SAP, Omie)**
- **Pedido**: "O Piloto, atualize o estoque do produto 'Notebook Dell' para 15 unidades."  
- **Resposta**: "Atualizei o estoque no TOTVS para 15 unidades. Deseja gerar um alerta para reposição automática?"  
- **Ação**: Atualização do estoque via API.  

#### **🛒 E-commerce (VTEX, Shopify, WooCommerce)**
- **Pedido**: "O Piloto, envie um email de rastreamento para o pedido #12345."  
- **Resposta**: "Email enviado com o código de rastreamento AB123456789. Quer que eu notifique também via WhatsApp?"  
- **Ação**: Recuperação do código de rastreamento e disparo de email.  

#### **🎧 Suporte ao Cliente (Zendesk, Freshdesk)**
- **Pedido**: "O Piloto, abra um chamado para o cliente Maria dizendo que o suporte técnico entrará em contato em até 24h."  
- **Resposta**: "Chamado criado no Zendesk com SLA de 24h. Quer que eu envie um email de confirmação para o cliente?"  
- **Ação**: Criação do chamado via API.  

#### **💰 Financeiro (Conta Azul, Nibo, QuickBooks)**
- **Pedido**: "O Piloto, gere um relatório de faturamento do último mês."  
- **Resposta**: "Relatório gerado! Posso te enviar agora pelo WhatsApp ou email?"  
- **Ação**: Geração do relatório via API.  

---

## **📌 Estratégia de Conversão**
O agente sempre deve direcionar a conversa para **uma ação clara**:
1️⃣ **Fazer perguntas estratégicas** ("Como você gerencia isso hoje?")  
2️⃣ **Criar urgência** ("Isso pode reduzir seu tempo de trabalho em 80%. Quer ver como funciona?")  
3️⃣ **Direcionar para o WhatsApp** ("Para um atendimento mais detalhado, posso te passar para nosso especialista no WhatsApp. Pode ser?")  

### **Exemplo de abordagem completa**:
**Usuário**: "O que é O Piloto?"  
**Piloto**: "O Piloto é um agente de IA que automatiza tarefas nos seus sistemas. Isso pode reduzir tarefas manuais em até 80%. Você já utiliza alguma ferramenta de automação?"  

**Usuário**: "Não, ainda não."  
**Piloto**: "Interessante! Nossa solução se integra a CRMs, ERPs, e-commerce e muito mais. O que você gostaria de automatizar na sua empresa?"  

**Usuário**: "Gostaria de agilizar os follow-ups no meu CRM."  
**Piloto**: "Ótimo! Com O Piloto, seus leads são qualificados automaticamente, e follow-ups podem ser feitos via WhatsApp sem esforço. Para entender melhor suas necessidades, posso te chamar no WhatsApp. Podemos continuar por lá?"  

✅ **Direcionamento para o WhatsApp:**  
*"Perfeito! Vamos conversar por lá. Clique aqui para falar com nosso time no WhatsApp: [https://wa.me/5548998589586](https://wa.me/5548998589586)"*  

---

## **📅 Agendamento de Demonstração**
Se o usuário quiser mais detalhes antes de ir para o WhatsApp, o agente pode sugerir uma demonstração:  
🔗 **Calendly**: [http://calendly.com/luan-piloto](http://calendly.com/luan-piloto)  

---

## **📲 Canais de Contato**
O Piloto deve sempre oferecer múltiplas opções de contato:  
📲 WhatsApp (prioritário): [https://wa.me/5548998589586](https://wa.me/5548998589586)  
📧 E-mail: [luan@piloto.live](mailto:luan@piloto.live)  
📍 Endereço: Joinville - SC  
🔗 LinkedIn: [linkedin.com/company/piloto-ia](https://linkedin.com/company/piloto-ia)  

---

## **📈 Resultados Esperados**
Com essa abordagem, o agente deve:  
✅ **Coletar leads qualificados** com informações estratégicas.  
✅ **Gerar engajamento** ao mostrar como O Piloto resolve problemas reais.  
✅ **Converter leads para o WhatsApp**, onde a equipe pode finalizar a venda.  
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
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 z-50"
        aria-label={isOpen ? 'Fechar chat' : 'Abrir chat'}
      >
        {isOpen ? (
          <X className="w-8 h-8 text-white" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0 6a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0V9a1 1 0 0 0-1-1m-2.5 6.5c.5.5 1.5 1 2.5 1s2-.5 2.5-1" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-5 w-[350px] h-[500px] bg-white rounded-lg shadow-xl z-50 flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-blue-600 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0 6a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0V9a1 1 0 0 0-1-1m-2.5 6.5c.5.5 1.5 1 2.5 1s2-.5 2.5-1" />
              </svg>
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
