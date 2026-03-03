'use client';

import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { ChartCard } from '@/components/chart-card';
import { LeadsByTouchpointDataPoint } from '@/lib/mock-data-lead-conversion';

interface Props { data: LeadsByTouchpointDataPoint[] }

export function LeadsByTouchpointChart({ data }: Props) {
  return (
    <ChartCard title="Leads by Touchpoint Count" description="Lead volume and conversion rate by number of touchpoints">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="touchpoints" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={(v: number) => `${v}%`}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }}
            labelStyle={{ fontWeight: 600 }}
            formatter={(value, name) => {
              const v = Number(value ?? 0);
              if (name === 'Avg Conversion Rate') return [`${v.toFixed(1)}%`, name];
              return [new Intl.NumberFormat('en-US').format(v), name];
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar yAxisId="left" dataKey="leadCount" name="Lead Count" fill="#FFC223" radius={[4, 4, 0, 0]} barSize={36} />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="avgConversionRate"
            name="Avg Conversion Rate"
            stroke="#3DB9EB"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#3DB9EB', strokeWidth: 2, stroke: '#fff' }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
