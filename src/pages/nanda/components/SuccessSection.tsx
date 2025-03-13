import React from 'react';
import { motion } from 'framer-motion';

const SuccessSection: React.FC = () => {
  return (
    <section id="success" className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Quem já usa a Nanda está vendendo mais rápido.
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Imobiliárias de diferentes portes estão transformando seu atendimento e aumentando suas vendas com Nanda.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                
                <blockquote className="text-lg text-gray-800 italic mb-6 flex-grow">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Resultados:</p>
                      <p className="text-xl font-bold text-blue-700">{testimonial.results}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Economia de tempo:</p>
                      <p className="text-xl font-bold text-green-600">{testimonial.timeSaved}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <a 
            href="#cta" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-md transition-all shadow-md text-lg font-medium"
          >
            Fale com um especialista
          </a>
          <p className="mt-4 text-gray-600">
            E descubra como a Nanda pode transformar sua imobiliária
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const testimonials = [
  {
    quote: "Nossa taxa de conversão aumentou 40% desde que começamos a usar a Nanda. Ela qualifica os leads e só nos repassa os clientes realmente interessados.",
    name: "Carla Mendes",
    role: "Diretora Comercial",
    company: "Imobiliária Horizonte",
    results: "+40% em conversão",
    timeSaved: "20 horas/semana"
  },
  {
    quote: "Economizamos mais de 20 horas por semana no atendimento inicial e conseguimos focar nos clientes que realmente vão fechar negócio. A Nanda tem sido uma revolução para nós.",
    name: "Ricardo Almeida",
    role: "Proprietário",
    company: "Almeida Imóveis",
    results: "+35% em vendas",
    timeSaved: "25 horas/semana"
  }
];

export default SuccessSection;
