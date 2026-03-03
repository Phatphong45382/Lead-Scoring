'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartCard } from '@/components/chart-card';
import { NewLeadsDataPoint } from '@/lib/mock-data-lead-conversion';

interface Props { data: NewLeadsDataPoint[] }

export function NewLeadsChart({ data }: Props) {
  return (
    <ChartCard title="New Leads Over Time" description="Historical vs. scoring-driven lead acquisition">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradHistorical" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFD699" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FFD699" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="gradScoring" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF9933" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FF9933" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }}
            labelStyle={{ fontWeight: 600 }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Area type="monotone" dataKey="historical" name="Historical" stackId="1" stroke="#FFD699" fill="url(#gradHistorical)" />
          <Area type="monotone" dataKey="scoring" name="Scoring" stackId="1" stroke="#FF9933" fill="url(#gradScoring)" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
