"use client";

import { useEffect } from 'react';

export default function FetchGuard() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const origFetch = window.fetch;
    if (!origFetch) return;

    // Wrap fetch to intercept problematic analytics/third-party calls (e.g., FullStory)
    window.fetch = async (...args: any[]) => {
      try {
        const input = args[0];
        let url = '';
        try {
          if (typeof input === 'string') url = input;
          else if (input && typeof input.url === 'string') url = input.url;
        } catch (e) {
          url = '';
        }

        // Block known noisy analytics endpoints in dev/preview to avoid CORS/fetch errors
        const blocked = ['fullstory.com', 'edge.fullstory.com', 'static.fullstory.com'];
        if (url && blocked.some((b) => url.includes(b))) {
          // return a minimal successful empty Response
          return new Response(null, { status: 204, statusText: 'No Content (blocked)' });
        }

        return await origFetch(...args);
      } catch (err) {
        // Suppress noisy fetch errors from 3rd-party scripts
        // eslint-disable-next-line no-console
        console.warn('[fetch-guard] suppressed fetch error', err);
        try {
          return new Response(null, { status: 520, statusText: 'Fetch Failed (guarded)' });
        } catch (e) {
          return Promise.reject(err);
        }
      }
    };

    return () => {
      // restore original
      window.fetch = origFetch;
    };
  }, []);

  return null;
}
