import React from 'react';

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
 */
export const FounderImage: React.FC<FounderImageProps> = ({
  founderId,
  name,
  imageSrc,
  className = '',
}) => {
  const resolvedSrc =
    imageSrc ||
    (founderId === 'anish-timble'
      ? '/anish-timble.jpg'
      : '/abhinav-singh.jpeg');

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none bg-neutral-950 ${className}`}
    >
      <img
        src={resolvedSrc}
        alt={name}
        className="w-full h-full object-cover object-top sm:object-center transition-transform duration-500 hover:scale-105"
        loading="lazy"
      />
      {/* Subtle ambient gradient overlay for seamless dark theme cohesion */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
    </div>
  );
};
