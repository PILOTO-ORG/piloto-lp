import { memo } from 'react';

interface SolutionBlockProps {
  title: string;
  description: string;
  ctaText: string;
  imageSrc: string;
  imageAlt: string;
  onClick?: () => void;
}

const SolutionBlock = memo(({ title, description, ctaText, imageSrc, imageAlt, onClick }: SolutionBlockProps) => {
  return (
    <div className="solution-block bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
          <button
            onClick={onClick}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center hover:scale-105 active:scale-95"
          >
            {ctaText}
          </button>
        </div>
        <div className="flex-1">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
});

export default SolutionBlock;
