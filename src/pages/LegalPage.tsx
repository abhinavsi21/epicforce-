import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Shield, FileCheck } from 'lucide-react';
import { Footer } from '../components/Footer';
import { CONTACT_EMAIL } from '../config/links';

export const LegalPage: React.FC = () => {
  const location = useLocation();
  const isTerms = location.pathname.includes('terms');

  return (
    <div className="min-h-screen bg-[#060814] text-white">
      <nav className="border-b border-white/10 bg-[#060814]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to EpicForce.ai</span>
          </Link>
          <div className="flex items-center gap-4 text-xs font-mono">
            <Link
              to="/privacy"
              className={`hover:text-white transition-colors ${!isTerms ? 'font-bold text-white border-b border-[#22D3EE]' : 'text-neutral-400'}`}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className={`hover:text-white transition-colors ${isTerms ? 'font-bold text-white border-b border-[#22D3EE]' : 'text-neutral-400'}`}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-12 pb-8 border-b border-white/10">
          <div className="flex items-center gap-2 mb-3">
            {isTerms ? (
              <FileCheck className="w-5 h-5 text-[#22D3EE]" />
            ) : (
              <Shield className="w-5 h-5 text-[#22D3EE]" />
            )}
            <span className="font-mono text-xs uppercase tracking-widest text-[#22D3EE]">
              Legal Documentation · Updated 2026
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-normal text-white">
            {isTerms ? 'Terms of Service' : 'Privacy Policy & Data Sovereignty'}
          </h1>
        </div>

        <article className="prose prose-invert max-w-none text-neutral-300 space-y-8 font-light text-base leading-relaxed">
          {isTerms ? (
            <>
              <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <h2 className="font-display text-2xl font-medium text-white mb-3">
                  01. Agreement to Terms
                </h2>
                <p>
                  By accessing or engaging with the digital ecosystem, tools, and preliminary previews offered by EpicForce.ai ("EpicForce", "we", "us", or "our"), you agree to abide by these Terms of Service. If you disagree with any portion of these terms, please discontinue interaction with our web platforms.
                </p>
              </section>

              <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <h2 className="font-display text-2xl font-medium text-white mb-3">
                  02. Purpose and Preview Status
                </h2>
                <p>
                  EpicForce.ai designs technology intended to amplify human clarity and intentional action. Products presented as preview, alpha, waitlist, or beta releases (including Innerverse and AI Aaji) are subject to iterative development and architectural refinement. No warranties of constant uninterrupted availability are made for early development releases.
                </p>
              </section>

              <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <h2 className="font-display text-2xl font-medium text-white mb-3">
                  03. Intellectual Property
                </h2>
                <p>
                  All proprietary algorithms, brand identity, visual architectures, design systems, and published research remain the exclusive intellectual property of EpicForce.ai.
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <h2 className="font-display text-2xl font-medium text-white mb-3">
                  01. Sovereign Data Ethics
                </h2>
                <p>
                  At EpicForce.ai, we believe your personal reflections, clarity diagnostics, and life navigation telemetry belong strictly to you. We do not sell personal data, license user introspection data to third-party ad networks, or compromise user trust for short-term monetization.
                </p>
              </section>

              <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <h2 className="font-display text-2xl font-medium text-white mb-3">
                  02. Information We Collect
                </h2>
                <p>
                  We only gather information explicitly provided by you through our contact and partnership forms (such as name, organization, email, and stated reason for contact), as well as anonymous client-side telemetry required to maintain performant user sessions.
                </p>
              </section>

              <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <h2 className="font-display text-2xl font-medium text-white mb-3">
                  03. Secure Architecture
                </h2>
                <p>
                  Inquiries transmitted to EpicForce.ai are routed through encrypted transport layer protocols (HTTPS/TLS) and handled by audited cloud databases with row-level security policies.
                </p>
              </section>

              <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <h2 className="font-display text-2xl font-medium text-white mb-3">
                  04. Privacy Inquiries
                </h2>
                <p>
                  For privacy requests, data deletion inquiries, or sovereign standard verification, contact our administrative team at{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#22D3EE] hover:underline">
                    {CONTACT_EMAIL}
                  </a>.
                </p>
              </section>
            </>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
};
