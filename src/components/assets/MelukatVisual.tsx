import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface MelukatVisualProps {
  imageSrc?: string;
  className?: string;
  altText?: string;
}

/**
 * Editorial Visual for Melukat Meditation Center (Promoting Partner)
 * Subtly incorporates warm gold, deep purple, and ocean blue cues while
 * preserving EpicForce.ai dark architecture. Easily replaceable with official image.
 */
export const MelukatVisual: React.FC<MelukatVisualProps> = ({
  imageSrc = '/assets/partners/melukat.jpg',
  className = '',
  altText = 'Melukat Meditation Center',
}) => {
  const [hasImage, setHasImage] = useState<boolean>(false);

  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => setHasImage(true);
    img.onerror = () => setHasImage(false);
  }, [imageSrc]);

  if (hasImage) {
    return (
      <div className={`relative w-full h-full overflow-hidden rounded-2xl bg-[#0E061A] ${className}`}>
        <img
          src={imageSrc}
          alt={altText}
          className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      </div>
    );
  }

  // Refined editorial emblem fallback honoring Melukat's purple & gold meditation aesthetic
  return (
    <div
      className={`relative w-full h-full min-h-[220px] sm:min-h-[260px] md:min-h-[280px] rounded-2xl overflow-hidden flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#1C0D30] via-[#10071C] to-[#080310] border border-amber-500/20 shadow-xl ${className}`}
      role="img"
      aria-label={altText}
    >
      {/* Ambient background glow: Deep purple and twilight ocean teal */}
      <div
        className="absolute -top-10 -right-10 w-44 h-44 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-10 -left-10 w-44 h-44 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Decorative meditative water rippling contour */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="none">
          <circle cx="100" cy="100" r="40" fill="none" stroke="#F59E0B" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="65" fill="none" stroke="#A855F7" strokeWidth="0.5" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="90" fill="none" stroke="#38BDF8" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Central Sacred Lotus / Stillness Emblem */}
      <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-b from-amber-400/10 via-purple-500/10 to-transparent border border-amber-400/30 flex items-center justify-center shadow-lg shadow-purple-900/30 mb-4 group-hover:scale-105 transition-transform duration-300">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="w-9 h-9 sm:w-11 sm:h-11 text-amber-300"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Stylized Lotus Center */}
          <path d="M24 8 C24 16, 20 28, 24 38 C28 28, 24 16, 24 8 Z" fill="rgba(251, 191, 36, 0.2)" stroke="#FBBF24" />
          {/* Left Petal */}
          <path d="M24 20 C14 20, 10 30, 24 38" stroke="#F59E0B" />
          {/* Right Petal */}
          <path d="M24 20 C34 20, 38 30, 24 38" stroke="#F59E0B" />
          {/* Outer Whispers / Ocean wave base */}
          <path d="M12 36 C18 42, 30 42, 36 36" stroke="#C084FC" strokeWidth="1.2" />
          <circle cx="24" cy="14" r="1.5" fill="#FBBF24" />
        </svg>
      </div>

      {/* Brand Lettering */}
      <div className="relative z-10">
        <span className="block font-display text-2xl sm:text-3xl font-medium tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-purple-200 uppercase mb-1">
          MELUKAT
        </span>
        <span className="block font-mono text-[10px] sm:text-xs tracking-[0.22em] text-purple-300/80 uppercase mb-3">
          Meditation Center
        </span>

        {/* Subtle pill indicator */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-neutral-300">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>melukat.app</span>
        </div>
      </div>
    </div>
  );
};
