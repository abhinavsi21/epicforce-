import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  X,
  Send,
  RotateCcw,
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Bot,
} from 'lucide-react';
import { AIGuideController } from '../../ai-guide/controller';
import { ActionDefinition, AIGuideResponse, NamedEntity, UserIntent } from '../../ai-guide/types';
import { executeAction } from '../../ai-guide/actions/actionEngine';
import { sectionSuggestedQuestions } from '../../data/chatbotKnowledge';
import { trackEvent } from '../../config/links';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  actions?: ActionDefinition[];
  suggestedFollowUps?: string[];
  source?: 'faq' | 'knowledge' | 'ai_engine' | 'fallback' | 'security';
  timestamp: number;
}

export const EpicForceChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<string>('hero');
  const [hasUnread, setHasUnread] = useState<boolean>(true);

  // Client-side instance of the Master Controller for instant offline / local reasoning
  const controllerRef = useRef<AIGuideController>(new AIGuideController());

  // Conversation turns state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: "Hi! I'm the EpicForce AI Guide.\n\nI can help you explore EpicForce.ai, understand our flagship Life Navigation System Innerverse, learn about AI Aaji, view our roadmap, or navigate directly across the website.\n\nWhat would you like to explore?",
      actions: [
        {
          type: 'GO_PRODUCTS',
          label: 'Explore Products',
          category: 'navigation',
          target: 'products',
        },
        {
          type: 'GO_INNERVERSE',
          label: 'Explore Innerverse',
          category: 'navigation',
          target: 'innerverse',
        },
        {
          type: 'GO_INSIGHTS',
          label: 'Explore Insights & Papers',
          category: 'navigation',
          target: 'insights',
        },
        {
          type: 'GO_ROADMAP',
          label: 'View Roadmap',
          category: 'navigation',
          target: 'roadmap',
        },
      ],
      suggestedFollowUps: [
        'What is EpicForce.ai?',
        'What is Innerverse?',
        'Read Thought Leadership',
        'View Roadmap',
      ],
      source: 'faq',
      timestamp: Date.now(),
    },
  ]);

  const [historyContext, setHistoryContext] = useState<
    { role: 'user' | 'assistant'; text: string; intent?: UserIntent; entity?: NamedEntity }[]
  >([]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const launcherRef = useRef<HTMLButtonElement | null>(null);

  // Observer for active on-screen section to supply dynamic contextual awareness
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'hero',
        'mission',
        'pillars',
        'founders',
        'products',
        'innerverse',
        'ai-aaji',
        'insights',
        'why-epicforce',
        'roadmap',
        'partners',
        'contact',
      ];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 280 && rect.bottom >= 140) {
            setCurrentSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll chat container on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Accessibility: focus input when opening, return focus to launcher when closing
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 150);
      trackEvent('chatbot_opened');
    } else {
      launcherRef.current?.focus();
    }
  }, [isOpen]);

  // Keyboard accessibility: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Execute validated action through controlled Action Engine
  const handleExecuteAction = (action: ActionDefinition) => {
    trackEvent('chatbot_action_clicked', { target: action.target, type: action.type });
    executeAction(action, (targetId) => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      // On narrow mobile devices, close dialog so user views the target section
      if (window.innerWidth < 640) {
        setIsOpen(false);
      }
    });
  };

  const handleSendMessage = async (rawQuery?: string) => {
    const query = (rawQuery || input).trim();
    if (!query || isLoading) return;

    setInput('');

    // Append user message immediately
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    const updatedHistory = [
      ...historyContext,
      { role: 'user' as const, text: query },
    ];

    try {
      // Step A: Call Server-Side Architecture Endpoint (/api/ai-guide/chat)
      let guideResponse: AIGuideResponse | null = null;

      try {
        const res = await fetch('/api/ai-guide/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: query,
            currentSection,
            currentRoute: window.location.pathname,
            history: updatedHistory,
          }),
        });

        if (res.ok) {
          guideResponse = await res.json();
        }
      } catch (networkErr) {
        console.warn('[AI Guide] Server endpoint unreachable, using client controller fallback:', networkErr);
      }

      // Step B: Client-side Controller Fallback if network failed or server returned non-200
      if (!guideResponse || !guideResponse.message) {
        guideResponse = await controllerRef.current.processMessage({
          message: query,
          context: {
            currentSection,
            currentRoute: window.location.pathname,
            history: updatedHistory,
          },
        });
      }

      // Append assistant message
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: guideResponse.message,
        actions: guideResponse.actions,
        suggestedFollowUps: guideResponse.suggestedFollowUps,
        source: guideResponse.source,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsLoading(false);

      setHistoryContext([
        ...updatedHistory,
        {
          role: 'assistant',
          text: guideResponse.message,
          intent: guideResponse.intent,
          entity: guideResponse.entities?.[0],
        },
      ]);
    } catch (criticalErr) {
      console.error('[AI Guide] Critical fallback handler triggered:', criticalErr);
      const fallbackMsg: ChatMessage = {
        id: `bot-fallback-${Date.now()}`,
        sender: 'bot',
        text: "I am having trouble connecting to my advanced reasoning system right now, but I can still help you explore EpicForce.ai's products, roadmap, and mission.",
        actions: [
          {
            type: 'GO_PRODUCTS',
            label: 'Explore Products',
            category: 'navigation',
            target: 'products',
          },
          {
            type: 'GO_ROADMAP',
            label: 'View Roadmap',
            category: 'navigation',
            target: 'roadmap',
          },
        ],
        suggestedFollowUps: ['What is EpicForce.ai?', 'What is Innerverse?', 'Contact EpicForce'],
        source: 'fallback',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      setIsLoading(false);
    }
  };

  const handleClearSession = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: "Conversation reset. I'm ready to help you explore EpicForce.ai, Innerverse, AI Aaji, our leadership, or strategic roadmap. What would you like to know?",
        actions: [
          {
            type: 'GO_INNERVERSE',
            label: 'Explore Innerverse',
            category: 'navigation',
            target: 'innerverse',
          },
          {
            type: 'GO_TEAM',
            label: 'Meet the Team',
            category: 'navigation',
            target: 'founders',
          },
        ],
        suggestedFollowUps: [
          'What is EpicForce.ai?',
          'What is Innerverse?',
          'What is AI Aaji?',
          'View Roadmap',
        ],
        source: 'faq',
        timestamp: Date.now(),
      },
    ]);
    setHistoryContext([]);
  };

  // Section-driven dynamic suggested question chips
  const dynamicSuggestions =
    sectionSuggestedQuestions[currentSection] || sectionSuggestedQuestions['default'];

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Tooltip trigger on desktop */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#080B14]/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-xl backdrop-blur-md hover:border-cyan-400 transition-all cursor-pointer group"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span>Ask EpicForce AI</span>
          </button>
        )}

        <button
          ref={launcherRef}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close EpicForce AI Guide' : 'Ask EpicForce AI Guide'}
          aria-expanded={isOpen}
          className="group relative w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 text-white shadow-2xl flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 border border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          {/* Subtle glowing halo ring */}
          <span className="absolute -inset-1 rounded-full bg-cyan-500/25 blur-md -z-10 group-hover:bg-cyan-500/40 transition-colors" />

          {/* Unread indicator dot */}
          {hasUnread && !isOpen && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-amber-400 border-2 border-[#060814] rounded-full animate-bounce" />
          )}

          {isOpen ? (
            <X className="w-6 h-6 transition-transform duration-200 group-hover:rotate-90" />
          ) : (
            <Sparkles className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
          )}
        </button>
      </div>

      {/* Floating Chat Panel Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="EpicForce AI Guide Chatbot"
          className="fixed bottom-24 right-3 sm:right-6 z-50 w-[calc(100vw-24px)] sm:w-[410px] h-[580px] max-h-[calc(100vh-120px)] rounded-3xl bg-[#080B16]/95 border border-white/15 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden text-white animate-in fade-in slide-in-from-bottom-6 duration-200"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Sparkles className="w-4 h-4" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#080B16]" />
              </div>

              <div>
                <h3 className="font-display font-medium text-base text-white leading-tight flex items-center gap-1.5">
                  <span>EpicForce AI Guide</span>
                </h3>
                <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400">
                  <span className="text-emerald-400 font-semibold">● Online</span>
                  <span>·</span>
                  <span className="truncate max-w-[150px]">Viewing {currentSection}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearSession}
                title="Reset conversation"
                className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Clear chat session"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Action Navigation Bar (Requirement 27) */}
          <div className="px-4 py-2 border-b border-white/5 bg-white/[0.01] flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-mono text-neutral-300">
            <span className="text-neutral-500 text-[10px] uppercase tracking-wider shrink-0">
              Quick:
            </span>
            <button
              onClick={() =>
                handleExecuteAction({
                  type: 'GO_PRODUCTS',
                  label: 'Ecosystem',
                  category: 'navigation',
                  target: 'products',
                })
              }
              className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 hover:text-white transition-colors shrink-0 cursor-pointer"
            >
              Ecosystem
            </button>
            <button
              onClick={() =>
                handleExecuteAction({
                  type: 'GO_INNERVERSE',
                  label: 'Innerverse',
                  category: 'navigation',
                  target: 'innerverse',
                })
              }
              className="px-2.5 py-1 rounded-md bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 hover:text-white border border-blue-500/20 transition-colors shrink-0 cursor-pointer"
            >
              Innerverse
            </button>
            <button
              onClick={() =>
                handleExecuteAction({
                  type: 'GO_AI_AAJI',
                  label: 'AI Aaji',
                  category: 'navigation',
                  target: 'ai-aaji',
                })
              }
              className="px-2.5 py-1 rounded-md bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 hover:text-white border border-cyan-500/20 transition-colors shrink-0 cursor-pointer"
            >
              AI Aaji
            </button>
            <button
              onClick={() =>
                handleExecuteAction({
                  type: 'GO_INSIGHTS',
                  label: 'Insights',
                  category: 'navigation',
                  target: 'insights',
                })
              }
              className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 hover:text-white transition-colors shrink-0 cursor-pointer"
            >
              Insights
            </button>
            <button
              onClick={() =>
                handleExecuteAction({
                  type: 'GO_ROADMAP',
                  label: 'Roadmap',
                  category: 'navigation',
                  target: 'roadmap',
                })
              }
              className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 hover:text-white transition-colors shrink-0 cursor-pointer"
            >
              Roadmap
            </button>
            <button
              onClick={() =>
                handleExecuteAction({
                  type: 'GO_TEAM',
                  label: 'Team',
                  category: 'navigation',
                  target: 'founders',
                })
              }
              className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 hover:text-white transition-colors shrink-0 cursor-pointer"
            >
              Team
            </button>
            <button
              onClick={() =>
                handleExecuteAction({
                  type: 'GO_CONTACT',
                  label: 'Contact',
                  category: 'navigation',
                  target: 'contact',
                })
              }
              className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 hover:text-white transition-colors shrink-0 cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Messages Stream Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl p-3.5 text-sm leading-relaxed ${
                      isUser
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none shadow-md shadow-blue-500/10 font-normal'
                        : 'bg-white/[0.04] border border-white/10 text-neutral-200 rounded-tl-none font-light shadow-lg'
                    }`}
                  >
                    {/* Message text with clean line break handling */}
                    <div className="whitespace-pre-line space-y-1.5">{msg.text}</div>

                    {/* Controlled Action Buttons (Scroll & Allowlisted External Links) */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-2">
                        {msg.actions.map((act, idx) => {
                          const isExternal = act.category === 'external' || act.isExternal;
                          if (isExternal) {
                            return (
                              <a
                                key={idx}
                                href={act.target}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() =>
                                  trackEvent('chatbot_action_clicked', { target: act.target, type: act.type })
                                }
                                className="px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all inline-flex items-center gap-1.5 cursor-pointer active:scale-[0.98] bg-amber-400 hover:bg-amber-300 text-[#070913] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                              >
                                <span>{act.label}</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </a>
                            );
                          }
                          return (
                            <button
                              key={idx}
                              onClick={() => handleExecuteAction(act)}
                              className="px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all inline-flex items-center gap-1.5 cursor-pointer active:scale-[0.98] bg-white/10 hover:bg-white/20 text-white border border-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                            >
                              <span>{act.label}</span>
                              <ArrowRight className="w-3 h-3 text-cyan-300" />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Suggested Follow-up chips below bot message */}
                  {!isUser && msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 ml-1">
                      {msg.suggestedFollowUps.map((promptText, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() => handleSendMessage(promptText)}
                          className="px-2.5 py-1 rounded-full bg-white/[0.03] hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 text-[11px] font-mono text-neutral-300 hover:text-white transition-colors cursor-pointer text-left"
                        >
                          {promptText}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Thinking / Typing Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 max-w-[200px] text-xs font-mono text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse delay-75" />
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse delay-150" />
                <span className="ml-1 text-[11px] text-neutral-400">Reasoning...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Dynamic Suggested Questions Tray (based on current section) */}
          <div className="px-4 py-2 border-t border-white/5 bg-white/[0.01]">
            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
              <span>Suggested for {currentSection}:</span>
            </div>
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {dynamicSuggestions.slice(0, 3).map((suggestion, sIdx) => (
                <button
                  key={sIdx}
                  onClick={() => handleSendMessage(suggestion)}
                  className="px-2.5 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-[11px] text-neutral-300 hover:text-white whitespace-nowrap transition-colors shrink-0 cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box & Send Button */}
          <div className="p-3 sm:p-4 border-t border-white/10 bg-black/40">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about EpicForce, Innerverse, Roadmap..."
                className="flex-1 bg-white/[0.04] border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message to EpicForce AI Guide"
                className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:hover:bg-blue-600 text-white transition-colors cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
