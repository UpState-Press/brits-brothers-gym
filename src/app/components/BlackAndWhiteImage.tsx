import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BlackAndWhiteImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function BlackAndWhiteImage({ src, alt, className = '' }: BlackAndWhiteImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ImageWithFallback
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-700 ${
          isHovered ? 'grayscale-0 scale-105' : 'grayscale scale-100'
        }`}
      />
    </div>
  );
}
