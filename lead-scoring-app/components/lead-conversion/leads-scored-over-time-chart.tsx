'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { ChartCard } from '@/components/chart-card';
import { LeadsScoredOverTimeDataPoint } from '@/lib/mock-data-forecast';

interface Props { data: LeadsScoredOverTimeDataPoint[] }

export function LeadsScoredOverTimeChart({ data }: Props) {
  return (
    <ChartCard title="Count of Leads to be Scored Over Time" description="Weekly lead volume by first interaction date">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
            angle={-35}
            textAnchor="end"
            height={60}
          />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
          <Tooltip
            formatter={(value) => [new Intl.NumberFormat('en-US').format(Number(value ?? 0)), 'Leads']}
            contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }}
            labelStyle={{ fontWeight: 600 }}
          />
          <Bar dataKey="count" fill="#FF9933" radius={[4, 4, 0, 0]} barSize={32}>
            <LabelList dataKey="count" position="top" style={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
