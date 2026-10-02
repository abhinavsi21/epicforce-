import React, { useState, useEffect } from 'react';
import { submitContactInquiry, isSupabaseConfigured } from '../lib/supabase';
import { ContactReason } from '../types';
import { Send, CheckCircle2, AlertCircle, Loader2, Lock, Mail, Instagram, ArrowUpRight } from 'lucide-react';
import { CONTACT_EMAIL, INSTAGRAM_URL, trackEvent } from '../config/links';

interface ContactFormProps {
  initialReason?: ContactReason;
}

const contactReasons: ContactReason[] = [
  'Investment / Partnership',
  'Product Collaboration',
  'Technology',
  'Community',
  'Media',
  'General Inquiry',
];

export const ContactForm: React.FC<ContactFormProps> = ({
  initialReason = 'General Inquiry',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    reason: initialReason,
    message: '',
    honeypot: '', // Hidden honeypot field for bot spam prevention (Audit 24)
  });

  useEffect(() => {
    if (initialReason) {
      setFormData((prev) => ({ ...prev, reason: initialReason }));
    }
  }, [initialReason]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Please provide your full name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid corporate or personal email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide details in your message';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 1500) {
      newErrors.message = 'Message must be under 1,500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Honeypot bot trap: silently succeed without storing bot spam
    if (formData.honeypot) {
      setIsSubmitting(true);
      await new Promise((r) => setTimeout(r, 600));
      setIsSubmitting(false);
      setIsSuccess(true);
      setSubmissionId('EF-SPAM-FILTERED');
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const result = await submitContactInquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        organization: formData.organization.trim() || undefined,
        reason: formData.reason,
        message: formData.message.trim(),
      });

      if (result.success) {
        setIsSuccess(true);
        setSubmissionId(result.id);
        trackEvent('contact_form_submit', { reason: formData.reason });
      } else {
        setServerError(result.error || 'Failed to transmit inquiry. Please try again.');
      }
    } catch (err) {
      setServerError('An unexpected network error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setSubmissionId(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      organization: '',
      reason: 'General Inquiry',
      message: '',
      honeypot: '',
    });
    setErrors({});
  };

  return (
    <section
      id="contact"
      className="relative py-28 md:py-36 bg-[#060914] text-white border-t border-white/10 overflow-hidden"
    >
      {/* Background ambient mesh */}
      <div
        className="absolute top-1/2 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Context & Intent */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-semibold tracking-widest text-[#22D3EE] uppercase">
                07 / CONTACT & PARTNERSHIP
              </span>
              <span className="h-px w-10 bg-[#22D3EE]/40" />
              <span className="text-xs font-mono text-neutral-400">Direct Inquiries</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.08] text-white mb-6">
              LET'S BUILD <br />
              <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-sky-300">
                SOMETHING EPIC.
              </span>
            </h2>

            <p className="text-lg text-neutral-300 font-light leading-relaxed mb-8">
              Whether you're interested in partnering, investing, collaborating on products, or simply learning more about our roadmap, we'd love to hear from you.
            </p>

            <div className="space-y-5 pt-6 border-t border-white/10 text-sm text-neutral-300 font-light">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 block mb-1">
                  Official Contact Email
                </span>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  onClick={() => trackEvent('email_click', { source: 'contact_section_main' })}
                  className="text-[#22D3EE] font-mono text-sm hover:underline inline-flex items-center gap-2 group"
                  aria-label="Email EpicForce.ai at nsh.aimac@gmail.com"
                >
                  <Mail className="w-4 h-4 text-[#22D3EE]" />
                  <span>{CONTACT_EMAIL}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <div className="mt-1">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    onClick={() => trackEvent('email_click', { source: 'contact_section_cta' })}
                    className="text-xs text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    <span>Email Us →</span>
                  </a>
                </div>
              </div>

              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 block mb-1">
                  Instagram
                </span>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('instagram_click', { source: 'contact_section' })}
                  className="text-pink-400 font-mono text-sm hover:underline inline-flex items-center gap-2 group"
                  aria-label="EpicForce.ai on Instagram"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>@epicforce.ai</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 block mb-1">
                  Headquarters & Global Presence
                </span>
                <p className="text-white font-medium">United States · India · Global</p>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs text-neutral-400 font-mono">
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>
                  {isSupabaseConfigured
                    ? 'Verified cloud transmission active'
                    : 'Encrypted local session store active (cloud ready)'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Interactive Form / Success Panel */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-8 md:p-12 rounded-3xl bg-[#0B1020]/90 border border-white/10 shadow-2xl backdrop-blur-xl">
              {isSuccess ? (
                /* Success State (Audit 23) */
                <div className="text-center py-10 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
                    Transmission Verified
                  </span>

                  <h3 className="font-display text-3xl sm:text-4xl font-normal text-white mb-4">
                    THANK YOU.
                  </h3>

                  <p className="text-neutral-300 max-w-md mx-auto text-base font-light leading-relaxed mb-4">
                    Your message has been received. Our founding team reviews every inquiry personally and will be in touch soon.
                  </p>

                  {submissionId && (
                    <div className="inline-block px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 mb-8">
                      Reference ID: {submissionId}
                    </div>
                  )}

                  <div>
                    <button
                      onClick={handleReset}
                      className="px-8 py-3.5 rounded-xl bg-white text-[#0B1020] hover:bg-neutral-200 font-medium text-sm transition-colors cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* Form State */
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Honeypot Spam Trap (Audit 24) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website_guard">Leave this empty</label>
                    <input
                      id="website_guard"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    />
                  </div>

                  {serverError && (
                    <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-sm flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2"
                      >
                        Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        placeholder="Alex Morgan"
                        className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-white text-sm focus:outline-none transition-colors ${
                          errors.name
                            ? 'border-rose-500 focus:border-rose-400'
                            : 'border-white/15 focus:border-cyan-400'
                        }`}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'error-name' : undefined}
                      />
                      {errors.name && (
                        <p id="error-name" className="text-xs text-rose-400 mt-1.5 font-sans">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2"
                      >
                        Email Address <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        placeholder="alex@organization.com"
                        className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-white text-sm focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-rose-500 focus:border-rose-400'
                            : 'border-white/15 focus:border-cyan-400'
                        }`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'error-email' : undefined}
                      />
                      {errors.email && (
                        <p id="error-email" className="text-xs text-rose-400 mt-1.5 font-sans">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Organization */}
                    <div>
                      <label
                        htmlFor="contact-organization"
                        className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2"
                      >
                        Organization / Fund
                      </label>
                      <input
                        id="contact-organization"
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="Studio, Fund, or Entity"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-cyan-400 text-white text-sm focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2"
                      >
                        Phone Number <span className="text-neutral-500 font-sans text-[11px]">(Optional)</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 012-3456"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-cyan-400 text-white text-sm focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Reason for Contact */}
                  <div>
                    <label
                      htmlFor="contact-reason"
                      className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2"
                    >
                      Reason for Contact <span className="text-rose-400">*</span>
                    </label>
                    <select
                      id="contact-reason"
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value as ContactReason })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0E1528] border border-white/15 focus:border-cyan-400 text-white text-sm focus:outline-none transition-colors cursor-pointer"
                    >
                      {contactReasons.map((reason) => (
                        <option key={reason} value={reason} className="bg-[#0B1020] text-white">
                          {reason}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message with Character Counter (Audit 23) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="contact-message"
                        className="text-xs font-mono uppercase tracking-wider text-neutral-300"
                      >
                        Message <span className="text-rose-400">*</span>
                      </label>
                      <span
                        className={`text-xs font-mono ${
                          formData.message.length > 1400
                            ? 'text-rose-400'
                            : formData.message.length > 1000
                            ? 'text-amber-400'
                            : 'text-neutral-400'
                        }`}
                      >
                        {formData.message.length} / 1,500
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      placeholder="Tell us about your background, thesis alignment, or the collaboration you envision..."
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-white text-sm focus:outline-none transition-colors resize-y ${
                        errors.message
                          ? 'border-rose-500 focus:border-rose-400'
                          : 'border-white/15 focus:border-cyan-400'
                      }`}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'error-message' : undefined}
                    />
                    {errors.message && (
                      <p id="error-message" className="text-xs text-rose-400 mt-1.5 font-sans">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-8 rounded-xl bg-white text-[#080B14] hover:bg-neutral-100 disabled:opacity-50 font-medium text-sm tracking-wide transition-all shadow-xl shadow-blue-500/10 inline-flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-neutral-800" />
                          <span>Transmitting Inquiries...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
