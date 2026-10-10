import { Calendar, MessageCircle, Mail } from 'lucide-react';

// id="contato" (era "contact"): o cabeçalho navega por âncora em português e
// precisa casar com o href de Header.tsx.
//
// Antes aqui só existia o Calendly. Marcar reunião de 30 minutos é um
// compromisso grande para quem acabou de chegar na página — quem não está nesse
// ponto ainda ia embora sem opção. Agora o WhatsApp vem junto, que é por onde a
// conversa comercial realmente acontece, e o e-mail para quem prefere escrever.

const Contact = () => {
  return (
    <section id="contato" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Entre em contato com a gente
          </h2>
          <p className="text-lg sm:text-xl text-gray-700">
            Conte qual é o gargalo da sua operação hoje. A resposta vem com
            prazo e escopo.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3">
          {/* WhatsApp primeiro: é o canal de menor atrito e o que a empresa usa. */}
          <div className="bg-white rounded-2xl border border-gray-200 p-7 flex flex-col text-center items-center">
            <span className="bg-green-50 text-green-600 rounded-xl p-3 mb-4">
              <MessageCircle className="w-6 h-6" aria-hidden="true" />
            </span>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              WhatsApp
            </h3>
            <p className="text-gray-600 mb-6 flex-grow">
              A conversa direta, sem formulário. É por aqui que a maioria começa.
            </p>
            <a
              href="https://wa.me/5548998589586?text=Ol%C3%A1%21%20Estou%20entrando%20em%20contato%20atrav%C3%A9s%20do%20site."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-full font-medium transition-colors"
            >
              (48) 99858-9586
            </a>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-7 text-white flex flex-col text-center items-center">
            <span className="bg-white/20 rounded-xl p-3 mb-4">
              <Calendar className="w-6 h-6" aria-hidden="true" />
            </span>
            <h3 className="text-lg font-semibold mb-2">Agendar consultoria</h3>
            <p className="mb-6 flex-grow text-blue-50">
              Meia hora para entender a sua operação e dizer o que dá para
              automatizar primeiro.
            </p>
            <a
              href="https://calendly.com/luan_piloto/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white text-blue-600 py-3 px-6 rounded-full hover:bg-blue-50 transition-colors font-medium"
            >
              Escolher horário
            </a>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-7 flex flex-col text-center items-center">
            <span className="bg-blue-50 text-blue-600 rounded-xl p-3 mb-4">
              <Mail className="w-6 h-6" aria-hidden="true" />
            </span>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">E-mail</h3>
            <p className="text-gray-600 mb-6 flex-grow">
              Para quem prefere escrever com calma, anexar planilha ou envolver
              mais gente.
            </p>
            <a
              href="mailto:luan@piloto.life"
              className="w-full border border-gray-300 hover:border-blue-500 hover:text-blue-700 text-gray-900 py-3 px-6 rounded-full font-medium transition-colors"
            >
              luan@piloto.life
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
