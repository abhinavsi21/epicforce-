import 'dotenv/config';
import express from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { setupLiveVoiceWebSocket } from './src/server/geminiLiveVoiceService.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

// In-memory sliding rate limiter per client for AI Guide
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
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

app.use(express.json({ limit: '20mb' }));

// Health & Status endpoints
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'EpicForce.ai Full-Stack Server',
    liveVoiceReady: true,
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

app.get('/api/status', (_req, res) => {
  res.json({
    status: 'ok',
    configured: Boolean(process.env.GEMINI_API_KEY),
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    liveModel: 'aiaaji live',
    voice: process.env.GEMINI_VOICE || 'Aoede',
    chatModel: 'gemini-3.8-flash',
    brandName: 'AI Aaji',
    contactEmail: 'aiaajiofficial@gmail.com',
  });
});

app.get(['/api/live-voice', '/api/live-ws'], (_req, res) => {
  res.status(200).json({
    status: 'ok',
    endpoints: ['/api/live-voice', '/api/live-ws'],
    service: 'AI Aaji Realtime Voice WebSocket Endpoint',
    protocol: 'websocket',
    upgradeRequired: true,
    message: 'Connect via WebSocket (ws:// or wss://) with Gemini Live PCM audio protocol.',
  });
});

// AI Guide Chat Controller handler
const chatHandler = async (req: express.Request, res: express.Response) => {
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'local';

  if (!checkRateLimit(clientIp)) {
    res.status(429).json({
      error: "You're sending messages a little too quickly. Please try again in a moment.",
    });
    return;
  }

  const { message, currentSection, currentRoute, lastViewedSection, history } = req.body || {};

  if (!message || typeof message !== 'string') {
    res.status(400).json({ error: 'Valid message string is required.' });
    return;
  }

  try {
    const { AIGuideController } = await import('./src/ai-guide/controller.ts');
    const controller = new AIGuideController();
    const response = await controller.processMessage({
      message,
      context: {
        currentSection: currentSection || 'hero',
        currentRoute: currentRoute || '/',
        lastViewedSection,
        history: history || [],
      },
    });

    res.status(200).json(response);
  } catch (err: any) {
    console.error('[AI Guide API] Handler error:', err?.message || err);
    res.status(500).json({
      error: "I'm having trouble accessing my advanced reasoning system right now, but I can still help you explore EpicForce.ai.",
    });
  }
};

app.post('/api/ai-guide/chat', chatHandler);
app.post('/api/chat', chatHandler);

// In-app direct image upload endpoint
app.post('/api/upload-image', async (req, res) => {
  try {
    const dataUrl = req.body?.image;
    if (!dataUrl || typeof dataUrl !== 'string') {
      res.status(400).json({ error: 'Valid base64 image data is required.' });
      return;
    }

    const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const publicDir = path.resolve(__dirname, 'public');
    await fs.promises.mkdir(publicDir, { recursive: true });
    await fs.promises.writeFile(path.join(publicDir, 'image.png'), buffer);
    await fs.promises.writeFile(path.join(publicDir, 'four-foundations.png'), buffer);

    const distDir = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distDir)) {
      await fs.promises.writeFile(path.join(distDir, 'image.png'), buffer);
      await fs.promises.writeFile(path.join(distDir, 'four-foundations.png'), buffer);
    }

    res.status(200).json({ success: true, url: '/image.png' });
  } catch (err: any) {
    console.error('[Upload API] Error:', err);
    res.status(500).json({ error: err?.message || 'Failed to save image' });
  }
});

// Setup Gemini Live Voice persistent WebSocket
setupLiveVoiceWebSocket(server);

// Serve static frontend in production
const distDir = path.resolve(__dirname, 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

const PORT = parseInt(process.env.PORT || '3000', 10);
server.listen(PORT, '0.0.0.0', () => {
  console.log(`[EpicForce.ai] Server listening on port ${PORT}`);
  console.log(`[EpicForce.ai] WebSocket live-voice mounted at ws://0.0.0.0:${PORT}/api/live-voice`);
});
