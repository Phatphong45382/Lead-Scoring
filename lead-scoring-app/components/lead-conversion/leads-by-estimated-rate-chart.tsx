'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { ChartCard } from '@/components/chart-card';
import { LeadsByEstimatedRateDataPoint } from '@/lib/mock-data-forecast';

interface Props { data: LeadsByEstimatedRateDataPoint[] }

export function LeadsByEstimatedRateChart({ data }: Props) {
  return (
    <ChartCard title="Count of Leads by Estimated Conversion Rate" description="Distribution of leads across predicted conversion rate buckets">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="rateLabel"
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
            label={{ value: 'Estimated conversion rate (%)', position: 'insideBottom', offset: -2, fontSize: 11, fill: '#94a3b8' }}
          />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
          <Tooltip
            formatter={(value) => [new Intl.NumberFormat('en-US').format(Number(value ?? 0)), 'Leads']}
            labelFormatter={(label) => `${label}% conversion rate`}
            contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }}
            labelStyle={{ fontWeight: 600 }}
          />
          <Bar dataKey="count" fill="#B8E4F8" radius={[4, 4, 0, 0]} barSize={36}>
            <LabelList
              dataKey="count"
              position="inside"
              style={{ fontSize: 11, fill: '#1B7FB5', fontWeight: 600 }}
              formatter={(v: any) => (v > 0 ? v : '')}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
