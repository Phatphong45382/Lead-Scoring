"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ErrorDistributionData } from "@/lib/mock-data-model-performance"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { Activity } from "lucide-react"

interface ErrorDistributionProps {
  data: ErrorDistributionData
}

function CustomTooltip({ active, payload, label, color }: { active?: boolean; payload?: Array<{ value: number }>; label?: string; color: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs">
      <p className="font-semibold text-slate-700 mb-1">Error: {label}</p>
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
        <span className="text-slate-500">Count:</span>
        <span className="font-bold text-slate-800 tabular-nums">{payload[0].value.toLocaleString()}</span>
      </div>
    </div>
  )
}

export function ErrorDistribution({ data }: ErrorDistributionProps) {
  // Find the index of the zero-center bin for reference line
  const zeroBinIndex = data.data.findIndex((d) => d.range.includes("0 to 5") || d.range.includes("-5 to 0"))

  return (
    <Card className="rounded-xl border-slate-200 shadow-enterprise-sm flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4" style={{ color: data.color }} />
          <CardTitle className="text-sm font-bold text-slate-800">Error Distribution</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data.data} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="range"
              tick={{ fontSize: 8, fill: "#94a3b8" }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip color={data.color} />} />
            {zeroBinIndex >= 0 && (
              <ReferenceLine x={data.data[zeroBinIndex].range} stroke="#94a3b8" strokeDasharray="3 3" />
            )}
            <Bar
              dataKey="count"
              fill={data.color}
              fillOpacity={0.75}
              radius={[3, 3, 0, 0]}
              barSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-[10px] text-slate-400 text-center mt-1">Prediction Error (Actual − Predicted)</p>
      </CardContent>
    </Card>
  )
}
