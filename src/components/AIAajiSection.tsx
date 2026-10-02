import React, { useState } from 'react';
import { Bot, Mic, Monitor, Workflow, Mail, FileText, Globe2, Sparkles, WifiOff, Bell, Check, Clock, Layers } from 'lucide-react';

interface AIAajiSectionProps {
  onJoinWaitlist: () => void;
}

export const AIAajiSection: React.FC<AIAajiSectionProps> = ({ onJoinWaitlist }) => {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [capabilityTab, setCapabilityTab] = useState<'architecture' | 'planned'>('architecture');

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail || !waitlistEmail.includes('@')) return;
    setWaitlistSubmitted(true);
  };

  const coreArchitectureFeatures = [
    {
      title: 'Contextual Voice Dialogue',
      description: 'Hands-free conversational model tailored for personal problem-solving and immediate task dictation.',
      status: 'In Architecture',
      icon: <Mic className="w-4 h-4 text-cyan-400" />
    },
    {
      title: 'Email & Communication Synthesis',
      description: 'Synthesizes lengthy threads, drafts nuanced replies matching personal tone, and triages inbound requests.',
      status: 'In Architecture',
      icon: <Mail className="w-4 h-4 text-cyan-400" />
    },
    {
      title: 'Verified Form & Document Retrieval',
      description: 'Secure personal knowledge retrieval that accurately populates repetitive documents without human friction.',
      status: 'In Architecture',
      icon: <FileText className="w-4 h-4 text-cyan-400" />
    },
    {
      title: 'Offline Privacy Guard',
      description: 'Sovereign on-device engine ensuring personal introspection and confidential actions never leave the device.',
      status: 'In Architecture',
      icon: <WifiOff className="w-4 h-4 text-cyan-400" />
    },
  ];

  const plannedFutureFeatures = [
    {
      title: 'Full Computer OS Control',
      description: 'Direct desktop interactions and system events executing repetitive multi-step actions safely.',
      status: 'Coming Soon · 2027/2028',
      icon: <Monitor className="w-4 h-4 text-purple-400" />
    },
    {
      title: 'Multi-App Workflow Automation',
      description: 'Connecting calendar, documents, repositories, and communication channels into proactive automated pipelines.',
      status: 'Coming Soon · 2027/2028',
      icon: <Workflow className="w-4 h-4 text-purple-400" />
    },
    {
      title: 'Universal Multilingual Dialogue',
      description: 'Live bidirectional speech translation and vernacular interaction across global cultural nuances.',
      status: 'Coming Soon · 2027/2028',
      icon: <Globe2 className="w-4 h-4 text-purple-400" />
    },
    {
      title: 'Adaptive Generative Synthesis',
      description: 'Autonomous concept visualization, user interface prototyping, and generative presentation drafting.',
      status: 'Coming Soon · 2027/2028',
      icon: <Sparkles className="w-4 h-4 text-purple-400" />
    },
  ];

  return (
    <section
      id="ai-aaji"
      className="relative py-28 md:py-36 bg-[#070C1A] text-white border-t border-cyan-900/30 overflow-hidden"
    >
      {/* Cyan & Electric Blue Ambient Glows */}
      <div
        className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs font-semibold tracking-widest text-[#22D3EE] uppercase">
              05 / INTELLIGENCE COMPANION
            </span>
            <span className="h-px w-10 bg-[#22D3EE]/40" />
            <span className="text-xs font-mono text-cyan-300">AI AAJI</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal leading-tight text-white mb-6">
            AI AAJI <br />
            <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-sky-300">
              Your Smart Digital Companion.
            </span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed">
            AI Aaji begins as a voice-powered assistant, but it is more than automation. It is designed as a scalable intelligence system for productivity, personalization, and everyday efficiency.
          </p>
        </div>

        {/* Feature Grid & Visual Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Human + AI Connection Graphic & Waitlist */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-[#0B132B]/80 border border-cyan-500/20 shadow-2xl relative overflow-hidden">
            {/* Luminous Ring & Connection Motif */}
            <div className="relative w-full aspect-square max-h-[320px] rounded-2xl bg-gradient-to-b from-[#0F1E36] to-[#080E1C] border border-cyan-400/20 flex items-center justify-center p-6 overflow-hidden mb-8">
              {/* Concentric Glow Rings */}
              <div className="absolute w-64 h-64 rounded-full border border-cyan-500/20 animate-pulse" />
              <div className="absolute w-44 h-44 rounded-full border border-cyan-400/30" />
              <div className="absolute w-28 h-28 rounded-full bg-cyan-500/10 blur-xl" />

              {/* Hand to Hand / Human + Intelligence Silhouette Graphic */}
              <div className="relative z-10 flex items-center justify-between w-full max-w-[260px]">
                {/* Human side */}
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-neutral-800 border border-white/20 flex items-center justify-center text-white mb-2 shadow-lg">
                    <span className="font-display italic text-lg">Human</span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Agency</span>
                </div>

                {/* Connection Arc */}
                <div className="flex-1 px-3 flex flex-col items-center">
                  <div className="w-full h-px bg-gradient-to-r from-white/40 via-cyan-400 to-cyan-500" />
                  <span className="text-[10px] font-mono text-cyan-300 mt-1 uppercase tracking-widest">
                    Synthesized
                  </span>
                </div>

                {/* AI Aaji Intelligence side */}
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-cyan-950 border border-cyan-400/40 flex items-center justify-center text-cyan-300 mb-2 shadow-lg shadow-cyan-500/20">
                    <Bot className="w-6 h-6 text-cyan-300" />
                  </div>
                  <span className="text-[11px] font-mono text-cyan-300 uppercase tracking-wider">Leverage</span>
                </div>
              </div>
            </div>

            {/* Launch Status & Waitlist Lead Capture */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span className="font-mono text-xs text-amber-300 uppercase tracking-wider font-semibold">
                  Status: In Architecture (Target Roadmap: 2027)
                </span>
              </div>
              <p className="text-sm text-neutral-300 font-light mb-6">
                AI Aaji is actively being engineered as the second major node of EpicForce.ai. Join early notifications for closed technical briefings.
              </p>

              {waitlistSubmitted ? (
                <div className="p-4 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-200 text-sm flex items-center gap-3">
                  <Check className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span>You are registered for AI Aaji architectural updates.</span>
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    placeholder="Enter email for technical briefings"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-cyan-400 font-sans"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>Notify Me</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Transparent Capabilities Segmentation (Audit 18) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Capability Stage Selector */}
            <div className="flex items-center p-1 rounded-2xl bg-white/5 border border-white/10 self-start">
              <button
                onClick={() => setCapabilityTab('architecture')}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  capabilityTab === 'architecture'
                    ? 'bg-cyan-500 text-neutral-950 font-semibold shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Core Architecture (Phase 1)
              </button>
              <button
                onClick={() => setCapabilityTab('planned')}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  capabilityTab === 'planned'
                    ? 'bg-purple-500 text-white font-semibold shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Planned Ecosystem (Coming Soon)
              </button>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {capabilityTab === 'architecture' ? (
                coreArchitectureFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/[0.03] border border-cyan-500/20 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/30">
                          {feature.icon}
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                          {feature.status}
                        </span>
                      </div>
                      <h3 className="text-base font-medium text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-neutral-300 font-light leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                plannedFutureFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-purple-500/20 hover:border-purple-500/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="p-2 rounded-xl bg-purple-950/80 border border-purple-500/30">
                          {feature.icon}
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          {feature.status}
                        </span>
                      </div>
                      <h3 className="text-base font-medium text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-neutral-300 font-light leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-neutral-400 font-mono flex items-center justify-between">
              <span>Sovereign Privacy Guard Enabled</span>
              <span className="text-cyan-400">Zero Third-Party Training Invariant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
