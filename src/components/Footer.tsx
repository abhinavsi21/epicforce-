import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Instagram, Mail } from 'lucide-react';
import {
  INNERVERSE_URL,
  INSTAGRAM_URL,
  CONTACT_EMAIL,
  LINKEDIN_URL,
  TWITTER_URL,
  trackEvent,
} from '../config/links';
import { BrandLogo } from './assets/BrandLogo';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#05070F] text-white border-t border-white/10 pt-16 sm:pt-20 pb-12 w-full max-w-[100vw]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 pb-12 sm:pb-16 border-b border-white/10">
          {/* Brand lockup */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded min-h-[44px]"
                aria-label="EpicForce.ai Home"
              >
                <BrandLogo />
              </Link>

              <p className="font-display italic text-lg sm:text-xl text-neutral-300 mt-3 max-w-sm">
                Where ideas become epic.
              </p>

              <p className="text-xs sm:text-sm text-neutral-400 font-light mt-3 max-w-md leading-relaxed">
                A purpose-driven innovation platform building technology that amplifies human clarity, purpose, and potential.
              </p>
            </div>

            <div className="mt-6 sm:mt-8 space-y-2 text-xs font-mono text-neutral-400">
              <p>San Francisco · Mumbai · Global</p>
              <p className="text-neutral-400">
                Contact:{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  onClick={() => trackEvent('email_click', { source: 'footer' })}
                  className="text-[#22D3EE] hover:underline"
                  aria-label="Email EpicForce.ai"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-4 sm:mb-6">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                <button
                  onClick={() => scrollTo('mission')}
                  className="py-1.5 hover:text-white transition-colors cursor-pointer text-left block w-full"
                >
                  Mission & Thesis
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('pillars')}
                  className="py-1.5 hover:text-white transition-colors cursor-pointer text-left block w-full"
                >
                  Core Pillars
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('products')}
                  className="py-1.5 hover:text-white transition-colors cursor-pointer text-left block w-full"
                >
                  Products Ecosystem
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('founders')}
                  className="py-1.5 hover:text-white transition-colors cursor-pointer text-left block w-full"
                >
                  Leadership & Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('roadmap')}
                  className="py-1.5 hover:text-white transition-colors cursor-pointer text-left block w-full"
                >
                  Strategic Roadmap
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('contact')}
                  className="py-1.5 hover:text-white transition-colors cursor-pointer text-left block w-full"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Ecosystem Products: myinnerverse.in and AI Aaji */}
          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-4 sm:mb-6">
              Products
            </h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                <a
                  href={INNERVERSE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('innerverse_cta_click', { source: 'footer_product_link' })}
                  className="py-1.5 hover:text-[#22D3EE] transition-colors flex items-center gap-1 group"
                  aria-label="Innerverse live website (myinnerverse.in)"
                >
                  <span>Innerverse</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#22D3EE] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <span className="block text-[11px] font-mono text-neutral-400">
                  myinnerverse.in
                </span>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => scrollTo('ai-aaji')}
                  className="py-1.5 hover:text-white transition-colors cursor-pointer text-left block w-full"
                >
                  AI Aaji
                </button>
                <span className="block text-[11px] font-mono text-cyan-400">
                  Coming Soon
                </span>
              </li>
            </ul>

            <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-300 font-semibold mt-6 mb-3">
              Social
            </h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('instagram_click', { source: 'footer' })}
                  className="py-1 hover:text-pink-400 transition-colors inline-flex items-center gap-1.5 group"
                  aria-label="EpicForce.ai on Instagram"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3 text-pink-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
              <li>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1 hover:text-white transition-colors block"
                  aria-label="EpicForce.ai on LinkedIn"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={TWITTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1 hover:text-white transition-colors block"
                  aria-label="EpicForce.ai on X Twitter"
                >
                  X (Twitter)
                </a>
              </li>
            </ul>
          </div>

          {/* Legal and Direct Inquiries */}
          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-4 sm:mb-6">
              Legal & Trust
            </h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                <Link to="/privacy" className="py-1.5 hover:text-white transition-colors block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="py-1.5 hover:text-white transition-colors block">
                  Terms of Service
                </Link>
              </li>
            </ul>

            <div className="mt-8 pt-4 border-t border-white/10">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                onClick={() => trackEvent('email_click', { source: 'footer_direct_button' })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Email Us at nsh.aimac@gmail.com"
              >
                <Mail className="w-3 h-3 text-[#22D3EE]" />
                <span>Email Us →</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-400 text-center sm:text-left">
          <p>© 2026 EpicForce.ai. All rights reserved.</p>
          <p className="text-neutral-400">
            Powered by force, guided by AI.
          </p>
        </div>
      </div>
    </footer>
  );
};
