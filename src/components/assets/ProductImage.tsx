import React from 'react';
import { Compass, Bot } from 'lucide-react';

interface ProductImageProps {
  productId: 'innerverse' | 'ai-aaji';
  altText: string;
  imageSrc?: string;
  className?: string;
}

/**
 * Reusable Product Image component ready for official UI / mockup product graphics.
 */
export const ProductImage: React.FC<ProductImageProps> = ({
  productId,
  altText,
  imageSrc,
  className = '',
}) => {
  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt={altText}
        className={`w-full h-full object-cover ${className}`}
      />
    );
  }

  // Graceful fallback to existing stylized SVG motif
  return (
    <div className={`w-full h-full flex items-center justify-center p-6 ${className}`}>
      {productId === 'innerverse' ? (
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-center mb-3">
            <Compass className="w-8 h-8" />
          </div>
          <span className="text-xs font-mono text-amber-300 uppercase tracking-wider">
            Innerverse Life Navigation
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center justify-center mb-3">
            <Bot className="w-8 h-8" />
          </div>
          <span className="text-xs font-mono text-cyan-300 uppercase tracking-wider">
            AI Aaji Smart Companion
          </span>
        </div>
      )}
    </div>
  );
};
