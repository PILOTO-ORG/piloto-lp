import React from 'react';
import BaseChat from './BaseChat';

interface FabricioChatProps {
  showWhatsAppButton?: boolean;
  predefinedMessages?: Array<{
    id: number;
    text: string;
    sender: 'user' | 'assistant';
    timestamp: Date;
  }>;
}

const FabricioChat: React.FC<FabricioChatProps> = ({ showWhatsAppButton = true, predefinedMessages }) => {
  const initialMessages = predefinedMessages || [
    {
      id: 1,
      text: 'Olá! Sou o Fabricio, seu assistente de negociação inteligente. Como posso ajudar você hoje?',
      sender: 'assistant' as const,
      timestamp: new Date()
    }
  ];

  return (
    <BaseChat
      showWhatsAppButton={showWhatsAppButton}
      customProps={{
        initialMessages,
        avatarText: 'FA',
        chatTitle: 'Fabricio - Negociação Inteligente',
        inputPlaceholder: 'Digite sua consulta...'
      }}
    />
  );
};

export default FabricioChat;