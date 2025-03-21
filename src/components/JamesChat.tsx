import React from 'react';
import BaseChat from './BaseChat';

const JamesChat: React.FC = () => {
  const initialMessages = [
    {
      id: 1,
      text: 'Olá! Sou o James, seu assistente de automação via WhatsApp. Como posso ajudar você hoje?',
      sender: 'assistant',
      timestamp: new Date()
    }
  ];

  return (
    <BaseChat
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
