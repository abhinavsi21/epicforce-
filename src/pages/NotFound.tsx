import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080B14] text-white flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 text-[#22D3EE]">
          <Compass className="w-8 h-8" />
        </div>

        <span className="font-mono text-xs uppercase tracking-widest text-[#22D3EE] block mb-3">
          Error 404 · Uncharted Coordinates
        </span>

        <h1 className="font-display text-4xl sm:text-5xl font-normal text-white mb-4">
          THIS PATH DOESN'T EXIST.
        </h1>

        <p className="text-neutral-400 font-light text-base leading-relaxed mb-8">
          But there's always another direction. Let's return to the core architecture.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-[#080B14] hover:bg-neutral-200 font-medium text-sm transition-colors shadow-lg shadow-white/10"
        >
          <span>Return Home</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
