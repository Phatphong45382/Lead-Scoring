'use client';

import { useState, useEffect } from 'react';
import { LeadConversionData, mockLeadConversionData } from './mock-data-lead-conversion';

const USE_MOCK = true; // Flip to false when API is ready
const API_ENDPOINT = '/api/v1/lead-conversion/summary';

export function useLeadConversionData() {
  const [data, setData] = useState<LeadConversionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        if (USE_MOCK) {
          // Simulate network delay for realistic loading states
          await new Promise((r) => setTimeout(r, 400));
          if (!cancelled) setData(mockLeadConversionData);
        } else {
          const res = await fetch(API_ENDPOINT);
          if (!res.ok) throw new Error(`API error ${res.status}`);
          const json = await res.json();
          if (!cancelled) setData(json.data);
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, []);

  return { data, isLoading, error };
}
