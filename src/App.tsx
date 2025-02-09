import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import Benefits from './components/Benefits';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import WhatsAppButton from './components/WhatsAppButton';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <HowItWorks />
        <Benefits />
        <Pricing />
        <Contact />
      </main>
      <WhatsAppButton />
      <ChatBot />
    </div>
  );
}

export default App;