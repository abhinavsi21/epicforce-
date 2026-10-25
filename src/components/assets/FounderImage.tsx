import React, { useState } from 'react';
import anishLocalPhoto from '../../assets/founders/anish-timble.jpg';
import abhinavLocalPhoto from '../../assets/founders/abhinav-singh.jpeg';

interface FounderImageProps {
  founderId: 'anish-timble' | 'abhinav-singh';
  name: string;
  imageSrc?: string;
  className?: string;
}

/**
 * Official Founder Photograph Component
 * Renders the permanent official photographs for Anish Timble and Abhinav Singh.
 * Framed with a 3:4 aspect ratio, responsive sizing, and high-DPI cropping.
 * Implements direct Vite asset bundling and automatic fallback paths so images never fail.
 */
export const FounderImage: React.FC<FounderImageProps> = ({
  founderId,
  name,
  imageSrc,
  className = '',
}) => {
  const defaultBundled = founderId === 'anish-timble' ? anishLocalPhoto : abhinavLocalPhoto;
  const [currentSrc, setCurrentSrc] = useState<string>(imageSrc || defaultBundled);
  const [fallbackIndex, setFallbackIndex] = useState<number>(0);

  const fallbackCandidates =
    founderId === 'anish-timble'
      ? [
          defaultBundled,
          '/anish-timble.jpg',
          '/assets/founders/anish-timble.jpg',
        ]
      : [
          defaultBundled,
          '/abhinav-singh.jpeg',
          '/assets/founders/abhinav-singh.jpeg',
        ];

  const handleImageError = () => {
    const nextIndex = fallbackIndex + 1;
    if (nextIndex < fallbackCandidates.length) {
      setFallbackIndex(nextIndex);
      setCurrentSrc(fallbackCandidates[nextIndex]);
    }
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none bg-neutral-950 ${className}`}
    >
      <img
        src={currentSrc}
        alt={name}
        onError={handleImageError}
        className="w-full h-full object-cover object-top sm:object-center transition-transform duration-500 hover:scale-105"
        loading="eager"
      />
      {/* Subtle ambient gradient overlay for seamless dark theme cohesion */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
    </div>
  );
};
