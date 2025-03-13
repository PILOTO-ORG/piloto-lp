import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, X, MessageCircle, ChevronDown } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import '../components/chatScrollbar.css';


// OpenAI configuration
// Usando uma chave temporária para desenvolvimento - em produção, use variáveis de ambiente
const OPENAI_API_KEY = import.meta.env.VITE_APP_OPENAI_API_KEY || 'sk-exemplo-temporario123456789';

// Configurando interceptor do Axios para garantir que a chave API seja incluída em todas as chamadas
axios.interceptors.request.use(config => {
  if (config.url?.includes('api.openai.com')) {
    config.headers = config.headers || {};
    
    // Ensure API key is not empty and add it to the headers
    if (!OPENAI_API_KEY || OPENAI_API_KEY === 'sk-exemplo-temporario123456789') {
      console.error('OpenAI API key is missing or using a placeholder. Please check your .env file.');
      // Desativar chamadas à API em desenvolvimento quando não há chave válida
      if (import.meta.env.DEV) {
        console.log('Development mode - mocking OpenAI API call');
        // Em desenvolvimento, podemos modificar a URL para evitar chamadas à API real
        // quando não temos uma chave válida
        config.url = 'https://mock-api.local/v1/chat/completions';
      }
    }
    
    // Always set the Authorization header with the API key
    config.headers.Authorization = `Bearer ${OPENAI_API_KEY}`;
    console.log('Axios interceptor: Added API key to OpenAI request');
  }
  return config;
});

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'piloto';
  timestamp: Date;
}

interface FloatingChatProps {
  showWhatsAppButton?: boolean;
  onClose?: () => void;
  customProps?: {
    initialMessages?: Message[];
    avatarText?: string;
    chatTitle?: string;
    inputPlaceholder?: string;
  };
}

const FloatingChat = ({ showWhatsAppButton = true, onClose, customProps }: FloatingChatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>(
    customProps?.initialMessages || [
      {
        id: 1,
        text: "💡 Precisa automatizar processos na sua empresa? Sou O Piloto, especialista em transformar sua operação manual em fluxos automáticos inteligentes. Vamos conversar sobre seus desafios?",
        sender: 'piloto',
        timestamp: new Date()
      }
    ]
  );
  const [isMinimized, setIsMinimized] = useState(true); // Inicializa minimizado
  const [isMobile, setIsMobile] = useState(false); // Estado para verificar se é dispositivo móvel
  const [isRecording, setIsRecording] = useState(false);
  // Comment out unused state variable but keep for future implementation
  // const [isTranscribing, setIsTranscribing] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
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
    console.log('toggleMinimize chamado, isMinimized atual:', isMinimized);
    
    // Se o chat está minimizado e o botão é clicado, abrimos o chat
    if (isMinimized) {
      setIsMinimized(false);
      setIsOpen(true);
      
      setTimeout(() => {
        scrollToBottom();
        inputRef.current?.focus();
      }, 100);
    } 
    // Se o chat está aberto e o botão é clicado, minimizamos o chat
    else {
      setIsMinimized(true);
      // Não fechamos o chat completamente, apenas minimizamos
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
      console.log('Enviando para API OpenAI chat completions...');
      
      // Usar chat completions diretamente em vez da API de assistentes
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-4-turbo",
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
✔️ **Encaminhar o lead para o WhatsApp da equipe comercial**, garantindo contato direto.`
            },
            ...messages.map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text
            })),
            {
              role: "user",
              content: inputValue
            }
          ],
          max_tokens: 500
        }
      );
      
      console.log('Resposta recebida da OpenAI:', response.data);
      
      const aiResponse = response.data.choices[0].message.content;
      const pilotoResponse: Message = {
        id: Date.now(),
        text: aiResponse,
        sender: 'piloto',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, pilotoResponse]);
      
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
      console.log('Enviando áudio para processamento pela OpenAI...');
      
      // Obter a chave da API do OpenAI do ambiente
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      
      if (!apiKey) {
        console.error('API Key do OpenAI não encontrada');
        throw new Error('API Key do OpenAI não configurada');
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
            'Authorization': `Bearer ${apiKey}`,
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
          model: "gpt-4-turbo",
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
✔️ **Encaminhar o lead para o WhatsApp da equipe comercial**, garantindo contato direto.`
            },
            ...messages.map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text
            })),
            {
              role: "user",
              content: transcription
            }
          ],
          max_tokens: 500
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
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
      
    } catch (error) {
      console.error('Erro ao processar áudio com a OpenAI:', error);
      
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

      {/* Chat Container - somente exibido em desktop quando não está minimizado */}
      {isOpen && !isMinimized && !isMobile && (
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
            <div className="flex justify-between items-center p-3 bg-blue-600 text-white rounded-t-lg">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-blue-700 text-blue-100 rounded-full flex items-center justify-center text-xs font-medium mr-2">
                  {customProps?.avatarText || "OP"}
                </div>
                <h3 className="font-medium">{customProps?.chatTitle || "O Piloto - Assistente Virtual"}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={toggleMinimize} 
                  className="p-1 rounded-full hover:bg-blue-700 transition-colors"
                  aria-label="Minimizar chat"
                >
                  <ChevronDown size={18} />
                </button>
                {onClose && (
                  <button onClick={onClose} className="p-1 rounded-full hover:bg-blue-700 transition-colors">
                    <X size={18} />
                  </button>
                )}
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
                    placeholder={customProps?.inputPlaceholder || "Digite sua mensagem..."}
                    className={`w-full px-4 py-2 pr-20 bg-white border border-gray-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                  />
                )}
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
                  disabled={isRecording}
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
