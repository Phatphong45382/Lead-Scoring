'use client';

import { useState, useEffect } from 'react';
import { CustomerValueEvaluationData, mockCustomerValueEvaluationData } from './mock-data-customer-value-evaluation';

const USE_MOCK = true;
const API_ENDPOINT = '/api/v1/customer-value/evaluation';

export function useCustomerValueEvaluationData() {
  const [data, setData] = useState<CustomerValueEvaluationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        if (USE_MOCK) {
          await new Promise((r) => setTimeout(r, 300));
          if (!cancelled) setData(mockCustomerValueEvaluationData);
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
