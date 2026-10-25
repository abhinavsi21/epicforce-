import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, PhoneOff, ArrowUpRight, ShieldCheck, Sparkles, Volume2, AlertCircle, CheckCircle2, CornerDownLeft, Send } from 'lucide-react';
import { AI_AAJI_URL, trackEvent } from '../config/links';
import {
  floatTo16BitPCM,
  pcm16ToFloat32,
  arrayBufferToBase64,
  base64ToArrayBuffer,
  calculateRMS,
} from '../services/liveAudioService';

type ConnectionState = 'idle' | 'connecting' | 'listening' | 'processing' | 'speaking' | 'error';

interface TranscriptItem {
  id: string;
  sender: 'user' | 'model';
  text: string;
}

export const AIAajiLiveDemo: React.FC = () => {
  const [connectionState, setConnectionState] = useState<ConnectionState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [transcripts, setTranscripts] = useState<TranscriptItem[]>([]);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [hasSpoken, setHasSpoken] = useState(false);
  const [textInput, setTextInput] = useState('');

  // References for WebSockets and Web Audio API
  const wsRef = useRef<WebSocket | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const inputAnalyserRef = useRef<AnalyserNode | null>(null);
  const outputAnalyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const transcriptContainerRef = useRef<HTMLDivElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // State refs to avoid stale closures in audio processing callbacks
  const connectionStateRef = useRef<ConnectionState>('idle');
  connectionStateRef.current = connectionState;

  const isMutedRef = useRef(false);
  isMutedRef.current = isMuted;

  const hasSpokenInTurnRef = useRef(false);
  const lastSpokenTimeRef = useRef<number>(0);
  const silenceCheckIntervalRef = useRef<any>(null);
  const processingWatchdogRef = useRef<any>(null);
  const currentUserTranscriptIdRef = useRef<string | null>(null);
  const currentModelTranscriptIdRef = useRef<string | null>(null);

  // Auto-scroll transcript container
  useEffect(() => {
    if (transcriptContainerRef.current) {
      transcriptContainerRef.current.scrollTop = transcriptContainerRef.current.scrollHeight;
    }
  }, [transcripts]);

  // Clean up audio and socket on unmount
  useEffect(() => {
    return () => {
      stopSession();
    };
  }, []);

  const stopAudioTracks = () => {
    if (silenceCheckIntervalRef.current) {
      clearInterval(silenceCheckIntervalRef.current);
      silenceCheckIntervalRef.current = null;
    }
    if (processingWatchdogRef.current) {
      clearTimeout(processingWatchdogRef.current);
      processingWatchdogRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    if (scriptProcessorRef.current) {
      try {
        scriptProcessorRef.current.disconnect();
      } catch {}
      scriptProcessorRef.current = null;
    }
    if (inputAudioCtxRef.current) {
      try {
        inputAudioCtxRef.current.close();
      } catch {}
      inputAudioCtxRef.current = null;
    }

    // Stop active audio sources
    activeSourcesRef.current.forEach((src) => {
      try {
        src.stop();
      } catch {}
    });
    activeSourcesRef.current = [];

    if (outputAudioCtxRef.current) {
      try {
        outputAudioCtxRef.current.close();
      } catch {}
      outputAudioCtxRef.current = null;
    }

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    inputAnalyserRef.current = null;
    outputAnalyserRef.current = null;
    setAudioLevel(0);
    hasSpokenInTurnRef.current = false;
    setHasSpoken(false);
  };

  const stopSession = () => {
    console.log('[Live Voice Demo] Session ended by user/cleanup');
    if (wsRef.current) {
      try {
        wsRef.current.close();
      } catch {}
      wsRef.current = null;
    }
    stopAudioTracks();
    setConnectionState('idle');
  };

  const toggleMute = () => {
    if (mediaStreamRef.current) {
      const audioTrack = mediaStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
        console.log(`[Live Voice Demo] Microphone ${audioTrack.enabled ? 'unmuted' : 'muted'}`);
      }
    }
  };

  const playPcmChunk = (base64Audio: string) => {
    if (!outputAudioCtxRef.current) {
      outputAudioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 24000,
      });
      nextStartTimeRef.current = outputAudioCtxRef.current.currentTime;
    }

    const ctx = outputAudioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    try {
      const pcmBuffer = base64ToArrayBuffer(base64Audio);
      const float32 = pcm16ToFloat32(pcmBuffer);
      if (float32.length === 0) return;

      const buffer = ctx.createBuffer(1, float32.length, 24000);
      buffer.getChannelData(0).set(float32);

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      // Connect to output analyser dedicated to outputAudioCtx
      if (!outputAnalyserRef.current) {
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64;
        outputAnalyserRef.current = analyser;
        analyser.connect(ctx.destination);
      }

      source.connect(outputAnalyserRef.current);

      const currentTime = ctx.currentTime;
      if (nextStartTimeRef.current < currentTime) {
        nextStartTimeRef.current = currentTime + 0.02; // Tiny 20ms lead-in to prevent audio crackles
      }

      source.start(nextStartTimeRef.current);
      nextStartTimeRef.current += buffer.duration;

      if (activeSourcesRef.current.length === 0) {
        console.log('[Live Voice Demo] [Checkpoint 10: SUCCESS] Audio playback started');
      }

      activeSourcesRef.current.push(source);
      setConnectionState('speaking');

      // Clear processing watchdog once speech arrives
      if (processingWatchdogRef.current) {
        clearTimeout(processingWatchdogRef.current);
        processingWatchdogRef.current = null;
      }

      source.onended = () => {
        const idx = activeSourcesRef.current.indexOf(source);
        if (idx > -1) {
          activeSourcesRef.current.splice(idx, 1);
        }
        if (activeSourcesRef.current.length === 0) {
          if (connectionStateRef.current === 'speaking') {
            console.log('[Live Voice Demo] Assistant finished speaking, returning to listening state');
            setConnectionState('listening');
            currentModelTranscriptIdRef.current = null;
          }
        }
      };
    } catch (err) {
      console.error('[Live Voice Demo] Audio chunk playback error:', err);
    }
  };

  const handleInterrupt = () => {
    console.log('[Live Voice Demo] Handling audio interruption');
    activeSourcesRef.current.forEach((src) => {
      try {
        src.stop();
      } catch {}
    });
    activeSourcesRef.current = [];
    if (outputAudioCtxRef.current) {
      nextStartTimeRef.current = outputAudioCtxRef.current.currentTime;
    }
    setConnectionState('listening');
  };

  const signalEndOfSpeech = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      console.log('[Live Voice Demo] Signaling end of speech to backend...');
      wsRef.current.send(JSON.stringify({ type: 'end_of_turn' }));
      setConnectionState('processing');
      hasSpokenInTurnRef.current = false;
      setHasSpoken(false);
      currentUserTranscriptIdRef.current = null;

      // Start safety watchdog (8s timeout if model response is delayed)
      if (processingWatchdogRef.current) clearTimeout(processingWatchdogRef.current);
      processingWatchdogRef.current = setTimeout(() => {
        if (connectionStateRef.current === 'processing') {
          console.warn('[Live Voice Demo] Processing response timeout reached. Returning to listening.');
          setConnectionState('listening');
        }
      }, 8000);
    }
  };

  const sendTextMessage = (textToSend?: string) => {
    const text = (textToSend || textInput).trim();
    if (!text || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    console.log(`[Live Voice Demo] Sending text message: "${text}"`);
    const newId = Math.random().toString(36).substring(7);
    setTranscripts((prev) => [
      ...prev,
      {
        id: newId,
        sender: 'user',
        text,
      },
    ]);
    wsRef.current.send(JSON.stringify({ type: 'text', text }));
    setTextInput('');
    setConnectionState('processing');
    currentUserTranscriptIdRef.current = null;
    currentModelTranscriptIdRef.current = null;

    if (processingWatchdogRef.current) clearTimeout(processingWatchdogRef.current);
    processingWatchdogRef.current = setTimeout(() => {
      if (connectionStateRef.current === 'processing') {
        console.warn('[Live Voice Demo] Processing response timeout reached. Returning to listening.');
        setConnectionState('listening');
      }
    }, 8000);
  };

  const startSession = async () => {
    if (connectionState === 'connecting' || connectionState === 'listening' || connectionState === 'speaking') {
      return;
    }

    console.log('[Live Voice Demo] [Checkpoint 1: SUCCESS] Start button clicked');
    setErrorMessage(null);
    setConnectionState('connecting');
    trackEvent('ai_aaji_live_session_start', { source: 'aaji_demo_section' });

    try {
      // 1. Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      mediaStreamRef.current = stream;
      console.log('[Live Voice Demo] [Checkpoint 2: SUCCESS] Microphone permission granted');

      // 2. Initialize Audio Contexts
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 16000,
      });
      inputAudioCtxRef.current = inputCtx;
      await inputCtx.resume();

      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 24000,
      });
      outputAudioCtxRef.current = outputCtx;
      await outputCtx.resume();
      nextStartTimeRef.current = outputCtx.currentTime;

      // Input analyser specifically on inputAudioCtx
      const inputAnalyser = inputCtx.createAnalyser();
      inputAnalyser.fftSize = 64;
      inputAnalyserRef.current = inputAnalyser;

      // 3. Connect to backend WebSocket proxy
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/api/live-voice`;
      console.log(`[Live Voice Demo] Connecting to WebSocket: ${wsUrl}`);
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('[Live Voice Demo] [Checkpoint 3: SUCCESS] WebSocket connection opened to /api/live-voice');
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);

          if (msg.type === 'ready') {
            console.log('[Live Voice Demo] [Checkpoint 5: SUCCESS] Gemini session ready signal received');
            setConnectionState('listening');
          } else if (msg.type === 'audio' && msg.audio) {
            playPcmChunk(msg.audio);
          } else if (msg.type === 'transcript') {
            const isUser = msg.sender === 'user' || msg.role === 'user';
            if (isUser) {
              setTranscripts((prev) => {
                if (currentUserTranscriptIdRef.current) {
                  return prev.map((item) =>
                    item.id === currentUserTranscriptIdRef.current
                      ? { ...item, text: msg.interim ? msg.text : item.text + msg.text }
                      : item
                  );
                } else {
                  const newId = Math.random().toString(36).substring(7);
                  currentUserTranscriptIdRef.current = newId;
                  return [
                    ...prev,
                    {
                      id: newId,
                      sender: 'user',
                      text: msg.text,
                    },
                  ];
                }
              });
            } else {
              setTranscripts((prev) => {
                if (currentModelTranscriptIdRef.current) {
                  return prev.map((item) =>
                    item.id === currentModelTranscriptIdRef.current
                      ? { ...item, text: item.text + msg.text }
                      : item
                  );
                } else {
                  const newId = Math.random().toString(36).substring(7);
                  currentModelTranscriptIdRef.current = newId;
                  return [
                    ...prev,
                    {
                      id: newId,
                      sender: 'model',
                      text: msg.text,
                    },
                  ];
                }
              });
            }
          } else if (msg.type === 'interrupted') {
            handleInterrupt();
          } else if (msg.type === 'turnComplete') {
            console.log('[Live Voice Demo] [Checkpoint 11: SUCCESS] Turn complete event received');
            currentUserTranscriptIdRef.current = null;
            currentModelTranscriptIdRef.current = null;
            if (activeSourcesRef.current.length === 0) {
              setConnectionState('listening');
            }
          } else if (msg.type === 'error') {
            console.error('[Live Voice Demo] Backend error:', msg.error || msg.message);
            setErrorMessage(msg.error || msg.message || 'Live session encountered an issue.');
            setConnectionState('error');
            stopAudioTracks();
          }
        } catch (e) {
          console.error('[Live Voice Demo] Error parsing message:', e);
        }
      };

      ws.onerror = (e) => {
        console.error('[Live Voice Demo] WebSocket error:', e);
        setErrorMessage(
          'Could not connect to live voice session. You can experience AI Aaji directly at https://aiaajiassistant.vercel.app/'
        );
        setConnectionState('error');
        stopAudioTracks();
      };

      ws.onclose = (e) => {
        console.log(`[Live Voice Demo] WebSocket closed (code: ${e.code}, reason: ${e.reason || 'none'})`);
        if (connectionStateRef.current !== 'error') {
          setConnectionState('idle');
        }
        stopAudioTracks();
      };

      // 4. Capture microphone audio and stream PCM to WebSocket
      const source = inputCtx.createMediaStreamSource(stream);
      source.connect(inputAnalyser);

      const processor = inputCtx.createScriptProcessor(2048, 1, 1);
      scriptProcessorRef.current = processor;

      let capturedChunksCount = 0;

      processor.onaudioprocess = (e) => {
        if (ws.readyState === WebSocket.OPEN && !isMutedRef.current) {
          // Acoustic echo prevention: do not send mic audio while model is speaking
          if (connectionStateRef.current === 'speaking') {
            return;
          }

          const inputData = e.inputBuffer.getChannelData(0);

          // Calculate RMS energy of this audio frame using liveAudioService
          const rms = calculateRMS(inputData) / 5; // denormalize boost for absolute threshold

          // Threshold for human speech activity (typical ambient room noise is < 0.015)
          if (rms > 0.018) {
            if (!hasSpokenInTurnRef.current) {
              console.log('[Live Voice Demo] Speech activity detected from user');
              hasSpokenInTurnRef.current = true;
              setHasSpoken(true);
            }
            lastSpokenTimeRef.current = Date.now();
          }

          const pcmBuffer = floatTo16BitPCM(inputData);
          const base64Audio = arrayBufferToBase64(pcmBuffer);

          capturedChunksCount++;
          if (capturedChunksCount === 1) {
            console.log('[Live Voice Demo] [Checkpoint 6: SUCCESS] First microphone audio chunk captured');
          }

          ws.send(
            JSON.stringify({
              type: 'audio',
              audio: base64Audio,
            })
          );
        }
      };

      source.connect(processor);
      processor.connect(inputCtx.destination);

      // 5. Automatic silence detection interval (every 100ms)
      silenceCheckIntervalRef.current = setInterval(() => {
        if (
          hasSpokenInTurnRef.current &&
          connectionStateRef.current === 'listening' &&
          lastSpokenTimeRef.current > 0
        ) {
          const elapsedSilence = Date.now() - lastSpokenTimeRef.current;
          // After 950ms of silence following speech, conclude turn and trigger response
          if (elapsedSilence > 950) {
            console.log(`[Live Voice Demo] User paused speaking (${elapsedSilence}ms silence). Concluding turn.`);
            signalEndOfSpeech();
          }
        }
      }, 100);

      // 6. Volume animation loop for visual feedback on the orb
      const updateAudioLevel = () => {
        const activeAnalyser =
          connectionStateRef.current === 'speaking'
            ? outputAnalyserRef.current
            : inputAnalyserRef.current;

        if (activeAnalyser) {
          const dataArray = new Uint8Array(activeAnalyser.frequencyBinCount);
          activeAnalyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const avg = sum / dataArray.length;
          setAudioLevel(avg / 255);
        }
        animFrameRef.current = requestAnimationFrame(updateAudioLevel);
      };
      updateAudioLevel();
    } catch (err: any) {
      console.error('[Live Voice Demo] Session startup failed:', err);
      let userMsg = 'Unable to access your microphone or establish a voice connection.';
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        userMsg = 'Microphone permission was denied. Please allow microphone access in your browser to talk with AI Aaji.';
      }
      setErrorMessage(userMsg);
      setConnectionState('error');
      stopAudioTracks();
    }
  };

  const getStatusBadge = () => {
    switch (connectionState) {
      case 'connecting':
        return (
          <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            Connecting...
          </span>
        );
      case 'listening':
        return (
          <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {hasSpoken ? 'Listening to you speak...' : 'Listening (Speak now)'}
          </span>
        );
      case 'processing':
        return (
          <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono text-indigo-300 flex items-center gap-2">
            <div className="w-2.5 h-2.5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
            AI Aaji is processing...
          </span>
        );
      case 'speaking':
        return (
          <span className="px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-300 flex items-center gap-2">
            <Volume2 className="w-3.5 h-3.5 text-purple-400 animate-bounce" />
            AI Aaji Speaking...
          </span>
        );
      case 'error':
        return (
          <span className="px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-300 flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            Direct Assistant Available
          </span>
        );
      case 'idle':
      default:
        return (
          <span className="px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs text-neutral-300 font-mono tracking-wide">
            Ready to talk
          </span>
        );
    }
  };

  // Calculate dynamic scale & shadow based on audio reactivity
  const scaleValue =
    1 + (connectionState === 'listening' || connectionState === 'speaking' ? audioLevel * 0.25 : 0);
  const glowOpacity =
    0.35 +
    (connectionState === 'speaking'
      ? audioLevel * 0.45
      : connectionState === 'listening'
      ? 0.2
      : 0.1);

  return (
    <section
      id="ai-aaji-demo"
      className="relative py-24 md:py-32 bg-[#050814] text-white border-t border-white/10 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-purple-900/15 via-indigo-900/15 to-cyan-900/15 rounded-full blur-[180px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs font-semibold tracking-widest text-cyan-300 uppercase">
              MEET AI AAJI · LIVE VOICE EXPERIENCE
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-white mb-5 tracking-tight">
            AI Aaji Is Live.{' '}
            <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-200 to-cyan-300">
              Let's Talk.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            Experience the conversational intelligence of AI Aaji in real time. Engage in fluid voice dialogue powered by Gemini Live with the warm, expressive Aoede voice model, or explore the full platform.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-300">
              ● REAL-TIME VOICE
            </span>
            <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-300">
              ● AOEDE VOCAL CADENCE
            </span>
            <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-300">
              ● ZERO SETUP
            </span>
          </div>
        </div>

        {/* Live Voice Interactive Console Container - Matching exact UI Screenshot */}
        <div className="relative rounded-3xl bg-[#090D1C]/90 border border-white/10 p-6 sm:p-10 md:p-12 shadow-2xl backdrop-blur-2xl">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
              <div>
                <h3 className="font-sans font-medium text-lg sm:text-xl text-white tracking-wide">
                  AI Aaji Live Voice Session
                </h3>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  Engine: <span className="text-cyan-400 font-medium">aiaaji live</span> • Voice:{' '}
                  <span className="text-purple-300 font-medium">Aoede</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {getStatusBadge()}
            </div>
          </div>

          {/* Central Visual: Glowing 3D Orb with Dynamic Soundwave Ripples */}
          <div className="py-14 sm:py-20 flex flex-col items-center justify-center relative min-h-[320px]">
            {/* Outer dotted soundwave ring */}
            <div
              className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-dashed border-cyan-500/25 pointer-events-none transition-transform duration-300"
              style={{
                transform: `scale(${1 + audioLevel * 0.15})`,
                opacity: 0.4 + audioLevel * 0.5,
              }}
            />

            {/* Middle pulsating soundwave ring */}
            <div
              className="absolute w-60 h-60 sm:w-68 sm:h-68 rounded-full border border-cyan-400/30 pointer-events-none transition-transform duration-200"
              style={{
                transform: `scale(${1 + audioLevel * 0.2})`,
                boxShadow: `0 0 35px rgba(34, 211, 238, ${glowOpacity * 0.5})`,
              }}
            />

            {/* Innermost aura */}
            <div
              className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full pointer-events-none transition-all duration-200"
              style={{
                background: `radial-gradient(circle, rgba(168, 85, 247, ${glowOpacity}) 0%, rgba(99, 102, 241, 0.1) 70%, transparent 100%)`,
                transform: `scale(${scaleValue})`,
              }}
            />

            {/* 3D Lavender Purple Orb Sphere */}
            <div
              onClick={() => {
                if (connectionState === 'listening' && hasSpoken) {
                  signalEndOfSpeech();
                }
              }}
              title={connectionState === 'listening' && hasSpoken ? 'Click orb to finish turn' : undefined}
              className={`relative w-36 h-36 sm:w-44 sm:h-44 rounded-full transition-transform duration-150 ease-out z-10 ${
                connectionState === 'listening' && hasSpoken ? 'cursor-pointer hover:opacity-90' : ''
              }`}
              style={{
                transform: `scale(${scaleValue})`,
                background:
                  'radial-gradient(circle at 35% 35%, #d8b4fe 0%, #a855f7 35%, #7c3aed 70%, #4338ca 100%)',
                boxShadow: `0 0 ${40 + audioLevel * 60}px rgba(168, 85, 247, ${glowOpacity}), inset -12px -12px 24px rgba(30, 27, 75, 0.7), inset 8px 8px 16px rgba(255, 255, 255, 0.4)`,
              }}
            >
              {/* Subtle light reflection on sphere */}
              <div className="absolute top-4 left-6 w-8 h-5 rounded-full bg-white/40 blur-[2px] -rotate-45 pointer-events-none" />
            </div>

            {/* Hint below orb when speaking */}
            {connectionState === 'listening' && hasSpoken && (
              <p className="absolute bottom-6 font-mono text-[11px] text-cyan-300/80 animate-pulse">
                Pause speaking or tap "Done Speaking" below to hear response
              </p>
            )}
          </div>

          {/* Conversation Transcript Box */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                CONVERSATION TRANSCRIPT
              </span>
              {transcripts.length > 0 && (
                <button
                  onClick={() => setTranscripts([])}
                  className="text-[11px] font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  Clear Transcript
                </button>
              )}
            </div>

            <div
              ref={transcriptContainerRef}
              className="w-full min-h-[140px] max-h-[220px] rounded-2xl bg-[#060914]/90 border border-white/10 p-5 overflow-y-auto flex flex-col gap-3"
            >
              {transcripts.length === 0 ? (
                <div className="m-auto flex flex-col items-center justify-center text-center py-4">
                  <Mic className="w-6 h-6 text-purple-400/70 mb-2.5" />
                  <p className="text-neutral-400 text-sm font-light">
                    Click “Start Talking to AI Aaji” below to begin your real-time conversation.
                  </p>
                </div>
              ) : (
                transcripts.map((t) => (
                  <div
                    key={t.id}
                    className={`flex flex-col ${t.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <span className="text-[10px] font-mono text-neutral-400 mb-1 uppercase tracking-wider">
                      {t.sender === 'user' ? 'You' : 'AI Aaji'}
                    </span>
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        t.sender === 'user'
                          ? 'bg-blue-600/30 border border-blue-500/30 text-blue-100'
                          : 'bg-purple-950/40 border border-purple-500/30 text-neutral-200'
                      }`}
                    >
                      {t.text}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex flex-col items-center justify-center gap-4">
            {connectionState === 'idle' || connectionState === 'error' ? (
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <button
                  onClick={startSession}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] hover:from-[#7C3AED] hover:to-[#0891B2] text-white font-medium text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 shadow-lg shadow-purple-500/25 transition-all transform hover:scale-[1.02] cursor-pointer"
                >
                  <Mic className="w-5 h-5" />
                  <span>Start Talking to AI Aaji</span>
                </button>

                <a
                  href={AI_AAJI_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/10 border border-white/15 text-white text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Launch Official Website</span>
                  <ArrowUpRight className="w-4 h-4 text-cyan-300" />
                </a>
              </div>
            ) : connectionState === 'connecting' ? (
              <button
                disabled
                className="px-8 py-3.5 rounded-full bg-purple-600/50 text-white/80 font-medium text-sm flex items-center gap-2.5 cursor-not-allowed"
              >
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Connecting with AI Aaji...</span>
              </button>
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-3">
                {connectionState === 'listening' && (
                  <button
                    onClick={signalEndOfSpeech}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-mono font-semibold flex items-center gap-2 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
                  >
                    <CornerDownLeft className="w-4 h-4" />
                    <span>Done Speaking</span>
                  </button>
                )}

                <button
                  onClick={toggleMute}
                  className={`px-5 py-3 rounded-full text-xs font-mono font-medium flex items-center gap-2 transition-colors cursor-pointer border ${
                    isMuted
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                  }`}
                >
                  {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-emerald-400" />}
                  <span>{isMuted ? 'Muted' : 'Microphone Live'}</span>
                </button>

                <button
                  onClick={stopSession}
                  className="px-6 py-3 rounded-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-200 text-xs font-mono font-medium flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <PhoneOff className="w-4 h-4 text-red-400" />
                  <span>End Session</span>
                </button>
              </div>
            )}

            {/* Optional text input fallback */}
            {(connectionState === 'listening' || connectionState === 'speaking' || connectionState === 'processing') && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendTextMessage();
                }}
                className="w-full max-w-lg flex items-center gap-2 mt-2"
              >
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Or type a message to AI Aaji (e.g. 'Explain that in Marathi')..."
                  className="flex-1 bg-white/[0.05] border border-white/10 rounded-full px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!textInput.trim() || connectionState === 'processing'}
                  className="p-2.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white disabled:opacity-40 hover:opacity-90 transition-opacity cursor-pointer shadow-md"
                  title="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Error / Fallback Alert if present */}
            {errorMessage && (
              <div className="mt-2 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-2.5 max-w-lg text-center">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{errorMessage}</span>
                <a
                  href={AI_AAJI_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-amber-300 hover:text-white shrink-0 ml-1"
                >
                  Open aiaajiassistant.vercel.app ↗
                </a>
              </div>
            )}

            {/* Privacy Guarantee Note - Matching exact screenshot */}
            <div className="pt-4 flex items-center justify-center gap-2 text-xs text-neutral-400 text-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Microphone audio is processed in real time for conversation and is never recorded or stored on our servers.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
