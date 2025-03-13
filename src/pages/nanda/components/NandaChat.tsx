import React from 'react';
import NandaFloatingChat from '../../../components/NandaFloatingChat';

// This component wraps NandaFloatingChat with Nanda-specific customizations
interface NandaChatProps {
  showWhatsAppButton?: boolean;
  onClose?: () => void;
  openOnHover?: boolean; // Nova propriedade para controlar se abre no hover
}

const NandaChat: React.FC<NandaChatProps> = ({ showWhatsAppButton = false, onClose, openOnHover = true }) => {
  // Override the default initial messages with Nanda-specific ones
  const initialMessages = [
    {
      id: 1,
      text: "Olá! Sou Nanda, sua assistente virtual especializada no setor imobiliário. Posso ajudar com informações sobre imóveis, agendar visitas e responder dúvidas 24/7. Como posso ajudar hoje?",
      sender: 'nanda' as 'nanda', // Explicitly type as 'nanda' for NandaFloatingChat
      timestamp: new Date()
    }
  ];
  
  return (
    <NandaFloatingChat 
      showWhatsAppButton={showWhatsAppButton} 
      onClose={onClose}
      openOnHover={openOnHover} // Passa a propriedade de abrir no hover
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
