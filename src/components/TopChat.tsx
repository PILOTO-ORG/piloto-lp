import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  Send, 
  // X,  // Removed unused import
  ArrowLeft,
  Mic
} from 'lucide-react';
import './chatScrollbar.css';

// OpenAI configuration
const OPENAI_API_KEY = import.meta.env.VITE_APP_OPENAI_API_KEY || '';

// Configurando interceptor do Axios para garantir que a chave API seja incluída em todas as chamadas
axios.interceptors.request.use(config => {
  if (config.url?.includes('api.openai.com')) {
    config.headers = config.headers || {};
    
    // Ensure API key is not empty
    if (!OPENAI_API_KEY) {
      console.error('OpenAI API key is missing or empty. Please check your .env file.');
    }
    
    // Always set the Authorization header with the API key, even if it's empty
    // This will help debug if the key is not being loaded correctly
    config.headers.Authorization = `Bearer ${OPENAI_API_KEY}`;
    
    // Manter o Content-Type original para multipart/form-data
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
    
    console.log('Axios interceptor (TopChat): Added API key to OpenAI request', 
                OPENAI_API_KEY ? 'API key present' : 'API key missing');
  }
  return config;
});

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'piloto';
  timestamp: Date;
}

const TopChat: React.FC = () => {
  // Using isVisible state but commenting out setter since it's not currently used
  const [isVisible, /*setIsVisible*/] = useState(true);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: " Olá! Sou O Piloto, seu assistente de automação empresarial. Transforme tarefas manuais em processos automáticos e economize seu tempo!",
      sender: 'piloto',
      timestamp: new Date()
    },
    {
      id: 2,
      text: " Posso integrar seus sistemas para eliminar tarefas repetitivas e manuais. Qual processo da sua empresa você gostaria de automatizar hoje?",
      sender: 'piloto',
      timestamp: new Date()
    }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Função para forçar a rolagem para a última mensagem
  const forceScrollToBottom = () => {
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        
        // Removendo o scrollIntoView que pode estar movendo a página
        // const lastMessageElement = messagesContainerRef.current.querySelector('.last-message');
        // if (lastMessageElement) {
        //   lastMessageElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
        // }
      }
    }, 0); // Reduzindo o timeout para execução imediata
  };

  // Função para verificar se é necessário mostrar o indicador de scroll
  const checkScrollPosition = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isScrolledToBottom = scrollHeight - scrollTop - clientHeight < 30;
      setShowScrollIndicator(!isScrolledToBottom && messages.length > 2);
    }
  };

  // Função para rolar para o final quando o indicador é clicado
  const handleScrollToBottom = () => {
    forceScrollToBottom();
    setShowScrollIndicator(false);
  };

  // Auto-scroll para o final das mensagens sempre que novas mensagens são adicionadas
  useEffect(() => {
    // Apenas verificamos a posição do scroll sem forçar rolagem
    setTimeout(() => {
      checkScrollPosition();
    }, 100);
  }, [messages]);

  // Garantir que o scroll ocorra quando o componente for montado
  useEffect(() => {
    // Removido o forceScrollToBottom que pode estar causando movimento indesejado da página
  }, []);

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

  // Adicionar listeners de scroll para o container de mensagens
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, []);

  // Adicionar um event listener para rolagem para garantir que qualquer mudança no conteúdo resulte em scroll para o fim
  useEffect(() => {
    // Removido o event listener de resize para evitar movimentos indesejados na página
    
    return () => {
      // Cleanup vazio para manter o hook
    };
  }, [messages]);

  // Function commented out as it's not currently used
  // const scrollToHero = () => {
  //   const heroSection = document.getElementById('home');
  //   if (heroSection) {
  //     window.scrollTo({
  //       top: 0,
  //       behavior: 'auto'
  //     });
  //   }
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === '' || isTranscribing || isRecording) return;

    const userMessage: Message = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    // Indicando que estamos processando
    setIsTranscribing(true);

    // Chamada para a API da OpenAI
    axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-4-turbo",
        messages: [
          {
            role: "system",
            content: `## ** Modelo de Agente de IA - O Piloto (Pré-Vendas)**
 
 ### ** Visão Geral**
 **O Piloto** é um **assistente de IA especializado em automação empresarial**, projetado para **entender necessidades, apresentar soluções e direcionar potenciais clientes para o WhatsApp**.
 
 Ele **não é apenas um chatbot**, mas sim um agente **persuasivo e estratégico**, que:
 - Explica de forma clara e objetiva os benefícios da solução.
 - **Coleta informações essenciais** sobre o interesse do lead.
 - Direciona a conversa para o **WhatsApp da equipe comercial** para fechamento.
 
 ---
 
 ## ** Objetivo do Agente**
 **Ser altamente persuasivo** ao apresentar O Piloto como a melhor solução para automação.  
 **Fazer perguntas estratégicas** para entender as necessidades do lead.  
 **Demonstrar aplicações práticas e personalizadas** para cada caso.  
 **Coletar informações do lead** como nome, empresa e principal desafio.  
 **Encaminhar o lead para o WhatsApp da equipe comercial**, garantindo contato direto.`
          },
          ...messages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
          })),
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 300
      }
    )
    .then(response => {
      const aiResponse = response.data.choices[0].message.content;
      
      const pilotoResponse: Message = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: 'piloto',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, pilotoResponse]);
      setIsTranscribing(false);
    })
    .catch(error => {
      console.error('Erro ao processar mensagem com a OpenAI:', error);
      
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.",
        sender: 'piloto',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsTranscribing(false);
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

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

  // Função para lidar com o toggle de gravação de áudio
  const toggleRecording = async () => {
    if (isRecording) {
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
      
      // Limpar os chunks de áudio anteriores
      audioChunksRef.current = [];
      
      // Criar um novo MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      // Adicionar dados de áudio ao array quando disponíveis
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      // Configurar o que acontece quando a gravação parar
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
      console.log('Gravação iniciada.');
    } catch (error) {
      console.error('Erro ao iniciar gravação:', error);
      setIsRecording(false);
      alert('Não foi possível acessar o microfone. Verifique as permissões do navegador.');
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

  // Enviando áudio para a API da OpenAI
  const processAudioWithOpenAI = async (audioBlob: Blob) => {
    try {
      setIsTranscribing(true);
      console.log('Enviando áudio para processamento pela OpenAI...');
      
      // Preparar formData para envio
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.webm');
      formData.append('model', 'whisper-1');
      
      // Primeiro, obter a transcrição do áudio usando o modelo Whisper
      const transcriptionResponse = await axios.post(
        'https://api.openai.com/v1/audio/transcriptions',
        formData
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
              content: `## ** Modelo de Agente de IA - O Piloto (Pré-Vendas)**
 
 ### ** Visão Geral**
 **O Piloto** é um **assistente de IA especializado em automação empresarial**, projetado para **entender necessidades, apresentar soluções e direcionar potenciais clientes para o WhatsApp**.
 
 Ele **não é apenas um chatbot**, mas sim um agente **persuasivo e estratégico**, que:
 - Explica de forma clara e objetiva os benefícios da solução.
 - **Coleta informações essenciais** sobre o interesse do lead.
 - Direciona a conversa para o **WhatsApp da equipe comercial** para fechamento.
 
 ---
 
 ## ** Objetivo do Agente**
 **Ser altamente persuasivo** ao apresentar O Piloto como a melhor solução para automação.  
 **Fazer perguntas estratégicas** para entender as necessidades do lead.  
 **Demonstrar aplicações práticas e personalizadas** para cada caso.  
 **Coletar informações do lead** como nome, empresa e principal desafio.  
 **Encaminhar o lead para o WhatsApp da equipe comercial**, garantindo contato direto.  `
            },
            {
              role: "user",
              content: transcription
            }
          ],
          max_tokens: 300
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

  if (!isVisible) return null;

  return (
    <div className="w-full bg-gradient-to-b from-gray-800 to-gray-900 mt-[80px]">
      <div className="w-full max-w-5xl mx-auto px-4 py-4">
        <div 
          ref={chatContainerRef}
          className="w-full mx-auto bg-gray-800 rounded-xl shadow-xl flex flex-col"
          style={{ 
            height: "550px", 
            maxHeight: "80vh",
            minHeight: "350px" 
          }}
        >
          <div className="flex items-center justify-between p-5 border-b border-gray-700 bg-gray-900 rounded-t-xl">
            <h2 className="text-2xl font-semibold text-blue-300 flex items-center">
              {isRecording ? (
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5
                  }}
                  className="h-4 w-4 bg-red-500 rounded-full mr-3"
                />
              ) : isTranscribing ? (
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5,
                    ease: "linear"
                  }}
                  className="h-4 w-4 bg-yellow-500 rounded-full mr-3"
                />
              ) : (
                <span className="h-4 w-4 bg-green-500 rounded-full mr-3"></span>
              )}
              Converse com o Piloto
            </h2>
          </div>
          
          <div 
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar"
          >
            {/* Indicador de scroll para baixo */}
            {showScrollIndicator && (
              <div 
                className="scroll-indicator"
                onClick={handleScrollToBottom}
              >
                <ArrowLeft size={24} />
              </div>
            )}
            
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} ${index === messages.length - 1 ? 'last-message' : ''}`}
                data-last={index === messages.length - 1 ? 'true' : 'false'}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-blue-100 rounded-br-none'
                      : 'bg-gray-700 text-blue-200 rounded-bl-none'
                  }`}
                >
                  <p className="text-base">{message.text}</p>
                  <span className={`text-sm mt-2 block ${
                    message.sender === 'user' ? 'text-blue-200' : 'text-blue-300'
                  }`}>
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}
            {/* Elemento de referência para scroll */}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
            <div className="relative flex items-center">
              {isRecording ? (
                <div className="w-full px-5 py-3 bg-gray-700 text-red-400 rounded-lg flex items-center justify-center animate-pulse">
                  <span className="mr-2">🎙️</span>
                  Gravando: {Math.floor(recordingTime / 60).toString().padStart(2, '0')}:{(recordingTime % 60).toString().padStart(2, '0')}
                </div>
              ) : (
                <input 
                  type="text" 
                  className={`w-full px-5 py-3 bg-gray-700 text-white rounded-lg pr-28 focus:outline-none focus:ring-1 focus:ring-blue-500 text-base ${isTranscribing ? 'animate-pulse' : ''}`}
                  placeholder={isTranscribing ? "Processando mensagem..." : "Digite sua mensagem..."} 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isTranscribing}
                />
              )}
              <button 
                type="submit" 
                className="absolute right-3 p-2 text-gray-400 hover:text-white"
                disabled={isRecording || isTranscribing}
              >
                <Send className="w-5 h-5" />
              </button>
              <button 
                type="button"
                className={`absolute right-12 p-2 rounded-full ${
                  isRecording 
                    ? 'text-red-500 animate-pulse' 
                    : isTranscribing 
                      ? 'text-yellow-400 animate-pulse' 
                      : 'text-gray-400 hover:text-white'
                }`}
                onClick={toggleRecording}
                disabled={isTranscribing}
                title={isRecording ? "Parar gravação" : isTranscribing ? "Processando áudio..." : "Gravar áudio"}
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TopChat;
