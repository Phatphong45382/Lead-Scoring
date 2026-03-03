"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ModelFeatureImportance } from "@/lib/mock-data-model-performance"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { BarChart3 } from "lucide-react"

interface FeatureImportanceChartProps {
  featureImportance: ModelFeatureImportance
}

function CustomTooltip({ active, payload, label, color }: { active?: boolean; payload?: Array<{ value: number }>; label?: string; color: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs">
      <p className="font-semibold text-slate-700 mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
        <span className="text-slate-500">Importance:</span>
        <span className="font-bold text-slate-800 tabular-nums">{payload[0].value.toFixed(1)}%</span>
      </div>
    </div>
  )
}

export function FeatureImportanceChart({ featureImportance }: FeatureImportanceChartProps) {
  return (
    <Card className="rounded-xl border-slate-200 shadow-enterprise-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4" style={{ color: featureImportance.color }} />
          <CardTitle className="text-sm font-bold text-slate-800">Feature Importance</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={featureImportance.data} layout="vertical" margin={{ top: 5, right: 15, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `${v}%`}
            />
            <YAxis
              dataKey="feature"
              type="category"
              width={110}
              tick={{ fontSize: 10, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip color={featureImportance.color} />} />
            <Bar
              dataKey="importance"
              fill={featureImportance.color}
              radius={[0, 4, 4, 0]}
              barSize={12}
              fillOpacity={0.85}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
