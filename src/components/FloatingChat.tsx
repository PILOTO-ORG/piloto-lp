import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, X, MessageCircle, ChevronDown } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import '../components/chatScrollbar.css';

// OpenAI configuration
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
const OPENAI_ASSISTANT_ID = import.meta.env.VITE_OPENAI_ASSISTANT_ID || '';

// Headers configuration for OpenAI API
const openAIHeaders = OPENAI_API_KEY ? {
  'Authorization': `Bearer ${OPENAI_API_KEY}`,
  'Content-Type': 'application/json',
  'OpenAI-Beta': 'assistents=v2'
} : {};

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'piloto';
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
      text: "💡 Precisa automatizar processos na sua empresa? Sou O Piloto, especialista em transformar sua operação manual em fluxos automáticos inteligentes. Vamos conversar sobre seus desafios?",
      sender: 'piloto',
      timestamp: new Date()
    }
  ]);
  const [isMinimized, setIsMinimized] = useState(true); // Inicializa minimizado
  const [isMobile, setIsMobile] = useState(false); // Estado para verificar se é dispositivo móvel
  const [isRecording, setIsRecording] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Função para parar a gravação
  const stopRecording = () => {
    if (isRecording && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setRecordingTime(0);
      console.log('Gravação de áudio interrompida');
      
      // Toca um som para indicar o fim da gravação
      playAudioFeedback(false);
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages, isAtBottom]);

  // Efeito para atualizar o temporizador durante a gravação
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording) {
      // Atualiza o temporizador a cada segundo
      interval = setInterval(() => {
        setRecordingTime(prevTime => prevTime + 1);
      }, 1000);
      
      // Adiciona um listener de clique para interromper a gravação ao clicar em qualquer lugar
      const handleBodyClick = (e: MouseEvent) => {
        // Verifica se o clique foi fora do botão de gravação
        const target = e.target as HTMLElement;
        if (!target.closest('button[title*="gravação"]')) {
          stopRecording();
        }
      };
      
      document.body.addEventListener('click', handleBodyClick);
      
      // Limpa o listener quando o componente é desmontado ou a gravação para
      return () => {
        if (interval) clearInterval(interval);
        document.body.removeEventListener('click', handleBodyClick);
      };
    } else {
      return () => {
        if (interval) clearInterval(interval);
      };
    }
  }, [isRecording]);

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

  // Detecta se é dispositivo móvel
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth <= 768; // Considerando dispositivos com largura <= 768px como mobile
      setIsMobile(mobile);
    };

    // Verificar inicialmente
    checkIfMobile();

    // Adicionar listener para verificar quando a janela for redimensionada
    window.addEventListener('resize', checkIfMobile);

    // Cleanup do listener
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

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
            sender: 'piloto',
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
          const pilotoResponse: Message = {
            id: Date.now(),
            text: assistantMessage.content[0].text.value,
            sender: 'piloto',
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, pilotoResponse]);
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
        sender: 'piloto',
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

  const toggleRecording = async () => {
    if (isRecording) {
      // Parar a gravação
      stopRecording();
      return;
    }

    try {
      // Iniciar gravação
      setIsRecording(true);
      setRecordingTime(0);
      console.log('Iniciando gravação de áudio...');
      
      // Toca um som para indicar o início da gravação
      playAudioFeedback(true);
      
      // Solicitar permissão para acessar o microfone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Limpar chunks anteriores
      audioChunksRef.current = [];
      
      // Configurar o MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      // Evento para capturar os dados do áudio
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      // Evento que ocorre quando a gravação é finalizada
      mediaRecorder.onstop = async () => {
        // Criar um blob com todos os chunks de áudio
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        console.log('Tamanho do áudio:', audioBlob.size, 'bytes');
        
        // Parar todas as trilhas do stream
        stream.getTracks().forEach(track => track.stop());
        
        // Enviar o áudio para processamento com a OpenAI
        await processAudioWithOpenAI(audioBlob);
      };
      
      // Iniciar gravação
      mediaRecorder.start();
      console.log('MediaRecorder iniciado');
    } catch (error) {
      console.error('Erro ao iniciar gravação de áudio:', error);
      setIsRecording(false);
      alert('Não foi possível acessar o microfone. Verifique as permissões do navegador.');
    }
  };

  const processAudioWithOpenAI = async (audioBlob: Blob) => {
    try {
      setIsTranscribing(true);
      console.log('Enviando áudio para processamento pela OpenAI...');
      
      if (!OPENAI_API_KEY) {
        // Simulação se não houver API key
        console.log('API Key não encontrada. Usando simulação.');
        setTimeout(() => {
          const simulatedResponse = "Isso é uma simulação de processamento direto de áudio pela OpenAI. Em uma implementação real, a IA geraria uma resposta com base no áudio enviado.";
          
          // Adicionar uma nova mensagem do assistente com a resposta simulada
          const newMessage: Message = {
            id: Date.now(),
            text: simulatedResponse,
            sender: 'piloto',
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, newMessage]);
          setIsTranscribing(false);
        }, 2000);
        return;
      }
      
      // Preparar formData para envio
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.webm');
      formData.append('model', 'whisper-1');
      
      // Primeiro, obter a transcrição do áudio usando o modelo Whisper
      const transcriptionResponse = await axios.post(
        'https://api.openai.com/v1/audio/transcriptions',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      const transcription = transcriptionResponse.data.text;
      console.log('Áudio transcrito:', transcription);
      
      // Agora, enviar a transcrição para o modelo de chat para obter uma resposta
      const chatResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `## **🤖 Modelo de Agente de IA - O Piloto (Pré-Vendas)**
 
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
 
 ## **📈 Resultados Esperados**
 Com essa abordagem, o agente deve:  
 ✅ **Coletar leads qualificados** com informações estratégicas.  
 ✅ **Gerar engajamento** ao mostrar como O Piloto resolve problemas reais.  
 ✅ **Converter leads para o WhatsApp**, onde a equipe pode finalizar a venda.  `
            },
            {
              role: "user",
              content: transcription
            }
          ],
          max_tokens: 300
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      const aiResponse = chatResponse.data.choices[0].message.content;
      console.log('Resposta da IA:', aiResponse);
      
      // Primeiro adicionamos a mensagem do usuário ao chat
      const userMessage: Message = {
        id: Date.now(),
        text: transcription,
        sender: 'user',
        timestamp: new Date()
      };
      
      // Depois adicionamos a resposta da IA
      const assistantMessage: Message = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: 'piloto',
        timestamp: new Date()
      };
      
      // Atualizamos o estado das mensagens
      setMessages(prevMessages => [...prevMessages, userMessage, assistantMessage]);
      
      setIsTranscribing(false);
    } catch (error) {
      console.error('Erro ao processar áudio com a OpenAI:', error);
      setIsTranscribing(false);
      
      // Adicionar mensagem de erro
      const errorMessage: Message = {
        id: Date.now(),
        text: "Desculpe, ocorreu um erro ao processar seu áudio. Por favor, tente novamente.",
        sender: 'piloto',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  // Função para reproduzir feedback sonoro
  const playAudioFeedback = (isStart: boolean) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Configurações de frequência e ganho para início ou fim da gravação
      if (isStart) {
        // Som agudo ascendente para início
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.frequency.linearRampToValueAtTime(880, audioContext.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      } else {
        // Som descendente para fim
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
        oscillator.frequency.linearRampToValueAtTime(440, audioContext.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      }
      
      // Reduzir o volume gradualmente
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
      
      // Iniciar e parar o oscilador
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.error('Erro ao reproduzir feedback sonoro:', error);
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

      {/* Chat Button - somente exibido em desktop */}
      {isMinimized && !isMobile && (
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

      {/* Chat Container - somente exibido em desktop */}
      {isOpen && !isMobile && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden flex flex-col"
            style={{ width: '350px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-3 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-white/10 p-2 rounded-full">
                  {isRecording ? (
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1.5
                      }}
                      className="h-4 w-4 rounded-full bg-red-500"
                    />
                  ) : isTranscribing ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1.5,
                        ease: "linear"
                      }}
                      className="text-blue-200"
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  ) : (
                    <MessageCircle className="text-blue-200" size={18} />
                  )}
                </div>
                <div className="text-blue-200">
                  <h3 className="font-semibold">O Piloto</h3>
                  <p className="text-xs text-blue-100">Assistente Virtual</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsMinimized(true);
                    if (onClose) onClose();
                  }}
                  className="text-blue-200 hover:text-white p-1 rounded-full hover:bg-blue-700/50 transition-colors"
                  title="Fechar chat"
                  aria-label="Fechar chat"
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
                {isRecording ? (
                  <div className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 text-red-500 font-medium rounded-lg flex items-center justify-center animate-pulse">
                    <span className="mr-2">🎙️</span>
                    Gravando: {Math.floor(recordingTime / 60).toString().padStart(2, '0')}:{(recordingTime % 60).toString().padStart(2, '0')}
                  </div>
                ) : (
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder={isTranscribing ? "Processando mensagem..." : "Digite sua mensagem..."}
                    className={`w-full px-4 py-2 pr-20 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${isTranscribing ? 'animate-pulse' : ''}`}
                    disabled={isTranscribing}
                  />
                )}
                <button
                  type="button"
                  onClick={toggleRecording}
                  className={`p-2 rounded-lg transition-colors ${
                    isRecording
                      ? 'bg-red-500 text-blue-100'
                      : isTranscribing
                        ? 'bg-yellow-500 text-blue-100 animate-pulse'
                        : 'text-gray-500 hover:text-blue-500'
                  }`}
                  disabled={isTranscribing}
                >
                  <Mic className="h-5 w-5" />
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-blue-200 p-2 rounded-lg hover:bg-blue-700 transition-colors"
                  disabled={isRecording || isTranscribing}
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default FloatingChat;
