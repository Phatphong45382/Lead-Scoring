"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ModelSummary, ModelVersion } from "@/lib/mock-data-model-performance"
import { ArrowRightLeft, Crown, CheckCircle2, AlertTriangle, XCircle, ChevronDown } from "lucide-react"

interface ModelSummaryCardsProps {
  summaries: ModelSummary[]
  selectedVersions: Record<string, string>
  onVersionChange: (modelId: string, versionId: string) => void
}

function ModelIcon({ icon, color }: { icon: string; color: string }) {
  if (icon === "conversion") return <ArrowRightLeft className="w-6 h-6" style={{ color }} />
  if (icon === "customer_value") return <Crown className="w-6 h-6" style={{ color }} />
  return null
}

function StatusBadge({ status }: { status: "healthy" | "warning" | "critical" }) {
  const config = {
    healthy: { label: "Healthy", icon: CheckCircle2, bg: "bg-emerald-50", text: "text-emerald-700", iconColor: "text-emerald-500" },
    warning: { label: "Warning", icon: AlertTriangle, bg: "bg-amber-50", text: "text-amber-700", iconColor: "text-amber-500" },
    critical: { label: "Critical", icon: XCircle, bg: "bg-red-50", text: "text-red-700", iconColor: "text-red-500" },
  }[status]

  const Icon = config.icon
  return (
    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${config.bg}`}>
      <Icon className={`w-3 h-3 ${config.iconColor}`} />
      <span className={`text-[10px] font-semibold ${config.text}`}>{config.label}</span>
    </div>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}

function formatMetricValue(key: string, value: number) {
  const suffix = key === "MAPE" ? "%" : key === "MAE" || key === "RMSE" ? " EUR" : ""
  const formatted = value < 1 ? value.toFixed(2) : value.toFixed(1)
  return `${formatted}${suffix}`
}

export function ModelSummaryCards({ summaries, selectedVersions, onVersionChange }: ModelSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {summaries.map((model) => {
        const selectedVerId = selectedVersions[model.modelId] ?? model.versions[0]?.versionId
        const activeVersion: ModelVersion | undefined = model.versions.find((v) => v.versionId === selectedVerId) ?? model.versions[0]

        const metrics = activeVersion?.metrics ?? model.metrics
        const entries = Object.entries(metrics)
        const primary = entries[0]
        const secondary = entries.slice(1)
        const status = activeVersion?.status ?? model.status
        const trainedAt = activeVersion?.trainedAt ?? model.lastTrained
        const predictions = activeVersion?.totalPredictions ?? model.totalPredictions

        return (
          <Card key={model.modelId} className="rounded-xl border-slate-200 shadow-enterprise-sm overflow-hidden">
            <div className="h-1" style={{ background: model.color }} />
            <CardContent className="p-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${model.color}15` }}
                  >
                    <ModelIcon icon={model.icon} color={model.color} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">{model.modelName}</h3>
                    <p className="text-[11px] text-slate-400 capitalize">{model.modelType} model</p>
                  </div>
                </div>
                <StatusBadge status={status} />
              </div>

              {/* Version Dropdown */}
              <div className="mb-4">
                <div className="relative">
                  <select
                    value={selectedVerId}
                    onChange={(e) => onVersionChange(model.modelId, e.target.value)}
                    className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 pr-8 text-xs font-medium text-slate-700 cursor-pointer hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors"
                    style={{ focusRingColor: model.color } as React.CSSProperties}
                  >
                    {model.versions.map((v) => (
                      <option key={v.versionId} value={v.versionId}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Primary Metric */}
              {primary && (
                <div className="rounded-lg p-3 mb-3" style={{ background: `${model.color}08` }}>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{primary[0]}</p>
                  <p className="text-2xl font-bold tabular-nums" style={{ color: model.color }}>
                    {formatMetricValue(primary[0], primary[1])}
                  </p>
                </div>
              )}

              {/* Secondary Metrics */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {secondary.map(([key, value]) => (
                  <div key={key} className="bg-slate-50 rounded-lg p-2.5">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{key}</p>
                    <p className="text-base font-bold text-slate-800 tabular-nums">
                      {formatMetricValue(key, value)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer info */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-3">
                <span>Trained: {formatDate(trainedAt)}</span>
                <span>{predictions.toLocaleString()} predictions</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
