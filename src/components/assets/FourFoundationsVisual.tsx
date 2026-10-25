import React, { useState, useEffect } from 'react';

interface FourFoundationsVisualProps {
  className?: string;
  imageSrc?: string;
}

const STORAGE_KEY = 'innerverse_foundations_custom_image';

/**
 * Official Four Foundations of Life Artwork Component
 * Preserves the user's uploaded artwork with exact 3:4 portrait alignment,
 * high-resolution object-cover framing, and ambient dark aesthetic.
 */
export const FourFoundationsVisual: React.FC<FourFoundationsVisualProps> = ({
  className = '',
  imageSrc,
}) => {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [hasImageError, setHasImageError] = useState<boolean>(false);
  const [activeOrb, setActiveOrb] = useState<string | null>(null);

  // Initialize from user's uploaded image in localStorage or provided source / public files
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setActiveImage(saved);
        return;
      }
    }
    if (imageSrc) {
      setActiveImage(imageSrc);
    } else {
      setActiveImage('/image.png');
    }
  }, [imageSrc]);

  const handleImageError = () => {
    // If /image.png fails and wasn't loaded from localStorage, try /four-foundations.svg before falling back
    if (activeImage === '/image.png') {
      setActiveImage('/four-foundations.svg');
    } else {
      setHasImageError(true);
    }
  };

  return (
    <div
      className={`relative w-full h-full min-h-[380px] sm:min-h-[480px] lg:min-h-[520px] rounded-2xl overflow-hidden border border-white/15 bg-[#030611] select-none group/visual shadow-2xl flex flex-col justify-between transition-all duration-300 ${className}`}
      role="img"
      aria-label="The Four Foundations of Life: Mindset, Heartset, Healthset, and Soulset"
    >
      {/* 1. User Uploaded Artwork Display */}
      {!hasImageError && activeImage ? (
        <img
          src={activeImage}
          alt="The Four Foundations of Life — Mindset, Heartset, Healthset, Soulset"
          onError={handleImageError}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover/visual:scale-105"
          loading="eager"
        />
      ) : (
        /* 2. Fallback High-Fidelity Mandala Composition */
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-[#070b19] via-[#0d162d] to-[#1a131b]" />
          <div className="absolute top-[48%] -right-12 w-80 h-80 rounded-full bg-gradient-to-tr from-amber-500/30 via-orange-500/20 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute top-[42%] left-[10%] w-72 h-72 rounded-full bg-gradient-to-br from-blue-600/20 via-indigo-500/15 to-transparent blur-3xl pointer-events-none" />

          <svg
            className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover/visual:scale-[1.02]"
            viewBox="0 0 600 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <radialGradient id="sunOrigin" cx="72%" cy="60%" r="28%">
                <stop offset="0%" stopColor="#fffbeb" stopOpacity="0.95" />
                <stop offset="25%" stopColor="#fde047" stopOpacity="0.6" />
                <stop offset="60%" stopColor="#fb923c" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="orbMindset" cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#7dd3fc" />
                <stop offset="45%" stopColor="#0284c7" />
                <stop offset="90%" stopColor="#082f49" />
                <stop offset="100%" stopColor="#031624" />
              </radialGradient>

              <radialGradient id="orbHeartset" cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#fda4af" />
                <stop offset="45%" stopColor="#e11d48" />
                <stop offset="90%" stopColor="#881337" />
                <stop offset="100%" stopColor="#4c0519" />
              </radialGradient>

              <radialGradient id="orbHealthset" cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#6ee7b7" />
                <stop offset="45%" stopColor="#059669" />
                <stop offset="90%" stopColor="#064e3b" />
                <stop offset="100%" stopColor="#022c22" />
              </radialGradient>

              <radialGradient id="orbSoulset" cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="45%" stopColor="#d97706" />
                <stop offset="90%" stopColor="#78350f" />
                <stop offset="100%" stopColor="#451a03" />
              </radialGradient>

              <filter id="neonHalo" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <circle cx="430" cy="480" r="220" fill="url(#sunOrigin)" />

            <path
              d="M-20,530 Q120,490 260,520 T520,495 T620,540 L620,820 L-20,820 Z"
              fill="#131c31"
              opacity="0.45"
            />
            <path
              d="M-20,570 Q160,525 320,555 T620,540 L620,820 L-20,820 Z"
              fill="#0c1322"
              opacity="0.75"
            />
            <path
              d="M-20,620 Q140,580 280,610 T620,590 L620,820 L-20,820 Z"
              fill="#060913"
            />

            <path
              d="M390,520 Q440,560 380,600 T440,650"
              stroke="#fef08a"
              strokeWidth="3.5"
              fill="none"
              opacity="0.75"
              filter="url(#neonHalo)"
            />

            <path d="M100,820 Q300,685 500,820 Z" fill="#02040a" />

            <g transform="translate(300, 695) scale(0.72)" fill="#020409">
              <ellipse cx="0" cy="-62" rx="15" ry="18" />
              <path d="M-9,-44 C-28,-36 -40,-16 -44,16 C-46,26 -26,29 -16,26 C-6,24 6,24 16,26 C26,29 46,26 44,16 C40,-16 28,-36 9,-44 Z" />
              <path d="M-58,22 C-48,12 -28,20 0,20 C28,20 48,12 58,22 C52,32 28,30 0,32 C-28,30 -52,32 -58,22 Z" />
            </g>

            {/* Sacred Geometry Mandala */}
            <g transform="translate(300, 260)">
              <circle
                cx="0"
                cy="0"
                r="145"
                fill="none"
                stroke="#fef08a"
                strokeWidth="1.75"
                opacity="0.85"
                filter="url(#neonHalo)"
              />
              <circle
                cx="0"
                cy="0"
                r="180"
                fill="none"
                stroke="#fde047"
                strokeWidth="0.7"
                strokeDasharray="3 5"
                opacity="0.4"
              />

              <line x1="0" y1="-195" x2="0" y2="195" stroke="#fde047" strokeWidth="0.85" opacity="0.4" />
              <line x1="-195" y1="0" x2="195" y2="0" stroke="#fde047" strokeWidth="0.85" opacity="0.4" />

              <path
                d="M0,-24 Q0,0 24,0 Q0,0 0,24 Q0,0 -24,0 Q0,0 0,-24 Z"
                fill="#fffbeb"
                filter="url(#neonHalo)"
              />
              <circle cx="0" cy="0" r="3.5" fill="#ffffff" />

              {/* Mindset Orb */}
              <g
                transform="translate(0, -145)"
                className="cursor-pointer transition-transform duration-300 hover:scale-105"
                onMouseEnter={() => setActiveOrb('mindset')}
                onMouseLeave={() => setActiveOrb(null)}
              >
                <circle
                  cx="0"
                  cy="0"
                  r="52"
                  fill="url(#orbMindset)"
                  stroke="#7dd3fc"
                  strokeWidth="2"
                  filter="url(#neonHalo)"
                />
                <path
                  d="M-13,-18 C-24,-18 -26,-5 -22,2 C-28,8 -26,22 -15,22 C-11,22 -7,20 -4,17 C-2,20 2,20 4,17 C7,20 11,22 15,22 C26,22 28,8 22,2 C26,-5 24,-18 13,-18 C9,-18 5,-14 0,-10 C-5,-14 -9,-18 -13,-18 Z"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M-9,-7 C-15,-3 -13,7 -7,7 M9,-7 C15,-3 13,7 7,7 M0,-8 L0,15"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </g>

              {/* Heartset Orb */}
              <g
                transform="translate(-145, 0)"
                className="cursor-pointer transition-transform duration-300 hover:scale-105"
                onMouseEnter={() => setActiveOrb('heartset')}
                onMouseLeave={() => setActiveOrb(null)}
              >
                <circle
                  cx="0"
                  cy="0"
                  r="52"
                  fill="url(#orbHeartset)"
                  stroke="#fda4af"
                  strokeWidth="2"
                  filter="url(#neonHalo)"
                />
                <path
                  d="M0,19 C-20,7 -26,-6 -26,-15 C-26,-22 -20,-26 -13,-26 C-7,-26 -2,-22 0,-17 C2,-22 7,-26 13,-26 C20,-26 26,-22 26,-15 C26,-6 20,7 0,19 Z"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>

              {/* Healthset Orb */}
              <g
                transform="translate(145, 0)"
                className="cursor-pointer transition-transform duration-300 hover:scale-105"
                onMouseEnter={() => setActiveOrb('healthset')}
                onMouseLeave={() => setActiveOrb(null)}
              >
                <circle
                  cx="0"
                  cy="0"
                  r="52"
                  fill="url(#orbHealthset)"
                  stroke="#6ee7b7"
                  strokeWidth="2"
                  filter="url(#neonHalo)"
                />
                <path
                  d="M0,-24 C-7,-11 -13,4 0,18 C13,4 7,-11 0,-24 Z"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.2"
                />
                <path
                  d="M0,18 C-13,14 -24,-1 -20,-14 C-11,-5 -4,8 0,18 Z"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <path
                  d="M0,18 C13,14 24,-1 20,-14 C11,-5 4,8 0,18 Z"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <path
                  d="M-20,13 C-11,20 11,20 20,13"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </g>

              {/* Soulset Orb */}
              <g
                transform="translate(0, 145)"
                className="cursor-pointer transition-transform duration-300 hover:scale-105"
                onMouseEnter={() => setActiveOrb('soulset')}
                onMouseLeave={() => setActiveOrb(null)}
              >
                <circle
                  cx="0"
                  cy="0"
                  r="52"
                  fill="url(#orbSoulset)"
                  stroke="#fde047"
                  strokeWidth="2"
                  filter="url(#neonHalo)"
                />
                <circle cx="0" cy="-15" r="7.5" fill="none" stroke="#ffffff" strokeWidth="2.3" />
                <path
                  d="M-11,3 C-17,9 -21,19 -19,23 C-15,25 -7,21 0,21 C7,21 15,25 19,23 C21,19 17,9 11,3 C7,-1 -7,-1 -11,3 Z"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </g>
          </svg>
        </>
      )}

      {/* Subtle Gradient Framing Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

      {/* Top Header Labels */}
      <div className="relative z-20 p-4 flex items-center justify-between gap-2 pointer-events-none">
        <span className="px-2.5 py-1 rounded-md bg-black/70 border border-white/15 text-cyan-300 backdrop-blur-md shadow-md text-[11px] font-mono">
          {activeOrb ? activeOrb.toUpperCase() : 'The Four Foundations'}
        </span>

        <span className="px-2.5 py-1 rounded-md bg-amber-400/15 border border-amber-400/30 text-amber-300 font-semibold backdrop-blur-md shadow-md text-[11px] font-mono">
          Innerverse
        </span>
      </div>

      {/* Bottom Subtitle / Info Bar */}
      <div className="relative z-20 m-3 p-3 rounded-xl bg-black/75 border border-white/15 backdrop-blur-md flex items-center justify-between text-[11px] font-mono text-neutral-300 shadow-lg pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-white font-medium">Mindset</span>
          <span className="text-neutral-500">·</span>
          <span className="text-rose-300 font-medium">Heartset</span>
          <span className="text-neutral-500">·</span>
          <span className="text-emerald-300 font-medium">Healthset</span>
          <span className="text-neutral-500">·</span>
          <span className="text-amber-300 font-medium">Soulset</span>
        </div>

        <span className="text-neutral-400 text-[10px] hidden sm:inline-block">
          Seven Dimensions
        </span>
      </div>
    </div>
  );
};
