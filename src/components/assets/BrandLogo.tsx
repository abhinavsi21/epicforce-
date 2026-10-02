import React, { useState, useEffect } from 'react';

interface BrandLogoProps {
  className?: string;
  imageSrc?: string;
  altText?: string;
}

/**
 * Official EpicForce.ai Brand Logo
 * Features mathematically aligned typographic letterforms matching official specifications:
 * - 'e': Royal Blue (#1E5BF7)
 * - 'p': Purple (#7C3AED) with embedded golden-yellow lightning bolt
 * - 'ic': Deep Magenta (#DB2777)
 * - 'f': Crimson Red (#EF4444)
 * - 'o': Crimson Red 8-tooth Mechanical Gear Cog (#EF4444)
 * - 'rce': Fiery Orange-Red to Tangerine Orange (#EA580C - #F97316)
 * - '.ai': Crimson Red (#EF4444)
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  imageSrc,
  altText = 'EpicForce.ai',
}) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    // 1. Check if user saved the uploaded raster logo in local storage
    const saved = localStorage.getItem('epicforce_logo_data');
    if (saved) {
      setLogoUrl(saved);
      return;
    }

    // 2. Check explicitly provided imageSrc
    if (imageSrc) {
      setLogoUrl(imageSrc);
      return;
    }

    // 3. Check if /epicforce-logo.png or /assets/brand/epicforce-logo.png exists in public
    const img = new Image();
    img.src = '/epicforce-logo.png';
    img.onload = () => setLogoUrl('/epicforce-logo.png');
    img.onerror = () => {
      const img2 = new Image();
      img2.src = '/assets/brand/epicforce-logo.png';
      img2.onload = () => setLogoUrl('/assets/brand/epicforce-logo.png');
    };
  }, [imageSrc]);

  // If raster logo exists, render it with clean containment
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={altText}
        className={`h-7 sm:h-8 w-auto object-contain select-none ${className}`}
      />
    );
  }

  // Mathematically balanced, razor-sharp vector typography
  return (
    <span
      className={`inline-flex items-center tracking-[-0.03em] font-extrabold select-none text-[22px] sm:text-[24px] md:text-[26px] leading-none ${className}`}
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
      aria-label={altText}
      role="img"
    >
      {/* e - Royal Blue */}
      <span className="text-[#1E5BF7]">e</span>

      {/* p - Purple with embedded sharp gold lightning bolt in counter */}
      <span className="relative inline-flex items-center justify-center text-[#7C3AED]">
        <span>p</span>
        <svg
          viewBox="0 0 24 24"
          fill="#FBBF24"
          className="absolute w-[10px] h-[10px] top-[4px] left-[5px] sm:w-[11px] sm:h-[11px] sm:top-[5px] sm:left-[6px] pointer-events-none drop-shadow-[0_0_2px_rgba(251,191,36,0.9)]"
        >
          <polygon points="13,1 3,14 11,14 8,23 21,9 12,9" />
        </svg>
      </span>

      {/* ic - Deep Magenta */}
      <span className="text-[#DB2777]">i</span>
      <span className="text-[#DB2777]">c</span>

      {/* f - Crimson Red */}
      <span className="text-[#EF4444]">f</span>

      {/* o - Red 8-tooth mechanical cog gear sitting precisely on lowercase x-height */}
      <span className="inline-flex items-center justify-center mx-[1.5px] relative top-[1px]">
        <svg
          viewBox="0 0 24 24"
          className="w-[17px] h-[17px] sm:w-[19px] sm:h-[19px] text-[#EF4444] fill-current"
        >
          <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
          <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
        </svg>
      </span>

      {/* r - Fiery Orange-Red */}
      <span className="text-[#EA580C]">r</span>

      {/* ce - Tangerine Orange */}
      <span className="text-[#F97316]">c</span>
      <span className="text-[#F97316]">e</span>

      {/* .ai - Crimson Red */}
      <span className="text-[#EF4444] font-black">.</span>
      <span className="text-[#EF4444]">a</span>
      <span className="text-[#EF4444]">i</span>
    </span>
  );
};
