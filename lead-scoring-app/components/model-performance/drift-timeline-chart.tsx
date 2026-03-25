"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DriftTimelinePoint } from "@/lib/mock-data-monitoring"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
  ReferenceArea,
} from "recharts"
import { TrendingUp } from "lucide-react"

interface DriftTimelineChartProps {
  data: DriftTimelinePoint[]
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs">
      <p className="font-semibold text-slate-700 mb-1.5">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 mb-0.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
          <span className="text-slate-500">{p.name}:</span>
          <span className="font-bold text-slate-800 tabular-nums">{p.value.toFixed(3)}</span>
        </div>
      ))}
      <div className="mt-1.5 pt-1.5 border-t border-slate-100 text-[10px] text-slate-400">
        {payload[0].value >= 0.10 ? "Above warning threshold" : "Within acceptable range"}
      </div>
    </div>
  )
}

export function DriftTimelineChart({ data }: DriftTimelineChartProps) {
  return (
    <Card className="rounded-xl border-slate-200 shadow-enterprise-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#1B7FB5]" />
          <CardTitle className="text-sm font-bold text-slate-800">Overall Drift Score</CardTitle>
          <span className="text-[10px] text-slate-400">Aggregated PSI over time</span>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data} margin={{ top: 10, right: 15, bottom: 5, left: -10 }}>
            <defs>
              <linearGradient id="driftWarningBg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.08} />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 9, fill: "#94a3b8" }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 0.25]}
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => v.toFixed(2)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 11 }}
              iconType="circle"
              iconSize={8}
            />

            {/* Threshold zones */}
            <ReferenceArea y1={0.10} y2={0.20} fill="#fef3c7" fillOpacity={0.4} />
            <ReferenceArea y1={0.20} y2={0.25} fill="#fee2e2" fillOpacity={0.4} />

            {/* Warning threshold */}
            <ReferenceLine
              y={0.10}
              stroke="#f59e0b"
              strokeDasharray="6 3"
              strokeWidth={1.5}
              label={{ value: "Warning (0.10)", position: "right", fontSize: 9, fill: "#f59e0b" }}
            />
            {/* Critical threshold */}
            <ReferenceLine
              y={0.20}
              stroke="#ef4444"
              strokeDasharray="6 3"
              strokeWidth={1.5}
              label={{ value: "Critical (0.20)", position: "right", fontSize: 9, fill: "#ef4444" }}
            />

            <Line
              type="monotone"
              dataKey="leadConversion"
              name="Lead Conversion"
              stroke="#1B7FB5"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#1B7FB5", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 5, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="customerValue"
              name="Customer Value"
              stroke="#6B5CA5"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#6B5CA5", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 5, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
