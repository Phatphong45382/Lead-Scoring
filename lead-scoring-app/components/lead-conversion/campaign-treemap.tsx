'use client';

import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartCard } from '@/components/chart-card';
import { CampaignTreemapDataPoint } from '@/lib/mock-data-lead-conversion';

interface Props { data: CampaignTreemapDataPoint[] }

interface CustomContentProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  value?: number;
  fill?: string;
}

function CustomContent({ x = 0, y = 0, width = 0, height = 0, name, value, fill }: CustomContentProps) {
  if (width < 40 || height < 30) return null;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={6} fill={fill} stroke="#fff" strokeWidth={2} />
      <text x={x + width / 2} y={y + height / 2 - 6} textAnchor="middle" fill="#fff" fontSize={12} fontWeight={600}>
        {name}
      </text>
      <text x={x + width / 2} y={y + height / 2 + 10} textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize={10}>
        {new Intl.NumberFormat('en-US').format(value ?? 0)}
      </text>
    </g>
  );
}

export function CampaignTreemap({ data }: Props) {
  const treeData = data.map((d) => ({ ...d, children: [] }));

  return (
    <ChartCard title="Touchpoints by Campaign Type" description="Volume distribution across campaign types">
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={treeData}
          dataKey="value"
          nameKey="name"
          content={<CustomContent />}
          animationDuration={400}
        >
          <Tooltip
            formatter={(value) => [new Intl.NumberFormat('en-US').format(Number(value ?? 0)), 'Touchpoints']}
            contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }}
          />
        </Treemap>
      </ResponsiveContainer>
    </ChartCard>
  );
}
