'use client';

import { ChartCard } from '@/components/chart-card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ConversionScoreRow } from '@/lib/mock-data-forecast';

interface Props { data: ConversionScoreRow[] }

export function ConversionScoreTable({ data }: Props) {
  return (
    <ChartCard title="Conversion Model Score Table" description="Lead scores and estimated conversion rates" height="h-auto">
      <div className="overflow-x-auto -mx-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Lead ID</TableHead>
              <TableHead className="text-xs text-right">Model Score</TableHead>
              <TableHead className="text-xs text-right">Est. Conv. Rate</TableHead>
              <TableHead className="text-xs">Creation Date</TableHead>
              <TableHead className="text-xs text-right">Touchpoints</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.leadId}>
                <TableCell className="text-xs font-mono text-slate-600 max-w-[180px] truncate">
                  {row.leadId}
                </TableCell>
                <TableCell className="text-xs text-right tabular-nums">
                  {row.conversionModelScore.toFixed(4)}
                </TableCell>
                <TableCell className="text-xs text-right tabular-nums">
                  {row.estimatedConversionRate.toFixed(2)}
                </TableCell>
                <TableCell className="text-xs text-slate-600">
                  {row.creationDate}
                </TableCell>
                <TableCell className="text-xs text-right tabular-nums">
                  {row.touchpointCount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ChartCard>
  );
}
