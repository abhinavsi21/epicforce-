import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ContactForm } from '../components/ContactForm';
import { Footer } from '../components/Footer';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#060914] text-white">
      {/* Top Bar */}
      <nav className="border-b border-white/10 bg-[#060914]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to EpicForce.ai</span>
          </Link>
          <span className="font-display font-bold text-lg tracking-tight">
            PARTNERSHIP & INQUIRIES
          </span>
        </div>
      </nav>

      <main>
        <ContactForm initialReason="Investment / Partnership" />
      </main>

      <Footer />
    </div>
  );
};
