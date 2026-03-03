'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartCard } from '@/components/chart-card';
import { ConversionLengthDataPoint } from '@/lib/mock-data-lead-conversion';

interface Props { data: ConversionLengthDataPoint[] }

export function ConversionLengthChart({ data }: Props) {
  return (
    <ChartCard title="Average Conversion Length" description="Days from first touch to conversion">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
          <YAxis
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
            unit=" d"
          />
          <Tooltip
            formatter={(value) => [`${Number(value ?? 0)} days`, 'Avg Length']}
            contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }}
            labelStyle={{ fontWeight: 600 }}
          />
          <Line
            type="monotone"
            dataKey="days"
            stroke="#3DB9EB"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#3DB9EB', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
