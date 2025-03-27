import React from 'react';
import BaseChat from './BaseChat';

interface JamesChatProps {
  showWhatsAppButton?: boolean;
  predefinedMessages?: Array<{
    id: number;
    text: string;
    sender: 'user' | 'assistant';
    timestamp: Date;
  }>;
}

const JamesChat: React.FC<JamesChatProps> = ({ showWhatsAppButton = true, predefinedMessages }) => {
  const initialMessages = predefinedMessages || [
    {
      id: 1,
      text: 'Olá! Sou o James, seu assistente de automação via WhatsApp. Como posso ajudar você hoje?',
      sender: 'assistant' as const,
      timestamp: new Date()
    }
  ];

  return (
    <BaseChat
      showWhatsAppButton={showWhatsAppButton}
      customProps={{
        initialMessages,
        avatarText: 'JA',
        chatTitle: 'James - Automação via WhatsApp',
        inputPlaceholder: 'Digite seu comando...'
      }}
    />
  );
};

export default JamesChat;