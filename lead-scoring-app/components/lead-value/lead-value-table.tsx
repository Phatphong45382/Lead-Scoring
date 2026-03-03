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
import { LeadValueTableRow } from "@/lib/mock-data-lead-value"

interface Props {
  data: LeadValueTableRow[]
}

export function LeadValueTable({ data }: Props) {
  return (
    <Card className="rounded-xl border-slate-200 shadow-enterprise-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-slate-800">
          lead_value
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-semibold">lead_id</TableHead>
                <TableHead className="text-xs font-semibold text-right">estimated_customer_value</TableHead>
                <TableHead className="text-xs font-semibold text-right">conversion_model_score</TableHead>
                <TableHead className="text-xs font-semibold text-right">estimated_conversion_rate</TableHead>
                <TableHead className="text-xs font-semibold text-right">lead_value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.leadId}>
                  <TableCell className="text-xs font-mono text-slate-600 max-w-[220px] truncate">
                    {row.leadId}
                  </TableCell>
                  <TableCell className="text-xs text-right tabular-nums">
                    {row.estimatedCustomerValue.toFixed(12).slice(0, 18)}
                  </TableCell>
                  <TableCell className="text-xs text-right tabular-nums">
                    {row.conversionModelScore.toFixed(12).slice(0, 18)}
                  </TableCell>
                  <TableCell className="text-xs text-right tabular-nums">
                    {row.estimatedConversionRate.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-xs text-right tabular-nums">
                    {row.leadValue.toFixed(16).slice(0, 20)}
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
