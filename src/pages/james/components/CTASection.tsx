import React from 'react';
import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-blue-50">
      <div className="container mx-auto">
        <div className="text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
              Pronto para transformar sua gestão?
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
              Experimente o James gratuitamente por 7 dias e descubra como ele pode otimizar seus processos.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Iniciar Teste Gratuito
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
