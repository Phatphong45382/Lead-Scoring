"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FeatureDriftRow } from "@/lib/mock-data-monitoring"
import { Grid3X3, Info } from "lucide-react"

interface FeatureDriftHeatmapProps {
  data: FeatureDriftRow[]
}

function psiColor(psi: number): string {
  if (psi >= 0.20) return "bg-red-500 text-white"
  if (psi >= 0.10) return "bg-amber-400 text-amber-950"
  if (psi >= 0.05) return "bg-yellow-200 text-yellow-800"
  return "bg-emerald-100 text-emerald-700"
}

function psiLabel(psi: number): string {
  if (psi >= 0.20) return "Critical"
  if (psi >= 0.10) return "Warning"
  if (psi >= 0.05) return "Low"
  return "Stable"
}

export function FeatureDriftHeatmap({ data }: FeatureDriftHeatmapProps) {
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null)

  if (data.length === 0) return null
  const periods = data[0].values.map((v) => v.period)

  return (
    <Card className="rounded-xl border-slate-200 shadow-enterprise-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Grid3X3 className="w-4 h-4 text-[#1B7FB5]" />
            <CardTitle className="text-sm font-bold text-slate-800">Feature Drift Heatmap</CardTitle>
            <span className="text-[10px] text-slate-400">Population Stability Index (PSI) per feature</span>
          </div>
          <div className="flex items-center gap-3 text-[10px]">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-emerald-100" />
              <span className="text-slate-500">Stable (&lt;0.05)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-yellow-200" />
              <span className="text-slate-500">Low (0.05-0.10)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-amber-400" />
              <span className="text-slate-500">Warning (0.10-0.20)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-red-500" />
              <span className="text-slate-500">Critical (&gt;0.20)</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-[11px] font-semibold text-slate-500 pb-2 pr-4 min-w-[140px]">Feature</th>
                {periods.map((p) => (
                  <th key={p} className="text-center text-[10px] font-medium text-slate-400 pb-2 px-1 min-w-[64px]">{p}</th>
                ))}
                <th className="text-center text-[10px] font-medium text-slate-400 pb-2 px-2 min-w-[64px]">Latest</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, ri) => {
                const latestPsi = row.values[row.values.length - 1].psi
                return (
                  <tr key={row.feature}>
                    <td className="text-xs font-medium text-slate-700 py-1 pr-4 font-mono">{row.feature}</td>
                    {row.values.map((v, ci) => {
                      const isHovered = hoveredCell?.row === ri && hoveredCell?.col === ci
                      return (
                        <td key={v.period} className="px-1 py-1">
                          <div
                            className={`relative rounded-md text-center py-1.5 px-1 text-[11px] font-bold tabular-nums cursor-default transition-all ${psiColor(v.psi)} ${isHovered ? "ring-2 ring-slate-900 scale-110 z-10" : ""}`}
                            onMouseEnter={() => setHoveredCell({ row: ri, col: ci })}
                            onMouseLeave={() => setHoveredCell(null)}
                          >
                            {v.psi.toFixed(2)}
                            {isHovered && (
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 text-white text-[10px] rounded-lg px-3 py-2 whitespace-nowrap z-20 shadow-xl">
                                <p className="font-bold">{row.feature} — {v.period}</p>
                                <p className="font-normal mt-0.5">PSI: {v.psi.toFixed(3)} ({psiLabel(v.psi)})</p>
                              </div>
                            )}
                          </div>
                        </td>
                      )
                    })}
                    <td className="px-2 py-1">
                      <div className={`rounded-full text-center py-1 px-2 text-[10px] font-bold ${psiColor(latestPsi)}`}>
                        {psiLabel(latestPsi)}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-start gap-2 bg-blue-50 rounded-lg px-3 py-2 border border-blue-100">
          <Info className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-[11px] text-blue-700 leading-snug">
            <span className="font-semibold">PSI (Population Stability Index)</span> measures distribution shift between training and production data.
            Values above 0.10 suggest notable drift — features <span className="font-mono font-bold">income</span> and <span className="font-mono font-bold">region</span> show increasing drift and may need attention.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
