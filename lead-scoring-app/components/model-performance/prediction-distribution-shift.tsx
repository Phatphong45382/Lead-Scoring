"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DistributionBin } from "@/lib/mock-data-monitoring"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { BarChart2, ArrowRightLeft } from "lucide-react"

interface PredictionDistributionShiftProps {
  data: DistributionBin[]
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null
  const training = payload.find((p) => p.name === "Training")
  const production = payload.find((p) => p.name === "Production")
  const diff = (production?.value ?? 0) - (training?.value ?? 0)
  const pctChange = training?.value ? ((diff / training.value) * 100).toFixed(1) : "—"

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs">
      <p className="font-semibold text-slate-700 mb-1.5">Score: {label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 mb-0.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
          <span className="text-slate-500">{p.name}:</span>
          <span className="font-bold text-slate-800 tabular-nums">{p.value.toLocaleString()}</span>
        </div>
      ))}
      <div className="mt-1.5 pt-1.5 border-t border-slate-100 text-[10px]">
        <span className={diff > 0 ? "text-amber-600" : "text-emerald-600"}>
          Shift: {diff > 0 ? "+" : ""}{diff} ({pctChange}%)
        </span>
      </div>
    </div>
  )
}

export function PredictionDistributionShift({ data }: PredictionDistributionShiftProps) {
  return (
    <Card className="rounded-xl border-slate-200 shadow-enterprise-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-[#1B7FB5]" />
          <CardTitle className="text-sm font-bold text-slate-800">Prediction Distribution Shift</CardTitle>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <ArrowRightLeft className="w-3 h-3 text-slate-400" />
          <span className="text-[10px] text-slate-400">Comparing training baseline vs. current production output</span>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: -10 }} barGap={2}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="range"
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 11 }}
              iconType="circle"
              iconSize={8}
            />
            <Bar
              dataKey="training"
              name="Training"
              fill="#94a3b8"
              fillOpacity={0.5}
              radius={[3, 3, 0, 0]}
              barSize={16}
            />
            <Bar
              dataKey="production"
              name="Production"
              fill="#1B7FB5"
              fillOpacity={0.85}
              radius={[3, 3, 0, 0]}
              barSize={16}
            />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-[10px] text-slate-400 text-center mt-1">Lead score bins — notable right-shift in production scores (higher scores more frequent)</p>
      </CardContent>
    </Card>
  )
}
