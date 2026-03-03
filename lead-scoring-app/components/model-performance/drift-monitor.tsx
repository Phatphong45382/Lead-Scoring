"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DriftEvent } from "@/lib/mock-data-model-performance"
import { AlertTriangle, Info, XCircle, ArrowRightLeft, Crown, Radar } from "lucide-react"

interface DriftMonitorProps {
  events: DriftEvent[]
}

function SeverityIcon({ severity }: { severity: DriftEvent["severity"] }) {
  switch (severity) {
    case "info":
      return <Info className="w-4 h-4 text-blue-500" />
    case "warning":
      return <AlertTriangle className="w-4 h-4 text-amber-500" />
    case "critical":
      return <XCircle className="w-4 h-4 text-red-500" />
  }
}

function severityStyles(severity: DriftEvent["severity"]) {
  switch (severity) {
    case "info":
      return "border-l-blue-400 bg-blue-50/30"
    case "warning":
      return "border-l-amber-400 bg-amber-50/30"
    case "critical":
      return "border-l-red-400 bg-red-50/30"
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}

export function DriftMonitor({ events }: DriftMonitorProps) {
  return (
    <Card className="rounded-xl border-slate-200 shadow-enterprise-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Radar className="w-4 h-4 text-slate-400" />
          <CardTitle className="text-sm font-bold text-slate-800">Drift Monitor</CardTitle>
          <span className="text-[10px] text-slate-400 ml-1">Recent metric changes</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-2.5">
          {events.map((event) => (
            <div
              key={event.id}
              className={`flex items-start gap-3 border-l-[3px] rounded-r-lg p-3 ${severityStyles(event.severity)}`}
            >
              <SeverityIcon severity={event.severity} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="flex items-center gap-1">
                    {event.modelId === "lead_conversion"
                      ? <ArrowRightLeft className="w-3 h-3 text-[#1B7FB5]" />
                      : <Crown className="w-3 h-3 text-[#6B5CA5]" />
                    }
                    <span className="text-[11px] font-semibold text-slate-700">{event.modelName}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{formatDate(event.date)}</span>
                </div>
                <p className="text-xs text-slate-600">{event.message}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-mono text-slate-400">
                    {event.metric}: {event.previousValue < 1 ? event.previousValue.toFixed(2) : event.previousValue.toFixed(1)} → {event.currentValue < 1 ? event.currentValue.toFixed(2) : event.currentValue.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
