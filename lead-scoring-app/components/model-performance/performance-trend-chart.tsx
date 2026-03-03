"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ModelPerformanceTrend } from "@/lib/mock-data-model-performance"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp } from "lucide-react"

interface PerformanceTrendChartProps {
  trend: ModelPerformanceTrend
}

function CustomTooltip({ active, payload, label, metricName, color }: { active?: boolean; payload?: Array<{ value: number }>; label?: string; metricName: string; color: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs">
      <p className="font-semibold text-slate-700 mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
        <span className="text-slate-500">{metricName}:</span>
        <span className="font-bold text-slate-800 tabular-nums">{payload[0].value.toFixed(2)}</span>
      </div>
    </div>
  )
}

export function PerformanceTrendChart({ trend }: PerformanceTrendChartProps) {
  const minVal = Math.min(...trend.data.map((d) => d.value))
  const domainMin = Math.max(0, Math.floor((minVal - 0.05) * 20) / 20)

  return (
    <Card className="rounded-xl border-slate-200 shadow-enterprise-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4" style={{ color: trend.color }} />
          <CardTitle className="text-sm font-bold text-slate-800">{trend.metricName} Trend</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={trend.data} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
            <defs>
              <linearGradient id={`gradient-${trend.modelId}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={trend.color} stopOpacity={0.2} />
                <stop offset="95%" stopColor={trend.color} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
            />
            <YAxis
              domain={[domainMin, 1.0]}
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => v.toFixed(2)}
            />
            <Tooltip content={<CustomTooltip metricName={trend.metricName} color={trend.color} />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={trend.color}
              strokeWidth={2.5}
              fill={`url(#gradient-${trend.modelId})`}
              dot={{ r: 3.5, fill: trend.color, strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
