import React from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaLink?: string;
  backgroundImage?: string;
  imageSrc?: string;
  imageAlt?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink = '#',
  backgroundImage,
  imageSrc,
  imageAlt
}) => {
  return (
    <section
      className="hero"
      style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined }}
    >
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
        <Link to={ctaLink} className="hero-cta">
          {ctaText}
        </Link>
      </div>
      {imageSrc && (
        <div className="hero-image">
          <img src={imageSrc} alt={imageAlt || ''} />
        </div>
      )}
    </section>
  );
};

export default Hero;
