"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EstimatedCustomerValueRow } from "@/lib/mock-data-customer-value-forecast"

interface Props {
  data: EstimatedCustomerValueRow[]
}

export function EstimatedValueTable({ data }: Props) {
  return (
    <Card className="rounded-xl border-slate-200 shadow-enterprise-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-slate-800">
          Estimated customer value table
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-semibold">lead_id</TableHead>
                <TableHead className="text-xs font-semibold text-right">estimated_customer_value</TableHead>
                <TableHead className="text-xs font-semibold text-right">estimated_conversion_rate</TableHead>
                <TableHead className="text-xs font-semibold">creation_date</TableHead>
                <TableHead className="text-xs font-semibold text-right">touchpoint_count</TableHead>
                <TableHead className="text-xs font-semibold">region</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.leadId}>
                  <TableCell className="text-xs font-mono text-slate-600 max-w-[220px] truncate">
                    {row.leadId}
                  </TableCell>
                  <TableCell className="text-xs text-right tabular-nums">
                    {row.estimatedCustomerValue.toFixed(14).slice(0, 18)}
                  </TableCell>
                  <TableCell className="text-xs text-right tabular-nums">
                    {row.estimatedConversionRate.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-xs text-slate-600">
                    {row.creationDate}T00:00:00.000Z
                  </TableCell>
                  <TableCell className="text-xs text-right tabular-nums">
                    {row.touchpointCount}
                  </TableCell>
                  <TableCell className="text-xs text-slate-600 max-w-[80px] truncate">
                    {row.region}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
