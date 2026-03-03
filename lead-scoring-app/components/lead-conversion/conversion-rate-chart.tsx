'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { ChartCard } from '@/components/chart-card';
import { ConversionRateDataPoint } from '@/lib/mock-data-lead-conversion';

interface Props { data: ConversionRateDataPoint[] }

export function ConversionRateChart({ data }: Props) {
  return (
    <ChartCard title="Conversion Rate Over Time" description="Monthly converted vs. not-converted breakdown">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} stackOffset="expand" margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
          <YAxis
            tickFormatter={(v: number) => `${(v * 100).toFixed(0)}%`}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            formatter={(value, name) => {
              const label = name === 'converted' ? 'Converted' : 'Not Converted';
              return [Number(value ?? 0), label];
            }}
            contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }}
            labelStyle={{ fontWeight: 600 }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="converted" name="Converted" stackId="a" fill="#3DB9EB" radius={[0, 0, 0, 0]} />
          <Bar dataKey="notConverted" name="Not Converted" stackId="a" fill="#B8E4F8" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
