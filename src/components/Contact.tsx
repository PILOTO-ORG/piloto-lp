import { Calendar } from 'lucide-react';

const Contact = () => {
  const openCalendly = () => {
    window.open('https://calendly.com/luan_piloto/15-minutos', '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Entre em contato com a gente
          </h2>
          <p className="text-xl text-gray-700">
            Estamos prontos para ajudar sua empresa a alcançar o próximo nível de automação
          </p>
        </div>

        {/* Calendly Call-to-Action (centralizado) */}
        <div className="max-w-xl mx-auto">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 text-white flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold mb-4 text-center">Agende uma Consultoria</h3>
            <p className="mb-6 text-center">
              Marque uma reunião de 30 minutos com nosso time para descobrir como podemos ajudar sua empresa
            </p>
            <button
              onClick={openCalendly}
              className="flex items-center justify-center bg-white text-blue-600 py-3 px-6 rounded-full hover:bg-blue-50 transition-colors font-medium"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Agendar Horário
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;