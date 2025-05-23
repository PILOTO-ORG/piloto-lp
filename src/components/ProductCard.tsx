import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description, icon, to }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
    <div className="text-5xl mb-4 text-indigo-600">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <Link to={to} className="mt-auto bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition">
      Saiba mais
    </Link>
  </div>
);

export default ProductCard;
