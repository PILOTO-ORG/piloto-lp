import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import Benefits from './components/Benefits';
import SystemIntegrations from './components/SystemIntegrations';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import WhatsAppButton from './components/WhatsAppButton';
import JamesBasic from './components/JamesBasic';

function App() {
  const [showJames, setShowJames] = useState(true);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <HowItWorks />
        <SystemIntegrations />
        <Benefits />
        <Pricing />
        <Contact />
      </main>
      <WhatsAppButton />
      {showJames && <JamesBasic onClose={() => setShowJames(false)} />}
    </div>
  );
}

export default App;