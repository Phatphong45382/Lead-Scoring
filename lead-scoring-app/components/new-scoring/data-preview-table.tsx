"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"

interface DataPreviewTableProps {
  datasetLabel: string
  columns: string[]
  rows: Record<string, string>[]
  totalRows: number
}

export function DataPreviewTable({
  datasetLabel,
  columns,
  rows,
  totalRows,
}: DataPreviewTableProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Eye className="w-4 h-4 text-[#1B7FB5]" />
        <h3 className="text-base font-semibold text-slate-800">{datasetLabel}</h3>
        <span className="text-xs text-slate-400">
          Showing {rows.length} of {totalRows.toLocaleString()} rows
        </span>
      </div>

      {/* Column badges */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {columns.map((col) => (
          <Badge key={col} variant="secondary" className="text-[11px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5">
            {col}
          </Badge>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-lg flex-1">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              {columns.map((col) => (
                <TableHead key={col} className="text-xs font-semibold text-slate-600 whitespace-nowrap">
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i}>
                {columns.map((col) => (
                  <TableCell key={col} className="text-xs text-slate-700 whitespace-nowrap">
                    {row[col] ?? "—"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
