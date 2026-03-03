const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(error?.error?.message || `HTTP ${res.status}`);
    }

    return res.json();
}

// ── Health ──────────────────────────────────────────────────────────────────
export const healthApi = {
    check: () => fetchAPI<{ success: boolean; data: { status: string } }>('/health'),
};

// ── Dashboard ────────────────────────────────────────────────────────────────
export const dashboardApi = {
    getSummary: (params?: Record<string, string>) => {
        const query = params ? '?' + new URLSearchParams(params).toString() : '';
        return fetchAPI<any>(`/dashboard/summary${query}`);
    },
    getFilters: () => fetchAPI<any>('/dashboard/filters'),
};

// ── Leads ────────────────────────────────────────────────────────────────────
export const leadsApi = {
    getList: (params?: Record<string, string>) => {
        const query = params ? '?' + new URLSearchParams(params).toString() : '';
        return fetchAPI<any>(`/leads/list${query}`);
    },
    getFilters: () => fetchAPI<any>('/leads/filters'),
};

// ── Scoring ──────────────────────────────────────────────────────────────────
export const scoringApi = {
    upload: (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return fetchAPI<any>('/scoring/upload', {
            method: 'POST',
            headers: {},
            body: formData,
        });
    },
    run: (scenarioId: string) =>
        fetchAPI<any>(`/scoring/run/${scenarioId}`, { method: 'POST' }),
    getJobStatus: (scenarioId: string, runId: string) =>
        fetchAPI<any>(`/scoring/jobs/${scenarioId}/${runId}`),
    getLatestResults: () => fetchAPI<any>('/scoring/results/latest'),
};
