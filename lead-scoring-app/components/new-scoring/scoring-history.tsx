"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScoringHistoryRecord } from "@/lib/mock-data-new-scoring"
import { Clock, CheckCircle2, XCircle, ArrowRightLeft, Crown, FileText } from "lucide-react"

interface ScoringHistoryProps {
  history: ScoringHistoryRecord[]
}

function ModelBadge({ modelId, modelName }: { modelId: string; modelName: string }) {
  const isConversion = modelId === "lead_conversion"
  return (
    <div className="flex items-center gap-1.5">
      <div
        className="w-5 h-5 rounded flex items-center justify-center"
        style={{ background: isConversion ? "#1B7FB515" : "#6B5CA515" }}
      >
        {isConversion
          ? <ArrowRightLeft className="w-3 h-3 text-[#1B7FB5]" />
          : <Crown className="w-3 h-3 text-[#6B5CA5]" />
        }
      </div>
      <span className="text-xs font-medium text-slate-700">{modelName}</span>
    </div>
  )
}

export function ScoringHistory({ history }: ScoringHistoryProps) {
  if (history.length === 0) return null

  return (
    <Card className="rounded-xl border-slate-200 shadow-enterprise-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-400" />
          <CardTitle className="text-base font-semibold text-slate-800">
            Scoring History
          </CardTitle>
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-slate-100 text-slate-500">
            {history.length} runs
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/80">
                <TableHead className="text-xs font-semibold">Model</TableHead>
                <TableHead className="text-xs font-semibold">File</TableHead>
                <TableHead className="text-xs font-semibold text-right">Leads Scored</TableHead>
                <TableHead className="text-xs font-semibold text-right">Avg Score</TableHead>
                <TableHead className="text-xs font-semibold">Date</TableHead>
                <TableHead className="text-xs font-semibold text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((record) => (
                <TableRow key={record.runId} className="hover:bg-slate-50/50">
                  <TableCell>
                    <ModelBadge modelId={record.modelId} modelName={record.modelName} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="text-xs text-slate-600 truncate max-w-[160px]">
                        {record.fileName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-right tabular-nums text-slate-700">
                    {record.totalLeadsScored.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-xs text-right tabular-nums text-slate-700">
                    {record.avgScore.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-xs text-slate-500 whitespace-nowrap">
                    {new Date(record.scoredAt).toLocaleString("en-GB", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell className="text-center">
                    {record.status === "completed" ? (
                      <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        <span className="text-[10px] font-semibold">Completed</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1 bg-red-50 text-red-600 px-2 py-0.5 rounded-full">
                        <XCircle className="w-3 h-3" />
                        <span className="text-[10px] font-semibold">Failed</span>
                      </div>
                    )}
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
