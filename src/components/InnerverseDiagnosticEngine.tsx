import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, RotateCcw, CheckCircle2, Sparkles } from 'lucide-react';
import { INNERVERSE_URL, trackEvent } from '../config/links';
import { innerversePathways, Pathway } from '../data/products';

interface QuestionOption {
  text: string;
  pathwayId: string;
}

interface Question {
  id: number;
  question: string;
  options: QuestionOption[];
}

const diagnosticQuestions: Question[] = [
  {
    id: 1,
    question: 'When you reflect on your typical week, where do you feel the sharpest friction?',
    options: [
      {
        text: 'I have endless tasks, but struggle to know which one truly matters most.',
        pathwayId: 'clarity',
      },
      {
        text: 'I know what I should do, but struggle with consistent execution rituals.',
        pathwayId: 'discipline',
      },
      {
        text: 'My calendar is full, but none of it feels deeply fulfilling or purpose-aligned.',
        pathwayId: 'purpose',
      },
    ],
  },
  {
    id: 2,
    question: 'When facing prolonged cognitive demands, what tends to deplete first?',
    options: [
      {
        text: 'Clarity on long-term strategy versus immediate noise and distractions.',
        pathwayId: 'clarity',
      },
      {
        text: 'Emotional endurance and inner reserves needed for reflection and patience.',
        pathwayId: 'healing',
      },
      {
        text: 'Congruence between my declared core values and daily commitments.',
        pathwayId: 'alignment',
      },
    ],
  },
  {
    id: 3,
    question: 'What would create the single highest breakthrough in your life right now?',
    options: [
      {
        text: 'Uncompromising alignment between my core values, energy, and calendar.',
        pathwayId: 'alignment',
      },
      {
        text: 'A clear, ruthless prioritization framework that filters out 80% of noise.',
        pathwayId: 'clarity',
      },
      {
        text: 'Deep reconnecting with my intrinsic motivations and lifelong purpose.',
        pathwayId: 'purpose',
      },
    ],
  },
];

interface InnerverseDiagnosticEngineProps {
  onSelectPathway?: (pathwayId: string) => void;
  className?: string;
}

export const InnerverseDiagnosticEngine: React.FC<InnerverseDiagnosticEngineProps> = ({
  onSelectPathway,
  className = '',
}) => {
  const [stage, setStage] = useState<'intro' | 'question' | 'result'>('intro');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [recommendedPathway, setRecommendedPathway] = useState<Pathway | null>(null);

  const startDiagnostic = () => {
    trackEvent('innerverse_diagnostic_start');
    setStage('question');
    setCurrentQuestionIdx(0);
    setAnswers([]);
    setRecommendedPathway(null);
  };

  const handleSelectOption = (pathwayId: string) => {
    const updatedAnswers = [...answers, pathwayId];
    setAnswers(updatedAnswers);

    if (currentQuestionIdx < diagnosticQuestions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      // Calculate most frequent pathway
      const counts: Record<string, number> = {};
      updatedAnswers.forEach((id) => {
        counts[id] = (counts[id] || 0) + 1;
      });
      let highestId = updatedAnswers[0];
      let highestCount = 0;
      Object.entries(counts).forEach(([id, count]) => {
        if (count > highestCount) {
          highestCount = count;
          highestId = id;
        }
      });

      const matchedPathway =
        innerversePathways.find((p) => p.id === highestId) || innerversePathways[0];
      setRecommendedPathway(matchedPathway);
      setStage('result');
      trackEvent('innerverse_diagnostic_complete', { pathway: matchedPathway.id });

      if (onSelectPathway) {
        onSelectPathway(matchedPathway.id);
      }
    }
  };

  const resetDiagnostic = () => {
    setStage('intro');
    setCurrentQuestionIdx(0);
    setAnswers([]);
    setRecommendedPathway(null);
  };

  const currentQ = diagnosticQuestions[currentQuestionIdx];
  const progressPercent = Math.round(((currentQuestionIdx + 1) / diagnosticQuestions.length) * 100);

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Header section matching Screenshot 1 & 2 */}
      <div className="text-center mb-8">
        <span className="font-mono text-xs font-semibold tracking-widest text-[#22D3EE] uppercase block mb-3">
          INTERACTIVE DIAGNOSTIC ENGINE
        </span>
        <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-3">
          Personalized Orientation Assessment
        </h3>
        <p className="text-neutral-300 text-sm sm:text-base font-light max-w-2xl mx-auto">
          Answer 3 baseline inquiries to pinpoint where you need the most clarity right now.
        </p>
      </div>

      {/* Main Assessment Container Card */}
      <div className="relative rounded-3xl p-6 sm:p-10 md:p-12 bg-[#0B0F1C]/90 border border-blue-500/20 backdrop-blur-xl shadow-2xl transition-all duration-300">
        {/* State 1: Intro / Calibration Prompt (Screenshot 1) */}
        {stage === 'intro' && (
          <div className="flex flex-col items-center text-center max-w-xl mx-auto py-4">
            {/* Concentric Circle Bullseye Icon in rounded container */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 shadow-lg shadow-blue-500/10">
              <svg
                className="w-9 h-9 sm:w-11 sm:h-11 text-blue-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
              </svg>
            </div>

            <h4 className="font-display text-2xl sm:text-3xl md:text-4xl font-normal text-white mb-4">
              Ready to calibrate your compass?
            </h4>

            <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed mb-8">
              This brief orientation evaluates your current cognitive friction and recommends your
              optimal starting pathway: Purpose, Clarity, Discipline, Alignment, or Healing.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <button
                onClick={startDiagnostic}
                className="w-full sm:w-auto px-8 py-3.5 min-h-[48px] rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm tracking-wide transition-all shadow-xl shadow-blue-600/20 inline-flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>Begin Diagnostic (Takes 1 Minute)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={INNERVERSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('innerverse_cta_click', { source: 'diagnostic_intro_live_link' })}
                className="text-xs font-mono text-blue-300 hover:text-white transition-colors inline-flex items-center gap-1 py-2"
                aria-label="Launch live original website on innervers.ai.studio (opens in new tab)"
              >
                <span>Or launch live on innervers.ai.studio</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* State 2: Questions (Screenshot 2) */}
        {stage === 'question' && currentQ && (
          <div className="py-2">
            {/* Inquiry indicator & progress */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10 text-xs font-mono">
              <span className="text-neutral-400">
                Inquiry 0{currentQ.id} of 0{diagnosticQuestions.length}
              </span>
              <span className="text-[#22D3EE] font-medium">{progressPercent}% Complete</span>
            </div>

            {/* Question title */}
            <h4 className="font-display text-2xl sm:text-3xl font-normal text-white mb-8 leading-snug">
              {currentQ.question}
            </h4>

            {/* Options list */}
            <div className="space-y-3.5 mb-8">
              {currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option.pathwayId)}
                  className="w-full text-left p-4 sm:p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-cyan-400/50 transition-all flex items-center justify-between gap-4 group cursor-pointer active:scale-[0.99]"
                >
                  <span className="text-sm sm:text-base text-neutral-200 group-hover:text-white font-light leading-relaxed">
                    {option.text}
                  </span>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1 shrink-0" />
                </button>
              ))}
            </div>

            {/* Live platform escape hatch */}
            <div className="flex items-center justify-between pt-4 text-xs font-mono text-neutral-400">
              <button
                onClick={resetDiagnostic}
                className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>

              <a
                href={INNERVERSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('innerverse_cta_click', { source: 'diagnostic_question_skip' })}
                className="text-cyan-400 hover:underline inline-flex items-center gap-1"
              >
                <span>Continue on live innervers.ai.studio ↗</span>
              </a>
            </div>
          </div>
        )}

        {/* State 3: Diagnostic Results */}
        {stage === 'result' && recommendedPathway && (
          <div className="py-2 text-center max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[#22D3EE] font-mono text-xs uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Assessment Calibration Complete</span>
            </div>

            <h4 className="font-display text-3xl sm:text-4xl text-white font-normal mb-3">
              Your Recommended Pathway:{' '}
              <span style={{ color: recommendedPathway.accentColor }}>
                {recommendedPathway.name}
              </span>
            </h4>

            <p className="font-display italic text-lg sm:text-xl text-neutral-300 font-light mb-4">
              “{recommendedPathway.tagline}”
            </p>

            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed mb-8">
              {recommendedPathway.description}
            </p>

            {/* Next Steps: Live Launch on innervers.ai.studio */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 mb-8 text-left space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Next Action on Live Platform</span>
              </div>
              <p className="text-sm text-neutral-200 font-light">
                Launch the live Innerverse platform at <strong className="text-white">innervers.ai.studio</strong> to save this profile, activate your weekly prompts, and start your guided rituals.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={INNERVERSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('innerverse_cta_click', { source: 'diagnostic_result_live_button' })}
                className="w-full sm:w-auto px-7 py-3.5 min-h-[48px] rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm tracking-wide transition-all shadow-xl shadow-blue-600/20 inline-flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                aria-label="Launch Full Experience on innervers.ai.studio (opens in new tab)"
              >
                <span>Launch Live on innervers.ai.studio ↗</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={resetDiagnostic}
                className="w-full sm:w-auto px-6 py-3.5 min-h-[48px] rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white font-medium text-sm tracking-wide transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Orientation</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
