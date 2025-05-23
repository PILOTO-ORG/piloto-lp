import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, ChevronRight, Image } from 'lucide-react';

const LuanaPromo: React.FC = () => {
  useEffect(() => {
    console.log('LuanaPromo mounted');
  }, []);

  return (
    <section id="luana" className="min-h-screen py-20 bg-gradient-to-br from-pink-600 to-purple-600 text-white relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-16 left-16 w-32 h-32 rounded-full border-4 border-white"></div>
        <div className="absolute bottom-16 right-16 w-48 h-48 rounded-full border-4 border-white"></div>
        <div className="absolute top-32 right-20 w-24 h-24 rounded-full border-4 border-white"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Texto promocional */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center">
                <Instagram className="w-5 h-5 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold">Luana</h3>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Luana: IA para Instagram que cria posts e responde directs
            </h2>

            <p className="text-lg opacity-90 mb-6">
              Nossa IA é treinada no seu estilo! Crie conteúdos automáticos e responda direct messages com tom de voz personalizado.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="bg-white/30 p-2 rounded-full mt-1">
                  <Image className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium">Posts Automáticos</h4>
                  <p className="opacity-80">Gere publicações criativas com um clique, no estilo da sua conta.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-white/30 p-2 rounded-full mt-1">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium">Respostas de Direct</h4>
                  <p className="opacity-80">Atenda seus seguidores automaticamente em segundos, com fala natural.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-white/30 p-2 rounded-full mt-1">
                  <ChevronRight className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium">Tom de Voz Personalizado</h4>
                  <p className="opacity-80">Treinada nos seus posts para manter sua identidade em cada interação.</p>
                </div>
              </div>
            </div>

            <a
              href="https://www.instagram.com/piloto.life"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-white text-pink-600 hover:bg-white/90 py-3 px-6 rounded-lg font-medium transition-colors shadow-lg"
            >
              <span>Veja o uso dela no nosso instagram</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Imagem promocional */}
          <motion.div
            className="lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full max-w-sm">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col items-center py-8 px-4">
                {/* Ícone do Instagram */}
                <div className="bg-gradient-to-br from-pink-500 to-purple-500 p-3 rounded-full mb-4">
                  <Instagram className="w-30 h-30 text-white" />
                </div>
                {/* Imagem de uma mulher feliz */}
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=320&h=320&facepad=2"
                  alt="Mulher feliz representando a Luana"
                  className="w-32 h-32 rounded-full object-cover border-4 border-pink-400 shadow-lg"
                />
              </div>

              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-pink-500 rounded-full"></div>
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-pink-500 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LuanaPromo;
