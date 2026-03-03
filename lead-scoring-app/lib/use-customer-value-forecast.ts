'use client';

import { useState, useEffect } from 'react';
import { CustomerValueForecastData, mockCustomerValueForecastData } from './mock-data-customer-value-forecast';

const USE_MOCK = true;
const API_ENDPOINT = '/api/v1/customer-value/forecast';

export function useCustomerValueForecastData() {
  const [data, setData] = useState<CustomerValueForecastData | null>(null);
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
          if (!cancelled) setData(mockCustomerValueForecastData);
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
