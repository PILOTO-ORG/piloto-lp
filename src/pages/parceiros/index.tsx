import React from 'react';

interface Partner {
  name: string;
  area: string;
  photo: string;
}

const partners: Partner[] = [
  { name: 'Empresa Alpha', area: 'Marketing Digital', photo: '/images/partner-alpha.jpg' },
  { name: 'Beta Consultoria', area: 'Consultoria Financeira', photo: '/images/partner-beta.jpg' },
  { name: 'Gamma Tecnologia', area: 'Desenvolvimento de Software', photo: '/images/partner-gamma.jpg' },
];

const Parceiros: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12 text-center">Nossos Parceiros</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((p, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
              <img src={p.photo} alt={p.name} className="w-32 h-32 object-cover rounded-full mb-4" />
              <h2 className="text-2xl font-semibold mb-2">{p.name}</h2>
              <p className="text-gray-600">{p.area}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Parceiros;
