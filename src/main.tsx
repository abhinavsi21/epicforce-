import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Guard against third-party browser extension content script errors (e.g. CrossPilot sandbox-content.js)
if (typeof window !== 'undefined') {
  const isExtensionError = (str?: string) => {
    if (!str) return false;
    return (
      str.includes('chrome-extension://') ||
      str.includes('moz-extension://') ||
      str.includes('chrome: call method') ||
      str.includes('sandbox-content.js')
    );
  };

  window.addEventListener(
    'error',
    (e) => {
      const errStr = `${e.message} ${e.filename} ${e.error?.stack || ''}`;
      if (isExtensionError(errStr)) {
        e.stopImmediatePropagation();
        e.preventDefault();
      }
    },
    true
  );

  window.addEventListener(
    'unhandledrejection',
    (e) => {
      const errStr = `${e.reason?.message || ''} ${e.reason?.stack || ''} ${String(e.reason || '')}`;
      if (isExtensionError(errStr)) {
        e.stopImmediatePropagation();
        e.preventDefault();
      }
    },
    true
  );
}

createRoot(document.getElementById('root')!).render(<App />);

