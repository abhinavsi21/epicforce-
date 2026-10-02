import React, { useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight, Compass, Bot } from 'lucide-react';
import { INNERVERSE_URL, trackEvent } from '../config/links';

interface HeroProps {
  onExploreWork: () => void;
  onInvestPartner: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onInvestPartner }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sophisticated, lightweight Canvas animation: Idea Nexus -> Intelligence -> People -> Impact
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', handleResize);

    const logicalWidth = window.innerWidth;
    const logicalHeight = window.innerHeight;

    // Mobile-adaptive particle count to preserve 60fps on lower-end devices (Audit 25 & 29)
    const nodeCount = Math.min(logicalWidth > 768 ? 44 : 18, 45);
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseRadius: number;
      alpha: number;
      pulseSpeed: number;
      isHumanNode?: boolean;
    }[] = [];

    // Central core Idea nexus
    const centralNexus = {
      x: logicalWidth * 0.5,
      y: logicalHeight * 0.42,
      radius: 5,
    };

    for (let i = 0; i < nodeCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 50 + Math.random() * (Math.min(logicalWidth, logicalHeight) * 0.4);
      nodes.push({
        x: centralNexus.x + Math.cos(angle) * distance,
        y: centralNexus.y + Math.sin(angle) * distance * 0.65,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 2 + 1.2,
        baseRadius: Math.random() * 2 + 1.2,
        alpha: Math.random() * 0.5 + 0.25,
        pulseSpeed: 0.015 + Math.random() * 0.02,
        isHumanNode: i % 4 === 0,
      });
    }

    let mouseX = centralNexus.x;
    let mouseY = centralNexus.y;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let time = 0;

    const render = () => {
      time += 0.02;
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // Atmospheric background gradient
      const bgGrad = ctx.createRadialGradient(
        centralNexus.x,
        centralNexus.y,
        10,
        centralNexus.x,
        centralNexus.y,
        w * 0.8
      );
      bgGrad.addColorStop(0, 'rgba(30, 41, 75, 0.45)');
      bgGrad.addColorStop(0.5, 'rgba(11, 16, 32, 0.75)');
      bgGrad.addColorStop(1, 'rgba(5, 8, 22, 1)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Drift
      centralNexus.x += (w * 0.5 + (mouseX - w * 0.5) * 0.035 - centralNexus.x) * 0.05;
      centralNexus.y += (h * 0.4 + (mouseY - h * 0.4) * 0.035 - centralNexus.y) * 0.05;

      // Central glowing pulse
      const nexusGlow = ctx.createRadialGradient(
        centralNexus.x,
        centralNexus.y,
        0,
        centralNexus.x,
        centralNexus.y,
        120
      );
      nexusGlow.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
      nexusGlow.addColorStop(0.4, 'rgba(34, 211, 238, 0.12)');
      nexusGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = nexusGlow;
      ctx.beginPath();
      ctx.arc(centralNexus.x, centralNexus.y, 120, 0, Math.PI * 2);
      ctx.fill();

      // Draw connection lines
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;

        if (a.x < 30 || a.x > w - 30) a.vx *= -1;
        if (a.y < 30 || a.y > h - 30) a.vy *= -1;

        const dxN = centralNexus.x - a.x;
        const dyN = centralNexus.y - a.y;
        const distN = Math.sqrt(dxN * dxN + dyN * dyN);

        if (distN < w * 0.45) {
          const alpha = (1 - distN / (w * 0.45)) * 0.2;
          ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(centralNexus.x, centralNexus.y);
          ctx.lineTo(a.x, a.y);
          ctx.stroke();
        }

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            const alpha = (1 - dist / 90) * 0.14;
            ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        const pulse = Math.sin(time + i) * 0.5 + 0.5;
        ctx.fillStyle = a.isHumanNode
          ? `rgba(236, 72, 153, ${a.alpha * 0.9})`
          : `rgba(255, 255, 255, ${a.alpha * 0.8})`;

        ctx.beginPath();
        ctx.arc(a.x, a.y, a.baseRadius + pulse * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(centralNexus.x, centralNexus.y, 3.5, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center bg-[#050816] text-white overflow-hidden pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 w-full max-w-[100vw]">
      {/* Background Interactive Idea Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center w-full">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[11px] sm:text-xs font-mono uppercase tracking-[0.18em] text-[#22D3EE] max-w-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shrink-0 animate-ping" />
          <span className="truncate">Purpose-Driven Innovation Platform</span>
        </div>

        {/* Main Headline (Mobile-first responsive fluid text scale: text-4xl -> text-8xl) */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal tracking-tight text-white leading-[1.08] sm:leading-[1.05] max-w-4xl mb-5 break-words">
          WHERE IDEAS <br className="hidden sm:inline" />
          BECOME <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-[#93C5FD] to-[#38BDF8]">EPIC.</span>
        </h1>

        {/* Supporting Slogan */}
        <div className="inline-flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-neutral-300 font-mono tracking-widest uppercase mb-5 max-w-full px-2">
          <span className="hidden sm:inline-block h-px w-6 bg-gradient-to-r from-transparent to-[#3B82F6]" />
          <span className="text-center text-[11px] sm:text-xs">Powered by force, guided by AI</span>
          <span className="hidden sm:inline-block h-px w-6 bg-gradient-to-l from-transparent to-[#22D3EE]" />
        </div>

        {/* Value Proposition */}
        <p className="max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl text-neutral-300 font-light leading-relaxed mb-6 sm:mb-8 text-balance px-2">
          EpicForce.ai is building technology that amplifies humanity — turning human purpose and intelligence into systems of lasting clarity and scale.
        </p>

        {/* Live Ecosystem Indicators - Recomposed as responsive cards on mobile (Audit 25) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 mb-8 sm:mb-10 text-xs font-mono text-neutral-300 w-full max-w-lg px-2">
          <a
            href={INNERVERSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('innerverse_cta_click', { source: 'hero_badge' })}
            className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center hover:bg-blue-500/20 hover:border-blue-400/40 transition-colors group/hero-link cursor-pointer"
            aria-label="Innerverse live on myinnerverse.in (opens in new tab)"
          >
            <Compass className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="text-[11px] sm:text-xs">Product 01: Innerverse (myinnerverse.in ↗)</span>
          </a>
          <div className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-center">
            <Bot className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="text-[11px] sm:text-xs">Product 02: AI Aaji · In Architecture</span>
          </div>
        </div>

        {/* Action Buttons: Full width on mobile (<640px) with minimum 48px touch target */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto px-4 sm:px-0">
          <button
            onClick={onExploreWork}
            className="group w-full sm:w-auto px-7 py-3.5 min-h-[48px] rounded-xl bg-white text-[#080B14] hover:bg-neutral-100 font-medium text-sm tracking-wide transition-all duration-200 shadow-xl shadow-blue-500/10 inline-flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 active:scale-[0.98]"
          >
            <span>Explore Products & Ecosystem</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <button
            onClick={onInvestPartner}
            className="group w-full sm:w-auto px-7 py-3.5 min-h-[48px] rounded-xl border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-medium text-sm tracking-wide transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98]"
          >
            <span>Invest / Partner</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* 4 Concept Sequence: Recomposed as 2x2 grid on mobile (<640px) to prevent word clipping */}
        <div className="mt-10 sm:mt-14 pt-6 border-t border-white/10 w-full max-w-xl grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs tracking-wider uppercase font-mono text-neutral-400 px-2">
          <div className="p-2 rounded-lg bg-white/[0.02]">
            <span className="block text-white font-medium">Idea</span>
            <span className="text-[10px] text-neutral-500">Spark</span>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.02]">
            <span className="block text-white font-medium">Intelligence</span>
            <span className="text-[10px] text-neutral-500">Synthesis</span>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.02]">
            <span className="block text-white font-medium">People</span>
            <span className="text-[10px] text-neutral-500">Heart</span>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.02]">
            <span className="block text-[#22D3EE] font-medium">Impact</span>
            <span className="text-[10px] text-neutral-500">Enduring</span>
          </div>
        </div>
      </div>
    </section>
  );
};
