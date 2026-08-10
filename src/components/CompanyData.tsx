import { Building2 } from 'lucide-react';

// Dados oficiais da empresa — exibidos no FIM da página (rodapé institucional).
const CompanyData = () => {
  return (
    <section className="py-12 bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Building2 className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Dados da empresa</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <p className="text-gray-500">Razão Social</p>
              <p className="font-medium text-gray-900">PILOTO LTDA - ME</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <p className="text-gray-500">CNPJ</p>
              <p className="font-medium text-gray-900">59.537.121/0001-10</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <p className="text-gray-500">Atividade</p>
              <p className="font-medium text-gray-900">
                Desenvolvimento e licenciamento de programas de computador customizáveis
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <p className="text-gray-500">Sede</p>
              <p className="font-medium text-gray-900">
                SC 410, 2037 - Areias do Meio, GCR - SC, CEP 88196-192
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyData;
