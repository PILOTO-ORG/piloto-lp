import React from 'react';
import BaseChat from './BaseChat';

const FabricioChat: React.FC = () => {
  const initialMessages = [
    {
      id: 1,
      text: 'Olá! Sou o Fabricio, seu assistente de negociação inteligente. Como posso ajudar você hoje?',
      sender: 'assistant' as const,
      timestamp: new Date()
    }
  ];

  return (
    <BaseChat
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
