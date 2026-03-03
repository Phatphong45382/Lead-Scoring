'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartCard } from '@/components/chart-card';
import { TouchpointsBySourceDataPoint } from '@/lib/mock-data-lead-conversion';

interface Props { data: TouchpointsBySourceDataPoint[] }

const YEAR_COLORS: Record<string, string> = {
  '2022': '#B8E4F8',
  '2023': '#3DB9EB',
  '2024': '#8B7EC8',
  '2025': '#6B5CA5',
};

export function TouchpointsBySourceChart({ data }: Props) {
  return (
    <ChartCard title="Touchpoints by Source" description="Lead source volume across years">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="source" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} labelStyle={{ fontWeight: 600 }} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          {Object.entries(YEAR_COLORS).map(([year, color]) => (
            <Bar key={year} dataKey={year} name={year} fill={color} radius={[2, 2, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
