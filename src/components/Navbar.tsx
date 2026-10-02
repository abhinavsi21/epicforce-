import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { INNERVERSE_URL, trackEvent } from '../config/links';
import { BrandLogo } from './assets/BrandLogo';

interface NavbarProps {
  onOpenPartner?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPartner }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll listener for sticky styling and section spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      if (location.pathname === '/') {
        const sections = ['mission', 'pillars', 'products', 'innerverse', 'founders', 'roadmap', 'contact'];
        let currentSection = '';

        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom >= 150) {
              currentSection = sectionId;
              break;
            }
          }
        }
        setActiveSection(currentSection);
      } else {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Close mobile menu on route change & manage body scroll lock
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (anchorId: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${anchorId}`);
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handlePartnerClick = () => {
    setMobileMenuOpen(false);
    if (onOpenPartner) {
      onOpenPartner();
    } else {
      handleNavClick('invest');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 text-white ${
        scrolled
          ? 'py-3.5 bg-[#080B14]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Zone 1: Single brand wordmark */}
        <Link
          to="/"
          className="group inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
          aria-label="EpicForce.ai Home"
        >
          <BrandLogo />
        </Link>

        {/* Zone 2: Clean text navigation links with active state indicator */}
        <nav
          className="hidden md:flex items-center gap-7 text-sm font-medium"
          aria-label="Main Navigation"
        >
          <button
            onClick={() => handleNavClick('mission')}
            aria-current={activeSection === 'mission' ? 'true' : undefined}
            className={`relative py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded px-1.5 cursor-pointer ${
              activeSection === 'mission' ? 'text-[#22D3EE]' : 'text-neutral-300 hover:text-white'
            }`}
          >
            <span>Mission</span>
            {activeSection === 'mission' && (
              <span className="absolute bottom-0 left-1.5 right-1.5 h-0.5 bg-[#22D3EE] rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('pillars')}
            aria-current={activeSection === 'pillars' ? 'true' : undefined}
            className={`relative py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded px-1.5 cursor-pointer ${
              activeSection === 'pillars' ? 'text-[#22D3EE]' : 'text-neutral-300 hover:text-white'
            }`}
          >
            <span>Pillars</span>
            {activeSection === 'pillars' && (
              <span className="absolute bottom-0 left-1.5 right-1.5 h-0.5 bg-[#22D3EE] rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('products')}
            aria-current={activeSection === 'products' ? 'true' : undefined}
            className={`relative py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded px-1.5 cursor-pointer ${
              activeSection === 'products' ? 'text-[#22D3EE]' : 'text-neutral-300 hover:text-white'
            }`}
          >
            <span>Products</span>
            {activeSection === 'products' && (
              <span className="absolute bottom-0 left-1.5 right-1.5 h-0.5 bg-[#22D3EE] rounded-full" />
            )}
          </button>

          {/* Direct link to external live product: myinnerverse.in */}
          <a
            href={INNERVERSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('innerverse_cta_click', { source: 'navbar_desktop' })}
            className="relative py-1 text-neutral-300 hover:text-[#22D3EE] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded px-1.5 inline-flex items-center gap-1 cursor-pointer"
            aria-label="Innerverse live website (opens in new tab)"
          >
            <span>Innerverse</span>
            <ArrowUpRight className="w-3 h-3 text-[#22D3EE]" />
          </a>

          <button
            onClick={() => handleNavClick('founders')}
            aria-current={activeSection === 'founders' ? 'true' : undefined}
            className={`relative py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded px-1.5 cursor-pointer ${
              activeSection === 'founders' ? 'text-[#22D3EE]' : 'text-neutral-300 hover:text-white'
            }`}
          >
            <span>Team</span>
            {activeSection === 'founders' && (
              <span className="absolute bottom-0 left-1.5 right-1.5 h-0.5 bg-[#22D3EE] rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('roadmap')}
            aria-current={activeSection === 'roadmap' ? 'true' : undefined}
            className={`relative py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded px-1.5 cursor-pointer ${
              activeSection === 'roadmap' ? 'text-[#22D3EE]' : 'text-neutral-300 hover:text-white'
            }`}
          >
            <span>Roadmap</span>
            {activeSection === 'roadmap' && (
              <span className="absolute bottom-0 left-1.5 right-1.5 h-0.5 bg-[#22D3EE] rounded-full" />
            )}
          </button>
        </nav>

        {/* Zone 3: Primary action */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={handlePartnerClick}
            className="group relative inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wide uppercase rounded-lg border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <span>Invest / Partner</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Fullscreen Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[56px] sm:top-[65px] bg-[#080B14]/98 backdrop-blur-2xl z-40 md:hidden flex flex-col justify-between px-6 sm:px-8 py-6 sm:py-8 text-white overflow-y-auto max-h-[calc(100vh-56px)] animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-col gap-3 text-lg font-display">
            <button
              onClick={() => handleNavClick('mission')}
              className="text-left py-3 min-h-[48px] hover:text-[#22D3EE] transition-colors border-b border-white/10 flex items-center justify-between cursor-pointer"
            >
              <span>01. Mission</span>
              {activeSection === 'mission' && <span className="text-xs font-mono text-[#22D3EE]">●</span>}
            </button>
            <button
              onClick={() => handleNavClick('pillars')}
              className="text-left py-3 min-h-[48px] hover:text-[#22D3EE] transition-colors border-b border-white/10 flex items-center justify-between cursor-pointer"
            >
              <span>02. Key Pillars</span>
              {activeSection === 'pillars' && <span className="text-xs font-mono text-[#22D3EE]">●</span>}
            </button>
            <button
              onClick={() => handleNavClick('products')}
              className="text-left py-3 min-h-[48px] hover:text-[#22D3EE] transition-colors border-b border-white/10 flex items-center justify-between cursor-pointer"
            >
              <span>03. Products & Ecosystem</span>
              {activeSection === 'products' && <span className="text-xs font-mono text-[#22D3EE]">●</span>}
            </button>

            {/* Direct link to external live product: myinnerverse.in */}
            <a
              href={INNERVERSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setMobileMenuOpen(false);
                trackEvent('innerverse_cta_click', { source: 'navbar_mobile' });
              }}
              className="text-left py-3 min-h-[48px] text-[#22D3EE] hover:text-white transition-colors border-b border-white/10 pl-3 flex items-center justify-between"
              aria-label="Innerverse live website (opens in new tab)"
            >
              <span>↳ Innerverse (myinnerverse.in)</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => handleNavClick('founders')}
              className="text-left py-3 min-h-[48px] hover:text-[#22D3EE] transition-colors border-b border-white/10 flex items-center justify-between cursor-pointer"
            >
              <span>04. Founders & Team</span>
              {activeSection === 'founders' && <span className="text-xs font-mono text-[#22D3EE]">●</span>}
            </button>
            <button
              onClick={() => handleNavClick('roadmap')}
              className="text-left py-3 min-h-[48px] hover:text-[#22D3EE] transition-colors border-b border-white/10 flex items-center justify-between cursor-pointer"
            >
              <span>05. The Road Ahead</span>
              {activeSection === 'roadmap' && <span className="text-xs font-mono text-[#22D3EE]">●</span>}
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-3 min-h-[48px] hover:text-[#22D3EE] transition-colors border-b border-white/10 flex items-center justify-between cursor-pointer"
            >
              <span>06. Contact</span>
              {activeSection === 'contact' && <span className="text-xs font-mono text-[#22D3EE]">●</span>}
            </button>
          </div>

          <div className="pt-6 mt-4 border-t border-white/10">
            <button
              onClick={handlePartnerClick}
              className="w-full py-3.5 min-h-[48px] px-6 text-center text-sm font-semibold tracking-wider uppercase rounded-xl bg-white text-[#080B14] hover:bg-neutral-200 transition-colors shadow-lg shadow-white/10 cursor-pointer active:scale-[0.98]"
            >
              Invest / Partner
            </button>
            <p className="text-xs text-neutral-400 text-center mt-3 font-mono">
              Where ideas become epic.
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
