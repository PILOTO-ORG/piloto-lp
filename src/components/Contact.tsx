import { Mail, Phone, MapPin, Calendar } from 'lucide-react';

const Contact = () => {
  const openCalendly = () => {
    window.open('https://calendly.com/luan-piloto', '_blank');
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

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            {/* <h3 className="text-xl font-semibold mb-6">Informações de Contato</h3> */}
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-blue-600 mr-4" />
                <div>
                  <p className="font-medium text-gray-900">E-mail</p>
                  <a href="mailto:luan@piloto.live" className="text-gray-700 hover:text-blue-600">
                    luan@piloto.live
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-6 h-6 text-blue-600 mr-4" />
                <div>
                  <p className="font-medium text-gray-900">Telefone</p>
                  <a href="tel:+5548999230055" className="text-gray-700 hover:text-blue-600">
                    (48) 99858-9586
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-blue-600 mr-4" />
                <div>
                  <p className="font-medium text-gray-900">Endereço</p>
                  <p className="text-gray-700">
                    Joinville - SC
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Calendly Call-to-Action */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 text-white h-fit flex flex-col items-center justify-center">
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