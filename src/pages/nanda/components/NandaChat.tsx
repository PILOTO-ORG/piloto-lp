import React from 'react';
import NandaFloatingChat from '../../../components/NandaFloatingChat';

// Import the Message type from NandaFloatingChat to ensure type compatibility
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'nanda';
  timestamp: Date;
}

// This component wraps NandaFloatingChat with Nanda-specific customizations
interface NandaChatProps {
  showWhatsAppButton?: boolean;
  onClose?: () => void;
  openOnHover?: boolean; // Nova propriedade para controlar se abre no hover
  predefinedMessages?: Message[]; // Nova propriedade para mensagens predefinidas
}

const NandaChat: React.FC<NandaChatProps> = ({ 
  showWhatsAppButton = false, 
  onClose, 
  openOnHover = true,
  predefinedMessages
}) => {
  // Default initial messages with Nanda-specific ones
  const defaultMessages: Message[] = [
    {
      id: 1,
      text: "Olá! Sou Nanda, sua assistente virtual especializada no setor imobiliário. Posso ajudar com informações sobre imóveis, agendar visitas e responder dúvidas 24/7. Como posso ajudar hoje?",
      sender: 'nanda',
      timestamp: new Date()
    }
  ];
  
  // Use predefined messages if provided, otherwise use default messages
  const initialMessages = predefinedMessages || defaultMessages;
  
  return (
    <NandaFloatingChat 
      showWhatsAppButton={showWhatsAppButton} 
      onClose={onClose}
      openOnHover={openOnHover}
      // Pass custom props through to the NandaFloatingChat component
      customProps={{
        initialMessages,
        avatarText: "NA",
        chatTitle: "Nanda - Assistente Imobiliária",
        inputPlaceholder: "Digite sua mensagem para Nanda..."
      }}
    />
  );
};

export default NandaChat;
