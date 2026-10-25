import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

// In-memory sliding rate limiter per client
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 25;

function checkRateLimit(clientIp: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(clientIp);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(clientIp, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  entry.count += 1;
  return true;
}

function aiGuideApiPlugin(): Plugin {
  return {
    name: 'ai-guide-api',
    configureServer(server) {
      const handler = async (req: any, res: any) => {
        if (req.method === 'POST') {
          const clientIp = req.socket?.remoteAddress || 'local';

          if (!checkRateLimit(clientIp)) {
            res.statusCode = 429;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                error: "You're sending messages a little too quickly. Please try again in a moment.",
              })
            );
            return;
          }

          let body = '';
          req.on('data', (chunk: any) => {
            body += chunk;
            if (body.length > 20000) {
              res.statusCode = 413;
              res.end(JSON.stringify({ error: 'Payload too large.' }));
            }
          });

          req.on('end', async () => {
            try {
              const parsed = JSON.parse(body || '{}');
              const message = parsed.message;

              if (!message || typeof message !== 'string') {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Valid message string is required.' }));
                return;
              }

              // Import Master Chat Controller
              const { AIGuideController } = await import('./src/ai-guide/controller.js').catch(
                () => import('./src/ai-guide/controller')
              );

              const controller = new AIGuideController();
              const response = await controller.processMessage({
                message,
                context: {
                  currentSection: parsed.currentSection || 'hero',
                  currentRoute: parsed.currentRoute || '/',
                  lastViewedSection: parsed.lastViewedSection,
                  history: parsed.history || [],
                },
              });

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(response));
            } catch (err: any) {
              console.error('[AI Guide API] Handler error:', err?.message || err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  error:
                    "I'm having trouble accessing my advanced reasoning system right now, but I can still help you explore EpicForce.ai.",
                })
              );
            }
          });
        } else {
          res.statusCode = 405;
          res.end();
        }
      };

      server.middlewares.use('/api/ai-guide/chat', handler);
      server.middlewares.use('/api/chat', handler);

      server.middlewares.use('/api/status', (_req: any, res: any) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify({
            status: 'ok',
            configured: Boolean(process.env.GEMINI_API_KEY),
            hasApiKey: Boolean(process.env.GEMINI_API_KEY),
            liveModel: 'aiaaji live',
            voice: process.env.GEMINI_VOICE || 'Aoede',
            chatModel: 'gemini-3.8-flash',
            brandName: 'AI Aaji',
            contactEmail: 'aiaajiofficial@gmail.com',
          })
        );
      });

      // In-app direct image upload endpoint
      server.middlewares.use('/api/upload-image', (req: any, res: any) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end();
          return;
        }

        let body = '';
        req.on('data', (chunk: any) => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const parsed = JSON.parse(body || '{}');
            const dataUrl = parsed.image;
            if (!dataUrl || typeof dataUrl !== 'string') {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Valid base64 image data is required.' }));
              return;
            }

            const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');

            const fs = await import('fs/promises');
            const path = await import('path');

            const publicDir = path.resolve(process.cwd(), 'public');
            await fs.mkdir(publicDir, { recursive: true });
            await fs.writeFile(path.join(publicDir, 'image.png'), buffer);
            await fs.writeFile(path.join(publicDir, 'four-foundations.png'), buffer);

            const assetsDir = path.join(publicDir, 'assets');
            await fs.mkdir(assetsDir, { recursive: true });
            await fs.writeFile(path.join(assetsDir, 'four-foundations.png'), buffer);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, url: '/image.png' }));
          } catch (err: any) {
            console.error('[Upload API] Error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err?.message || 'Failed to save image' }));
          }
        });
      });

      // Attach Gemini Live Voice WebSocket server
      if (server.httpServer) {
        import('./src/server/geminiLiveVoiceService.js')
          .catch(() => import('./src/server/geminiLiveVoiceService'))
          .then((mod) => {
            mod.setupLiveVoiceWebSocket(server.httpServer);
          })
          .catch((err) => {
            console.error('[Live Voice] Failed to attach WebSocket to httpServer:', err);
          });
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), aiGuideApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
