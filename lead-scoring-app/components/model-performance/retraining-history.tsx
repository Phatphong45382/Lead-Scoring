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
import { RetrainingRecord } from "@/lib/mock-data-model-performance"
import { ArrowRightLeft, Crown, CheckCircle2, XCircle, History, Clock, Zap, CalendarClock } from "lucide-react"

interface RetrainingHistoryProps {
  records: RetrainingRecord[]
}

function TriggerBadge({ trigger }: { trigger: RetrainingRecord["triggeredBy"] }) {
  const config = {
    scheduled: { label: "Scheduled", icon: CalendarClock, bg: "bg-slate-100", text: "text-slate-600" },
    manual: { label: "Manual", icon: Zap, bg: "bg-blue-50", text: "text-blue-600" },
    drift_alert: { label: "Drift Alert", icon: Clock, bg: "bg-amber-50", text: "text-amber-600" },
  }[trigger]

  const Icon = config.icon
  return (
    <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded ${config.bg}`}>
      <Icon className={`w-3 h-3 ${config.text}`} />
      <span className={`text-[10px] font-medium ${config.text}`}>{config.label}</span>
    </div>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  })
}

export function RetrainingHistory({ records }: RetrainingHistoryProps) {
  return (
    <Card className="rounded-xl border-slate-200 shadow-enterprise-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-slate-400" />
          <CardTitle className="text-sm font-bold text-slate-800">Retraining History</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/80">
                <TableHead className="text-xs font-semibold">Model</TableHead>
                <TableHead className="text-xs font-semibold">Date</TableHead>
                <TableHead className="text-xs font-semibold text-right">Samples</TableHead>
                <TableHead className="text-xs font-semibold text-right">Duration</TableHead>
                <TableHead className="text-xs font-semibold text-right">Metric Change</TableHead>
                <TableHead className="text-xs font-semibold text-center">Trigger</TableHead>
                <TableHead className="text-xs font-semibold text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => {
                const metricDiff = record.newMetric - record.previousMetric
                const improved = metricDiff > 0
                return (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        {record.modelId === "lead_conversion"
                          ? <ArrowRightLeft className="w-3.5 h-3.5 text-[#1B7FB5]" />
                          : <Crown className="w-3.5 h-3.5 text-[#6B5CA5]" />
                        }
                        <span className="text-xs font-medium text-slate-700">{record.modelName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-slate-500 whitespace-nowrap">
                      {formatDate(record.trainedAt)}
                    </TableCell>
                    <TableCell className="text-xs text-right tabular-nums text-slate-700">
                      {record.trainingSamples.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-xs text-right tabular-nums text-slate-500">
                      {record.duration}
                    </TableCell>
                    <TableCell className="text-xs text-right tabular-nums">
                      {record.status === "completed" ? (
                        <span className={improved ? "text-emerald-600" : "text-amber-600"}>
                          {record.metricName}: {record.previousMetric < 1 ? record.previousMetric.toFixed(2) : record.previousMetric.toFixed(1)} → {record.newMetric < 1 ? record.newMetric.toFixed(2) : record.newMetric.toFixed(1)}
                          {improved ? " ↑" : metricDiff < 0 ? " ↓" : ""}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <TriggerBadge trigger={record.triggeredBy} />
                    </TableCell>
                    <TableCell className="text-center">
                      {record.status === "completed" ? (
                        <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          <span className="text-[10px] font-semibold">OK</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1 bg-red-50 text-red-600 px-2 py-0.5 rounded-full">
                          <XCircle className="w-3 h-3" />
                          <span className="text-[10px] font-semibold">Failed</span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
