import React from 'react';
import TopChat from './TopChat';

interface ChatSectionProps {
  minimized?: boolean;
}

const ChatSection: React.FC<ChatSectionProps> = ({ minimized }) => {
  if (minimized) return null;
  
  return <TopChat />;
};

export default ChatSection;
