"use client";

import { useEffect } from 'react';

export default function FetchGuard() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const origFetch = window.fetch;
    if (!origFetch) return;

    // Wrap fetch to catch and suppress network errors from third-party scripts
    window.fetch = async (...args: any[]) => {
      try {
        return await origFetch(...args);
      } catch (err) {
        // Avoid noisy uncaught errors from external scripts (e.g., analytics) in dev
        // Log a short warning and return a synthetic Response so callers can handle gracefully
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
