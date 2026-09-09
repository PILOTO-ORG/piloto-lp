import { Building2, Mail, Phone, MapPin, FileText, Briefcase } from 'lucide-react';

// Rodapé institucional unificado: contato + dados oficiais da empresa (endereço uma única vez).
const Item = ({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Mail;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white p-4 rounded-lg border border-gray-100 flex items-start">
    <Icon className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="font-medium text-gray-900">{children}</p>
    </div>
  </div>
);

const CompanyData = () => {
  return (
    <section className="py-12 bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Building2 className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Contato & Dados da empresa</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <Item icon={Mail} label="E-mail">
              <a href="mailto:luan@piloto.life" className="hover:text-blue-600">
                luan@piloto.life
              </a>
            </Item>
            <Item icon={Phone} label="Telefone">
              <a href="tel:+5548998589586" className="hover:text-blue-600">
                (48) 99858-9586
              </a>
            </Item>
            <Item icon={MapPin} label="Endereço">
              Praça Nereu Ramos, 90 - Sala do Empreendedor, Centro, Biguaçu - SC, CEP 88.160-116
            </Item>
            <Item icon={Building2} label="Razão Social">
              PILOTO LTDA - ME
            </Item>
            <Item icon={FileText} label="CNPJ">
              59.537.121/0001-10
            </Item>
            <Item icon={Briefcase} label="Atividade">
              Desenvolvimento e licenciamento de programas de computador customizáveis
            </Item>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyData;
