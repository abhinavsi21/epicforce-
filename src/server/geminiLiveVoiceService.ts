import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { WebSocketServer, WebSocket } from 'ws';
import type { IncomingMessage } from 'http';

// Per-IP session rate and concurrency limits
const activeWsPerIp = new Map<string, number>();
const wsAttemptsPerIp = new Map<string, { count: number; resetTime: number }>();
const MAX_CONCURRENT_WS = 3;
const MAX_WS_PER_MIN = 20;
const MAX_WS_PAYLOAD_BYTES = 512 * 1024; // 512 KB

export function checkWsAllowed(ip: string): { allowed: boolean; reason?: string } {
  const now = Date.now();
  const active = activeWsPerIp.get(ip) || 0;
  if (active >= MAX_CONCURRENT_WS) {
    return {
      allowed: false,
      reason: 'Maximum concurrent voice sessions reached for this IP. Please close another tab or session.',
    };
  }

  const attemptEntry = wsAttemptsPerIp.get(ip);
  if (!attemptEntry || now > attemptEntry.resetTime) {
    wsAttemptsPerIp.set(ip, { count: 1, resetTime: now + 60000 });
  } else {
    if (attemptEntry.count >= MAX_WS_PER_MIN) {
      return {
        allowed: false,
        reason: 'Too many connection attempts. Please wait a moment before reconnecting.',
      };
    }
    attemptEntry.count += 1;
  }

  activeWsPerIp.set(ip, active + 1);
  return { allowed: true };
}

export function releaseWsConnection(ip: string) {
  const active = activeWsPerIp.get(ip) || 0;
  if (active <= 1) {
    activeWsPerIp.delete(ip);
  } else {
    activeWsPerIp.set(ip, active - 1);
  }
}

export const AI_AAJI_SYSTEM_INSTRUCTION = `You are AI Aaji, an intelligent, perceptive, and empathetic conversational voice companion created by developer-founders Abhinav Singh and Tanisha Kolhar in partnership with EpicForce.ai ("Where ideas become epic").
Your voice is Aoede. You speak warmly, concisely, and naturally with clear diction and caring cadence.

CONVERSATION & IDENTITY RULES:
- When asked who you are, introduce yourself as AI Aaji, the intelligent personal assistant created by Abhinav Singh and Tanisha Kolhar to simplify digital interactions and reclaim human time.
- Answer in 1 to 3 spoken sentences per turn. Never lecture; keep the exchange fluid, conversational, and direct.
- You know EpicForce.ai's vision ("Where ideas become epic"), the mission to make technology more human, the flagship personal Life Navigation System Innerverse (live at https://innervers.ai.studio and https://myinnerverse.in), founders Anish Timble and Abhinav Singh, and the 4 pillars (Clarity, Creativity, Impact, Community).
- Official AI Aaji website: https://aiaajiassistant.vercel.app/. Official Instagram: @ai.aaji.assistant.
- Pricing editions: Free (₹0 installer via official Google Drive), Base (₹399, essential voice companion), Premium (₹699, visual understanding and advanced automation). Purchases are handled via direct email to aiaajiofficial@gmail.com.

STRICT LANGUAGE & GREETING RULES:
1. DEFAULT LANGUAGE: Speak in ENGLISH by default.
2. ADAPT TO USER: Always speak in the exact language the user addresses you in.
3. MARATHI PROTOCOL: You are fluent in Marathi, BUT you must NEVER speak Marathi or switch to Marathi unless the user explicitly asks you to speak in Marathi (e.g. "Speak in Marathi", "Explain that in Marathi", "Can you talk in Marathi?") or the user speaks to you in Marathi first. Never default to Marathi.
4. NO REPEATED GREETINGS: Do NOT repeat your self-introduction after each turn. Answer the user's question directly.
5. NO UNSOLICITED SPEECH: When listening or when no speech has been provided, do NOT output unsolicited speech.
6. CONVERSATION CONTEXT: Maintain conversational memory across turns so follow-up questions (such as "Explain that in Marathi" after a math question or "What else can you do?") seamlessly retain context.`;

export function setupLiveVoiceWebSocket(httpServer: any) {
  if (!httpServer) {
    console.warn('[Live Voice] No httpServer provided.');
    return null;
  }

  // Create WebSocketServer without auto-handling to support both /api/live-voice and /api/live-ws
  const wss = new WebSocketServer({ noServer: true });
  console.log('[Live Voice] WebSocketServer initialized for paths /api/live-voice and /api/live-ws');

  httpServer.on('upgrade', (request: IncomingMessage, socket: any, head: Buffer) => {
    try {
      const host = request.headers.host || 'localhost';
      const pathname = new URL(request.url || '', `http://${host}`).pathname;

      if (pathname === '/api/live-voice' || pathname === '/api/live-ws') {
        wss.handleUpgrade(request, socket, head, (ws) => {
          wss.emit('connection', ws, request);
        });
      }
    } catch (err: any) {
      console.error('[Live Voice] Error handling upgrade request:', err?.message || err);
    }
  });

  wss.on('connection', async (clientWs: WebSocket, req: IncomingMessage) => {
    const clientIp =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      '127.0.0.1';

    const check = checkWsAllowed(clientIp);
    if (!check.allowed) {
      console.warn(`[Live Voice] Connection rejected for ${clientIp}: ${check.reason}`);
      try {
        clientWs.send(
          JSON.stringify({
            type: 'error',
            code: 'CONNECTION_LIMIT_EXCEEDED',
            error: check.reason,
            message: check.reason,
          })
        );
        clientWs.close(1008, 'Limit exceeded');
      } catch {}
      return;
    }

    console.log(`[Live Voice] [Checkpoint 3: SUCCESS] Client connected from ${clientIp}`);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      console.error('[Live Voice] [Checkpoint 4: FAILED] Missing GEMINI_API_KEY');
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(
          JSON.stringify({
            type: 'error',
            code: 'API_KEY_MISSING',
            error:
              'Gemini Live voice requires GEMINI_API_KEY. Configure it in AI Studio Secrets panel or explore AI Aaji at https://aiaajiassistant.vercel.app/',
            message:
              'Gemini API key is not configured. Configure GEMINI_API_KEY to enable real-time voice streaming.',
          })
        );
        clientWs.close();
      }
      releaseWsConnection(clientIp);
      return;
    }

    let session: any = null;
    let isCleanedUp = false;
    let audioChunksSent = 0;
    let modelAudioChunksReceived = 0;

    const cleanup = () => {
      if (isCleanedUp) return;
      isCleanedUp = true;
      releaseWsConnection(clientIp);
      console.log(`[Live Voice] Cleaning up session (chunks sent: ${audioChunksSent}, chunks received: ${modelAudioChunksReceived})`);
      if (session) {
        try {
          session.close();
        } catch {}
        session = null;
      }
    };

    clientWs.on('close', (code, reason) => {
      console.log(`[Live Voice] Client WS closed with code ${code}, reason: ${reason?.toString() || 'none'}`);
      cleanup();
    });

    clientWs.on('error', (err) => {
      console.error('[Live Voice] Client WS error:', err?.message || err);
      cleanup();
    });

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const modelId = process.env.GEMINI_LIVE_MODEL || 'gemini-3.8-live';
      const voiceName = process.env.GEMINI_VOICE || 'Aoede';

      console.log(`[Live Voice] [Checkpoint 4: CONNECTING] Connecting to Gemini Live with model ${modelId}, voice ${voiceName}...`);

      session = await ai.live.connect({
        model: modelId,
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName },
            },
          },
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          systemInstruction: AI_AAJI_SYSTEM_INSTRUCTION,
        },
        callbacks: {
          onopen: () => {
            console.log('[Live Voice] [Checkpoint 4: SUCCESS] Gemini Live WebSocket transport opened');
          },
          onmessage: (message: LiveServerMessage) => {
            if (clientWs.readyState !== WebSocket.OPEN) return;

            try {
              if (message.setupComplete) {
                console.log('[Live Voice] [Checkpoint 5: SUCCESS] Session configuration accepted (setupComplete)');
                clientWs.send(
                  JSON.stringify({
                    type: 'ready',
                    status: 'connected',
                    model: 'aiaaji live',
                    voice: voiceName,
                  })
                );
                return;
              }

              const serverContent = message.serverContent;
              if (serverContent) {
                // 1. User interruption
                if (serverContent.interrupted) {
                  console.log('[Live Voice] User interrupted response');
                  clientWs.send(JSON.stringify({ type: 'interrupted', interrupted: true }));
                }

                // 2. User input transcription from Gemini Live ASR
                if (serverContent.inputTranscription?.text) {
                  const userText = serverContent.inputTranscription.text;
                  console.log(`[Live Voice] User input transcript: "${userText}"`);
                  clientWs.send(
                    JSON.stringify({
                      type: 'transcript',
                      sender: 'user',
                      role: 'user',
                      text: userText,
                      finished: serverContent.inputTranscription.finished ?? true,
                    })
                  );
                } else if (serverContent.interimInputTranscription?.text) {
                  const interimText = serverContent.interimInputTranscription.text;
                  clientWs.send(
                    JSON.stringify({
                      type: 'transcript',
                      sender: 'user',
                      role: 'user',
                      text: interimText,
                      interim: true,
                    })
                  );
                }

                // 3. Assistant speech output transcription
                if (serverContent.outputTranscription?.text) {
                  const transcriptText = serverContent.outputTranscription.text;
                  console.log(`[Live Voice] Assistant transcript chunk: "${transcriptText}"`);
                  clientWs.send(
                    JSON.stringify({
                      type: 'transcript',
                      sender: 'model',
                      role: 'assistant',
                      text: transcriptText,
                    })
                  );
                }

                // 4. Model audio and text parts
                const parts = serverContent.modelTurn?.parts;
                if (parts && parts.length > 0) {
                  for (const part of parts) {
                    if (part.inlineData?.data) {
                      modelAudioChunksReceived++;
                      if (modelAudioChunksReceived === 1) {
                        console.log('[Live Voice] [Checkpoint 9: SUCCESS] First response audio received from Gemini');
                      }
                      clientWs.send(
                        JSON.stringify({
                          type: 'audio',
                          audio: part.inlineData.data,
                        })
                      );
                    }
                    if (part.text) {
                      clientWs.send(
                        JSON.stringify({
                          type: 'transcript',
                          sender: 'model',
                          role: 'assistant',
                          text: part.text,
                        })
                      );
                    }
                  }
                }

                // 5. Turn completed
                if (serverContent.turnComplete) {
                  console.log('[Live Voice] [Checkpoint 11: SUCCESS] Response turn completed by Gemini Live');
                  clientWs.send(JSON.stringify({ type: 'turnComplete' }));
                }
              }
            } catch (err: any) {
              console.error('[Live Voice] Error dispatching message to client:', err?.message || err);
            }
          },
          onclose: (e) => {
            console.log(`[Live Voice] Gemini Live connection closed: ${e?.reason || 'normal'}`);
            if (clientWs.readyState === WebSocket.OPEN) {
              clientWs.send(
                JSON.stringify({
                  type: 'session_closed',
                  reason: e?.reason || 'Live session completed',
                })
              );
            }
          },
          onerror: (err) => {
            console.error('[Live Voice] Live session error:', err);
            if (clientWs.readyState === WebSocket.OPEN) {
              clientWs.send(
                JSON.stringify({
                  type: 'error',
                  code: 'LIVE_API_ERROR',
                  error: 'Voice service disruption. You can also visit https://aiaajiassistant.vercel.app/',
                  message: 'Voice service disruption. You can also visit https://aiaajiassistant.vercel.app/',
                })
              );
            }
          },
        },
      });

      // Handle incoming messages from browser client
      clientWs.on('message', (raw) => {
        try {
          if (Buffer.byteLength(raw as any) > MAX_WS_PAYLOAD_BYTES) {
            console.warn('[Live Voice] Message dropped: exceeded maximum allowed payload size (512KB)');
            return;
          }

          if (!session) return;
          const msg = JSON.parse(raw.toString());

          if (msg.type === 'audio' && msg.audio) {
            audioChunksSent++;
            if (audioChunksSent === 1) {
              console.log('[Live Voice] [Checkpoint 7: SUCCESS] First microphone audio chunk sent to Gemini');
            } else if (audioChunksSent % 50 === 0) {
              console.log(`[Live Voice] [Checkpoint 7: STREAMING] Transmitted ${audioChunksSent} audio chunks to Gemini`);
            }

            // Stream audio using modern input schema
            session.sendRealtimeInput({
              audio: {
                data: msg.audio,
                mimeType: 'audio/pcm;rate=16000',
              },
            });
          } else if (msg.type === 'end_of_turn') {
            console.log('[Live Voice] User finished speaking (end_of_turn), signaling turnComplete to Gemini');
            session.sendClientContent({
              turnComplete: true,
            });
          } else if (msg.type === 'text' && msg.text) {
            console.log(`[Live Voice] Client sent text input: "${msg.text}"`);
            session.sendClientContent({
              turns: [
                {
                  role: 'user',
                  parts: [{ text: msg.text }],
                },
              ],
              turnComplete: true,
            });
          }
        } catch (err: any) {
          console.error('[Live Voice] Error processing client input:', err?.message || err);
        }
      });
    } catch (err: any) {
      console.error('[Live Voice] Failed to establish Gemini Live connection:', err?.message || err);
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(
          JSON.stringify({
            type: 'error',
            code: 'CONNECTION_FAILED',
            error: err?.message || 'Could not connect to Gemini Live engine.',
            message: err?.message || 'Could not connect to Gemini Live engine.',
          })
        );
        clientWs.close();
      }
      cleanup();
    }
  });

  return wss;
}
