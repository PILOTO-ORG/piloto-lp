import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Bot, 
  Building, 
  Star, 
  CheckCircle,
  ArrowRight,
  DollarSign,
  LineChart
} from 'lucide-react';

// Testimonial interface
interface Testimonial {
  id: number;
  name: string;
  company: string;
  role: string;
  quote: string;
  stars: number;
}

// Case Study Interface
interface CaseStudy {
  id: number;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  savingsPercentage: number;
}

const FabricioPromo: React.FC = () => {
  // State for video modal
  const [showVideo, setShowVideo] = useState(false);
  
  // State for active case study
  const [activeCaseStudy, setActiveCaseStudy] = useState<number>(0);
  
  // Testimonials data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Roberto Santos",
      company: "Super Construções",
      role: "Diretor de Compras",
      quote: "Economizamos mais de R$200 mil no primeiro trimestre com o Fabricio. É como ter um negociador profissional 24/7.",
      stars: 5
    },
    {
      id: 2,
      name: "Mariana Costa",
      company: "Rede de Hotéis Premium",
      role: "CFO",
      quote: "Fabricio ajudou a reduzir nossos custos de suprimentos em 47%. A economia gerada pagou o investimento em menos de um mês.",
      stars: 5
    }
  ];
  
  // Case Studies
  const caseStudies: CaseStudy[] = [
    {
      id: 1,
      company: "Supermercado Regional",
      industry: "Varejo Alimentício",
      challenge: "Altos custos com fornecedores e pouco poder de negociação",
      solution: "Implementação do Fabricio para automatizar cotações e negociações",
      results: "Redução de 32% nos custos com fornecedores em 60 dias",
      savingsPercentage: 32
    },
    {
      id: 2,
      company: "Construtora Nacional",
      industry: "Construção Civil",
      challenge: "Processos manuais de compra lentos e ineficientes",
      solution: "Uso do Fabricio para centralizar compras e encontrar melhores preços",
      results: "Economia de R$2.1 milhões em um único projeto",
      savingsPercentage: 41
    },
    {
      id: 3,
      company: "Rede de Farmácias",
      industry: "Saúde",
      challenge: "Dificuldade em comparar preços entre múltiplos fornecedores",
      solution: "Implementação do Fabricio para análise automática de cotações",
      results: "Aumento de 18% na margem de lucro em 3 meses",
      savingsPercentage: 27
    }
  ];
  
  useEffect(() => {
    console.log("FabricioPromo component mounted");
  }, []);

  return (
    <section id="fabricio" className="min-h-screen py-20 bg-gradient-to-br from-green-900 to-green-700 text-white relative overflow-hidden">
      {/* Overlay com padrões decorativos */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full border-4 border-white"></div>
        <div className="absolute bottom-20 right-40 w-48 h-48 rounded-full border-4 border-white"></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full border-4 border-white"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 mb-20">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold">Maximize Economia com Fabricio</h3>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Fabricio: Pague menos da metade em suas compras
            </h2>
            
            <p className="text-lg opacity-90 mb-6">
              <span className="font-bold">Imagine economizar milhares todo mês!</span> Fabricio analisa ofertas, negocia 
              com fornecedores e garante os melhores preços enquanto você se concentra nas decisões estratégicas. 
              Nossos clientes economizam em média R$15.000/mês.
            </p>
            
            {/* Lista de benefícios com ícones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-1" />
                <span>Reduza custos em até 50%</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-1" />
                <span>Implementação em apenas 2 dias</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-1" />
                <span>Integração com qualquer ERP</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-1" />
                <span>ROI garantido ou dinheiro de volta</span>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="bg-green-500/30 p-2 rounded-full mt-1">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium">Inteligência de Mercado em Tempo Real</h4>
                  <p className="opacity-80">Compare preços entre centenas de fornecedores simultaneamente e identifique oportunidades invisíveis.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-green-500/30 p-2 rounded-full mt-1">
                  <Building className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium">Implementação em 100% gratuita</h4>
                  <p className="opacity-80">Integração perfeita com seu ERP existente, sem interrupções ao seu fluxo de trabalho atual.</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">

              
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full max-w-md">
              {/* Moldura estilizada para mostrar o Fabricio */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Cabeçalho da "janela" */}
                <div className="bg-green-800 p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">FA</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Fabricio - Negociação Inteligente</h4>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  </div>
                </div>
                
                {/* Corpo da conversa */}
                <div className="p-6 bg-gray-50">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-start max-w-[80%]">
                      <div className="bg-green-100 p-3 rounded-lg rounded-tl-none">
                        <p className="text-green-800">Olá! Sou o Fabricio, seu assistente de negociação inteligente. Como posso ajudar a otimizar suas compras?</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start self-end max-w-[80%]">
                      <div className="bg-green-600 p-3 rounded-lg rounded-tr-none">
                        <p className="text-white">Preciso encontrar o melhor fornecedor para matéria-prima X.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start max-w-[80%]">
                      <div className="bg-green-100 p-3 rounded-lg rounded-tl-none">
                        <p className="text-green-800">Vou analisar os fornecedores cadastrados e comparar preços, qualidade e prazos de entrega para encontrar a melhor opção.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Input area */}
                <div className="p-4 border-t border-gray-200 flex items-center">
                  <input 
                    type="text" 
                    className="flex-1 py-2 px-4 bg-gray-100 rounded-full text-gray-700 placeholder-gray-500 text-sm"
                    placeholder="Digite sua consulta..."
                    disabled
                  />
                  <button className="ml-3 p-2 rounded-full bg-green-600 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Elementos decorativos */}
              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-green-500 rounded-full"></div>
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-green-500 rounded-full"></div>
            </div>
          </motion.div>
        </div>

        {/* Seção de Estudos de Caso */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold">Histórias de Sucesso</h3>
            <p className="text-green-200 mt-2">Empresas que transformaram suas compras com o Fabricio</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-2 mb-6">
              {caseStudies.map((study, index) => (
                <button 
                  key={study.id}
                  className={`py-3 px-4 rounded-t-lg font-medium transition-colors ${
                    activeCaseStudy === index 
                      ? 'bg-green-800 text-white' 
                      : 'bg-green-800/30 text-green-200 hover:bg-green-800/50'
                  }`}
                  onClick={() => setActiveCaseStudy(index)}
                >
                  {study.company}
                </button>
              ))}
            </div>
            
            <div className="bg-green-800/50 p-6 md:p-8 rounded-lg rounded-tl-none border border-green-700">
              <div className="mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold">{caseStudies[activeCaseStudy].company}</h4>
                    <p className="text-green-200">Setor: {caseStudies[activeCaseStudy].industry}</p>
                  </div>
                  <div className="mt-4 md:mt-0 bg-green-700 rounded-lg px-4 py-2 flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-green-300" />
                    <span className="font-bold text-xl">{caseStudies[activeCaseStudy].savingsPercentage}%</span>
                    <span className="text-green-200">de economia</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h5 className="font-semibold mb-2 flex items-center">
                      <LineChart className="w-4 h-4 mr-1 text-green-300" />
                      Desafio
                    </h5>
                    <p className="text-green-100">{caseStudies[activeCaseStudy].challenge}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2 flex items-center">
                      <Bot className="w-4 h-4 mr-1 text-green-300" />
                      Solução
                    </h5>
                    <p className="text-green-100">{caseStudies[activeCaseStudy].solution}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1 text-green-300" />
                      Resultados
                    </h5>
                    <p className="text-green-100">{caseStudies[activeCaseStudy].results}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
        
        {/* Seção de Depoimentos */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold">O Que Nossos Clientes Dizem</h3>
            <p className="text-green-200 mt-2">Depoimentos de quem já economiza com o Fabricio</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-green-800/50 p-6 rounded-xl border border-green-700">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < testimonial.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} />
                  ))}
                </div>
                <p className="text-green-100 italic mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-3">
                    <span className="font-bold text-white">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-green-300 text-sm">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Chamada final para ação */}
        <motion.div 
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Pronto Para Começar a Economizar?</h3>
          <p className="mb-8 text-green-100">Agende uma demonstração gratuita e descubra quanto sua empresa pode economizar</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://buy.stripe.com/14k7t074j5YJbT23cc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-white text-green-700 hover:bg-green-50 py-3 px-8 rounded-lg font-medium transition-colors shadow-lg"
            >
              <span>Calcular Economia</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="https://wa.me/5519983165763?text=Quero%20agendar%20uma%20demonstra%C3%A7%C3%A3o"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-transparent hover:bg-green-800/50 border border-green-400 py-3 px-8 rounded-lg font-medium transition-colors"
            >
              <span>Agendar Demonstração</span>
            </a>
          </div>
        </motion.div>
        
        {/* Video Modal */}
        {showVideo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden">
              <button 
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors z-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="aspect-video w-full">
                <div className="w-full h-full flex items-center justify-center bg-green-900/50">
                  <p className="text-white text-lg">Vídeo demonstrativo do Fabricio</p>
                  {/* Aqui você pode incorporar um iframe de vídeo do YouTube ou Vimeo */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
    </section>
  );
};

export default FabricioPromo;
