import React from 'react';
import { Link } from 'react-router-dom';

interface SolutionBlockProps {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  imageSrc: string;
  imageAlt: string;
}

const SolutionBlock: React.FC<SolutionBlockProps> = ({
  title,
  description,
  ctaText,
  ctaLink,
  imageSrc,
  imageAlt
}) => {
  return (
    <div className="solution-block">
      <div className="solution-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <Link to={ctaLink} className="solution-cta">
          {ctaText}
        </Link>
      </div>
      <div className="solution-image">
        <img src={imageSrc} alt={imageAlt} />
      </div>
    </div>
  );
};

export default SolutionBlock;
