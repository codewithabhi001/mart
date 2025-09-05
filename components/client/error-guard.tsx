"use client";

import { useEffect } from 'react';

export default function ErrorGuard() {
  useEffect(() => {
    function onError(event: ErrorEvent) {
      try {
        const msg = String(event.message || '');
        if (msg.includes('Failed to fetch') || msg.toLowerCase().includes('fullstory') || msg.includes('edge.fullstory.com')) {
          // prevent the error from surfacing in the dev overlay
          event.preventDefault();
          // eslint-disable-next-line no-console
          console.warn('[error-guard] suppressed error:', msg);
        }
      } catch (e) {}
    }

    function onUnhandledRejection(event: PromiseRejectionEvent) {
      try {
        const reason = event.reason && (event.reason.message || String(event.reason));
        if (String(reason).includes('Failed to fetch') || String(reason).toLowerCase().includes('fullstory') || String(reason).includes('edge.fullstory.com')) {
          event.preventDefault();
          // eslint-disable-next-line no-console
          console.warn('[error-guard] suppressed unhandled rejection:', reason);
        }
      } catch (e) {}
    }

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onUnhandledRejection);

    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onUnhandledRejection);
    };
  }, []);

  return null;
}
